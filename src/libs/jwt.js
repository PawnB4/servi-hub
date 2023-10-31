import { jwtVerify, SignJWT } from "jose";
import { nanoid } from "nanoid";
import { JWT_SECRET_KEY } from "../config.js";

export const getJwtSecretKey = () => {
  const secret = JWT_SECRET_KEY;
  if (!secret || secret.length === 0) {
    throw new Error("The enviroment variable JWT_SECRET_KEY is not set");
  }
  return secret;
};

export const verifyAuth = async (token) => {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey())
    );
    return verified.payload;
  } catch (error) {
    console.log(error);
    throw new Error("Token has expired");
  }
};

export const createAccessToken = (payload) => {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 60;
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setJti(nanoid())
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(getJwtSecretKey()));
};
