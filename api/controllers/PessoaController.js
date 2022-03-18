const { PessoasServices } = require('../services')
const pessoasServices = new PessoasServices()
const { DadoInvalido } = require('../erros')

class PessoaController {

    static async opcoes(req, res, next) {
        res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
        res.set('Access-Control-Allow-Headers', 'Content-Type')
        res.status(204)
        res.end()
    }

    //Métodos para Pessoas

    static async pegaPessoasAtivas(req, res, next) {
        try {
            const pessoasAtivas = await pessoasServices.pegaRegistrosAtivos()
            return res.status(200).json(pessoasAtivas)
        } catch (error) {
            next(error)
        }
    }

    static async pegaTodasAsPessoas(req, res, next) {
        try {
            const todasAsPessoas = await pessoasServices.pegaTodosOsRegistros()
            return res.status(200).json(todasAsPessoas)
        } catch (error) {
            next(error)
        }
    }

    static async pegaUmaPessoa(req, res, next) {
        const { id } = req.params
        try {
            const umaPessoa = await pessoasServices.pegaUmRegistro(Number(id))
            return res.status(200).json(umaPessoa)
        } catch (error) {
            next(error)            
        }
    }

    static async criaPessoa(req, res, next) {
        const novaPessoa = req.body
        try {
            const novaPessoaCriada = await pessoasServices.criaRegistro(novaPessoa)
            return res.status(201).json(novaPessoaCriada)
        } catch (error) {
            const erro =  new DadoInvalido(error.errors[0].message)
            next(erro)
        }
    }

    static async atualizaPessoa(req, res, next) {
        const { id } = req.params
        const dadosAtualizados = req.body
        try {
            await pessoasServices.atualizaRegistro(dadosAtualizados, Number(id))

            const pessoaAtualizada = await pessoasServices.pegaUmRegistro(Number(id))

            res.status(200).json(pessoaAtualizada)
        } catch (error) {
            if(error.name == 'SequelizeValidationError'){
                const erro =  new DadoInvalido(error.errors[0].message)
                next(erro)  
            }else {
                next(error)
            } 
        }
    }

    static async apagaPessoa(req, res, next) {
        const { id } = req.params
        try {
            await pessoasServices.apagaRegistro(Number(id))
            res.status(200).json({ mensagem: `Registro id ${id} deletado` })
        } catch (error) {
            next(error)
        }
    }

    static async restauraPessoa(req, res, next) {
        const { id } = req.params
        try {
            await pessoasServices.restauraRegistro(Number(id))
            res.status(200).json({ mensagem: `Registro id ${id} restaurado` })
        } catch (error) {
            next(error) 
        }
    }



    //Métodos para Matrículas

    static async pegaMatriculasDeEstudante(req, res, next) {
        const { estudanteId } = req.params
        try {
            const umaPessoa = await pessoasServices.pegaUmRegistro(Number(estudanteId))
            const matriculasDeEstudante = await umaPessoa.getAulasMatriculadas()
            return res.status(200).json(matriculasDeEstudante)
        } catch (error) {
            next(error)
        }
    }

    static async cancelaMatriculaDoEstudante(req, res, next) {      
        const { estudanteId } = req.params
        try {
            await pessoasServices.cancelaPessoaEMatriculas(Number(estudanteId))
            return res.status(200).json(
                    { message: `Matrículas do estudante id ${estudanteId} canceladas` }
            )               
        } catch (error) {
            next(error)
        }
    }

}

module.exports = PessoaController