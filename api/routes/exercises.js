const router = require("express").Router();
const Exercise = require("../models/Exercise");

//ADD EXERCISE
router.post("/", async (req, res) => {
  const newExercise = new Exercise(req.body);
  try {
    const savedExercise = await newExercise.save();
    res.status(200).json(savedExercise);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET EXERCISES
router.get("/", async (req, res) => {
    try {
      const exercise = await Exercise.find();
      res.status(200).json(exercise);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
