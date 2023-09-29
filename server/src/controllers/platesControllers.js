require("dotenv").config();

// const { createPool } = require("mysql2/promise");
const mysql = require("mysql");

const dbconfig = require("../../dbconfig");

const CTRLPlate = {};

/********* Métodos del controlador **********/
/******************* GET ********************/
/*********************************************/
CTRLPlate.getAllPlates = async (req, res) => {
  let connection;

  try {
    connection = await mysql.createConnection(dbconfig);

    await connection.query("SELECT * FROM vehicle_plates", (error, results) => {
      if (error) {
        return res.status(404).json({
          message: "Not Found",
        });
      }

      if (results.length === 0) {
        return res.status(200).json({
          message: `Sin registros`,
        });
      }
      res.status(200).json({
        message: `El proceso se ejecutó correctamente`,
        data: results,
      });
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  } finally {
    console.log("closed connection");
    connection.end();
  }
};

/******************* POST ********************/
/*********************************************/
CTRLPlate.postCreatePlate = async (req, res) => {
  const {
    first_name,
    last_name,
    dni,
    date_of_birth,
    type_of_plate,
    type_of_people,
    type_of_car,
    total_value_paid,
  } = req.body;

  if (
    !first_name ||
    !last_name ||
    !dni ||
    !date_of_birth ||
    !type_of_plate ||
    !type_of_people ||
    !type_of_car ||
    !total_value_paid
  ) {
    return res.status(400).json({
      message: "Datos requeridos.",
    });
  }

  let connection;

  try {
    connection = await mysql.createConnection(dbconfig);

    const post = {
      first_name: first_name,
      last_name: last_name,
      dni: dni,
      date_of_birth: date_of_birth,
      type_of_plate: type_of_plate,
      type_of_people: type_of_people,
      type_of_car: type_of_car,
      total_value_paid: parseInt(total_value_paid),
    };

    await connection.query(
      "INSERT INTO vehicle_plates SET ?",
      post,
      (error) => {
        if (error) {
          if (error.errno === 1062) {
            return res.status(404).json({
              message: "Cédula duplicada",
            });
          }
          return res.status(404).json({
            message: "Error al crear placa",
          });
        }
        res.status(200).json({
          message: `Se creo correctamente`,
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  } finally {
    console.log("closed connection");
    connection.end();
  }
};

/******************* PUT ********************/
/*********************************************/
CTRLPlate.putPlate = async (req, res) => {
  const { id, ...args } = req.body;
  let connection;

  console.log(id, args);
  try {
    connection = await mysql.createConnection(dbconfig);

    await connection.query(
      "UPDATE vehicle_plates SET ? WHERE id = ?",
      [args, id],
      (error, results) => {
        if (error) {
          return res.status(404).json({
            message: "No se pudo actualizar",
          });
        }

        if (results.affectedRows !== 0) {
          return res.status(200).json({
            message: `Datos actualizados correctamente`,
          });
        }
        res.status(404).json({
          message: `Placa no encontrada`,
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  } finally {
    console.log("closed connection");
    connection.end();
  }
};

/******************* DELETE ********************/
/*********************************************/
CTRLPlate.deletePlate = async (req, res) => {
  const { id } = req.params;
  let connection;

  console.log(id)
  try {
    connection = await mysql.createConnection(dbconfig);

    await connection.query(
      `DELETE FROM vehicle_plates WHERE id = ${id}`,
      (error, results) => {
        if (error)
          return res.status(404).json({
            message: "No se pudo eliminar",
          });

        if (results.affectedRows !== 0) {
          return res.status(200).json({
            message: `Datos eliminados correctamente`,
          });
        }
        res.status(200).json({
          message: `Esta placa no existe`,
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  } finally {
    console.log("closed connection");
    connection.end();
  }
};

module.exports = CTRLPlate;
