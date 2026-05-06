const OAuth2Client = require("google-auth-library").OAuth2Client;
const signupModel = require("../models/signup.model");
const loginModel = require("../models/login.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  generateOTP,
  sendOTPEmail,
  storeOTP,
  verifyOTP: verifyOTPUtil,
  clearOTP,
} = require("../utils/otp");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const JWT_SECRET = process.env.JWT_SECRET;

// Google OAuth route
async function googleLogin(req, res) {
  //  (post api)
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    // verify token from Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: client._clientId,
    });

    const payload = ticket.getPayload();

    const { sub, name, email } = payload;

    let user = await signupModel.findOne({
      $or: [{ email }, { googleId: sub }],
    });

    if (!user) {
      user = await signupModel.create({
        fullName: name,
        email,
        password: null, // No password for Google users
        googleId: sub,
      });
    } else {
      // existing user - update their Google ID if not already set
      if (!user.googleId) {
        user = await signupModel.findOneAndUpdate(
          { email },
          { googleId: sub },
          { returnDocument: "after" },
        );
      }
    }

    // Store only last login
    await loginModel.findOneAndUpdate(
      { email: user.email },
      {
        fullName: user.fullName,
        timestamp: new Date(),
      },
      { upsert: true, returnDocument: "after" },
    );

    // JWT token
    const jwtToken = jwt.sign(
      {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role || "user",
      },
      JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.cookie("authToken", jwtToken);

    res.json({
      message: "Google login successful!",
      token: jwtToken,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role || "user",
      },
    });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({ message: "Error logging in with Google" });
  }
}

// route 1: SIGNUP
// (post api)
async function signup(req, res) {
  try {
    const { fullName, email, password } = req.body; //data sent from fronend to backend

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
    const createdUser = await signupModel.create(newUser);

    const token = jwt.sign(
      {
        id: createdUser._id,
        fullName: createdUser.fullName,
        email: createdUser.email,
        role: createdUser.role || "user",
      },
      JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.cookie("authToken", token);

    res.status(201).json({
      message: "Account created successfully!",
      user: {
        id: createdUser._id,
        fullName: createdUser.fullName,
        email: createdUser.email,
        role: createdUser.role || "user",
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating account" });
  }
}

// (get api)
async function getSignups(req, res) {
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
}

// (delete api)
async function deleteSignup(req, res) {
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
}

// route 2: LOGIN
// (post api)
async function login(req, res) {
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

  // Check if user only has Google login (no password set)
  if (!user.password) {
    return res.status(400).json({
      message:
        "This account was created with Google Sign-In. Please use Google to login.",
    });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({
      message: "Incorrect password or email. Please try again.",
    });
  }

  // Store only last login
  await loginModel.findOneAndUpdate(
    { email: user.email },
    {
      fullName: user.fullName,
      timestamp: new Date(),
    },
    { upsert: true, returnDocument: "after" },
  );

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

  res.cookie("authToken", token);

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
}

// (get api)
async function getLogins(req, res) {
  try {
    const logins = await loginModel.find().sort({ timestamp: -1 });
    res.status(200).json({
      message: "Login Data fetched successfully",
      logins,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching login data" });
  }
}

// (delete api)
async function deleteLogin(req, res) {
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
}

//route 4: PASSWORD RESET - OTP
// Send OTP to email
async function sendOTP(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check if user exists
    const user = await signupModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found with this email" });
    }

    // Generate OTP
    const otp = generateOTP();

    // Send OTP to email
    await sendOTPEmail(email, otp);

    // Store OTP in memory (with expiration)
    storeOTP(email, otp);

    res.status(200).json({
      message: "OTP sent successfully to your email",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error sending OTP. Please check your email address.",
      error: error.message,
    });
  }
}

// Verify OTP
async function verifyOTP(req, res) {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    // Verify OTP
    const verification = verifyOTPUtil(email, otp);

    if (!verification.valid) {
      return res.status(400).json({ message: verification.message });
    }

    res.status(200).json({
      message: "OTP verified successfully",
      verified: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error verifying OTP",
      error: error.message,
    });
  }
}

// Reset Password
async function resetPassword(req, res) {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        message: "Email, OTP, and new password are required",
      });
    }

    // Verify OTP one more time
    const verification = verifyOTP(email, otp);
    if (!verification.valid) {
      return res.status(400).json({ message: verification.message });
    }

    // Find user and update password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await signupModel.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true },
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Clear OTP from store
    clearOTP(email);

    res.status(200).json({
      message: "Password reset successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error resetting password",
      error: error.message,
    });
  }
}

// Logout
async function logout(req, res) {
  res.clearCookie("authToken");
  res.status(200).json({ message: "Logout successfully" });
}

module.exports = {
  googleLogin,
  signup,
  getSignups,
  deleteSignup,
  login,
  getLogins,
  deleteLogin,
  sendOTP,
  verifyOTP,
  resetPassword,
  logout,
};
