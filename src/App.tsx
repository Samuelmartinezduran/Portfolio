/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {motion, useReducedMotion} from 'motion/react';
import {HeroCollage} from './components/HeroCollage';
import {
  ChevronDown,
  ArrowRight,
  Home,
} from 'lucide-react';
import type {CSSProperties, ReactNode} from 'react';
import {useEffect, useRef, useState} from 'react';
import {
  allServicePages,
  findServiceByPath,
  localPages,
  servicePages,
  type ServicePage as ServicePageType,
} from './seo';
import {trackEvent} from './analytics';
import {Reveal, RevealGroup, RevealItem} from './components/animations/Reveal';
import {ScrollProgress} from './components/animations/ScrollProgress';
import {Seo} from './components/Seo';
import {YouTubeFacade} from './components/YouTubeFacade';

function scrollTo(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
  const el = document.getElementById(id);
  if (el) {
    e.preventDefault();
    el.scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
  }
}

const NAV_SCROLL_RANGE = 100;
const NAV_MAX_TOP = 20;
const NAV_MAX_SIDE_PADDING_VW = 20;
const NAV_MAX_SIDE_PADDING_MOBILE_VW = 6;
const NAV_RESYNC_DELAYS = [0, 80, 180];
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

function getScrollProgress(): number {
  const scrollTop = Math.max(
    window.scrollY ?? document.documentElement.scrollTop ?? document.body.scrollTop ?? 0,
    0,
  );

  return Math.min(scrollTop / NAV_SCROLL_RANGE, 1);
}

const serviceSummaries = [
  {
    ...servicePages[0],
    title: 'Web + SEO Local',
    desc: 'Reviso qué busca la gente en Vigo y preparo páginas que respondan a esas búsquedas.',
  },
  {
    ...servicePages[1],
    title: 'Web para pymes de servicios',
    desc: 'Ordeno tu oferta en una web que se entiende y se puede usar bien desde el móvil.',
  },
  {
    ...servicePages[2],
    title: 'Página de campaña',
    desc: 'Una página para una oferta concreta, con un siguiente paso visible y medible.',
  },
  {
    ...servicePages[3],
    title: 'Automatización con IA',
    desc: 'Pruebo un proceso concreto, como atender consultas o registrar citas, antes de ampliarlo.',
  },
];

