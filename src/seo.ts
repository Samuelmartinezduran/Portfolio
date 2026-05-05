export const SITE_URL = 'https://samuel-martinez-portfolio.vercel.app';
export const SITE_NAME = 'Samuel Martínez';
export const PERSON_ID = `${SITE_URL}/#samuel-martinez`;
export const BUSINESS_ID = `${SITE_URL}/#desarrollo-web-seo-vigo`;
export const OG_IMAGE = `${SITE_URL}/og-image.png`;
export const PROFILE_IMAGE = `${SITE_URL}/profile.jpg`;

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
  jobTitle: 'Desarrollador web SEO y consultor de marketing digital',
  image: PROFILE_IMAGE,
  url: SITE_URL,
  sameAs: [
    'https://www.linkedin.com/in/samuel-martínez-durán-40a70335b',
    'https://github.com/anonimo4smp-blip',
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

const areaServed = [
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
  {
    '@type': 'Country',
    name: 'España',
  },
];

const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': BUSINESS_ID,
  name: 'Desarrollo web SEO y marketing digital en Vigo',
  url: SITE_URL,
  image: OG_IMAGE,
  founder: {'@id': PERSON_ID},
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Vigo',
    addressRegion: 'Galicia',
    addressCountry: 'ES',
  },
  areaServed,
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

