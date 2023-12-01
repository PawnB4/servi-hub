import { Resend } from "resend";
import { FRONTEND_URL, RESEND_API_KEY, FROM_MAIL } from "../config.js";
const resend = new Resend(RESEND_API_KEY);

export const sendContractSolicitedMail = async (recipient, service) => {
  try {
    const data = await resend.emails.send({
      from: `Servi Hub <${FROM_MAIL}>`,
      to: [recipient],
      subject: `Tu solicitud para ${service} ha sido enviada`,
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
        <h2 style="color: #007BFF;">¡Hola!</h2>
        <div style="color: #333333;">
          <p>Tu solicitud para ${service} fue enviada con éxito al proveedor.</p>
          <p>Mantente atento/a, ya que éste se pondrá en contacto en caso de aceptarla. Si hay algo más que necesitas o tienes alguna pregunta, háznoslo saber.</p>
          <h3 style="color: #007BFF;">¡Gracias por elegir Servi Hub!</h3>
        </div>
      </div>
    `,
    });
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

export const sendRestorePasswordMail = async (recipient, token) => {
  const resetUrl = `${FRONTEND_URL}/reset-password?token=${token}`; 
  try {
    const data = await resend.emails.send({
      from: `Servi Hub <${FROM_MAIL}>`,
      to: [recipient],
      subject: `Actualizar contraseña`,
      html: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2 style="color: #333333;">Estimado usuario</h2>
    <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
      <p style="color: #666666;">Por favor, haz clic en el siguiente enlace para recuperar tu contraseña:</p>
      <a href="${resetUrl}" style="display: inline-block; padding: 10px 15px; background-color: #007BFF; color: #ffffff; text-decoration: none; border-radius: 5px;">Recuperar contraseña</a>
    </div>
  </div>
`,
    });
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
