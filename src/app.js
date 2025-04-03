import './config/dotenv.js'
import express from 'express'
import cors from 'cors'
import routes from './routes/index.js'
import { corsOptions } from './config/cors.js'

const app = express()

app.use(cors(corsOptions))
app.use(express.json())
// Rotas
app.use(routes)

export default app
