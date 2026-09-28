export const SITE_URL = 'https://samuelmartinez.dev';
export const SITE_NAME = 'Samuel Martínez';
export const PERSON_ID = `${SITE_URL}/#samuel-martinez`;
export const BUSINESS_ID = `${SITE_URL}/#desarrollo-web-seo-vigo`;
export const OG_IMAGE = `${SITE_URL}/og-image.webp`;
export const PROFILE_IMAGE = `${SITE_URL}/profile.webp`;

export type PageSeo = {
  path: string;
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogType: 'website';
  schema: unknown[];
};

export type ServicePage = PageSeo & {
  slug: string;
  navLabel: string;
  eyebrow: string;
  h1: string;
  lead: string;
  commercialIntent: string;
  outcomes: string[];
  process: string[];
  faqs: {question: string; answer: string}[];
  related: string[];
};

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Samuel Martínez Durán',
  jobTitle: 'Desarrollador web y SEO local',
  image: PROFILE_IMAGE,
  url: SITE_URL,
  sameAs: [
    'https://www.linkedin.com/in/samuel-martínez-durán-40a70335b',
    'https://github.com/Samuelmartinezduran',
  ],
  knowsAbout: [
    'SEO',
    'SEM',
    'Marketing digital',
    'Desarrollo web',
    'Landing pages',
    'CRO',
    'Analítica digital',
    'Soluciones con IA',
    'Chatbots',
    'Automatización de procesos',
  ],
};

const areaServedSpain = [
  {
    '@type': 'Country',
    name: 'España',
  },
];

const areaServedVigo = [
  {
    '@type': 'City',
    name: 'Vigo',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Vigo',
      addressRegion: 'Galicia',
      addressCountry: 'ES',
    },
  },
  ...areaServedSpain,
];

const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': BUSINESS_ID,
  name: 'Samuel Martínez | Desarrollo web y SEO local en Vigo',
  url: SITE_URL,
  image: OG_IMAGE,
  founder: {'@id': PERSON_ID},
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Vigo',
    addressRegion: 'Galicia',
    addressCountry: 'ES',
  },
  areaServed: areaServedVigo,
  priceRange: '€€',
  knowsAbout: [
    'Desarrollo web SEO',
    'Marketing digital',
    'Consultoría SEO SEM',
    'Landing pages CRO',
    'Analítica digital',
    'Soluciones con IA',
    'Chatbots con IA',
    'Automatización con IA',
  ],
  makesOffer: [
    {'@id': `${SITE_URL}/servicios/consultor-seo-sem/#service`},
    {'@id': `${SITE_URL}/servicios/desarrollo-web/#service`},
    {'@id': `${SITE_URL}/servicios/landing-pages-cro/#service`},
    {'@id': `${SITE_URL}/servicios/soluciones-ia/#service`},
  ],
};

const buildBreadcrumbSchema = (name: string, url: string, isLocal = false) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Inicio',
      item: SITE_URL,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: isLocal ? 'Servicios en Vigo y Galicia' : 'Servicios',
      item: isLocal ? SITE_URL : `${SITE_URL}/#services`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name,
      item: url,
    },
  ],
});

const buildFaqSchema = (faqs: {question: string; answer: string}[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

const serviceBase = (isLocal = false) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  provider: {'@id': PERSON_ID},
  areaServed: isLocal ? areaServedVigo : areaServedSpain,
  image: OG_IMAGE,
});

const seoSemFaqs = [
  {
    question: '¿Qué revisarías antes de proponer una campaña?',
    answer:
      'Primero miraría la oferta, las búsquedas relevantes, la página a la que llegaría cada anuncio y cómo se registran los contactos. Así sabremos qué falta antes de invertir.',
  },
  {
    question: '¿Qué recibiría tras una revisión inicial?',
    answer:
      'Un diagnóstico de la web y las búsquedas, con problemas detectados y una lista priorizada de cambios. El alcance concreto lo acordaríamos antes de empezar.',
  },
  {
    question: '¿Podemos centrarnos solo en Vigo?',
    answer:
      'Sí. Podemos revisar primero las búsquedas y los competidores de Vigo y su entorno, y ampliar la zona si tu negocio también atiende otros lugares.',
  },
];

