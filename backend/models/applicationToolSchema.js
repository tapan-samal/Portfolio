import mongoose from "mongoose";

const applicationToolSchema = new mongoose.Schema({
  name: String,
  icon: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
});

export const ApplicationTool = mongoose.model(
  "ApplicationTool",
  applicationToolSchema
);
