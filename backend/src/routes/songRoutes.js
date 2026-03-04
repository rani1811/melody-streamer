import express from "express";
import fs from "fs";
import path from "path";
import pool from "../config/db.js"; // your mysql pool
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MUSIC_DIR = path.join(__dirname, "../../music");

// helper → read songs from folder
function getSongsFromFolder() {
  try {
    const files = fs.readdirSync(MUSIC_DIR);

    const songs = files
      .filter((file) => file.endsWith(".mp3"))
      .map((file, index) => ({
        id: `local-${index}`,
        title: file.replace(".mp3", ""),
        artist: "Local",
        file_name: file,
        source: "local",
      }));

    return songs;
  } catch (err) {
    console.error("Folder read error:", err.message);
    return [];
  }
}

// ✅ MAIN API
router.get("/", async (req, res) => {
  try {
    // try MySQL first
    const [rows] = await pool.query("SELECT * FROM songs");

    console.log("✅ Songs served from MySQL");

    return res.json({
      source: "mysql",
      songs: rows,
    });
  } catch (dbError) {
    console.error("❌ MySQL failed, using local music:", dbError.message);

    // 🔥 FALLBACK to folder
    const localSongs = getSongsFromFolder();

    return res.json({
      source: "local",
      songs: localSongs,
    });
  }
});

export default router;
