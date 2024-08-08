const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  sku: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    required: true,
  },
  retailPrice: {
    type: String,
    required: true,
  },
  salePrice: {
    type: String,
    required: true,
  },
  lowestPrice: {
    type: String,
    required: true,
  },
  activeStatus: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("products", productSchema);
