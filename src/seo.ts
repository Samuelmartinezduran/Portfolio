export const SITE_URL = 'https://samuel-martinez-portfolio.vercel.app';
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
  jobTitle: 'Desarrollador web SEO y consultor de marketing digital',
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
  name: 'Samuel Martínez | Desarrollo Web SEO y Marketing Digital',
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
      name: isLocal ? 'Servicios en Vigo' : 'Servicios',
      item: isLocal ? `${SITE_URL}/vigo/` : `${SITE_URL}/#services`,
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
    title: 'Consultor SEO SEM en España | Samuel Martínez',
    description:
      'Consultoría SEO y SEM estratégica para captar leads en toda España: auditoría, keywords, campañas y analítica accionable.',
    ogTitle: 'Consultor SEO SEM Profesional',
    ogDescription:
      'Optimiza tu visibilidad orgánica y de pago con una estrategia de marketing digital basada en datos.',
    ogType: 'website',
    h1: 'Consultor SEO SEM especializado en captación de leads',
    lead:
      'Ayudo a negocios de toda España a maximizar su inversión digital mediante auditorías profundas, gestión de campañas y analítica avanzada.',
    commercialIntent:
      'Me enfoco en encontrar los canales de tráfico más rentables para tu modelo de negocio, priorizando la conversión sobre el volumen.',
    outcomes: [
      'Estrategia de keywords por intención comercial.',
      'Optimización técnica para buscadores y campañas.',
      'Configuración avanzada de analítica y medición de conversiones.',
      'Acompañamiento estratégico para escalar el canal digital.',
    ],
    process: [
      'Auditoría y diagnóstico técnico inicial.',
      'Definición de objetivos y plan de acción táctico.',
      'Ejecución, medición y optimización continua.',
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
        ...serviceBase(false),
        '@id': `${SITE_URL}/servicios/consultor-seo-sem/#service`,
        name: 'Consultoría SEO y SEM Profesional',
        serviceType: 'Consultoría SEO SEM',
        url: `${SITE_URL}/servicios/consultor-seo-sem/`,
        description:
          'Estrategia integral de posicionamiento y captación de tráfico pagado para empresas en España.',
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
    title: 'Desarrollador Web SEO Especializado en Conversión | Samuel Martínez',
    description:
      'Desarrollo web SEO profesional: sitios rápidos, accesibles y optimizados para convertir tráfico en leads en toda España.',
    ogTitle: 'Desarrollo Web SEO Profesional',
    ogDescription:
      'Webs modernas con React preparadas para el marketing digital y el posicionamiento orgánico.',
    ogType: 'website',
    h1: 'Desarrollador web SEO enfocado en resultados de negocio',
    lead:
      'Construyo la infraestructura técnica necesaria para que tu empresa destaque en internet, con foco en velocidad, SEO técnico y UX.',
    commercialIntent:
      'No solo diseño webs; construyo activos digitales que funcionan como máquinas de captación de clientes.',
    outcomes: [
      'Desarrollo front-end de alto rendimiento.',
      'Estructura técnica optimizada para indexación y ranking.',
      'Diseño centrado en la conversión y la experiencia de usuario.',
      'Analítica integrada para tomar decisiones basadas en datos.',
    ],
    process: [
      'Análisis de requisitos y arquitectura de información.',
      'Desarrollo y optimización técnica progresiva.',
      'Despliegue y configuración de herramientas de marketing.',
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
        ...serviceBase(false),
        '@id': `${SITE_URL}/servicios/desarrollo-web/#service`,
        name: 'Desarrollo Web SEO Profesional',
        serviceType: 'Desarrollo web front-end',
        url: `${SITE_URL}/servicios/desarrollo-web/`,
        description:
          'Desarrollo de sitios web rápidos y optimizados para SEO y conversión a nivel nacional.',
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
    title: 'Landing Pages y Optimización de Conversión (CRO) | Samuel Martínez',
    description:
      'Diseño de landing pages de alta conversión y consultoría CRO para maximizar tus ventas y leads en España.',
    ogTitle: 'Landing Pages y CRO Estratégico',
    ogDescription:
      'Transforma tu tráfico en clientes con páginas optimizadas y análisis de comportamiento.',
    ogType: 'website',
    h1: 'Landing pages y CRO para maximizar tu retorno de inversión',
    lead:
      'Especialista en convertir clics en contactos mediante el diseño de páginas de aterrizaje optimizadas y el análisis continuo de embudos de venta.',
    commercialIntent:
      'Identifico y elimino los puntos de fuga de tus campañas para aumentar tu tasa de conversión sin aumentar tu presupuesto publicitario.',
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
      '/servicios/consultor-seo-sem/',
      '/servicios/desarrollo-web/',
      '/servicios/soluciones-ia/',
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
          'Diseño y optimización de conversión para campañas de marketing digital en toda España.',
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
    title: 'IA Aplicada y Chatbots Inteligentes para Negocios | Samuel Martínez',
    description:
      'Integro Inteligencia Artificial en tus procesos: chatbots, automatizaciones y asistentes personalizados para empresas en España.',
    ogTitle: 'IA y Automatización para Empresas',
    ogDescription:
      'Optimiza tu operativa con soluciones basadas en IA y agentes inteligentes.',
    ogType: 'website',
    h1: 'Soluciones con IA para transformar la eficiencia de tu negocio',
    lead:
      'Ayudo a empresas de toda España a integrar la IA generativa y la automatización en su día a día para ahorrar tiempo y mejorar la atención al cliente.',
    commercialIntent:
      'Busco implementar la IA allí donde genere un ahorro de costes real o una mejora tangible en la experiencia de tus clientes.',
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
      '/servicios/desarrollo-web/',
      '/servicios/landing-pages-cro/',
      '/servicios/consultor-seo-sem/',
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
          'Consultoría e implementación de inteligencia artificial para la mejora de procesos empresariales.',
      },
      buildBreadcrumbSchema('Soluciones con IA', `${SITE_URL}/servicios/soluciones-ia/`),
      buildFaqSchema(aiFaqs),
    ],
  },
];

