import {renderToString} from 'react-dom/server';
import App from './App';
import {servicePages} from './seo';

/**
 * Rutas que se prerenderizan en el build. Debe mantenerse en sincronía con las
 * entradas de `build.rollupOptions.input` de vite.config.ts: cada ruta tiene su
 * propio HTML, y `scripts/prerender.mjs` inyecta aquí el markup renderizado.
 */
export const ROUTES = ['/', ...servicePages.map((page) => page.path)];

export function render(path: string): string {
  return renderToString(<App path={path} />);
}
