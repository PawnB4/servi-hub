import { conn } from "../db.js";
import { sendContractSolicitedMail } from "../libs/resend.js";

export const createContract = async (req, res) => {
  const { contract_mail, contract_message, contract_phone, service_id } =
    req.body;
  await conn.execute(
    "INSERT INTO contracts (contract_mail, contract_message, contract_phone, service_id) VALUES (?,?,?,?)",
    [contract_mail, contract_message, contract_phone, service_id]
  );
  const service = await conn.execute("SELECT * FROM services WHERE service_id = ?" ,[service_id])
  let serviceName = service.rows[0].service_name
  await sendContractSolicitedMail(contract_mail, serviceName)

  return res.status(201).json({
    contract_mail,
    contract_message,
    contract_phone,
    service_id,
  });
};

export const updateContract = async (req, res) => {
  const { contract_id, contract_status } = req.body;
  const query = "UPDATE contracts SET contract_status= ? WHERE contract_id = ?";
  await conn.execute(query, [contract_status, contract_id], {
    as: "object",
  });
  return res.status(204).json(null);
};

export const getServiceContracts = async (req, res) => {
  const result = await conn.execute(
    "SELECT * FROM contracts WHERE service_id = ?",
    [req.params.id]
  );
  if (result.rows.length===0) {
    return res.status(404).json({
      message: "Servicio no encontrado",
    });
  }
  res.json(result.rows);
};

export const deleteContract = async (req, res) => {
  const result = await conn.execute(
    "DELETE FROM contracts WHERE contract_id = ?",
    [req.params.id]
  );
  if (result.rowsAffected === 0) {
    return res.status(404).json({
      message: "Contract not found",
    });
  }
  res.status(204).json(null);
};

export const deleteAllContracts = async (req, res) => {
  const result = await conn.execute(
    "DELETE FROM contracts WHERE contract_status = ? AND service_id = ?",
    ["Finalizado", req.params.id]
  );
  if (result.rowsAffected === 0) {
    return res.status(404).json({
      message: "Servicio no encontrado",
    });
  }
  res.status(204).json(null);
};
