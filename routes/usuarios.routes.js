import Router from 'express';
import {
  formularioLogin,
  formularioRegistro,
  registrar,
  confirmar,
  formularioRecuperarPassword,
} from '../controllers/usuariosController.js';

const router = Router();

//Englobar GET y POST en una misma ruta
/* router.route('/')
    .get((req, res) => {
        res.send('Home')
    })
    .post((req, res) => {
        res.json({'msg':'Home'})
    }) */

router
    .get('/login', formularioLogin)

    .get('/registro', formularioRegistro)
    .post('/registro', registrar)

    .get('/confirmar/:token', confirmar)

    .get('/recuperar-password', formularioRecuperarPassword);

export default router;
