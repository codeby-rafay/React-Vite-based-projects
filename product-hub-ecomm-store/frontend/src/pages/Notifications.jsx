// scratch

import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useShop } from "../context/ShopContext";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser: user, unreadNotificationCount, setUnreadNotificationCount } = useShop();

  // Fetch notifications from backend
  const fetchNotifications = async () => {
    try {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      setLoading(true);

      const response = await axiosInstance.get(`/notifications/${user.id}`);

      setNotifications(response.data.notifications || []);
      const count = response.data.unreadCount || 0;
      setUnreadNotificationCount(count);
    } catch (error) {
      console.error(
        "Error fetching notifications:",
        error.response?.data || error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  // Mark single notification as read
  const markAsRead = async (notification) => {
    try {
      // If already read, do nothing
      if (notification.isRead) return;

      const notificationId = notification._id;
      await axiosInstance.put(
        `/notifications/${notificationId}/read`,
        {},
        { withCredentials: true },
      );
      // Optimistic UI update: mark locally without full reload
      setNotifications((prev) =>
        prev.map((n) => (n._id === notificationId ? { ...n, isRead: true } : n)),
      );
      setUnreadNotificationCount(Math.max(0, unreadNotificationCount - 1));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      await axiosInstance.put(
        `/notifications/${user.id}/read-all`,
        {},
        { withCredentials: true },
      );
      fetchNotifications(); // Refresh notifications
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  // Delete single notification
  const deleteNotification = async (notificationId) => {
    try {
      await axiosInstance.delete(`/notifications/${notificationId}`, {
        withCredentials: true,
      });
      fetchNotifications(); // Refresh notifications
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  // Clear all notifications
  const clearAllNotifications = async () => {
    try {
      await axiosInstance.delete(`/notifications/${user.id}/clear-all`, {
        withCredentials: true,
      });
      fetchNotifications(); // Refresh notifications
    } catch (error) {
      console.error("Error clearing notifications:", error);
    }
  };

  // Fetch notifications on component mount
  useEffect(() => {
    if (!user?.id) return;

    fetchNotifications();
  }, [user?.id]);

  const getNotificationStyle = (type) => {
    const styles = {
      order_placed: {
        icon: "🎉",
        bg: "bg-blue-50",
        border: "border-l-4 border-blue-500",
        textColor: "text-blue-700",
      },
      order_confirmed: {
        icon: "✅",
        bg: "bg-green-50",
        border: "border-l-4 border-green-500",
        textColor: "text-green-700",
      },
      order_shipped: {
        icon: "🚚",
        bg: "bg-purple-50",
        border: "border-l-4 border-purple-500",
        textColor: "text-purple-700",
      },
      order_delivered: {
        icon: "📦",
        bg: "bg-emerald-50",
        border: "border-l-4 border-emerald-500",
        textColor: "text-emerald-700",
      },
      order_cancelled: {
        icon: "❌",
        bg: "bg-red-50",
        border: "border-l-4 border-red-500",
        textColor: "text-red-700",
      },
      payment_completed: {
        icon: "💳",
        bg: "bg-yellow-50",
        border: "border-l-4 border-yellow-500",
        textColor: "text-yellow-700",
      },
    };

    return styles[type] || styles.order_placed;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 to-amber-50 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
            {unreadNotificationCount > 0 && (
              <span className="bg-orange-500 text-white rounded-full px-3 py-1 text-sm font-semibold">
                {unreadNotificationCount} New
              </span>
            )}
          </div>
          <p className="text-gray-600">
            Track your order updates and important notifications here
          </p>
        </div>

        {/* Action Buttons */}
        {notifications.length > 0 && (
          <div className="flex gap-2 mb-6 justify-end">
            {unreadNotificationCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 cursor-pointer active:scale-95 transition text-sm font-medium"
              >
                Mark All as Read
              </button>
            )}
            <button
              onClick={clearAllNotifications}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 cursor-pointer active:scale-95 transition text-sm font-medium"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <div className="text-4xl mb-4">📭</div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                No Notifications
              </h2>
              <p className="text-gray-500">
                You're all caught up! Check back later for order updates.
              </p>
            </div>
          ) : (
            notifications.map((notification) => {
              const style = getNotificationStyle(notification.type);

              return (
                <div
                  key={notification._id}
                  className={`${style.bg} ${style.border} p-4 rounded-lg cursor-pointer transition hover:shadow-md ${
                    !notification.isRead ? "shadow-md" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    markAsRead(notification);
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className={`font-semibold ${style.textColor}`}>
                            {notification.title}
                          </h3>
                          {!notification.isRead && (
                            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                          )}
                        </div>
                        <p className="text-gray-700 mt-1 text-sm">
                          {notification.message}
                        </p>

                        {/* Show order details if available */}
                        {notification.orderDetails && (
                          <div className="mt-3 text-sm text-gray-600 bg-white bg-opacity-50 p-2 rounded">
                            <p>
                              <strong>Order ID:</strong>{" "}
                              {String(notification.orderDetails.orderNumber || "").slice(-8).toUpperCase()}
                            </p>
                            <p>
                              <strong>Product:</strong>{" "}
                              {notification.orderDetails.productName || notification.orderDetails.product || "N/A"}
                            </p>
                            <p>
                              <strong>Amount:</strong> Rs{" "}
                              {notification.orderDetails.totalAmount}
                            </p>
                            <p>
                              <strong>Payment:</strong>{" "}
                              {notification.orderDetails.paymentMethod === "cod"
                                ? "Cash on Delivery"
                                : "Card Payment"}
                            </p>
                          </div>
                        )}

                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(
                            notification.createdAt,
                          ).toLocaleDateString()}{" "}
                          at{" "}
                          {new Date(notification.createdAt).toLocaleTimeString(
                            "en-US",
                            { hour: "2-digit", minute: "2-digit" },
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification._id);
                      }}
                      className="text-gray-400 hover:text-red-600 cursor-pointer transition text-xl"
                      title="Delete notification"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Info */}
        {notifications.length > 0 && (
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>💡 Tip:</strong> Notifications are automatically refreshed
              every 30 seconds. You can also mark notifications as read or
              delete them individually.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
