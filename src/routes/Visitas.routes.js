const { Router } = require("express");
const VisitasCtrl = require("../controllers/Visitas.controller");
const { token } = require("../middlewares/conexionSiigo");
const router = Router();
router
  .get("/grabarrecibo", token, VisitasCtrl.guardarRecibo)
  .get("/*", VisitasCtrl.error);
module.exports = router;
