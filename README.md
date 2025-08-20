# Encuestas La Cosa Nostra (Jekyll)

Sitio estático institucional para publicar la Encuesta Actual, un Histórico y videos embebidos.

## Requisitos
- Ruby y Bundler instalados
- Jekyll 4.x

## Instalación
```bash
bundle install
```

## Ejecutar en desarrollo
```bash
bundle exec jekyll serve
# o con Docker
# docker build -t encuesta-lcn .
# docker run --rm -p 4000:4000 -v $(pwd):/app encuesta-lcn
```

Luego abre http://localhost:4000

## Estructura
- `_encuestas/` colección principal (cada archivo es una encuesta)
- `_includes/` componentes (`hero-encuesta`, `card-encuesta`, `youtube`, `share`)
- `_layouts/` diseños (`default`, `encuesta`)
- `encuestas/` índice paginado del histórico
- `videos/` galería de videos (fuente: `youtube_ids` de encuestas)
- `suscripcion/` formulario de newsletter
- `assets/` CSS, JS, imágenes, PDFs

## Crear una nueva encuesta
Crea un archivo en `_encuestas/` con el siguiente front matter:

```yaml
---
layout: encuesta
title: "Título de la encuesta"
date: 2025-08-01
resumen: "Breve contexto de qué midió la encuesta."
atributos:
  - "Muestra: 1.200 casos"
  - "Margen de error: ±2,8%"
  - "Metodología: Mixta"
pdf_url: "/assets/pdfs/encuesta-2025-08.pdf"
destacado: false   # deja en true solo si es la encuesta actual
tags: [politica, opinion]
youtube_ids: ["abc123","def456"]  # opcional
permalink: /encuestas/:title/
---
```

- Regla: debe existir exactamente una encuesta con `destacado: true`. Si hay empate, se mostrará la más reciente.

## Paginación del histórico
Usamos `jekyll-paginate-v2` para paginar la colección `encuestas`:
- Configuración en `_config.yml` (`plugins` y bloque `pagination`)
- Página `encuestas/index.html` con `pagination` activado

## SEO & Sitemap
- Plugins: `jekyll-seo-tag`, `jekyll-sitemap`, `jekyll-feed`
- `robots.txt` ya creado. `sitemap.xml` y `feed.xml` se generan automáticamente

## Newsletter
- Formularios en `suscripcion/` y en el footer. Reemplaza `action="#"` por tu endpoint (Mailchimp/Beehiiv)

## Créditos
- Footer incluye el link visible a AplicacionesWeb.

---

## Despliegue
- Construcción: `bundle exec jekyll build`
- Salida en `_site/`

## Calidad (Checklist)
- [ ] Una sola encuesta con `destacado: true`
- [ ] Cada tarjeta del histórico con link PDF
- [ ] Videos embebidos funcionan (youtube-nocookie)
- [ ] Metadatos SEO presentes (`{% seo %}`)
- [ ] Diseño responsive y accesible
