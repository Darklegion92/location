const {Router} = require('express')
const BarrioCtrl = require('../controllers/Barrios.controller')

const router = Router();
router
    .get('/',BarrioCtrl.lista)
    .get('/*',BarrioCtrl.error)
    
module.exports = router;