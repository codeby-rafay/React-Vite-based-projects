const express = require("express");
const {
  createOrder,
  getAllOrdersAdmin,
  getUserOrders,
  updateOrderStatusAdmin,
  deleteOrderAdmin,
} = require("../controllers/order.controller");

const router = express.Router();

router.post("/orders", createOrder);
router.get("/orders/admin", getAllOrdersAdmin);
router.get("/orders/user/:userId", getUserOrders);
router.patch("/orders/admin/:orderId", updateOrderStatusAdmin);
router.delete("/orders/admin/:orderId", deleteOrderAdmin);

module.exports = router;
