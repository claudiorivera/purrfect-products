import express from "express";
import User from "../models/User";
import { getToken } from "../util";

const router = express.Router();

router.post("/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  }).exec();
  if (user) {
    const { _id, name, email, isAdmin } = user;
    res.send({
      _id,
      name,
      email,
      isAdmin,
      token: getToken(user),
    });
  } else {
    res.status(401).send({ message: "Invalid email or password" });
  }
});

router.get("/createAdmin", async (req, res) => {
  try {
    const user = new User({
      name: "Claudio Rivera",
      email: "me@claudiorivera.com",
      password: "1",
      isAdmin: true,
    });

    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
