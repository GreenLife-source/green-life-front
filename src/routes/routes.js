// Este arquivo define as rotas
// tipo google.com/perfil ou
// google.com/pesquisa, e
// também permite a comunicação
// com o backend através de rotas

const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

const nomeDoSite = "GreenLife";
const argumentos = { title: nomeDoSite, environment: process.env.NODE_ENV };

// Definindo o meusite.com/
router.get("/", (req, res) => {
  // Passando dados para o site e exibindo o arquivo index.ejs
  res.render("index", argumentos);
});

// Definindo o meusite.com/sobre
router.get("/sobre", (req, res) => {
  res.render("sobre", argumentos);
});

// Definindo como você vai acessar a API(Backend)
router.get("/dados-api/:tipo", async (req, res) => {
  const tipo = req.params.tipo;

  try {
    // Esse exemplo seria usavel no mundo real
    // const resposta = await axios.get(`meubackend.com/${tipo}`)

    const link =
      tipo === "users"
        ? process.env.BACK_END_LINK_1
        : process.env.BACK_END_LINK_2;

    const resposta = await axios.get(link);
    res.json(resposta.data); // Retorna os dados da API como JSON
  } catch (erro) {
    res.status(500).json({ erro: `Erro ao acessar a API ${tipo}` });
  }
});

module.exports = router;
