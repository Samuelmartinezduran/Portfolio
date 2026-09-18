/**
 * Inyecta el markup renderizado en servidor dentro de cada HTML del build.
 *
 * Se ejecuta después de `vite build` y `vite build --ssr`. Sin esto el HTML que
 * sirve Vercel lleva el <body> vacío y el LCP queda atado a la descarga y
 * ejecución del bundle: el hero no existe hasta que React hidrata.
 */
import {readFile, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const PLACEHOLDER = '<!--app-html-->';

const htmlFileFor = (route) =>
  route === '/'
    ? path.join(distDir, 'index.html')
    : path.join(distDir, route, 'index.html');

const {ROUTES, render} = await import(
  path.join(root, 'dist-ssr/entry-server.js')
);

const failures = [];

for (const route of ROUTES) {
  const file = htmlFileFor(route);

  let html;
  try {
    html = await readFile(file, 'utf8');
  } catch {
    failures.push(`${route}: no existe ${path.relative(root, file)}`);
    continue;
  }

  if (!html.includes(PLACEHOLDER)) {
    failures.push(`${route}: falta ${PLACEHOLDER} en ${path.relative(root, file)}`);
    continue;
  }

  await writeFile(file, html.replace(PLACEHOLDER, render(route)));
  console.log(`  ✓ ${route}`);
}

if (failures.length > 0) {
  console.error('\nPrerender falló:');
  for (const failure of failures) console.error(`  ✗ ${failure}`);
  process.exit(1);
}

console.log(`\nPrerender OK — ${ROUTES.length} rutas`);
