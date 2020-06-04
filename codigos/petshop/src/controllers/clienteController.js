const Endereco = require("../models/Endereco");
const Telefone = require("../models/Telefone");
const Cliente = require("../models/Cliente");

exports.get = async (req, res) => {
  const clientes = await Cliente.findAll();

  res.render("pages/cliente/list", {
    clientes: clientes,
  });
};

exports.new = (req, res) => {
  res.render("pages/cliente/form", {
    cliente: { endereco: {}, telefones: [] },
  });
};

exports.save = async (req, res) => {
  let { id, nome, sobrenome, email } = req.body;
  let { telefone, celular, telefoneId, celularId } = req.body;
  let { cep, rua, numero, bairro, cidade, estado, enderecoId } = req.body;

  if (id) {
    await Cliente.update({ nome, sobrenome, email }, { where: { id } });

    await Telefone.update(
      { ddd: 44, numero: telefone },
      { where: { id: telefoneId } }
    );

    await Telefone.update(
      { ddd: 44, numero: celular },
      { where: { id: celularId } }
    );

    await Endereco.update(
      { cep, rua, numero, bairro, cidade, estado },
      { where: { id: enderecoId } }
    );
  } else {
    const cliente = await Cliente.create({ nome, sobrenome, email });

    await Telefone.create({ ddd: 44, numero: telefone, cliente: cliente.id });
    await Telefone.create({ ddd: 44, numero: celular, cliente_id: cliente.id });
    await Endereco.create({
      cep,
      rua,
      numero,
      bairro,
      cidade,
      estado,
      cliente_id: cliente.id,
    });
  }

  res.redirect("/cliente");
};

exports.edit = async (req, res) => {
  let id = req.params.id;
  const cliente = await Cliente.findByPk(id, {
    include: [{ all: true }],
  });

  res.render("pages/cliente/form", {
    cliente: cliente,
  });
};

exports.delete = async (req, res) => {
  let id = req.params.id;
  const cliente = await Cliente.findByPk(id);
  cliente.destroy();

  res.redirect("/cliente");
};
