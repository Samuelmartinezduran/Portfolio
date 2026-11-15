// Páginas de proyecto (/proyectos/<id>/). Todo sale de los repositorios: Deep Prep de su README y de
// docs/ARQUITECTURA.md (main, b062a92, versión 2.0.0); agenteval de su README, ADR.md, el código de
// packages/core y la CI (main, b2cd22a, versión 0.1.0); el asistente, de su README, TASKS.md y ADR.md
// (repositorio privado en el Mac, ~/Documents/Trabajos_Rise&Co/Agente_voz_llamada, leído el 15/11/2026).
// Si cambia una cifra en el repo, cambiarla aquí.

export type Paso = { nombre: string; texto: string };
export type Decision = {
  titulo: string;
  decision: string;
  /** «Descartado», «Por qué» o «Coste», con su texto. */
  notas: { etiqueta: string; texto: string }[];
};

export type PaginaProyecto = {
  /** <title> y descripción para buscadores. */
  titulo: string;
  descripcion: string;
  /** Cifras de la franja, que en la página pueden ser cuatro. */
  cifras: { valor: string; texto: string }[];
  intro: string[];
  /** Tabla opcional bajo la introducción. */
  /** Con `codigo`, la primera columna son nombres de código y van en monoespaciada. */
  tabla?: { titulo: string; columnas: string[]; filas: string[][]; codigo?: boolean };
  /** Bloques de código opcionales bajo la introducción (por ejemplo, un contrato). */
  ejemplos?: { etiqueta: string; codigo: string }[];
  /** Captura real opcional bajo la introducción. */
  captura?: { src: string; ancho: number; alto: number; alt: string; pie: string };
  flujo: { titulo: string; pasos: Paso[] };
  capas: { intro: string; filas: { nombre: string; donde: string; texto: string }[] };
  decisiones: Decision[];
  calidad: { medido: string; filas: { que: string; cifra: string; como: string }[]; nota: string };
  limites: string[];
  /** «Pruébalo» por defecto; un proyecto privado puede enseñar en su lugar cómo se verifica. */
  pruebalo: { titulo?: string; comandos: string; nota: string };
  enlaces: { texto: string; url: string }[];
};

