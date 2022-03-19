const { UsuariosServices } = require('../services')
const usuariosServices = new UsuariosServices
const { DadoInvalido } = require('../erros')




class UsuarioController{

    static async opcoes(req, res, next) {
        res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
        res.set('Access-Control-Allow-Headers', 'Content-Type')
        res.status(204)
        res.end()
    }

    static async pegaTodosOsUsuarios(req, res, next) {
        try {
            const todosOsUsuarios = await usuariosServices.pegaTodosOsRegistros()
            res.status(200).json(todosOsUsuarios)
        } catch (error) {
            next(error)
        }
    }

    static async pegaUmUsuario(req, res, next) {
        const { id } = req.params
        try {
            const umUsuario = await usuariosServices.pegaUmRegistro(Number(id))
            res.status(200).json(umUsuario)
        } catch (error) {
            next(error)
        }
    }

    static async criaUsuario(req, res, next) {
        try {
            const { nome, email, senha } = req.body
            const senhaHash = await usuariosServices.gerarSenhaHash(senha)
            const novoUsuario = { nome: nome, email: email, senhaHash: senhaHash }
            const novoUsuarioCriado = await usuariosServices.criaRegistro(novoUsuario)
            res.status(201).json(novoUsuarioCriado)
        } catch (error) {
            if(error.name == 'SequelizeValidationError'){
                const erro =  new DadoInvalido(error.errors[0].message)
                next(erro)
            }
            next(error)
        }  
    }

    static async atualizaUsuario(req, res, next) {
        const { id } = req.params
        const { nome, email, senha } = req.body
        try {            
            const senhaHash = await usuariosServices.gerarSenhaHash(senha)
            const dadosAtualizados = { nome: nome, email: email, senhaHash: senhaHash }
            await usuariosServices.atualizaRegistro(dadosAtualizados,Number(id))
            const usuarioAtualizado = await usuariosServices.pegaUmRegistro(Number(id))
            res.status(200).json(usuarioAtualizado)
        } catch (error) {
            if(error.name == 'SequelizeValidationError'){
                const erro =  new DadoInvalido(error.errors[0].message)
                next(erro)
            }
            next(error)
        }
    }

    static async apagaUsuario(req, res, next) {
        const { id } = req.params
        try {
            await usuariosServices.apagaRegistro(Number(id))
            res.status(200).json({ mensagem: `Registro id ${id} deletado` })
        } catch (error) {
            next(error)
        }
    }

    

    
}
module.exports = UsuarioController