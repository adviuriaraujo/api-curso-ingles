const database = require('../models')

class Services {
    constructor(nomeDoModelo){
        this.nomeDoModelo = nomeDoModelo
    }

    async pegaTodosOsRegistros(where = {}) {
        return database[this.nomeDoModelo].findAll(
            { where: {...where} }
        )
    }

    async pegaUmRegistro(where = {}) {
        return database[this.nomeDoModelo].findOne(
            { where: { ...where} }
        )
    }

    async criaRegistro(dados) {
        return database[this.nomeDoModelo].create(dados)
    }

    //Se não tiver transação, passa vazio e não faz nada. Se tiver, passa a transação
    async atualizaRegistro(dadosAtualizados, id, transacao = {}) {
        return database[this.nomeDoModelo].update(
            dadosAtualizados,
            { where: { id: id } },
            { transaction: transacao }
        )
    }

    //Recebe o where como parâmetro, assim dá pra passar um número dinâmico de condições
    async atualizaRegistros(dadosAtualizados, where, transacao = {}) {
        return database[this.nomeDoModelo].update(
            dadosAtualizados,
            { where: { ...where } },
            { transaction: transacao }
        )
    }

    async apagaRegistro(id) {
        return database[this.nomeDoModelo].destroy(
            { where: { id: id } }
        )
    }

    async restauraRegistro(id) {
        return database[this.nomeDoModelo].restore(
            { where: { id: id } }
        )
    }

    async pegaUmRegistroDeletado(id) {
        return databa7[this.nomeDoModelo].findOne(
            { where: { id: id } }, { paranoid: false }
        )
    }

    async encontraEContaRegistros(where = {}, agregadores) {
        return database[this.nomeDoModelo].findAndCountAll(
            { where: { ...where }, ...agregadores }
        )
    }


}

module.exports = Services