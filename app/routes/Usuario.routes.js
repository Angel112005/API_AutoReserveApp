module.exports = (app) => {
    const usuarios = require("../controllers/Usuario.controller.js");
    const router = require("express").Router();
  
    router.post("/register", usuarios.register);
    router.post("/login", usuarios.login);
    router.get("/", usuarios.findAll);
    router.get("/:id", usuarios.findOne);
    router.put("/:id", usuarios.update);
    router.delete("/:id", usuarios.delete);
    router.delete("/", usuarios.deleteAll);
  
    app.use("/api/usuarios", router);
  };
  