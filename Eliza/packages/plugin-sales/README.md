# @eliza/plugin-ethagentic-sales

Plugin para integrar datos de ventas e insights de la plataforma EthAgentic en Eliza.

## Instalación

```bash
pnpm add @eliza/plugin-ethagentic-sales
```

## Configuración

Agrega el plugin a la configuración de tu personaje:

```typescript
import { ethAgenticSalesPlugin } from '@eliza/plugin-ethagentic-sales';

const character = {
  plugins: [ethAgenticSalesPlugin],
};
```

Configura las variables de entorno necesarias en los secrets del personaje:

```typescript
runtime.character.settings.secrets = {
  baseUrl: 'http://localhost:3000' // URL base de la API de EthAgentic
};
```

## Acciones Disponibles

### GET_SALES
Obtiene datos de ventas de la plataforma EthAgentic.

```typescript
const response = await runtime.processAction('GET_SALES');
console.log('Sales data:', response);
```

### GET_INSIGHTS
Obtiene métricas e insights de la plataforma.

```typescript
const response = await runtime.processAction('GET_INSIGHTS');
console.log('Platform insights:', response);
```

## Estructura de Respuestas

### Ventas
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "amount": 1500,
      "date": "2024-02-01",
      "product": "NFT Collection Alpha"
    }
  ]
}
```

### Insights
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "metric": "Total Revenue",
      "value": 4650,
      "trend": "up",
      "percentage": 15.5
    }
  ]
}
```

## Manejo de Errores

El plugin incluye manejo de errores para casos comunes:

- Configuración faltante
- Errores de red
- Respuestas de error de la API

Las respuestas de error seguirán este formato:

```json
{
  "success": false,
  "error": "Mensaje descriptivo del error"
}
```

## Desarrollo

Para construir el plugin:

```bash
pnpm build
```

Para ejecutar las pruebas:

```bash
pnpm test
```

## Licencia

MIT