import Sequelize from 'sequelize';
import db from '../config/db.js';
import bcrypt from 'bcrypt';

const Usuario = db.define(
  'usuarios',
  {
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    token: Sequelize.STRING,
    confirmado: Sequelize.BOOLEAN,
  },
  {
    hooks: {
      //HASHEAR EL PASSWORD
      //este usuario que recibe la funcion es el req.body del formulario
      beforeCreate: async function (usuario) {
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(usuario.password, salt);
      },
    },
  }
);

export default Usuario;