const webFaqs = [
  {
    question: '¿Qué preparas para que Google pueda entender la web?',
    answer:
      'Una estructura de páginas clara, títulos y metadatos propios, enlaces internos y una base técnica que permita rastrear e indexar el contenido. Eso no garantiza posiciones concretas.',
  },
  {
    question: '¿Podré cambiar textos y fotos?',
    answer:
      'Depende de cómo necesites mantener la web. Antes de desarrollarla decidiremos si basta con cambios puntuales o si necesitas un panel para editar contenido por tu cuenta.',
  },
  {
    question: '¿La web se revisará en móvil?',
    answer:
      'Sí. Revisaré lectura, navegación, formularios e imágenes en tamaños pequeños, además de comprobar carga y accesibilidad básica.',
  },
];

const croFaqs = [
  {
    question: '¿Cuándo conviene una página de campaña?',
    answer:
      'Cuando vas a promocionar una oferta concreta y quieres que quien llegue desde un anuncio encuentre enseguida esa misma oferta y una acción clara.',
  },
  {
    question: '¿Cómo sabremos si llegan consultas?',
    answer:
      'Podemos registrar envíos de formulario y clics de contacto. Después se revisan esos datos junto con el tráfico; no daré por buena una página solo porque reciba visitas.',
  },
  {
    question: '¿Hace falta tener anuncios activos?',
    answer:
      'No. La página puede prepararse antes del lanzamiento. Si ya hay campañas, revisaré que el anuncio, el mensaje y el formulario cuenten la misma historia.',
  },
];

const aiFaqs = [
  {
    question: '¿Por dónde empezarías una automatización?',
    answer:
      'Por una tarea repetitiva y acotada, como recoger datos para una reserva o responder una pregunta frecuente. Primero comprobaría que el flujo completo resulta útil.',
  },
  {
    question: '¿Se puede conectar con WhatsApp o un calendario?',
    answer:
      'Sí, si las herramientas y sus permisos lo permiten. La demo de citas de esta web muestra un flujo con WhatsApp y Google Calendar; una instalación real se definiría para tu caso.',
  },
  {
    question: '¿Qué pasa si el asistente no entiende una consulta?',
    answer:
      'El flujo debe tener una salida clara: pedir más datos o pasar la consulta a una persona. Esa excepción se define y se prueba antes de dejarlo atendiendo mensajes.',
  },
];

