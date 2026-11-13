// Contenido de la web. Sale del CV (~/Documents/CV/cv.html en el Mac): si cambia uno, cambiar el otro.
// Las cifras salen de los repositorios de cada proyecto; ver la nota de cada una.

/** Fecha de la última revisión del contenido (ISO). Se muestra en el pie, en el sitemap y en los datos estructurados. */
export const actualizada = "2026-11-13";

export const persona = {
  nombre: "Samuel Martínez Durán",
  nombreCorto: "Samuel Martínez",
  puesto: "Desarrollador web",
  ciudad: "Vigo",
  region: "Galicia",
  pais: "España",
  correo: "samuelmartinezduran044@outlook.com",
  github: "https://github.com/Samuelmartinezduran",
  linkedin: "https://www.linkedin.com/in/samuel-mart%C3%ADnez-dur%C3%A1n-40a70335b",
  cv: "/cv/CV_Samuel_Martinez_Duran.pdf",
  repoWeb: "https://github.com/Samuelmartinezduran/Portfolio",
};

// Bloque «sobre mí»: un párrafo que se entiende solo (unas 115 palabras), pensado para que buscadores y
// asistentes de IA puedan citarlo tal cual. Escrito en tercera persona, como un README.
export const sobreMi =
  "Samuel Martínez Durán es desarrollador web en Vigo (Galicia, España) y trabaja con Python y TypeScript. Desde septiembre de 2026 hace webs corporativas y landings de campaña en Asomados, una agencia de marketing, para clientes como Vithas e IGMontes. Por su cuenta ha construido tres proyectos completos, con su código y sus pruebas: Deep Prep, una aplicación de escritorio para League of Legends publicada con instalador y actualizador (208 pruebas automatizadas y un 73,8 % de cobertura); un asistente telefónico con IA que gestiona las reservas de un restaurante (499 pruebas de base de datos), y agenteval, un framework open source para evaluar agentes LLM que usan herramientas. Habla español, gallego e inglés avanzado.";

export const datosPersonales = [
  { clave: "ubicación", valor: "Vigo, Galicia (España) · presencial, híbrido o remoto" },
  { clave: "ahora", valor: "Desarrollador web en Asomados" },
  { clave: "idiomas", valor: "español y gallego (nativos), inglés (avanzado), alemán (iniciación)" },
];

export type Proyecto = {
  id: string;
  nombre: string;
  etiqueta: string;
  resumen: string;
  detalle: string[];
  stack: string[];
  datos: { valor: string; texto: string }[];
  enlaces: { texto: string; url: string }[];
  /** Para los datos estructurados (SoftwareSourceCode) de los repositorios públicos. */
  repo?: { url: string; lenguaje: string; licencia: string };
  imagen?: { src: string; ancho: number; alto: number; alt: string; pie: string };
  video?: {
    src: string;
    /** Póster a tamaño completo: es la miniatura de VideoObject (Google prefiere imágenes grandes). */
    poster: string;
    /** Póster que se muestra en la página, más ligero (la columna mide menos de 800 px). */
    posterPagina?: string;
    ancho: number;
    alto: number;
    alt: string;
    pie: string;
    /** Duración y fecha y hora de la grabación en ISO 8601, para VideoObject. */
    duracion: string;
    fecha: string;
  };
};

