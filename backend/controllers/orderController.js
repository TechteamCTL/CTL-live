const Order = require("../models/OrderModel");
const Product = require("../models/ProductModel");
const ObjectId = require("mongodb").ObjectId;
const mongoose = require("mongoose");

const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: ObjectId(req.user._id) });
    res.send(orders);
  } catch (error) {
    next(error);
  }
};

const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "-password -isAdmin -_id -__v -createdAt -updatedAt")
      .orFail();
    res.send(order);
  } catch (err) {
    next(err);
  }
};

const getOrdersInvNo = async (req, res, next) => {
  try {
    const orders = await Order.find({}, "invoiceNumber").sort({
      createdAt: "asc",
    });
    res.send(orders);
  } catch (err) {
    next(err);
  }
};

const createOrder = async (req, res, next) => {
  try {
    // 如果要加新元素，就在这里写
    const {
      cartItems,
      orderTotal,
      paymentMethod,
      purchaseNumber,
      invoiceNumber,
      orderNote,
    } = req.body;
    if (
      !cartItems ||
      !orderTotal ||
      !paymentMethod ||
      !purchaseNumber ||
      !invoiceNumber
    ) {
      return res.status(400).send("All inputs are required");
    }

    const order = new Order({
      // 新元素
      user: ObjectId(req.user._id),
      orderTotal: orderTotal,
      cartItems: cartItems,
      paymentMethod: paymentMethod,
      purchaseNumber: purchaseNumber,
      invoiceNumber: invoiceNumber,
      orderNote: orderNote,
    });
    const createdOrder = await order.save();
    res.status(201).send(createdOrder);
  } catch (err) {
    next(err);
  }
};

const updateOrderToPaid = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).orFail();
    order.isPaid = true;
    order.paidAt = Date.now();

    const updatedOrder = await order.save();
    res.send(updatedOrder);
  } catch (err) {
    next(err);
  }
};

const updateOrderToDelivered = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).orFail();
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    // Subtract the quantity of ordered products from the count in stock
    for (const item of order.cartItems) {
      const productId = item.productId;
      const stockId = item.cartProducts[0]._id;

      // Find the product using productId
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error(`Product with id ${productId} not found.`);
      }

      // Find the stock item using stockId
      const stockItem = product.stock.id(stockId);
      if (!stockItem) {
        throw new Error(
          `Stock item ${stockId} not found in product ${productId}.`
        );
      }

      // Subtract suppliedQty from stock item count
      stockItem.count -= Number(item.cartProducts[0].suppliedQty);

      // Save changes to the product
      await product.save();
    }

    const updatedOrder = await order.save();
    res.send(updatedOrder);
  } catch (err) {
    next(err);
  }
};

/* const updateBackOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.order._id })
    	"orderId":"648048f6a348b96de87296f5"
    let itemIndex = -1;
    let productIndex = -1;
    order.cartItems.forEach((item, i) => {
      item.cartProducts.forEach((product, j) => {
        if (product._id.toString() === req.params.itemId) {
          itemIndex = i;
          productIndex = j;
        }
      });
    });

    if (itemIndex !== -1) {
      order.cartItems[itemIndex].cartProducts.suppliedQty = suppliedQty;
      order.cartItems[itemIndex].cartProducts.backOrder = order.cartItems[itemIndex].cartProducts.quantity - suppliedQty;
    }

    await order.save();

    res.json({
      message: "order updated",
    });
  } catch (err) {
    next(err);
  }
}; */

/* const updateBackOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const suppliedQty = req.body.suppliedQty;
    if (!orderId) {
      return res.status(400).json({
        error: "Order ID not found in the request",
      });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        error: "Order not found",
      });
    }

    let itemIndex = -1;
    if (order.cartItems) {
      order.cartItems.forEach((item, i) => {
        const product = item.cartProducts[0];
        if (product && product._id.toString() === req.params.itemId) {
          itemIndex = i;
        }
      });
    }

    if (itemIndex !== -1) {
      order.cartItems[itemIndex].cartProducts[0].suppliedQty = suppliedQty;
      order.cartItems[itemIndex].cartProducts[0].backOrder =
        order.cartItems[itemIndex].cartProducts[0].quantity - suppliedQty;
      const backOrderQty =
        order.cartItems[itemIndex].cartProducts[0].quantity - suppliedQty;
      order.orderTotal.itemsCount -= Number(backOrderQty);
      order.orderTotal.cartSubtotal -=
      Number(backOrderQty * order.cartItems[itemIndex].cartProducts[0].price * 1.1);
      console.log("backOrderQty:", backOrderQty);
      console.log("suppliedQty:", suppliedQty);
      console.log("cartSubtotal:", order.orderTotal.cartSubtotal);
      console.log("itemsCount:", order.orderTotal.itemsCount);
      try {
        await order.save();
        res.json({
          message: "Order updated",
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    } else {
      res.status(404).json({
        message: "Item not found",
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; */

const updateBackOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const suppliedQty = req.body.suppliedQty;

    if (!orderId || suppliedQty === undefined) {
      return res.status(400).json({
        error: "Order ID or supplied quantity not found in the request",
      });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        error: "Order not found",
      });
    }

    let itemIndex = -1;
    if (order.cartItems) {
      order.cartItems.forEach((item, i) => {
        const product = item.cartProducts[0];
        if (product && product._id.toString() === req.params.itemId) {
          itemIndex = i;
        }
      });
    }

    if (itemIndex !== -1) {
      const item = order.cartItems[itemIndex].cartProducts[0];

      if (suppliedQty > item.quantity) {
        return res.status(400).json({
          error: "Supplied quantity cannot exceed the current quantity",
        });
      }

      const oldBackOrderQty = item.backOrder;
      item.suppliedQty = suppliedQty;
      item.backOrder = item.quantity - suppliedQty;
      const newBackOrderQty = item.backOrder;
      const deltaBackOrderQty = newBackOrderQty - oldBackOrderQty;
      
      order.orderTotal.itemsCount -= deltaBackOrderQty;
      order.orderTotal.cartSubtotal -=
      deltaBackOrderQty * item.price * 1.1;

      console.log("backOrderQty:", newBackOrderQty);
      console.log("suppliedQty:", suppliedQty);
      console.log("cartSubtotal:", order.orderTotal.cartSubtotal);
      console.log("itemsCount:", order.orderTotal.itemsCount);

      try {
        await order.save();
        res.json({
          message: "Order updated",
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    } else {
      res.status(404).json({
        message: "Item not found",
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




const deleteOrderItem = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    if (!orderId) {
      return res.status(400).json({
        error: "Order ID not found in the request",
      });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        error: "Order not found",
      });
    }

    let itemIndex = -1;
    if (order.cartItems) {
      order.cartItems.forEach((item, i) => {
        const product = item.cartProducts[0];
        if (product && product._id.toString() === req.params.itemId) {
          itemIndex = i;
        }
      });
    }
    if (itemIndex !== -1) {
      const item = order.cartItems[itemIndex].cartProducts[0];
      order.cartItems.splice(itemIndex, 1);

      order.orderTotal.itemsCount -= item.suppliedQty;
      order.orderTotal.cartSubtotal -=
      item.suppliedQty * item.price * 1.1;

      try {
        await order.save();
        res.json({
          message: "Item Deleted",
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    } else {
      res.status(404).json({
        message: "Item not found",
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateOrderNote = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).orFail();

    if (req.body.orderNote) {
      order.orderNote = req.body.orderNote;
    }

    const updatedOrder = await order.save();
    res.send(updatedOrder);
  } catch (err) {
    next(err);
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId).orFail();
    await order.remove();
    res.send("order deleted");
  } catch (err) {
    next(err);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({})
      .populate("user", "-password")
      .sort({ createdAt: "asc" });
    res.send(orders);
  } catch (err) {
    next(err);
  }
};

const getOrderForAnalysis = async (req, res, next) => {
  try {
    const start = new Date(req.params.date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(req.params.date);
    end.setHours(23, 59, 59, 999);

    const order = await Order.find({
      createdAt: {
        $gte: start,
        $lte: end,
      },
    }).sort({ createdAt: "asc" });
    res.send(order);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUserOrders,
  getOrder,
  getOrdersInvNo,
  createOrder,
  updateOrderToPaid,
  updateOrderToDelivered,
  updateOrderNote,
  getOrders,
  getOrderForAnalysis,
  updateBackOrder,
  deleteOrderItem,
  deleteOrder
};
