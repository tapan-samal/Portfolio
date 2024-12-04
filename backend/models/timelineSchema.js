import mongoose from "mongoose";

const timelineSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: [true, "Please provide a timeline title!"],
    trim: true, 
  },
  description: {
    type: String,
    required: [true, "Please provide a timeline description!"],
    trim: true,
  },
  timeline: {
    from: {
      type: String,
      required: [true, "Please provide the start date for the timeline!"],
    },
    to: {
      type: String,
      required: [true, "Please provide the end date for the timeline!"],
    },
  },
});

export const Timeline = mongoose.model("Timeline", timelineSchema);
