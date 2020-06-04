
const { Model, DataTypes } = require('sequelize');

class Endereco extends Model {
  static init(sequelize) {
    super.init({
      cep: DataTypes.STRING,
      rua: DataTypes.STRING,
      numero: DataTypes.INTEGER,
      bairro: DataTypes.STRING,
      cidade: DataTypes.STRING,
      estado: DataTypes.STRING,
    }, {
      sequelize,
    })
  }

  static associate(models) {
    this.belongsTo(models.Cliente, { foreignKey: 'cliente_id', as: 'cliente' });
    this.belongsTo(models.Fornecedor, { foreignKey: 'fornecedor_id', as: 'fornecedor' });
  }
}

module.exports = Endereco;