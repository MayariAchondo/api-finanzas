# API REST — Finanzas Personales

API para gestionar transacciones financieras personales (ingresos y egresos).

## Tecnologías
- Hono + Node.js
- TypeScript
- Yarn

## Instalación
```bash
yarn install
```

## Correr el proyecto
```bash
yarn dev
```

La API queda disponible en `http://localhost:3000`.

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /transactions | Listar todas |
| GET | /transactions/:id | Obtener por id |
| POST | /transactions | Crear nueva |
| PUT | /transactions/:id | Actualizar |
| DELETE | /transactions/:id | Eliminar |

## Modelo de datos
```typescript
type Transaction = {
  id: number
  description: string
  amount: number
  type: 'income' | 'expense'
}
```

## Uso de IA
Durante el desarrollo se utilizó Claude (Anthropic) para:
- Configuración inicial del entorno (tsconfig, eslint, package.json)
- Resolución de errores de TypeScript con módulos PnP de Yarn 4
- Estructura y tipado de los endpoints

El código fue revisado y comprendido línea por línea durante el proceso.

## Video
[Ver demostración](LINK_DEL_VIDEO)