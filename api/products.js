import express from "express";
import Product from "../models/Product";
import getToken from "../util";

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

router.post("/", async (req, res) => {
  const {
    name,
    image,
    brand,
    category,
    description,
    qtyInStock,
    price,
  } = req.body;
  const product = new Product({
    name,
    image,
    brand,
    category,
    description,
    qtyInStock,
    price,
  });

  const newProduct = await product.save();

  if (newProduct) {
    res.status(201).send(newProduct);
  } else {
    res
      .status(500)
      .send({ message: "Unable to add product. Please try again." });
  }
});

router.get("/:id", async (req, res) => {
  // TODO
});

module.exports = router;
