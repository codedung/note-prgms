import {
  APP_HOST,
  APP_PASSWORD,
  APP_PORT,
  APP_SECURE,
  APP_USER,
} from "@/setting";
import nodemailer, { Transport, TransportOptions } from "nodemailer";
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: APP_USER,
    pass: APP_PASSWORD,
  },
});

export { transport };