const buildBreadcrumbSchema = (name: string, url: string) => ({
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
      name: 'Servicios',
      item: `${SITE_URL}/#services`,
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

const serviceBase = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  provider: {'@id': PERSON_ID},
  areaServed,
  image: OG_IMAGE,
};

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
    eyebrow: 'Consultoría SEO y SEM en Vigo',
    title: 'Consultor SEO SEM en Vigo | Samuel Martínez',
    description:
      'Consultoría SEO y SEM en Vigo para captar leads: auditoría, keywords, campañas, landing pages, CRO y analítica accionable.',
    ogTitle: 'Consultor SEO SEM en Vigo',
    ogDescription:
      'Auditoría SEO, SEM y analítica para convertir búsquedas locales y campañas en oportunidades comerciales.',
    ogType: 'website',
    h1: 'Consultor SEO SEM en Vigo para captar leads',
    lead:
      'Servicio para negocios de Vigo, Galicia y España que necesitan más visibilidad cualificada, campañas mejor medidas y una ruta clara desde la búsqueda hasta el contacto.',
    commercialIntent:
      'Reviso tu presencia orgánica y de pago para encontrar qué keywords, anuncios y páginas pueden generar oportunidades con menor fricción.',
    outcomes: [
      'Mapa de oportunidades SEO por intención comercial.',
      'Revisión de campañas SEM, estructura, mensajes y landing pages.',
      'Prioridades técnicas para mejorar indexación, velocidad y conversión.',
      'Plan de medición con eventos, embudos y KPIs accionables.',
    ],
    process: [
      'Diagnóstico de visibilidad, competencia y tracking actual.',
      'Priorización de keywords, campañas y páginas por impacto esperado.',
      'Entrega de plan táctico con quick wins y acciones de crecimiento.',
    ],
    faqs: seoSemFaqs,
    related: [
      '/servicios/desarrollo-web/',
      '/servicios/landing-pages-cro/',
      '/servicios/soluciones-ia/',
    ],
    schema: [
      personSchema,
      {
        ...serviceBase,
        '@id': `${SITE_URL}/servicios/consultor-seo-sem/#service`,
        name: 'Consultoría SEO y SEM en Vigo',
        serviceType: 'Consultoría SEO SEM',
        url: `${SITE_URL}/servicios/consultor-seo-sem/`,
        description:
          'Consultoría SEO y SEM para mejorar visibilidad, campañas, landing pages, CRO y analítica en Vigo y España.',
      },
      buildBreadcrumbSchema('Consultor SEO SEM', `${SITE_URL}/servicios/consultor-seo-sem/`),
      buildFaqSchema(seoSemFaqs),
    ],
  },
  {
    slug: 'desarrollo-web',
    path: '/servicios/desarrollo-web/',
    navLabel: 'Desarrollo web',
    eyebrow: 'Desarrollo web SEO en Vigo',
    title: 'Desarrollador Web SEO en Vigo | Samuel Martínez',
    description:
      'Desarrollo web SEO en Vigo: webs rápidas, accesibles y preparadas para captar leads con React, landing pages y analítica.',
    ogTitle: 'Desarrollador web SEO en Vigo',
    ogDescription:
      'Sitios front-end rápidos, medibles y preparados para captar contactos desde SEO, SEM y marketing digital.',
    ogType: 'website',
    h1: 'Desarrollador web SEO en Vigo para negocios que convierten',
    lead:
      'Construyo webs rápidas y claras para empresas y profesionales de Vigo, Galicia y España que necesitan una base técnica sólida y páginas preparadas para captar demanda.',
    commercialIntent:
      'La prioridad es que cada página cargue rápido, comunique bien la oferta y facilite la medición de contactos desde el primer día.',
    outcomes: [
      'Arquitectura front-end responsive y accesible.',
      'Metadata, schema y estructura semántica preparados para indexación.',
      'Componentes enfocados en claridad comercial y captación.',
      'Despliegue moderno con rendimiento y analítica listos para operar.',
    ],
    process: [
      'Definición de objetivos, estructura y contenidos clave.',
      'Implementación front-end con foco en rendimiento y SEO técnico.',
      'Revisión de conversión, medición y preparación para publicación.',
    ],
    faqs: webFaqs,
    related: [
      '/servicios/consultor-seo-sem/',
      '/servicios/landing-pages-cro/',
      '/servicios/soluciones-ia/',
    ],
    schema: [
      personSchema,
      {
        ...serviceBase,
        '@id': `${SITE_URL}/servicios/desarrollo-web/#service`,
        name: 'Desarrollo web SEO en Vigo',
        serviceType: 'Desarrollo web front-end',
        url: `${SITE_URL}/servicios/desarrollo-web/`,
        description:
          'Desarrollo web rápido, accesible y preparado para SEO, conversión y analítica en Vigo y España.',
      },
      buildBreadcrumbSchema('Desarrollo web', `${SITE_URL}/servicios/desarrollo-web/`),
      buildFaqSchema(webFaqs),
    ],
  },
  {
    slug: 'landing-pages-cro',
    path: '/servicios/landing-pages-cro/',
    navLabel: 'Landing + CRO',
    eyebrow: 'Landing pages y CRO en Vigo',
    title: 'Landing Pages CRO en Vigo | Samuel Martínez',
    description:
      'Landing pages y CRO en Vigo para campañas, SEO y captación de leads. Copy, diseño, velocidad, analítica y mejora continua.',
    ogTitle: 'Landing pages y CRO en Vigo',
    ogDescription:
      'Páginas de conversión para transformar tráfico cualificado en leads medibles.',
    ogType: 'website',
    h1: 'Landing pages y CRO para convertir tráfico en leads',
    lead:
      'Diseño e implemento landing pages para negocios de Vigo, Galicia y España enfocadas en una oferta concreta, con mensajes claros, velocidad y medición.',
    commercialIntent:
      'Ideal para campañas de pago, servicios B2B, lanzamientos o negocios que reciben tráfico pero no consiguen suficientes contactos.',
    outcomes: [
      'Estructura de landing page orientada a una acción principal.',
      'Copy comercial, jerarquía visual y CTAs claros.',
      'Configuración de eventos para medir leads y comportamiento.',
      'Hipótesis de mejora CRO basadas en datos y fricciones detectadas.',
    ],
    process: [
      'Análisis de oferta, tráfico esperado y objeciones del usuario.',
      'Diseño e implementación de la página con foco en conversión.',
      'Medición de eventos y propuesta de iteraciones CRO.',
    ],
    faqs: croFaqs,
    related: [
      '/servicios/consultor-seo-sem/',
      '/servicios/desarrollo-web/',
      '/servicios/soluciones-ia/',
    ],
    schema: [
      personSchema,
      {
        ...serviceBase,
        '@id': `${SITE_URL}/servicios/landing-pages-cro/#service`,
        name: 'Landing pages y CRO en Vigo',
        serviceType: 'Landing pages CRO',
        url: `${SITE_URL}/servicios/landing-pages-cro/`,
        description:
          'Diseño e implementación de landing pages con CRO, analítica y captación de leads en Vigo y España.',
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
    title: 'Soluciones con IA y Chatbots | Samuel Martínez',
    description:
      'Chatbots, asistentes y automatizaciones con IA para empresas. Integro IA en webs, procesos y herramientas de negocio.',
    ogTitle: 'Soluciones con IA para empresas',
    ogDescription:
      'Chatbots, asistentes y automatizaciones con IA conectadas a procesos reales de negocio.',
    ogType: 'website',
    h1: 'Soluciones con IA para automatizar y mejorar procesos',
    lead:
      'Implemento soluciones con inteligencia artificial, chatbots y asistentes para empresas y productos digitales que necesitan automatizar tareas, responder mejor a clientes o añadir funcionalidades inteligentes.',
    commercialIntent:
      'La prioridad es detectar un caso de uso rentable, validarlo rápido y llevarlo a una implementación práctica: conectada a tus herramientas, medible y fácil de mantener.',
    outcomes: [
      'Chatbots y asistentes para atención al cliente, soporte interno o captación.',
      'Automatizaciones para resumir, clasificar, redactar o extraer información.',
      'Integración de IA en webs, formularios, dashboards y productos digitales.',
      'Prototipos controlados antes de invertir en una solución completa.',
    ],
    process: [
      'Identificación del caso de uso, datos disponibles y herramientas implicadas.',
      'Diseño de un flujo claro con prompts, APIs, permisos y puntos de control.',
      'Implementación, pruebas y medición para asegurar utilidad real en el proceso.',
    ],
    faqs: aiFaqs,
    related: [
      '/servicios/desarrollo-web/',
      '/servicios/landing-pages-cro/',
      '/servicios/consultor-seo-sem/',
    ],
    schema: [
      personSchema,
      {
        ...serviceBase,
        '@id': `${SITE_URL}/servicios/soluciones-ia/#service`,
        name: 'Soluciones con IA para empresas',
        serviceType: 'Soluciones con IA y chatbots',
        url: `${SITE_URL}/servicios/soluciones-ia/`,
        description:
          'Implementación de soluciones con IA, chatbots, asistentes y automatizaciones para empresas y productos digitales.',
      },
      buildBreadcrumbSchema('Soluciones con IA', `${SITE_URL}/servicios/soluciones-ia/`),
      buildFaqSchema(aiFaqs),
    ],
  },
];

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
        itemListElement: servicePages.map((service) => ({
          '@type': 'Offer',
          itemOffered: {'@id': `${SITE_URL}${service.path}#service`},
        })),
      },
    },
    professionalServiceSchema,
  ],
};

export const pages = [homePage, ...servicePages];

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
  servicePages.find((page) => page.path === normalizePath(path));
