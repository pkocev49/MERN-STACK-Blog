import express from "express";
import FeedbackController from "../controllers/feedbackController.js";
import requireAuth from "../middleware/authMiddleware.js";

export const feedbackRouter = express.Router();
const feedbackController = new FeedbackController();
// import { sendEmail } from "../controllers/emailController.js";

// emailRouter.post("/", sendEmail);
feedbackRouter.get("/", feedbackController.getAllFeedbacks);
feedbackRouter.post("/", feedbackController.createFeedback);
// feedbackRouter.patch("/:id", requireAuth, feedbackController.updateBlog);
feedbackRouter.delete("/:id", requireAuth, feedbackController.deleteFeedback);
