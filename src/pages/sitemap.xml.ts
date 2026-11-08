import type { APIRoute } from "astro";
import { actualizada } from "../data/perfil";

// Una sola página indexable. La de privacidad y la 404 llevan noindex y no van aquí. Si se añaden páginas
// (por ejemplo, una por proyecto), van en esta lista.
const rutas = [{ ruta: "/", modificada: actualizada }];

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
