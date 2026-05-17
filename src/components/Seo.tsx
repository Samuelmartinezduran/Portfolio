/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {useEffect} from 'react';
import {findPageByPath, SITE_URL, OG_IMAGE} from '../seo';

export function Seo() {
  const path = window.location.pathname;
  const page = findPageByPath(path);

  useEffect(() => {
    // Update Title
    document.title = page.title;

    // Update Meta Tags
    const updateMeta = (name: string, content: string, property = false) => {
      let el = document.querySelector(
        property ? `meta[property="${name}"]` : `meta[name="${name}"]`,
      );
      if (!el) {
        el = document.createElement('meta');
        if (property) el.setAttribute('property', name);
        else el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateMeta('description', page.description);
    updateMeta('og:title', page.ogTitle, true);
    updateMeta('og:description', page.ogDescription, true);
    updateMeta('og:type', page.ogType, true);
    updateMeta('og:url', `${SITE_URL}${page.path}`, true);
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', page.ogTitle);
    updateMeta('twitter:description', page.ogDescription);
    updateMeta('twitter:image', OG_IMAGE);

    // Geographic Meta Tags for Vigo Cluster
    if (page.path.startsWith('/vigo/')) {
      updateMeta('geo.region', 'ES-GA');
      updateMeta('geo.placename', 'Vigo');
      updateMeta('geo.position', '42.2406;-8.7207');
      updateMeta('ICBM', '42.2406, -8.7207');
    } else {
      // Remove them if on national pages to avoid confusion
      ['geo.region', 'geo.placename', 'geo.position', 'ICBM'].forEach((name) => {
        document.querySelector(`meta[name="${name}"]`)?.remove();
      });
    }

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${SITE_URL}${page.path}`);

    // Schema.org (JSON-LD)
    const existingSchema = document.getElementById('json-ld-schema');
    if (existingSchema) {
      existingSchema.remove();
    }
    const script = document.createElement('script');
    script.id = 'json-ld-schema';
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(page.schema);
    document.head.appendChild(script);

    // Scroll to top on route change (simulated in this SPA)
    window.scrollTo(0, 0);
  }, [page]);

  return null;
}
