// scratch

const express = require("express");
const { authAdmin, authUser } = require("../middlewares/auth.middleware");
const {
  submitFeedback,
  getAllFeedback,
  getFeedbackById,
  markFeedbackAsRead,
  replyToFeedback,
  deleteFeedback,
} = require("../controllers/feedback.controller");

const router = express.Router();

// User routes
router.post("/submit", authUser, submitFeedback);

// Admin routes
router.get("/feedback/all", authAdmin, getAllFeedback);
router.get("/feedback/:feedbackId", authAdmin, getFeedbackById);
router.put("/feedback/:feedbackId/mark-read", authAdmin, markFeedbackAsRead);
router.put("/feedback/:feedbackId/reply", authAdmin, replyToFeedback);
router.delete("/feedback/:feedbackId", authAdmin, deleteFeedback);

module.exports = router;
