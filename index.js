import express from 'express';
import router from './routes/usuarios.routes.js';
import db from './config/db.js';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';


//Creamos la App
const app = express(); 

//Definir body parser para leer los datos del formulario
app.use(express.urlencoded({ extended: true }));

//Habilitar Cookie-Parser
app.use(cookieParser());

//Habilitar CSRF -De forma global
app.use(csrf({cookie: true}));

//Conexion a la Base de Datos
try {
  db.authenticate();
  db.sync()//Nos crea la tabla si no existe
} catch (error) {
  console.log(error)
}

//Routing
app.use('/auth', router);

//Habilitar PUG
app.set('view engine', 'pug');
//Definir carpeta donde estaran las VIEWS
app.set('views', './views');

//Carpeta Publica
app.use(express.static('public'));

//Definir el puerto y arrancar el proyecto
const port = process.env.PORT || 3000;

app.listen(port, (req, res) => {
  console.log(`🚀 Server run in port: ${port} 🚀`);
});
