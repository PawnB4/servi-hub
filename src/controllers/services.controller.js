import { conn } from "../db.js";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import cloudinary from '../libs/cloudinary.js'


export const getAllServices = async (req, res, next) => {
  const result = await conn.execute(
    "SELECT * FROM(SELECT s.*, COALESCE(r.average, 0) AS average_rating FROM services s LEFT JOIN (SELECT service_id, AVG(rating) AS average FROM ratings GROUP BY service_id) r ON s.service_id = r.service_id) j LEFT JOIN (select user_id, first_name, last_name, email from users) u ON j.user_id=u.user_id",
    [],
    { as: "object" }
  );
  res.json(result.rows);
};

export const getService = async (req, res) => {
  const result = await conn.execute(
    `SELECT s.*, COALESCE(r.average, 0) AS average_rating, u.user_id, u.first_name, u.last_name, u.degree, u.work_experience
    FROM services s
    LEFT JOIN (
        SELECT service_id, AVG(rating) AS average
        FROM ratings
        GROUP BY service_id
    ) r ON s.service_id = r.service_id
    LEFT JOIN users u ON s.user_id = u.user_id
    WHERE s.service_id = ?;`,
    [req.params.id]
  );
  if (result.rows.length === 0 ) {
    return res.status(404).json({
      message: "Servicio no encontrado",
    });
  }
  return res.json(result.rows[0]);
};

export const getAllUserServices = async (req, res) => {
  const result = await conn.execute(
    `SELECT * FROM (SELECT s.*, COALESCE(r.average, 0) AS average_rating FROM services s LEFT JOIN (SELECT service_id, AVG(rating) AS average FROM ratings GROUP BY service_id) r ON s.service_id = r.service_id) AS j WHERE j.user_id = ?`,
    [req.userId]
  );
  return res.json(result.rows);
};

export const createService = async (req, res, next) => {
  const { user_id, name, category, description, frequency, duration, cost } =
    req.body;
  const imageFile = req.files.find((file) => file.fieldname === "image");

  const filePath = path.join(process.cwd(), "images", imageFile.originalname);
  await writeFile(filePath, imageFile.buffer);
  const cloudinaryRes = await cloudinary.uploader.upload(filePath);
  if (cloudinaryRes) {
    await unlink(filePath);
  }

  const result = await conn.execute(
    "INSERT INTO services (user_id, service_name, service_category, service_description, frequency, duration_minutes, cost, service_image) VALUES (?,?,?,?,?,?,?,?)",
    [
      user_id,
      name,
      category,
      description,
      frequency,
      duration,
      cost,
      cloudinaryRes.secure_url,
    ]
  );
  res.json({
    user_id,
    name,
    category,
    description,
    frequency,
    duration,
    cost,
    service_id: result.insertId,
  });
};

export const updateService = async (req, res) => {
  const {
    service_id,
    name,
    category,
    description,
    frequency,
    duration,
    cost,
    isActive,
  } = req.body;

  const imageFile = req.files.find((file) => file.fieldname === "image");
  let cloudinaryObject;
  if (imageFile) {
    const filePath = path.join(process.cwd(), "images", imageFile.originalname);
    await writeFile(filePath, imageFile.buffer);
    const cloudinaryRes = await cloudinary.uploader.upload(filePath);
    if (cloudinaryRes) {
      await unlink(filePath);
    }
    cloudinaryObject = cloudinaryRes;
  }

  const queryParams = [
    name,
    category,
    description,
    frequency,
    duration,
    cost,
    isActive,
  ];

  const optionalParams = [];

  if (cloudinaryObject) {
    queryParams.push(cloudinaryObject.secure_url);
    optionalParams.push("service_image = ?");
  }

  const query = `
  UPDATE services 
  SET 
    service_name = ?, 
    service_category = ?, 
    service_description = ?, 
    frequency = ?, 
    duration_minutes = ?, 
    cost = ?, 
    is_active = ?
    ${optionalParams.length > 0 ? `, ${optionalParams.join(", ")}` : ""}
  WHERE service_id = ?`;

  queryParams.push(service_id);

  const result = await conn.execute(query,queryParams);

  if (result.rowsAffected === 0) {
    return res.status(404).json({
      message: "Servicio no encontrado",
    });
  }
  return res.json({ message: "Service updated correctly" });
};

export const deleteService = async (req, res) => {
  const result = await conn.execute(
    "DELETE FROM services WHERE service_id = ?",
    [req.params.id]
  );
  if (result.rowsAffected === 0) {
    return res.status(404).json({
      message: "Servicio no encontrado",
    });
  }
  res.status(204).json(null);
};
