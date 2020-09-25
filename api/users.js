const express = require("express");
const User = require("../models/User");
const { getToken } = require("../util");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    const { _id, name, email, isAdmin } = user;
    res.send({
      _id,
      name,
      email,
      isAdmin,
      token: getToken(user),
    });
  } catch (error) {
    res.status(401).send({ message: "Invalid email or password" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const userToSave = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    const savedUser = await userToSave.save();
    const { _id, name, email, isAdmin } = savedUser;

    res.status(201).send({
      _id,
      name,
      email,
      isAdmin,
      token: getToken(savedUser),
    });
  } catch (error) {
    res.status(500).send({ message: "Unable to register. Please try again." });
  }
});

module.exports = router;
