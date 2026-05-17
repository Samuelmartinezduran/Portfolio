/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {motion, useReducedMotion} from 'motion/react';
import {
  Search,
  Code,
  TrendingUp,
  Bot,
  ChevronDown,
  ArrowRight,
  Home,
} from 'lucide-react';
import type {CSSProperties, ReactNode} from 'react';
import {useEffect, useState} from 'react';
import {findServiceByPath, servicePages, type ServicePage as ServicePageType} from './seo';
import {Reveal, RevealGroup, RevealItem} from './components/animations/Reveal';
import {SplitText} from './components/animations/SplitText';
import {Magnetic} from './components/animations/Magnetic';
import {LiquidCursor} from './components/animations/LiquidCursor';
import {ParallaxBlob} from './components/animations/ParallaxBlob';
import {TiltCard} from './components/animations/TiltCard';
import {ScrollProgress} from './components/animations/ScrollProgress';

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

const serviceIconBySlug = {
  'consultor-seo-sem': <Search className="w-8 h-8" />,
  'desarrollo-web': <Code className="w-8 h-8" />,
  'landing-pages-cro': <TrendingUp className="w-8 h-8" />,
  'soluciones-ia': <Bot className="w-8 h-8" />,
};

const serviceSummaries = [
  {
    ...servicePages[0],
    icon: serviceIconBySlug['consultor-seo-sem'],
    title: 'Auditoría SEO & SEM',
    desc: 'Análisis de visibilidad, intención de búsqueda y optimización de campañas de pago.',
  },
  {
    ...servicePages[1],
    icon: serviceIconBySlug['desarrollo-web'],
    title: 'Desarrollo Web SEO',
    desc: 'Webs rápidas para Vigo y España, preparadas para SEO, móvil, analítica y conversión.',
  },
  {
    ...servicePages[2],
    icon: serviceIconBySlug['landing-pages-cro'],
    title: 'Landing Pages y CRO',
    desc: 'Páginas orientadas a captar leads desde campañas, SEO local y marketing digital.',
  },
  {
    ...servicePages[3],
    icon: serviceIconBySlug['soluciones-ia'],
    title: 'Soluciones con IA',
    desc: 'Chatbots, asistentes y automatizaciones con IA conectadas a procesos reales.',
  },
];

