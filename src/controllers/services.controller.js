import { conn } from "../db.js";

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
    `SELECT * FROM (SELECT s.*, COALESCE(r.average, 0) AS average_rating FROM services s LEFT JOIN (SELECT service_id, AVG(rating) AS average FROM ratings GROUP BY service_id) r ON s.service_id = r.service_id) AS j WHERE j.service_id = ${req.params.id}`
  );
  if (result.rows.length === 0) {
    return res.status(404).json({
      message: "Servicio no encontrado",
    });
  }
  return res.json(result.rows[0]);
};

export const createService = async (req, res, next) => {
  const { user_id, name, category, description, frequency, duration, cost } =
    req.body;
  const result = await conn.execute(
    "INSERT INTO services (user_id, service_name, service_category, service_description, frequency, duration_minutes, cost) VALUES (?,?,?,?,?,?,?)",
    [user_id, name, category, description, frequency, duration, cost]
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
  const { name, category, description, frequency, duration, cost, isActive } =
    req.body;
  const query = `UPDATE services SET 
      service_name = '${name}', 
      service_category = '${category}', 
      service_description = '${description}', 
      frequency = '${frequency}', 
      duration_minutes = '${duration}', 
      cost = '${cost}', 
      is_active = '${isActive}' 
    WHERE service_id = ${params.id}`;

  const result = await conn.execute(query);

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
