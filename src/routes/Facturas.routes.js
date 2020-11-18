const { Router } = require('express')
const FacturasCtrl = require('../controllers/Facturas.controller')
const { token } = require('../middlewares/conexionSiigo')
const { isAuth } = require('../middlewares/acceso')
const router = Router()
router
  .post('/guardar', isAuth, token, FacturasCtrl.guardar)
  .get('/*', FacturasCtrl.error)
module.exports = router
