const { Router } = require('express')
const UsuarioController = require('../controllers/UsuarioController')

const router = Router()

router
.post('/usuarios', UsuarioController.criaUsuario)

module.exports = router