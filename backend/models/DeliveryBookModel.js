const mongoose = require("mongoose");
const deliveryBookSchema = new mongoose.Schema(
    {
        companyName: {
            type: String,
            required: true,
        },
        emailHost: {
            type: String,
            required: true,
        },
        billingEmail: { type: String, required: true },
        sites: [
            {
                name: { type: String, required: true },
                billingAddress: { type: String, required: true },
                deliveryAddress: { type: String, required: true },
            }
        ]

    });

const DeliveryBook = mongoose.model("DeliveryBook", deliveryBookSchema);
module.exports = DeliveryBook;
