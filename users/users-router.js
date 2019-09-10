const express = require("express");

const Users = require("./users-model.js");
const restricted = require("../authentication/restricted-middleware.js");

const router = express.Router();

router.get("/", restricted, async (req, res) => {
  try {
    const users = await Users.find(req.query);
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});

module.exports = router;
