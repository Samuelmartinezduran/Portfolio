// Configuración de la analítica. Ver el ADR «Analítica: Vercel Web Analytics y GA4 con consentimiento»
// y la página /privacidad/, que explica lo mismo a quien visita la web.
import { GA_ID_PRUEBA, VERCEL_ENV } from "astro:env/server";

/**
 * ID de medición de la propiedad de GA4 (empieza por «G-»). Mientras esté vacío no se carga GA4, no se
 * pide consentimiento y /privacidad/ no habla de Google Analytics.
 */
const GA_ID_PRODUCCION = "G-2Z99X3GDBT";

/** El de producción, salvo en las pruebas de navegador, que compilan con un ID falso (pruebas/navegador.mjs). */
export const GA_ID = GA_ID_PRUEBA || GA_ID_PRODUCCION;

/** Si cambia lo que se mide, sube este número y se vuelve a pedir el consentimiento a todo el mundo. */
export const VERSION_CONSENTIMIENTO = 1;

/** Meses tras los que se vuelve a preguntar. La AEPD recomienda no pasar de 24. */
export const MESES_VALIDEZ = 12;

/** Vercel Web Analytics: sin cookies; solo en compilaciones de Vercel (en local su script daría 404). */
export const vercelAnalyticsActivo = Boolean(VERCEL_ENV);

/** GA4: solo en producción y con un ID configurado. Las vistas previas no cuentan visitas. */
export const gaActivo = GA_ID !== "" && VERCEL_ENV === "production";
