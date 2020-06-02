const express = require("express");

const Endereco = require("./models/Endereco");
const Telefone = require("./models/Telefone");
const Cliente = require("./models/Cliente");
const Fornecedor = require("./models/Fornecedor");

const routes = express.Router();

routes.get("/", async (req, res) => {
  const clientes = await Cliente.findAll();
  const fornecedores = await Fornecedor.findAll();

  res.render("pages/home", {
    totalClientes: clientes.length,
    totalFornecedores: fornecedores.length
  });
});

routes.get("/cliente", async (req, res) => {
  const clientes = await Cliente.findAll();
  
  res.render("pages/cliente/list", {
    clientes: clientes,
  });
});

routes.get("/cliente/new", (req, res) => {
  res.render("pages/cliente/form", {
    cliente: { endereco: {}, telefones: [] }
  });
});

routes.post("/cliente/save", async (req, res) => {
  let { id, nome, sobrenome, email } = req.body;
  let { telefone, celular, telefoneId, celularId } = req.body;
  let { cep, rua, numero, bairro, cidade, estado, enderecoId } = req.body;
  
  console.log('tel:', telefone, celular)
  console.log(telefone, cidade);

  if (id) {
    
    await Cliente.update(
      { nome, sobrenome, email },
      { where: { id } },
    );

    await Telefone.update(
      { ddd: 44, numero: telefone },
      { where: { id: telefoneId } },
    );

    await Telefone.update(
      { ddd: 44, numero: celular },
      { where: { id: celularId } },
    );

    await Endereco.update(
      { cep, rua, numero, bairro, cidade, estado },
      { where: { id: enderecoId } },
    );

  } else {
    const cliente = await Cliente.create({ nome, sobrenome, email });

    await Telefone.create({ ddd: 44, numero: telefone, cliente: cliente.id });
    await Telefone.create({ ddd: 44, numero: celular, cliente_id: cliente.id });
    await Endereco.create({ cep, rua, numero, bairro, cidade, estado, cliente_id: cliente.id });
  }
  
  res.redirect("/cliente");
});

routes.get("/cliente/edit/:id", async (req, res) => {
  let id = req.params.id;
  const cliente = await Cliente.findByPk(id, {
    include: [{all: true}]
  });

  console.log(cliente); 
  
  res.render("pages/cliente/form", {
    cliente: cliente
  });
});

routes.get("/cliente/delete/:id", async (req, res) => {
  let id = req.params.id;
  const cliente = await Cliente.findByPk(id);
  cliente.destroy();

  res.redirect("/cliente");
});



routes.get("/fornecedor", async (req, res) => {
  const fornecedores = await Fornecedor.findAll();
  console.log(fornecedores);
  res.render("pages/fornecedor/list", {
    fornecedores: fornecedores,
  });
});

routes.get("/fornecedor/form", (req, res) => {
  res.render("pages/fornecedor-form");
});

routes.post("/fornecedor/add", async (req, res) => {
  let { nome, nomeFantasia, email, cnpj } = req.body;
  await Fornecedor.create({ nome, nomeFantasia, email, cnpj });
  res.redirect("/fornecedor");
});



routes.get("/sobre", (req, res) => {
  res.render("pages/sobre", {
    sobre: {
      numerosDePetsAtendidos: 15,
    },
  });
});

routes.get("/contato", (req, res) => {
  res.render("pages/contato", {
    contato: {
      email: "ricuev@gmail.com",
      tel: "(44) 99941-0923",
      end: "Av. São Paulo 3103 apto 85",
    },
  });
});

module.exports = routes;
