const { Router } = require('express')
const OrdenesCtrl = require('../controllers/Ordenes.controller')
const { isAuth } = require('../middlewares/acceso')
const { token } = require('../middlewares/conexionSiigo')
const router = Router()
router
  .get('/consultar', isAuth, OrdenesCtrl.consultar)
  .post('/actualizar', isAuth, token, OrdenesCtrl.actualizar)
  .post('/guardar', isAuth, token, OrdenesCtrl.guardar)
  .get('/*', OrdenesCtrl.error)
module.exports = router
