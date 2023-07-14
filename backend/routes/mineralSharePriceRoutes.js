const express = require('express')
const router = express.Router()
const {getMineralPrice, adminCreatePrice, adminUpdateMineralsPrice} = require("../controllers/mineralSharePricing")
const { verifyIsLoggedIn, verifyIsAdmin } = require("../middleware/verifyAuthToken")


router.use(verifyIsLoggedIn)
router.get("/minerals", getMineralPrice)
router.use(verifyIsAdmin)
router.put("/updateMineralsPrice", adminUpdateMineralsPrice)
router.post("/create", adminCreatePrice)

module.exports = router

