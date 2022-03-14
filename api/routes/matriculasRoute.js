const { Router } = require('express')
const router = Router()
const MatriculaController = require('../controllers/MatriculaController')

router
.get('/pessoas/:estudanteId/matriculas/:matriculaId', MatriculaController.pegaUmaMatricula)
.post('/pessoas/:estudanteId/matriculas', MatriculaController.criaMatricula)
.put('/pessoas/:estudanteId/matriculas/:matriculaId', MatriculaController.atualizaMatricula)
.delete('/pessoas/:estudanteId/matriculas/:matriculaId', MatriculaController.apagaMatricula)
.post('/pessoas/:estudanteId/matriculas/:matriculaId/restaura', MatriculaController.restauraMatricula)
.get('/pessoas/matriculas/:turmaId/confirmadas', MatriculaController.pegaMatriculasNaTurma)
.get('/pessoas/matriculas/esgotadas', MatriculaController.pegaMatriculasEsgotadas)

module.exports = router

