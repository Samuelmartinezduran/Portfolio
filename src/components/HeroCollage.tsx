import {motion, useReducedMotion, useScroll, useTransform} from 'motion/react';
import {useEffect, useRef, useState} from 'react';

export function HeroCollage() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [desktop, setDesktop] = useState(false);
  const {scrollYProgress} = useScroll({target: ref, offset: ['start start', 'end start']});
  const y = useTransform(scrollYProgress, [0, 1], [0, -32]);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px) and (pointer: fine)');
    const sync = () => setDesktop(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  return (
    <div ref={ref} className="hero-art">
      <div className="art-grid" aria-hidden="true" />
      <motion.div className="art-orbit" aria-hidden="true"
        animate={reduceMotion ? {rotate: 0} : {rotate: [0, 12, 0]}}
        transition={{duration: 18, repeat: Infinity, ease: 'easeInOut'}}>
        <span /><span />
      </motion.div>
      <motion.div className="collage" style={{y: desktop && !reduceMotion ? y : 0}}>
        <a href="#projects" className="collage-main" aria-label="Explorar el proyecto Bubble Tea España">
          <div className="window-bar" aria-hidden="true"><span /><span /><span /><small>bubble tea / exploración web</small></div>
          <img src="/bubble-tea-espana.webp" alt="Diseño de Bubble Tea España" width={800} height={600} fetchPriority="high" />
          <span className="collage-caption">De una idea a una web. <span aria-hidden="true">↗</span></span>
        </a>
        <a href="#projects" className="collage-secondary" aria-label="Explorar el panel de seguimiento de precios">
          <img src="/price-tracker-dashboard.webp" alt="Interfaz del panel de seguimiento de precios" width={800} height={600} />
          <span>Interfaces que conectan.</span>
        </a>
        <span className="art-label" aria-hidden="true">Diseñar. Construir. Conectar.</span>
        <span className="art-cross" aria-hidden="true">+</span>
      </motion.div>
      <div className="art-footer"><span>Una muestra de mi trabajo</span><span aria-hidden="true">↙</span></div>
    </div>
  );
}
