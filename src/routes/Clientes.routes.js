const { Router } = require("express");
const ClientesCtrl = require("../controllers/Clientes.controller");

const router = Router();
router
  .get("/consultar/:documento", ClientesCtrl.documento)
  .put("/guardar/cartera",ClientesCtrl.guardarCartera)
  .get("/*", ClientesCtrl.error);
module.exports = router;
