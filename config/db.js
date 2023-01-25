import Sequelize from 'sequelize';
import dotenv from 'dotenv/config'

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: '3306',
  dialect: 'mysql',
  define: {
    timestamps: true,//Crea 2 columns, cuando fue creado y cuando fue actualizado(el usuario)
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  operatorAliases: false,
});

export default db;
