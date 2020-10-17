const { Router } = require("express");
const ArticulosCtrl = require("../controllers/Articulos.controller");
const { token } = require("../middlewares/conexionSiigo");
const router = Router();
router
  .get("/consultar", token, ArticulosCtrl.consultar)

  .get("/*", ArticulosCtrl.error);
module.exports = router;
