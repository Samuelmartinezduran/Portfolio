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
  jobTitle: 'Desarrollador web SEO local y consultor de marketing digital',
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
  name: 'Samuel Martínez | Desarrollo Web SEO Local y Marketing Digital',
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
    question: '¿La consultoría incluye SEO y campañas SEM?',
    answer:
      'Sí. Trabajo la visibilidad orgánica y la captación de pago de forma coordinada para priorizar palabras clave, landing pages y medición de leads.',
  },
  {
    question: '¿Qué entregables recibo tras la auditoría?',
    answer:
      'Recibes diagnóstico técnico, oportunidades por intención de búsqueda, prioridades de contenido, revisión de campañas y un plan de acciones ordenado por impacto.',
  },
  {
    question: '¿Trabajas SEO local en Vigo?',
    answer:
      'Sí. El análisis se enfoca en Vigo, Galicia y el mercado español, revisando búsquedas, competencia, idioma y patrones de conversión.',
  },
];

const webFaqs = [
  {
    question: '¿El desarrollo web incluye optimización SEO técnica?',
    answer:
      'Sí. La base se prepara con rendimiento, indexación, estructura semántica, metadata local, accesibilidad y medición para que el sitio pueda posicionar y convertir.',
  },
  {
    question: '¿Puedo usar Vercel o un hosting similar?',
    answer:
      'Sí. Construyo proyectos front-end rápidos y desplegables en Vercel u otras plataformas modernas según las necesidades del proyecto.',
  },
  {
    question: '¿También trabajas el diseño de conversión?',
    answer:
      'Sí. La interfaz se plantea para claridad, velocidad de decisión y captación de contactos, no solo para verse bien.',
  },
];

const croFaqs = [
  {
    question: '¿Qué diferencia hay entre una landing page y una web completa?',
    answer:
      'Una landing page concentra el mensaje en una oferta concreta y reduce distracciones para captar leads o ventas con más eficiencia.',
  },
  {
    question: '¿Incluyes test y medición de conversiones?',
    answer:
      'Sí. La propuesta incluye eventos, embudos y criterios de mejora para evaluar el rendimiento real de la página.',
  },
  {
    question: '¿Sirve para campañas de Google Ads o Meta Ads?',
    answer:
      'Sí. Las landing pages se diseñan para tráfico de pago, SEO local en Vigo o campañas comerciales que necesitan una ruta clara hacia el contacto.',
  },
];

const aiFaqs = [
  {
    question: '¿Qué tipo de soluciones con IA puedes implementar?',
    answer:
      'Puedo implementar chatbots, asistentes internos, automatizaciones, análisis de documentos, generación de contenido e integraciones con herramientas existentes.',
  },
  {
    question: '¿La IA se conecta con mi web o mis herramientas?',
    answer:
      'Sí. El objetivo es integrar la IA en procesos reales: formularios, bases de datos, CRMs, documentación, paneles internos o productos web.',
  },
  {
    question: '¿Empiezas con un prototipo o con una solución final?',
    answer:
      'Lo recomendable es empezar con un caso de uso concreto, validar un prototipo y después convertirlo en una solución estable, medible y mantenible.',
  },
];

