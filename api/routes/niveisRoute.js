const { Router } = require('express')
const NivelController = require('../controllers/NivelController')
const router = Router()

router
.options('/*', NivelController.opcoes)
.get('/niveis', NivelController.pegaTodosOsNiveis)
.get('/niveis/:id', NivelController.pegaUmNivel)
.post('/niveis', NivelController.criaNivel)
.put('/niveis/:id', NivelController.atualizaNivel)
.delete('/niveis/:id', NivelController.apagaNivel)
.post('/niveis/:id/restaura', NivelController.restauraNivel)

module.exports = router