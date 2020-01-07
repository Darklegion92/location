const {Router} = require('express')
const ArticuloCtrl = require('../controllers/Articulo.controller')

const router = Router();
router
    .get('/filtro',ArticuloCtrl.listaFiltrada)
    .get('/lista',ArticuloCtrl.lista)
    .get('/agrupaciones/:nombre',ArticuloCtrl.agrupaciones)
    .get('/*',ArticuloCtrl.error)
    
module.exports = router;