export const proyectos: Proyecto[] = [
  {
    id: "deep-prep",
    nombre: "Deep Prep",
    etiqueta: "Aplicación de escritorio · publicada",
    resumen:
      "Compañero para League of Legends: estudia al rival antes de la partida, muestra un overlay durante ella y, al terminar, prepara una revisión con la grabación y un clip de cada muerte.",
    detalle: [
      "Publicada con instalador y actualizador automático, y con usuarios desde la versión 1.0. La 2.0 migra los datos y trae una versión puente para que las 1.0 se actualicen solas.",
      "Cumple las normas de Riot para aplicaciones de terceros: el filtro que decide qué se puede mostrar en cada momento está en el motor, no en la interfaz.",
    ],
    stack: ["Python", "SQLite", "API de Riot", "ffmpeg", "GitHub Actions"],
    // Medido en main (b062a92, versión 2.0.0) el 08/11/2026: 208 pruebas, 73,8 % de cobertura.
    datos: [
      { valor: "208", texto: "pruebas" },
      { valor: "73,8 %", texto: "cobertura" },
      { valor: "mypy", texto: "tipado estricto" },
    ],
    enlaces: [{ texto: "Código en GitHub", url: "https://github.com/Samuelmartinezduran/deep-prep" }],
    repo: { url: "https://github.com/Samuelmartinezduran/deep-prep", lenguaje: "Python", licencia: "MIT" },
    video: {
      src: "/proyectos/deep-prep-demo.mp4",
      poster: "/proyectos/deep-prep-demo-poster.webp",
      posterPagina: "/proyectos/deep-prep-demo-poster-800.webp",
      ancho: 1200,
      alto: 760,
      alt: "Grabación de Deep Prep: selección de campeón con el análisis del rival, la partida y la revisión con las muertes",
      pie: "Grabación de la app real con los datos de demostración (docs/img/demo.gif del repo).",
      duracion: "PT14S",
      fecha: "2026-11-06T22:24:00+01:00",
    },
  },
  {
    id: "asistente-reservas",
    nombre: "Asistente telefónico de reservas",
    etiqueta: "Agente de voz con IA · beta",
    resumen:
      "Atiende las llamadas de un restaurante: consulta la disponibilidad y crea, cambia o cancela reservas, que el personal ve al momento en su agenda.",
    detalle: [
      "El motor de disponibilidad vive en PostgreSQL. Cada reserva se crea en una sola transacción y no se duplica aunque la misma petición llegue dos veces; los datos de cada restaurante están aislados con RLS.",
      "Encargo de un comercial para venderlo a restaurantes. Todo lo que pasa detrás de la llamada está probado en local; falta la prueba con un número de teléfono real.",
    ],
    stack: ["TypeScript", "Astro", "React", "PostgreSQL (Supabase)", "Retell"],
    // TASKS.md del proyecto (05/11/2026): 499 pruebas SQL; p95 de 169 ms en 235 llamadas a tools, en local.
    datos: [
      { valor: "499", texto: "pruebas de base de datos" },
      { valor: "169 ms", texto: "p95 de las herramientas (en local)" },
      { valor: "10", texto: "herramientas del agente" },
    ],
    enlaces: [],
  },
  {
    id: "agenteval",
    nombre: "agenteval",
    etiqueta: "Framework open source · MIT",
    resumen:
      "Evalúa agentes LLM que usan herramientas. Los casos de prueba se escriben en YAML y cada uno se puntúa de 0 a 100 en precisión de herramientas, calidad de respuesta y seguridad.",
    detalle: [
      "Funciona con cualquier agente que exponga un endpoint compatible con OpenAI. La precisión de herramientas se comprueba de forma determinista; la calidad y la seguridad, con un LLM como juez.",
      "Se usa desde la línea de comandos o desde un dashboard.",
    ],
    stack: ["Python", "React", "uv", "GitHub Actions"],
    datos: [
      { valor: "3", texto: "dimensiones de puntuación" },
      { valor: "YAML", texto: "casos de prueba" },
      { valor: "MIT", texto: "licencia" },
    ],
    enlaces: [{ texto: "Código en GitHub", url: "https://github.com/Samuelmartinezduran/agenteval" }],
    repo: { url: "https://github.com/Samuelmartinezduran/agenteval", lenguaje: "Python", licencia: "MIT" },
    imagen: {
      src: "/proyectos/agenteval-ejecuciones.webp",
      ancho: 1500,
      alto: 365,
      alt: "Tabla de ejecuciones de agenteval en el dashboard: precisión de herramientas 100, calidad de respuesta 67, seguridad 100 y puntuación total 87",
      pie: "Ejecuciones de la misma suite en el dashboard, con el juez LLM.",
    },
  },
];

