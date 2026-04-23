const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const signupModel = require("./models/signup.model");
const loginModel = require("./models/login.model");

const app = express();

// middleware
app.use(
  // cors({
  //   origin: "http://localhost:5173",
  // }),
  cors(),
);

app.use(express.json());

const JWT_SECRET = "my_super_secret_key_123";

// route 1: SIGNUP
// (post api)
app.post("/api/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body; //data sent from fronend

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" }); //sent data back to frontend
    }

    const existingUser = await signupModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "This email is already registered. Please login." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      fullName,
      email,
      password: hashedPassword,
    };
    await signupModel.create(newUser);

    res
      .status(201)
      .json({ message: "Account created successfully! Please login." });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Error creating account" });
  }
});

// (get api)
app.get("/api/signup", async (req, res) => {
  try {
    const signups = await signupModel
      .find()
      .select("-password")
      .sort({ createdAt: -1 });
    res.status(200).json({
      message: "Signup Data fetched successfully",
      signups,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching signup data" });
  }
});

// route 2: LOGIN
// (post api)
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  const user = await signupModel.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "No account found with this email. Please signup first.",
    });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({
      message: "Incorrect password. Please try again.",
    });
  }

  // Save login data only on first login
  const existingLoginRecord = await loginModel.findOne({ email: user.email });
  if (!existingLoginRecord) {
    await loginModel.create({
      email: user.email,
      fullName: user.fullName,
    });
  }

  // (get api)
  app.get("/api/login", async (req, res) => {
    try {
      const logins = await loginModel.find().sort({ timestamp: -1 });
      res.status(200).json({
        message: "Login Data fetched successfully",
        logins,
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching login data" });
    }
  });

  // login token creation
  const token = jwt.sign(
    { id: user._id, fullName: user.fullName, email: user.email },
    JWT_SECRET,
    { expiresIn: "7d" },
  );

  res.json({
    message: "Login successful!",
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    },
  });
});

module.exports = app;
