
import pool from "../config/db.js";

export const getAllSongs = async () => {
  const [rows] = await pool.query("SELECT * FROM songs");
  return rows;
};