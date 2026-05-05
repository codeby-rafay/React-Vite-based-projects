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

const router = express.Router();

router.post("/google-login", googleLogin);
router.post("/signup", signup);
router.get("/signup", getSignups);
router.delete("/signup/:id", deleteSignup);
router.post("/login", login);
router.get("/login", getLogins);
router.delete("/login/:id", deleteLogin);
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);
router.post("/logout", logout);

module.exports = router;
