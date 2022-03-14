const { TurmasServices } = require('../services')
const turmasServices = new TurmasServices
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class TurmaController {

  static async pegaTodasAsTurmas(req, res){
    const { data_inicial, data_final } = req.query
    const where = {}
    data_inicial || data_final ? where.data_inicio = {} : null
    data_inicial ? where.data_inicio[Op.gte] = data_inicial : null
    data_final ? where.data_inicio[Op.lte] = data_final : null
    try {
      const todasAsTurmas = await turmasServices.pegaTodosOsRegistros(where)
      return res.status(200).json(todasAsTurmas)  
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async pegaUmaTurma(req, res) {
    const { id } = req.params
    try {
      const umaTurma = await turmasServices.pegaUmRegistro(Number(id))
      return res.status(200).json(umaTurma)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async criaTurma(req, res) {
    const novaTurma = req.body
    try {
      const novaTurmaCriada = await turmasServices.criaRegistro(novaTurma)
      return res.status(200).json(novaTurmaCriada)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async atualizaTurma(req, res) {
    const { id } = req.params
    const dadosAtualizados = req.body
    try {
      await turmasServices.atualizaRegistro(dadosAtualizados ,Number(id))
      const turmaAtualizada = await turmasServices.pegaUmRegistro(Number(id))
      return res.status(200).json(turmaAtualizada)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async apagaTurma(req, res) {
    const { id } = req.params
    try {
      await turmasServices.apagaRegistro(Number(id))
      return res.status(200).json({ mensagem: `Registro de id ${id} deletado` })

    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async restauraTurma(req, res) {
    const { id } = req.params
    try {
        await turmasServices.restauraRegistro(Number(id))
        res.status(200).json({ mensagem: `Registro id ${id} restaurado` })
    } catch (error) {
        return res.status(500).json(error.message) 
    }
}

}

module.exports = TurmaController