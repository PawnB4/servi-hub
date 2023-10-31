import { conn } from "../db.js";

export const createRating = async (req, res) => {
  const { service_id, rating } = req.body;
  const result = await conn.execute(
    "INSERT INTO ratings (service_id, rating) VALUES (?,?)",
    [service_id, rating]
  );
  return res.json({
    service_id,
    rating,
  });
};
