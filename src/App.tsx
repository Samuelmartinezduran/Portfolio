/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {motion} from 'motion/react';
import {
  Search,
  Code,
  TrendingUp,
  BarChart3,
  ChevronDown,
  ArrowRight,
  Home,
} from 'lucide-react';
import {useEffect, useState} from 'react';
import {findServiceByPath, servicePages, type ServicePage as ServicePageType} from './seo';

const serviceIconBySlug = {
  'consultor-seo-sem': <Search className="w-8 h-8" />,
  'desarrollo-web': <Code className="w-8 h-8" />,
  'landing-pages-cro': <TrendingUp className="w-8 h-8" />,
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
    icon: <BarChart3 className="w-8 h-8" />,
    title: 'Analítica Digital',
    desc: 'Medición de eventos, embudos y reportes para tomar decisiones con datos reales.',
    path: '/#contact',
  },
];

export default function App() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [formState, setFormState] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const currentService = findServiceByPath(window.location.pathname);

  useEffect(() => {
    const onScroll = () => setScrollProgress(Math.min(window.scrollY / 100, 1));
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (currentService) {
    return (
      <div className="min-h-screen selection:bg-primary selection:text-white">
        <Navigation scrollProgress={scrollProgress} />
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
      image: '/price-tracker-desktop.png',
      size: 'large',
      tags: ['WEB DEV'],
      link: 'https://atmospheric-analyst-price-tracker.vercel.app/',
      linkNote: 'Vista previa — el backend requiere descarga desde GitHub para funcionar.',
    },
  ];

  const filteredProjects =
    activeFilter === 'ALL' ? projects : projects.filter((p) => p.tags.includes(activeFilter));

  return (
    <div className="min-h-screen selection:bg-primary selection:text-white">
      <Navigation scrollProgress={scrollProgress} />

      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden pt-20">
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.8}}
          className="max-w-5xl mx-auto text-center space-y-8"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9]">
            Desarrollador Web SEO <br />y Marketing Digital en{' '}
            <span className="text-editorial-gradient">Vigo</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-on-surface/70 leading-relaxed font-light">
            Desarrollo web, SEO, SEM y marketing digital en Vigo para negocios que quieren captar
            leads con webs rápidas, landing pages, CRO y analítica digital.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#projects"
              className="w-full md:w-auto px-10 py-4 bg-[linear-gradient(135deg,#ff5f1f,#832700)] text-white font-bold rounded-full hover:shadow-[0_0_30px_rgba(255,95,31,0.4)] transition-all text-center"
            >
              Ver Proyectos
            </a>
            <a
              href="#services"
              className="w-full md:w-auto px-10 py-4 border border-outline-variant/30 rounded-full hover:bg-surface-high transition-colors font-medium text-center"
            >
              Mis Servicios
            </a>
          </div>
        </motion.div>
      </section>

      <section id="projects" className="py-32 bg-surface-low px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="space-y-4">
              <span className="text-secondary font-bold text-xs uppercase tracking-widest">
                Portfolio SEO y desarrollo web
              </span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
                Proyectos Destacados
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {['ALL', 'SEM/SEO', 'WEB DEV', 'LANDINGS'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-2 rounded-md text-xs font-bold transition-all border ${
                    activeFilter === filter
                      ? 'bg-surface-high text-secondary border-primary/50'
                      : 'bg-surface text-on-surface/40 border-transparent hover:text-primary'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                className={`${
                  project.size === 'large' ? 'md:col-span-8' : 'md:col-span-4'
                } group flex flex-col md:flex-row rounded-2xl bg-surface-high transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] overflow-hidden`}
              >
                <div
                  className={`overflow-hidden shrink-0 ${
                    project.size === 'large' ? 'md:w-1/2' : 'md:w-2/5'
                  }`}
                >
                  <img
                    src={project.image}
                    alt={`${project.title}: ${project.category} de Samuel Martínez`}
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
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/40 text-primary text-xs font-bold hover:bg-primary/10 transition-all"
                      >
                        {project.ctaLabel ?? 'Ver Vista Previa'} <ArrowRight className="w-3 h-3" />
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
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-32 bg-surface px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter">
                Soluciones <br /> que <span className="text-secondary">Convierten.</span>
              </h2>
              <p className="text-lg md:text-xl text-on-surface/60 leading-relaxed max-w-md">
                Desarrollo web SEO, consultoría SEO SEM, landing pages y analítica para negocios de
                Vigo, Galicia y España que necesitan convertir tráfico en contactos.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {serviceSummaries.map((service) => (
                <a
                  key={service.title}
                  href={service.path}
                  className="p-10 rounded-2xl bg-surface-low border border-white/5 hover:bg-surface-high transition-all group"
                >
                  <div className="text-secondary mb-6 group-hover:text-primary transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-sm text-on-surface/50 leading-relaxed">{service.desc}</p>
                  <span className="inline-flex items-center gap-2 mt-6 text-xs font-bold text-primary">
                    Ver servicio <ArrowRight className="w-3 h-3" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-32 bg-surface-low px-6">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-8">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-surface-high shadow-2xl">
            <img
              src="/profile.jpg"
              alt="Retrato de Samuel Martínez, desarrollador web SEO y consultor de marketing digital en Vigo"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Desarrollador web SEO con mentalidad de negocio
          </h2>
          <p className="text-xl md:text-2xl text-on-surface/80 leading-relaxed italic font-light">
            "Mi enfoque combina desarrollo web, SEO, SEM, CRO, marketing digital y analítica para
            que cada página tenga una función comercial clara."
          </p>
        </div>
      </section>

      <ContactSection formState={formState} setFormState={setFormState} />
      <Footer />
    </div>
  );
}

function Navigation({scrollProgress}: {scrollProgress: number}) {
  return (
    <nav
      className="fixed left-0 w-full z-50"
      style={{
        top: `${20 * (1 - scrollProgress)}px`,
        paddingLeft: `${20 * (1 - scrollProgress)}vw`,
        paddingRight: `${20 * (1 - scrollProgress)}vw`,
      }}
    >
      <div
        className="glass-nav flex items-center justify-between px-5 py-3"
        style={{borderRadius: `${9999 * (1 - scrollProgress)}px`}}
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
  const relatedServices = service.related
    .map((path) => servicePages.find((item) => item.path === path))
    .filter(Boolean) as ServicePageType[];

  return (
    <main>
      <section className="pt-40 pb-24 px-6 bg-surface">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
          <div className="space-y-8">
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
          </div>
          <div className="rounded-2xl bg-surface-low border border-white/5 p-8 md:p-10 space-y-6">
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
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-surface-low">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-6">
            <span className="text-secondary font-bold text-xs uppercase tracking-widest">
              Proceso
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
              De diagnóstico a ejecución medible
            </h2>
          </div>
          <div className="space-y-5">
            {service.process.map((step, index) => (
              <div
                key={step}
                className="flex gap-5 p-6 rounded-2xl bg-surface border border-white/5"
              >
                <span className="text-secondary font-black text-xl">{index + 1}</span>
                <p className="text-on-surface/70 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-surface">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="space-y-4 text-center">
            <span className="text-secondary font-bold text-xs uppercase tracking-widest">FAQ</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
              Preguntas frecuentes
            </h2>
          </div>
          <div className="grid gap-5">
            {service.faqs.map((faq) => (
              <article key={faq.question} className="p-7 rounded-2xl bg-surface-low border border-white/5">
                <h3 className="text-lg font-bold mb-3">{faq.question}</h3>
                <p className="text-on-surface/60 leading-relaxed">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-surface-low">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
          <div className="space-y-4 max-w-xl">
            <span className="text-secondary font-bold text-xs uppercase tracking-widest">
              Servicios relacionados
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
              Completa la estrategia
            </h2>
          </div>
          <div className="grid gap-4 min-w-[280px]">
            {relatedServices.map((related) => (
              <a
                key={related.path}
                href={related.path}
                className="inline-flex items-center justify-between gap-8 px-6 py-4 rounded-2xl bg-surface border border-white/5 hover:border-primary/40 transition-colors"
              >
                <span className="font-bold">{related.navLabel}</span>
                <ArrowRight className="w-4 h-4 text-primary" />
              </a>
            ))}
            <a
              href="/#contact"
              className="inline-flex items-center justify-between gap-8 px-6 py-4 rounded-2xl bg-primary text-white font-bold hover:bg-primary/90 transition-colors"
            >
              <span>Hablar del proyecto</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
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
      <div className="max-w-3xl mx-auto">
        <div className="mb-16 text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">¿Listo para escalar?</h2>
          <p className="text-on-surface/50 text-lg">
            Hablemos sobre tu próximo proyecto y cómo podemos alcanzar tus objetivos.
          </p>
        </div>
        <form
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

          <button
            type="submit"
            disabled={formState === 'sending' || formState === 'ok'}
            className="w-full py-5 bg-[linear-gradient(135deg,#ff5f1f,#832700)] text-white font-black rounded-full shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group disabled:opacity-50 disabled:pointer-events-none"
          >
            {formState === 'sending' ? 'ENVIANDO...' : 'ENVIAR PROPUESTA'}
            {formState !== 'sending' && (
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            )}
          </button>
        </form>
      </div>
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
