import { catchAsyncError } from "../middleWares/catchAsyncError.js";
import ErrorHandler from "../middleWares/error.js";
import { Timeline } from "../models/timelineSchema.js";

export const addNewTimeline = catchAsyncError(async (req, res, next) => {
  const { title, description, timeline } = req.body;

  if (!timeline || !timeline.from || !timeline.to) {
    return next(new ErrorHandler("Provide timeline data!", 400));
  }

  const { from, to } = timeline;

  const existingTimeline = await Timeline.findOne({ title });
  if (existingTimeline) {
    return next(new ErrorHandler("Provided timeline already exists!", 400));
  }

  const newTimeline = await Timeline.create({
    title,
    description,
    timeline: { from, to },
  });

  res.status(201).json({
    success: true,
    message: "Timeline added successfully!",
    timeline: newTimeline,
  });
});


export const deleteTimeline = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const timeline = await Timeline.findById(id);

  if (!timeline) {
    return next(new ErrorHandler("Timeline not found", 404));
  }
  await timeline.deleteOne();

  res.status(200).json({
    success: true,
    message: "Timeline deleted successfully!",
  });
});

export const getAllTimeline = catchAsyncError(async (req, res, next) => {
  const timeline = await Timeline.find();
  res.status(200).json({
    success: true,
    count: timeline.length,
    timeline,
  });
});
