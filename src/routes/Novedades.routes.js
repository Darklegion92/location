const { Router } = require("express");
const NovededesCtrl = require("../controllers/Novedades.controller");

const router = Router();
router.get("/", NovededesCtrl.consultar).get("/*", NovededesCtrl.error);
module.exports = router;
