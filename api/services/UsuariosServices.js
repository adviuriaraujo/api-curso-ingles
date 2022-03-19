const Services = require('./Services')
const database = require('../models')
const bcrypt = require('bcrypt')
const validacoes = require('../validacoes')
const { NaoEncontrado } = require('../erros')

class UsuariosServices extends Services{
    constructor(){
        super('Usuarios')
    }

    async pegaTodosOsRegistros(){
        return database[this.nomeDoModelo].findAll(
            { attributes: ['id', 'nome', 'email', 'createdAt', 'updatedAt'] }
        )
    }

    async pegaUmRegistro(id){
        const retorno = await database[this.nomeDoModelo].findOne(
            { where: { id: id } , attributes: ['id', 'nome', 'email', 'createdAt', 'updatedAt'] }
        )
        if (!retorno) throw new NaoEncontrado(id)
        return retorno
    }

    async gerarSenhaHash(senha){
        validacoes.campoStringNaoNulo(senha, 'senha')
        validacoes.campoTamanhoMinimo(senha, 'senha', 8)
        validacoes.campoTamanhoMaximo(senha, 'senha', 64)
        const custoHash = 12
        return bcrypt.hash(senha, custoHash)
    }

}
module.exports = UsuariosServices