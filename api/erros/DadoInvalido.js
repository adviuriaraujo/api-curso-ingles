class DadoInvalido extends Error{
    constructor(mensagem){
        super(mensagem)
        this.name = 'Dado Inválido'
        this.idErro = 1
    }
}

module.exports = DadoInvalido