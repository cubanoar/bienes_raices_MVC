

const formularioLogin = (req, res) => {
    res.render('auth/login',{
      pagina: 'Login'
    });
  }
const formularioRegistro = (req, res) => {
    res.render('auth/registro',{
      pagina: 'Crear Cuenta'
    });
  }
const formularioRecuperarPassword = (req, res) => {
    res.render('auth/recuperar-password',{
      pagina: 'Recuperar Acceso'
    });
  }


export {
    formularioLogin,
    formularioRegistro,
    formularioRecuperarPassword
}