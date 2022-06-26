const mongoose = require("mongoose");
const WorkoutPlanSchema = new mongoose.Schema(
  {
    title:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:false
    },
    username:{
        type:String,
        required:true
    },
    categories:{
        type:Array,
        required:true
    },
    likeCount:{
        type:Number,
        required:true
    },
    timeInterval:{
        type:Number,
        rquired:true
    },
    exercises:{
        type:[Object],
        required:true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("WorkoutPlan", WorkoutPlanSchema);