export default function App() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [formState, setFormState] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const reduceMotion = useReducedMotion();
  const currentService = findServiceByPath(window.location.pathname);

  if (currentService) {
    return (
      <div className="min-h-screen selection:bg-primary selection:text-white">
        <LiquidCursor />
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
      category: 'Landing Page',
      description:
        'Landing editorial para una guía de autor sobre bubble tea en España, con ciudades destacadas, jerarquía visual premium y CTAs orientados a exploración y ranking.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB_QDsx6cbv7uYVuBzXgGtWC5VRpwLr6MEOqB6iFsF0tJ9brXx_sNt_Ht_Abus9XAmhfHk038WNKJzffFKr7P92DMkCK1rclHwq2UOC77BRyp0Pe3WJ_sQqvTKfDZCK8f-261KkrPhddtmP7YJCjiOH-Vvl89QFE7ooSEoTR7sZH3OHMUc8q_EbVR_j1f_yFcGmcPhrWbL9OLYsmSZw-keGDSgxktrSwUx11OkmsAC-zU0j_QxvHJ99t-blp2aH__Rdo4NfoXo6u_d9',
      size: 'large',
      tags: ['LANDINGS'],
      link: 'https://bubble-tea-ebon.vercel.app/',
      ctaLabel: 'Ver Landing',
      linkNote:
        'Referencia publicada en Vercel para Bubble Tea España, integrada como muestra de diseño editorial y conversión.',
    },
    {
      id: 2,
      title: 'Price Tracker con Alertas en Tiempo Real',
      category: 'Web Development',
      description:
        'Aplicación web que monitorea precios de productos y notifica al usuario cuando alcanzan el umbral deseado.',
      image: '/price-tracker-dashboard.png',
      imageAlt:
        'Dashboard de Price Tracker con historial de precios, alertas activas y seguimiento de productos',
      size: 'large',
      tags: ['WEB DEV'],
      link: 'https://atmospheric-analyst-price-tracker.vercel.app/',
      linkNote: 'Vista previa — el backend requiere descarga desde GitHub para funcionar.',
    },
    {
      id: 3,
      title: 'E-commerce Experience',
      category: 'Web Development',
      description:
        'Plataforma de comercio electrónico con enfoque en UX, catálogo dinámico y optimización de conversión.',
      image: '/e-commerce.png',
      size: 'large',
      tags: ['WEB DEV', 'LANDINGS'],
      link: 'https://e-commerce-nine-topaz-59.vercel.app/',
      ctaLabel: 'Ver Proyecto',
      linkNote: 'Desarrollado con React y optimizado para SEO y rendimiento.',
    },
  ];

  const filteredProjects =
    activeFilter === 'ALL' ? projects : projects.filter((p) => p.tags.includes(activeFilter));

  return (
    <div className="min-h-screen selection:bg-primary selection:text-white">
      <LiquidCursor />
      <ScrollProgress />
      <Navigation />

      <section className="relative isolate min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden pt-20">
        <motion.div
          initial={reduceMotion ? false : 'hidden'}
          animate={reduceMotion ? undefined : 'show'}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
              },
            },
          }}
          className="max-w-5xl mx-auto text-center space-y-8"
        >
          <motion.h1
            variants={{
              hidden: {opacity: 0, y: 24},
              show: {opacity: 1, y: 0, transition: {duration: 0.75, ease: EASE_OUT}},
            }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9]"
          >
            <SplitText text="Desarrollador Web SEO" /> <br />
            <SplitText text="y Marketing Digital en" />{' '}
            <span className="text-editorial-gradient">Vigo</span>
          </motion.h1>
          <motion.p
            variants={{
              hidden: {opacity: 0, y: 18},
              show: {opacity: 1, y: 0, transition: {duration: 0.65, ease: EASE_OUT}},
            }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-on-surface/70 leading-relaxed font-light"
          >
            Desarrollo web, SEO, SEM y marketing digital en Vigo para negocios que quieren captar
            leads con webs rápidas, landing pages, IA, CRO y analítica digital.
          </motion.p>
          <motion.div
            variants={{
              hidden: {opacity: 0, y: 16},
              show: {opacity: 1, y: 0, transition: {duration: 0.6, ease: EASE_OUT}},
            }}
            className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4"
          >
            <Magnetic>
              <motion.a
                href="#projects"
                whileHover={reduceMotion ? undefined : {y: -2}}
                whileTap={reduceMotion ? undefined : {scale: 0.98}}
                className="w-full md:w-auto px-10 py-4 bg-[linear-gradient(135deg,#ff5f1f,#832700)] text-white font-bold rounded-full hover:shadow-[0_0_30px_rgba(255,95,31,0.4)] transition-all text-center block"
              >
                Ver Proyectos
              </motion.a>
            </Magnetic>
            <Magnetic>
              <motion.a
                href="#services"
                whileHover={reduceMotion ? undefined : {y: -2}}
                whileTap={reduceMotion ? undefined : {scale: 0.98}}
                className="w-full md:w-auto px-10 py-4 border border-outline-variant/30 rounded-full hover:bg-surface-high transition-colors font-medium text-center block"
              >
                Mis Servicios
              </motion.a>
            </Magnetic>
          </motion.div>
        </motion.div>
      </section>

      <section id="projects" className="py-32 bg-surface-low px-6">
        <div className="max-w-7xl mx-auto">
          <RevealGroup className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <RevealItem className="space-y-4">
              <span className="text-secondary font-bold text-xs uppercase tracking-widest">
                Portfolio SEO y desarrollo web
              </span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
                Proyectos Destacados
              </h2>
            </RevealItem>
            <RevealItem className="flex flex-wrap gap-2">
              {['ALL', 'SEM/SEO', 'WEB DEV', 'LANDINGS'].map((filter) => (
                <motion.button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  whileTap={reduceMotion ? undefined : {scale: 0.96}}
                  className={`px-6 py-2 rounded-md text-xs font-bold transition-all border ${
                    activeFilter === filter
                      ? 'bg-surface-high text-secondary border-primary/50'
                      : 'bg-surface text-on-surface/40 border-transparent hover:text-primary'
                  }`}
                >
                  {filter}
                </motion.button>
              ))}
            </RevealItem>
          </RevealGroup>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {filteredProjects.map((project) => (
              <TiltCard
                key={project.id}
                className={`${
                  project.size === 'large' ? 'md:col-span-8' : 'md:col-span-4'
                } group`}
              >
                <motion.div
                  layout
                  initial={reduceMotion ? false : {opacity: 0, y: 28}}
                  whileInView={reduceMotion ? undefined : {opacity: 1, y: 0}}
                  viewport={{once: true, amount: 0.2}}
                  transition={{duration: 0.6, ease: EASE_OUT}}
                  className="flex flex-col md:flex-row rounded-2xl bg-surface-high transition-shadow duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] overflow-hidden h-full"
                >
                  <div
                    className={`overflow-hidden shrink-0 ${
                      project.size === 'large' ? 'md:w-1/2' : 'md:w-2/5'
                    }`}
                  >
                    <img
                      src={project.image}
                      alt={
                        project.imageAlt ??
                        `${project.title}: ${project.category} de Samuel Martínez`
                      }
                      referrerPolicy="no-referrer"
                      className="w-full h-72 md:h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-50 group-hover:opacity-100"
                    />
                  </div>
                  <div className="flex flex-col justify-start p-8 pt-10 self-start w-full">
                    <span className="text-secondary text-[10px] font-bold uppercase tracking-widest">
                      {project.category}
                    </span>
                    <h3
                      className={`font-bold mt-3 ${
                        project.size === 'large' ? 'text-2xl md:text-3xl' : 'text-xl'
                      }`}
                    >
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="text-on-surface/60 mt-3 text-sm md:text-base leading-relaxed">
                        {project.description}
                      </p>
                    )}
                    {project.link && (
                      <div className="mt-6 space-y-2">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor="hover"
                          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/40 text-primary text-xs font-bold hover:bg-primary/10 transition-all group/link"
                        >
                          {project.ctaLabel ?? 'Ver Vista Previa'}{' '}
                          <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-1" />
                        </a>
                        {project.linkNote && (
                          <p className="text-on-surface/30 text-[11px] leading-relaxed">
                            {project.linkNote}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-32 bg-surface px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <Reveal className="space-y-8">
              <h2 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter">
                Soluciones <br /> que <span className="text-secondary">Convierten.</span>
              </h2>
              <p className="text-lg md:text-xl text-on-surface/60 leading-relaxed max-w-md">
                Desarrollo web SEO, consultoría SEO SEM, landing pages, soluciones con IA y analítica
                para negocios de Vigo, Galicia y España que necesitan convertir tráfico en contactos.
              </p>
            </Reveal>
            <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-6" delay={0.1}>
              {serviceSummaries.map((service) => (
                <motion.a
                  key={service.title}
                  href={service.path}
                  variants={{
                    hidden: {opacity: 0, y: 22},
                    show: {opacity: 1, y: 0, transition: {duration: 0.6, ease: EASE_OUT}},
                  }}
                  whileHover={reduceMotion ? undefined : {y: -6}}
                  className="p-10 rounded-2xl bg-surface-low border border-white/5 hover:bg-surface-high transition-colors duration-300 group"
                >
                  <div className="text-secondary mb-6 group-hover:text-primary transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-sm text-on-surface/50 leading-relaxed">{service.desc}</p>
                  <span className="inline-flex items-center gap-2 mt-6 text-xs font-bold text-primary">
                    Ver servicio{' '}
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </motion.a>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      <section id="about" className="py-32 bg-surface-low px-6">
        <RevealGroup className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-8">
          <RevealItem className="w-40 h-40 rounded-full overflow-hidden border-4 border-surface-high shadow-2xl">
            <img
              src="/profile.jpg"
              alt="Retrato de Samuel Martínez, desarrollador web SEO y consultor de marketing digital en Vigo"
              className="w-full h-full object-cover"
            />
          </RevealItem>
          <RevealItem>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Desarrollador web SEO con mentalidad de negocio
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="text-xl md:text-2xl text-on-surface/80 leading-relaxed italic font-light">
              "Mi enfoque combina desarrollo web, SEO, SEM, CRO, IA, marketing digital y analítica
              para que cada solución tenga una función comercial clara."
            </p>
          </RevealItem>
        </RevealGroup>
      </section>

      <ContactSection formState={formState} setFormState={setFormState} />
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
          <a href="/#projects" className="text-on-surface/50 hover:text-primary-soft transition-colors">
            Proyectos
          </a>
          <a href="/#services" className="text-on-surface/50 hover:text-primary-soft transition-colors">
            Servicios
          </a>
          <a href="/#about" className="text-on-surface/50 hover:text-primary-soft transition-colors">
            Sobre mí
          </a>
        </div>
        <a
          href="/#contact"
          className="bg-[linear-gradient(135deg,#ff5f1f,#832700)] text-white px-5 py-2 rounded-full font-bold text-xs hover:shadow-[0_0_20px_rgba(255,95,31,0.3)] transition-all active:scale-95 shrink-0"
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
    .map((path) => servicePages.find((item) => item.path === path))
    .filter(Boolean) as ServicePageType[];

  return (
    <main>
      <section className="pt-40 pb-24 px-6 bg-surface">
        <RevealGroup className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
          <RevealItem className="space-y-8">
            <nav className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-widest text-on-surface/40">
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
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[linear-gradient(135deg,#ff5f1f,#832700)] text-white font-bold rounded-full hover:shadow-[0_0_30px_rgba(255,95,31,0.35)] transition-all"
              >
                Pedir propuesta <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/#projects"
                className="inline-flex items-center justify-center px-8 py-4 border border-outline-variant/30 rounded-full hover:bg-surface-high transition-colors font-medium"
              >
                Ver proyectos
              </a>
            </div>
          </RevealItem>
          <RevealItem className="rounded-2xl bg-surface-low border border-white/5 p-8 md:p-10 space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Enfoque comercial</h2>
            <p className="text-on-surface/60 leading-relaxed">{service.commercialIntent}</p>
            <div className="grid gap-4">
              {service.outcomes.map((outcome) => (
                <div key={outcome} className="flex gap-3 text-sm text-on-surface/70">
                  <span className="mt-2 h-2 w-2 rounded-full bg-secondary shrink-0" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </RevealItem>
        </RevealGroup>
      </section>

      <section className="py-24 px-6 bg-surface-low">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <Reveal className="space-y-6">
            <span className="text-secondary font-bold text-xs uppercase tracking-widest">
              Proceso
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
              De diagnóstico a ejecución medible
            </h2>
          </Reveal>
          <RevealGroup className="space-y-5" delay={0.1}>
            {service.process.map((step, index) => (
              <motion.div
                key={step}
                variants={{
                  hidden: {opacity: 0, y: 22},
                  show: {opacity: 1, y: 0, transition: {duration: 0.6, ease: EASE_OUT}},
                }}
                whileHover={reduceMotion ? undefined : {x: 4}}
                className="flex gap-5 p-6 rounded-2xl bg-surface border border-white/5"
              >
                <span className="text-secondary font-black text-xl">{index + 1}</span>
                <p className="text-on-surface/70 leading-relaxed">{step}</p>
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="py-24 px-6 bg-surface">
        <div className="max-w-5xl mx-auto space-y-10">
          <Reveal className="space-y-4 text-center">
            <span className="text-secondary font-bold text-xs uppercase tracking-widest">FAQ</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
              Preguntas frecuentes
            </h2>
          </Reveal>
          <RevealGroup className="grid gap-5" delay={0.08}>
            {service.faqs.map((faq) => (
              <motion.article
                key={faq.question}
                variants={{
                  hidden: {opacity: 0, y: 22},
                  show: {opacity: 1, y: 0, transition: {duration: 0.6, ease: EASE_OUT}},
                }}
                className="p-7 rounded-2xl bg-surface-low border border-white/5"
              >
                <h3 className="text-lg font-bold mb-3">{faq.question}</h3>
                <p className="text-on-surface/60 leading-relaxed">{faq.answer}</p>
              </motion.article>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="py-24 px-6 bg-surface-low">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
          <Reveal className="space-y-4 max-w-xl">
            <span className="text-secondary font-bold text-xs uppercase tracking-widest">
              Servicios relacionados
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
              Completa la estrategia
            </h2>
          </Reveal>
          <RevealGroup className="grid gap-4 min-w-[280px]" delay={0.08}>
            {relatedServices.map((related) => (
              <motion.a
                key={related.path}
                href={related.path}
                variants={{
                  hidden: {opacity: 0, y: 18},
                  show: {opacity: 1, y: 0, transition: {duration: 0.55, ease: EASE_OUT}},
                }}
                whileHover={reduceMotion ? undefined : {x: 4}}
                className="inline-flex items-center justify-between gap-8 px-6 py-4 rounded-2xl bg-surface border border-white/5 hover:border-primary/40 transition-colors group"
              >
                <span className="font-bold">{related.navLabel}</span>
                <ArrowRight className="w-4 h-4 text-primary transition-transform group-hover:translate-x-1" />
              </motion.a>
            ))}
            <motion.a
              href="/#contact"
              variants={{
                hidden: {opacity: 0, y: 18},
                show: {opacity: 1, y: 0, transition: {duration: 0.55, ease: EASE_OUT}},
              }}
              whileHover={reduceMotion ? undefined : {x: 4}}
              className="inline-flex items-center justify-between gap-8 px-6 py-4 rounded-2xl bg-primary text-white font-bold hover:bg-primary/90 transition-colors group"
            >
              <span>Hablar del proyecto</span>
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
  formState: 'idle' | 'sending' | 'ok' | 'error';
  setFormState: (state: 'idle' | 'sending' | 'ok' | 'error') => void;
}) {
  return (
    <section id="contact" className="py-32 bg-surface px-6 relative overflow-hidden">
      <RevealGroup className="max-w-3xl mx-auto">
        <RevealItem className="mb-16 text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">¿Listo para escalar?</h2>
          <p className="text-on-surface/50 text-lg">
            Hablemos sobre tu próximo proyecto y cómo podemos alcanzar tus objetivos.
          </p>
        </RevealItem>
        <motion.form
          variants={{
            hidden: {opacity: 0, y: 24},
            show: {opacity: 1, y: 0, transition: {duration: 0.65, ease: EASE_OUT}},
          }}
          className="space-y-8 bg-surface-low p-8 md:p-16 rounded-3xl shadow-2xl relative z-10 border border-white/5"
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
              setFormState(res.ok ? 'ok' : 'error');
            } catch {
              setFormState('error');
            }
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-secondary">
                Nombre
              </label>
              <input
                name="nombre"
                type="text"
                required
                placeholder="John Doe"
                className="w-full bg-surface-high border border-outline-variant/20 rounded-xl p-5 focus:ring-2 focus:ring-primary/50 text-sm transition-all placeholder:text-neutral-600 outline-none"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-secondary">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="john@company.com"
                className="w-full bg-surface-high border border-outline-variant/20 rounded-xl p-5 focus:ring-2 focus:ring-primary/50 text-sm transition-all placeholder:text-neutral-600 outline-none"
              />
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-secondary">
              Asunto
            </label>
            <div className="relative">
              <select
                name="asunto"
                className="w-full bg-surface-high border border-outline-variant/20 rounded-xl p-5 focus:ring-2 focus:ring-primary/50 text-sm transition-all text-on-surface/60 appearance-none outline-none"
              >
                <option>Desarrollo Web</option>
                <option>Estrategia SEO/SEM</option>
                <option>Landing Pages y CRO</option>
                <option>Soluciones con IA</option>
                <option>Consultoría Integral</option>
                <option>Otro</option>
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface/40 pointer-events-none" />
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-secondary">
              Mensaje
            </label>
            <textarea
              name="mensaje"
              rows={4}
              required
              placeholder="Cuéntame sobre tu proyecto..."
              className="w-full bg-surface-high border border-outline-variant/20 rounded-xl p-5 focus:ring-2 focus:ring-primary/50 text-sm transition-all placeholder:text-neutral-600 outline-none resize-none"
            />
          </div>

          {formState === 'ok' && (
            <p className="text-center text-sm font-bold text-secondary">
              ¡Mensaje enviado! Te responderé pronto.
            </p>
          )}
          {formState === 'error' && (
            <p className="text-center text-sm font-bold text-primary">
              Algo salió mal. Inténtalo de nuevo.
            </p>
          )}

          <Magnetic>
            <button
              type="submit"
              disabled={formState === 'sending' || formState === 'ok'}
              className="w-full py-5 bg-[linear-gradient(135deg,#ff5f1f,#832700)] text-white font-black rounded-full shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group disabled:opacity-50 disabled:pointer-events-none px-10"
            >
              {formState === 'sending' ? 'ENVIANDO...' : 'ENVIAR PROPUESTA'}
              {formState !== 'sending' && (
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              )}
            </button>
          </Magnetic>
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
              className="text-on-surface/40 hover:text-secondary transition-colors"
            >
              {service.navLabel}
            </a>
          ))}
          <a
            href="https://www.linkedin.com/in/samuel-martínez-durán-40a70335b"
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-surface/40 hover:text-secondary transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/anonimo4smp-blip"
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-surface/40 hover:text-secondary transition-colors"
          >
            GitHub
          </a>
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface/20">
          © 2026 Samuel Martínez. Marketing & Code.
        </p>
      </div>
    </footer>
  );
}
