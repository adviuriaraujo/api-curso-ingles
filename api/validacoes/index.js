const { DadoInvalido } = require('../erros')

module.exports = {
    campoStringNaoNulo: (valor, nome) => {
        if (typeof valor !== 'string' || valor === 0)
          throw new DadoInvalido(`É necessário preencher o campo ${nome}!`);
    },
    
    campoTamanhoMinimo: (valor, nome, minimo) => {
        if (valor.length < minimo)
          throw new DadoInvalido(`O campo ${nome} precisa ser maior que ${minimo} caracteres!`);
    },
    
    campoTamanhoMaximo: (valor, nome, maximo) => {
        if (valor.length > maximo)
          throw new DadoInvalido(`O campo ${nome} precisa ser menor que ${maximo} caracteres!`);
    }
}