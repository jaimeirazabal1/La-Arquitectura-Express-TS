# Scaffold Express con TypeScript - Arquitectura Escalable

Este proyecto proporciona una estructura base robusta y escalable para desarrollar aplicaciones backend utilizando Express.js y TypeScript. Está diseñado siguiendo principios de organización modular para facilitar el mantenimiento y la expansión.

## Características

*   **TypeScript:** Tipado estático para mayor seguridad y productividad.
*   **Express.js:** Framework web minimalista y flexible para Node.js.
*   **Arquitectura Modular:** Separación clara de responsabilidades por carpetas (config, core, api, modules, middlewares, utils).
*   **Versionado de API:** Estructura preparada para manejar diferentes versiones de la API (ej: `/api/v1`).
*   **Variables de Entorno:** Gestión segura de configuraciones sensibles con `dotenv`.
*   **Scripts Preconfigurados:** Comandos listos para desarrollo, compilación y ejecución en producción.
*   **Manejo Asíncrono Simplificado:** Utilidad `asyncHandler` para evitar `try-catch` repetitivos en controladores.
*   **Configuración Centralizada:** Archivos dedicados para gestionar la configuración de la aplicación.

## Prerrequisitos

*   Node.js (v16 o superior recomendado)
*   npm (o yarn)

## Instalación

1.  Clona este repositorio (o usa esta estructura como plantilla).
2.  Navega a la carpeta raíz del proyecto.
3.  Instala las dependencias:
    ```bash
    npm install
    ```

## Configuración

1.  Crea un archivo `.env` en la raíz del proyecto. Puedes copiar el contenido de `.env.example` como punto de partida:
    ```bash
    cp .env.example .env
    ```
2.  Modifica el archivo `.env` con tus propias configuraciones (puerto, variables de entorno para bases de datos, claves de API, etc.).

    *   `PORT`: Puerto en el que se ejecutará el servidor (por defecto `3000`, pero `.env` puede sobreescribirlo).
    *   `NODE_ENV`: Ambiente de ejecución (`development`, `production`, `test`).

3.  Las configuraciones cargadas desde `.env` están disponibles de forma tipada a través del objeto `environment` exportado desde `src/config/environment.ts`.

## Ejecución de la Aplicación

### Modo Desarrollo

Ejecuta el servidor en modo desarrollo con recarga automática ante cambios en los archivos `.ts`:

```bash
npm run dev
```

El servidor se iniciará utilizando `nodemon` y `ts-node`. Por defecto, escuchará en el puerto especificado en `.env` (o 3001 si no se especifica y usaste el `.env` de ejemplo).

### Modo Producción

1.  **Compilar:** Transpila el código TypeScript a JavaScript en la carpeta `dist/`:
    ```bash
    npm run build
    ```
2.  **Iniciar:** Ejecuta la aplicación compilada desde la carpeta `dist/`:
    ```bash
    npm run start
    ```

El servidor se ejecutará utilizando Node.js directamente sobre los archivos JavaScript compilados.

## Scripts Disponibles

*   `npm run dev`: Inicia el servidor en modo desarrollo con `nodemon` y `ts-node`.
*   `npm run build`: Compila el proyecto TypeScript a JavaScript (en `dist/`).
*   `npm run start`: Ejecuta la aplicación compilada desde `dist/` (requiere `npm run build` previo).
*   `npm test`: (Pendiente de implementar) Ejecuta las pruebas unitarias/integración.

## Estructura del Proyecto

```
.
├── dist/           # Código JavaScript compilado (para producción)
├── node_modules/   # Dependencias del proyecto
├── src/            # Código fuente TypeScript
│   ├── api/        # Definición de rutas y controladores por versión de API
│   │   └── v1/     # Versión 1 de la API
│   │       ├── controllers/ # Controladores específicos de la API (capa HTTP)
│   │       └── routes/      # Definición de rutas Express
│   ├── config/     # Gestión de configuración y variables de entorno
│   ├── core/       # Clases base, errores personalizados, lógica transversal
│   │   ├── errors/
│   │   └── utils/  # Utilidades específicas del core (ej: asyncHandler)
│   ├── middlewares/ # Middlewares personalizados de Express
│   ├── modules/    # Lógica de negocio principal, separada por dominios/features
│   │   └── users/  # Ejemplo de módulo de usuarios (contiene servicios, modelos, etc.)
│   ├── utils/      # Funciones de utilidad generales y reutilizables
│   ├── app.ts      # Creación y configuración de la instancia de Express
│   └── server.ts   # Punto de entrada, inicia el servidor HTTP
├── .env            # Variables de entorno (¡No subir a Git!)
├── .env.example    # Plantilla para variables de entorno
├── .gitignore      # Archivos y carpetas ignorados por Git
├── package.json    # Metadatos y dependencias del proyecto
├── package-lock.json # Versiones exactas de las dependencias
└── tsconfig.json   # Configuración del compilador TypeScript
```

*   **`src/app.ts`**: Configura la instancia de Express (middlewares globales, montaje de rutas).
*   **`src/server.ts`**: Importa la `app` y la inicia, escuchando en un puerto.
*   **`src/config`**: Centraliza la carga y acceso a variables de entorno y otras configuraciones.
*   **`src/core`**: Elementos reusables en toda la aplicación (errores base, utilidades como `asyncHandler`).
*   **`src/modules`**: El corazón de la aplicación. Cada subcarpeta representa un dominio (ej: usuarios, productos) y contiene su lógica específica (servicios, modelos de datos si usas ORM, validaciones, etc.).
*   **`src/api`**: La capa que expone la funcionalidad al exterior a través de HTTP. Los controladores aquí usan los servicios definidos en `src/modules`. Se organiza por versiones.
*   **`src/middlewares`**: Middlewares reutilizables (logging, autenticación, validación de esquemas, etc.).
*   **`src/utils`**: Funciones de utilidad genéricas.

## Endpoints de Ejemplo (API v1)

*   `GET /`: Ruta base de la aplicación (definida en `src/app.ts`). Respuesta: `¡Hola Mundo desde la App!`
*   `GET /api/v1/example`: Ruta de ejemplo (definida en `src/api/v1/routes/example.routes.ts`). Respuesta: `{ "message": "Esta es una respuesta de ejemplo desde la API v1" }`
*   `GET /api/v1/users`: Obtiene una lista de usuarios de ejemplo (definida en `src/modules/users/users.routes.ts`). Respuesta: `[{ "id": 1, "name": "Usuario Ejemplo" }]`
*   `GET /api/v1/users/:id`: Obtiene un usuario de ejemplo por ID. Respuesta: `{ "id": <id>, "name": "Usuario Ejemplo <id>" }`

## Añadir Nuevos Módulos/Features

1.  Crea una nueva carpeta dentro de `src/modules` (ej: `src/modules/products`).
2.  Dentro de ella, crea los archivos necesarios para la lógica de negocio (ej: `products.service.ts`, `products.model.ts` - si aplica).
3.  Crea el controlador en `src/api/v1/controllers` (ej: `product.controller.ts`) que use el servicio del módulo.
4.  Define las rutas en `src/api/v1/routes` (ej: `product.routes.ts`) usando el controlador.
5.  Importa y monta las nuevas rutas en `src/api/v1/routes/index.ts`.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request.

## Licencia

licencia  MIT

