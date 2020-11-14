const { Router } = require('express')
const ArticulosCtrl = require('../controllers/Articulos.controller')
const { token } = require('../middlewares/conexionSiigo')
const router = Router()
router
  .get('/consultarsiigo', token, ArticulosCtrl.consultarSIIGO)
  .get('/consultar/codigo/:codigo', token, ArticulosCtrl.consultarDocumento)
  .get('/consultar/nombre/:nombre', token, ArticulosCtrl.consultarNombre)
  .get('/consultar/:ult', token, ArticulosCtrl.consultar)

  .get('/*', ArticulosCtrl.error)
module.exports = router
