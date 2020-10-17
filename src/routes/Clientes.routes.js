const { Router } = require("express");
const ClientesCtrl = require("../controllers/Clientes.controller");
const { token } = require("../middlewares/conexionSiigo");
const router = Router();
router
  .get("/consultar/", token, ClientesCtrl.consultar)
  .get("/consultar/:documento", token, ClientesCtrl.documento)
  .get("/*", ClientesCtrl.error);
module.exports = router;
