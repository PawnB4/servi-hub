import { conn } from "../db.js";
import { createAccessToken } from "../libs/jwt.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  const { mail, password } = req.body;
  const query = `SELECT user_id, password_hash FROM users WHERE email =?`;
  const objects = await conn.execute(query, [mail], { as: "object" });
  if (objects.rows.length === 1) {
    const { user_id, password_hash } = objects.rows[0];
    const passwordMatch = await bcrypt.compare(password, password_hash);
    if (passwordMatch) {
      const token = await createAccessToken({ id: user_id });
      res.cookie("token", token, {
        httpOnly: false,
        sameSite: "none",
        maxAge: 60 * 24 * 60 * 60 * 1000,
      });
      return res.json(objects.rows[0]);
    }
    else{
      throw new Error("Passwords dont match")
    }
  }
};

export const updateUser = (req, res) => {
  res.send("Modificando sesión");
};

export const signout = (req, res) => {
  res.clearCookie("token");
  res.sendStatus(200);
};

export const signup = async (req, res) => {
  const data = req.body;
  const { lastName, mail, name, password, phone, restore_word } = data;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const result = await conn.execute(
    "INSERT INTO users (first_name,last_name,email,password_hash,restore_word) VALUES (?,?,?,?,?)",
    [name, lastName, mail, hashedPassword, restore_word]
  );

  const token = await createAccessToken({ id: result.insertId });

  res.cookie("token", token, {
    httpOnly: false,
    sameSite: "none",
    maxAge: 60 * 24 * 60 * 60 * 1000,
  });

  return res.json({
    id: result.insertId,
    mail,
    name,
    lastName,
    phone,
  });
};

export const profile = async (req, res) => {
  console.log("Executing profile")
  const query = `SELECT user_id, first_name, last_name, email, degree, work_experience FROM users WHERE user_id =?`;
  const objects = await conn.execute(query, [req.userId], { as: "object" });
  if (objects.rows.length === 1) {
    return res.json(objects.rows[0]);
  }
};
