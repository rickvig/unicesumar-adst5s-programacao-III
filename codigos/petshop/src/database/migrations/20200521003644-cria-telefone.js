'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('telefones', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      ddd: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      numero: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      cliente_id: {
        type: Sequelize.INTEGER,
        references: { model: 'clientes', key: 'id' },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      fornecedor_id: {
        type: Sequelize.INTEGER,
        references: { model: 'fornecedors', key: 'id' },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },  
    });
  },

  down: (queryInterface, Sequelize) => {
  }
};
