//API request functions for getting/adding/editing/deleting contacts here on the /api/contacts router
const express = require("express");

const Contacts = require("./contacts-model.js");
const restricted = require("../authentication/restricted-middleware.js");

const router = express.Router();

router.get("/contacts", restricted, async (req, res) => {
  try {
    const contacts = await Contacts.find(req.query);
    res.status(200).json(contacts);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong!" });
  }
});

router.get("/contacts:id", restricted, async (req, res) => {
  try {
    const contact = await Contacts.findbyId(req.params.id);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "Contact with that ID not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving contact" });
  }
});

router.put("/contacts:id", restricted, async (req, res) => {
  try {
    const changed = await Acts.update(req.params.id, req.body);
    if (changed) {
      res.status(200).json(contact);
    } else {
      res
        .status(404)
        .json({ message: "The contact with that ID could not be found" });
    }
  } catch (error) {
    res.status(500).json({ message: "The contact could not be updated" });
  }
});

router.delete("/contacts:id", restricted, async (req, res) => {
  const { id } = req.params;

  try {
    const count = await db("contacts")
      .where({ id })
      .del();

    if (count) {
      res.json({ removed: count });
    } else {
      res.status(404).json({ message: "Could not find contact with given id" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to delete contact" });
  }
});

module.exports = router;
