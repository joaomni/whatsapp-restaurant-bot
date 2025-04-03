export function keepAlive() {
  setInterval(() => {
    console.log("♻️ Keep-alive: Bot está ativo...");
  }, 5 * 60 * 1000); // Mantém o processo rodando a cada 5 minutos
}
