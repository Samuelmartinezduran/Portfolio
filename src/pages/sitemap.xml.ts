import type { APIRoute } from "astro";
import { paginas } from "../data/paginas";
import { actualizada, proyectos } from "../data/perfil";

// Las páginas indexables: la portada y una por proyecto que tenga página. La de privacidad y la 404 llevan
// noindex y no van aquí.
const rutas = [
  { ruta: "/", modificada: actualizada },
  ...proyectos.filter((p) => paginas[p.id]).map((p) => ({ ruta: `/proyectos/${p.id}/`, modificada: actualizada })),
];

export const GET: APIRoute = ({ site }) => {
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...rutas.map(
      ({ ruta, modificada }) => `  <url><loc>${new URL(ruta, site).href}</loc><lastmod>${modificada}</lastmod></url>`,
    ),
    "</urlset>",
    "",
  ].join("\n");
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