export const servicePages: ServicePage[] = [
  {
    slug: 'consultor-seo-sem',
    path: '/servicios/consultor-seo-sem/',
    navLabel: 'SEO/SEM',
    eyebrow: 'Consultoría SEO y SEM',
    title: 'Consultor SEO y SEM en Vigo y Galicia | Samuel Martínez',
    description:
      'Consultoría SEO y SEM para pymes de Vigo y Galicia: estrategia local, campañas y analítica para captar contactos cualificados.',
    ogTitle: 'Consultor SEO SEM Profesional',
    ogDescription:
      'Optimiza tu visibilidad orgánica y de pago con una estrategia de marketing digital basada en datos.',
    ogType: 'website',
    h1: 'Consultor SEO y SEM para pymes de Vigo y Galicia',
    lead:
      'Ayudo a negocios de servicios a encontrar oportunidades locales, priorizar acciones y convertir la visibilidad en contactos medibles.',
    commercialIntent:
      'Trabajo SEO local, campañas y analítica como una sola estrategia: atraer búsquedas relevantes en Vigo y saber cuáles generan contactos.',
    outcomes: [
      'Prioridades por intención de búsqueda local y comercial.',
      'Mejoras técnicas y de contenido para buscadores y campañas.',
      'Medición de formularios y oportunidades de contacto.',
      'Plan de acciones claro para avanzar con criterio.',
    ],
    process: [
      'Auditoría y diagnóstico técnico inicial.',
      'Definición de objetivos y plan de acción táctico.',
      'Ejecución, medición y optimización continua.',
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
        name: 'Consultoría SEO y SEM para pymes en Vigo y Galicia',
        serviceType: 'Consultoría SEO SEM',
        url: `${SITE_URL}/servicios/consultor-seo-sem/`,
        description:
          'Estrategia de posicionamiento y captación para pymes de Vigo y Galicia.',
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
    title: 'Desarrollo Web SEO en Vigo y Galicia | Samuel Martínez',
    description:
      'Desarrollo web SEO para pymes de Vigo y Galicia: webs rápidas, claras y preparadas para generar contactos.',
    ogTitle: 'Desarrollo Web SEO Profesional',
    ogDescription:
      'Webs modernas con React preparadas para el marketing digital y el posicionamiento orgánico.',
    ogType: 'website',
    h1: 'Desarrollo web SEO para negocios de Vigo y Galicia',
    lead:
      'Creo webs rápidas y fáciles de entender para que los negocios de servicios puedan presentar su propuesta, aparecer en Google y recibir contactos.',
    commercialIntent:
      'La web se plantea como una herramienta comercial: mensaje claro, estructura para SEO local y una ruta directa hacia el contacto.',
    outcomes: [
      'Web rápida, accesible y adaptable a móvil.',
      'Estructura técnica preparada para indexación.',
      'Contenido y diseño orientados a solicitudes de contacto.',
      'Base de analítica para decidir mejoras con datos.',
    ],
    process: [
      'Análisis de requisitos y arquitectura de información.',
      'Desarrollo y optimización técnica progresiva.',
      'Despliegue y configuración de herramientas de marketing.',
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
        name: 'Desarrollo Web SEO Profesional',
        serviceType: 'Desarrollo web front-end',
        url: `${SITE_URL}/servicios/desarrollo-web/`,
        description:
          'Desarrollo de webs rápidas y orientadas a SEO local y conversión para pymes de Vigo y Galicia.',
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
    title: 'Landing Pages y CRO en Vigo y Galicia | Samuel Martínez',
    description:
      'Landing pages y CRO para pymes de Vigo y Galicia que quieren transformar campañas y visitas web en contactos.',
    ogTitle: 'Landing Pages y CRO Estratégico',
    ogDescription:
      'Transforma tu tráfico en clientes con páginas optimizadas y análisis de comportamiento.',
    ogType: 'website',
    h1: 'Landing pages y CRO para captar contactos cualificados',
    lead:
      'Diseño páginas de campaña claras, rápidas y enfocadas en una sola acción para aprovechar mejor tu inversión en tráfico local o de pago.',
    commercialIntent:
      'El trabajo se centra en entender la oferta, reducir fricción y medir qué mensajes y canales están generando oportunidades reales.',
    outcomes: [
      'Páginas de aterrizaje optimizadas para campañas de Ads.',
      'Análisis de embudos y detección de puntos de fricción.',
      'Configuración de eventos y tracking de comportamiento.',
      'Estrategia de mejora continua basada en datos reales.',
    ],
    process: [
      'Análisis de tráfico y detección de oportunidades de mejora.',
      'Diseño y ejecución de páginas de conversión.',
      'Medición, análisis y propuesta de experimentos CRO.',
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
        name: 'Landing Pages y CRO Estratégico',
        serviceType: 'Landing pages CRO',
        url: `${SITE_URL}/servicios/landing-pages-cro/`,
        description:
          'Diseño y optimización de conversión para campañas de pymes en Vigo y Galicia.',
      },
      buildBreadcrumbSchema('Landing pages y CRO', `${SITE_URL}/servicios/landing-pages-cro/`),
      buildFaqSchema(croFaqs),
    ],
  },
  {
    slug: 'soluciones-ia',
    path: '/servicios/soluciones-ia/',
    navLabel: 'IA y chatbots',
    eyebrow: 'Soluciones con IA para empresas',
    title: 'Automatización e IA para Pymes en Vigo | Samuel Martínez',
    description:
      'Automatización e IA para pymes de Vigo y Galicia: chatbots, asistentes y procesos conectados con tus herramientas.',
    ogTitle: 'IA y Automatización para Empresas',
    ogDescription:
      'Optimiza tu operativa con soluciones basadas en IA y agentes inteligentes.',
    ogType: 'website',
    h1: 'Automatización e IA práctica para pymes de Vigo y Galicia',
    lead:
      'Ayudo a negocios de servicios a aplicar IA en tareas concretas: responder consultas, gestionar reservas y conectar procesos que hoy son manuales.',
    commercialIntent:
      'Antes de elegir tecnología, identifico un proceso útil y defino cómo se medirá su impacto en la atención o la operativa.',
    outcomes: [
      'Agentes de IA personalizados para soporte y ventas.',
      'Automatización de procesos de datos y contenido.',
      'Integraciones de IA en productos y webs existentes.',
      'Consultoría técnica para la adopción segura de IA.',
    ],
    process: [
      'Evaluación de procesos y detección de casos de uso IA.',
      'Desarrollo de prototipos y asistentes inteligentes.',
      'Integración final y formación en el uso de herramientas.',
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
        name: 'IA y Automatización para Empresas',
        serviceType: 'Soluciones con IA y chatbots',
        url: `${SITE_URL}/servicios/soluciones-ia/`,
        description:
          'Consultoría e implementación de automatización e IA para pymes de Vigo y Galicia.',
      },
      buildBreadcrumbSchema('Soluciones con IA', `${SITE_URL}/servicios/soluciones-ia/`),
      buildFaqSchema(aiFaqs),
    ],
  },
];

