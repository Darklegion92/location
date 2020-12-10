const { Router } = require('express')
const NovededesCtrl = require('../controllers/Novedades.controller')
const { isAuth } = require('../middlewares/acceso')
const router = Router()
router
  .post('/guardar', isAuth, NovededesCtrl.guardar)
  .get('/', NovededesCtrl.consultar)
  .get('/*', NovededesCtrl.error)
module.exports = router
