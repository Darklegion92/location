const {Router} = require('express')
const DatosCtrl = require('../controllers/Datos.controller')

const router = Router();
router
    .get('/redes',DatosCtrl.redes)
    .get('/sucursales',DatosCtrl.sucursal)
    .get('/',DatosCtrl.lista)
    .get('/*',DatosCtrl.error)
    
module.exports = router;