# Encuestas La Cosa Nostra (Jekyll)

Sitio estático institucional para publicar la Encuesta Actual, un Histórico y videos embebidos.

## Requisitos

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
## Requisitos
- Ruby y Bundler instalados
- Jekyll 4.x

## Requisitos locales (recomendado)
- macOS con Homebrew (opcional pero recomendado)
- rbenv (gestión de versiones Ruby) — recomendamos Ruby 3.1.0 (coincide con producción)
- Bundler 2.5.22
- Jekyll 4.x

## Instalación (entorno recomendado con rbenv)
Sigue estos pasos una sola vez para configurar Ruby y Bundler para el proyecto:

```bash
# Si no tienes Homebrew (instalación interactiva)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Instalar rbenv y ruby-build
brew install rbenv ruby-build

# Añadir inicialización de rbenv al shell (solo si no está)
grep -qxF 'export PATH="$HOME/.rbenv/bin:$PATH"' ~/.zshrc || echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.zshrc
grep -qxF 'eval "$(rbenv init - zsh)"' ~/.zshrc || echo 'eval "$(rbenv init - zsh)"' >> ~/.zshrc
exec $SHELL

# Instalar Ruby (recomendado 3.1.0 para este repo)
rbenv install 3.1.0
cd /Users/juanjorquera/Dropbox\ (Personal)/Sites/CascadeProjects/encuesta-lcn
rbenv local 3.1.0

# Instalar Bundler y dependencias del proyecto
gem install bundler -v 2.5.22
rbenv rehash
bundle install
```

## Ejecutar en desarrollo (después de configurar Ruby/Bundler)

```bash
# Servir localmente con recarga en vivo
bundle exec jekyll serve --livereload --host 127.0.0.1 --port 4000
# Luego abrir http://127.0.0.1:4000

# (Alternativa con Docker, si prefieres no tocar Ruby local)
# docker build -t encuesta-lcn-jekyll .
# docker run --rm -p 4000:4000 encuesta-lcn-jekyll bundle exec jekyll serve --watch --host 0.0.0.0 --port 4000
```

## Nueva navegación
- He añadido un enlace "Informes" en el header (desktop y móvil) que apunta a `/informes/`. Allí se listan los posts/entradas (ej.: `/_posts/2025-10-27-informe-precision-encuestas.md`).

## Añadir un informe/post con PDF
1. Copia el PDF a `assets/pdfs/` (nombra de forma clara, p.ej. `2025-10-27-informe-precision-encuestas.pdf`).
2. Crea un post en `_posts/` con front matter y `pdf_url: "/assets/pdfs/tu-pdf.pdf"`.
3. `git add`, `git commit` y `git push`.

Ejemplo mínimo de post (ya se añadió uno de ejemplo):

```markdown
---
layout: default
title: "Informe: Precisión de encuestas — Octubre 2025"
date: 2025-10-27
categories: [informes]
tags: [metodologia, informe, precision]
pdf_url: "/assets/pdfs/2025-10-27-informe-precision-encuestas.pdf"
---

Se publica el informe "Precisión de encuestas". Puedes descargar el PDF desde el siguiente enlace:

[Descargar informe — Precisión de encuestas]({{ site.baseurl }}{{ page.pdf_url }})
```

## Despliegue
- Build: `bundle exec jekyll build` (o Netlify lo hace automáticamente, ver `_netlify.toml`)
- Salida: `_site/`

## Troubleshooting — localhost no funciona
Si `bundle exec jekyll serve` parece no arrancar o no responde en http://127.0.0.1:4000, prueba lo siguiente:

1) Verifica si el proceso está corriendo y el puerto ocupado:
```bash
ps aux | grep jekyll
lsof -i :4000
```

2) Revisa los logs del servidor (salida en la terminal donde ejecutaste `jekyll serve`). Busca errores tipo `Could not find 'bundler'` o `Errno::EADDRINUSE`.

3) Si hay errores de Bundler, asegúrate de haber instalado Bundler con la versión que pide `Gemfile.lock` (2.5.22):
```bash
gem install bundler -v 2.5.22
bundle install
```

4) Si LiveReload da `ECONNRESET`, suele ser un cliente (navegador) que cerró la conexión; intenta recargar la página o desactiva `--livereload` para aislar.

5) Si el puerto 4000 está en uso, ejecuta `bundle exec jekyll serve --port 4001` o mata el proceso que lo usa.

6) Firewall o restricciones de red: prueba con `--host 0.0.0.0` para exponer en todas las interfaces y abrir `http://localhost:4000`.

7) Último recurso: elimina `.jekyll-cache` y `_site` y reconstruye:
```bash
rm -rf .jekyll-cache _site
bundle exec jekyll build
bundle exec jekyll serve
```

Si sigues con problemas, pega aquí la salida completa que aparece en la terminal cuando ejecutas `bundle exec jekyll serve` y lo reviso.

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
