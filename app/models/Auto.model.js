const sql = require("../config/db.js");

const Auto = function (auto) {
  this.Marca = auto.Marca;
  this.Modelo = auto.Modelo;
  this.Generacion = auto.Generacion;
  this.Matricula = auto.Matricula;
  this.Tipo = auto.Tipo;
  this.Transmision = auto.Transmision;
  this.Pasajeros = auto.Pasajeros;
  this.CostoXDia = auto.CostoXDia;
  this.Estado = auto.Estado;
};

Auto.create = (newAuto, result) => {
  sql.query("INSERT INTO Autos SET ?", newAuto, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created auto: ", { id: res.insertId, ...newAuto });
    result(null, { id: res.insertId, ...newAuto });
  });
};

Auto.findById = (id, result) => {
  sql.query(`SELECT * FROM Autos WHERE ID_Auto = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found auto: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

Auto.getAll = (result) => {
  sql.query("SELECT * FROM Autos", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("autos: ", res);
    result(null, res);
  });
};

Auto.updateEstadoById = (id, estado, result) => {
  sql.query(
    "UPDATE Autos SET Estado = ? WHERE ID_Auto = ?",
    [estado, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // No se encontró el auto con el ID proporcionado
        result({ kind: "not_found" }, null);
        return;
      }
      console.log(`Estado del auto con id ${id} actualizado a: ${estado}`);
      result(null, { id: id, Estado: estado });
    }
  );
};

Auto.updateById = (id, auto, result) => {
  sql.query(
    "UPDATE Autos SET Matricula = ?, Generacion = ?, CostoXDia = ?, Estado = ? WHERE ID_Auto = ?",
    [auto.Matricula, auto.Generacion, auto.CostoXDia, auto.Estado, id],
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
      console.log("updated auto: ", { id: id, ...auto });
      result(null, { id: id, ...auto });
    }
  );
};

Auto.remove = (id, result) => {
  sql.query("DELETE FROM Autos WHERE ID_Auto = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted auto with id: ", id);
    result(null, res);
  });
};

Auto.removeAll = (result) => {
  sql.query("DELETE FROM Autos", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} autos`);
    result(null, res);
  });
};

module.exports = Auto;
