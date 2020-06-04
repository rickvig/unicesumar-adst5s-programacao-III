
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

  static associate(models) {
    this.hasOne(models.Endereco, { foreignKey: 'cliente_id', as: 'endereco' });
    this.hasMany(models.Telefone, { foreignKey: 'cliente_id', as: 'telefones' });
  }
}

// Fornecedor.init(sequelize);
module.exports = Fornecedor;