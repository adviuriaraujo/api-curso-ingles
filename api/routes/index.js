const bodyParser = require('body-parser')
const pessoas = require('./pessoasRoute')
const niveis = require('./niveisRoute')
const turmas = require('./turmasRoute')
const matriculas = require('./matriculasRoute')
const usuarios = require('./usuariosRoute')

module.exports = app => {
    app.use(
        bodyParser.json(),
        usuarios,
        pessoas,
        niveis,
        turmas,
        matriculas
    )
    
}