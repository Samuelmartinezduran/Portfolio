import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import {findPageByPath, OG_IMAGE, SITE_URL} from './src/seo';

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

const renderSeoHead = (htmlPath: string) => {
  const page = findPageByPath(htmlPath);
  const url = `${SITE_URL}${page.path}`;

  return [
    `<title>${escapeHtml(page.title)}</title>`,
    `<meta name="description" content="${escapeHtml(page.description)}" />`,
    '<meta name="author" content="Samuel Martínez Durán" />',
    '<meta name="robots" content="index, follow, max-image-preview:large" />',
    '<meta name="theme-color" content="#131313" />',
    `<link rel="canonical" href="${url}" />`,
    '<link rel="manifest" href="/site.webmanifest" />',
    '<meta property="og:locale" content="es_ES" />',
    `<meta property="og:type" content="${page.ogType}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${escapeHtml(page.ogTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(page.ogDescription)}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    '<meta property="og:image:alt" content="Desarrollo web SEO y marketing digital en Vigo" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeHtml(page.ogTitle)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(page.ogDescription)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    `<script type="application/ld+json">${JSON.stringify(page.schema)}</script>`,
  ].join('\n    ');
};

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'portfolio-seo-head',
      transformIndexHtml(html, ctx) {
        return html.replace('<!--seo-head-->', renderSeoHead(ctx.path));
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        seoSem: path.resolve(__dirname, 'servicios/consultor-seo-sem/index.html'),
        webDev: path.resolve(__dirname, 'servicios/desarrollo-web/index.html'),
        landingCro: path.resolve(__dirname, 'servicios/landing-pages-cro/index.html'),
        aiSolutions: path.resolve(__dirname, 'servicios/soluciones-ia/index.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
});
