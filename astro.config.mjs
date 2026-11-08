// @ts-check
import { defineConfig } from "astro/config";

// Web estática: Astro genera HTML sin JavaScript en el navegador. Vercel la sirve tal cual
// (preset «Astro», salida en dist/). Ver ADR «Astro en lugar de Vite con prerender propio».
export default defineConfig({
  site: "https://samuelmartinez.dev",
  trailingSlash: "ignore",
  build: { format: "directory" },
});
