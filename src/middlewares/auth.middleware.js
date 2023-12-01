import { verifyAuth } from "../libs/jwt.js";

export const isAuth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    console.log("No hay token")
    return res.status(401).json({ message: "No autorizado" });
  }
  const verifiedToken =
    token &&
    (await verifyAuth(token).catch((err) => {
      console.log("Error de autorizacion")
      return res.status(401).json({ message: "No autorizado" });
    }));
  console.log("TOKEN VERIFICADO");
  req.userId = verifiedToken.id;
  next();
};
