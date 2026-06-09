# Portafolio Estático - Gabriel Pedreros

## Descripción

Portafolio personal estático optimizado para **Cloudflare Pages**. Incluye todas las secciones del portafolio original pero en HTML/CSS puro, sin dependencias de servidor.

## Características

- **HTML/CSS/JS puro** - Sin frameworks ni build tools
- **Diseño responsive** - Optimizado para móviles y desktop
- **Tema oscuro** - Diseño moderno y elegante
- **Animaciones suaves** - Con Intersection Observer
- **SEO optimizado** - Meta tags y Open Graph
- **Accesible** - ARIA labels y semantic HTML
- **WhatsApp button** - Botón flotante para contacto rápido
- **Filtro de proyectos** - JavaScript vanilla para filtrar
- **Menú móvil** - Navegación responsive

## Secciones

1. **Hero** - Nombre, título y stack tecnológico
2. **Experiencia** - Trayectoria profesional
3. **Sobre mí** - Bio y valores
4. **Habilidades** - Stack técnico organizado por categorías
5. **Proyectos** - Grid con filtro por categoría
6. **Contacto** - Links a GitHub, LinkedIn y Email

## Despliegue en Cloudflare Pages

### Opción 1: Direct Upload

1. Ve a [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Workers & Pages > Create > Pages > Upload assets
3. Nombre: `gpb-portfolio`
4. Sube la carpeta del proyecto
5. Deploy

### Opción 2: Wrangler CLI

```bash
npm install -g wrangler
wrangler login
wrangler pages deploy . --project-name=gpb-portfolio
```

### Opción 3: Git Integration

1. Sube a GitHub
2. Cloudflare Pages > Connect to Git
3. Build output directory: `/`
4. Deploy

## Archivos Incluidos

```
├── index.html          # Archivo principal
├── _headers           # Headers de seguridad y cache
├── _routes.json       # Configuración de rutas
├── DEPLOY.md          # Guía de despliegue
└── PORTFOLIO-STATICO.md  # Este archivo
```

## Personalización

### Cambiar colores

Edita las variables CSS en `index.html`:

```css
:root {
  --primary: #6366f1;        /* Color principal */
  --bg-dark: #0a0a0f;        /* Fondo oscuro */
  --text-light: #ffffff;     /* Texto claro */
}
```

### Cambiar información

Edita directamente el HTML con tu información personal.

### Agregar proyectos

Busca la sección `projects-grid` y agrega nuevos project cards.

## Rendimiento

- **Tamaño**: ~15KB HTML + ~5KB CSS (inline)
- **External resources**: Solo Google Fonts y DevIcons
- **Lazy loading**: Imágenes con `loading="lazy"`
- **Cache**: Headers configurados para Cloudflare

## Navegación

- `#hero` - Inicio
- `#work` - Experiencia
- `#about` - Sobre mí
- `#projects` - Proyectos
- `#contact` - Contacto

## Licencia

Personal use - Gabriel Pedreros