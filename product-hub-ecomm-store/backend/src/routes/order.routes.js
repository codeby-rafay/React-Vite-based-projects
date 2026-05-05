const express = require("express");
const {
  createOrder,
  getAllOrdersAdmin,
  getUserOrders,
  updateOrderStatusAdmin,
  deleteOrderAdmin,
} = require("../controllers/order.controller");
const { authAdmin, authUser } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/orders", authUser, createOrder);
router.get("/orders/admin", authAdmin, getAllOrdersAdmin);
router.get("/orders/user/:userId", authUser, getUserOrders);
router.patch("/orders/admin/:orderId", authAdmin, updateOrderStatusAdmin);
router.delete("/orders/admin/:orderId", authAdmin, deleteOrderAdmin);

module.exports = router;