export const servicePages: ServicePage[] = [
  {
    slug: 'consultor-seo-sem',
    path: '/servicios/consultor-seo-sem/',
    navLabel: 'SEO/SEM',
    eyebrow: 'Consultoría SEO y SEM',
    title: 'SEO y campañas de búsqueda en Vigo | Samuel Martínez',
    description:
      'Reviso búsquedas, páginas y medición para decidir qué mejorar antes de invertir en SEO o campañas de búsqueda en Vigo.',
    ogTitle: 'SEO y campañas de búsqueda en Vigo',
    ogDescription:
      'Búsquedas, páginas de destino y contactos: una revisión con prioridades concretas para tu negocio.',
    ogType: 'website',
    h1: 'SEO y campañas de búsqueda para negocios de Vigo',
    lead:
      'Reviso qué busca la gente, qué encuentra al entrar en tu web y cómo puedes saber si termina escribiéndote.',
    commercialIntent:
      'Antes de proponer contenido o anuncios, necesito entender tu servicio, tu zona de trabajo y qué cuenta como una consulta útil.',
    outcomes: [
      'Búsquedas relacionadas con tus servicios y tu zona.',
      'Revisión de las páginas a las que llegan las visitas.',
      'Comprobación de formularios y medición de contactos.',
      'Lista priorizada de cambios para web y campañas.',
    ],
    process: [
      'Reviso tu oferta, la web y las búsquedas que podrían traerte consultas.',
      'Separo lo que necesita una página mejor de lo que puede requerir anuncios.',
      'Acordamos qué probar primero y cómo registrar los contactos.',
    ],
    faqs: seoSemFaqs,
    related: [
      '/seo-local-vigo/',
      '/desarrollo-web-vigo/',
      '/servicios/desarrollo-web/',
      '/servicios/landing-pages-cro/',
    ],
    schema: [
      personSchema,
      {
        ...serviceBase(false),
        '@id': `${SITE_URL}/servicios/consultor-seo-sem/#service`,
        name: 'SEO y campañas de búsqueda para negocios de Vigo',
        serviceType: 'Consultoría SEO SEM',
        url: `${SITE_URL}/servicios/consultor-seo-sem/`,
        description:
          'Revisión de búsquedas, páginas de destino y medición de contactos.',
      },
      buildBreadcrumbSchema('Consultor SEO SEM', `${SITE_URL}/servicios/consultor-seo-sem/`),
      buildFaqSchema(seoSemFaqs),
    ],
  },
  {
    slug: 'desarrollo-web',
    path: '/servicios/desarrollo-web/',
    navLabel: 'Desarrollo web',
    eyebrow: 'Desarrollo web SEO',
    title: 'Desarrollo web para negocios de Vigo | Samuel Martínez',
    description:
      'Diseño y desarrollo webs para explicar servicios, facilitar el contacto y preparar una base de SEO local en Vigo.',
    ogTitle: 'Desarrollo web para negocios de Vigo',
    ogDescription:
      'Una web que ordena tu oferta, se usa bien en móvil y deja claro cómo contactar.',
    ogType: 'website',
    h1: 'Una web que explique bien lo que haces',
    lead:
      'Diseño y desarrollo páginas para que alguien pueda entender tus servicios, encontrar la información que necesita y ponerse en contacto.',
    commercialIntent:
      'Empezaré por ordenar servicios, preguntas y vías de contacto. El diseño y la parte técnica deben ayudar a leer esa información.',
    outcomes: [
      'Páginas organizadas según lo que necesita saber cada visitante.',
      'Lectura y navegación cuidadas en móvil.',
      'Títulos, enlaces y metadatos preparados para buscadores.',
      'Contacto visible y comprobación de que el formulario funciona.',
    ],
    process: [
      'Recopilo tus servicios, materiales y las preguntas que recibes.',
      'Ordeno las páginas y preparo un diseño que dé prioridad al contenido.',
      'Construyo, reviso en móvil y publico la web con sus vías de contacto probadas.',
    ],
    faqs: webFaqs,
    related: [
      '/desarrollo-web-vigo/',
      '/seo-local-vigo/',
      '/servicios/consultor-seo-sem/',
      '/servicios/landing-pages-cro/',
    ],
    schema: [
      personSchema,
      {
        ...serviceBase(false),
        '@id': `${SITE_URL}/servicios/desarrollo-web/#service`,
        name: 'Desarrollo web para negocios de Vigo',
        serviceType: 'Desarrollo web front-end',
        url: `${SITE_URL}/servicios/desarrollo-web/`,
        description:
          'Diseño y desarrollo web con estructura clara, uso en móvil y base técnica para SEO local.',
      },
      buildBreadcrumbSchema('Desarrollo web', `${SITE_URL}/servicios/desarrollo-web/`),
      buildFaqSchema(webFaqs),
    ],
  },
  {
    slug: 'landing-pages-cro',
    path: '/servicios/landing-pages-cro/',
    navLabel: 'Landing + CRO',
    eyebrow: 'Landing pages y CRO',
    title: 'Páginas de campaña en Vigo | Samuel Martínez',
    description:
      'Páginas para una oferta y una campaña concretas: mensaje coherente, contacto visible y medición de consultas.',
    ogTitle: 'Páginas de campaña en Vigo',
    ogDescription:
      'Una página centrada en tu oferta, con una acción clara y seguimiento de los contactos.',
    ogType: 'website',
    h1: 'Una página para una oferta concreta',
    lead:
      'Si vas a promocionar un servicio, preparo una página que continúe el mensaje del anuncio y haga fácil pedir información.',
    commercialIntent:
      'La página debe responder a las dudas principales antes del formulario. También debe permitir saber de dónde llegó cada consulta.',
    outcomes: [
      'Un mensaje alineado con la campaña o el enlace de origen.',
      'Información esencial sobre la oferta en una sola página.',
      'Formulario o acción de contacto fácil de encontrar.',
      'Registro de envíos para revisar qué ocurre tras la visita.',
    ],
    process: [
      'Defino contigo la oferta, el público y la acción que esperas.',
      'Escribo y diseño la página alrededor de las dudas de ese público.',
      'Compruebo el formulario y dejo preparada la medición de contactos.',
    ],
    faqs: croFaqs,
    related: [
      '/desarrollo-web-vigo/',
      '/servicios/consultor-seo-sem/',
      '/servicios/desarrollo-web/',
      '/seo-local-vigo/',
    ],
    schema: [
      personSchema,
      {
        ...serviceBase(false),
        '@id': `${SITE_URL}/servicios/landing-pages-cro/#service`,
        name: 'Páginas de campaña para negocios de Vigo',
        serviceType: 'Landing pages CRO',
        url: `${SITE_URL}/servicios/landing-pages-cro/`,
        description:
          'Diseño de páginas de campaña con mensaje, contacto y medición coherentes.',
      },
      buildBreadcrumbSchema('Landing pages y CRO', `${SITE_URL}/servicios/landing-pages-cro/`),
      buildFaqSchema(croFaqs),
    ],
  },
  {
    slug: 'soluciones-ia',
    path: '/servicios/soluciones-ia/',
    navLabel: 'IA y chatbots',
    eyebrow: 'Consultas, reservas y citas',
    title: 'Automatización de consultas y citas en Vigo | Samuel Martínez',
    description:
      'Demos de reservas y citas para explorar cómo automatizar una tarea concreta antes de integrarla en tu negocio.',
    ogTitle: 'Automatización de consultas y citas',
    ogDescription:
      'Empieza por un proceso pequeño: atender una consulta, recoger datos o anotar una cita.',
    ogType: 'website',
    h1: 'Automatizar una tarea útil, paso a paso',
    lead:
      'Una reserva o una cita tiene varios pasos. Puedo ayudarte a ver cuáles conviene automatizar y cuáles deben seguir en manos de una persona.',
    commercialIntent:
      'Las demos de esta web muestran reservas y citas. Para un negocio real, primero definiríamos el flujo, los permisos y qué hacer cuando una consulta no encaja.',
    outcomes: [
      'Un caso de uso delimitado y fácil de revisar.',
      'Pasos claros desde el mensaje hasta la reserva o cita.',
      'Puntos en los que debe intervenir una persona.',
      'Una demo para probar el flujo antes de una integración real.',
    ],
    process: [
      'Elegimos una tarea repetitiva y anotamos sus excepciones.',
      'Preparo un flujo de prueba con mensajes, datos y salida hacia una persona.',
      'Probamos casos normales y fallos antes de decidir si integrarlo.',
    ],
    faqs: aiFaqs,
    related: [
      '/desarrollo-web-vigo/',
      '/servicios/desarrollo-web/',
      '/servicios/landing-pages-cro/',
      '/seo-local-vigo/',
    ],
    schema: [
      personSchema,
      {
        ...serviceBase(false),
        '@id': `${SITE_URL}/servicios/soluciones-ia/#service`,
        name: 'Automatización de consultas y citas para negocios de Vigo',
        serviceType: 'Soluciones con IA y chatbots',
        url: `${SITE_URL}/servicios/soluciones-ia/`,
        description:
          'Diseño de flujos de prueba para consultas, reservas y citas.',
      },
      buildBreadcrumbSchema('Soluciones con IA', `${SITE_URL}/servicios/soluciones-ia/`),
      buildFaqSchema(aiFaqs),
    ],
  },
];

