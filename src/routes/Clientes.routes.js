const { Router } = require("express");
const ClientesCtrl = require("../controllers/Clientes.controller");
const { token } = require("../middlewares/conexionSiigo");
const { isAuth } = require("../middlewares/acceso");
const router = Router();
router
  .get(
    "/consultar/documento/:documento",
    isAuth,
    ClientesCtrl.consultarDocumento
  )
  .get("/consultar/nombre/:nombre", isAuth, ClientesCtrl.consultarNombre)
  .get("/consultar/consultasiigo", token, ClientesCtrl.consultarSIIGO)
  .get("/consultar/:ult", isAuth, ClientesCtrl.consultar)
  .get("/*", ClientesCtrl.error);
module.exports = router;
