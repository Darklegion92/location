const { Router } = require("express");
const LocationCtrl = require("../controllers/Location.controller");

const router = Router();
router
  .post("/consultar/", LocationCtrl.obtenerLocation)
  .get("/*", LocationCtrl.error);

module.exports = router;
