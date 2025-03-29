const dotenv = await import("dotenv");
dotenv.config();
import express from "express"
import venom from "venom-bot"

import app = express();
app.use(express.json());

let client;

venom
  .create({
    session: "whatsapp_session",
    multidevice: true,
  })
  .then(async (client) => {
    console.log("✅ Cliente conectado!");

    // Gera o QR Code quando necessário
    client.on("qr", async (qr) => {
      console.log("📌 QR Code gerado! Escaneie para conectar.");

      // Exibir no console
      console.log(qr);

      // Gerar QR Code como imagem no terminal
      const qrImage = await qrcode.toString(qr, { type: "terminal" });
      console.log(qrImage);

      // Gerar QR Code como link e enviar na resposta
      const qrDataUrl = await qrcode.toDataURL(qr);
      res.json({ qrCode: qrDataUrl });
    });
  })
  .catch((error) => {
    console.error("❌ Erro ao conectar:", error);
    res.status(500).json({ error: "Erro ao gerar QR Code" });
  });

app.post("/api/whatsapp/send", async (req, res) => {
  const { number, message } = req.body;
  if (!client) return res.status(500).send("Bot não iniciado!");

  try {
    await client.sendText(number + "@c.us", message);
    res.send("Mensagem enviada!");
  } catch (error) {
    console.log("Não foi possível enviar a mensagem:", error);
    res
      .status(500)
      .send({
        message: "Não foi possível enviar a mensagem",
        error: error.message,
      });
  }
});

app.listen(3001, () =>
  console.log("API do WhatsApp Bot rodando na porta 3001")
);
