import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  User,
  Mail,
  Calendar,
  DollarSign,
  Eye,
  ChevronDown,
  Loader,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import axios from "axios";
import { toast, Slide } from "react-toastify";

const ReviewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const API_BASE_URL = "http://localhost:5000/api";

  useEffect(() => {
    fetchOrders();
  }, [API_BASE_URL]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/orders`);

      if (response.data?.orders) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        transition: Slide,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/orders/${orderId}`, {
        orderStatus: newStatus,
      });

      if (response.data?.order) {
        setOrders(
          orders.map((o) => (o._id === orderId ? response.data.order : o)),
        );
        toast.success("Order status updated!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          transition: Slide,
        });
      }
    } catch (error) {
      toast.error("Failed to update order status", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        transition: Slide,
      });
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/orders/${orderId}`);
      setOrders(orders.filter((o) => o._id !== orderId));
      toast.success("Order deleted successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        transition: Slide,
      });
    } catch (error) {
      toast.error("Failed to delete order", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        transition: Slide,
      });
    }
  };

  const toggleOrderExpanded = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const filteredOrders =
    filterStatus === "all"
      ? orders
      : orders.filter((order) => order.orderStatus === filterStatus);

  const getStatusColor = (status) => {
    const colors = {
      confirmed: "bg-blue-100 text-blue-800",
      pending: "bg-yellow-100 text-yellow-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || colors.pending;
  };

  const getPaymentStatusColor = (status) => {
    const colors = {
      completed: "bg-green-50 text-green-700",
      pending: "bg-yellow-50 text-yellow-700",
      failed: "bg-red-50 text-red-700",
    };
    return colors[status] || colors.pending;
  };

  const totalRevenue = useMemo(() => {
    return orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  }, [orders]);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4">
        <div className="text-center">
          <Loader
            size={48}
            className="animate-spin text-orange-500 mx-auto mb-4"
          />
          <p className="text-gray-600 font-medium">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 to-amber-50 p-4 md:p-8">
      <div className="mb-6">
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="absolute top-5 left-2 flex items-center cursor-pointer text-2xl gap-2 text-orange-500 hover:text-orange-600 px-6 py-2 font-semibold transition-colors hover:underline"
        >
          <ArrowLeft size={24} strokeWidth={2} /> Back
        </button>
      </div>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 mt-10"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Customer Orders
          </h1>
          <p className="text-gray-600 text-lg">
            Manage and track all customer purchases
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Total Orders
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {orders.length}
                </p>
              </div>
              <Package size={32} className="text-orange-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Confirmed</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">
                  {orders.filter((o) => o.orderStatus === "confirmed").length}
                </p>
              </div>
              <Package size={32} className="text-blue-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Pending</p>
                <p className="text-3xl font-bold text-yellow-500 mt-2">
                  {orders.filter((o) => o.orderStatus === "pending").length}
                </p>
              </div>
              <Package size={32} className="text-yellow-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Total Revenue
                </p>
                <p className="text-3xl font-bold text-orange-600 mt-2">
                  ${totalRevenue.toFixed(2)}
                </p>
              </div>
              <DollarSign size={32} className="text-orange-500 opacity-20" />
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="mb-6 flex gap-2 flex-wrap">
          {[
            "all",
            "confirmed",
            "pending",
            "shipped",
            "delivered",
            "cancelled",
          ].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg font-medium cursor-pointer transition-all capitalize ${
                filterStatus === status
                  ? "bg-orange-500 text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-orange-400"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center">
            <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 text-lg font-medium">No orders found</p>
            <p className="text-gray-500 mt-2">
              {filterStatus === "all"
                ? "There are no orders yet."
                : `There are no ${filterStatus} orders.`}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Order Header */}
                <div
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleOrderExpanded(order._id)}
                >
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                    <div>
                      <p className="text-xs text-gray-500 font-medium uppercase">
                        Order ID
                      </p>
                      <p className="text-sm font-mono font-bold text-gray-900 mt-1">
                        {order._id.slice(-8).toUpperCase()}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 font-medium uppercase">
                        Customer
                      </p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">
                        {order.userName}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {order.userEmail}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 font-medium uppercase">
                        Total
                      </p>
                      <p className="text-lg font-bold text-orange-600 mt-1">
                        ${order.totalAmount.toFixed(2)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 font-medium uppercase">
                        Status
                      </p>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize mt-1 ${getStatusColor(
                          order.orderStatus,
                        )}`}
                      >
                        {order.orderStatus}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500 font-medium uppercase">
                          Date
                        </p>
                        <p className="text-sm text-gray-900 mt-1">
                          {new Date(order.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                      <ChevronDown
                        size={20}
                        className={`text-gray-400 transition-transform ${
                          expandedOrderId === order._id ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Order Details*/}
                <div
                  className={`border-t border-gray-100 bg-gray-50 overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedOrderId === order._id
                      ? "max-h-500 opacity-100 p-6"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {/* Order Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <User size={16} className="text-orange-500" />
                        Customer Info
                      </h4>
                      <div className="space-y-2 text-sm">
                        <p className="text-gray-600">
                          <span className="font-medium">Name:</span>{" "}
                          {order.userName}
                        </p>
                        <p className="text-gray-600 break-all">
                          <span className="font-medium">Email:</span>{" "}
                          {order.userEmail}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Items:</span>{" "}
                          {order.totalItems}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Calendar size={16} className="text-orange-500" />
                        Order Info
                      </h4>
                      <div className="space-y-2 text-sm">
                        <p className="text-gray-600">
                          <span className="font-medium">Date:</span>{" "}
                          {order.timestamp
                            ? formatDate(order.timestamp)
                            : "N/A"}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Payment:</span>
                          <span
                            className={`ml-2 px-2 py-1 rounded text-xs font-semibold capitalize ${getPaymentStatusColor(
                              order.paymentStatus,
                            )}`}
                          >
                            {order.paymentStatus}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <DollarSign size={16} className="text-orange-500" />
                        Amount
                      </h4>
                      <div className="space-y-2 text-sm">
                        <p className="text-gray-900 text-2xl font-bold">
                          ${order.totalAmount.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Products */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Package size={16} className="text-orange-500" />
                      Products ({order.products.length})
                    </h4>
                    <div className="space-y-3">
                      {order.products.map((product, idx) => (
                        <div
                          key={idx}
                          className="bg-white rounded-lg p-4 border border-gray-200 flex justify-between items-start gap-4 shadow-sm"
                        >
                          <div className="grid md:grid-cols-2 items-start text-sm flex-1">
                            <div>
                              <p className="text-xs text-gray-500 font-medium uppercase">
                                Product Name
                              </p>
                              <p className="font-bold text-lg text-gray-900 mt-1">
                                {product.name || product.title || "Product"}
                              </p>
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                              <div>
                                <p className="text-xs text-gray-500 font-medium uppercase">
                                  Category
                                </p>
                                <p className="text-gray-800 mt-1">
                                  {product.category || "N/A"}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 font-medium uppercase">
                                  Price
                                </p>
                                <p className="font-semibold text-gray-900 mt-1">
                                  ${product.price.toFixed(2)}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 font-medium uppercase">
                                  Qty
                                </p>
                                <p className="text-gray-900 mt-1">
                                  {product.quantity}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 font-medium uppercase">
                                  Subtotal
                                </p>
                                <p className="font-bold text-orange-600 mt-1">
                                  $
                                  {(product.price * product.quantity).toFixed(
                                    2,
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Management */}
                  <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between border-t border-gray-200 pt-6">
                    <div className="flex gap-2">
                      <select
                        value={order.orderStatus}
                        onChange={(e) =>
                          handleStatusUpdate(order._id, e.target.value)
                        }
                        className="px-4 py-2 cursor-pointer rounded-lg border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>

                    <button
                      onClick={() => handleDeleteOrder(order._id)}
                      className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors cursor-pointer"
                    >
                      Delete Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewOrders;
