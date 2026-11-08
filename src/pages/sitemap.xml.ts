import type { APIRoute } from "astro";

// Una sola página indexable. Si se añaden páginas (por ejemplo, una por proyecto), van aquí.
const rutas = ["/"];

export const GET: APIRoute = ({ site }) => {
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...rutas.map((ruta) => `  <url><loc>${new URL(ruta, site).href}</loc></url>`),
    "</urlset>",
    "",
  ].join("\n");
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
