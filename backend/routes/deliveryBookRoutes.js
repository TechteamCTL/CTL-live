const express = require('express')
const router = express.Router()

const { adminCreateDeliveryBook, adminDeleteDeliveryBook, adminUpdateDeliveryBook, getAdminDeliveryBook, getDeliveryBook } = require("../controllers/deliveryBookController")

router.get("/deliveryBook/:email", getDeliveryBook)
router.get("/admindeliveryBook", getAdminDeliveryBook)
router.post("/admin", adminCreateDeliveryBook)
router.put("/admin/:id", adminUpdateDeliveryBook)
router.delete("/admin/:id", adminDeleteDeliveryBook)

module.exports = router