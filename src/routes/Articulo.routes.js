const {Router} = require('express')
const ArticuloCtrl = require('../controllers/Articulo.controller')

const router = Router();
router
    .get('/lista/:nombre',ArticuloCtrl.listaNombre)
    .get('/lista/',ArticuloCtrl.lista)
    .get('/familia/:nombre',ArticuloCtrl.familia)
    .get('/grupo/:nombre',ArticuloCtrl.grupo)
    .get('/subgrupo/:nombre',ArticuloCtrl.subgrupo)
    .get('/agrupaciones/:nombre',ArticuloCtrl.agrupaciones)
    .get('/*',ArticuloCtrl.error)
    
module.exports = router;