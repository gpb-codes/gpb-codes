powershell -ExecutionPolicy Bypass -File "D:\mis complementos\openshark-menu.ps1"# Despliegue en Cloudflare Pages

## Opción 1: Direct Upload (Recomendado)

1. Ve a [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Selecciona **Workers & Pages** > **Create**
3. Selecciona **Pages** > **Upload assets**
4. Nombre del proyecto: `gpb-portfolio`
5. Arrastra la carpeta del proyecto (o selecciona el archivo `index.html`)
6. Click en **Deploy**

## Opción 2: Git Integration

1. Sube el proyecto a GitHub
2. En Cloudflare Dashboard > **Workers & Pages** > **Create**
3. Selecciona **Pages** > **Connect to Git**
4. Selecciona tu repositorio
5. Configuración:
   - **Branch**: `main`
   - **Build command**: (dejar vacío)
   - **Build output directory**: `/`
6. Click **Save and Deploy**

## Opción 3: Wrangler CLI

```bash
# Instalar Wrangler
npm install -g wrangler

# Login
wrangler login

# Deploy
wrangler pages deploy . --project-name=gpb-portfolio
```

## Configuración de Dominio (Opcional)

1. En Cloudflare Dashboard > Pages > Tu proyecto
2. Ve a **Custom domains**
3. Agrega tu dominio (ej: `gabrielpedreros.dev`)
4. Sigue las instrucciones para configurar DNS

## Notas

- El archivo `index.html` está en la raíz del proyecto
- No requiere build steps (es HTML estático)
- Compatible con Cloudflare Pages (100% estático)
- Incluye optimizaciones SEO y meta tags
- Responsive design para móviles
- Animaciones con Intersection Observer
- Tema oscuro por defecto
