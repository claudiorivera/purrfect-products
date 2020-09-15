// Don't use dotenv in production
if (process.env.NODE_ENV !== "production") require("dotenv").config();

import express from "express";
import mongoose from "mongoose";

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

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", require("./api/users"));
app.use("/api/products", require("./api/products"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
