import express from "express";
import BlogController from "../controllers/blogController.js";
import requireAuth from "../middleware/authMiddleware.js";

export const blogRouter = express.Router();

const blogController = new BlogController();

blogRouter.get("/", blogController.getAllBlogs);
blogRouter.post("/", requireAuth, blogController.createBlog);
blogRouter.patch("/:id", requireAuth, blogController.updateBlog);
blogRouter.delete("/:id", requireAuth, blogController.deleteBlog);
