
// import { getAllSongs } from "../models/songModel.js";

// export const getSongs = async (req, res) => {
//   try {
//     const songs = await getAllSongs();
//     res.json(songs);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to fetch songs" });
//   }
// };


import { getAllSongs } from "../models/songModel.js";

export const getSongs = async (req, res) => {
  try {
    const songs = await getAllSongs();
    res.json(songs);
  } catch (error) {
    console.error("DB ERROR:", error);   // 🔥 important
    res.status(500).json({ error: error.message });
  }
};