const desarrolloWebVigoFaqs = [
  {
    question: '¿Qué necesitas saber antes de diseñar mi web?',
    answer:
      'Qué servicios ofreces, en qué zonas trabajas, qué preguntas te hacen y cómo prefieres recibir consultas. Con eso puedo proponer la estructura de páginas.',
  },
  {
    question: '¿La web aparecerá en Google?',
    answer:
      'Prepararé la estructura, los metadatos y la indexación para que pueda ser rastreada. La posición en los resultados dependerá de más factores y no se puede prometer.',
  },
  {
    question: '¿Podemos empezar con pocas páginas?',
    answer:
      'Sí. Podemos empezar por las páginas que expliquen tus servicios principales y añadir otras cuando haya contenido y una necesidad clara.',
  },
];

const seoLocalVigoFaqs = [
  {
    question: '¿Qué revisarías primero para el SEO local?',
    answer:
      'Tus servicios, las zonas donde atiendes, las páginas que ya tienes y el Perfil de Empresa de Google. Después compararía esa información con las búsquedas locales.',
  },
  {
    question: '¿Necesito un Perfil de Empresa de Google?',
    answer:
      'Si tu negocio cumple sus requisitos, suele ser una pieza útil. Debe mostrar datos reales, servicios, zona de atención y un enlace a la página adecuada.',
  },
  {
    question: '¿Cuándo se ven resultados?',
    answer:
      'Depende del punto de partida y de la competencia. Primero establecería qué búsquedas, visitas y contactos podemos medir; no prometería una posición ni una fecha.',
  },
];

