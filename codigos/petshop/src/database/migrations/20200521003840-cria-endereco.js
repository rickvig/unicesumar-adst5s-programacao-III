"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("enderecos", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      cep: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      rua: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      numero: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      bairro: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cidade: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cliente_id: {
        type: Sequelize.INTEGER,
        references: { model: "clientes", key: "id" },
        onUpdate: "cascade",
        onDelete: "cascade",
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
  },
};
