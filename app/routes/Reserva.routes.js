module.exports = (app) => {
    const reservas = require("../controllers/Reserva.controller.js");
    const router = require("express").Router();
  
    router.post("/", reservas.create);
    router.get("/", reservas.findAll);
    router.get("/:id", reservas.findOne);
    router.get("/details/info/all/", reservas.findAllReservationsWithDetails);
    router.get("/details/:id", reservas.getJoin);
    router.put("/:id", reservas.update);
    router.delete("/:id", reservas.delete);
    router.delete("/", reservas.deleteAll);
  
    // Nueva ruta para obtener reservas con detalles de autos para un usuario específico
    // Nueva ruta para obtener todas las reservas con detalles de autos y usuarios

    app.use("/api/reservas", router);
  };
  