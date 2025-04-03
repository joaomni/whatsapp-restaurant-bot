import app from "./app.js";
import { initializeWhatsAppBot } from "./lib/venom.js";

const PORT = process.env.PORT || 3000;

// Inicia o servidor imediatamente
app.listen(PORT, () => {
  console.log(`🚀 API rodando na porta ${PORT}`);
});

// Inicializa o WhatsApp Bot de forma independente
initializeWhatsAppBot()
  .then(() => console.log("✅🤖 Bot do WhatsApp conectado com sucesso!"))
  .catch((error) => console.error("⚠️ Falha ao iniciar o bot:", error));