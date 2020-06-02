
const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../database')

class Fornecedor extends Model {
  static init(sequelize) {
    super.init({
      nome: DataTypes.STRING,
      nomeFantasia: DataTypes.STRING,
      email: DataTypes.STRING,
      cnpj: DataTypes.STRING,
    }, {
      sequelize,
    })
  }
}

// Fornecedor.init(sequelize);
module.exports = Fornecedor;