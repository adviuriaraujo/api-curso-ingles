const { TurmasServices } = require('../services')
const turmasServices = new TurmasServices
const { DadoInvalido } = require('../erros')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class TurmaController {

  static async pegaTodasAsTurmas(req, res, next){
    const { data_inicial, data_final } = req.query
    const where = {}
    data_inicial || data_final ? where.data_inicio = {} : null
    data_inicial ? where.data_inicio[Op.gte] = data_inicial : null
    data_final ? where.data_inicio[Op.lte] = data_final : null
    try {
      const todasAsTurmas = await turmasServices.pegaTodosOsRegistros(where)
      return res.status(200).json(todasAsTurmas)  
    } catch (error) {
      next(error)
    }
  }

  static async pegaUmaTurma(req, res, next) {
    const { id } = req.params
    try {
      const umaTurma = await turmasServices.pegaUmRegistro(Number(id))
      return res.status(200).json(umaTurma)
    } catch (error) {
      next(error)
    }
  }

  static async criaTurma(req, res, next) {
    const novaTurma = req.body
    try {
      const novaTurmaCriada = await turmasServices.criaRegistro(novaTurma)
      return res.status(200).json(novaTurmaCriada)
    } catch (error) {
        if(error.name == 'SequelizeValidationError'){
          const erro =  new DadoInvalido(error.errors[0].message)
          next(erro)  
        }
        if (error.name == 'SequelizeForeignKeyConstraintError'){
            let erro 
            if(error.fields[0] == 'nivel_id') erro = new DadoInvalido('Nivel inexistente!')
            if(error.fields[0] == 'docente_id') erro = new DadoInvalido('Docente inexistente!')
            next(erro)
        }
        next(error)
    }
  }

  static async atualizaTurma(req, res, next) {
    const { id } = req.params
    const dadosAtualizados = req.body
    try {
      await turmasServices.atualizaRegistro(dadosAtualizados ,Number(id))
      const turmaAtualizada = await turmasServices.pegaUmRegistro(Number(id))
      return res.status(200).json(turmaAtualizada)
    } catch (error) {
        if(error.hasOwnProperty('errors')){
          const erro =  new DadoInvalido(error.errors[0].message)
          next(erro)  
        } else {
          if(error.name == 'SequelizeValidationError'){
            const erro =  new DadoInvalido(error.errors[0].message)
            next(erro)  
          }
          if (error.name == 'SequelizeForeignKeyConstraintError'){
              let erro 
              if(error.fields[0] == 'nivel_id') erro = new DadoInvalido('Nivel inexistente!')
              if(error.fields[0] == 'docente_id') erro = new DadoInvalido('Docente inexistente!')
              next(erro)
          }
          next(error)
        } 
    }
  }

  static async apagaTurma(req, res, next) {
    const { id } = req.params
    try {
      await turmasServices.apagaRegistro(Number(id))
      return res.status(200).json({ mensagem: `Registro de id ${id} deletado` })

    } catch (error) {
      next(error)
    }
  }

  static async restauraTurma(req, res, next) {
    const { id } = req.params
    try {
        await turmasServices.restauraRegistro(Number(id))
        res.status(200).json({ mensagem: `Registro id ${id} restaurado` })
    } catch (error) {
        next(error) 
    }
}

}

module.exports = TurmaController