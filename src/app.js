// Este arquivo configura o site
// para conseguir usar arquivos
// ejs ao invés de html, para
// conseguir argumentos através do
// url e faz ele rodar de forma
// otimizada quando é ambiente de
// produção

const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

const express = require("express");
const app = express();

const compression = require("compression");

// Verifica se estamos em produção e carrega o arquivo correto
const isProduction = process.env.NODE_ENV === "production";
const envFile = isProduction
  ? ".env.production.local"
  : ".env.development.local";

// Detecta se o arquivo de produção ou desenvolvimento existe
if (fs.existsSync(envFile)) dotenv.config({ path: envFile });

let environmentMsg = "🔧 Rodando no modo de desenvolvimento!";

// Aplica as otimizações se for ambiente de produção
if (isProduction) {
  app.use(compression()); // Ativa a compressão de respostas
  app.use(express.static("public", { maxAge: "1y" })); // Serve arquivos estáticos com cache até 1 ano
  environmentMsg = "🚀 Rodando no modo de produção!";
}
console.log(environmentMsg);

app.use(express.json()); // Permite o site receber JSON no corpo da requisição
app.use(express.urlencoded({ extended: false })); // Permite o site receber dado de formulário

// Configurar EJS como engine de visualização
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Os arquivos ejs se encontram em "views"

// Servir arquivos estáticos(js, css, imagens, etc) da pasta 'public'
// para os arquivos ejs
app.use(express.static(path.join(__dirname, "public")));

// Importar e usar as rotas
const routes = require("./routes/routes");
app.use("/", routes);

// Ao tentar acessar uma rota inexistente retorna um erro
app.all("*", (req, res) => {
  if (req.xhr || (req.accepts("json") && !req.accepts("html")))
    return res.status(404).json({ erro: "A que ponto chegamos?" });

  res.status(404).render("404", { title: "404 - Página não encontrada" });
});

module.exports = app;
