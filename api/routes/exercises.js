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
    const { page } = req.query;

    const LIMIT = 24;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await Exercise.countDocuments({});

    const exercises = await Exercise.find().limit(LIMIT).skip(startIndex);

    res.status(200).json({
      data: exercises,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET EXERCISE BY SEARCH
router.get("/search", async (req, res) => {
  try {
    const { page, searchQuery, bodyPart, target, equipment } = req.query;

    const LIMIT = 24;
    const startIndex = (Number(page) - 1) * LIMIT;
    let total;

    let name;

    if (searchQuery) {
      name = new RegExp(searchQuery, "i");
    }

    let exercises;

    if (
      name &&
      bodyPart &&
      bodyPart !== "all" &&
      target &&
      target !== "all" &&
      equipment &&
      equipment !== "all"
    ) {
      exercises = await Exercise.find({
        $and: [{ name }, { bodyPart }, { target }, { equipment }],
      })
        .limit(LIMIT)
        .skip(startIndex);
      total = await Exercise.countDocuments({
        $and: [{ name }, { bodyPart }, { target }, { equipment }],
      });
    } else if (
      name &&
      bodyPart &&
      bodyPart !== "all" &&
      equipment &&
      equipment !== "all"
    ) {
      exercises = await Exercise.find({
        $and: [{ name }, { bodyPart }, { equipment }],
      })
        .limit(LIMIT)
        .skip(startIndex);
      total = await Exercise.countDocuments({
        $and: [{ name }, { bodyPart }, { equipment }],
      });
    } else if (
      name &&
      target &&
      target !== "all" &&
      equipment &&
      equipment !== "all"
    ) {
      exercises = await Exercise.find({
        $and: [{ name }, { target }, { equipment }],
      })
        .limit(LIMIT)
        .skip(startIndex);
      total = await Exercise.countDocuments({
        $and: [{ name }, { equipment }, { target }],
      });
    } else if (
      bodyPart &&
      bodyPart !== "all" &&
      target &&
      target !== "all" &&
      equipment &&
      equipment !== "all"
    ) {
      exercises = await Exercise.find({
        $and: [{ bodyPart }, { target }, { equipment }],
      })
        .limit(LIMIT)
        .skip(startIndex);
      total = await Exercise.countDocuments({
        $and: [{ equipment }, { bodyPart }, { target }],
      });
    } else if (
      name &&
      bodyPart &&
      bodyPart !== "all" &&
      target &&
      target !== "all"
    ) {
      exercises = await Exercise.find({
        $and: [{ name }, { bodyPart }, { target }],
      })
        .limit(LIMIT)
        .skip(startIndex);
      total = await Exercise.countDocuments({
        $and: [{ name }, { bodyPart }, { target }],
      });
    } else if (
      bodyPart &&
      bodyPart !== "all" &&
      equipment &&
      equipment !== "all"
    ) {
      exercises = await Exercise.find({ $and: [{ bodyPart }, { equipment }] })
        .limit(LIMIT)
        .skip(startIndex);
      total = await Exercise.countDocuments({
        $and: [{ bodyPart }, { equipment }],
      });
    } else if (target && target !== "all" && equipment && equipment !== "all") {
      exercises = await Exercise.find({ $and: [{ target }, { equipment }] })
        .limit(LIMIT)
        .skip(startIndex);
      total = await Exercise.countDocuments({
        $and: [{ equipment }, { target }],
      });
    } else if (name && equipment && equipment !== "all") {
      exercises = await Exercise.find({ $and: [{ name }, { equipment }] })
        .limit(LIMIT)
        .skip(startIndex);
      total = await Exercise.countDocuments({
        $and: [{ name }, { equipment }],
      });
    } else if (name && bodyPart && bodyPart !== "all") {
      exercises = await Exercise.find({
        $and: [{ name }, { bodyPart }],
      })
        .limit(LIMIT)
        .skip(startIndex);
      total = await Exercise.countDocuments({
        $and: [{ bodyPart }, { name }],
      });
    } else if (name && target && target !== "all") {
      exercises = await Exercise.find({
        $and: [{ name }, { target }],
      })
        .limit(LIMIT)
        .skip(startIndex);
      total = await Exercise.countDocuments({
        $and: [{ name }, { target }],
      });
    } else if (bodyPart && bodyPart !== "all" && target && target !== "all") {
      exercises = await Exercise.find({
        $and: [{ bodyPart }, { target }],
      })
        .limit(LIMIT)
        .skip(startIndex);
      total = await Exercise.countDocuments({
        $and: [{ bodyPart }, { target }],
      });
    } else if (equipment && equipment !== "all") {
      exercises = await Exercise.find({ equipment })
        .limit(LIMIT)
        .skip(startIndex);
      total = await Exercise.countDocuments({ equipment });
    } else if (bodyPart && bodyPart !== "all") {
      exercises = await Exercise.find({ bodyPart })
        .limit(LIMIT)
        .skip(startIndex);
      total = await Exercise.countDocuments({ bodyPart });
    } else if (target && target !== "all") {
      exercises = await Exercise.find({ target }).limit(LIMIT).skip(startIndex);
      total = await Exercise.countDocuments({ target });
    } else if (name) {
      exercises = await Exercise.find({ name }).limit(LIMIT).skip(startIndex);
      total = await Exercise.countDocuments({ name });
    } else {
      exercises = await Exercise.find({}).limit(LIMIT).skip(startIndex);
      total = await Exercise.countDocuments({});
    }

    res.status(200).json({
      data: exercises,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//GET EXERCISE
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const exercise = await Exercise.findById(id);
    res.status(200).json({ data: exercise });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
