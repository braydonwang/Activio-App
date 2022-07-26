const router = require("express").Router();
const Food = require("../models/Food");

// GET FOOD
router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const food = await Food.find({ username });
    res.status(200).json(food);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ADD FOOD
router.post("/", async (req, res) => {
  const newFood = new Food(req.body);
  try {
    const savedFood = await newFood.save();
    res.status(200).json(savedFood);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET FOOD ITEM
router.get("/item/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const food = await Food.findById(id);
    res.status(200).json(food);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
