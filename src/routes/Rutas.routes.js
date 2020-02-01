const { Router } = require("express");
const RutasCtrl = require("../controllers/Rutas.controller");

const router = Router();
router
  .get("/dia", RutasCtrl.ruteroDia)
  .get("/usuario", RutasCtrl.informeRutas)
  .post("/guardar", RutasCtrl.guardarRuta)
  .post("/visita", RutasCtrl.guardarVisita);
module.exports = router;