export default function App({path}: {path?: string} = {}) {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [formState, setFormState] = useState<'idle' | 'sending' | 'ok' | 'error' | 'ratelimit'>('idle');
  const reduceMotion = useReducedMotion();
  // En build (SSG) la ruta llega por prop; en navegador se lee de la URL.
  const currentPath = path ?? (typeof window === 'undefined' ? '/' : window.location.pathname);
  const currentService = findServiceByPath(currentPath);

  if (currentService) {
    return (
      <div className="min-h-screen selection:bg-primary selection:text-white">
        <Seo path={currentPath} />
        <ScrollProgress />
        <Navigation />
        <ServicePage service={currentService} />
        <Footer />
      </div>
    );
  }

  const projects = [
    {
      id: 1,
      title: 'Bubble Tea España',
      category: 'Diseño web',
      description: 'Una portada para explorar una guía sobre bubble tea por ciudades.',
      detail: 'Puedes abrir la página publicada y recorrer la navegación y los contenidos.',
      status: 'Proyecto propio · página publicada',
      image: '/bubble-tea-espana.webp',
      imageAlt: 'Captura de la página de Bubble Tea España con navegación por ciudades',
      tags: ['Diseño web'],
      link: 'https://bubble-tea-ebon.vercel.app/',
      ctaLabel: 'Ver página',
      linkNote: 'Página publicada como proyecto propio.',
    },
    {
      id: 4,
      title: 'Citas por WhatsApp con IA',
      category: 'Automatización',
      description: 'Una demo de atención y citas desde una conversación de WhatsApp.',
      detail: 'El vídeo enseña cómo se responden consultas y se anota una cita en Google Calendar.',
      status: 'Demo · vídeo disponible',
      youtubeId: 'UHxZyXY4cXU' as string | null,
      imageAlt: 'Demo del agente de IA que gestiona citas por WhatsApp y Google Calendar',
      tags: ['IA'],
      link: '/#contact',
      ctaLabel: 'Pedir demostración',
      linkNote: 'Puedes ver el vídeo aquí o pedirme que te enseñe el flujo.',
    },
    {
      id: 2,
      title: 'Seguimiento de precios con alertas',
      category: 'Aplicación web',
      description: 'Una interfaz para seguir productos y consultar sus cambios de precio.',
      detail: 'Puedes recorrer el panel; las alertas necesitan el servidor del proyecto en marcha.',
      status: 'Proyecto propio · vista de interfaz',
      image: '/price-tracker-dashboard.webp',
      imageAlt:
        'Dashboard de Price Tracker con historial de precios, alertas activas y seguimiento de productos',
      tags: ['Webs y apps'],
      link: 'https://atmospheric-analyst-price-tracker.vercel.app/',
      linkNote: 'La vista publicada permite explorar la interfaz; las alertas no están activas allí.',
    },
    {
      id: 3,
      title: 'Tienda online fácil de gestionar',
      category: 'Tienda online',
      description: 'Una demo de tienda con catálogo, pagos y edición de productos.',
      detail: 'Puedes recorrer la tienda publicada y ver cómo se presenta el catálogo en móvil.',
      status: 'Demo · tienda publicada',
      image: '/e-commerce.webp',
      imageAlt: 'Captura de pantalla de la plataforma e-commerce desarrollada con React',
      tags: ['Webs y apps', 'Diseño web'],
      link: 'https://e-commerce-sigma-ochre-81.vercel.app/es',
      ctaLabel: 'Ver demostración',
      linkNote: 'Demostración publicada; una tienda real se definiría según cada negocio.',
    },
    {
      id: 0,
      title: 'Reservas online para restaurantes y bares',
      category: 'Automatización',
      description: 'Una demo que conecta las reservas de la web con un panel para el local.',
      detail: 'Aún no hay una vista pública. Puedes pedirme que te enseñe el flujo de reserva y gestión.',
      status: 'Demo · vídeo pendiente',
      youtubeId: null as string | null, // ← pega aquí el ID del vídeo de YouTube cuando lo tengas
      imageAlt: 'Demo del sistema de reservas con chatbot IA para hostelería',
      tags: ['IA', 'Webs y apps'],
      link: '/#contact',
      ctaLabel: 'Pedir demostración',
      linkNote: 'El vídeo aún no está disponible. Puedes pedirme una demostración.',
    },
  ];

  const filteredProjects =
    activeFilter === 'Todos' ? projects : projects.filter((p) => p.tags.includes(activeFilter));

  return (
    <div className="min-h-screen selection:bg-primary selection:text-white">
      <Seo path={currentPath} />
      <ScrollProgress />
      <Navigation />

      <main>
        <section className="hero section-shell">
          <div className="hero-copy">
            <p className="eyebrow"><span className="signal-dot" /> Samuel Martínez · Vigo, Galicia</p>
            <h1>Desarrollo web<br />y <span className="text-primary">SEO local</span><br /><span className="hero-location">para negocios de Vigo.</span></h1>
            <p className="hero-lead">Empiezo por lo que necesita entender quien llega a tu web. Después construyo la página, la tienda o el sistema de reservas que le ayude a dar el siguiente paso.</p>
            <div className="hero-actions">
              <a href="#projects" onClick={(e) => scrollTo(e, 'projects')} className="action-button action-primary">Ver proyectos <ArrowRight aria-hidden="true" /></a>
              <a href="#contact" onClick={(e) => scrollTo(e, 'contact')} className="action-link">Cuéntame tu proyecto <ArrowRight aria-hidden="true" /></a>
            </div>
            <div className="hero-disciplines"><span>Diseño & desarrollo</span><span>SEO local</span><span>Automatización</span></div>
          </div>
          <HeroCollage />
        </section>

        <section id="projects" className="section-space bg-surface-low px-6">
          <div className="max-w-7xl mx-auto">
            <RevealGroup className="space-y-8 mb-12">
              <RevealItem className="space-y-4">
                <p className="section-kicker"><span>01 / Trabajo seleccionado</span><span>Ideas que puedes explorar ↗</span></p>
                <h2 className="section-title">Proyectos propios.<br /><span className="text-secondary">Soluciones en marcha.</span></h2>
                <p className="max-w-2xl text-on-surface/70 leading-relaxed">
                  Son proyectos que he construido para mostrar soluciones concretas. Aquí puedes
                  ver qué hace cada uno y qué parte está disponible para probar.
                </p>
              </RevealItem>
              <RevealItem className="flex flex-wrap gap-2">
                {['Todos', 'IA', 'Webs y apps', 'Diseño web'].map((filter) => (
                  <motion.button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    aria-pressed={activeFilter === filter}
                    whileTap={reduceMotion ? undefined : {scale: 0.96}}
                    className={`px-6 py-2 rounded-md text-xs font-bold transition-all border ${
                      activeFilter === filter
                        ? 'bg-surface-high text-secondary border-primary/50'
                        : 'bg-surface text-on-surface/60 border-transparent hover:text-primary'
                    }`}
                  >
                    {filter}
                  </motion.button>
                ))}
              </RevealItem>
            </RevealGroup>

            <div className="project-grid">
              {filteredProjects.map((project, index) => (
                <motion.article
                  data-reveal-item
                  key={project.id}
                  layout={reduceMotion ? false : 'position'}
                  initial={false}
                  whileInView={reduceMotion ? undefined : {opacity: [0.6, 1], y: [20, 0]}}
                  viewport={{once: true, amount: 0.12}}
                  transition={{duration: reduceMotion ? 0 : 0.5, delay: Math.min(index * 0.04, 0.12), layout: {duration: 0.3}}}
                  className={`project-card group ${project.id === 1 || (activeFilter === 'Todos' && project.id === 3) ? 'project-featured' : ''} ${project.id === 3 ? 'project-landscape' : ''} ${'youtubeId' in project && project.youtubeId === null ? 'project-compact' : ''}`}
                >
                  {!('youtubeId' in project && project.youtubeId === null) && (
                    <div className="project-media bg-surface overflow-hidden">
                      {'youtubeId' in project && project.youtubeId ? (
                        <YouTubeFacade
                          id={project.youtubeId}
                          title={project.imageAlt ?? project.title}
                          className="w-full h-full"
                        />
                      ) : (
                        <img
                          src={(project as {image: string}).image}
                          alt={
                            project.imageAlt ??
                            `${project.title}: ${project.category} de Samuel Martínez`
                          }
                          loading="lazy"
                          width={800}
                          height={600}
                          className="w-full h-full object-cover project-image"
                        />
                      )}
                    </div>
                  )}
                  <div className="project-copy">
                      <span className="project-number" aria-hidden="true">{String(index + 1).padStart(2, '0')} /</span>
                      <span className="text-secondary text-sm font-semibold">
                        {project.category} · {project.status}
                      </span>
                      <h3 className="font-bold mt-4 text-2xl md:text-3xl">{project.title}</h3>
                      <p className="text-on-surface/80 mt-5 leading-relaxed">{project.description}</p>
                      <p className="text-on-surface/70 mt-3 text-sm leading-relaxed">{project.detail}</p>
                      {project.link && (
                        <div className="mt-auto pt-8 space-y-3">
                          <a
                            href={project.link}
                            target={project.link.startsWith('http') ? '_blank' : undefined}
                            rel={project.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="inline-flex items-center gap-2 text-primary-soft font-semibold hover:text-primary transition-colors"
                          >
                            {project.ctaLabel ?? 'Ver vista previa'}{' '}
                            <ArrowRight className="w-4 h-4" />
                          </a>
                          {project.linkNote && (
                            <p className="text-on-surface/60 text-xs leading-relaxed">
                              {project.linkNote}
                            </p>
                          )}
                        </div>
                      )}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="section-space bg-surface px-6">
          <div className="section-shell editorial-layout">
            <Reveal className="editorial-heading">
              <p className="eyebrow">02 / Lo que construimos</p>
              <h2 className="section-title">De la primera visita<br /><span className="text-primary">al contacto.</span></h2>
              <p className="section-lead">Trabajo desde una pregunta sencilla: ¿qué tiene que poder hacer alguien al llegar a tu página? A partir de ahí ordeno el contenido, construyo la web y preparo una forma clara de contactar, comprar o reservar.</p>
            </Reveal>
            <div className="service-list">
              {serviceSummaries.map((service, index) => (
                <Reveal key={service.path} delay={index * 0.06}>
                  <a href={service.path} className="service-row">
                    <span className="row-number">{String(index + 1).padStart(2, '0')}</span>
                    <div><h3>{service.title}</h3><p>{service.desc}</p></div>
                    <ArrowRight aria-hidden="true" className="row-arrow" />
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="section-space bg-surface-low px-6">
          <RevealGroup className="section-shell about-layout">
            <RevealItem className="portrait-frame">
              <img
                src="/profile.webp"
                alt="Retrato de Samuel Martínez, desarrollador web SEO y consultor de marketing digital en Vigo"
                loading="lazy"
                width={4608}
                height={3072}
                className="portrait-image"
              />
            </RevealItem>
            <RevealItem className="space-y-6">
              <p className="eyebrow">03 / Detrás de cada pantalla</p>
              <h2 className="section-title">Soy Samuel.<br /><span className="text-secondary">Construyo con intención.</span></h2>
              <p className="text-lg md:text-xl text-on-surface/80 leading-relaxed">
                Desarrollo webs, tiendas online y sistemas de reservas, con el SEO local presente
                desde la estructura de la página. Me interesa que cada pantalla explique algo útil
                y que quien la visita sepa qué puede hacer después.
              </p>
              <p className="text-on-surface/70 leading-relaxed">
                En esta web enseño proyectos propios y demos para que puedas ver mi trabajo antes
                de contarme qué necesita tu negocio.
              </p>
            </RevealItem>
          </RevealGroup>
        </section>

        <ContactSection formState={formState} setFormState={setFormState} />
      </main>

      <Footer />
    </div>
  );
}

function Navigation() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const timers: number[] = [];

    const syncProgress = () => {
      const nextProgress = getScrollProgress();
      setProgress((currentProgress) =>
        Math.abs(currentProgress - nextProgress) < 0.01 ? currentProgress : nextProgress,
      );
    };

    const scheduleSync = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(syncProgress);
    };

    window.addEventListener('scroll', scheduleSync, {passive: true});
    window.addEventListener('touchmove', scheduleSync, {passive: true});
    window.addEventListener('touchend', scheduleSync, {passive: true});
    window.addEventListener('resize', scheduleSync);
    window.addEventListener('pageshow', scheduleSync);

    scheduleSync();
    for (const delay of NAV_RESYNC_DELAYS) {
      timers.push(window.setTimeout(scheduleSync, delay));
    }

    return () => {
      window.removeEventListener('scroll', scheduleSync);
      window.removeEventListener('touchmove', scheduleSync);
      window.removeEventListener('touchend', scheduleSync);
      window.removeEventListener('resize', scheduleSync);
      window.removeEventListener('pageshow', scheduleSync);
      cancelAnimationFrame(raf);
      for (const timer of timers) {
        window.clearTimeout(timer);
      }
    };
  }, []);

  const inverseProgress = 1 - progress;
  const navStyle = {
    top: `${NAV_MAX_TOP * inverseProgress}px`,
    '--nav-mobile-side-padding': `${NAV_MAX_SIDE_PADDING_MOBILE_VW}vw`,
    '--nav-desktop-side-padding': `${NAV_MAX_SIDE_PADDING_VW}vw`,
    '--nav-progress-inverse': inverseProgress,
  } as CSSProperties;
  const innerStyle = {
    borderRadius: `${9999 * inverseProgress}px`,
  };

  return (
    <nav
      className="fixed left-0 w-full z-50 px-[calc(var(--nav-mobile-side-padding)*var(--nav-progress-inverse))] transition-[top,padding-left,padding-right] duration-200 ease-out md:px-[calc(var(--nav-desktop-side-padding)*var(--nav-progress-inverse))]"
      style={navStyle}
    >
      <div
        className="glass-nav flex items-center justify-between px-5 py-3 transition-[border-radius] duration-200 ease-out"
        style={innerStyle}
      >
        <a href="/" className="text-base font-black tracking-tighter text-primary shrink-0">
          Samuel Martínez
        </a>
        <div className="hidden md:flex gap-6 items-center text-xs font-semibold uppercase tracking-widest">
          <a href="/#projects" onClick={(e) => scrollTo(e, 'projects')} className="text-on-surface/50 hover:text-primary-soft transition-colors">
            Proyectos
          </a>
          <a href="/#services" onClick={(e) => scrollTo(e, 'services')} className="text-on-surface/50 hover:text-primary-soft transition-colors">
            Servicios
          </a>
          <a href="/#about" onClick={(e) => scrollTo(e, 'about')} className="text-on-surface/50 hover:text-primary-soft transition-colors">
            Sobre mí
          </a>
        </div>
        <a
          href="/#contact"
          onClick={(e) => scrollTo(e, 'contact')}
          className="bg-primary text-surface px-5 py-2 rounded-full font-bold text-xs hover:bg-primary-soft transition-colors shrink-0"
        >
          Contacto
        </a>
      </div>
    </nav>
  );
}

function ServicePage({service}: {service: ServicePageType}) {
  const reduceMotion = useReducedMotion();
  const relatedServices = service.related
    .map((path) => allServicePages.find((item) => item.path === path))
    .filter(Boolean) as ServicePageType[];

  return (
    <main>
      <section className="service-hero px-6 bg-surface">
        {/* Estático a propósito, igual que el hero de la home: está above the fold
            y no puede depender de IntersectionObserver para pintarse. */}
        <div className="section-shell service-hero-layout">
          <div className="space-y-8">
            <nav className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-widest text-on-surface/60">
              <a href="/" className="hover:text-secondary inline-flex items-center gap-2">
                <Home className="w-3 h-3" /> Inicio
              </a>
              <span>/</span>
              <a href="/#services" className="hover:text-secondary">
                Servicios
              </a>
              <span>/</span>
              <span className="text-secondary">{service.navLabel}</span>
            </nav>
            <div className="space-y-5">
              <span className="text-secondary font-bold text-xs uppercase tracking-widest">
                {service.eyebrow}
              </span>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.92]">
                {service.h1}
              </h1>
              <p className="text-lg md:text-xl text-on-surface/70 leading-relaxed max-w-2xl">
                {service.lead}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-surface font-bold rounded-full hover:bg-primary-soft transition-colors"
              >
                Cuéntame tu proyecto <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/#projects"
                className="inline-flex items-center justify-center px-8 py-4 border border-outline-variant/30 rounded-full hover:bg-surface-high transition-colors font-medium"
              >
                Ver proyectos
              </a>
            </div>
          </div>
          <div className="outcomes-panel space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Qué trabajaremos</h2>
            <p className="text-on-surface/60 leading-relaxed">{service.commercialIntent}</p>
            <div className="grid gap-4">
              {service.outcomes.map((outcome) => (
                <div key={outcome} className="flex gap-3 text-sm text-on-surface/70">
                  <span className="mt-2 h-2 w-2 rounded-full bg-secondary shrink-0" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space px-6 bg-surface-low">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <Reveal className="space-y-6">
            <span className="text-secondary font-bold text-xs uppercase tracking-widest">
              Proceso
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
              Así avanzamos con tu proyecto
            </h2>
          </Reveal>
          <RevealGroup className="space-y-5" delay={0.1}>
            {service.process.map((step, index) => (
              <motion.div
                data-reveal-item
                key={step}
                variants={{
                  hidden: {},
                  show: {opacity: reduceMotion ? 1 : [0.6, 1], y: reduceMotion ? 0 : [20, 0], transition: {duration: 0.6, ease: EASE_OUT}},
                }}
                className="process-row"
              >
                <span className="text-secondary font-black text-xl">{String(index + 1).padStart(2, '0')}</span>
                <p className="text-on-surface/70 leading-relaxed">{step}</p>
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section-space px-6 bg-surface">
        <div className="max-w-5xl mx-auto space-y-10">
          <Reveal className="space-y-4">
            <span className="text-secondary font-bold text-xs uppercase tracking-widest">FAQ</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
              Preguntas frecuentes
            </h2>
          </Reveal>
          <RevealGroup className="grid gap-5" delay={0.08}>
            {service.faqs.map((faq) => (
              <motion.article
                data-reveal-item
                key={faq.question}
                variants={{
                  hidden: {},
                  show: {opacity: reduceMotion ? 1 : [0.6, 1], y: reduceMotion ? 0 : [20, 0], transition: {duration: 0.6, ease: EASE_OUT}},
                }}
                className="faq-row"
              >
                <h3 className="text-lg font-bold mb-3">{faq.question}</h3>
                <p className="text-on-surface/60 leading-relaxed">{faq.answer}</p>
              </motion.article>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section-space px-6 bg-surface-low">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
          <Reveal className="space-y-4 max-w-xl">
            <span className="text-secondary font-bold text-xs uppercase tracking-widest">
              Servicios relacionados
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
              También puedes explorar
            </h2>
          </Reveal>
          <RevealGroup className="grid gap-4 min-w-[280px]" delay={0.08}>
            {relatedServices.map((related) => (
              <motion.a
                data-reveal-item
                key={related.path}
                href={related.path}
                variants={{
                  hidden: {},
                  show: {opacity: reduceMotion ? 1 : [0.6, 1], y: reduceMotion ? 0 : [20, 0], transition: {duration: 0.55, ease: EASE_OUT}},
                }}
                className="related-link group"
              >
                <span className="font-bold">{related.navLabel}</span>
                <ArrowRight className="w-4 h-4 text-primary transition-transform group-hover:translate-x-1" />
              </motion.a>
            ))}
            <motion.a
              data-reveal-item
              href="/#contact"
              variants={{
                hidden: {},
                show: {opacity: reduceMotion ? 1 : [0.6, 1], y: reduceMotion ? 0 : [20, 0], transition: {duration: 0.55, ease: EASE_OUT}},
              }}
              className="inline-flex items-center justify-between gap-8 px-6 py-4 rounded-xl bg-primary text-surface font-bold hover:bg-primary-soft transition-colors group"
            >
              <span>Cuéntame tu proyecto</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
          </RevealGroup>
        </div>
      </section>
    </main>
  );
}

function ContactSection({
  formState,
  setFormState,
}: {
  formState: 'idle' | 'sending' | 'ok' | 'error' | 'ratelimit';
  setFormState: (state: 'idle' | 'sending' | 'ok' | 'error' | 'ratelimit') => void;
}) {
  const reduceMotion = useReducedMotion();
  const formStarted = useRef(false);

  const handleFormStart = () => {
    if (formStarted.current) return;
    formStarted.current = true;
    trackEvent('form_start', {form_name: 'diagnostico_web_seo_local'});
  };

  return (
    <section id="contact" className="section-space bg-surface px-6 relative overflow-hidden">
      <RevealGroup className="section-shell contact-layout">
        <RevealItem className="contact-heading space-y-6">
          <p className="eyebrow">04 / Tu siguiente proyecto</p>
          <span className="contact-mark" aria-hidden="true">↗</span>
          <h2 className="section-title">Cuéntame qué<br /><span className="text-primary">necesita tu negocio.</span></h2>
          <p className="text-on-surface/50 text-lg">
            Dime qué haces y qué te gustaría mejorar. Leeré tu consulta y te responderé
            para concretar los siguientes pasos.
          </p>
        </RevealItem>
        <motion.form
          data-reveal-item
          variants={{
            hidden: {},
            show: {opacity: reduceMotion ? 1 : [0.6, 1], y: reduceMotion ? 0 : [20, 0], transition: {duration: 0.65, ease: EASE_OUT}},
          }}
          className="contact-form space-y-6 relative z-10"
          onFocusCapture={handleFormStart}
          onSubmit={async (e) => {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(e.currentTarget));
            setFormState('sending');
            try {
              const res = await fetch('/api/contact', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
              });
              if (res.status === 429) {
                setFormState('ratelimit');
              } else {
                if (res.ok) {
                  trackEvent('generate_lead', {
                    form_name: 'diagnostico_web_seo_local',
                    lead_type: String(data.asunto ?? 'Web + SEO local'),
                  });
                  setFormState('ok');
                } else {
                  setFormState('error');
                }
              }
            } catch {
              setFormState('error');
            }
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label
                htmlFor="nombre"
                className="text-[10px] uppercase font-bold tracking-[0.2em] text-secondary"
              >
                Nombre
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                required
                placeholder="Tu nombre"
                className="w-full bg-surface-high border border-outline-variant/20 rounded-xl p-5 focus:ring-2 focus:ring-primary/50 text-sm transition-all placeholder:text-neutral-600 outline-none"
              />
            </div>
            <div className="space-y-3">
              <label
                htmlFor="email"
                className="text-[10px] uppercase font-bold tracking-[0.2em] text-secondary"
              >
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="tu@empresa.com"
                className="w-full bg-surface-high border border-outline-variant/20 rounded-xl p-5 focus:ring-2 focus:ring-primary/50 text-sm transition-all placeholder:text-neutral-600 outline-none"
              />
            </div>
          </div>
          <div className="space-y-3">
            <label
              htmlFor="asunto"
              className="text-[10px] uppercase font-bold tracking-[0.2em] text-secondary"
            >
              ¿En qué puedo ayudarte?
            </label>
            <div className="relative">
              <select
                id="asunto"
                name="asunto"
                className="w-full bg-surface-high border border-outline-variant/20 rounded-xl p-5 focus:ring-2 focus:ring-primary/50 text-sm transition-all text-on-surface/60 appearance-none outline-none"
              >
                <option>Web + SEO local</option>
                <option>Desarrollo web</option>
                <option>SEO local</option>
                <option>Página de campaña</option>
                <option>Automatización con IA</option>
                <option>Otro</option>
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface/40 pointer-events-none" />
            </div>
          </div>
          <div className="space-y-3">
            <label
              htmlFor="mensaje"
              className="text-[10px] uppercase font-bold tracking-[0.2em] text-secondary"
            >
              Mensaje
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows={4}
              required
              placeholder="Cuéntame qué necesitas y para qué tipo de negocio..."
              className="w-full bg-surface-high border border-outline-variant/20 rounded-xl p-5 focus:ring-2 focus:ring-primary/50 text-sm transition-all placeholder:text-neutral-600 outline-none resize-none"
            />
          </div>

          {formState === 'ok' && (
            <p role="status" className="text-center text-sm font-bold text-secondary">
              ¡Mensaje enviado! Te responderé pronto.
            </p>
          )}
          {formState === 'error' && (
            <p role="alert" className="text-center text-sm font-bold text-primary">
              Algo salió mal. Inténtalo de nuevo.
            </p>
          )}
          {formState === 'ratelimit' && (
            <p role="alert" className="text-center text-sm font-bold text-primary">
              Demasiados intentos. Espera unos minutos.
            </p>
          )}

            <button
              type="submit"
              disabled={formState === 'sending' || formState === 'ok' || formState === 'ratelimit'}
              className="w-full py-5 bg-primary text-surface font-black rounded-full hover:bg-primary-soft transition-colors flex items-center justify-center gap-3 group disabled:opacity-50 disabled:pointer-events-none px-10"
            >
              {formState === 'sending' ? 'ENVIANDO...' : 'ENVIAR CONSULTA'}
              {formState !== 'sending' && (
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              )}
            </button>
        </motion.form>
      </RevealGroup>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-surface-low w-full py-16 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        <a href="/" className="text-xl font-black text-on-surface tracking-tighter">
          Samuel Martínez
        </a>
        <div className="flex flex-wrap justify-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em]">
          {servicePages.map((service) => (
            <a
              key={service.path}
              href={service.path}
              className="text-on-surface/60 hover:text-secondary transition-colors"
            >
              {service.navLabel}
            </a>
          ))}
          {localPages.map((service) => (
            <a
              key={service.path}
              href={service.path}
              className="text-on-surface/60 hover:text-secondary transition-colors"
            >
              {service.navLabel}
            </a>
          ))}
          <div className="hidden md:block w-px h-3 bg-white/10 self-center" />
          <a
            href="https://www.linkedin.com/in/samuel-martínez-durán-40a70335b"
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-surface/60 hover:text-secondary transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/Samuelmartinezduran"
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-surface/60 hover:text-secondary transition-colors"
          >
            GitHub
          </a>
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface/60">
          © 2026 Samuel Martínez. Desarrollo web y SEO local.
        </p>
      </div>
    </footer>
  );
}
