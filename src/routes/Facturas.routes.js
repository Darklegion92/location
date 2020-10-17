const { Router } = require("express");
const FacturasCtrl = require("../controllers/Facturas.controller");
const { token } = require("../middlewares/conexionSiigo");
const router = Router();
router
  .post("/guardar", token, FacturasCtrl.guardar)
  .get("/*", FacturasCtrl.error);
module.exports = router;
