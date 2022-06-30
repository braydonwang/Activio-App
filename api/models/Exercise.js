const mongoose = require("mongoose");
const ExerciseSchema = new mongoose.Schema(
  {
    id:{
      type: Number,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true,
      unique: true
    },
    gifUrl: {
      type: String,
      required: true
    },
    target: {
      type: String,
      required: true
    },
    bodyPart: {
      type: String,
      required: true
    },
    equipment: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Exercise", ExerciseSchema);
