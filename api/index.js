require('dotenv').config()
const express = require('express')
const { NaoEncontrado, DadoInvalido } = require('./erros')
const { contentType, cors } = require('./middlewares')
const routes = require('./routes')
const app = express()

const port = process.env.PORT

app.use(contentType.set)

app.use(cors.origin)

routes(app)

app.use((error, req, res, next) => {
    let status = 500

    if (error instanceof NaoEncontrado) status = 404
    if (error instanceof DadoInvalido) status = 400

    res.status(status)
    .json({ erro: error.name,id: error.idErro, mensagem: error.message })
})

app.listen(port, () => console.log(`Rodando na porta: ${port}`))

module.exports = app