const express = require('express')
const router = express.Router()
const {quoteProduct, quotePrice, managementApproval, newOrderRemind, sendInvoice} = require("../controllers/sendEmailController")
const { verifyIsLoggedIn } = require("../middleware/verifyAuthToken")


router.use(verifyIsLoggedIn)

router.post("/quoteproduct", quoteProduct)
router.post("/quoteprice", quotePrice)
router.post("/managementApproval", managementApproval)
router.post("/newOrderRemind", newOrderRemind)
router.post("/emailInv", sendInvoice)


module.exports = router

