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
  checkAuth,
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

router.post("/auth/google-login", googleLoginValidationRules, googleLogin);
router.post("/auth/signup", signupValidationRules, signup);
router.get("/auth/signup", getSignups);
router.delete("/auth/signup/:id", deleteSignup);
router.post("/auth/login", loginValidationRules, login);
router.get("/auth/login", getLogins);
router.delete("/auth/login/:id", deleteLogin);
router.post("/auth/send-otp", sendOTPValidationRules, sendOTP);
router.post("/auth/verify-otp", verifyOTPValidationRules, verifyOTP);
router.post("/auth/reset-password", resetPasswordValidationRules, resetPassword);
router.post("/auth/logout", logout);
router.get("/auth/check-auth", checkAuth);

module.exports = router;
