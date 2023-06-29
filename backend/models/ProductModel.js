const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
  path: { type: String, required: true },
});

const pdfSchema = mongoose.Schema({
  path: { type: String, required: true },
});

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    stock: [
      {
        attrs: {
          type: String,
          required: true,
        },
        count: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        barcode: {
          type: String,
          required: false,
        },
        slrsku: {
          type: String,
          required: false,
        },
        suppliersku: {
          type: String,
          required: true,
        },
        ctlsku: {
          type: String,
          required: true,
        },
        sales: {
          type: Number,
          default: 0,
        },
      },
    ],
    supplier: {
      type: String,
      required: true,
    },
    RRP: {
      type: Number,
      required: false,
    },
    category: {
      type: String,
      required: true,
    },
    images: [imageSchema],
    pdfs: [pdfSchema],
    purchaseprice: {
      type: Number,
      required: true,
    },
    slrcurrentbuyingprice: {
      type: Number,
      required: true,
    },
    saleunit: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
    standards: {
      type: String,
      required: false,
    },
    expireDate: {
      type: String, 
      required: false,
    }
  },
  {
    // 自动加时间戳
    timestamps: true,
  }
);


productSchema.index(
  {
    name: "text",
    "stock.slrsku": "text",
    "stock.ctlsku": "text",
  },
  {
    name: "TextIndex",
    default_language: "english",
    weights: {
      name: 4,
      "stock.slrsku": 1,
      "stock.ctlsku": 1,
    },
  }
);
productSchema.index({ "attrs.key": 1, "attrs.value": 1 });

const Product = mongoose.model("Product", productSchema);


module.exports = Product;
