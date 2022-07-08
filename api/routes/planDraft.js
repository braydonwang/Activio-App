const router = require("express").Router();
const PlanDraft = require("../models/PlanDraft");

//CREATE PLAN
router.post("/", async (req, res) => {
  const newPlan = new PlanDraft(req.body);
  try {
    const savedPlan = await newPlan.save();
    res.status(200).json(savedPlan);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE PLAN
router.put("/:id", async (req, res) => {
  try {
    const plan = await PlanDraft.findById(req.params.id);
    if (plan.username === req.body.username) {
      try {
        const updatedPlan = await PlanDraft.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPlan);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your workout plan!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE PLAN
router.delete("/:id", async (req, res) => {
  try {
    const plan = await PlanDraft.findById(req.params.id);
    if (plan.username === req.body.username) {
      try {
        await plan.delete();
        res.status(200).json("Workout plan has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your workout plan!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET NUMBER OF PLANS
router.get("/numPlans", async (req, res) => {
  try {
    const total = await PlanDraft.countDocuments({});
    res.status(200).json(total);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PLAN
router.get("/:id", async (req, res) => {
  try {
    const plan = await PlanDraft.findById(req.params.id);
    res.status(200).json(plan);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER'S PLANS
router.get("/user", async (req, res) => {
  const username = req.query.sort;
  try {
    const plans = await PlanDraft.find({ username });
    res.status(200).json(plans);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
