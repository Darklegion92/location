const { Router } = require('express')
const ClientesCtrl = require('../controllers/Clientes.controller')
const { token } = require('../middlewares/conexionSiigo')
const router = Router()
router
  .get('/consultar/documento/:documento', ClientesCtrl.consultarDocumento)
  .get('/consultar/nombre/:nombre', ClientesCtrl.consultarNombre)
  .get('/consultar/consultasiigo', token, ClientesCtrl.consultarSIIGO)
  .get('/consultar/:ult', ClientesCtrl.consultar)
  .get('/*', ClientesCtrl.error)
module.exports = router
