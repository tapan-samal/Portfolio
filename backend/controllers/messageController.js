import mongoose from "mongoose";
import { catchAsyncError } from "../middleWares/catchAsyncError.js";
import ErrorHandler from "../middleWares/error.js";
import { Message } from "../models/messageSchema.js";

export const sendMessage = catchAsyncError(async (req, res, next) => {
  const { senderName, subject, message } = req.body;

  if (!senderName || !subject || !message) {
    return next(new ErrorHandler("Please fill in all required fields!", 400));
  }

  const data = await Message.create({ senderName, subject, message });

  res.status(200).json({
    success: true,
    message: "Message sent!",
    data,
  });
});

export const getAllMessages = catchAsyncError(async (req, res, next) => {
  const messages = await Message.find();

  res.status(200).json({
    success: true,
    messages,
  });
});

export const deleteMessage = catchAsyncError(async (req, res, next) => {
  const { messageId } = req.params;

  if (!mongoose.isValidObjectId(messageId)) {
    return next(new ErrorHandler("Invalid message ID!", 400));
  }

  const message = await Message.findByIdAndDelete(messageId);

  if (!message) {
    return next(new ErrorHandler("Message does not exist!", 404));
  }

  res.status(200).json({
    success: true,
    message: "Message deleted successfully!",
  });
});
