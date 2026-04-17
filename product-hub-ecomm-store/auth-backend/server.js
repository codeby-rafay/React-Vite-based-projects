const express = require("express");
const bcrypt = require("bcryptjs"); // Used to securely hash passwords
const jwt = require("jsonwebtoken"); // Used to create login tokens
const cors = require("cors"); // Allows our React frontend to talk to this server

const app = express();

// MIDDLEWARE (things that run before every request)

// Allow requests from our React frontend (http://localhost:5173)
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

// Allow the server to read JSON data sent in requests
app.use(express.json());

// FAKE DATABASE (In-memory storage)
// ........................................
// In a real app, you'd use a database like MongoDB or PostgreSQL.
// For now, we just store users in this array.
// NOTE: This resets every time you restart the server.

const users = []; // This array stores all registered users

// In a real app, store this in an .env file.

const JWT_SECRET = "my_super_secret_key_123";

// ROUTE 1: SIGNUP
// POST /api/signup
// When user fills signup form and clicks "Create Account",
// the frontend sends their data here.

app.post("/api/signup", async (req, res) => {
  // 1. Get the data the user sent
  const { fullName, email, password } = req.body;

  // 2. Check if all fields are provided
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  // 3. Check if this email is already registered
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "This email is already registered. Please login." });
  }

  // 4. Hash the password before saving (never store plain passwords!)
  // bcrypt turns "mypassword123" into something like "$2a$10$..."
  const hashedPassword = await bcrypt.hash(password, 10);

  // 5. Create the new user object and save to our "database"
  const newUser = {
    id: Date.now(), // Simple unique ID using current timestamp
    fullName,
    email,
    password: hashedPassword, // Save hashed password, not original
  };
  users.push(newUser);

  // 6. Send success response
  res
    .status(201)
    .json({ message: "Account created successfully! Please login." });
});

// ROUTE 2: LOGIN
// POST /api/login
// ........................
// When user fills login form and clicks "Sign In",
// the frontend sends their email & password here.

app.post("/api/login", async (req, res) => {
  // 1. Get email and password from the request
  const { email, password } = req.body;

  // 2. Check if both fields are provided
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  // 3. Find the user by email in our "database"
  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(400).json({
      message: "No account found with this email. Please signup first.",
    });
  }

  // 4. Compare the password they typed with the saved hashed password
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res
      .status(400)
      .json({ message: "Incorrect password. Please try again." });
  }

  // 5. Create a JWT token - this is like a "pass" that proves the user is logged in
  // The token contains the user's id, name, and email
  // It expires in 7 days
  const token = jwt.sign(
    { id: user.id, fullName: user.fullName, email: user.email },
    JWT_SECRET,
    { expiresIn: "7d" },
  );

  // 6. Send back the token and user info
  res.json({
    message: "Login successful!",
    token,
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
    },
  });
});

// START THE SERVER
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Auth server is running at http://localhost:${PORT}`);
  console.log(`   - Signup: POST http://localhost:${PORT}/api/signup`);
  console.log(`   - Login:  POST http://localhost:${PORT}/api/login`);
});
