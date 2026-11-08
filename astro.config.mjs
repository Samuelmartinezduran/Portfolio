// @ts-check
import { defineConfig, envField } from "astro/config";

// Web estática: Astro genera el HTML al compilar. Vercel la sirve tal cual (preset «Astro», salida en dist/).
// Ver ADR «Astro en lugar de Vite con prerender propio».
export default defineConfig({
  site: "https://samuelmartinez.dev",
  trailingSlash: "ignore",
  build: { format: "directory" },
  env: {
    schema: {
      // Lo define Vercel al compilar: "production", "preview" o "development". Vacío fuera de Vercel.
      // Decide si se cargan Vercel Web Analytics (cualquier compilación en Vercel) y GA4 (solo producción).
      VERCEL_ENV: envField.string({ context: "server", access: "public", optional: true }),
      // Solo para `npm run prueba:navegador`: compila con un ID de GA4 falso. Nunca se define en Vercel.
      GA_ID_PRUEBA: envField.string({ context: "server", access: "public", optional: true }),
    },
  },
});
