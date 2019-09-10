//API requests for adding/editing acts through /api/acts here

const express = require("express");

const Acts = require("./acts-model.js");
const restricted = require("../authentication/restricted-middleware.js");

const router = express.Router();

router.get("/", restricted, async (req, res) => {
  try {
    const acts = await Acts.find(req.query);
    res.status(200).json(acts);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong!" });
  }
});

router.get("/:id", restricted, async (req, res) => {
  try {
    const act = await Acts.findbyId(req.params.id);
    if (act) {
      res.status(200).json(act);
    } else {
      res.status(404).json({ message: "Act with that ID not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving act" });
  }
});

router.put("/:id", restricted, async (req, res) => {
  try {
    const changed = await Acts.update(req.params.id, req.body);
    if (changed) {
      res.status(200).json(act);
    } else {
      res
        .status(404)
        .json({ message: "The act with that ID could not be found" });
    }
  } catch (error) {
    res.status(500).json({ message: "The act could not be updated" });
  }
});

module.exports = router;
