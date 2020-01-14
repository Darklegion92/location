const { Router } = require("express");
const CarritoCtrl = require("../controllers/Carrito.controller");

const router = Router();
router
  .post("/", CarritoCtrl.guardar)
  .post("/guardar/noregistrado", CarritoCtrl.guardarNoRegistrado)
  .get("/*", CarritoCtrl.error);

module.exports = router;
