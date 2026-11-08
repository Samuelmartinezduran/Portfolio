import type { APIRoute } from "astro";
import { experiencia, persona, proyectos } from "../data/perfil";

// Resumen para asistentes de IA (llmstxt.org), generado con los mismos datos que la página.
export const GET: APIRoute = ({ site }) => {
  const inicio = site!.href;
  const lineas = [
    `# ${persona.nombre}`,
    "",
    `> ${persona.puesto} en ${persona.ciudad} (España). Python, TypeScript e IA. Busca un puesto de desarrollador desde enero de 2027.`,
    "",
    "## Proyectos",
    "",
    ...proyectos.map(
      (p) =>
        `- [${p.nombre}](${p.enlaces[0]?.url ?? `${inicio}#${p.id}`}): ${p.resumen} Tecnologías: ${p.stack.join(", ")}.`,
    ),
    "",
    "## Experiencia",
    "",
    ...experiencia.map((e) => `- ${e.puesto}, ${e.empresa} (${e.fechas}).`),
    "",
    "## Contacto",
    "",
    `- Correo: ${persona.correo}`,
    `- GitHub: ${persona.github}`,
    `- LinkedIn: ${persona.linkedin}`,
    `- CV: ${new URL(persona.cv, site).href}`,
    "",
  ];
  return new Response(lineas.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
