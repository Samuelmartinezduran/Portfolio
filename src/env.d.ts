// Funciones globales que define src/components/Consentimiento.astro y usan los scripts de las páginas.
interface Window {
  /** Envía un evento a GA4 si hay consentimiento; si no, no hace nada. */
  medir?: (nombre: string, parametros?: Record<string, string>) => void;
  /** Vuelve a mostrar el aviso de cookies para cambiar la elección. */
  abrirConsentimiento?: () => void;
  dataLayer?: unknown[];
  gtag?: (...argumentos: unknown[]) => void;
}
