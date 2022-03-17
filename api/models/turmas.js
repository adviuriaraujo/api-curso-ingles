'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Turmas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Turmas.hasMany(models.Matriculas, { foreignKey: 'turma_id' })
      Turmas.belongsTo(models.Pessoas, { foreignKey: 'docente_id' })
      Turmas.belongsTo(models.Niveis, { foreignKey: 'nivel_id' })
    }
  }
  Turmas.init({
    data_inicio: {
      type: DataTypes.DATEONLY,
      validate: {
        isAfter: {
          args: '2010-01-20',
          msg: 'A data deve ser posterior a 20 de janeiro de 2010'
        }
      }
    }
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Turmas',
  });
  return Turmas;
};