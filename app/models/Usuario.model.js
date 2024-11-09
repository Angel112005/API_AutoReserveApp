const sql = require("../config/db.js");

// constructor
const Usuario = function (usuario) {
  this.Nombre = usuario.Nombre;
  this.Apellido = usuario.Apellido;
  this.Email = usuario.Email;
  this.Celular = usuario.Celular;
  this.Direccion = usuario.Direccion;
  this.NumeroLicencia = usuario.NumeroLicencia;
  this.Password = usuario.Password;
  this.idRol = usuario.idRol;
};

Usuario.findById = (id, result) => {
  sql.query(`SELECT * FROM Usuarios WHERE ID_User = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found usuario: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Usuario.getAll = (nombre, result) => {
  let query = "SELECT * FROM Usuarios";

  if (nombre) {
    query += ` WHERE Nombre LIKE '%${nombre}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("usuarios: ", res);
    result(null, res);
  });
};

Usuario.updateById = (id, usuario, result) => {
  sql.query(
    "UPDATE Usuarios SET Nombre = ?, Apellido = ?, Email = ?, Celular = ?, Direccion = ?, NumeroLicencia = ?, Password = ?, idRol = ? WHERE ID_User = ?",
    [
      usuario.Nombre,
      usuario.Apellido,
      usuario.Email,
      usuario.Celular,
      usuario.Direccion,
      usuario.NumeroLicencia,
      usuario.Password,
      usuario.idRol,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated usuario: ", { id: id, ...usuario });
      result(null, { id: id, ...usuario });
    }
  );
};

Usuario.remove = (id, result) => {
  sql.query("DELETE FROM Usuarios WHERE ID_User = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted usuario with id: ", id);
    result(null, res);
  });
};

Usuario.removeAll = (result) => {
  sql.query("DELETE FROM Usuarios", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} usuarios`);
    result(null, res);
  });
};

module.exports = Usuario;
