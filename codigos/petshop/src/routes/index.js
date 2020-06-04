const express = require("express");

const Cliente = require("../models/Cliente");
const Fornecedor = require("../models/Fornecedor");

const router = express.Router();

router.get("/", async (req, res) => {
  const clientes = await Cliente.findAll();
  const fornecedores = await Fornecedor.findAll();

  res.render("pages/home", {
    totalClientes: clientes.length,
    totalFornecedores: fornecedores.length
  });
});

router.get("/sobre", (req, res) => {
  res.render("pages/sobre", {
    sobre: {
      numerosDePetsAtendidos: 15,
    },
  });
});

router.get("/contato", (req, res) => {
  res.render("pages/contato", {
    contato: {
      email: "ricuev@gmail.com",
      tel: "(44) 99941-0923",
      end: "Av. São Paulo 3103 apto 85",
    },
  });
});

module.exports = router;