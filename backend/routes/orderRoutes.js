// orderRoutes.js

const express = require("express");
const router = express.Router();
const {
  verifyIsLoggedIn,
  verifyIsAdmin,
} = require("../middleware/verifyAuthToken");
const {
  getUserOrders,
  getOrder,
  createOrder,
  updateOrderToPaid,
  updateOrderToDelivered,
  updateOrderNote,
  getOrders,
  getOrderForAnalysis,
  getOrdersInvNo,
} = require("../controllers/orderController");

// user routes
router.use(verifyIsLoggedIn);
router.get("/", getUserOrders);
router.get("/user/:id", getOrder);
router.post("/", createOrder);
router.put("/paid/:id", updateOrderToPaid);
router.get("/invoiceNumber", getOrdersInvNo);
router.put("/updateOrderNote/:id", updateOrderNote);

// admin routes
router.use(verifyIsAdmin);
router.put("/delivered/:id", updateOrderToDelivered);
router.get("/admin", getOrders);
router.get("/analysis/:date", getOrderForAnalysis);

module.exports = router;
