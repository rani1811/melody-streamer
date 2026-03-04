import db from "../config/db.js";
import fs from "fs";
import path from "path";

export const getSongs = async (req, res) => {
  try {

    // 1️⃣ Songs from DB
    const [dbSongs] = await db.query("SELECT * FROM songs");

    // 2️⃣ Songs from music folder
    const musicDir = "/app/music";
    const files = fs.readdirSync(musicDir);

    const folderSongs = files.map((file, index) => ({
      id: `local-${index}`,
      title: file.replace(".mp3", ""),
      artist: "Local",
      file_url: `/music/${file}`
    }));

    // 3️⃣ Merge both
    const allSongs = [...dbSongs, ...folderSongs];

    res.json(allSongs);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch songs" });
  }
};
