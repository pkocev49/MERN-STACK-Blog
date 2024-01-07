// import expressAsyncHandler from "express-async-handler";
// import nodemailer from "nodemailer";

// let transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: process.env.SMTP_PORT,
//   secure: false,
//   auth: {
//     user: process.env.SMTP_MAIL,
//     pass: process.env.SMTP_PASSWORD,
//   },
// });

// export const sendEmail = expressAsyncHandler(async (req, res) => {
//   try {
//     const { userEmail, subject, message } = req.body;

//     let mailOptions = {
//       from: userEmail,
//       to: process.env.TO,
//       subject: subject,
//       text: message,
//     };

//     console.log("Raw email headers:", mailOptions);

//     await transporter.sendMail(mailOptions);
//     console.log("Email sent successfully!");
//     res.status(200).json({ message: "Email sent successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to send email" });
//   }
// });

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
