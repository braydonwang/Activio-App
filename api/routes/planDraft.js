const router = require("express").Router();
const PlanDraft = require("../models/PlanDraft");

//GET PLAN DRAFT
router.get("/:username", async (req, res) => {
  try {
    const plan = await PlanDraft.findOne({ username: req.params.username });
    res.status(200).json(plan);
  } catch (err) {
    res.status(500).json(err);
  }
});

//CREATE PLAN
router.post("/", async (req, res) => {
  const newPlan = new PlanDraft({ username: req.body.username, exercises: [] });
  try {
    const savedPlan = await newPlan.save();
    res.status(200).json(savedPlan);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//UPDATE EXERCISE IN DRAFT PLAN
router.put("/update", async (req, res) => {
  const { username, exercise } = req.body;
  const plan = await PlanDraft.findOne({ username });

  const index = plan.exercises
    .map((item) => item.id)
    .findIndex((id) => id === exercise.id);

  if (index === -1) {
    plan.exercises.push(exercise);
  } else {
    plan.exercises = plan.exercises.map((item) =>
      item.id === exercise.id ? exercise : item
    );
  }

  const updatedPlan = await PlanDraft.findOneAndUpdate({ username }, plan, {
    new: true,
  });

  res.status(200).json(updatedPlan);
});

//REMOVE EXERCISE IN DRAFT PLAN
router.put("/remove", async (req, res) => {
  const { username, exercise } = req.body;
  const plan = await PlanDraft.findOne({ username });

  plan.exercises = plan.exercises.filter((item) => item.id !== exercise.id);

  const updatedPlan = await PlanDraft.findOneAndUpdate({ username }, plan, {
    new: true,
  });

  res.status(200).json(updatedPlan);
});

module.exports = router;
