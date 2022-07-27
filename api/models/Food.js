const mongoose = require("mongoose");
const FoodSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    calories: {
      type: String,
      required: true,
    },
    protein: {
      type: String,
      required: true,
    },
    fat: {
      type: String,
      required: true,
    },
    sodium: {
      type: String,
      required: true,
    },
    carbs: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Food", FoodSchema);
