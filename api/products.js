import express from "express";
import Product from "../models/Product";

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (error) {
    res.status(500).send({ message: "Server error. Please try again." });
  }
});

// POST new product
router.post("/", async (req, res) => {
  try {
    const {
      name,
      image,
      brand,
      category,
      description,
      qtyInStock,
      price,
    } = req.body;
    const productToSave = new Product({
      name,
      image,
      brand,
      category,
      description,
      qtyInStock,
      price,
    });

    const savedProduct = await productToSave.save();
    res.status(201).send(savedProduct);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Unable to add product. Please try again." });
  }
});

// PUT existing product
router.put("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const {
      name,
      image,
      brand,
      category,
      description,
      qtyInStock,
      price,
    } = req.body;

    const product = Product.findOne({ _id });

    product.name = name;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.description = description;
    product.qtyInStock = qtyInStock;
    product.price = price;

    const savedProduct = await product.save();
    res.status(201).send(savedProduct);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Unable to update product. Please try again." });
  }
});

// GET product
router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const product = await Product.findOne({ _id });
    res.send(product);
  } catch (error) {
    res.status(400).send({ message: "Product not found. Please try again." });
  }
});

module.exports = router;
