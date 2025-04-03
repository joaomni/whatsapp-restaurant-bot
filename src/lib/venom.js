import venom from 'venom-bot'

let client
let qrCodeBase64

export const initializeWhatsAppBot = async () => {
	return new Promise((resolve, reject) => {
		venom
			.create(
				'whatsapp_session',
				(base64Qrimg, asciiQR, attempts, urlCode) => {
					console.log('📌 QR Code gerado! Escaneie para conectar.')
					console.log('Terminal qrcode: ', asciiQR)
					qrCodeBase64 = base64Qrimg
				},
				(statusSession, session) => {
					console.log('Status da sessão:', statusSession)
					console.log('Nome da sessão:', session)
					if (statusSession === 'isLogged') {
						qrCodeBase64 = null // Remove o QR Code após login
					}
				},
				{
					multidevice: true,
					headless: false,
					logQR: false,
					autoClose: 0, // Nunca fecha automaticamente
				}
			)
			.then((bot) => {
				client = bot
				start(client)

				resolve(client)
			})
			.catch((error) => {
				console.error('❌ Erro ao conectar:', error)
				restartBot()
			})
	})
}

// 🔄 Função para reiniciar o bot caso ele caia
const restartBot = async () => {
	console.log('🔁 Reiniciando o bot...')
	setTimeout(() => initializeWhatsAppBot(), 1000) // Espera 5 segundos antes de reiniciar
}

// 🟢 Função principal para capturar mensagens
async function start(client) {
	client.onMessage(async (message) => {
		try {
			const text = message.body.toLowerCase()
			const greetings = ['bom dia', 'boa tarde', 'boa noite']

			if (greetings.some((greeting) => text.includes(greeting))) {
				await client.sendText(message.from, 'Olá! Vou te enviar um menu...')
			}
		} catch (error) {
			console.error('⚠️ Erro ao processar mensagem:', error)
		}
	})

	client.onStateChange((state) => {
		console.log('🔄 Estado do bot:', state)
		if (state === 'CONFLICT' || state === 'UNPAIRED' || state === 'UNLAUNCHED') {
			restartBot() // Reinicia o bot automaticamente se cair
		}
	})
}

export const getClient = () => {
	if (!client) {
		throw new Error('Bot não está inicializado!')
	}
	return client
}

export const getQrCode = () => qrCodeBase64
