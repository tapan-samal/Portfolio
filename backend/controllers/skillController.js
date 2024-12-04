import { catchAsyncError } from "../middleWares/catchAsyncError.js";
import ErrorHandler from "../middleWares/error.js";
import cloudinary from "cloudinary";
import { Skill } from "../models/skillSchema.js";

export const addNewSkill = catchAsyncError(async (req, res, next) => {
  const { title, proficiency } = req.body;
  const icon = req?.files?.icon;

  if (!icon) {
    return next(new ErrorHandler("Provide an icon for application tool!", 400));
  }

  if (!title) {
    return next(new ErrorHandler("Provide title for application tool!", 400));
  }

  const existingSkill = await Skill.findOne({ title });
  if (existingSkill) {
    return next(new ErrorHandler("Provided skill already exists!", 400));
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(
    icon.tempFilePath,
    { folder: "SKILL" }
  );

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    return next(
      new ErrorHandler(
        "Failed to upload icon to Cloudinary. Please try again!",
        500
      )
    );
  }

  const skill = await Skill.create({
    title,
    proficiency,
    icon: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    message: "New skill added successfully!",
    skill,
  });
});

export const getAllSkills = catchAsyncError(async (req, res, next) => {
  const skills = await Skill.find();

  res.status(200).json({
    success: true,
    count: skills.length,
    skills,
  });
});

export const deleteSkill = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const skill = await Skill.findById(id);
  if (!skill) {
    return next(new ErrorHandler("Skill not found!", 404));
  }

  const skillIcon = skill.icon.public_id;
  await cloudinary.uploader.destroy(skillIcon);
  await skill.deleteOne();

  res.status(200).json({
    success: true,
    message: "Skill deleted successfully!",
  });
});

export const updateSkill = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const skill = await Skill.findById(id);
  if (!skill) {
    return next(new ErrorHandler("Skill not found!", 404));
  }

  const { proficiency } = req.body;
  if (!proficiency) {
    return next(
      new ErrorHandler(
        "Proficiency value is required to update the skill!",
        400
      )
    );
  }

  const updatedSkill = await Skill.findByIdAndUpdate(
    id,
    { proficiency },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    message: "Skill is updated successfully!",
    skill: updatedSkill,
  });
});
