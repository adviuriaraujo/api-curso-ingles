'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Niveis extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Niveis.hasMany(models.Turmas, { foreignKey: 'nivel_id' })
    }
  }
  Niveis.init({
    descr_nivel: {
      type: DataTypes.STRING,
      validate: {
        validar: function(dado){
          if(dado.length < 2) throw new Error('O campo descr_nivel deve ter mais de dois caracteres')
        }
      }
    }
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Niveis',
  });
  return Niveis;
};