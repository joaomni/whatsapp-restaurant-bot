import { getQrCode } from '../lib/venom.js'
import { sendMessage } from '../utils/sendMessage.js'

class ResponseController {
	async sendMessage(req, res) {
		const { number, message } = req.body

		if (!number || !message) {
			return res.status(400).json({ error: 'Número e mensagem são obrigatórios.' })
		}

		try {
			const response = await sendMessage(number, message)
			res.status(200).json(response)
		} catch (error) {
			console.error(`[Erro Venom Bot] Falha ao enviar mensagem para ${number}:`, error)
			res.status(500).json({ status: error.status, error: 'Não foi possivel enviar a mensagem!' })
		}
	}

	async showQrcode(req, res) {
		const qrCodeBase64 = getQrCode()
		
		if (!qrCodeBase64) {
			return res.send('QR Code ainda não foi gerado. Aguarde...')
		}

		// Retorna o QR Code como imagem na página
		res.send(`
			<html>
				<body style="text-align:center;">
					<h2>Escaneie o QR Code para conectar</h2>
					<img src="${qrCodeBase64}" width="400" height="400" alt="QR Code do WhatsApp" />
				</body>
			</html>
		`)
	}
}

export default new ResponseController()