export const localPages: ServicePage[] = [
  {
    slug: 'desarrollo-web-vigo',
    path: '/desarrollo-web-vigo/',
    navLabel: 'Desarrollo web en Vigo',
    eyebrow: 'Desarrollo web SEO en Vigo',
    title: 'Desarrollo web en Vigo para negocios de servicios | Samuel Martínez',
    description:
      'Creo webs para negocios de servicios de Vigo: oferta clara, contacto visible, buen uso en móvil y base técnica para SEO local.',
    ogTitle: 'Desarrollo web en Vigo para negocios de servicios',
    ogDescription:
      'Ordena tus servicios en una web que se entienda y facilite una consulta.',
    ogType: 'website',
    h1: 'Desarrollo web en Vigo que empieza por tu oferta',
    lead:
      'Si alguien llega desde Google o desde tu ficha de negocio, debe entender qué haces, dónde trabajas y cómo puede escribirte.',
    commercialIntent:
      'Organizo primero servicios, zonas y preguntas habituales. Después diseño las páginas y el contacto alrededor de esa información.',
    outcomes: [
      'Servicios y zonas explicados sin obligar a adivinar.',
      'Páginas legibles y navegables desde el móvil.',
      'Títulos y enlaces que distinguen cada servicio.',
      'Formulario de contacto probado antes de publicar.',
    ],
    process: [
      'Anoto tus servicios, zonas de atención y preguntas frecuentes.',
      'Preparo el mapa de páginas y escribo el contenido esencial.',
      'Desarrollo y reviso la web en móvil antes de publicarla.',
    ],
    faqs: desarrolloWebVigoFaqs,
    related: [
      '/seo-local-vigo/',
      '/servicios/desarrollo-web/',
      '/servicios/consultor-seo-sem/',
      '/servicios/soluciones-ia/',
    ],
    schema: [
      personSchema,
      {
        ...serviceBase(true),
        '@id': `${SITE_URL}/desarrollo-web-vigo/#service`,
        name: 'Desarrollo web SEO en Vigo',
        serviceType: 'Desarrollo web para pymes de servicios',
        url: `${SITE_URL}/desarrollo-web-vigo/`,
        description:
          'Webs para negocios de servicios con oferta clara, contacto y base de SEO local.',
      },
      buildBreadcrumbSchema('Desarrollo web en Vigo', `${SITE_URL}/desarrollo-web-vigo/`, true),
      buildFaqSchema(desarrolloWebVigoFaqs),
    ],
  },
  {
    slug: 'seo-local-vigo',
    path: '/seo-local-vigo/',
    navLabel: 'SEO local en Vigo',
    eyebrow: 'SEO local para pymes',
    title: 'SEO local en Vigo para negocios de servicios | Samuel Martínez',
    description:
      'Reviso páginas, búsquedas locales y Perfil de Empresa de Google para priorizar mejoras en la presencia de tu negocio en Vigo.',
    ogTitle: 'SEO local en Vigo para pymes de servicios',
    ogDescription:
      'Web, búsquedas y Perfil de Empresa de Google revisados con prioridades concretas.',
    ogType: 'website',
    h1: 'SEO local en Vigo: empieza por lo que ya muestras',
    lead:
      'Reviso cómo aparecen tus servicios y tu zona de atención en la web y en el Perfil de Empresa de Google, y qué información falta para responder a las búsquedas locales.',
    commercialIntent:
      'Una búsqueda como “servicio en Vigo” necesita una respuesta concreta. Quiero ver si tus páginas dan esa respuesta y facilitan el contacto.',
    outcomes: [
      'Revisión de servicios, zonas y datos de contacto publicados.',
      'Búsquedas locales que corresponden con lo que ofreces.',
      'Cambios propuestos para páginas y Perfil de Empresa.',
      'Punto de partida para medir consultas y formularios.',
    ],
    process: [
      'Reviso la web, el perfil local y cómo describes cada servicio.',
      'Comparo esa información con búsquedas y negocios de la zona.',
      'Ordeno los cambios y acordamos cómo comprobar su efecto.',
    ],
    faqs: seoLocalVigoFaqs,
    related: [
      '/desarrollo-web-vigo/',
      '/servicios/consultor-seo-sem/',
      '/servicios/desarrollo-web/',
      '/servicios/landing-pages-cro/',
    ],
    schema: [
      personSchema,
      {
        ...serviceBase(true),
        '@id': `${SITE_URL}/seo-local-vigo/#service`,
        name: 'SEO local en Vigo',
        serviceType: 'Consultoría SEO local',
        url: `${SITE_URL}/seo-local-vigo/`,
        description:
          'Revisión de web, búsquedas y Perfil de Empresa de Google para negocios de Vigo.',
      },
      buildBreadcrumbSchema('SEO local en Vigo', `${SITE_URL}/seo-local-vigo/`, true),
      buildFaqSchema(seoLocalVigoFaqs),
    ],
  },
];

