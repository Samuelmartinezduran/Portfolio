import type { APIRoute } from "astro";
import {
  actualizada,
  cursos,
  experiencia,
  formacion,
  habilidades,
  otrosProyectos,
  persona,
  proyectos,
  sobreMi,
} from "../data/perfil";

// Resumen para asistentes de IA (formato de llmstxt.org), generado con los mismos datos que la página para
// que nunca diga otra cosa. Las cifras llevan su procedencia para que se puedan citar con contexto.
export const GET: APIRoute = ({ site }) => {
  const url = (ruta: string) => new URL(ruta, site).href;
  const lineas = [
    `# ${persona.nombre}`,
    "",
    `> ${persona.puesto} en ${persona.ciudad} (${persona.region}, ${persona.pais}). Python, TypeScript e IA.`,
    "",
    sobreMi,
    "",
    "## Proyectos principales",
    "",
    ...proyectos.map((p) => {
      const enlace = p.enlaces[0]?.url ?? url(`/#${p.id}`);
      const cifras = p.datos.map((d) => `${d.valor} (${d.texto})`).join("; ");
      return `- [${p.nombre}](${enlace}): ${p.etiqueta}. ${p.resumen} ${p.detalle.join(" ")} Tecnologías: ${p.stack.join(", ")}. Cifras: ${cifras}.`;
    }),
    "",
    "## Otros proyectos",
    "",
    ...otrosProyectos.map((o) => `- [${o.nombre}](${o.enlace.url}): ${o.texto} Tecnologías: ${o.stack.replaceAll(" · ", ", ")}.`),
    "",
    "## Experiencia",
    "",
    ...experiencia.map((e) => `- ${e.puesto} en ${e.empresa} (${e.fechas}). ${e.puntos.join(" ")}`),
    "",
    "## Formación",
    "",
    ...formacion.map((f) => `- ${f.titulo}, ${f.centro} (${f.fechas}).`),
    `- Cursos de ${cursos.entidad} (${cursos.fecha}): ${cursos.lista}`,
    "",
    "## Habilidades",
    "",
    ...habilidades.map((h) => `- ${h.grupo}: ${h.lista}.`),
    "",
    "## Contacto",
    "",
    `- Web: ${url("/")}`,
    `- Correo: ${persona.correo}`,
    `- GitHub: ${persona.github}`,
    `- LinkedIn: ${persona.linkedin}`,
    `- CV en PDF: ${url(persona.cv)}`,
    "",
    "## Notas",
    "",
    `- Actualizado el ${actualizada}.`,
    "- Las cifras de pruebas salen de ejecuciones reales: Deep Prep en su versión 2.0.0 publicada; el asistente, de su suite de base de datos; agenteval, de su suite de ejemplo.",
    "",
  ];
  return new Response(lineas.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
