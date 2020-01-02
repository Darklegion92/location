const {Router} = require('express')
const AgrupacionesCtrl = require('../controllers/Agrupacion.controller')

const router = Router();
router
    .get('/',AgrupacionesCtrl.lista)
    .get('/*',AgrupacionesCtrl.error)
    
module.exports = router;