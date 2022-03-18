const { NiveisServices } = require('../services')
const niveisServices = new NiveisServices()
const { DadoInvalido } = require('../erros')

class NivelController {

    static async opcoes(req, res, next) {
        res.set('Access-Control-Allow-Methods', '*')
        res.set('Access-Control-Allow-Headers', 'Content-Type')
        res.status(204)
        res.end()
    }

    static async pegaTodosOsNiveis(req, res, next){
        try {
            const todosOsNiveis = await niveisServices.pegaTodosOsRegistros()
            res.status(200).json(todosOsNiveis)
        } catch (error) {
            next(error)
        }
    }

    static async pegaUmNivel(req, res, next){
        const { id } = req.params
        try {
            const umNivel = await niveisServices.pegaUmRegistro(Number(id))
            return res.status(200).json(umNivel)
        } catch (error) {
            next(error)
        }
    }

    static async criaNivel(req, res, next){
        const novoNivel = req.body
        try {
            const novoNivelCriado = await niveisServices.criaRegistro(novoNivel)
            res.status(201).json(novoNivelCriado)
        } catch (error) {
            const erro =  new DadoInvalido(error.errors[0].message)
            next(erro)
        }
    }

    static async atualizaNivel(req, res, next){
        const { id } = req.params
        const dadosAtualizados = req.body
        try {
            await niveisServices.atualizaRegistro(dadosAtualizados, Number(id))

            const nivelAtualizado = await niveisServices.pegaUmRegistro(Number(id))

            res.status(200).json(nivelAtualizado)
        } catch (error) {
            console.log(error.name)
            if(error.name == 'SequelizeValidationError'){
                const erro =  new DadoInvalido(error.errors[0].message)
                next(erro)  
            }else {
                next(error)
            }            
        }
    }

    static async apagaNivel(req, res, next){
        const { id } = req.params
        try {
            await niveisServices.apagaRegistro(Number(id))

            res.status(200).json({ mensagem: `Registro id ${id} deletado` })
        } catch (error) {
            next(error)
        }
    }

    static async restauraNivel(req, res, next) {
        const { id } = req.params
        try {
            await niveisServices.restauraRegistro(Number(id))
            res.status(200).json({ mensagem: `Registro id ${id} restaurado` })
        } catch (error) {
            next(error) 
        }
    }
}

module.exports = NivelController