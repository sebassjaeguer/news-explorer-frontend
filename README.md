# News Explorer — Frontend

Proyecto final de TripleTen. Permite buscar noticias de los últimos siete días, crear una cuenta y guardar artículos para consultarlos después.

## Funciones

- Búsqueda por palabra clave mediante News API.
- Indicador de carga y mensajes de error o de búsqueda sin resultados.
- Resultados de tres en tres con el botón Mostrar más.
- Recuperación de la última búsqueda mediante localStorage.
- Registro, inicio y cierre de sesión.
- Guardado y eliminación de artículos asociados a cada cuenta.
- Página de artículos guardados con contador y palabras clave.
- Diseño adaptable a escritorio, tableta y celular.

## Tecnologías

React, React Router, JavaScript, CSS, Vite y ESLint.

## Requisitos

- Node.js y npm compatibles con las dependencias del proyecto.
- Una clave de News API.
- El backend de News Explorer ejecutándose en el puerto 3001 para las funciones de cuenta y artículos guardados.

## Instalación

```sh
git clone https://github.com/sebassjaeguer/news-explorer-frontend.git
cd news-explorer-frontend
npm install
```

Crea un archivo `.env.local` en la raíz del frontend y agrega tu propia clave.

```dotenv
VITE_NEWS_API_KEY=TU_CLAVE_DE_NEWS_API
```

Ejecuta el servidor de desarrollo y abre la dirección que Vite muestra en la terminal.

```sh
npm run dev
```

Reinicia Vite después de cambiar las variables de entorno. El proxy de desarrollo reenvía `/signup`, `/signin`, `/users/me` y `/articles` al backend en `http://127.0.0.1:3001`.

## Comandos

| Comando | Función |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo. |
| `npm run lint` | Analiza el código con ESLint. |
| `npm run build` | Genera la compilación en `dist`. |
| `npm run preview` | Permite revisar la compilación localmente. |

## Publicación

El proyecto está preparado actualmente para desarrollo local. Antes de publicar, configura la conexión al backend desplegado y la dirección de News API indicada por la guía de TripleTen. El proxy configurado en `server.proxy` corresponde al servidor de desarrollo de Vite.

El enlace público se añadirá cuando se despliegue la aplicación.

## Backend

[Repositorio del backend](https://github.com/sebassjaeguer/news-explorer-backend)
