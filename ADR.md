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
- **Decision:** `/servicios/*`, `/desarrollo-web-vigo/` y `/seo-local-vigo/` redirigen de forma permanente a la portada (`vercel.json`; Vercel responde 308, que Google trata como un 301). El patrón de `/servicios` es `/servicios/(.*)`: el primero, `/servicios/:ruta*`, no casaba con las URL con barra final y daba 404 (corregido el 08/11/2026 al publicar).
- **Reason:** Estaban indexadas; una redirección conserva las visitas y evita 404 mientras Google las retira.
- **Source:** Agent assumption

## CV en la web
- **Decision:** La web enlaza el CV en PDF (`public/cv/`), que incluye el teléfono.
- **Reason:** Es lo primero que pide quien selecciona. El teléfono no aparece en la página, solo en el PDF.
- **Source:** Agent assumption, confirmada por el usuario el 13/11/2026 («sí, puede llevar mi teléfono el CV»)

## Tres propuestas de diseño en /opciones/ (temporal)
- **Decision:** Se añaden tres propuestas completas con los mismos datos: A «Proyectos vivos» (vídeo de Deep Prep, llamada del asistente que se escribe sola, evaluación de agenteval que se ejecuta), B «Editorial» (nombre enorme e índice de proyectos con vista previa que sigue al cursor) y C «Terminal» (terminal con las salidas reales de las pruebas, paleta de comandos con Ctrl/Cmd+K, proyectos como archivos). Comparten `src/components/Cabeza.astro` y el layout `src/layouts/Lienzo.astro`, llevan `noindex` y no están en el sitemap. La portada actual sigue en `/` hasta que el usuario elija; entonces la elegida pasa a `/` y se borran las demás y `Lienzo.astro`.
- **Reason:** El usuario vio la primera versión «extremadamente sosa» y pidió desarrollar las tres direcciones propuestas para compararlas.
- **Source:** User instruction (08/11/2026)
- **Nota:** Las tres usan algo de JavaScript (animaciones, vista previa, paleta). Sin JavaScript o con movimiento reducido se ve todo el contenido de golpe.

## Dirección Terminal
- **Decision:** La portada es la propuesta C («Terminal»): terminal que teclea las pruebas reales de Deep Prep, el asistente y agenteval; paleta de comandos con Ctrl/Cmd+K y atajos; proyectos como `README.md` en pestañas, trayectoria como `git log` y habilidades como `.json`. El contacto toma de la propuesta B el «Escríbeme→» enorme. Se borran las propuestas A y B, `src/layouts/Base.astro` y `src/pages/opciones/`; queda `src/layouts/Pagina.astro`. Sustituye a «Tres propuestas de diseño en /opciones/ (temporal)» y matiza «Reglas visuales de Veldria con acento naranja» (ahora en oscuro, con colores de sintaxis) y «Astro en lugar de Vite…» (la página lleva un script propio para la terminal, la paleta y los atajos).
- **Reason:** Al usuario le gusta cómo impacta y el estilo de la C, ve la A muy básica y de la B le encanta el «Escríbeme».
- **Source:** User instruction (08/11/2026)

## Sin mensaje de búsqueda de empleo en el cierre
- **Decision:** El contacto no dice «Busco un puesto de desarrollador desde enero de 2027»; la disponibilidad queda como dato en la barra de estado («disponible · enero 2027»).
- **Reason:** Al usuario le sonaba desesperado.
- **Source:** User instruction (08/11/2026)

## Vídeo de Deep Prep en lugar de captura
- **Decision:** El archivo de Deep Prep muestra la grabación de la app (`public/proyectos/deep-prep-demo.mp4`, 0,7 MB, convertida desde `docs/img/demo.gif` de deep-prep, de 3,5 MB) en bucle, sin sonido y con póster.
- **Reason:** Enseña el producto funcionando: selección de campeón, partida y revisión.
- **Source:** Agent assumption


## Revisión de coherencia, SEO y GEO
- **Decision:** Se revisan contenido, accesibilidad, SEO técnico y visibilidad en buscadores de IA; el detalle y las puntuaciones están en `docs/REVISION-2026-11-08.md`. Cambios de contenido: un archivo `sobre-mi.md` con un párrafo de 145 palabras que se entiende solo (para buscadores y asistentes de IA) y una ficha; un archivo `otros.md` que explica en texto los cuatro proyectos que antes solo eran nombres en la terminal; la salida de agenteval es la real de su suite de ejemplo con el juez heurístico (3/3 casos) y la barra de estado dice «3/3 casos» en lugar de «score 87», que era otra ejecución (juez LLM, la que se ve en la captura del dashboard); la latencia de 169 ms indica que se midió en local; todas las órdenes de la terminal usan `cd ~/<proyecto> &&`. SEO: título de 49 caracteres y descripción de 149, `og:site_name`, `og:image:alt`, iconos PNG, precarga de las dos fuentes visibles, `lastmod` en el sitemap, datos estructurados `ProfilePage`, `Person` (con `worksFor`, `alumniOf`, `knowsLanguage`), `SoftwareSourceCode` y `VideoObject`, y `llms.txt` con las cifras y su procedencia.
- **Reason:** El usuario pidió una revisión completa de coherencia y optimizar SEO y GEO.
- **Source:** User instruction (08/11/2026); Agent assumption (cambios concretos)

