const { Router } = require("express");
const CarterasCtrl = require("../controllers/Carteras.controller");
const { token } = require("../middlewares/conexionSiigo");
const router = Router();
router
  .get("/consultar", token, CarterasCtrl.consultar)
  .get("/*", CarterasCtrl.error);
module.exports = router;
