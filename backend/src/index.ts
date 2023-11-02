import express from 'express'
import cors from 'cors'
import primeRouter from './routes/prime'

export const DEV_PORT = 4000
export const DEV_CLIENT_URL = 'http://localhost:3000'

const app = express()
app.use(express.json())

app.use(
	cors({
		origin: DEV_CLIENT_URL,
	})
)

// Routes
app.use('/prime', primeRouter)

// Start Server
const server = app.listen(DEV_PORT, () => {
	console.log(`Express server has started on port ${DEV_PORT}.`)
})

export { app, server }
