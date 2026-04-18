import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import transactionsRouter from './routes/transactions'

const app = new Hono()

app.route('/transactions', transactionsRouter)

serve({
  fetch: app.fetch,
  port: 3000
}, (info: { port: number }) => {
  console.log(`Servidor corriendo en http://localhost:${info.port}`)
})