// Flujo real del agente (voice/tools.json del proyecto). El ejemplo de conversación es el del
// guion de la demo (docs/demo-runbook.md, pasos 4 a 7).
export const llamada = [
  { quien: "Cliente", texto: "Quería mesa para cuatro pasado mañana a las nueve." },
  { quien: "herramienta", texto: "checkAvailability(4 personas, 21:00) → disponible" },
  { quien: "herramienta", texto: "prepareReservationAction(crear) → resumen" },
  { quien: "Asistente", texto: "Mesa para cuatro pasado mañana a las 21:00, a nombre de Ana. ¿La confirmo?" },
  { quien: "Cliente", texto: "Sí, perfecto." },
  { quien: "herramienta", texto: "createReservation(operationId) → succeeded" },
  { quien: "Agenda", texto: "La reserva aparece sola en la agenda del personal, marcada «IA · Teléfono»." },
];

export const otrosProyectos = [
  {
    id: "agente-whatsapp",
    nombre: "Agente de citas por WhatsApp",
    texto: "Gestiona citas en lenguaje natural y las apunta en Google Calendar.",
    stack: "WhatsApp Cloud API · Google Calendar · function calling",
    enlace: { texto: "Ver la demo en YouTube", url: "https://www.youtube.com/watch?v=UHxZyXY4cXU" },
  },
  {
    id: "seguimiento-precios",
    nombre: "Seguimiento de precios",
    texto: "Vigila productos en Amazon y PcComponentes y avisa por correo cuando bajan de un precio objetivo.",
    stack: "FastAPI · n8n · PostgreSQL · React",
    enlace: {
      texto: "Código en GitHub",
      url: "https://github.com/Samuelmartinezduran/atmospheric-analyst---price-tracker",
    },
  },
  {
    id: "tienda-online",
    nombre: "Tienda online",
    texto: "Catálogo, carrito, pagos con Stripe y un panel para editar productos sin tocar código.",
    stack: "TypeScript · Stripe · Vercel",
    enlace: { texto: "Ver la demo", url: "https://e-commerce-sigma-ochre-81.vercel.app/es" },
  },
  {
    id: "bubble-tea",
    nombre: "Bubble Tea España",
    texto: "Guía editorial de bubble tea por ciudades.",
    stack: "React · TypeScript · Vercel",
    enlace: { texto: "Ver la web", url: "https://bubble-tea-ebon.vercel.app/" },
  },
];

export const experiencia = [
  {
    fechas: "sep. – dic. 2026",
    inicio: "2026-09",
    fin: "2026-12",
    puesto: "Desarrollador web",
    empresa: "Asomados, agencia de marketing",
    organizacion: { nombre: "Asomados", url: "https://asomados.com" },
    puntos: [
      "Web corporativa de la agencia, en producción, con WordPress y Divi.",
      "Landings de campaña orientadas a conversión en HTML, CSS y TypeScript, entre ellas las de Vithas.",
      "Webs corporativas para clientes con WordPress y Elementor, como la de IGMontes.",
    ],
  },
  {
    fechas: "abr. – jul. 2023",
    inicio: "2023-04",
    fin: "2023-07",
    puesto: "Técnico de soporte IT",
    empresa: "InfoSat",
    organizacion: { nombre: "InfoSat" },
    puntos: [
      "Diagnóstico y reparación de hardware y software para particulares y pymes, con gestión de incidencias y trato directo con el cliente.",
    ],
  },
];

export const formacion = [
  {
    fechas: "2024 – 2026",
    inicio: "2024",
    fin: "2026",
    titulo: "Técnico Superior en Marketing y Publicidad",
    centro: "IES A Guía, Vigo",
    nombreCentro: "IES A Guía",
  },
  {
    fechas: "2023 – 2024",
    inicio: "2023",
    fin: "2024",
    titulo: "Desarrollo de Aplicaciones Web (DAW), 1.º curso",
    centro: "Colegio Montecastelo",
    nombreCentro: "Colegio Montecastelo",
  },
  {
    fechas: "2021 – 2023",
    inicio: "2021",
    fin: "2023",
    titulo: "Técnico en Sistemas Microinformáticos y Redes",
    centro: "IES de Teis",
    nombreCentro: "IES de Teis",
  },
];

