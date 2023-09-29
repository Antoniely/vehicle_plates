require('dotenv').config()

// Conexión a la base de datos
const dbconfig = {
  database: process.env.DATABASE,
  user: process.env.USER,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  ssl: {
    rejectUnauthorized: false
  }
};
console.log(dbconfig)

module.exports = dbconfig;