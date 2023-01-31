import nodemailer from 'nodemailer';
import dotenv from 'dotenv/config';

const emailRegistro = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const { nombre, email, token } = datos;
  
  //Enviar email
  await transport.sendMail({
    from: 'BienesRaices.com',
    to: email,
    subject: 'Confirmacion de cuenta en BienesRaices.com',
    text: 'Confirmacion de cuenta en BienesRaices.com',
    html: `
      <p>Hola ${nombre}</p>
      
      <p>Para confirmar tu cuenta en BienesRaices.com solo debes hacerlo en el siguiente enlace: 
      <a href='${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/confirmar/${token}'>Confirmar Cuenta</a> </p>
      
      <p>Si no creaste una cuenta puedes ignorar este mensaje</p>
      `
  })
};
const emailOlvidePassword = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const { nombre, email, token } = datos;
  
  //Enviar email
  await transport.sendMail({
    from: 'BienesRaices.com',
    to: email,
    subject: 'Reestablece tu password en BienesRaices.com',
    text: 'Reestablece tu password en BienesRaices.com',
    html: `
      <p>Hola ${nombre}</p>
      
      <p>Para reestablecer tu password en BienesRaices.com solo debes hacerlo en el siguiente enlace: 
      <a href='${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/recuperar-password/${token}'>Reestablecer password</a> </p>
      
      <p>Si no fuiste tu puedes ignorar este mensaje</p>
      `
  })
};

export { emailRegistro, emailOlvidePassword };
