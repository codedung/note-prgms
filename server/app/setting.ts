import dotenv from "dotenv";
import path from "path";
if (process.env.NODE_ENV === "develop") {
  dotenv.config({ path: path.join(__dirname, "../.env.dev") });
} else if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: path.join(__dirname, "../.env.production") });
} else {
  throw new Error("does not assign env");
}

//server
export const PORT = process.env.SERVER_PORT as string;

//database
export const DB_PORT = parseInt(process.env.DB_PORT as string);
export const DB_PASSWORD = process.env.DB_PASSWORD as string;
export const DB_USER = process.env.DB_USER as string;
export const DB_HOST = process.env.DB_HOST as string;
export const DB_DATABASE = process.env.DB_DATABASE as string;

// nodemailer
export const APP_PASSWORD = process.env.APP_PASSWORD as string;
export const APP_PORT = parseInt(process.env.APP_PORT as string);
export const APP_SECURE = process.env.APP_SECURE as string;
export const APP_USER = process.env.APP_USER as string;
export const APP_HOST = process.env.APP_HOST as string;

//cors
export const CORS_ORIGIN = process.env.CORS_ORIGIN as string;

//jwt
export const NORMAL_SECRET_KEY = process.env.NORMAL_SECRET_KEY as string;
export const NORMAL_EXPIRED_IN = process.env.NORMAL_EXPIRED_IN as string;
export const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY as string;
export const REFRESH_EXPIRED_IN = process.env.REFRESH_EXPIRED_IN as string;
export const COOKIE_EXPIRED = 1000 * 60 * 60 * 24 * 3;