const desarrolloWebVigoFaqs = [
  {
    question: '¿Qué incluye una web para un negocio de servicios en Vigo?',
    answer:
      'Cada proyecto parte de la oferta y del cliente ideal. La web se estructura para explicar el servicio, facilitar el contacto, cargar rápido y dar una base técnica adecuada para SEO local.',
  },
  {
    question: '¿La web estará preparada para aparecer en Google?',
    answer:
      'Sí. Se trabaja la estructura semántica, indexación, metadatos, rendimiento y las páginas necesarias para que Google entienda qué servicio ofreces y dónde lo prestas.',
  },
  {
    question: '¿Puedo añadir reservas o automatizaciones más adelante?',
    answer:
      'Sí. La web puede evolucionar con formularios, reservas, integraciones o automatizaciones cuando exista un caso de uso concreto para el negocio.',
  },
];

const seoLocalVigoFaqs = [
  {
    question: '¿Qué es el SEO local?',
    answer:
      'Es el trabajo para que un negocio sea relevante cuando alguien busca un servicio en una zona concreta. Combina la web, el Perfil de Empresa de Google, contenido útil y señales de confianza.',
  },
  {
    question: '¿Necesito un Perfil de Empresa de Google?',
    answer:
      'Para captar búsquedas locales es recomendable. Se configura con los datos reales del negocio, sus servicios, zona de atención, imágenes y un enlace directo a la página web adecuada.',
  },
  {
    question: '¿Cuándo se ven resultados?',
    answer:
      'Depende del sector, la competencia y la situación inicial. El primer paso es medir indexación, consultas y contactos para priorizar mejoras con datos, sin prometer posiciones concretas.',
  },
];

