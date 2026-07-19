# Generador de arte social Árkos (og-image y portadas de blog)

Templates HTML del sistema "Light 2026" (retícula blueprint, marco hairline,
Cabinet Grotesk/Switzer/JetBrains Mono locales, cobalto `#0a33ff`) que se
capturan con Chrome headless a 1200×630.

## Uso

1. Duplica `cover-ejemplo-post.html` con un nombre por post y edita:
   - el `<h1>` con el título (la frase clave dentro de `<span class="brand">`),
   - la línea `.mono` inferior derecha con los tags del post.
2. Captura (PowerShell/Git Bash, rutas absolutas):

```bash
"C:/Program Files/Google/Chrome/Application/chrome.exe" \
  --headless=new --disable-gpu --hide-scrollbars \
  --window-size=1200,630 --virtual-time-budget=4000 \
  --screenshot="public/blog-cover-mi-post.png" \
  "file:///C:/Trabajo/Clientes/PortafolioBytecore/scripts/og/cover-mi-post.html"
```

3. Referencia la imagen en el frontmatter del post: `image: "/blog-cover-mi-post.png"`.

Notas:
- Los `@font-face` apuntan a `app/fonts/*.woff2` por ruta absoluta `file:///` —
  si el repo vive en otra ruta, actualízalas.
- `og-image.html` es el arte social global del sitio (replica el hero). Si se
  regenera, exportar como `public/og-image.png` y regenerar también el `.webp`
  (`python -c "from PIL import Image; Image.open('public/og-image.png').save('public/og-image.webp','WEBP',quality=90)"`).
