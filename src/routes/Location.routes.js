const { Router } = require("express");
const LocationCtrl = require("../controllers/Location.controller");
const { isAuth } = require("../middlewares/acceso");
const router = Router();
router
  .get("/", isAuth, LocationCtrl.obtenerLocation)
  .get("/*", LocationCtrl.error);

module.exports = router;
