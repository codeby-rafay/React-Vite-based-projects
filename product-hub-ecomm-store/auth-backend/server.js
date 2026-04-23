const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();

// middleware
app.use(
  // cors({
  //   origin: "http://localhost:5173",
  // }),
  cors()
);

app.use(express.json());

const users = [];

const JWT_SECRET = "my_super_secret_key_123";

// route 1: SIGNUP

app.post("/api/signup", async (req, res) => {
  const { fullName, email, password } = req.body; //data sent from fronend

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" }); //sent data back to frontend
  }

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "This email is already registered. Please login." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: Date.now(),
    fullName,
    email,
    password: hashedPassword,
  };
  users.push(newUser);

  res
    .status(201)
    .json({ message: "Account created successfully! Please login." });
});

// route 2: LOGIN

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(400).json({
      message: "No account found with this email. Please signup first.",
    });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res
      .status(400)
      .json({ message: "Incorrect password. Please try again." });
  }

// login token creation
  const token = jwt.sign(
    { id: user.id, fullName: user.fullName, email: user.email },
    JWT_SECRET,
    { expiresIn: "7d" }, // It expires in 7 days
  );

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

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Auth server is running at http://localhost:${PORT}`);
  console.log(`   - Signup: POST http://localhost:${PORT}/api/signup`);
  console.log(`   - Login:  POST http://localhost:${PORT}/api/login`);
});
