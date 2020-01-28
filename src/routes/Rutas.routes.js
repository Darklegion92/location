const { Router } = require("express");
const RutasCtrl = require("../controllers/Rutas.controller");

const router = Router();
router
  .get("/consultar/:idUsuario", RutasCtrl.idUsuario)
  .post("/guardar/", RutasCtrl.guardarRuta)
  .post("/guardartotal/", RutasCtrl.agregarRutaTotal);
module.exports = router;
