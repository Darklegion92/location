const { Router } = require('express')
const CarterasCtrl = require('../controllers/Carteras.controller')
const { token } = require('../middlewares/conexionSiigo')
const router = Router()
router
  .get('/consultar/recibossiigo', token, CarterasCtrl.consultarRecibosSiigo)
  .get('/consultar/facturassiigo', token, CarterasCtrl.consultarFacturasSiigo)
  .get('/consultar/:documento', CarterasCtrl.carteraCliente)
  .get('/*', CarterasCtrl.error)
module.exports = router
