const { Router } = require("express");
const BodegasCtrl = require("../controllers/Bodegas.controller");
const { token } = require("../middlewares/conexionSiigo");
const { isAuth } = require("../middlewares/acceso");
const router = Router();
router
  .get("/consultar", isAuth, BodegasCtrl.consultar)
  .get("/consultarsiigo", isAuth, token,BodegasCtrl.consultarsiigo)
  .get("/*", BodegasCtrl.error);
module.exports = router;