export const allServicePages = [...servicePages, ...localPages];

export const homePage: PageSeo = {
  path: '/',
  title: 'Desarrollo web y SEO local para negocios de Vigo | Samuel Martínez',
  description:
    'Diseño y desarrollo webs, tiendas y sistemas de reservas para negocios de Vigo. Explora proyectos propios y demos antes de contarme qué necesitas.',
  ogTitle: 'Desarrollo web y SEO local en Vigo | Samuel Martínez',
  ogDescription:
    'Conoce mis proyectos propios de web, comercio y reservas, y cómo planteo una página para un negocio de Vigo.',
  ogType: 'website',
  schema: [
    {
      ...personSchema,
      offers: {
        '@type': 'OfferCatalog',
        name: 'Servicios de marketing digital y desarrollo web',
        itemListElement: allServicePages.map((service) => ({
          '@type': 'Offer',
          itemOffered: {'@id': `${SITE_URL}${service.path}#service`},
        })),
      },
    },
    professionalServiceSchema,
  ],
};

export const pages = [homePage, ...allServicePages];

export const normalizePath = (path: string) => {
  let cleanPath = path.split('?')[0].split('#')[0];
  if (cleanPath === '' || cleanPath === '/index.html') {
    return '/';
  }
  if (cleanPath.endsWith('/index.html')) {
    cleanPath = cleanPath.slice(0, -'index.html'.length);
  }
  return cleanPath.endsWith('/') ? cleanPath : `${cleanPath}/`;
};

export const findPageByPath = (path: string) =>
  pages.find((page) => page.path === normalizePath(path)) ?? homePage;

export const findServiceByPath = (path: string) =>
  allServicePages.find((page) => page.path === normalizePath(path));
