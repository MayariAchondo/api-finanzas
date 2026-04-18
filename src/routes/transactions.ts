import { Hono, Context } from 'hono'
import * as data from '../data'
import { Transaction } from '../types'

const router = new Hono()

// GET /transactions — Listar todas
router.get('/', (c: Context) => {
  return c.json(data.transactions, 200)
})

// GET /transactions/:id — Obtener una por id
router.get('/:id', (c: Context) => {
  const id = Number(c.req.param('id'))
const transaction = data.transactions.find((t) => t.id === id)

  if (!transaction) {
    return c.json({ error: 'Transacción no encontrada' }, 404)
  }

  return c.json(transaction, 200)
})

// POST /transactions — Crear nueva
router.post('/', async (c: Context) => {
const body = await c.req.json() as Omit<Transaction, 'id'>

  if (!body.description || !body.amount || !body.type) {
    return c.json({ error: 'Faltan campos requeridos' }, 400)
  }

  if (body.type !== 'income' && body.type !== 'expense') {
    return c.json({ error: 'El tipo debe ser income o expense' }, 400)
  }

  const newTransaction: Transaction = {
    id: data.counter.nextId++,
    description: body.description,
    amount: body.amount,
    type: body.type
  }

  data.transactions.push(newTransaction)
  data.counter.nextId++

  return c.json(newTransaction, 201)
})

// PUT /transactions/:id — Actualizar
router.put('/:id', async (c: Context) => {
  const id = Number(c.req.param('id'))
  const index = data.transactions.findIndex((t) => t.id === id)

  if (index === -1) {
    return c.json({ error: 'Transacción no encontrada' }, 404)
  }

const body = await c.req.json() as Partial<Omit<Transaction, 'id'>>

  data.transactions[index] = {
    ...data.transactions[index],
    ...body
  }

  return c.json(data.transactions[index], 200)
})

// DELETE /transactions/:id — Eliminar
router.delete('/:id', (c: Context) => {
  const id = Number(c.req.param('id'))
  const index = data.transactions.findIndex((t) => t.id === id)

  if (index === -1) {
    return c.json({ error: 'Transacción no encontrada' }, 404)
  }

  data.transactions.splice(index, 1)

 return c.body(null, 204)
})

export default router