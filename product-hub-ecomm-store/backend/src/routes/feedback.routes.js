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
router.get("/all", authAdmin, getAllFeedback);
router.get("/:feedbackId", authAdmin, getFeedbackById);
router.put("/:feedbackId/mark-read", authAdmin, markFeedbackAsRead);
router.put("/:feedbackId/reply", authAdmin, replyToFeedback);
router.delete("/:feedbackId", authAdmin, deleteFeedback);

module.exports = router;
