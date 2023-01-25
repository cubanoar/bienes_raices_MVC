import { check, validationResult } from 'express-validator';

import Usuario from '../models/Usuario.js';
import { userId } from '../helpers/tokens.js';
import {
  passValuesCheck,
  emailValuesCheck,
} from '../helpers/validacionEmailPassword.js';
import { emailRegistro } from '../helpers/emails.js';

let confirm = false;

const formularioLogin = (req, res) => {
  res.render('auth/login', {
    pagina: 'Login',
    csrfToken: req.csrfToken(),
  });
};

const formularioRegistro = (req, res) => {
  res.render('auth/registro', {
    pagina: 'Crear Cuenta',
    csrfToken: req.csrfToken(),
    passValuesChecked: true,
    emailValuesChecked: true,
  });
};

const registrar = async (req, res) => {
  //Validacion Formulario
  await check('nombre').notEmpty().isAlpha().trim().run(req);
  await check('email').isEmail().trim().normalizeEmail().run(req);
  await check('repetir_password').equals(req.body.password).run(req);
  //await check('nombre').notEmpty().withMessage('El nombre es obligatorio').run(req)
  /* await check('password')
    .isLength({ min: 8, max: 12 })
    .trim()
    .run(req); */

  let resultado = validationResult(req); //Se llena con los errores

  //Validar el password con mi REGEX
  const passValuesChecked = passValuesCheck(req.body.password);

  //Validar el EMAIL con mi REGEX, solo Gmail y Yahoo
  const emailValuesChecked = emailValuesCheck(req.body.email);

  const errores = resultado.errors.map((err) => err.param);

  //Verificar que el <resultado> este vacio
  if (!resultado.isEmpty() || !passValuesChecked || !emailValuesChecked) {
    //Tiene errores
    return res.render('auth/registro', {
      pagina: 'Crear Cuenta',
      csrfToken: req.csrfToken(),
      errorNombre: errores.includes('nombre'),
      errorEmail: errores.includes('email'),
      /*errorPassword: errores.includes('password'), */
      passValuesCheck,
      emailValuesCheck,
      errorRepetirPassword: errores.includes('repetir_password'),
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    });
  }

  //Verificar que el usuario no este duplicado( mediante el email)
  const usuarioExiste = await Usuario.findOne({
    where: { email: req.body.email },
  });

  if (usuarioExiste) {
    return res.render('auth/registro', {
      pagina: 'Crear Cuenta',
      csrfToken: req.csrfToken(),
      usuarioExiste: {
        msg: 'El email ya está registrado',
      },
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    });
  }

  //Almacenar el usuario y Creacion del usuario
  const usuario = await Usuario.create({ ...req.body, token: userId() });
  console.log('Este es el usuario:', usuario);

  //Enviar email de confirmacion
  emailRegistro({
    nombre: usuario.nombre,
    email: usuario.email,
    token: usuario.token,
  });

  //Si no confirma el token borramos el usuario
  setTimeout(() => {
    if (!confirm) {
      async function renovarToken() {
        await Usuario.destroy({
          where: {
            email: usuario.email,
          },
        });
      }
      renovarToken();
    }
  }, 120000);

  //Mostrar mensaje de confimacion
  res.render('templates/mensaje', {
    pagina: 'Cuenta creada correctamente',
    mensaje: 'Hemos enviado un Email de confirmación, deberas confirmar dentro de los 2 minutos siguientes o volver a crear una cuenta.',
  });
};

//COMPROBAR CUENTA CON TOKEN POR EMAIL
const confirmar = async (req, res) => {
  const { token } = req.params;

  //Verificar si el token es válido
  const usuario = await Usuario.findOne({
    where: { token },
  });

  confirm = usuario?.confirmado;

  if (!usuario) {
    return res.render('auth/confirmar_cuenta', {
      pagina: 'Error al confirmar la cuenta',
      mensaje: 'Error al confirmar la cuenta',
      error: true,
    });
  }

  //Confirmar la cuenta
  usuario.token = userId();
  usuario.confirmado = true;
  await usuario.save();

  res.render('auth/confirmar_cuenta', {
    pagina: 'Cuenta confirmada',
    mensaje: 'Cuenta confirmada correctamente',
  });
};

const formularioRecuperarPassword = (req, res) => {
  res.render('auth/recuperar-password', {
    pagina: 'Recuperar Acceso',
    csrfToken: req.csrfToken(),
  });
};

export {
  formularioLogin,
  formularioRegistro,
  registrar,
  confirmar,
  formularioRecuperarPassword,
};
