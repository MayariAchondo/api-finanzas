import { Transaction } from './types'

export let transactions: Transaction[] = [
  {
    id: 1,
    description: 'Sueldo enero',
    amount: 800000,
    type: 'income'
  },
  {
    id: 2,
    description: 'Supermercado',
    amount: 45000,
    type: 'expense'
  }
]

export const counter = { nextId: 3 }