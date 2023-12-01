import { conn } from "../db.js";
import {
  createAccessToken,
  createPasswordResetToken,
  verifyAuth,
} from "../libs/jwt.js";
import bcrypt from "bcrypt";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import { sendRestorePasswordMail } from "../libs/resend.js";
import cloudinary from '../libs/cloudinary.js'


export const login = async (req, res) => {
  const { mail, password } = req.body;
  const query = "SELECT user_id, password_hash FROM users WHERE email =?";
  const objects = await conn.execute(query, [mail], { as: "object" });
  if (objects.rows.length === 0) {
    res.status(202).json({
      code: 2,
      status: "error",
      message: "Email address not found",
    });
  }
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
      res.status(200).json({
        code: 0,
        status: "success",
        user: objects.rows[0].user_id,
      });
    } else {
      res.status(202).json({
        code: 1,
        status: "error",
        message: "Invalid credentials",
      });
    }
  }
};

export const restorePasswordMail = async (req, res) => {
  const { mail } = req.body;

  try {
    const restoreToken = await createPasswordResetToken({ mail });
    console.log(restoreToken);
    await sendRestorePasswordMail(mail, restoreToken);
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({ success: true });
};

export const restorePassword = async (req, res) => {
  const { token, password } = req.body;
  try {
    const { mail } = await verifyAuth(token);
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const query = "UPDATE users SET password_hash = ? WHERE email=?";
    await conn.execute(query, [hashedPassword, mail]);
    res.status(200).json({ status: "Password updated successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const signout = (req, res) => {
  res.clearCookie("token");
  res.sendStatus(200);
};

export const signup = async (req, res) => {
  const data = req.body;
  const { lastName, mail, name, password, phone } = data;
  const emailExists = await conn.execute(
    "SELECT * FROM users WHERE email = ?",
    [mail]
  );
  if (emailExists.rows.length !== 0) {
    res.status(202).json({ code: 1, error: "email already exists" });
    return
  }
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const result = await conn.execute(
    "INSERT INTO users (first_name,last_name,email,password_hash) VALUES (?,?,?,?)",
    [name, lastName, mail, hashedPassword]
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
  const query =
    "SELECT user_id, first_name, last_name, email, degree, work_experience, user_profile_image FROM users WHERE user_id =?";
  const objects = await conn.execute(query, [req.userId], { as: "object" });
  if (objects.rows.length === 1) {
    return res.json(objects.rows[0]);
  }
};

export const updateUser = async (req, res) => {
  const { user_id, degree, work_experience } = req.body;
  const imageFile = req.files.find((file) => file.fieldname === "image");
  const filePath = path.join(process.cwd(), "images", imageFile.originalname);
  await writeFile(filePath, imageFile.buffer);
  const cloudinaryRes = await cloudinary.uploader.upload(filePath);
  if (cloudinaryRes) {
    await unlink(filePath);
  }

  const query =
    "UPDATE users SET degree=?, work_experience=?, user_profile_image=? WHERE user_id=?";
  await conn.execute(
    query,
    [degree, work_experience, cloudinaryRes.secure_url, user_id],
    {
      as: "object",
    }
  );
  res.status(200).json({ status: "User updated successfully" });
};
