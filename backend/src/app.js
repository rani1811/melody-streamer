import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import songRoutes from "./routes/songRoutes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware
app.use(cors());
app.use(express.json());

// serve music files from project folder
app.use("/music", express.static(path.join(__dirname, "../music")));

// API routes
app.use("/api/songs", songRoutes);

export default app;
