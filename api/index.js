const express = require('express')
const { NaoEncontrado, DadoInvalido } = require('./erros')
const routes = require('./routes')
const app = express()

const port = 3000

app.use((req, res, next) => {
    let formatoRequisitado = req.header('Accept')
    if (formatoRequisitado === '*/*') formatoRequisitado = 'application/json'
    if (formatoRequisitado !== 'application/json') return res.status(406).end()
    res.setHeader('Content-Type', 'application/json') 
    next()   
})

app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*')
    next()
})

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