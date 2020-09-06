// Don't use dotenv in production
if (process.env.NODE_ENV !== "production") require("dotenv").config();

import express from "express";
import mongoose from "mongoose";

// Mock data for now
import data from "./data";

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const app = express();

// DB Connect
mongoose.connect(
  MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => {
    console.log(`Mongo connected!`);
  }
);

// Routes
app.use("/api/users", require("./api/users"));

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.get("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  const product = data.products.find(
    (product) => product._id === parseInt(productId)
  );
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
