const database = require('../models')
const {NaoEncontrado} = require('../erros')

class Services {
    constructor(nomeDoModelo){
        this.nomeDoModelo = nomeDoModelo
    }

    async pegaTodosOsRegistros(where = {}) {
        return database[this.nomeDoModelo].findAll(
            { where: {...where} }
        )
    }

    async pegaUmRegistro(id) {
        const retorno = await database[this.nomeDoModelo].findOne(
            { where: { id: id} }
        )
        if (!retorno) throw new NaoEncontrado(id)
        return retorno
    }

    async criaRegistro(dados) {
        return database[this.nomeDoModelo].create(dados)
    }

    //Se não tiver transação, passa vazio e não faz nada. Se tiver, passa a transação
    async atualizaRegistro(dadosAtualizados, id, transacao = {}) {
        const verificaRegistro = await database[this.nomeDoModelo].findAndCountAll(
            { where: { id: id }}
        )
        if(verificaRegistro.count == 0) throw new NaoEncontrado(id)
        const atualizado = database[this.nomeDoModelo].update(
            dadosAtualizados,
            { where: { id: id } },
            { transaction: transacao }
        )
        return atualizado
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
        const verificaRegistro = await database[this.nomeDoModelo].findAndCountAll(
            { where: { id: id }}
        )
        if(verificaRegistro.count == 0) throw new NaoEncontrado(id)
        const apagado = database[this.nomeDoModelo].destroy(
            { where: { id: id } }
        )
        return apagado
    }

    async restauraRegistro(id) {
        const verificaRegistro = await database[this.nomeDoModelo].findAndCountAll(
            { where: { id: id }}
        )
        if(verificaRegistro.count == 0) throw new NaoEncontrado(id)
        const restaurado = database[this.nomeDoModelo].restore(
            { where: { id: id } }
        )
        return restaurado
    }

    async pegaUmRegistroDeletado(id) {
        return database[this.nomeDoModelo].findOne(
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