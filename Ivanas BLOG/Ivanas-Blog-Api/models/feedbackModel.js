import mongoose from "mongoose";
import feedbackSchema from "../mongoSchemas/feedbackSchema.js";

class FeedbackModel {
  mongo_model;
  constructor() {
    this.mongo_model = mongoose.model("feedbacks", feedbackSchema);
  }
  async getAllFeedbacks() {
    const feedbacks = await this.mongo_model.find().sort({ created: -1 });
    return feedbacks;
  }
  async createFeedback(newFeedback) {
    const feedback = new this.mongo_model(newFeedback);
    const createF = await feedback.save();
    return {
      _id: createF._id.toString(),
      fullName: createF.fullName,
      email: createF.email,
      subject: createF.subject,
      message: createF.message,
    };
  }
  async deleteSingleFeedback(id) {
    const deleteFeedback = await this.mongo_model.findByIdAndDelete(id);
    return deleteFeedback;
  }
}

export default FeedbackModel;
