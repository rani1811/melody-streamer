import express from "express";
import cors from "cors";
import songRoutes from "./routes/songRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(cors());
app.use(express.json());

// Serve music folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/music", express.static(path.join(__dirname, "../../music")));

app.use("/api/songs", songRoutes);

export default app;