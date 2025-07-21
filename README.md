# Express-ts API

Proyecto backend desarrollado en Node.js con TypeScript y Express, diseñado para exponer endpoints RESTful para operaciones de apertura de cuentas y gestión de seguridad.

## Tecnologías principales

- **Node.js**
- **TypeScript**
- **Express**
- **Joi** (validaciones)
- **Axios** (peticiones HTTP)
- **Winston** (logs)
- **Morgan** (logs HTTP)
- **dotenv** (variables de entorno)
- **ts-node-dev** (desarrollo)

## Estructura del proyecto

```
/Express
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts                # Entry point
│   ├── api/
│   │   ├── index.ts            # Registro de rutas
│   │   ├── middlewares/        # Middlewares personalizados
│   │   └── routes/             # Definición de rutas
│   ├── config/                 # Configuración y variables de entorno
│   ├── controllers/            # Controladores de endpoints
│   ├── helpers/                # Utilidades y tipos
│   ├── loaders/                # Inicialización de servicios (Express, logger, etc)
│   ├── logs/                   # Archivos de logs
│   ├── services/               # Lógica de negocio
│   └── utils/                  # Utilidades generales y validaciones
```

## Scripts disponibles

- `npm run dev` — Inicia el servidor en modo desarrollo con recarga automática.
- `npm run tsc` — Compila el proyecto TypeScript a JavaScript.
- `npm start` — Ejecuta el servidor compilado.

## Configuración

El proyecto utiliza variables de entorno definidas en un archivo `.env` en la raíz del proyecto. Ejemplo:

```
PORT=3000
HOST=http://localhost:3000
KEY=usuario
SECRET=contraseña
LOG_LEVEL=info
prefix=/api
sec_key=/seguridad
account_opening=/apertura
```

## Endpoints principales

- **POST `/apertura`** — Endpoint para apertura de cuentas.

## Estructura de middlewares

- **Logger**: Registro de peticiones y respuestas.
- **Token**: Validación de token de seguridad.
- **Keys**: Obtención y validación de llaves de seguridad.

## Estándares y buenas prácticas

- Arquitectura modular y escalable.
- Uso de tipado estricto con TypeScript.
- Separación de lógica de negocio, controladores y utilidades.
- Manejo centralizado de logs y errores.

## Instalación

1. Clona el repositorio.
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Crea el archivo `.env` con tus variables de entorno.
4. Inicia el servidor:
   ```bash
   npm run dev
   ```

---

> Proyecto desarrollado por [Tu Nombre].
