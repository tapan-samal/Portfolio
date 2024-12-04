import mongoose from "mongoose";
import { catchAsyncError } from "../middleWares/catchAsyncError.js";
import ErrorHandler from "../middleWares/error.js";
import { Project } from "../models/projectSchema.js";
import cloudinary from "cloudinary";


export const addNewProject = catchAsyncError(async (req, res, next) => {
  const { banner } = req.files || {};
  const {
    title,
    description,
    githubLink,
    projectLink,
    technologies,
    stack,
    deployed,
  } = req.body;

  if (!banner) {
    return next(new ErrorHandler("Provide project banner!", 400));
  }
  if (
    !title ||
    !description ||
    !githubLink ||
    !projectLink ||
    !technologies ||
    !stack ||
    !typeof deployed === "undefined"
  ) {
    return next(
      new ErrorHandler("Provide all details about the project!", 400)
    );
  }

  const existingProject = await Project.findOne({ title });
  if (existingProject) {
    return next(new ErrorHandler("Provided project already exists!", 400));
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(
    banner.tempFilePath,
    { folder: "PROJECT_BANNER" }
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    return next(
      new ErrorHandler(
        "Failed to upload banner to Cloudinary. Please try again!",
        500
      )
    );
  }
  const project = await Project.create({
    title,
    description,
    githubLink,
    projectLink,
    technologies,
    stack,
    deployed,
    banner: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    message: "New project added successfully!",
    project,
  });
});

export const updateProject = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const {
    title,
    description,
    githubLink,
    projectLink,
    technologies,
    stack,
    deployed,
  } = req.body;

  const project = await Project.findById(id);
  if (!project) {
    return next(new ErrorHandler("Project not found!", 404));
  }

  if (
    !title ||
    !description ||
    !githubLink ||
    !projectLink ||
    !technologies ||
    !stack ||
    !typeof deployed === "undefined"
  ) {
    return next(
      new ErrorHandler("Provide all required details about the project!", 400)
    );
  }

  const newProjectData = {
    title,
    description,
    githubLink,
    projectLink,
    technologies,
    stack,
    deployed: JSON.parse(deployed),
  };

  if (req.files && req.files.banner) {
    const banner = req.files.banner;

    if (project.banner?.public_id) {
      await cloudinary.uploader.destroy(project.banner.public_id);
    }

    const updatedCloudinary = await cloudinary.uploader.upload(
      banner.tempFilePath,
      { folder: "PROJECT_BANNER" }
    );

    newProjectData.banner = {
      public_id: updatedCloudinary.public_id,
      url: updatedCloudinary.secure_url,
    };
  }

  const updatedProjectData = await Project.findByIdAndUpdate(
    id,
    newProjectData,
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    message: "Project updated successfully!",
    project: updatedProjectData,
  });
});

export const deleteProject = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const project = await Project.findById(id);
  if (!project) {
    return next(new ErrorHandler("Project not found!", 404));
  }

  if (project.banner?.public_id) {
    await cloudinary.uploader.destroy(project.banner.public_id);
  }

  await project.deleteOne();

  res.status(200).json({
    success: true,
    message: "Project deleted successfully!",
  });
});

export const getProject = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return next(new ErrorHandler("Invalid message ID!", 400));
  }

  const project = await Project.findById(id);
  if (!project) {
    return next(new ErrorHandler("No projects found!", 404));
  }
  res.status(200).json({
    success: true,
    project,
  });
});

export const getAllProject = catchAsyncError(async (req, res, next) => {
  const projects = await Project.find();

  if (!projects || projects.length === 0) {
    return next(new ErrorHandler("No projects found!", 404));
  }

  res.status(200).json({
    success: true,
    projects,
  });
});
