class NaoEncontrado extends Error{
    constructor(id) {
        super(`O resgitro de id ${id} não foi encontrado`)
        this.name = 'NaoEncontrado'
        this.idErro = 0
    }
}

module.exports = NaoEncontrado