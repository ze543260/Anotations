const { exec } = require("child_process");
const { promisify } = require("util");

const execAsync = promisify(exec);

async function checkDependencies() {
  console.log("🔍 Verificando dependências...");

  try {
    // Check Node.js version
    const { stdout: nodeVersion } = await execAsync("node --version");
    console.log(`✅ Node.js: ${nodeVersion.trim()}`);

    // Check npm version
    const { stdout: npmVersion } = await execAsync("npm --version");
    console.log(`✅ npm: ${npmVersion.trim()}`);

    console.log("\n🎯 Próximos passos:");
    console.log("1. Configure a GEMINI_API_KEY no backend/.env");
    console.log("2. Execute: cd backend && npm install && npm run dev");
    console.log("3. Execute: cd desktop && npm install && npm run dev");
    console.log("4. Execute: cd mobile && npm install && npm start");
  } catch (error) {
    console.error("❌ Erro ao verificar dependências:", error.message);
  }
}

checkDependencies();
