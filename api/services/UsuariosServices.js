const Services = require('./Services')
const database = require('../models')
const bcrypt = require('bcrypt')
const validacoes = require('../validacoes')

class UsuariosServices extends Services{
    constructor(){
        super('Usuarios')
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