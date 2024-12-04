import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  githubLink: String,
  projectLink: String,
  technologies: String,
  stack: String,
  deployed: Boolean,
  banner: {
    public_id: { type: String, required: true },
    url: { type: String, required: true },
  },
});

export const Project = mongoose.model("Project", projectSchema);
