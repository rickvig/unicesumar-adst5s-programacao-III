const express = require("express");
const routes = express.Router();

const Cliente = require("./models/Cliente");

routes.get("/", async (req, res) => {
  const henrique = await Cliente.create({
    nome: "Henrique",
    sobrenome: "DA SILVA SAURO",
    email: "rickuev@gmail.com",
  });

  res.render("pages/home", {cliente: henrique});
});

module.exports = routes;
