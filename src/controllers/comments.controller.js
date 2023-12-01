import { conn } from "../db.js";

const formatArray = (arr) => {
  const formattedString = arr.reduce((acc, num, index) => {
    const separator = index === arr.length - 1 ? "" : ",";
    return `${acc}${num}${separator}`;
  }, "(");
  return `${formattedString})`;
};

export const createComment = async (req, res) => {
  const { service_id, comment_text } = req.body;
  await conn.execute(
    "INSERT INTO comments (service_id, comment_text) VALUES (?,?)",
    [service_id, comment_text]
  );
  return res.status(200).json({
    service_id,
    comment_text,
  });
};

export const updateComment = async (req, res) => {
  const data = req.body;
  let list = formatArray(data.id_list);
  const query = `UPDATE comments SET comment_enabled=? WHERE comment_id IN ${list}`;
  console.log(query)
  await conn.execute(query, [data.new_state], {
    as: "object",
  });
  return res.status(200).json({ message: "Changes saved successfully" });
};

export const getServiceComments = async (req, res) => {
  const result = await conn.execute(
    "SELECT * FROM comments WHERE service_id = ? ORDER BY comment_date DESC",
    [req.params.id]
  );
  if (result.rows.length === 0 ) {
    return res.status(404).json({
      message: "Servicio no encontrado",
    });
  }
  res.json(result.rows);
};
