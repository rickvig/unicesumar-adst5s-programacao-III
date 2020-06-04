const Sequilize = require('sequelize');
const dbConfig = require('../config/database');

const Cliente = require("../models/Cliente");
const Fornecedor = require("../models/Fornecedor");
const Endereco = require("../models/Endereco");
const Telefone = require("../models/Telefone");

const connection = new Sequilize(dbConfig);

Cliente.init(connection);
Fornecedor.init(connection);
Endereco.init(connection);
Telefone.init(connection);

Cliente.associate(connection.models);
Fornecedor.associate(connection.models);
Endereco.associate(connection.models);
Telefone.associate(connection.models);

module.exports = connection;