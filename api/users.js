import express from "express";
import User from "../models/User";

const router = express.Router();

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
