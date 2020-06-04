
const { Model, DataTypes } = require('sequelize');

class Telefone extends Model {
  static init(sequelize) {
    super.init({
      ddd: DataTypes.INTEGER,
      numero: DataTypes.INTEGER,
    }, {
      sequelize,
    })
  }

  static associate(models) {
    this.belongsTo(models.Cliente, { foreignKey: 'cliente_id', as: 'cliente' });
    this.belongsTo(models.Fornecedor, { foreignKey: 'fornecedor_id', as: 'fornecedor' });
  }
}

module.exports = Telefone;