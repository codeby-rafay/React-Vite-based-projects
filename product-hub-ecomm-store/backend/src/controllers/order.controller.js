const orderModel = require("../models/order.model");
const jwt = require("jsonwebtoken");

// route 3: ORDERS
// (POST API)
async function createOrder(req, res) {
  try {
    const {
      userId,
      userEmail,
      userName,
      products,
      totalAmount,
      totalItems,
      shippingAddress,
      notes,
      paymentMethod,
    } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    if (!userEmail) {
      return res.status(400).json({ message: "User email is required" });
    }
    if (!userName) {
      return res.status(400).json({ message: "Username is required" });
    }
    if (!products) {
      return res.status(400).json({ message: "Products array is required" });
    }
    if (!totalAmount && totalAmount !== 0) {
      return res.status(400).json({ message: "Total amount is required" });
    }
    if (!shippingAddress) {
      return res.status(400).json({ message: "Shipping address is required" });
    }

    if (!Array.isArray(products)) {
      return res.status(400).json({ message: "Products must be an array" });
    }

    if (products.length === 0) {
      return res
        .status(400)
        .json({ message: "Products array cannot be empty" });
    }

    let paymentStatus = "pending";

    if (paymentMethod === "card") {
      paymentStatus = "completed";
    } else {
      paymentStatus = "pending";
    }

    const newOrder = {
      userId,
      userEmail,
      userName,
      products,
      totalAmount,
      totalItems: totalItems || products.length,
      shippingAddress: shippingAddress || "",
      notes: notes || "",
      paymentMethod: paymentMethod || "cod",
      orderStatus: "pending",
      paymentStatus: paymentStatus,
    };

    const order = await orderModel.create(newOrder);

    res.status(201).json({
      message: "Order placed successfully!",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error placing order: " + error.message,
      error: error.toString(),
    });
  }
}

// GET API - Fetch all orders (for admin dashboard)
async function getAllOrdersAdmin(req, res) {
  try {
    const orders = await orderModel
      .find()
      .sort({ timestamp: -1 })
      .populate("userId", "fullName email");

    res.status(200).json({
      message: "Orders fetched successfully",
      orders,
      totalOrders: orders.length,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
}

// GET API - Fetch user's orders
async function getUserOrders(req, res) {
  try {
    const { userId } = req.params;
    const orders = await orderModel.find({ userId }).sort({ timestamp: -1 });

    res.status(200).json({
      message: "User orders fetched successfully",
      orders,
      totalOrders: orders.length,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user orders" });
  }
}

// UPDATE API - Update order status
async function updateOrderStatusAdmin(req, res) {
  try {
    const { orderId } = req.params;
    const { orderStatus, paymentStatus, notes, shippingAddress } = req.body;

    let updateData = {
      ...(orderStatus !== undefined && { orderStatus }),
      ...(paymentStatus !== undefined && { paymentStatus }),
      ...(notes !== undefined && { notes }),
      ...(shippingAddress !== undefined && { shippingAddress }),
    };

    if (orderStatus === "delivered") {
      updateData.paymentStatus = "completed";
    }

    const updatedOrder = await orderModel.findOneAndUpdate(
      { _id: orderId },
      updateData,
      { returnDocument: "after" },
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating order" });
  }
}

// DELETE API - Delete order
async function deleteOrderAdmin(req, res) {
  try {
    const { orderId } = req.params;
    const deletedOrder = await orderModel.findOneAndDelete({ _id: orderId });

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order" });
  }
}

module.exports = {
  createOrder,
  getAllOrdersAdmin,
  getUserOrders,
  updateOrderStatusAdmin,
  deleteOrderAdmin,
};
