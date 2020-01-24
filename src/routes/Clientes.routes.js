const { Router } = require("express");
const ClientesCtrl = require("../controllers/Clientes.controller");

const router = Router();
router
  .get("/consultar/:idCliente", ClientesCtrl.idCliente)

  .get("/*", ClientesCtrl.error);
module.exports = router;
