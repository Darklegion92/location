const {Router} = require('express')
const SlidersCtrl = require('../controllers/Slider.controller')

const router = Router();
router
    .get('/',SlidersCtrl.lista)
    .get('/*',SlidersCtrl.error)
    
module.exports = router;