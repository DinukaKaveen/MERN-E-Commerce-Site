const express = require("express");
const router = express.Router();
const Product = require("../models/product");

// save product
router.post("/new_product", (req, res) => {
  const newProduct = new Product(req.body);

  newProduct
    .save()
    .then((result) => {
      console.log(result);
      return res.status(200).json({
        success: true,
        message: "Product Creating Success",
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(400).json({
        success: false,
        message: "Product Creating Fail",
      });
    });
});

// get products
router.get("/view_products", (req, res) => {
  Product.find()
    .then((result) => {
      return res.status(200).json({
        success: true,
        products: result,
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(400).json({
        success: false,
        message: "Products Loading Fail",
      });
    });
});

//get product by id
router.get("/get_product/:id", (req, res) => {
  const product_id = req.params.id;

  Product.findById(product_id)
    .then((result) => {
      return res.status(200).json({
        success: true,
        product: result,
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(400).json({
        success: false,
        message: "Product Loading Fail",
      });
    });
});

// update product
router.put("/update_product/:id", (req, res) => {
  const product_id = req.params.id;

  Product.findByIdAndUpdate(product_id, { $set: req.body })
    .then((result) => {
      console.log(result);
      return res.status(200).json({
        success: true,
        message: "Product Updated Succefully",
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(400).json({
        success: false,
        message: "Product Updated Fail",
      });
    });
});

//update product status
router.put("/update_product_status/:id", (req, res) => {
  const product_id = req.params.id;

  Product.findByIdAndUpdate(product_id, { $set: req.body })
    .then((result) => {
      console.log(result);
      return res
        .status(200)
        .json({ success: true, message: "Product Status Updated" });
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(400)
        .json({ success: false, message: "Fail to Update Product Status" });
    });
});

// delete product
router.delete("/delete_product/:id", (req, res) => {
  const product_id = req.params.id;

  Product.findByIdAndDelete(product_id)
    .then((result) => {
      return res.status(200).json({
        success: true,
        deletedProduct: result,
        message: "Delete Successfully",
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(400).json({
        success: false,
        message: "Delete Fail",
      });
    });
});

module.exports = router;
