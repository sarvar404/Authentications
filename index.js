import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import axios from "axios";
import fs from "fs";
import cookieParser from "cookie-parser";
// other files connections
import Connection from "./database/db.js";
import authRouter from "./routes/userAuthRoutes.js";

import multer from "multer";
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
});

dotenv.config();
const app = express();
// app.use(morgan("dev"));
const PORT = process.env.PORT || 8000;
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
const corsOptions = {
  origin: true,
  methods: ["*"], // Allow all methods
  credentials: true,
};

// middleware
// we have use body parser here to see the output in console
app.use(bodyParser.json({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
// app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.static("public")); // publically we can access all the fines into here
// app.use(checkForAuthentication);

app.get("/", async (request, response) => {
  response.send("Cookies cleared and APIs working");
});

app.use("/api", authRouter);

app.listen(PORT, () => {
  Connection();
  console.log(`connection is on :: >> ${PORT}`);
});
