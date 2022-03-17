const { MatriculasServices } = require('../services')
const matriculasServices = new MatriculasServices()
const Sequelize = require('sequelize')
const { DadoInvalido } = require('../erros')

class MatriculaController {
    

    static async pegaUmaMatricula(req, res, next) {
        const { estudanteId, matriculaId } = req.params
        try {
            const umaMatricula = await matriculasServices.pegaUmRegistro(
                {  id: Number(matriculaId), estudante_id: Number(estudanteId) }
            )

            return res.status(200).json(umaMatricula)
        } catch (error) {
            next(error)
        }
    }

    static async criaMatricula(req, res, next) {
        const { estudanteId } = req.params
        const novaMatricula = {...req.body, estudante_id: Number(estudanteId)}
        try {
            const novaMatriculaCriada = await matriculasServices.criaRegistro(novaMatricula)
            return res.status(201).json(novaMatriculaCriada)
        } catch (error) {
            if(error.name == 'SequelizeValidationError'){
                const erro =  new DadoInvalido(error.errors[0].message)
                next(erro)  
            }
            if (error.name == 'SequelizeForeignKeyConstraintError'){
                let erro 
                if(error.fields[0] == 'turma_id') erro = new DadoInvalido('Turma inexistente!')
                if(error.fields[0] == 'estudante_id') erro = new DadoInvalido('Estudante inexistente!')
                next(erro)
            }
            next(error)
        }
    }

    static async atualizaMatricula(req, res, next) {
        const { estudanteId, matriculaId } = req.params
        const dadosAtualizados = req.body
        try {
            await matriculasServices.atualizaRegistro(
                dadosAtualizados, 
                { id: Number(matriculaId), estudante_id: Number(estudanteId) }
            )

            const matriculaAtualizada = await matriculasServices.pegaUmRegistro(
                { id: Number(matriculaId), estudante_id: Number(estudanteId) }
                )

            res.status(200).json(matriculaAtualizada)
        } catch (error) {
            if(error.name == 'SequelizeValidationError'){
                const erro =  new DadoInvalido(error.errors[0].message)
                next(erro)  
            }
            if (error.name == 'SequelizeForeignKeyConstraintError'){
                let erro 
                if(error.fields[0] == 'turma_id') erro = new DadoInvalido('Turma inexistente!')
                if(error.fields[0] == 'estudante_id') erro = new DadoInvalido('Estudante inexistente!')
                next(erro)
            }
            next(error) 
        }
    }

    static async apagaMatricula(req, res, next) {
        const { estudanteId, matriculaId } = req.params
        try {
            await matriculasServices.apagaRegistro(
                { id: Number(matriculaId), estudante_id: Number(estudanteId) }
            )

            res.status(200).json({ mensagem: `Registro id ${matriculaId} deletado` })
        } catch (error) {
            next(error)
        }
    }

    static async restauraMatricula(req, res, next) {
        const { estudanteId, matriculaId } = req.params
        try {
            await matriculasServices.restauraRegistro(
                { id: Number(matriculaId), estudante_id: Number(estudanteId) }
            )
            res.status(200).json({ mensagem: `Registro id ${matriculaId} restaurado` })
        } catch (error) {
            next(error) 
        }
    }

    static async pegaMatriculasNaTurma(req, res, next) {      
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
            next(error)
        }
    }

    static async pegaMatriculasEsgotadas(req, res, next) { 
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
            next(error)
        }
    }
}

module.exports = MatriculaController