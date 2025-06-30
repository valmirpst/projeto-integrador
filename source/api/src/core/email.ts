import { createTransport } from "nodemailer";
import { env } from "../env";

export const emailTransporter = createTransport({
  service: "gmail",
  auth: {
    user: env.EMAIL_HOST,
    pass: env.EMAIL_PASS,
  },
});
