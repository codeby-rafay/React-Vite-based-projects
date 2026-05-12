// scratch

const notificationModel = require("../models/notification.model");
const orderModel = require("../models/order.model");

// Create notification helper function (called from order controller)
async function createNotification(
  userId,
  orderId,
  type,
  title,
  message,
  orderDetails,
) {
  try {
    const notification = await notificationModel.create({
      userId,
      orderId,
      type,
      title,
      message,
      orderDetails,
    });
    return notification;
  } catch (error) {
    console.error("Error creating notification:", error);
    return null;
  }
}

// GET - Fetch all notifications for a user
async function getUserNotifications(req, res) {
  try {
    const { userId } = req.params;

    if (req.user.id !== userId) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const notifications = await notificationModel
      .find({ userId, hiddenForUser: false })
      .sort({ createdAt: -1 })
      .populate("orderId", "orderNumber totalAmount orderStatus");

    const unreadCount = await notificationModel.countDocuments({
      userId,
      isRead: false,
      hiddenForUser: false,
    });

    res.status(200).json({
      message: "Notifications fetched successfully",
      notifications,
      unreadCount,
      totalNotifications: notifications.length,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching notifications",
      error: error.message,
    });
  }
}

// PUT - Mark notification as read
async function markNotificationAsRead(req, res) {
  try {
    const { notificationId } = req.params;

    const notification = await notificationModel.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { returnDocument: "after" },
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json({
      message: "Notification marked as read",
      notification,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating notification",
      error: error.message,
    });
  }
}

// PUT - Mark all notifications as read for a user
async function markAllNotificationsAsRead(req, res) {
  try {
    const { userId } = req.params;

    if (req.user.id !== userId) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    await notificationModel.updateMany({ userId }, { isRead: true });

    res.status(200).json({
      message: "All notifications marked as read",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating notifications",
      error: error.message,
    });
  }
}

// DELETE - Delete a notification (marks as hidden for user)
async function deleteNotification(req, res) {
  try {
    const { notificationId } = req.params;

    const notification = await notificationModel.findByIdAndUpdate(
      notificationId,
      { hiddenForUser: true },
      { returnDocument: "after" },
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json({
      message: "Notification deleted successfully",
      notification,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting notification",
      error: error.message,
    });
  }
}

// DELETE - Clear all notifications for a user (marks as hidden)
async function clearAllNotifications(req, res) {
  try {
    const { userId } = req.params;

    await notificationModel.updateMany(
      { userId },
      { hiddenForUser: true },
    );

    res.status(200).json({
      message: "All notifications cleared successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error clearing notifications",
      error: error.message,
    });
  }
}

module.exports = {
  createNotification,
  getUserNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  clearAllNotifications,
};
