const Sequilize = require('sequelize');
const dbConfig = require('../config/database');
 
const connection = new Sequilize(dbConfig);
module.exports = connection;