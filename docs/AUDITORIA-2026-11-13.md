# Auditoría de analítica, Search Console y rendimiento — 13 de noviembre de 2026

Cinco días después de publicar la web nueva (08/11). Fuentes:
- GA4: propiedad 563249651;
- Search Console: propiedad de dominio;
- Vercel Web Analytics;
- Lighthouse 12.8.2 sobre producción, con Edge en móvil.

Las decisiones que salen de aquí están en `ADR.md`.

## Datos

| | Vercel Web Analytics (todas las visitas) | GA4 (solo quien acepta las cookies) |
|---|---|---|
| Visitantes / usuarios | 32 | 6 |
| Vistas de página | 63 (portada 32 visitantes, `/privacidad/` 2) | 18, todas en la portada |
| Procedencia | Sin referentes | 13 sesiones directas y 1 de un asistente de IA |
| Países | España 78 %, EE. UU. 22 % | España 5, sin definir 1 (la prueba del 08/11 con Edge) |
| Dispositivos | Ordenador 56 %, móvil 44 % | Chrome 3, Edge 1, Opera 1, Safari 1 |

- **Eventos en GA4:** solo los automáticos (`page_view`, `session_start`, `first_visit`, `user_engagement` y `scroll`). Ninguno propio ni de medición mejorada: ni `contacto`, `abrir_paleta`, `comando` o `saltar_animacion`, ni descargas o clics salientes. El código los envía (`window.medir` en `index.astro`); con 6 usuarios todavía no se han dado.
- **Search Console, desde el 17/09:** 0 clics y 2 impresiones de la portada, posición media 5. Sin consultas visibles, porque Google oculta las de muy poco volumen. 0 enlaces externos. Core Web Vitals sin datos de campo, por el poco tráfico.
- **Indexación:** 1 página indexada y 9 sin indexar:
  - 5 «descubiertas, sin indexar»: las antiguas `/servicios/*`, `/desarrollo-web-vigo/` y `/seo-local-vigo/`, que ahora redirigen con 308;
  - 1 «alternativa con canónica»: `/servicios/landing-pages-cro/`;
  - 3 redirecciones: `www` y `http`.
  - Todo es lo esperado.
- **Sitemap:** leído el 08/11, sin errores.

## Hallazgos

| Prioridad | Hallazgo | Estado |
|---|---|---|
| Alta | **Google tenía indexada la portada antigua** («Desarrollo web y SEO local para negocios de Vigo»). La rastreó el 08/11 a las 21:17, antes de publicar la nueva. La prueba en vivo de la actual: se puede indexar, y la página de perfil y el vídeo son válidos. | Reindexación solicitada el 13/11 |
| Media | GA4 sin eventos clave. | `contacto` y `file_download` marcados el 13/11 |
| Media | GA4 sin vincular a Search Console. | Vinculado el 13/11; la colección «Search Console» ya está publicada en los informes |
| Media | Ningún enlace externo hacia la web. | Desde el 13/11 enlazan el LinkedIn y el GitHub de Samuel; falta que Google lo registre. YouTube sigue pendiente (ver `REVISION-2026-11-08.md`) |
| Media | GA4 ve a 1 de cada 5 visitantes. | No es un fallo: es el aviso de cookies. Volumen en Vercel; comportamiento en GA4 |
| Baja | Lighthouse SEO 92: el enlace «Más información» del aviso de cookies no describe su destino. | Cambiado a «Política de privacidad» |
| Baja | Póster del vídeo de Deep Prep de 1200 × 760 (54 KB) mostrado a unos 380 px en móvil. | La página usa uno de 800 px (22 KB); el de 1200 px queda como miniatura de `VideoObject` |
| Baja | Filtro «Internal Traffic» de GA4 en modo prueba y sin reglas: no excluye nada. Las visitas de Samuel desde el móvil cuentan; las del PC no, porque una extensión bloquea `gtag.js`. | Sin cambios: su IP doméstica no es fija y, con este volumen, no compensa |
| Baja | 22 % de EE. UU. en Vercel. | Seguramente robots o vistas previas de enlaces; sin acción |

## Lo que está bien

- **Lighthouse en móvil sobre producción:** rendimiento, accesibilidad y buenas prácticas a 100. LCP 1,8 s, CLS 0,001 y TBT 30 ms.
- **Redirecciones:** las páginas antiguas, `www` y `http` llevan a la canónica.
- **Cabeceras de seguridad:** `nosniff`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy` y HSTS.
- **Rastreo:** `robots.txt`, sitemap con `lastmod`, `llms.txt`, y el CV con `noindex`.
- **Datos estructurados válidos:** `Person`, `WebSite`, `ProfilePage`, dos `SoftwareSourceCode` y `VideoObject`.
- **GA4 coincide con `/privacidad/`:** solo se carga con consentimiento, conserva datos 2 meses, tiene Google signals desactivado y la medición mejorada completa.

## Qué mirar en la próxima revisión

1. Que Search Console muestre la portada nueva: en la inspección de URL, el título «Samuel Martínez Durán · Desarrollador web en Vigo» y las mejoras «Página de perfil» y «Vídeos».
2. Que aparezcan los primeros `contacto` y `file_download` en los eventos clave de GA4.
3. Los enlaces externos en Search Console, sobre todo LinkedIn y GitHub.
