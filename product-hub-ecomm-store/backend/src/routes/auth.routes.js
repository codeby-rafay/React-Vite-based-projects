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
  sendOTPValidationRules,
  verifyOTPValidationRules,
  resetPasswordValidationRules,
} = require("../middlewares/validation.middleware");

const router = express.Router();

router.post("/google-login", googleLoginValidationRules, googleLogin);
router.post("/signup", signupValidationRules, signup);
router.get("/signup", getSignups);
router.delete("/signup/:id", deleteSignup);
router.post("/login", loginValidationRules, login);
router.get("/login", getLogins);
router.delete("/login/:id", deleteLogin);
router.post("/send-otp", sendOTPValidationRules, sendOTP);
router.post("/verify-otp", verifyOTPValidationRules, verifyOTP);
router.post("/reset-password", resetPasswordValidationRules, resetPassword);
router.post("/logout", logout);

module.exports = router;
