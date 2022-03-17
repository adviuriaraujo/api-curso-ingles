const Services = require('./Services')
const database = require('../models')
const { NaoEncontrado } = require('../erros')

class MatriculasServices extends Services {
    constructor(){
        super('Matriculas')
    }

    async pegaUmRegistro(where = {}) {
        const retorno = await database[this.nomeDoModelo].findOne(
            { where: { ...where} }
        )
        if (!retorno) throw new NaoEncontrado(where.id)
        return retorno
    }

    async atualizaRegistro(dadosAtualizados, where, transacao = {}) {
        const verificaRegistro = await database[this.nomeDoModelo].findAndCountAll(
            { where: { ...where }}
        )
        if(verificaRegistro.count == 0) throw new NaoEncontrado(where.id)
        const atualizado = database[this.nomeDoModelo].update(
            dadosAtualizados,
            { where: { ...where } },
            { transaction: transacao }
        )
        return atualizado
    }

    async apagaRegistro(where = {}) {
        return database[this.nomeDoModelo].destroy(
            { where: { ...where } }
        )
    }

    async restauraRegistro(where = {}) {
        return database[this.nomeDoModelo].restore(
            { where: { ...where } }
        )
    }
}

module.exports = MatriculasServices