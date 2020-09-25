const { Router } = require("express");
const UsuariosCtrl = require("../controllers/Usuario.controller");
const { token } = require("../middlewares/conexionSiigo");
const router = Router();
router
  .get("/consultar/:id", token, UsuariosCtrl.id)
  .get("/consultar/", UsuariosCtrl.consultar)
  .post("/login", UsuariosCtrl.login)
  .post("/guardar", UsuariosCtrl.grabarUsuario)
  .post("/actualizar", UsuariosCtrl.actualizarUsuario)
  .get("/*", UsuariosCtrl.error);
module.exports = router;
