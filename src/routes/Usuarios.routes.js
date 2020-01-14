const {Router} = require('express')
const UsuariosCtrl = require('../controllers/Usuario.controller')

const router = Router();
router
    .get('/consultar/:id',UsuariosCtrl.id)
    .get('/login',UsuariosCtrl.login)
    .post('/guardar',UsuariosCtrl.grabarUsuario)
    .get('/*',UsuariosCtrl.error)
    
module.exports = router;