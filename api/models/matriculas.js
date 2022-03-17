'use strict';
const { DadoInvalido } = require('../erros')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Matriculas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Matriculas.belongsTo(models.Pessoas, { foreignKey: 'estudante_id' })
      Matriculas.belongsTo(models.Turmas, { foreignKey: 'turma_id' })
    }
  }
  Matriculas.init({
    status: {
      type: DataTypes.STRING,
      validate: {
        validar: function(dado){
          if(dado !== 'confirmado' && dado !== 'cancelado') throw new Error('O campo status deve ser confirmado ou cancelado')
        }
      }
    }
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Matriculas',
  });
  return Matriculas;
};