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

// (delete api)
app.delete("/api/signup/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedUser = await signupModel.findOneAndDelete({ _id: id });
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
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

  // (delete api)
  app.delete("/api/login/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const deletedLogin = await loginModel.findOneAndDelete({ _id: id });
      if (!deletedLogin) {
        return res.status(404).json({ message: "Login record not found" });
      }
      res.status(200).json({ message: "Login record deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting login record" });
    }
  });

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({
      message: "Incorrect password or email. Please try again.",
    });
  }

  // Save login data on every login
  await loginModel.create({
    email: user.email,
    fullName: user.fullName,
  });

  // login token creation
  const token = jwt.sign(
    {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    },
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
      role: user.role,
    },
  });
});

module.exports = app;