export const vigoPages: ServicePage[] = [
  {
    ...servicePages[0],
    slug: 'seo-vigo',
    path: '/vigo/seo/',
    navLabel: 'SEO Vigo',
    eyebrow: 'Consultoría SEO en Vigo',
    title: 'Consultor SEO en Vigo | Posicionamiento Web Local | Samuel Martínez',
    description:
      'Consultor SEO en Vigo para empresas gallegas. Auditoría SEO local, Google Business Profile y estrategias para captar clientes en Vigo y Galicia.',
    ogTitle: 'SEO en Vigo | Posicionamiento Web Local',
    h1: 'Consultor SEO en Vigo para empresas que quieren crecer localmente',
    lead:
      'Ayudo a negocios de Vigo y alrededores a dominar los resultados locales, captar tráfico de la zona y convertir búsquedas en visitas reales.',
    schema: [
      personSchema,
      {
        ...serviceBase(true),
        '@id': `${SITE_URL}/vigo/seo/#service`,
        name: 'Consultoría SEO en Vigo',
        serviceType: 'SEO Local',
        url: `${SITE_URL}/vigo/seo/`,
        description: 'Estrategia de posicionamiento web local para negocios en Vigo y Galicia.',
      },
      buildBreadcrumbSchema('SEO en Vigo', `${SITE_URL}/vigo/seo/`, true),
      buildFaqSchema(seoSemFaqs),
    ],
  },
  {
    ...servicePages[1],
    slug: 'desarrollo-web-vigo',
    path: '/vigo/desarrollo-web/',
    navLabel: 'Web Vigo',
    eyebrow: 'Desarrollo web en Vigo',
    title: 'Desarrollador Web en Vigo | Webs Rápidas y SEO | Samuel Martínez',
    description:
      'Desarrollo web en Vigo para profesionales y pymes. Webs a medida con React, optimizadas para SEO local y listas para vender en Vigo y Galicia.',
    ogTitle: 'Desarrollo Web en Vigo | Programación y SEO',
    h1: 'Desarrollo web en Vigo para negocios gallegos con visión digital',
    lead:
      'Construyo la web de tu negocio en Vigo con tecnología moderna, asegurando que sea rápida, segura y que aparezca cuando tus vecinos te busquen.',
    schema: [
      personSchema,
      {
        ...serviceBase(true),
        '@id': `${SITE_URL}/vigo/desarrollo-web/#service`,
        name: 'Desarrollo web en Vigo',
        serviceType: 'Diseño y desarrollo web local',
        url: `${SITE_URL}/vigo/desarrollo-web/`,
        description: 'Desarrollo de sitios web optimizados para el mercado local de Vigo.',
      },
      buildBreadcrumbSchema('Desarrollo web en Vigo', `${SITE_URL}/vigo/desarrollo-web/`, true),
      buildFaqSchema(webFaqs),
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
        itemListElement: [...servicePages, ...vigoPages].map((service) => ({
          '@type': 'Offer',
          itemOffered: {'@id': `${SITE_URL}${service.path}#service`},
        })),
      },
    },
    professionalServiceSchema,
  ],
};

export const pages = [homePage, ...servicePages, ...vigoPages];

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
