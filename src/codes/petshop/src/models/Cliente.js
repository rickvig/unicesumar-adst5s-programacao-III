
const { Model, DataTypes } = require('sequelize');
const connection = require('../database')

class Cliente extends Model {
  static init(sequelize) {
    super.init({
      nome: DataTypes.STRING,
      sobrenome: DataTypes.STRING,
      email: DataTypes.STRING,
    }, {
      sequelize,
    })
  }
}

Cliente.init(connection);
module.exports = Cliente;