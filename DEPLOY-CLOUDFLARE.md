# Cloudflare Pages Deployment

## Configuración

### 1. Crear Secrets en GitHub

Ve a **Settings > Secrets and variables > Actions** en tu repositorio y crea:

- `CLOUDFLARE_API_TOKEN`: Token de API de Cloudflare
- `CLOUDFLARE_ACCOUNT_ID`: ID de tu cuenta de Cloudflare

### 2. Obtener Credenciales de Cloudflare

1. Ve a [Cloudflare Dashboard](https://dash.cloudflare.com)
2. **My Profile > API Tokens**
3. Crea un token con permisos para Cloudflare Pages
4. Copia el token y el Account ID

### 3. Variables de Entorno en Cloudflare

En el dashboard de Cloudflare Pages, ve a **Settings > Environment variables** y agrega:

```
MYSQL_HOST=tu_host
MYSQL_PORT=3306
MYSQL_USER=tu_usuario
MYSQL_PASSWORD=tu_password
MYSQL_DATABASE=portfolio
```

### 4. Deploy Automático

El workflow `cloudflare.yml` ejecuta automáticamente:
- Build del proyecto Next.js
- Deploy a Cloudflare Pages en cada push a `main`

### 5. Deploy Manual

```bash
# Instalar Wrangler
npm install -g wrangler

# Login
wrangler login

# Deploy
cd portfolio-next
npm run build
wrangler pages deploy out --project-name=gpb-portfolio
```

## Variables de Entorno

| Variable | Descripción | Default |
|----------|-------------|---------|
| `MYSQL_HOST` | Host de MySQL | `localhost` |
| `MYSQL_PORT` | Puerto MySQL | `3306` |
| `MYSQL_USER` | Usuario MySQL | `root` |
| `MYSQL_PASSWORD` | Password MySQL | `` |
| `MYSQL_DATABASE` | Base de datos | `portfolio` |

## Notas

- El proyecto usa Next.js 14 con output estático
- Cloudflare Pages sirve archivos estáticos desde `out/`
- Asegúrate de que tu base de datos MySQL sea accesible desde Cloudflare