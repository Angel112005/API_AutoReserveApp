const sql = require("../config/db.js");

const Reserva = function (reserva) {
  this.ID_Carro = reserva.ID_Carro;
  this.ID_User = reserva.ID_User;
  this.PagoTotal = reserva.PagoTotal;
  this.FechaInicio = reserva.FechaInicio;
  this.FechaFin = reserva.FechaFin;
  this.ID_Reservas = reserva.ID_Reservas;
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
    "UPDATE Reservas SET PagoTotal = ?, FechaInicio = ?, FechaFin = ? WHERE ID_Reservas = ?",
    [reserva.PagoTotal, reserva.FechaInicio, reserva.FechaFin, id],
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


// Método nuevo para obtener reservas con detalles del auto para un usuario específico
Reserva.getAllJoin = (idCliente, result) =>{
  const query = `
  select reservas.PagoTotal,
  reservas.ID_Reservas, 
	reservas.FechaInicio,
  reservas.ID_Carro,
    reservas.FechaFin,
    autos.Marca,
    autos.CostoXDia,
    autos.Generacion,
    autos.Estado,
    autos.Modelo,
    autos.Pasajeros,
    autos.Tipo,
    autos.Transmision FROM reservas
    JOIN autos ON reservas.ID_Carro = autos.ID_Auto where reservas.ID_User = ?;
  `;
  sql.query(query,[idCliente], (err,res)=> {
    if (err) {
      console.log("error", err);
      result(err, null);
      return;
    }
    result(null, res);
  })
}
module.exports = Reserva;

// Método nuevo para obtener todas las reservas con detalles de autos y usuarios
Reserva.getAllReservationsWithDetails = (result) => {
  const query = `
    SELECT reservas.PagoTotal, 
      reservas.ID_Reservas, 
           reservas.FechaInicio,
           reservas.FechaFin,
           reservas.ID_Carro,
           autos.Estado,
           autos.Marca,
           autos.CostoXDia,
           autos.Generacion,
           autos.Modelo,
           autos.Pasajeros,
           autos.Tipo,
           autos.Transmision,
           usuarios.Apellido,
           usuarios.Celular,
           usuarios.Direccion,
           usuarios.Email,
           usuarios.Nombre,
           usuarios.NumeroLicencia
    FROM reservas
    JOIN autos ON reservas.ID_Carro = autos.ID_Auto
    JOIN usuarios ON reservas.ID_User = usuarios.ID_User`;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("reservas with auto and user details: ", res);
    result(null, res);
  });
};
