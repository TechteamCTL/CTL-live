const express = require('express')
const router = express.Router()

const { adminCreateDeliveryBook, adminDeleteDeliveryBook, adminUpdateDeliveryBook, getAdminDeliveryBook, getDeliveryBook, getDeliveryBookById } = require("../controllers/deliveryBookController")

router.get("/", getDeliveryBook)
router.get("/get-one/:id", getDeliveryBookById)
router.get("/deliveryBook/:email", getDeliveryBook)
router.get("/admin", getAdminDeliveryBook)

router.post("/admin", adminCreateDeliveryBook)
router.put("/admin/:id", adminUpdateDeliveryBook)
router.delete("/admin/:id", adminDeleteDeliveryBook)

module.exports = router