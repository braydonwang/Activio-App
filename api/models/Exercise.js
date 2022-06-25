const mongoose = require("mongoose");
const ExerciseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    gif: {
      type: String,
      required: true,
    },
    targets: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Exercise", ExerciseSchema);
