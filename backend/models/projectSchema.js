import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: String,
  technologies: String,
  stack: String,
  deployed: String,
  githubLink: String,
  projectLink: String,
  description: String,
  banner: {
    public_id: { type: String, required: true },
    url: { type: String, required: true },
  },
});

export const Project = mongoose.model("Project", projectSchema);
