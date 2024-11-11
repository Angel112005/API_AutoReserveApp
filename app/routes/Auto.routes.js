module.exports = (app) => {
    const autos = require("../controllers/Auto.controller.js");
    const router = require("express").Router();
  
    router.post("/", autos.create);
    router.get("/", autos.findAll);
    router.get("/:id", autos.findOne);
    router.put("/:id", autos.update);
    router.delete("/:id", autos.delete);
    router.delete("/", autos.deleteAll);
    // Nueva ruta PATCH para actualizar solo el estado de un auto
    router.patch("/:id/estado", autos.updateEstado);  
  
    app.use("/api/autos", router);
  };
  