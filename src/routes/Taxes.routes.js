const { Router } = require('express')
const TaxesCtrl = require('../controllers/Taxes.controller')
const { token } = require('../middlewares/conexionSiigo')
const { isAuth } = require('../middlewares/acceso')
const router = Router()
router
  .get('/consultar', isAuth, TaxesCtrl.consultar)
  .get('/consultarsiigo', isAuth, token, TaxesCtrl.consultarsiigo)
  .get('/*', TaxesCtrl.error)
module.exports = router
