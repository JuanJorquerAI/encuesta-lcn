# Sitio “Encuestas La Cosa Nostra” (Jekyll)

Construye un sitio estático con **Jekyll** para **Encuestas La Cosa Nostra**, estilo **institucional, sobrio y claro**. El foco es publicar la **Encuesta Actual** (destacada) y un **Histórico** con acceso a los PDFs, más una sección con **videos de YouTube embebidos**. Incluye **newsletter**, **SEO básico** y **botones de compartir**. En el **footer** agrega un link visible a **AplicacionesWeb** ([https://www.aplicacionesweb.cl](https://www.aplicacionesweb.cl)).

---

## Stack y estructura

* Generador: **Jekyll**.
* Collections:

  * `encuestas/` (collection principal).
* Páginas:

  * `index.html` → Home con **Encuesta Actual** + resumen breve + botón “Ver PDF”.
  * `encuestas/index.html` → **Histórico** paginado (tarjetas: título, fecha, 2–3 atributos, botón “PDF”).
  * `videos/index.html` → Galería con **YouTube embebido** (privacy mode).
  * `suscripcion/index.html` → Newsletter (form embed/acción genérica).
  * `about/index.html` (opcional).
* Includes/layouts:

  * `/_layouts/default.html`, `/_layouts/encuesta.html`
  * `/_includes/header.html`, `/_includes/footer.html`, `/_includes/share.html`, `/_includes/card-encuesta.html`, `/_includes/hero-encuesta.html`, `/_includes/youtube.html`
* Estáticos: `/assets/css/main.css`, `/assets/js/main.js`, `/assets/img/`.

---

## Datos y front matter

Collection `encuestas` con estos campos:

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
destacado: true   # solo una encuesta con true
tags: [politica, opinion]
youtube_ids: ["dQw4w9WgXcQ","Zx1nGx4vGzQ"]  # opcional
permalink: /encuestas/:title/
---
```

**Regla**: solo **una** encuesta con `destacado: true`. Si hay empate, toma la más reciente.

---

## Home (index)

* Hero con **Encuesta Actual** (título, fecha, 2–3 atributos, botón “Descargar PDF” que apunta a `pdf_url`).
* Debajo: “Últimas encuestas” (4–6 tarjetas del histórico con enlace a detalle).

---

## Histórico

* Lista cronológica y **paginada** (por fecha desc).
* Cada tarjeta: título, fecha, 2–3 atributos, botón **PDF** (link a `pdf_url`) y link al detalle.

---

## Detalle de encuesta

* Encabezado con título, fecha, atributos, botón “Descargar PDF”.
* Bloque “Resumen” (usar `resumen`).
* Si `youtube_ids` existe: grid de videos embebidos (usar `youtube-nocookie.com`).

---

## Videos

* Grid de 2–3 columnas con **embeds**. Cada card muestra título (si disponible), fecha del video y embed responsivo.

---

## Newsletter

* Página y bloque en el footer o al final del Home con formulario simple:

  * Campo email + botón “Suscribirme”.
  * Deja el `action` como placeholder (`#`) y comenta dónde conectar (Mailchimp/Beehiiv).

---

## Footer

* Datos de contacto/redes (placeholders).
* **Link visible**: “Desarrollado por **AplicacionesWeb**” → [https://www.aplicacionesweb.cl](https://www.aplicacionesweb.cl)

---

## Botones de compartir

* `/_includes/share.html` con enlaces a:

  * Twitter/X, LinkedIn, Facebook, WhatsApp (usar la URL de la página y `title`).
* Mostrar en el detalle de encuesta y opcional en tarjetas.

---

## SEO & performance

* Activar **jekyll-seo-tag**, **jekyll-sitemap**, **jekyll-feed** (si es compatible con el hosting).
* Metadatos por página (title, description desde `resumen`).
* `robots.txt`, `sitemap.xml`, `feed.xml`.
* Imágenes y PDFs optimizados. Carga rápida, fonts del sistema.

---

## Diseño (serio y sobrio)

* Paleta: fondo blanco, grises, acentos en **azul marino** (muy sutil).
* Tipografía sans profesional (ej. Inter/Source Sans/segura del sistema).
* Mucho aire, componentes minimalistas, foco en legibilidad.
* Embeds responsivos (aspect-ratio 16:9).

---

## Accesibilidad

* Contraste suficiente, `alt` en imágenes, labels en formularios, foco visible.

---

## Navegación

* Header fijo con: Inicio, Encuestas, Videos, Suscripción, (About opcional).
* Breadcrumb en páginas internas.

---

## Configuración Jekyll (`_config.yml`)

* `collections: { encuestas: { output: true, permalink: /encuestas/:title/ } }`
* `plugins: [jekyll-seo-tag, jekyll-sitemap, jekyll-feed]`
* `permalink: pretty`
* Variables del sitio: nombre, descripción, redes.

---

## Componentes clave

* **`_includes/hero-encuesta.html`**: toma la encuesta destacada.
* **`_includes/card-encuesta.html`**: tarjeta reutilizable (usa `title`, `date`, `atributos`, `pdf_url`).
* **`_includes/youtube.html`**: recibe `id` y renderiza `<iframe>` con `youtube-nocookie`.
* **`_includes/share.html`**: genera los 4 enlaces de compartir con la URL actual.

---

## Contenido de ejemplo

* Genera 1 encuesta destacada + 6 encuestas históricas de demo (con PDFs ficticios).
* Genera 6 videos con `youtube_ids` falsos (placeholders).

---

## Build & README

Incluir `README.md` con:

* Requisitos, `bundle install`, `bundle exec jekyll serve`.
* Estructura de carpetas.
* Cómo crear una nueva encuesta (plantilla de front matter).
* Cómo marcar `destacado: true`.
* Cómo subir PDFs.

---

## Criterios de calidad

* Existe exactamente **una** encuesta destacada en Home.
* Cada encuesta del histórico tiene **link al PDF**.
* Videos están **embebidos** (no solo enlaces).
* Footer muestra el link a **AplicacionesWeb**.
* Páginas generan metadatos SEO y sitemap.
* Diseño es responsive y accesible.
