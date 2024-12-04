import { catchAsyncError } from "../middleWares/catchAsyncError.js";
import ErrorHandler from "../middleWares/error.js";
import { ApplicationTool } from "../models/applicationToolSchema.js";
import cloudinary from "cloudinary";

export const addApplicationTool = catchAsyncError(async (req, res, next) => {
  const { name } = req.body;
  const { icon } = req.files;

  if (!req.files || !icon) {
    return next(new ErrorHandler("Provide icon for application tool!", 400));
  }

  if (!name) {
    return next(new ErrorHandler("Provide application tool name!", 400));
  }

  const existingTool = await ApplicationTool.findOne({ name });
  if (existingTool) {
    return next(new ErrorHandler("Provided tool alredy exist!", 400));
  }

  // Upload image to Cloudinary
  const cloudinaryResponse = await cloudinary.uploader.upload(
    icon.tempFilePath,
    { folder: "APPLICATION_TOOL" }
  );

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    return next(
      new ErrorHandler(
        "Failed to upload icon to Cloudinary. Please try again!",
        500
      )
    );
  }
  const applicationTool = await ApplicationTool.create({
    name,
    icon: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: "New application tool added!",
    applicationTool,
  });
});

export const deleteApplicationTool = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const applicationTool = await ApplicationTool.findById(id);
  if (!applicationTool) {
    return next(new ErrorHandler("Application tool not found!", 404));
  }

  const applicationToolIcon = applicationTool.icon.public_id;
  await cloudinary.uploader.destroy(applicationToolIcon);
  await applicationTool.deleteOne();

  res.status(200).json({
    success: true,
    message: "Application tool deleted successfully!",
  });
});

export const getAllApplicationTool = catchAsyncError(async (req, res, next) => {
  const applicationTool = await ApplicationTool.find();

  res.status(200).json({
    success: true,
    count: applicationTool.length,
    applicationTool,
  });
});
