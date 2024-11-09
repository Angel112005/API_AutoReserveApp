const Reserva = require("../models/Reserva.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const reserva = new Reserva({
    ID_Carro: req.body.ID_Carro,
    ID_User: req.body.ID_User,
    PagoTotal: req.body.PagoTotal,
    FechaInicio: req.body.FechaInicio,
    FechaFin: req.body.FechaFin,
  });

  Reserva.create(reserva, (err, data) => {
    if (err) res.status(500).send({ message: err.message || "Some error occurred while creating the Reserva." });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Reserva.getAll((err, data) => {
    if (err) res.status(500).send({ message: err.message || "Some error occurred while retrieving reservas." });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Reserva.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Not found Reserva with id ${req.params.id}.` });
      } else {
        res.status(500).send({ message: "Error retrieving Reserva with id " + req.params.id });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  Reserva.updateById(req.params.id, new Reserva(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Not found Reserva with id ${req.params.id}.` });
      } else {
        res.status(500).send({ message: "Error updating Reserva with id " + req.params.id });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Reserva.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Not found Reserva with id ${req.params.id}.` });
      } else {
        res.status(500).send({ message: "Could not delete Reserva with id " + req.params.id });
      }
    } else res.send({ message: `Reserva was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Reserva.removeAll((err, data) => {
    if (err) res.status(500).send({ message: err.message || "Some error occurred while removing all reservas." });
    else res.send({ message: `All Reservas were deleted successfully!` });
  });
};
