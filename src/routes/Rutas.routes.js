const { Router } = require("express");
const RutasCtrl = require("../controllers/Rutas.controller");
const { isAuth } = require("../middlewares/acceso");
const router = Router();
router
  .get("/dia", RutasCtrl.ruteroDia)
  .get("/usuario", isAuth, RutasCtrl.informeRutas)
  .put("/eliminar", isAuth, RutasCtrl.eliminarRuta)
  .post("/guardar", isAuth, RutasCtrl.guardarRuta)
  .post("/visita", RutasCtrl.guardarVisita);
module.exports = router;
