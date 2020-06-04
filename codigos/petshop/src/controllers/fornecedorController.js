const Endereco = require("../models/Endereco");
const Telefone = require("../models/Telefone");
const Cliente = require("../models/Cliente");
const Fornecedor = require("../models/Fornecedor");

const view = 'pages/fornecedor'

exports.get = async (req, res) => {
  const fornecedores = await Fornecedor.findAll();

  res.render(`${view}/list`, {
    fornecedores: fornecedores,
  });
};

exports.new = (req, res) => {
  res.render(`${view}/form`, {
    fornecedor: { endereco: {}, telefones: [] },
  });
};

exports.save = async (req, res) => {
  let { id, nome, nomeFantasia, cnpj, email } = req.body;
  let { telefone, celular, telefoneId, celularId } = req.body;
  let { cep, rua, numero, bairro, cidade, estado, enderecoId } = req.body;

  if (id) {
    await Fornecedor.update({ nome, nomeFantasia, cnpj, email }, { where: { id } });

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
    const fornecedor = await Fornecedor.create({ nome, nomeFantasia, cnpj, email });

    await Telefone.create({ ddd: 44, numero: telefone, fornecedor_id: fornecedor.id });
    await Telefone.create({ ddd: 44, numero: celular, fornecedor_id: fornecedor.id });
    await Endereco.create({
      cep,
      rua,
      numero,
      bairro,
      cidade,
      estado,
      fornecedor_id: fornecedor.id,
    });
  }

  res.redirect('/fornecedor');
};

exports.edit = async (req, res) => {
  let id = req.params.id;
  const fornecedor = await Fornecedor.findByPk(id, {
    include: [{ all: true }],
  });

  res.render(`${view}/form`, {
    fornecedor: fornecedor,
  });
};

exports.delete = async (req, res) => {
  let id = req.params.id;
  const fornecedor = await Fornecedor.findByPk(id);
  fornecedor.destroy();

  res.redirect("/fornecedor");
};
