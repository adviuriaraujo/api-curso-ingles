const { MatriculasServices } = require('../services')
const matriculasServices = new MatriculasServices()
const Sequelize = require('sequelize')

class MatriculaController {
    

    static async pegaUmaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        try {
            const umaMatricula = await matriculasServices.pegaUmRegistro(
                {  id: matriculaId, estudante_id: estudanteId }
            )

            return res.status(200).json(umaMatricula)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaMatricula(req, res) {
        const { estudanteId } = req.params
        const novaMatricula = {...req.body, estudante_id: Number(estudanteId)}
        try {
            const novaMatriculaCriada = await matriculasServices.criaRegistro(novaMatricula)
            return res.status(201).json(novaMatriculaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        const dadosAtualizados = req.body
        try {
            await matriculasServices.atualizaRegistros(
                dadosAtualizados, 
                { id: Number(matriculaId), estudante_id: Number(estudanteId) }
            )

            const matriculaAtualizada = await matriculasServices.pegaUmRegistro(
                { id: Number(matriculaId), estudante_id: Number(estudanteId) }
                )

            res.status(200).json(matriculaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async apagaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        try {
            await matriculasServices.apagaRegistro(
                { id: Number(matriculaId), estudante_id: Number(estudanteId) }
            )

            res.status(200).json({ mensagem: `Registro id ${matriculaId} deletado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async restauraMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        try {
            await matriculasServices.restauraRegistro(
                { id: Number(matriculaId), estudante_id: Number(estudanteId) }
            )
            res.status(200).json({ mensagem: `Registro id ${matriculaId} restaurado` })
        } catch (error) {
            return res.status(500).json(error.message) 
        }
    }

    static async pegaMatriculasNaTurma(req, res) {      
        const { turmaId } = req.params
        try {
            const { orderBy, order, limit } = req.query            
            const matriculasNaTurma = await matriculasServices.encontraEContaRegistros(
                { turma_id: Number(turmaId), status: 'confirmado' },
                {
                    limit: Number(limit || 20),
                    order: [[`${orderBy || 'estudante_id' }`, `${order || 'ASC'}`]]
                }
            )
            return res.status(200).json(matriculasNaTurma)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaMatriculasEsgotadas(req, res) { 
        const lotacaoTurma = 3     
        try {
            const matriculasEsgotadas = await matriculasServices.encontraEContaRegistros(
                { status: 'confirmado' },
                {
                    attributes: ['turma_id'],
                    group: ['turma_id'],
                    having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
                }
            )
            return res.status(200).json(matriculasEsgotadas.count)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = MatriculaController