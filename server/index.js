import express from "express";
import mongoose from "mongoose";

import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
//Router

import AuthRoutes from "./Routes/AuthRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import postRoutes from "./Routes/postRoutes.js";
import uploadRoutes from "./Routes/UploadRoutes.js";
import chatRoutes from "./Routes/chatRoutes.js";
import messageRoutes from "./Routes/messageRoutes.js";
const app = express();
//to serve image
app.use(express.static("public"));
app.use("/images", express.static("images"));
app.use(cors());
mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log("Database is Connected"))
  .catch((e) => {
    console.log(e);
  });

app.use(bodyParser.json({ limit: "30mb", extended: true }));

app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/auth", AuthRoutes);
app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/upload", uploadRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log("Error In Server");
  }
  console.log(`Server is Running on Port${process.env.PORT}`);
});