export const paginas: Record<string, PaginaProyecto> = {
  "deep-prep": {
    titulo: "Deep Prep · app de escritorio para League of Legends",
    descripcion:
      "Deep Prep prepara cada partida de League of Legends con datos de Master+ y la revisa sola al acabar. Python, SQLite y FFmpeg, con 208 pruebas y código abierto.",
    cifras: [
      { valor: "208", texto: "pruebas de Python" },
      { valor: "95", texto: "pruebas del panel" },
      { valor: "73,8 %", texto: "cobertura" },
      { valor: "1", texto: "dependencia de ejecución" },
    ],
    intro: [
      "Deep Prep es una app de escritorio para Windows que acompaña cada partida de League of Legends en tres momentos: la prepara con datos de partidas de Master o más, enseña un panel encima del juego mientras juegas y, al acabar, la revisa sola, con un clip de cada muerte.",
      "Empezó como Porofesor, una herramienta para mí y unos amigos que reciben las versiones solas. La 2.0 la rehíce como proyecto de código abierto: paquete nuevo, pruebas de caracterización antes de reordenar nada, tipos estrictos, integración continua, un modo demo y una versión puente para que las copias 1.0 se pasaran solas.",
    ],
    tabla: {
      titulo: "Qué enseña en cada momento",
      columnas: ["Momento", "De dónde salen los datos", "Qué se ve"],
      filas: [
        [
          "Selección de campeón",
          "El cliente del LoL y bases locales: no se pide nada a Riot",
          "Tu duelo contra el rival probable, medido en Master+, tu pool contra su campeón y tu historial",
        ],
        [
          "Pantalla de carga",
          "API de Riot: spectator, league, mastery y match",
          "Los diez jugadores (rango, maestría, forma, premades) y el perfil del jungla rival, con su mapa minuto a minuto del 2:00 al 6:00",
        ],
        [
          "En partida",
          "Lo mismo, recortado por las normas de Riot",
          "Solo datos de antes de empezar y solo mientras mantienes Ctrl+Tab: sin plan, sin veredictos y sin el mapa del jungla",
        ],
        [
          "Después",
          "match-v5, cuando Riot publica la partida, y la grabación",
          "Cada muerte y lo que costó, los objetivos, los LP ganados o perdidos y un clip de cada muerte",
        ],
      ],
    },
    flujo: {
      titulo: "Una partida de principio a fin",
      pasos: [
        {
          nombre: "Selección",
          texto:
            "El vigía mira la fase del cliente cada 2,5 s. En la selección calcula tu duelo y tu pool con las bases locales, sin gastar cuota de Riot, y deja la cuota de fondo a cero para la partida.",
        },
        {
          nombre: "Carga",
          texto:
            "Con la caché vacía, una partida cuesta unas 270 peticiones y la clave personal da 100 cada 2 minutos. Una cola de 6 hilos con prioridades hace que lo más útil (ligas, maestrías y las primeras partidas del jungla rival) llegue en la primera ventana de cuota.",
        },
        {
          nombre: "Empieza",
          texto:
            "La API del juego ya contesta en la pantalla de carga, con el reloj parado. Por eso la partida empieza cuando el reloj avanza 0,2 s, y no cuando la API responde. A la vez arranca la grabación en otro proceso.",
        },
        {
          nombre: "En partida",
          texto:
            "El overlay sale mientras mantienes Ctrl+Tab y solo con el juego delante: con Alt+Tab se esconde. Recibe el panel ya recortado por el filtro de las normas, así que no puede enseñar lo que no debe.",
        },
        {
          nombre: "Después",
          texto:
            "Cuando Riot publica la partida (hasta 20 intentos, uno por minuto), la revisa, guarda los LP y recorta un clip por muerte, 20 s antes y 4 s después, a prioridad mínima.",
        },
      ],
    },
    capas: {
      intro:
        "Python 3.14 con una sola dependencia de ejecución, pywebview. Lo demás es biblioteca estándar (http.server, sqlite3, urllib, ctypes) y un ffmpeg dentro del paquete. 34 módulos de Python, unas 7 900 líneas, y 19 módulos ES de JavaScript, unas 1 300, sin bundler ni npm. El código va por capas, de más estable a más pegado a Windows.",
      filas: [
        {
          nombre: "Composición",
          donde: "app.py",
          texto:
            "App recibe sus piezas ya hechas y las conecta; las pruebas le pasan falsos. Era una clase de unas 1 000 líneas y ahora delega en ocho.",
        },
        {
          nombre: "Lógica pura",
          donde: "analisis.py · duelos.py · revision.py",
          texto:
            "El perfil del jungla, los duelos de Master+ y la revisión, sin red ni disco. Es donde está el valor y donde más se prueba: entre el 93 y el 97 % de cobertura.",
        },
        {
          nombre: "Datos",
          donde: "riot.py · lcu.py · cache.py · base_duelos.py",
          texto:
            "La API de Riot con su limitador, el cliente del LoL y dos bases SQLite que guardan cada partida como JSON comprimido.",
        },
        {
          nombre: "Windows",
          donde: "overlay.py · grabacion.py · clips.py · actualizador.py",
          texto: "La ventana encima del juego, la grabación con ffmpeg, los recortes y las actualizaciones.",
        },
        {
          nombre: "Interfaz",
          donde: "servidor.py · web/",
          texto:
            "Un servidor HTTP en 127.0.0.1 y el panel en HTML, CSS y módulos ES, en dos ventanas de WebView2: el panel y el overlay.",
        },
      ],
    },
    decisiones: [
      {
        titulo: "Las normas de Riot, en un solo filtro",
        decision:
          "Lo que se enseña durante la partida se recorta en un único sitio del backend, antes de enviarlo: ni el panel ni el overlay reciben el plan, los veredictos ni el mapa del jungla. La app tampoco toca el juego: no lee su memoria, no inyecta nada y no instala ganchos de teclado.",
        notas: [
          { etiqueta: "Descartado", texto: "Que cada vista escondiera lo suyo: es fácil olvidarse de una y el dato llegaría igual a la ventana." },
          { etiqueta: "Por qué", texto: "Un filtro único se audita y se prueba contra un JSON esperado." },
        ],
      },
      {
        titulo: "Una ventana aparte, no un overlay dentro del juego",
        decision:
          "El overlay es una ventana sin bordes con WS_EX_LAYERED, WS_EX_TRANSPARENT y WS_EX_NOACTIVATE: siempre encima, sin coger el foco y dejando pasar los clics. El atajo se lee con GetAsyncKeyState cada 30 ms.",
        notas: [
          { etiqueta: "Descartado", texto: "Dibujar dentro del juego enganchándose a DirectX: exige inyectarse en el proceso, justo lo que no se puede hacer." },
          { etiqueta: "Coste", texto: "Solo funciona con el juego en ventana sin bordes; la app lee game.cfg y avisa." },
        ],
      },
      {
        titulo: "Un limitador que se sincroniza con Riot",
        decision:
          "Una ventana deslizante por host, con margen (18 de 20 por segundo y 96 de 100 cada 2 minutos), que espera antes de pasarse y se ajusta con la cuenta que devuelve Riot en cada respuesta. Así cubre reinicios y otros procesos con la misma clave.",
        notas: [
          { etiqueta: "Descartado", texto: "Reaccionar solo a los 429: más simple, pero Riot puede bloquear las claves que se pasan una y otra vez." },
          { etiqueta: "Coste", texto: "Los límites por método no se modelan; solo se respetan al recibir un 429." },
        ],
      },
      {
        titulo: "La grabación, en otro proceso y en trozos MKV",
        decision:
          "ffmpeg captura la pantalla con DXGI y el codificador de la gráfica (NVENC, AMF o QSV) en trozos de 5 minutos, desde un proceso aparte: si el panel se cae, la grabación sigue. MKV porque un archivo cortado de golpe se sigue pudiendo leer; un MP4 sin su índice final, no.",
        notas: [
          { etiqueta: "Descartado", texto: "Pedir que se grabe con OBS, o grabar desde un hilo de la app, que comparte su suerte." },
          { etiqueta: "Coste", texto: "Los dos procesos se comunican por archivos: sencillo, pero frágil." },
        ],
      },
      {
        titulo: "Una versión puente de Porofesor a Deep Prep",
        decision:
          "Las copias 1.0 buscan un Porofesor.exe en otro repositorio, y eso no se puede cambiar en lo ya instalado. Allí se publicó una copia byte a byte de DeepPrep.exe con ese nombre; al instalarse, muda los datos, la carpeta y los accesos directos. Lo cubren 26 pruebas.",
        notas: [
          { etiqueta: "Descartado", texto: "Pedir que desinstalaran y reinstalaran: quien no lo hiciera se quedaría para siempre en la 1.0." },
          { etiqueta: "Coste", texto: "Mantener el puente mientras quede alguna 1.0, y la copia encima de la versión vieja no es atómica." },
        ],
      },
    ],
    calidad: {
      medido: "Medido sobre main, versión 2.0.0.",
      filas: [
        { que: "Pruebas de Python", cifra: "208 en 15 archivos, 7 s", como: "py -X utf8 -m unittest discover -s tests -t ." },
        { que: "De caracterización", cifra: "12, contra 12 JSON esperados", como: "tests/test_caracterizacion.py" },
        { que: "Pruebas del panel", cifra: "95 en 9 archivos", como: "node --test" },
        { que: "Cobertura", cifra: "73,8 %, con un mínimo del 70 %", como: "coverage run … && coverage report" },
        { que: "Tipos", cifra: "mypy estricto, 0 errores en 50 archivos", como: "mypy" },
        { que: "Lint y formato", cifra: "ruff, 0 avisos", como: "ruff check . && ruff format --check ." },
        { que: "CI", cifra: "Windows con Python 3.14 y Ubuntu con Node 24", como: "GitHub Actions" },
      ],
      nota: "Antes de reordenar el código se fijó con pruebas de caracterización lo que salía de las funciones grandes; con esa red se partió la clase principal y ninguna función pasa de 50 líneas. La lógica pura supera el 93 % de cobertura; lo que habla con Windows o con la red se queda muy por debajo (ventanas 0 %, cliente del LoL 18,5 %) y se prueba a mano con el cliente real. Es el hueco principal.",
    },
    limites: [
      "Las actualizaciones no están firmadas: la huella SHA-256 detecta una descarga rota, no una versión maliciosa.",
      "La instalación copia encima de la versión vieja; si falla a medias, puede quedar una mezcla de archivos.",
      "Depende de APIs locales de Riot sin contrato (el cliente, game.cfg y la ventana del juego): un cambio las rompe sin que lo vea ninguna prueba.",
      "Poca cobertura en la capa de Windows y red, y sin una prueba de extremo a extremo con el cliente real.",
      "El overlay solo funciona con el juego en ventana sin bordes.",
    ],
    pruebalo: {
      comandos: `git clone https://github.com/Samuelmartinezduran/deep-prep.git
cd deep-prep
py -3.14 -m venv .venv
.venv\\Scripts\\activate
py -m pip install -e .
py -m deepprep --demo`,
      nota: "El modo demo abre la app con una partida de ejemplo, sin el LoL ni una clave de Riot. No escribe fuera de una carpeta temporal que borra al cerrar, y una prueba lo comprueba.",
    },
    enlaces: [
      { texto: "Código en GitHub", url: "https://github.com/Samuelmartinezduran/deep-prep" },
      { texto: "Arquitectura completa", url: "https://github.com/Samuelmartinezduran/deep-prep/blob/main/docs/ARQUITECTURA.md" },
      { texto: "Versiones publicadas", url: "https://github.com/Samuelmartinezduran/deep-prep/releases" },
    ],
  },

  "asistente-reservas": {
    titulo: "Asistente telefónico de reservas con IA para restaurantes",
    descripcion:
      "Agente de voz que atiende las llamadas de un restaurante y gestiona sus reservas: motor de disponibilidad en PostgreSQL, 499 pruebas y agenda en directo.",
    cifras: [
      { valor: "499", texto: "pruebas de base de datos" },
      { valor: "10", texto: "herramientas del agente" },
      { valor: "169 ms", texto: "p95 de las herramientas (en local)" },
      { valor: "23/23", texto: "pasos del recorrido completo" },
    ],
    intro: [
      "Un agente de voz que coge el teléfono de un restaurante: consulta la disponibilidad, crea, cambia o cancela reservas, responde preguntas con información aprobada y deja anotado lo que no puede resolver. El personal lo ve todo al momento en su panel.",
      "Es un encargo de un comercial para venderlo a restaurantes. Está en beta, con un restaurante ficticio: todo lo que pasa detrás de la llamada está probado, y el agente ya ha atendido llamadas web de prueba desde Retell. Falta conectarlo a un número de teléfono.",
    ],
    captura: {
      src: "/proyectos/asistente-agenda.webp",
      ancho: 1440,
      alto: 810,
      alt: "Agenda del panel del personal con las reservas de un día del restaurante de demostración: ocupación por franjas en la comida y la cena, y las reservas del asistente marcadas",
      pie: "El panel del personal con los datos ficticios de la demo: las reservas del asistente llevan su marca y la ocupación se ve por franjas.",
    },
    tabla: {
      titulo: "Lo que puede hacer el agente en una llamada",
      codigo: true,
      columnas: ["Herramienta", "Para qué"],
      filas: [
        ["getCallContext", "Saber qué restaurante es y cómo está configurado al empezar la llamada."],
        ["checkAvailability", "Consultar si cabe una reserva y, si no, proponer hasta tres horas del mismo día."],
        ["prepareReservationAction", "Preparar crear, cambiar o cancelar: devuelve el resumen que se lee al cliente, sin tocar nada."],
        ["createReservation · modifyReservation · cancelReservation", "Ejecutar lo preparado, solo cuando el cliente acepta."],
        ["getReservation", "Encontrar una reserva por teléfono, nombre y fecha. Tres intentos fallidos cierran esa vía."],
        ["getOperationStatus", "Recuperar el resultado de una operación si se perdió la respuesta."],
        ["getRestaurantInformation", "Responder sobre horarios, terraza, alérgenos y demás, solo con información aprobada."],
        ["createFollowup", "Dejar anotado lo que no puede resolver, para que el personal lo vea en Pendientes."],
      ],
    },
    flujo: {
      titulo: "Una reserva de principio a fin",
      pasos: [
        {
          nombre: "Contexto",
          texto:
            "Retell llama a cada herramienta con una petición firmada. La firma se comprueba sobre el cuerpo original antes de leer el JSON, y el restaurante sale de la integración dada de alta (agente y número), nunca de lo que diga el modelo.",
        },
        {
          nombre: "Disponibilidad",
          texto:
            "checkAvailability pregunta al motor de PostgreSQL: horarios, turnos de entrada, duración, antelación, aforo y bloqueos, en la zona horaria del restaurante. Si no cabe, propone hasta tres horas del mismo día. Con el servicio ya empezado, el asistente no reserva para ese turno.",
        },
        {
          nombre: "Resumen",
          texto:
            "prepareReservationAction guarda una propuesta que dura diez minutos y devuelve el resumen que el agente lee al cliente. Todavía no se ha reservado nada.",
        },
        {
          nombre: "Confirmación",
          texto:
            "Solo cuando el cliente acepta, createReservation ejecuta esa propuesta: bloquea el restaurante, vuelve a comprobar el aforo y guarda la reserva y el resultado en la misma transacción. Un reintento devuelve el mismo resultado sin crear otra reserva.",
        },
        {
          nombre: "Agenda",
          texto:
            "La reserva llega al panel por Realtime. El panel no se fía del contenido del evento: vuelve a pedir el día, así que tampoco se pierde nada si la conexión se cortó un momento.",
        },
      ],
    },
    capas: {
      intro:
        "Astro con React y TypeScript estricto para el panel y la API, PostgreSQL en Supabase con RLS para los datos y las reglas, y Retell para la voz. Las reglas de negocio viven en la base de datos: el agente y el panel usan el mismo motor.",
      filas: [
        {
          nombre: "Base de datos",
          donde: "supabase/migrations · seed.sql",
          texto:
            "El esquema, el RLS por restaurante, el motor de disponibilidad y las operaciones, en PL/pgSQL. Los datos de la demo son ficticios y se regeneran en cada reconstrucción.",
        },
        {
          nombre: "Voz",
          donde: "pages/api/voice · server/retell · voice/",
          texto:
            "Las diez herramientas firmadas y los contratos Zod de los que sale la definición para Retell, además del prompt del agente.",
        },
        {
          nombre: "Panel",
          donde: "pages/dashboard · components",
          texto:
            "Agenda en directo, reservas manuales, bloqueos, pendientes, llamadas y configuración, con sesión en el servidor y cookies HttpOnly.",
        },
        {
          nombre: "Operación",
          donde: "pages/api/webhooks · pages/api/cron",
          texto:
            "Los avisos de inicio, fin y análisis de cada llamada, y una tarea diaria que anonimiza los datos de clientes a los 30 días.",
        },
        {
          nombre: "Pruebas",
          donde: "supabase/tests · tests/",
          texto:
            "pgTAP para la base de datos, integración HTTP con una firma de prueba y Playwright en Chromium contra la API y la base reales.",
        },
      ],
    },
    decisiones: [
      {
        titulo: "El modelo nunca decide a qué restaurante toca",
        decision:
          "Ni el restaurante, ni el empleado, ni la llamada salen de los argumentos del LLM. Se resuelven en el servidor a partir de la integración firmada (agente y número de destino), y el vínculo entre llamada e integración se guarda, para que el mismo identificador no se pueda reaprovechar en otro restaurante.",
        notas: [
          { etiqueta: "Por qué", texto: "Los metadatos y los argumentos los puede inventar el modelo; la firma del proveedor, no." },
        ],
      },
      {
        titulo: "Un único motor de disponibilidad, en PostgreSQL",
        decision:
          "check_availability, en PL/pgSQL, responde a la consulta del agente, a la reserva manual y a la comprobación que se repite dentro de la transacción de escritura.",
        notas: [
          { etiqueta: "Por qué", texto: "Las reglas no se duplican en TypeScript, y la consulta y la escritura no pueden decir cosas distintas." },
        ],
      },
      {
        titulo: "Preparar y ejecutar, en dos pasos",
        decision:
          "Primero se prepara una operación, con el resumen que se lee al cliente; después se ejecuta por su identificador. La ejecución bloquea el restaurante, vuelve a comprobar y guarda la reserva y el resultado juntos.",
        notas: [
          { etiqueta: "Por qué", texto: "Impide vender dos veces las últimas plazas y los duplicados por reintentos, y si se pierde la respuesta se consulta el resultado sin repetir la escritura." },
          { etiqueta: "Detalle", texto: "Si el personal edita la reserva entre el resumen y la ejecución, la operación da VERSION_CONFLICT y no cambia nada." },
        ],
      },
      {
        titulo: "La agenda vuelve a consultar en vez de fiarse del evento",
        decision:
          "Realtime publica solo altas y cambios de las reservas de cada restaurante, y ante cada evento, reconexión o vuelta al foco el panel vuelve a pedir el día. Cancelar es un cambio de estado, no un borrado.",
        notas: [
          { etiqueta: "Por qué", texto: "Los borrados de Realtime no pasan por RLS, y una nueva consulta recupera lo que se perdiera durante una desconexión." },
        ],
      },
      {
        titulo: "Sin reservas por teléfono con el servicio empezado",
        decision:
          "Desde la apertura de la comida o de la cena, el asistente no reserva ni mueve reservas a ese turno y propone horas de uno posterior. El personal no tiene esa restricción.",
        notas: [
          { etiqueta: "Por qué", texto: "En plena sala el restaurante no puede absorber reservas de última hora por teléfono; las de quien llega al local las sigue apuntando el personal." },
        ],
      },
    ],
    calidad: {
      medido: "Medido en local, sobre una base reconstruida, entre el 25/10 y el 05/11/2026.",
      filas: [
        { que: "Base de datos", cifra: "499 pruebas pgTAP en 15 archivos", como: "supabase test db" },
        { que: "Integración HTTP", cifra: "Auth 14, reservas 18, voz 45", como: "npm run test:auth · test:reservations · test:voice" },
        { que: "Navegador", cifra: "Agenda 13, manual 14, bloqueos 8, información 4, retención 4", como: "Playwright con Chromium" },
        { que: "Recorrido completo", cifra: "23/23 pasos de la especificación", como: "llamadas simuladas por HTTP firmado" },
        { que: "Argumentos malformados", cifra: "34/34, sin ningún error 5xx", como: "las diez herramientas" },
        { que: "Latencia de las herramientas", cifra: "p50 24 ms · p95 169 ms (235 llamadas)", como: "registro voice_tool, en local" },
        { que: "Tipos y build", cifra: "0 errores", como: "npm run verify" },
      ],
      nota: "Las pruebas de la base de datos cubren el aforo exacto y una persona de más, los solapes, la medianoche y los cambios de hora, los permisos de cada rol, el aislamiento entre restaurantes y que todo se deshaga si falla el guardado. Las de integración crean y borran sus propios restaurantes y usan una firma de prueba: no tocan Retell ni un teléfono.",
    },
    limites: [
      "Falta conectarlo a un número de teléfono: sin él no se ha hecho la llamada telefónica completa, que es lo que cierra la primera fase.",
      "La conversación solo se ha probado en llamadas web de prueba desde Retell; faltan medir latencias y ajustar las interrupciones en llamadas reales.",
      "No está desplegado: falta el proyecto de Supabase en la nube y decidir dónde se aloja.",
      "La información del restaurante de demostración es ficticia; hay que cambiarla por la del restaurante antes de usarlo.",
    ],
    pruebalo: {
      titulo: "Cómo se verifica",
      comandos: `supabase db reset --local --yes && npm run staff:create:local
supabase test db && supabase db advisors --local --fail-on warn
npm run verify
npm run test:reservations && npm run test:voice && npm run test:agenda`,
      nota: "La verificación completa en local, con Supabase arrancado. El repositorio es privado: lo enseño en una llamada.",
    },
    enlaces: [],
  },

  agenteval: {
    titulo: "agenteval · framework para evaluar agentes LLM",
    descripcion:
      "agenteval evalúa agentes LLM que usan herramientas: casos en YAML y una nota de 0 a 100 en precisión, calidad y seguridad. Python, FastAPI y React, con licencia MIT.",
    cifras: [
      { valor: "42", texto: "pruebas con pytest" },
      { valor: "3", texto: "dimensiones de puntuación" },
      { valor: "5", texto: "casos en paralelo por defecto" },
      { valor: "MIT", texto: "licencia" },
    ],
    intro: [
      "Cuando un agente llama a herramientas, la pregunta difícil no es si funciona, sino si funciona bien y siempre igual, y comprobarlo a mano no escala. agenteval lo convierte en pruebas: los casos se escriben en YAML, se lanzan contra el agente y cada uno sale con una nota de 0 a 100 en tres dimensiones y con el razonamiento del juez.",
      "Es agnóstico: vale para cualquier agente que exponga un endpoint compatible con OpenAI, sin adaptadores. Este es todo el contrato:",
    ],
    ejemplos: [
      { etiqueta: "lo que envía agenteval", codigo: `POST /\n{ "messages": [{ "role": "user", "content": "..." }], "tools": [ ... ] }` },
      { etiqueta: "lo que espera del agente", codigo: `{ "choices": [{ "message": { "content": "...", "tool_calls": [ ... ] } }] }` },
    ],
    flujo: {
      titulo: "Cómo se evalúa un caso",
      pasos: [
        {
          nombre: "Suite",
          texto:
            "El YAML se valida antes de ejecutar nada (agenteval validate). Cada caso lleva la entrada, las herramientas que se le ofrecen al agente y lo que se espera que haga.",
        },
        {
          nombre: "Agente",
          texto:
            "El runner le manda los mensajes y las herramientas y lee su respuesta. Los casos van en paralelo, como mucho 5 a la vez por defecto, para no chocar con los límites del agente ni del juez. Si el agente no responde, el caso falla y el run sigue.",
        },
        {
          nombre: "Herramientas",
          texto:
            "Determinista: 100 si llama a la herramienta esperada con los parámetros esperados, 50 si acierta la herramienta pero no los parámetros y 0 si llama a otra o a ninguna. Si no debía llamar a ninguna, 100 o 0. Los parámetros se comparan sin mayúsculas ni espacios, o con contains y regex.",
        },
        {
          nombre: "Juez",
          texto:
            "La calidad y la seguridad las puntúa un juez: un LLM de OpenAI, en una sola llamada por caso y con reintentos, o el heurístico, sin coste, para demos y CI. Cada nota llega con su razonamiento.",
        },
        {
          nombre: "Nota",
          texto:
            "0,4 × herramientas + 0,4 × calidad + 0,2 × seguridad. La CLI saca una tabla o un JSON; --baseline enseña la diferencia con un run anterior y --fail-under hace fallar la CI si la media baja de un umbral.",
        },
      ],
    },
    capas: {
      intro:
        "Un monorepo de uv con tres partes. El runner del núcleo es la única fuente de verdad de la puntuación: la API y el dashboard lo reutilizan, no la recalculan.",
      filas: [
        {
          nombre: "Núcleo",
          donde: "packages/core",
          texto:
            "La librería y la CLI: carga de suites, runner asíncrono, puntuación y jueces. Sin base de datos. Unas 930 líneas.",
        },
        {
          nombre: "API",
          donde: "packages/api",
          texto:
            "FastAPI, SQLAlchemy y Alembic: guarda suites, runs y resultados y lanza los runs en segundo plano. Unas 620 líneas.",
        },
        {
          nombre: "Dashboard",
          donde: "frontend",
          texto:
            "React, Vite y Tailwind: lista de runs, el detalle con el razonamiento del juez y la comparación entre dos runs. Unas 740 líneas.",
        },
        {
          nombre: "Ejemplos",
          donde: "examples",
          texto:
            "Un agente de juguete y la suite weather-agent. Con docker compose up arranca todo, con la suite ya cargada.",
        },
      ],
    },
    decisiones: [
      {
        titulo: "El juez, en una sola llamada por caso",
        decision:
          "La calidad y la seguridad se puntúan juntas: el juez de OpenAI las resuelve en una única llamada que devuelve JSON, con tres intentos y espera creciente ante un 429, un fallo de red o un 5xx.",
        notas: [
          { etiqueta: "Por qué", texto: "La mitad de coste y de latencia por caso, y un error pasajero del proveedor no marca el caso como fallido." },
          { etiqueta: "Detalle", texto: "La interfaz de dos métodos se mantiene, para quien quiera escribir su propio juez." },
        ],
      },
      {
        titulo: "Runs en segundo plano, sin cola externa",
        decision:
          "POST /runs guarda el run como «running» y lo ejecuta en una tarea de fondo de FastAPI; el dashboard pregunta hasta que pasa a «completed» o «failed». Al arrancar, la API marca como fallidos los runs que se quedaron a medias.",
        notas: [
          { etiqueta: "Por qué", texto: "Una suite grande no agota el tiempo de la petición, y montar Celery o RQ sería demasiado para este volumen." },
          { etiqueta: "Coste", texto: "Las tareas comparten el threadpool de anyio: con muchísimos runs a la vez podría saturarse. Está apuntado y sin resolver." },
        ],
      },
      {
        titulo: "Concurrencia con límite",
        decision: "run_suite pasa los casos por un semáforo: 5 a la vez por defecto, --concurrency en la CLI.",
        notas: [
          { etiqueta: "Por qué", texto: "Lanzarlo todo a la vez chocaba con los límites de peticiones del agente y del juez en cuanto la suite crecía." },
          { etiqueta: "Prueba", texto: "Una prueba con límites de 1 y 3 comprueba que nunca se pasa." },
        ],
      },
      {
        titulo: "Parámetros que se comparan con margen",
        decision:
          "Un parámetro esperado puede ser un valor, que se compara sin mayúsculas ni espacios de más, o un {contains: …} o {regex: …}. Una regex mal escrita en la suite no tumba el run: cuenta como parámetro incorrecto.",
        notas: [
          { etiqueta: "Por qué", texto: "La igualdad exacta era demasiado rígida para lo que genera un LLM («Madrid» frente a «Madrid, España»), y no hacía falta un lenguaje de aserciones." },
        ],
      },
      {
        titulo: "Comparar runs por nombre de caso",
        decision:
          "La API empareja los resultados de dos runs por el nombre de cada caso y devuelve la diferencia de nota; solo compara runs terminados (si no, 409). En la CLI, --baseline compara con un JSON guardado.",
        notas: [
          { etiqueta: "Por qué", texto: "Responde a «¿mi agente ha mejorado o empeorado?» sin inventar un concepto nuevo de baseline: el nombre del caso ya es un identificador estable." },
        ],
      },
    ],
    calidad: {
      medido: "Sobre main, versión 0.1.0, con la CI en verde.",
      filas: [
        { que: "Pruebas del núcleo", cifra: "33", como: "cd packages/core && uv run pytest -q" },
        { que: "Pruebas de la API", cifra: "9", como: "cd packages/api && uv run pytest -q" },
        { que: "Lint", cifra: "ruff", como: "uv run ruff check packages" },
        { que: "Dashboard", cifra: "se compila en cada push", como: "npm run build" },
        { que: "CI", cifra: "Python 3.12 y Node 20, en Ubuntu", como: "GitHub Actions" },
      ],
      nota: "Las pruebas cubren la puntuación de herramientas, la agregación, la carga de suites, el límite de concurrencia, el juez de OpenAI con un cliente falso (también los reintentos), el runner de principio a fin contra un agente simulado, incluido un agente que no responde y un juez que falla, y la API: el flujo completo, la comparación de runs y la recuperación de runs atascados. No se mide la cobertura.",
    },
    limites: [
      "El juez heurístico no evalúa la seguridad: siempre da 100. Para una nota de seguridad de verdad hace falta el juez LLM, que tiene coste.",
      "Solo hay un juez LLM, el de OpenAI. Otro proveedor exige escribir una subclase.",
      "Las tareas de fondo comparten el threadpool de anyio y podrían saturarse con muchos runs a la vez.",
      "No se mide la cobertura en la CI.",
    ],
    pruebalo: {
      comandos: `git clone https://github.com/Samuelmartinezduran/agenteval.git
cd agenteval
make setup
make run-mock   # en una terminal: el agente de juguete
make run-cli    # en otra: la suite de ejemplo con el juez heurístico`,
      nota: "No necesita clave de API. Con docker compose up --build se levanta todo, con el dashboard en localhost:5173 y la suite de ejemplo ya cargada.",
    },
    enlaces: [
      { texto: "Código en GitHub", url: "https://github.com/Samuelmartinezduran/agenteval" },
      { texto: "Decisiones (ADR)", url: "https://github.com/Samuelmartinezduran/agenteval/blob/main/ADR.md" },
    ],
  },
};
