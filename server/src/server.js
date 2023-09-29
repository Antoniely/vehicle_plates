const express = require("express");
const morgan = require("morgan");


const app = express();

// settings
app.set("json spaces", 2);

const PORT = process.env.PORT || 3002;

// Middelware
app.use(express.urlencoded({ extended: false }));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// routes
app.use('/api', require('./routes/routes'));

// Starting the server
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });