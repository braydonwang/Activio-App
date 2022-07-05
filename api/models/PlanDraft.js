const mongoose = require("mongoose");
const WorkoutPlanDraftSchema = new mongoose.Schema(
  {
    title:{
        type:String,
        required:false,
    },
    desc:{
        type:String,
        required:false
    },
    photo:{
        type:String,
        required:false
    },
    username:{
        type:String,
        required:false
    },
    categories:{
        type:String,
        required:false
    },
    likeCount:{
        type:Number,
        required:false
    },
    timeInterval:{
        type:Number,
        rquired:false
    },
    exercises:{
        type:[Number],
        required:false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("WorkoutPlanDraft", WorkoutPlanDraftSchema);