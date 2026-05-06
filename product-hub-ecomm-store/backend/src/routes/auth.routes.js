const express = require("express");
const {
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
} = require("../controllers/auth.controller");
const {
  signupValidationRules,
  loginValidationRules,
  googleLoginValidationRules,
} = require("../middlewares/validation.middleware");

const router = express.Router();

router.post("/google-login", googleLoginValidationRules, googleLogin);
router.post("/signup", signupValidationRules, signup);
router.get("/signup", getSignups);
router.delete("/signup/:id", deleteSignup);
router.post("/login", loginValidationRules, login);
router.get("/login", getLogins);
router.delete("/login/:id", deleteLogin);
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);
router.post("/logout", logout);

module.exports = router;
