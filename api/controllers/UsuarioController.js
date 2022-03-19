const { UsuariosServices } = require('../services')
const usuariosServices = new UsuariosServices




class UsuarioController{
    static async criaUsuario(req, res, next) {
        try {
            const { nome, email, senha } = req.body
            const senhaHash = await usuariosServices.gerarSenhaHash(senha)
            const dados = {
                nome: nome,
                email: email,
                senhaHash: senhaHash
            }
            const novoUsuarioCriado = await usuariosServices.criaRegistro(dados)
            res.status(201).json(novoUsuarioCriado)
        } catch (error) {
            next(error)
        }


    }

    

    
}
module.exports = UsuarioController