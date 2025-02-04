# @eliza/plugin-insights

Plugin para obtener métricas y análisis de rendimiento de la plataforma EthAgentic en Eliza.

## Instalación

```bash
pnpm add @eliza/plugin-insights
```

## Configuración

Agrega el plugin a la configuración de tu personaje:

```typescript
import { ethAgenticInsightsPlugin } from '@eliza/plugin-insights';

const character = {
  plugins: [ethAgenticInsightsPlugin],
};
```

Configura las variables de entorno necesarias en los secrets del personaje:

```typescript
runtime.character.settings.secrets = {
  baseUrl: 'http://localhost:3000' // URL base de la API de EthAgentic
};
```

## Acciones Disponibles

### GET_INSIGHTS
Obtiene métricas y análisis de rendimiento de la plataforma.

```typescript
const response = await runtime.processAction('GET_INSIGHTS');
console.log('Platform insights:', response);
```

Parámetros soportados:
- timeRange: Rango temporal de los datos ("current", "daily", "weekly", "monthly")
- metrics: Array de métricas específicas a consultar ("users", "transactions", "performance")
- format: Formato de respuesta ("detailed", "summary")

## Estructura de Respuestas

### Insights
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "metric": "Daily Active Users",
      "value": 1500,
      "trend": "up",
      "percentage": 15
    },
    {
      "id": "2",
      "metric": "Transaction Volume",
      "value": 2300,
      "trend": "up",
      "percentage": 23
    },
    {
      "id": "3",
      "metric": "Average Session Duration",
      "value": 850,
      "trend": "stable",
      "percentage": 0
    }
  ]
}
```

## Manejo de Errores

El plugin incluye manejo de errores para casos comunes:

- Configuración faltante
- Errores de red
- Respuestas de error de la API
- Métricas no disponibles o inválidas

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