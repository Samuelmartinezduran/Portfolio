const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const isEnabled = () => typeof window !== 'undefined' && Boolean(measurementId);

function gtag(...args: unknown[]) {
  window.dataLayer ??= [];
  window.dataLayer.push(args);
}

export function initAnalytics() {
  if (!isEnabled() || document.getElementById('ga4-script')) return;

  const script = document.createElement('script');
  script.id = 'ga4-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId!)}`;
  document.head.appendChild(script);

  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', measurementId!, {send_page_view: false});
}

export function trackPageView(path: string) {
  if (!isEnabled()) return;
  initAnalytics();
  window.gtag?.('event', 'page_view', {page_location: `${window.location.origin}${path}`});
}

export function trackEvent(name: string, params: Record<string, string> = {}) {
  if (!isEnabled()) return;
  initAnalytics();
  window.gtag?.('event', name, params);
}