export const localPages: ServicePage[] = [
  {
    slug: 'desarrollo-web-vigo',
    path: '/desarrollo-web-vigo/',
    navLabel: 'Desarrollo web en Vigo',
    eyebrow: 'Desarrollo web SEO en Vigo',
    title: 'Desarrollo Web en Vigo | Webs para captar clientes',
    description:
      'Desarrollo web en Vigo para pymes de servicios: webs rápidas, claras y preparadas para SEO local y solicitudes de contacto.',
    ogTitle: 'Desarrollo web en Vigo para captar clientes',
    ogDescription:
      'Webs rápidas y claras para pymes de servicios de Vigo que necesitan convertir visitas en contactos.',
    ogType: 'website',
    h1: 'Desarrollo web en Vigo para captar clientes',
    lead:
      'Creo webs para pymes de servicios que necesitan explicar bien lo que hacen, llegar a clientes de Vigo y Galicia y convertir visitas en conversaciones.',
    commercialIntent:
      'No se trata de publicar una web más: se trata de ordenar tu oferta, hacerla fácil de encontrar y dirigir a cada visita hacia una solicitud de diagnóstico.',
    outcomes: [
      'Mensaje y estructura pensados para tu cliente ideal.',
      'Rendimiento, accesibilidad y base técnica para SEO local.',
      'Páginas de servicio que responden a búsquedas comerciales.',
      'Formulario de diagnóstico y medición de contactos.',
    ],
    process: [
      'Diagnóstico de la oferta, el público y las oportunidades de búsqueda local.',
      'Arquitectura de contenidos, diseño y desarrollo de las páginas prioritarias.',
      'Publicación, medición de contactos y siguientes mejoras basadas en datos.',
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
          'Desarrollo de webs rápidas y preparadas para SEO local y captación de contactos en Vigo y Galicia.',
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
    title: 'SEO Local en Vigo | Visibilidad y contactos para pymes',
    description:
      'SEO local en Vigo para pymes de servicios: estrategia web, Perfil de Empresa de Google y medición para captar contactos relevantes.',
    ogTitle: 'SEO local en Vigo para pymes de servicios',
    ogDescription:
      'Mejora la visibilidad local de tu negocio con una web clara, Perfil de Empresa de Google y medición de contactos.',
    ogType: 'website',
    h1: 'SEO local en Vigo para que te encuentren tus próximos clientes',
    lead:
      'Trabajo la web y el Perfil de Empresa de Google para que tu negocio de servicios responda mejor a las búsquedas locales y tenga una ruta clara hacia el contacto.',
    commercialIntent:
      'El objetivo no es acumular visitas sin contexto: es identificar las búsquedas que encajan con tus servicios y mejorar la información que ayuda a un cliente a elegirte.',
    outcomes: [
      'Diagnóstico de presencia local, web y búsquedas relevantes.',
      'Páginas de servicio con intención comercial y contexto geográfico real.',
      'Configuración y mejora del Perfil de Empresa de Google.',
      'Medición de consultas, visibilidad y formularios enviados.',
    ],
    process: [
      'Revisión de la oferta, competencia local y estado de indexación.',
      'Priorización de mejoras en contenido, estructura técnica y perfil local.',
      'Seguimiento de consultas y contactos para iterar con datos.',
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
          'Estrategia SEO local para pymes de servicios de Vigo y Galicia.',
      },
      buildBreadcrumbSchema('SEO local en Vigo', `${SITE_URL}/seo-local-vigo/`, true),
      buildFaqSchema(seoLocalVigoFaqs),
    ],
  },
];

export const allServicePages = [...servicePages, ...localPages];

export const homePage: PageSeo = {
  path: '/',
  title: 'Desarrollador Web SEO y Marketing Digital en Vigo',
  description:
    'Desarrollo web, SEO, SEM, soluciones con IA y marketing digital en Vigo y España para captar leads con webs rápidas, landing pages, CRO y analítica.',
  ogTitle: 'Desarrollador web SEO y marketing digital en Vigo',
  ogDescription:
    'Desarrollo web, SEO, SEM, landing pages, IA y CRO para negocios que necesitan captar leads medibles.',
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
