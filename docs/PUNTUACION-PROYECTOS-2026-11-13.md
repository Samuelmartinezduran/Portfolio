# Puntuación de los proyectos secundarios — 13 de noviembre de 2026

Los cuatro proyectos de `otros.md` se puntuaron con los mismos criterios, a partir de lo que cualquiera
puede comprobar: el repositorio en GitHub, la demo publicada y el vídeo. La decisión está en `ADR.md`
(«Fuera los proyectos secundarios»).

## Criterios

| Criterio | Peso | Qué se mira |
|---|---:|---|
| Relevancia | 20 % | Si encaja con el perfil de la web: desarrollo web con Python y TypeScript. |
| Profundidad técnica | 25 % | Lo que demuestra más allá de una plantilla: arquitectura, datos, integraciones, seguridad. |
| Verificable | 20 % | Si hay código público o una demo que funcione para comprobar lo que se dice. |
| Acabado | 20 % | Higiene del repositorio, pruebas, CI y una demo sin errores. |
| Aporta | 15 % | Si enseña algo que no enseñan ya Deep Prep, el asistente y agenteval. |

Se queda si saca **6 o más**. Como referencia, con los cuatro primeros criterios los tres proyectos
principales sacan entre 7,7 y 8,8.

## Resultado

| Proyecto | Relev. | Prof. | Verif. | Acabado | Aporta | **Nota** | Decisión |
|---|---:|---:|---:|---:|---:|---:|---|
| Agente de citas por WhatsApp | 6 | 6 | 3 | 5 | 2 | **4,6** | Fuera |
| Seguimiento de precios | 7 | 7 | 5 | 3 | 5 | **5,5** | Fuera |
| Tienda online | 6 | 4 | 4 | 6 | 4 | **4,8** | Fuera |
| Bubble Tea España | 6 | 5 | 8 | 5 | 5 | **5,8** | Fuera |

## Por qué

- **Agente de citas por WhatsApp.**
  - Solo se puede ver un vídeo de 57 segundos, titulado «Clinica Demo», con 16 visualizaciones. El código no es público.
  - Repite lo que ya enseña el asistente telefónico, otro agente de reservas, y más completo.
  - Además, es el producto que vende Veldria, y la web no debe relacionar a Samuel con Veldria.
- **Seguimiento de precios** (`atmospheric-analyst---price-tracker`).
  - Lo mejor de los cuatro por dentro: FastAPI, scrapers con Playwright, n8n, PostgreSQL, sesiones con CSRF y límite de intentos, y 11 archivos de pruebas.
  - Pero el repositorio sube `__pycache__` y unos 40 MB de caché de npm (`front/.npm-cache`).
  - Tiene 7 commits en tres días (30/03–01/04/2026) y conserva el nombre de plantilla «Atmospheric Analyst».
  - Su demo en Vercel da «Failed to fetch», porque llama a `localhost:8001`.
- **Tienda online** («Atelier Premium»).
  - La demo carga bien, pero el código no es público, así que no se puede comprobar ni el pago con Stripe ni el panel.
  - Aspecto de plantilla: marca inventada e iconos con emojis.
  - El trabajo de webs para clientes ya lo cuenta la experiencia en Asomados.
- **Bubble Tea España.**
  - Código público y web funcionando: Next.js 16, Drizzle, Leaflet y páginas por ciudad.
  - Sin pruebas ni CI, y sin cambios desde mayo. El repositorio incluye maquetas generadas (`mockups/*/screen.png`).
  - Presenta como «guía de autor» rankings de locales reales.

## Qué haría falta para que vuelvan

- **Seguimiento de precios:**
  - limpiar el repositorio (`.gitignore` para `__pycache__` y `.npm-cache`, y reescribir el historial o empezar uno nuevo);
  - dejar una demo que funcione sin backend propio (datos de ejemplo) o desplegar el backend;
  - quitar el nombre de plantilla.
- **Bubble Tea España:**
  - pruebas de las páginas por ciudad y de la carga de datos;
  - CI;
  - explicar de dónde salen los datos de los locales y cómo se verifican.
