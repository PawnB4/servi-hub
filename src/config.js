export const PORT = process.env.PORT || 3000;

export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

export const DATABASE_URL =
  process.env.DATABASE_URL || "<your planetscale db url>";

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "<some secret key>";

export const RESEND_API_KEY =
  process.env.RESEND_API_KEY || "<your resend api key>";

export const FROM_MAIL = process.env.FROM_MAIL || "onboarding@resend.dev";

export const CLOUDINARY_NAME =
  process.env.CLOUDINARY_NAME || "<your cloudinary name>";

export const CLOUDINARY_API_KEY =
  process.env.CLOUDINARY_API_KEY || "<your cloudinary key>";

export const CLOUDINARY_API_SECRET =
  process.env.CLOUDINARY_API_SECRET || "<your cloudinary secret>";
