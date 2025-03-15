const fs = require("fs");
const { execSync } = require("child_process");

const extensionsFile = ".vscode/extensions.json";

if (fs.existsSync(extensionsFile)) {
  const extensions =
    JSON.parse(fs.readFileSync(extensionsFile, "utf8")).recommendations || [];

  console.log("📦 Instalando extensões recomendadas do VS Code...");

  extensions.forEach((ext) => {
    console.log(`🔹 Instalando: ${ext}`);
    execSync(`code --install-extension ${ext}`, { stdio: "inherit" });
  });

  console.log("✅ Extensões instaladas com sucesso!");
} else {
  console.log("⚠ Nenhum arquivo extensions.json encontrado.");
}
