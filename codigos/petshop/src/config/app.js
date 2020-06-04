const express = require('express');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');


const database = require('../database');

const app = express();

app.set('view engine', 'ejs');

app.use(expressLayouts);
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + '/public'));

const index = require('../routes/index');
const clienteRoute = require('../routes/clienteRoute');
const fornecedorRoute = require('../routes/fornecedorRoute');

app.use('/', index);
app.use('/cliente', clienteRoute);
app.use('/fornecedor', fornecedorRoute);

module.exports = app;