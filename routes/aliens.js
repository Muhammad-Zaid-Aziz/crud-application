const express = require("express");
const alien = require("../models/alien");
const model = require("mongoose");
const router = express.Router();
const Alien = require("../models/alien");

//get api all aliens
router.get("/", async (req, res) => {
  try {
    const aliens = await Alien.find();
    res.json(aliens);
  } catch (err) {
    res.send("Error occurs in GET all" + err);
  }
});

//get api single alien
router.get("/:id", async (req, res) => {
  try {
    const alien = await Alien.findById(req.params.id);
    res.json(alien);
  } catch (err) {
    res.send("Error occurs in GET single : " + err);
  }
});

//post api aliens
router.post("/", async (req, res) => {
  const alien = new Alien({
    name: req.body.name,
    teach: req.body.teach,
    sub: req.body.sub,
  });

  try {
    const a1 = await alien.save();
    res.json(a1);
  } catch (err) {
    res.send("error in post => " + err);
  }
});

//patch api
router.patch("/:id", async (req, res) => {
  try {
    const alien = await Alien.findById(req.params.id);
    if (alien != null) {
      alien.sub = req.body.sub;
      const a1 = await alien.save();
      res.json(a1);
    } else {
      res.send("Record not found against this ID");
    }
  } catch (err) {
    res.send("Ivalid ID!: Error => " + err);
  }
});

// delete api
router.delete("/:id", async (req, res) => {
  try {
    let alien = await Alien.findByIdAndRemove(req.params.id);
    if (alien != null) {
      res.send("Record deleted successfully!");
    } else {
      res.send("Record not found!");
    }
  } catch (err) {
    res.send("Ivalid ID!: Error => " + err);
  }
});

module.exports = router;
