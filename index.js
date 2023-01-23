import express from 'express';
import router from './routes/usuarios.routes.js';

//Creamos la App
const app = express();

//Routing
app.use('/auth', router);

//Habilitar PUG
app.set('view engine', 'pug');
//Definir carpeta donde estaran las VIEWS
app.set('views', './views');

//Carpeta Publica
app.use(express.static('public'));

//Definir el puerto y arrancar el proyecto
const PORT = 3000;

app.listen(PORT, (req, res) => {
  console.log(`🚀 Server run in port: ${PORT} 🚀`);
});
