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
    const act = await Acts.findById(req.params.id);
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
  const { id } = req.params;
  const changes = req.body;

  try {
    const act = await Acts.findById(id);
    if (act) {
      const updatedAct = await Acts.update(changes, id);
      res.status(200).json(updatedAct);
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
