import mongoose from "mongoose";

const { Schema } = mongoose;
const blogSchema = new mongoose.Schema(
  {
    blogTitle: {
      type: String,
      required: true,
    },
    blogDescription: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default blogSchema;
