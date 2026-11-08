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
npm run verify             # astro check + astro build
npm run preview            # sirve dist/ después de compilar
npm run prueba:navegador   # 24 pruebas de comportamiento en Edge o Chrome (ver «Pruebas»)
```

## Dónde está cada cosa

| Qué | Dónde |
|---|---|
| Textos, proyectos, experiencia y cifras | `src/data/perfil.ts` (sale del CV; si cambia uno, cambiar el otro) |
| La página, con su JavaScript (terminal, paleta y atajos) | `src/pages/index.astro` |
| Metadatos, Open Graph, datos estructurados y Vercel Web Analytics | `src/components/Cabeza.astro` |
| Aviso de cookies y carga de GA4 | `src/components/Consentimiento.astro` |
| ID de GA4 y cuándo se carga cada analítica | `src/lib/analitica.ts` |
| Documento HTML común | `src/layouts/Pagina.astro` |
| Privacidad y cookies | `src/pages/privacidad.astro` |
| Página de error | `src/pages/404.astro` |
| Pruebas de navegador | `pruebas/navegador.mjs` |
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

## Analítica

- **Vercel Web Analytics** cuenta visitas sin cookies. Hay que activarlo una vez en el panel de Vercel
  (proyecto → Analytics → Enable); a partir del siguiente despliegue empieza a recoger datos. En local no se
  carga.
- **Google Analytics 4** solo se carga en producción y después de que la persona acepte el aviso de cookies.
  Para activarlo, pon el ID de medición (`G-…`) en `GA_ID_PRODUCCION` de `src/lib/analitica.ts`. Mantén la
  retención de datos de la propiedad en 2 meses, que es lo que dice `/privacidad/`. Si cambia lo que se
  mide, actualiza `/privacidad/` y sube `VERSION_CONSENTIMIENTO`.

## Pruebas

`npm run prueba:navegador` compila una copia con un ID de GA4 falso, la sirve en local y la recorre con el
navegador del sistema (Edge en Windows, Chrome en macOS; otro con `NAVEGADOR=/ruta`). Comprueba el aviso de
cookies, que GA4 no se carga sin aceptar, la paleta, los atajos, el vídeo y que no haya errores. Pasarlas antes
de publicar cambios en los scripts.

## Revisiones

- `docs/REVISION-2026-11-08.md`: coherencia, SEO, GEO, accesibilidad y analítica, con Lighthouse antes y después.

## Decisiones

Las no triviales están en `ADR.md`.
