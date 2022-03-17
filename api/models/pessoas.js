'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pessoas.hasMany(models.Turmas, { foreignKey: 'docente_id' })
      Pessoas.hasMany(models.Matriculas, { 
        foreignKey: 'estudante_id',
        scope: { status: 'confirmado' },
        as: 'aulasMatriculadas'//nome da associação
      })
    }
  }
  Pessoas.init({
    nome: {
      type: DataTypes.STRING,
      validate: {
        validar: function(dado){
          if(dado.length <= 2) throw new Error('O campo nome deve ter 2 ou mais caracteres')
        }
      }
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      validate: {
        validar: function(dado){
          if(typeof dado !== 'boolean') throw new Error('O campo ativo deve ser true ou false')
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'e-mail inválido'//mensagem de erro
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        validar: function(dado){
          if(dado.length < 2) throw new Error('O campo role deve ter 2 ou mais caracteres')
        }
      }
    }
  }, {
    sequelize,
    paranoid: true,
    defaultScope: {
      where: {
        ativo: true
      }
    },
    scopes:{
      todos: {
        where: {}
      }
    },
    modelName: 'Pessoas',
  });
  return Pessoas;
};