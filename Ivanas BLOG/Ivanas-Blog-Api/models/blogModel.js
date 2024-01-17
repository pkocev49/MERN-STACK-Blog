import mongoose from "mongoose";
import blogSchema from "../mongoSchemas/blogSchema.js";

class BlogModel {
  mongo_model;
  constructor() {
    this.mongo_model = mongoose.model("blogs", blogSchema);
  }
  async getAllBlogs() {
    const blogs = await this.mongo_model.find().sort({ created: -1 });
    return blogs;
  }
  async findById(id) {
    const blog = await this.mongo_model.findById(id);
    return blog;
  }
  async createBlog(newBlog) {
    const blog = new this.mongo_model(newBlog);
    const createB = await blog.save();
    return {
      _id: createB._id.toString(),
      blogTitle: createB.blogTitle,
      blogDescription: createB.blogDescription,
    };
  }
  async updateBlog(id, updatedBlog) {
    // Find the blog by ID and update only the specified fields
    const updatedB = await this.mongo_model.findByIdAndUpdate(
      id,
      {
        $set: {
          blogTitle: updatedBlog.blogTitle,
          blogDescription: updatedBlog.blogDescription,
        },
      },
      { new: true }
    );
    return {
      _id: updatedB._id.toString(),
      blogTitle: updatedB.blogTitle,
    };
  }
  async deleteSingleBlog(id) {
    const deleteBlog = await this.mongo_model.findByIdAndDelete(id);
    return deleteBlog;
  }
}

export default BlogModel;
