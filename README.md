# News Explorer — Frontend

Proyecto final de TripleTen. Permite buscar noticias de los últimos siete días, crear una cuenta y guardar artículos para consultarlos después.

## Enlaces

- Aplicación: https://news-explorer-sebas.duckdns.org
- API: https://news-explorer-api-sebas.duckdns.org
- Repositorio del backend: https://github.com/sebassjaeguer/news-explorer-backend

## Funciones

- Búsqueda por palabra clave mediante News API.
- Indicador de carga y mensajes de error o de búsqueda sin resultados.
- Resultados de tres en tres con el botón Mostrar más.
- Recuperación de la última búsqueda mediante localStorage.
- Registro, inicio y cierre de sesión.
- Modal de confirmación después del registro.
- Datos del usuario compartidos mediante CurrentUserContext.
- Ruta de artículos guardados protegida mediante ProtectedRoute.
- Guardado y eliminación de artículos asociados a cada cuenta.
- Contador de artículos y palabras clave ordenadas por frecuencia.
- Diseño adaptable a escritorio, tableta y celular.

## Tecnologías

React, React Router, JavaScript, CSS, Vite y ESLint.

## Requisitos

- Node.js y npm compatibles con las dependencias del proyecto.
- Una clave de News API.
- El backend de News Explorer ejecutándose en el puerto 3001 para el desarrollo local.

## Instalación

```sh
git clone https://github.com/sebassjaeguer/news-explorer-frontend.git
cd news-explorer-frontend
git switch stage-react-auth
npm ci
```

Crea un archivo `.env.local` en la raíz del frontend:

```dotenv
VITE_NEWS_API_KEY=TU_CLAVE_DE_NEWS_API
```

Sustituye el valor por tu clave de News API.

Inicia el servidor de desarrollo:

```sh
npm run dev
```

Abre la dirección que Vite muestra en la terminal.

Reinicia Vite después de cambiar las variables de entorno.

## Conexión con el backend

Las solicitudes al backend están centralizadas en `src/utils/MainApi.js` y utilizan el prefijo `/api`.

En desarrollo, Vite reenvía las solicitudes a `http://127.0.0.1:3001` y elimina el prefijo `/api`.

Por ejemplo:

- El frontend solicita `/api/signin`.
- El backend recibe `/signin`.

En producción, Nginx realiza ese reenvío desde el dominio de la aplicación.

## Búsqueda de noticias

Las solicitudes de noticias están en `src/utils/newsApi.js`.

- En desarrollo se utiliza `https://newsapi.org/v2/everything`.
- En la compilación de producción se utiliza el proxy indicado por TripleTen: `https://nomoreparties.co/news/v2/everything`.

La búsqueda solicita noticias de los últimos siete días, en español y con un máximo de 100 resultados.

## Comandos

| Comando | Función |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo. |
| `npm run lint` | Analiza el código con ESLint. |
| `npm run build` | Genera la compilación en `dist`. |
| `npm run preview` | Permite revisar la compilación localmente. |

## Publicación

La aplicación está publicada en Google Cloud y se sirve mediante Nginx con HTTPS.

Dirección pública:

https://news-explorer-sebas.duckdns.org

Para generar una nueva compilación:

```sh
npm run build
```

La variable `VITE_NEWS_API_KEY` debe estar configurada antes de compilar.

En el servidor, los archivos generados dentro de `dist` se copian a:

```text
/var/www/news-explorer
```

La configuración de Nginx permite abrir las rutas de React directamente y reenvía las solicitudes `/api/` al backend.

## Autor

Sebastian Medina.