const mongoose = require("mongoose");

const mineralShareSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        symbolsCode: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        latestPrice: {
            type: String,
            required: true,
        },
        updateDate: {
            type: String,
            required: true,
        },
        difference: {
            type: String,
            required: true,
        },
    });

const MineralSharePrice = mongoose.model("MineralSharePrice", mineralShareSchema);
module.exports = MineralSharePrice;