const { PessoasServices } = require('../services')
const pessoasServices = new PessoasServices()

class PessoaController {

    //Métodos para Pessoas

    static async pegaPessoasAtivas(req, res) {
        try {
            const pessoasAtivas = await pessoasServices.pegaRegistrosAtivos()
            return res.status(200).json(pessoasAtivas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaTodasAsPessoas(req, res) {
        try {
            const todasAsPessoas = await pessoasServices.pegaTodosOsRegistros()
            return res.status(200).json(todasAsPessoas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmaPessoa(req, res) {
        const { id } = req.params
        try {
            const umaPessoa = await pessoasServices.pegaUmRegistro(Number(id))
            return res.status(200).json(umaPessoa)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaPessoa(req, res) {
        const novaPessoa = req.body
        try {
            const novaPessoaCriada = await pessoasServices.criaRegistro(novaPessoa)
            return res.status(201).json(novaPessoaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaPessoa(req, res) {
        const { id } = req.params
        const dadosAtualizados = req.body
        try {
            await pessoasServices.atualizaRegistro(dadosAtualizados, Number(id))

            const pessoaAtualizada = await pessoasServices.pegaUmRegistro(Number(id))

            res.status(200).json(pessoaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async apagaPessoa(req, res) {
        const { id } = req.params
        try {
            await pessoasServices.apagaRegistro(Number(id))
            res.status(200).json({ mensagem: `Registro id ${id} deletado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async restauraPessoa(req, res) {
        const { id } = req.params
        try {
            await pessoasServices.restauraRegistro(Number(id))
            res.status(200).json({ mensagem: `Registro id ${id} restaurado` })
        } catch (error) {
            return res.status(500).json(error.message) 
        }
    }



    //Métodos para Matrículas

    static async pegaMatriculasDeEstudante(req, res) {
        const { estudanteId } = req.params
        try {
            const umaPessoa = await pessoasServices.pegaUmRegistro(Number(estudanteId))
            if(!umaPessoa) throw new Error(`Pessoa com id ${estudanteId} não foi encontrada!`)
            const matriculasDeEstudante = await umaPessoa.getAulasMatriculadas()
            return res.status(200).json(matriculasDeEstudante)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async cancelaMatriculaDoEstudante(req, res) {      
        const { estudanteId } = req.params
        try {
            await pessoasServices.cancelaPessoaEMatriculas(Number(estudanteId))
            return res.status(200).json(
                    { message: `Matrículas do estudante id ${estudanteId} canceladas` }
            )               
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

}

module.exports = PessoaController