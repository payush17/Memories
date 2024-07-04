import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    creator: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    selectedFile: {
      type: String, // cloudinary Image
      required: true,
    },
  },
  { timestamps: true }
);

export const PostMessage = mongoose.model("PostMessage", postSchema);
