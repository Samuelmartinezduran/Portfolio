// Contenido de la web. Sale del CV (~/Documents/CV/cv.html en el Mac): si cambia uno, cambiar el otro.
// Las cifras salen de los repositorios de cada proyecto; ver la nota de cada una.

export const persona = {
  nombre: "Samuel Martínez Durán",
  nombreCorto: "Samuel Martínez",
  puesto: "Desarrollador web",
  ciudad: "Vigo",
  correo: "samuelmartinezduran044@outlook.com",
  github: "https://github.com/Samuelmartinezduran",
  linkedin: "https://www.linkedin.com/in/samuel-mart%C3%ADnez-dur%C3%A1n-40a70335b",
  cv: "/cv/CV_Samuel_Martinez_Duran.pdf",
  repoWeb: "https://github.com/Samuelmartinezduran/Portfolio",
};

export const ficha = [
  { dato: "Ahora", valor: "Desarrollador web en Asomados, agencia de marketing" },
  { dato: "Desde enero de 2027", valor: "Disponible para un puesto de desarrollador" },
  { dato: "Dónde", valor: "Vigo · presencial, híbrido o remoto" },
  { dato: "Idiomas", valor: "Español y gallego nativos, inglés avanzado" },
];

// Deep Prep: 208 pruebas y 73,8 % de cobertura (07/11/2026, CI de deep-prep).
// Asistente: 499 pruebas SQL y p95 de 169 ms en 235 llamadas a tools (TASKS.md, 05/11/2026).
export const cifras = [
  { valor: "208", texto: "pruebas automatizadas en Deep Prep" },
  { valor: "73,8 %", texto: "de cobertura de código en Deep Prep" },
  { valor: "499", texto: "pruebas de base de datos en el asistente de reservas" },
  { valor: "169 ms", texto: "de respuesta (p95) en las herramientas del agente de voz" },
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
  imagen?: { src: string; ancho: number; alto: number; alt: string; pie: string };
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
    datos: [
      { valor: "208", texto: "pruebas" },
      { valor: "73,8 %", texto: "cobertura" },
      { valor: "mypy", texto: "tipado estricto" },
    ],
    enlaces: [{ texto: "Código en GitHub", url: "https://github.com/Samuelmartinezduran/deep-prep" }],
    imagen: {
      src: "/proyectos/deep-prep-revision.webp",
      ancho: 1500,
      alto: 950,
      alt: "Pantalla de revisión de Deep Prep: estadísticas de la partida, línea de tiempo con objetivos y muertes, y la lista de muertes con un botón para ver cada clip",
      pie: "Revisión de una partida con los datos de demostración.",
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
    datos: [
      { valor: "499", texto: "pruebas de base de datos" },
      { valor: "169 ms", texto: "p95 de las herramientas" },
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
    imagen: {
      src: "/proyectos/agenteval-ejecuciones.webp",
      ancho: 1500,
      alto: 365,
      alt: "Tabla de ejecuciones de agenteval con la puntuación de cada dimensión y la total",
      pie: "Ejecuciones recientes en el dashboard.",
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
    nombre: "Agente de citas por WhatsApp",
    texto: "Gestiona citas en lenguaje natural y las apunta en Google Calendar.",
    stack: "WhatsApp Cloud API · Google Calendar · function calling",
    enlace: { texto: "Ver la demo", url: "https://www.youtube.com/watch?v=UHxZyXY4cXU" },
    imagen: "/proyectos/whatsapp-demo.webp",
  },
  {
    nombre: "Seguimiento de precios",
    texto: "Vigila productos en Amazon y PcComponentes y avisa por correo cuando bajan.",
    stack: "FastAPI · n8n · PostgreSQL · React",
    enlace: {
      texto: "Código",
      url: "https://github.com/Samuelmartinezduran/atmospheric-analyst---price-tracker",
    },
    imagen: "/proyectos/price-tracker-dashboard.webp",
  },
  {
    nombre: "Tienda online",
    texto: "Catálogo, carrito, pagos y un panel para editar productos sin tocar código.",
    stack: "TypeScript · Stripe · Vercel",
    enlace: { texto: "Ver la demo", url: "https://e-commerce-sigma-ochre-81.vercel.app/es" },
    imagen: "/proyectos/e-commerce.webp",
  },
  {
    nombre: "Bubble Tea España",
    texto: "Guía editorial de bubble tea por ciudades.",
    stack: "React · TypeScript · Vercel",
    enlace: { texto: "Ver la web", url: "https://bubble-tea-ebon.vercel.app/" },
    imagen: "/proyectos/bubble-tea-espana.webp",
  },
];

export const experiencia = [
  {
    fechas: "sep. – dic. 2026",
    puesto: "Desarrollador web",
    empresa: "Asomados, agencia de marketing",
    puntos: [
      "Web corporativa de la agencia, en producción, con WordPress y Divi.",
      "Landings de campaña orientadas a conversión en HTML, CSS y TypeScript, entre ellas las de Vithas.",
      "Webs corporativas para clientes con WordPress y Elementor, como la de IGMontes.",
    ],
  },
  {
    fechas: "abr. – jul. 2023",
    puesto: "Técnico de soporte IT",
    empresa: "InfoSat",
    puntos: [
      "Diagnóstico y reparación de hardware y software para particulares y pymes, con gestión de incidencias y trato directo con el cliente.",
    ],
  },
];

export const formacion = [
  { fechas: "2024 – 2026", titulo: "Técnico Superior en Marketing y Publicidad", centro: "IES A Guía, Vigo" },
  { fechas: "2023 – 2024", titulo: "Desarrollo de Aplicaciones Web (DAW), 1.º curso", centro: "Colegio Montecastelo" },
  { fechas: "2021 – 2023", titulo: "Técnico en Sistemas Microinformáticos y Redes", centro: "IES de Teis" },
];

export const cursos =
  "Cursos de Anthropic (2026): Claude Code 101, Claude Code in Action, Building with the Claude API y Model Context Protocol: Advanced Topics.";

export const habilidades = [
  { grupo: "Lenguajes", lista: "Python, TypeScript, JavaScript, SQL, HTML, CSS" },
  { grupo: "Web", lista: "React, Astro, Next.js, Tailwind CSS, WordPress (Divi y Elementor)" },
  { grupo: "Backend y datos", lista: "FastAPI, PostgreSQL, Supabase, SQLite" },
  { grupo: "IA", lista: "API de Anthropic y de OpenAI, function calling, MCP, Ollama, Retell" },
  { grupo: "Herramientas", lista: "Git, GitHub Actions, Docker, n8n, Vercel, Cloudflare" },
  { grupo: "Sistemas y diseño", lista: "Linux, redes y hardware · Photoshop, Illustrator, Premiere Pro" },
];

// Imágenes de Deep Prep para las vistas con galería. El vídeo sale de docs/img/demo.gif del repo.
export const deepPrepMedios = {
  video: { src: "/proyectos/deep-prep-demo.mp4", poster: "/proyectos/deep-prep-demo-poster.webp", ancho: 1200, alto: 760 },
  capturas: [
    { src: "/proyectos/deep-prep-carga.webp", ancho: 1500, alto: 950, pie: "Pantalla de carga: el rival y su historial." },
    { src: "/proyectos/deep-prep-overlay.webp", ancho: 1180, alto: 580, pie: "Overlay durante la partida." },
    { src: "/proyectos/deep-prep-revision.webp", ancho: 1500, alto: 950, pie: "Revisión con un clip de cada muerte." },
  ],
};

// Salidas reales de las pruebas de cada proyecto, para la vista de terminal.
// Deep Prep: main en b062a92 (08/11/2026). Asistente: TASKS.md del 05/11/2026 (15 archivos, 499 pruebas).
// agenteval: la ejecución de weather-agent que se ve en su dashboard (100 / 67 / 100 → 87).
export const sesionTerminal = [
  { comando: "whoami", salida: ["Samuel Martínez Durán · desarrollador web · Vigo"] },
  {
    comando: "cd deep-prep && python -m unittest discover -s tests -t .",
    salida: ["Ran 208 tests in 6.763s", "", "OK"],
  },
  {
    comando: "cd ../asistente-reservas && supabase test db",
    salida: ["All tests successful.", "Files=15, Tests=499"],
  },
  {
    comando: "agenteval run suites/weather-agent.yaml",
    salida: ["tool accuracy 100 · response quality 67 · safety 100", "score 87 / 100"],
  },
];
