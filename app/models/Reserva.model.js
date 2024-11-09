const sql = require("../config/db.js");

const Reserva = function (reserva) {
  this.ID_Carro = reserva.ID_Carro;
  this.ID_User = reserva.ID_User;
  this.PagoTotal = reserva.PagoTotal;
  this.FechaInicio = reserva.FechaInicio;
  this.FechaFin = reserva.FechaFin;
};

Reserva.create = (newReserva, result) => {
  sql.query("INSERT INTO Reservas SET ?", newReserva, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created reserva: ", { id: res.insertId, ...newReserva });
    result(null, { id: res.insertId, ...newReserva });
  });
};

Reserva.findById = (id, result) => {
  sql.query(`SELECT * FROM Reservas WHERE ID_Reservas = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found reserva: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

Reserva.getAll = (result) => {
  sql.query("SELECT * FROM Reservas", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("reservas: ", res);
    result(null, res);
  });
};

Reserva.updateById = (id, reserva, result) => {
  sql.query(
    "UPDATE Reservas SET ID_Carro = ?, ID_User = ?, PagoTotal = ?, FechaInicio = ?, FechaFin = ? WHERE ID_Reservas = ?",
    [reserva.ID_Carro, reserva.ID_User, reserva.PagoTotal, reserva.FechaInicio, reserva.FechaFin, id],
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
      console.log("updated reserva: ", { id: id, ...reserva });
      result(null, { id: id, ...reserva });
    }
  );
};

Reserva.remove = (id, result) => {
  sql.query("DELETE FROM Reservas WHERE ID_Reservas = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted reserva with id: ", id);
    result(null, res);
  });
};

Reserva.removeAll = (result) => {
  sql.query("DELETE FROM Reservas", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} reservas`);
    result(null, res);
  });
};

module.exports = Reserva;
