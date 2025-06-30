import { SendMailOptions } from "nodemailer";
import { emailTransporter } from "../../core/email";

interface SendMailFnOptions extends SendMailOptions {
  to: string;
  subject: string;
  text: string;
}

export class EmailService {
  public sendMail({ to, subject, text, ...rest }: SendMailFnOptions): void {
    const mailOptions = {
      from: "valmirstachin@alunos.utfpr.edu.br",
      to,
      subject,
      text,
      ...rest,
    };

    console.log("Sending email to:", mailOptions.to);
    emailTransporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error.message);
        return;
      }
      console.log("Email sent successfully:", info.response);
    });
  }
}