## Accesibilidad y estabilidad de la portada
- **Decision:** Contenido dentro de `<main>` y enlace para saltar a él; las pestañas son una `<nav>` de enlaces con `aria-current` (antes eran enlaces con `role="listitem"`, que les quitaba el papel de enlace); la paleta es un combobox con `aria-activedescendant`; los atajos de una tecla se pueden desactivar desde la paleta (WCAG 2.1.4); el cursor deja de parpadear a los 8 s (WCAG 2.2.2); el vídeo se carga al llegar, se pausa con un botón y no arranca solo con movimiento reducido; el gris de comentarios y rutas pasa de `#6B7280` (3,9:1) a `#858C99` (5,5:1). La terminal reserva desde el principio el sitio de lo que va a escribir (la orden completa invisible bajo la que se teclea y `visibility: hidden` en lo pendiente), lo que deja el CLS en 0 (antes 0,205 en móvil), y teclea más rápido (unos 9 s en total).
- **Reason:** Lighthouse marcaba contraste, roles ARIA y CLS; el resto son criterios WCAG que la animación y los atajos tocaban.
- **Source:** Agent assumption

## Analítica: Vercel Web Analytics y GA4 con consentimiento
- **Decision:** Dos capas. Vercel Web Analytics (paquete `@vercel/analytics`, componente de Astro) cuenta visitas sin cookies en cualquier compilación hecha en Vercel; en local no se carga porque su script daría 404. GA4 se carga solo en producción, solo con un ID en `src/lib/analitica.ts` y solo después de aceptar en el aviso de cookies (`src/components/Consentimiento.astro`): «Aceptar» y «Rechazar» pesan lo mismo, la elección dura 12 meses o hasta que cambie `VERSION_CONSENTIMIENTO`, se puede cambiar desde el pie o la paleta, y al retirarla se borran las cookies `_ga` y se recarga sin GA4. GA4 se configura con modo de consentimiento (solo `analytics_storage` concedido), sin señales de Google ni personalización de anuncios. Eventos propios: `contacto`, `abrir_paleta`, `comando` y `saltar_animacion`; las descargas del CV y los enlaces externos los recoge la medición mejorada de GA4. La página `/privacidad/` lo explica y solo habla de GA4 cuando hay ID. Sustituye a «Sin Google Analytics».
- **Reason:** El usuario pidió instalar GA4 y ver Vercel Analytics. En España las cookies de analítica necesitan consentimiento previo (art. 22.2 LSSI y guía de cookies de la AEPD); Vercel Web Analytics no usa cookies ni identifica a nadie, así que mide a todo el mundo y GA4 añade el detalle de quien acepta. En el plan Hobby, Vercel Web Analytics da 50 000 eventos al mes y no permite eventos propios, por eso los eventos van a GA4.
- **Source:** User instruction (GA4 y Vercel Analytics); Agent assumption (consentimiento, configuración y eventos)
- **Hecho el 08/11/2026:** no había ninguna propiedad (la variable de la web anterior estaba vacía), así que se creó con la cuenta personal de Google de Samuel: cuenta «Samuel Martínez Durán» (415446093), propiedad «samuelmartinez.dev» (563249651), zona horaria de España y euros, flujo web `G-2Z99X3GDBT` con medición mejorada. Términos aceptados para España (Google Ireland Limited, con los términos de tratamiento de datos del RGPD). Sin compartir datos con Google (las cuatro opciones desactivadas), señales de Google desactivadas y conservación de 2 meses tanto de eventos como de usuario, que es lo que dice `/privacidad/`. Web Analytics ya estaba activado en Vercel.

## Pruebas de navegador
- **Decision:** `npm run prueba:navegador` (`pruebas/navegador.mjs`, con `puppeteer-core` y el Edge o Chrome del sistema) compila una copia de producción con un ID de GA4 falso (`GA_ID_PRUEBA`), la sirve en local y comprueba 24 comportamientos: el aviso de cookies y que GA4 no se carga sin aceptar, retirar el consentimiento, la paleta, los atajos y su desactivación, el vídeo, el final de la terminal y que no haya errores en la consola.
- **Reason:** El aviso de cookies y la paleta tienen lógica que no se ve en una captura; si se rompe, debe saberse antes de publicar.
- **Source:** Agent assumption

## Cabeceras de seguridad y CV sin indexar
- **Decision:** `vercel.json` añade `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` y `Permissions-Policy` a todo, y `X-Robots-Tag: noindex` al CV en PDF (que lleva el teléfono). HSTS ya lo pone Vercel. No se añade Content-Security-Policy por ahora: GA4 y Vercel Analytics necesitan fuentes externas y una política mal ajustada rompería la analítica sin avisar.
- **Reason:** Cabeceras básicas que faltaban, y evitar que el teléfono del CV aparezca en los resultados de búsqueda.
- **Source:** Agent assumption

