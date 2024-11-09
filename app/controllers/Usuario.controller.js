const Usuario = require("../models/Usuario.model.js");
const db = require("../config/db.js");

exports.register = (req, res) => {
  console.log('Datos recibidos en el registro:', req.body)
  const { Nombre, Apellido, Email, Celular, Direccion, NumeroLicencia, Password, idRol } = req.body;

  const query = 'INSERT INTO Usuarios (Nombre, Apellido, Email, Celular, Direccion, NumeroLicencia, Password, idRol) VALUES (?,?,?,?,?,?,?,?)';
  db.query(query, [Nombre, Apellido, Email, Celular, Direccion, NumeroLicencia, Password, idRol], (err, result) => {
    if (err) {
      console.error("Error en el registro:", err); // Esto imprimirá el error detallado en la consola
      return res.status(500).send(err);
    }
    res.status(201).send({ id: result.insertId, Email });
  });
};

exports.login = (req, res) => {
  const { Email, Password } = req.body;

  const query = 'SELECT * FROM Usuarios WHERE Email = ? AND Password = ?';
  db.query(query, [Email, Password], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send({ message: 'Usuario o contraseña incorrectos' });

    const user = results[0];
    res.status(200).send({ id: user.ID_User, nombre: user.Nombre, email: user.Email , idRol: user.idRol});
  });
};

exports.findAll = (req, res) => {
  const nombre = req.query.nombre;

  Usuario.getAll(nombre, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving usuarios.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Usuario.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Usuario with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Usuario with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Usuario.updateById(req.params.id, new Usuario(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Usuario with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Usuario with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Usuario.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Usuario with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Usuario with id " + req.params.id,
        });
      }
    } else res.send({ message: `Usuario was deleted successfully!` });
  });
};

// Delete all Usuarios from the database.
exports.deleteAll = (req, res) => {
  Usuario.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all usuarios.",
      });
    else res.send({ message: `All Usuarios were deleted successfully!` });
  });
};
