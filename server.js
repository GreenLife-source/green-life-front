// Este arquivo pega o site já
// configurado e executa ele

const dotenv = require("dotenv");
const fs = require("fs");

const app = require("./src/app");

// Verifica se estamos em produção e carrega o arquivo correto
const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production.local"
    : ".env.development.local";
if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
}

// Executando o site
app.listen(process.env.PORT);
