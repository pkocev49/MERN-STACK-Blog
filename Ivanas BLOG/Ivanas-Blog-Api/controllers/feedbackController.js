import FeedbackModel from "../models/feedbackModel.js";
const feedbackModel = new FeedbackModel();

class FeedbackController {
  async getAllFeedbacks(req, res) {
    try {
      const feedback = await feedbackModel.getAllFeedbacks();
      res.status(200).json(feedback);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  // CREATE A BLOG
  async createFeedback(req, res) {
    const { fullName, email, subject, message } = req.body;
    try {
      const feedbackData = {
        fullName: fullName,
        email: email,
        subject: subject,
        message: message,
      };
      const feedback = await feedbackModel.createFeedback(feedbackData);
      console.log(feedback, "feedback");
      res.status(201).json(feedback);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async deleteFeedback(req, res) {
    const { id } = req.params;
    try {
      const feedback = await feedbackModel.deleteSingleFeedback(id);
      if (!feedback) {
        return res.status(400).json({ error: "No such blog" });
      }
      res.status(200).json(feedback);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default FeedbackController;
