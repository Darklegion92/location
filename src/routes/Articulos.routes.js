const { Router } = require("express");
const ArticulosCtrl = require("../controllers/Articulos.controller");

const router = Router();
router
  .get("/consultar/:nombre", ArticulosCtrl.nombre)
  .get("/*", ArticulosCtrl.error);
module.exports = router;
