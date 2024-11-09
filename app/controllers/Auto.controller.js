const Auto = require("../models/Auto.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const auto = new Auto({
    Marca: req.body.Marca,
    Modelo: req.body.Modelo,
    Matricula: req.body.Matricula,
    Tipo: req.body.Tipo,
    Transmision: req.body.Transmision,
    Pasajeros: req.body.Pasajeros,
    CostoXDia: req.body.CostoXDia,
    Generacion: req.body.Generacion,
  });

  Auto.create(auto, (err, data) => {
    if (err) res.status(500).send({ message: err.message || "Some error occurred while creating the Auto." });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Auto.getAll((err, data) => {
    if (err) res.status(500).send({ message: err.message || "Some error occurred while retrieving autos." });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Auto.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Not found Auto with id ${req.params.id}.` });
      } else {
        res.status(500).send({ message: "Error retrieving Auto with id " + req.params.id });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  Auto.updateById(req.params.id, new Auto(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Not found Auto with id ${req.params.id}.` });
      } else {
        res.status(500).send({ message: "Error updating Auto with id " + req.params.id });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Auto.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Not found Auto with id ${req.params.id}.` });
      } else {
        res.status(500).send({ message: "Could not delete Auto with id " + req.params.id });
      }
    } else res.send({ message: `Auto was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Auto.removeAll((err, data) => {
    if (err) res.status(500).send({ message: err.message || "Some error occurred while removing all autos." });
    else res.send({ message: `All Autos were deleted successfully!` });
  });
};
