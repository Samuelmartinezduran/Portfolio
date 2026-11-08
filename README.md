# samuelmartinez.dev

Portfolio de Samuel Martínez Durán para buscar empleo como desarrollador. Una sola página estática hecha con
Astro que se presenta como una herramienta de desarrollador: una terminal que ejecuta las pruebas reales de sus
proyectos, paleta de comandos (Ctrl/Cmd+K) y los proyectos como archivos abiertos. Se publica en Vercel desde la
rama `main`.

## Desarrollo

Requiere Node.js 22.12 o superior.

```sh
npm ci
npm run dev      # http://localhost:4321
npm run verify   # astro check + astro build
npm run preview  # sirve dist/ después de compilar
```

## Dónde está cada cosa

| Qué | Dónde |
|---|---|
| Textos, proyectos, experiencia y cifras | `src/data/perfil.ts` (sale del CV; si cambia uno, cambiar el otro) |
| La página, con su JavaScript (terminal, paleta y atajos) | `src/pages/index.astro` |
| Metadatos, Open Graph y datos estructurados | `src/components/Cabeza.astro` |
| Documento HTML común | `src/layouts/Pagina.astro` |
| Página de error | `src/pages/404.astro` |
| Fuentes, colores y piezas comunes | `src/styles/global.css` (reglas en `DESIGN.md`) |
| `llms.txt` y `sitemap.xml` | `src/pages/llms.txt.ts` y `src/pages/sitemap.xml.ts`, generados con los mismos datos |
| Vídeo de Deep Prep y capturas | `public/proyectos/` (MP4 y WebP; el vídeo sale de `docs/img/demo.gif` de deep-prep) |
| CV en PDF | `public/cv/CV_Samuel_Martinez_Duran.pdf`, copia del de `~/Documents/CV` en el Mac |
| Imagen para redes | `public/og.png` (1200 × 630, estilo terminal) |
| Redirecciones de las páginas antiguas y caché | `vercel.json` |

Las fuentes (Inter y Geist Mono) vienen de Fontsource y se sirven desde la propia web.

## Publicar

Vercel compila cada push. `main` va a producción en samuelmartinez.dev; cualquier otra rama genera una
vista previa. En el proyecto de Vercel el preset debe ser **Astro** (lo fija `vercel.json`). Ya no hacen
falta las variables `RESEND_API_KEY`, `CONTACT_EMAIL` ni `VITE_GA_MEASUREMENT_ID`: se pueden borrar.

## Decisiones

Las no triviales están en `ADR.md`.
