import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import postRoutes from "./routes/posts.js";
dotenv.config();
const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/posts", postRoutes);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    console.log("MongoDB connected");
  })
  .catch((error) => console.error("Error connecting to MongoDB:", error));
