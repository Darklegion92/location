const { Router } = require('express')
const ArticulosCtrl = require('../controllers/Articulos.controller')
const { token } = require('../middlewares/conexionSiigo')
const { isAuth } = require('../middlewares/acceso')
const router = Router()
router
  .get('/consultarsiigo', token, ArticulosCtrl.consultarSIIGO)
  .get('/consultar/stock', isAuth, ArticulosCtrl.consultarItems)
  .get('/consultar/codigo/:codigo', isAuth, ArticulosCtrl.consultarDocumento)
  .get('/consultar/nombre/:nombre', isAuth, ArticulosCtrl.consultarNombre)
  .get('/consultar/:ult', isAuth, ArticulosCtrl.consultar)
  .get('/*', ArticulosCtrl.error)
module.exports = router
