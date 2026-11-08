## Dominio canónico de producción
- **Decision:** Usar `https://samuelmartinez.dev` como origen de canónicas, sitemap, robots, datos estructurados y enlaces públicos.
- **Reason:** Consolidar la indexación y las señales de autoridad en el dominio propio en lugar del subdominio de Vercel.
- **Source:** User instruction

## Enfoque SEO local
- **Decision:** Priorizar pymes de servicios de Vigo y Galicia con desarrollo web y SEO local como oferta principal.
- **Reason:** Es el mercado, cliente ideal y servicio de captación definidos para la web.
- **Source:** User instruction

## Arquitectura de páginas locales
- **Decision:** Añadir páginas indexables de desarrollo web y SEO local en Vigo, conectadas con los servicios existentes.
- **Reason:** Cubren intenciones comerciales locales distintas sin convertir las páginas nacionales en duplicados geográficos.
- **Source:** User instruction

## Mensaje principal del portfolio
- **Decision:** Presentar desarrollo web y SEO local para negocios de Vigo como oferta principal, y explicar los proyectos mediante usos concretos y lenguaje sencillo.
- **Reason:** El usuario pidió mejorar el atractivo de los textos y aprobó esta propuesta tras revisarla.
- **Source:** User instruction

## Presentación de los proyectos
- **Decision:** Identificar los cinco trabajos publicados como proyectos propios o demostraciones y mostrar el estado de cada uno.
- **Reason:** El usuario confirmó que aún no hay clientes; las fichas deben explicar qué se puede comprobar sin atribuir encargos ni resultados.
- **Source:** User instruction

## Dirección visual del portfolio
- **Decision:** Conservar la paleta oscura e Inter, y simplificar botones y tarjetas retirando degradados, brillos, inclinación y movimiento magnético decorativo.
- **Reason:** Dar prioridad a las capturas y al contenido propio para reducir la apariencia de plantilla.
- **Source:** User instruction


## Reforma editorial de estudio creativo
- **Decision:** Rediseñar la home y las seis páginas de servicios y locales con composiciones asimétricas, numeración, marcos y capturas reales, conservando Inter y la paleta existente.
- **Reason:** El usuario pidió reducir huecos y aportar personalidad, y eligió una estética de estudio creativo para toda la web. Esta decisión sustituye la dirección visual anterior en lo relativo a composición y movimiento decorativo.
- **Source:** User instruction

## Movimiento visible y equilibrado
- **Decision:** Usar Motion y CSS existentes para entradas escalonadas, filtros, interacciones, motivo animado y parallax limitado en escritorio; mantener HTML inicial visible y una versión estática con movimiento reducido.
- **Reason:** Aportar animación reconocible sin bloquear la lectura, la navegación ni la carga inicial, siguiendo el plan aprobado.
- **Source:** User instruction

## Distribución de proyectos publicados
- **Decision:** Destacar Bubble Tea y presentar la tienda como segundo bloque ancho en el filtro Todos; mostrar la demo sin vídeo en una ficha compacta.
- **Reason:** Las cinco fichas requieren una distribución sin una columna vacía antes de la demostración pendiente, conservando su información y enlaces.
- **Source:** Agent assumption

## Portfolio para buscar empleo
- **Decision:** La web deja de presentar servicios de desarrollo web y SEO local para negocios de Vigo y pasa a ser un portfolio para buscar empleo de desarrollador desde enero de 2027. Contenido: Deep Prep, el asistente telefónico de reservas y agenteval como proyectos principales; el resto en una lista; experiencia, formación, habilidades y contacto, todo tomado del CV. Sustituye a «Enfoque SEO local», «Arquitectura de páginas locales», «Mensaje principal del portfolio», «Presentación de los proyectos» y «Distribución de proyectos publicados».
- **Reason:** El usuario busca trabajo en enero de 2027, al acabar sus prácticas, y la oferta de servicios se solapaba con Veldria, que no debe aparecer.
- **Source:** User instruction (08/11/2026)

## Astro en lugar de Vite con prerender propio
- **Decision:** La web pasa de React 19 + Vite con un prerender propio (`scripts/prerender.mjs`, cinco entradas HTML) a Astro 7 en modo estático, sin React ni JavaScript en el navegador. Se eliminan Tailwind, Motion, lucide-react, Express y Resend.
- **Reason:** El usuario pidió cambiar de framework. Astro genera el HTML de cada página sin pasos manuales (antes, añadir una ruta exigía tocar tres sitios y olvidar uno daba 404 sin error) y es lo que ya usa en sus otros proyectos.
- **Source:** User instruction (cambiar el framework); Agent assumption (Astro)

## Sin formulario de contacto
- **Decision:** El contacto es un enlace de correo, LinkedIn, GitHub y el CV en PDF. Se eliminan `api/contact.ts` y el servidor Express con Resend.
- **Reason:** Quien selecciona personal escribe por correo o LinkedIn; el formulario añadía una función en servidor y una clave de API que mantener.
- **Source:** Agent assumption

## Sin Google Analytics
- **Decision:** Se elimina la carga de GA4.
- **Reason:** En producción no tenía ID configurado (`VITE_GA_MEASUREMENT_ID` vacío), así que no medía nada. Si hace falta medir, añadirlo de nuevo con una variable `PUBLIC_` de Astro.
- **Source:** Agent assumption

## Sin foto
- **Decision:** No hay retrato en la página, en el favicon ni en los datos estructurados. El favicon es una «S» en grafito con una línea naranja.
- **Reason:** El usuario pidió retirar su foto, al menos por ahora.
- **Source:** User instruction (08/11/2026)

## Reglas visuales de Veldria con acento naranja
- **Decision:** Se aplica el sistema de Veldria (Inter y Geist Mono, grafito y blanco, retícula de 8 px, líneas finas, esquinas de 0 a 4 px, sin degradados ni sombras) con el naranja `#FF5F1F` como único acento y una variante tinta `#C2410C` para texto y botones sobre blanco. Sustituye a «Dirección visual del portfolio», «Reforma editorial de estudio creativo» y «Movimiento visible y equilibrado». Detalle en `DESIGN.md`.
- **Reason:** El usuario eligió las reglas de Veldria y conservar su naranja para que la web sea suya y no parezca de Veldria.
- **Source:** User instruction (08/11/2026)

## Redirecciones de las páginas de servicios
- **Decision:** `/servicios/*`, `/desarrollo-web-vigo/` y `/seo-local-vigo/` redirigen con 301 a la portada (`vercel.json`).
- **Reason:** Estaban indexadas; una redirección conserva las visitas y evita 404 mientras Google las retira.
- **Source:** Agent assumption

## CV en la web
- **Decision:** La web enlaza el CV en PDF (`public/cv/`), que incluye el teléfono.
- **Reason:** Es lo primero que pide quien selecciona. El teléfono no aparece en la página, solo en el PDF.
- **Source:** Agent assumption, pendiente de confirmar por el usuario
