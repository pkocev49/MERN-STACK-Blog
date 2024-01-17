import express from "express";
import bp from "body-parser";
import { mongo_connection } from "./mongo-connection/mongoConnection.js";
import { blogRouter } from "./routes/blogRoutes.js";
import { feedbackRouter } from "./routes/feedbackRoutes.js";
import { authRouter } from "./routes/authRoutes.js";
import cors from "cors";
const app = express();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Set up middleware to parse incoming requests with a JSON payload
app.use(express.json());
// Set up middleware to parse incoming requests with URL-encoded payloads
// The { extended: true } option allows for parsing complex objects
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(bp.urlencoded({ extended: true }));

app.use("/api/blogs", blogRouter);
app.use("/api/feedback", feedbackRouter);
app.use("/api/auth", authRouter);

const PORT = process.env.PORT;

app.listen(PORT, async () => {
  console.log("Server is up and running!!!");
  await mongo_connection();
});