## Sin fecha de disponibilidad en la web
- **Decision:** Se quita «disponible · enero 2027» de la barra de estado, la fila «disponible» de la ficha, la última frase de «Sobre mí» («puede incorporarse a un equipo en enero de 2027») y la frase equivalente de `llms.txt`, junto con el campo `persona.disponible` y los estilos `.estado__der`, que se quedaron sin uso. Sustituye a «la disponibilidad va solo como dato».
- **Reason:** El usuario pidió que la web no diga abiertamente que busca trabajo. Al lado de «Desarrollador web en Asomados», una fecha de incorporación lo anuncia ante cualquiera, también ante la empresa actual.
- **Source:** User instruction

## Sin «lo enseño en una entrevista»
- **Decision:** El comentario de los proyectos sin enlace público pasa de «// repositorio privado: lo enseño en una entrevista» a «// repositorio privado: lo enseño en una llamada».
- **Reason:** El usuario probablemente se queda en Asomados y no quiere ninguna referencia a buscar trabajo. Hablar de entrevistas lo anunciaba igual que la fecha de disponibilidad. «En una llamada» sirve a cualquiera, también a clientes de fuera de Vigo; «en privado» repetía «privado».
- **Source:** User instruction (cambiar la frase); Agent assumption («en una llamada»)

## Caché
- **Decision:** Dos capas, sin service worker. En el navegador, `vercel.json` da `public, max-age=31536000, immutable` a `/_astro/*` (CSS y fuentes, con hash en el nombre) y `public, max-age=86400, stale-while-revalidate=604800` a `/proyectos/*` (vídeo y capturas, sin hash). Lo demás (HTML, `og.png`, favicon, CV, `llms.txt`, sitemap) se queda con lo que pone Vercel, `public, max-age=0, must-revalidate`: el navegador pregunta en cada visita con el ETag y, si nada ha cambiado, recibe un 304 vacío. En el CDN, Vercel guarda una copia de todo en cada nodo y la vacía en cada despliegue, así que un cambio se ve en segundos (unos 15 al cambiar la frase de la entrevista). Comprobado en producción el 10/11/2026: HTML con Brotli, `X-Vercel-Cache: HIT` en la portada, 304 al revalidar y 206 al pedir el vídeo por trozos. El script de Vercel Analytics lleva 31 días, que pone Vercel.
- **Reason:** Lo que tiene hash puede guardarse un año porque un cambio genera otro nombre y el HTML ya pide el nuevo. El HTML no puede llevar hash (su dirección es fija), así que se revalida siempre para que un despliegue se vea al momento. Los archivos de `/proyectos/` se pesan más que el HTML y casi nunca cambian: un día de caché ahorra descargarlos en cada visita y `stale-while-revalidate` los actualiza en segundo plano. Consecuencia: **al sustituir un archivo de `public/proyectos/`, hay que cambiarle el nombre**, porque con el mismo nombre quien ya entró puede ver el viejo hasta un día, y una visita más si vuelve en la semana siguiente.
- **Source:** Agent assumption. Las dos reglas vienen de la web anterior en Vite (commit 19cb69f, 18/09/2026, con `/assets/*` y todas las imágenes) y se adaptaron a las rutas de Astro al rehacerla (e3cea86, 08/11/2026). Las imágenes de fuera de `/proyectos/`, como `og.png` y el favicon, dejaron de tener un día de caché.

## Sin el grupo «IA» en las habilidades
- **Decision:** Se quita de `habilidades.json` (y, con ello, de `llms.txt`) la línea «IA: API de Anthropic y de OpenAI, function calling, MCP, Ollama, Retell». Las demás habilidades, los proyectos y `knowsAbout` de los datos estructurados se quedan como estaban.
- **Reason:** El usuario pidió eliminarla.
- **Source:** User instruction (13/11/2026)

## Sin «e IA» ni «viene de sistemas y marketing digital»
- **Decision:** La presentación dice «Python y TypeScript» en lugar de «Python, TypeScript e IA» (portada, descripción para buscadores y redes, `llms.txt`) y el párrafo de `sobre-mi.md` pasa de «Python, TypeScript e inteligencia artificial» a «Python y TypeScript» y pierde la frase «Viene de sistemas (SMR) y de marketing digital, así que se mueve bien entre lo técnico y el negocio». El párrafo queda en 114 palabras, algo por debajo de las 134-167 que recomienda la guía GEO; manda la preferencia del usuario. El CV en PDF de `public/cv/` se regenera sin la fila «IA» de Habilidades (el original, `cv.html`, está en `~/Documents/CV` del Mac).
- **Reason:** Al usuario no le gusta «e IA» ni esa frase, ni en la web ni en LinkedIn, y pidió quitar la fila de IA también del CV.
- **Source:** User instruction (13/11/2026)
