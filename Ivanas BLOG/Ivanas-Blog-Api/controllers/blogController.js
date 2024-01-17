import BlogModel from "../models/blogModel.js";

const blogModel = new BlogModel();

class BlogController {
  //GET ALL BLOGS
  async getAllBlogs(req, res) {
    try {
      const blog = await blogModel.getAllBlogs();
      res.status(200).json(blog);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  //GET A SINGLE BLOG
  async getSingleBlog(req, res) {
    const { id } = req.params;
    try {
      const blog = await blogModel.findById(id);
      if (!blog) {
        return res.status(400).json({ error: "No such blog" });
      }
      res.status(200).json(blog);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // CREATE A BLOG
  async createBlog(req, res) {
    const { blogTitle, blogDescription } = req.body;
    try {
      const blogData = {
        blogTitle: blogTitle,
        blogDescription: blogDescription,
      };
      const blog = await blogModel.createBlog(blogData);
      console.log(blog, "blog");
      res.status(201).json(blog);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // UPDATE A BLOG
  async updateBlog(req, res) {
    const { id } = req.params;
    const { blogTitle, blogDescription } = req.body;
    try {
      const blogData = {
        blogTitle: blogTitle,
        blogDescription: blogDescription,
      };
      const blog = await blogModel.updateBlog(id, blogData);
      if (!blog) {
        return res.status(400).json({ error: "No such blog" });
      }
      res.status(200).json(blog);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  //DELETE A BLOG
  async deleteBlog(req, res) {
    const { id } = req.params;
    try {
      const blog = await blogModel.deleteSingleBlog(id);
      if (!blog) {
        return res.status(400).json({ error: "No such blog" });
      }
      res.status(200).json(blog);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default BlogController;
