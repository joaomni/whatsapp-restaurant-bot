import { getClient } from '../lib/venom.js'

export const sendMessage = async (number, message) => {
	const client = getClient()

	try {
		await client.sendText(`55${number}@c.us`, message)

		return 'Mensagem enviada!'
	} catch (error) {
		console.error(`[Erro Venom Bot] Falha ao enviar mensagem para ${number}:`, error)
		throw error
	}
}
