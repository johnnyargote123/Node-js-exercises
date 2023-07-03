import config from "../config/config.js";
import nodemailer from "nodemailer";
const { service, port, user, password } = config;
class MailService {
  async createTransportEmail(currentUser) {
    try {
      const transport = nodemailer.createTransport({
        service: service,
        port: port,
        auth: {
          user: user,
          pass: password,
        },
        tls: {
            rejectUnauthorized: false,
          },
        
      });
      await transport.sendMail({
        from: process.env.USER,
        to: currentUser,
        subject: "Compra Aprobada",
        html: `
      <div>
        <h1>Gracias por comprar en carrito Express</h1>
      </div>
      `,
      });
    } catch (error) {}
  }
}
export const mailService = new MailService();
