const { Router } = require("express");
const LocationCtrl = require("../controllers/Location.controller");

const router = Router();
router
  .post("/consultar/", LocationCtrl.id)
  .post("/guardar/", LocationCtrl.grabarLocation)
  .get("/*", LocationCtrl.error);

module.exports = router;
