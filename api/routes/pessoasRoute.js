const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')
const MatriculaController = require('../controllers/MatriculaController')

const router = Router()

router
.get('/pessoas', PessoaController.pegaTodasAsPessoas)
.get('/pessoas/ativas', PessoaController.pegaPessoasAtivas)
.get('/pessoas/:id', PessoaController.pegaUmaPessoa)
.post('/pessoas', PessoaController.criaPessoa)
.put('/pessoas/:id', PessoaController.atualizaPessoa)
.delete('/pessoas/:id', PessoaController.apagaPessoa)
.post('/pessoas/:id/restaura', PessoaController.restauraPessoa)
.get('/pessoas/:estudanteId/matriculas', PessoaController.pegaMatriculasDeEstudante)
.post('/pessoas/:estudanteId/cancelar', PessoaController.cancelaMatriculaDoEstudante)

module.exports = router