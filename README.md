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

## Desafíos técnicos
Desafíos técnicos

1. El error de tipeo que instaló un impostor: Un carácter de más al confirmar un comando (yç en vez de y) fue suficiente para que el sistema instalara un paquete falso que se hacía pasar por el compilador de TypeScript. La lección no fue técnica sino de atención: las herramientas hacen exactamente lo que les dices, no lo que quieres decir. Se resolvió limpiando la caché y usando directamente el TypeScript ya instalado en el proyecto con yarn tsc --init.

2. VS Code no reconocía los módulos instalados porque Yarn 4 los guarda en un lugar no convencional. Esto significa que el entorno no sabía dónde mirar. Si bien no había nada roto, las dos herramientas que no se conocían todavía. Ejecutar yarn dlx @yarnpkg/sdks vscode fue presentarlas formalmente. 

3. Con el modo estricto activado, TypeScript no acepta ambigüedad: cada parámetro debe declarar explícitamente qué es. El código debe ser legible no solo para la máquina, sino para cualquier persona que lo lea después. Se resolvió tipando cada handler con Context de Hono. En palabras técnicas, el parámetro c tenía un tipo implícito any, consecuencia del strict: true en el tsconfig. Se resolvió importando Context desde Hono y tipando cada handler como (c: Context).

4. Llamar a un método como c.req.json<Tipo>() parece razonable, pero en ciertos contextos TypeScript no lo permite. La solución fue escribir await c.req.json() as Tipo — hace lo mismo pero declara la intención de otra forma.

5. La diferencia entre un valor y un objeto que lo contiene: Importar un número primitivo en ES modules lo congela: no se puede modificar desde afuera. Importar un objeto con ese número adentro, en cambio, sí es mutable. La distinción parece arbitraria hasta que entiendes que los primitivos se copian y los objetos se referencian. Técnicamente, nextId era de solo lectura. Al importar una variable primitiva con ES modules (import { nextId }), TypeScript la trata como de solo lectura y no permite reasignarla. Se resolvió exportando un objeto counter = { nextId: 3 } en vez de una variable suelta, ya que las propiedades de objetos sí son mutables.

6. Debido a la semántica HTTP, usar c.json(null, 204) fallaba porque es una contradicción: json implica que hay contenido, y 204 significa lo contrario. Es decir, c.json() no acepta null como body. Cambiarlo a c.body(null, 204) fue la solución para respuestas sin contenido. 

## Link al video explicativo
https://youtu.be/zKIAMR8phpY