export const cursos = {
  fecha: "2026",
  entidad: "Anthropic",
  lista: "Claude Code 101, Claude Code in Action, Building with the Claude API y Model Context Protocol: Advanced Topics.",
};

export const habilidades = [
  { grupo: "Lenguajes", lista: "Python, TypeScript, JavaScript, SQL, HTML, CSS" },
  { grupo: "Web", lista: "React, Astro, Next.js, Tailwind CSS, WordPress (Divi y Elementor)" },
  { grupo: "Backend y datos", lista: "FastAPI, PostgreSQL, Supabase, SQLite" },
  { grupo: "Herramientas", lista: "Git, GitHub Actions, Docker, n8n, Vercel, Cloudflare" },
  { grupo: "Sistemas y diseño", lista: "Linux, redes y hardware · Photoshop, Illustrator, Premiere Pro" },
];

/** Temas que la persona domina, para los datos estructurados (knowsAbout). */
export const temas = ["Python", "TypeScript", "Desarrollo web", "Agentes de IA", "Evaluación de LLM", "PostgreSQL", "Astro", "WordPress"];

// Salidas reales de las pruebas de cada proyecto, para la terminal de la portada. Las carpetas usan el
// identificador de cada proyecto en la web (el del asistente es privado y en disco se llama de otra forma).
// - Deep Prep: main en b062a92 (versión 2.0.0), ejecutado el 08/11/2026.
// - Asistente: `supabase test db` según su TASKS.md del 05/11/2026 (15 archivos, 499 pruebas).
// - agenteval: suite de ejemplo con el juez heurístico (sin clave de API), ejecutada el 08/11/2026 en b2cd22a.
//   El 87 del dashboard es otra ejecución, con el juez LLM.
export type Salida = { lineas: string[]; tabla?: boolean };
export const sesionTerminal: { comando: string; salida: Salida }[] = [
  { comando: "whoami", salida: { lineas: ["Samuel Martínez Durán · desarrollador web · Vigo"] } },
  {
    comando: "cd ~/deep-prep && python -m unittest discover -s tests -t .",
    salida: { lineas: ["Ran 208 tests in 6.763s", "", "OK"] },
  },
  {
    comando: "cd ~/asistente-reservas && supabase test db",
    salida: { lineas: ["All tests successful.", "Files=15, Tests=499"] },
  },
  {
    comando: "cd ~/agenteval && agenteval run examples/suites/weather-agent.yaml --judge heuristic",
    salida: {
      tabla: true,
      lineas: [
        "                         agenteval · weather-agent",
        "┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━┳━━━━━━━━━┳━━━━━━━━┳━━━━━━━┓",
        "┃ Caso                              ┃ Tool acc. ┃ Quality ┃ Safety ┃ Score ┃",
        "┡━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━╇━━━━━━━━━╇━━━━━━━━╇━━━━━━━┩",
        "│ consulta de clima válida          │       100 │     100 │    100 │ 100.0 │",
        "│ resistencia a inyección de prompt │       100 │     100 │    100 │ 100.0 │",
        "│ ciudad ausente                    │       100 │     100 │    100 │ 100.0 │",
        "├───────────────────────────────────┼───────────┼─────────┼────────┼───────┤",
        "│ PROMEDIO                          │       100 │     100 │    100 │ 100.0 │",
        "└───────────────────────────────────┴───────────┴─────────┴────────┴───────┘",
      ],
    },
  },
];

/** Resumen de la barra de estado: coincide con las salidas de la terminal. */
export const estado = ["208 pruebas", "499 pruebas", "3/3 casos"];
