const { Router } = require("express");
const ClientesCtrl = require("../controllers/Clientes.controller");
const { token } = require("../middlewares/conexionSiigo");
const router = Router();
router
  .get("/consultar/:documento", token, ClientesCtrl.documento)
  .put("/guardar/cartera", ClientesCtrl.guardarCartera)
  .get("/*", ClientesCtrl.error);
module.exports = router;
