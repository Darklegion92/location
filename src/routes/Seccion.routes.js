const {Router} = require('express')
const SeccionesCtrl = require('../controllers/Seccion.controller')

const router = Router();
router
    .get('/',SeccionesCtrl.lista)
    .get('/marcas',SeccionesCtrl.marcas)
    .get('/*',SeccionesCtrl.error)
    
module.exports = router;