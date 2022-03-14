const Services = require('./Services')
const database = require('../models')

class MatriculasServices extends Services {
    constructor(){
        super('Matriculas')
    }
    async atualizaRegistro(dadosAtualizados, where, transacao = {}) {
        return database[this.nomeDoModelo].update(
            dadosAtualizados,
            { where: { ...where } },
            { transaction: transacao }
        )
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