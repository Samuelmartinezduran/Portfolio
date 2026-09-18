/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {Play} from 'lucide-react';
import {useState} from 'react';

/**
 * Fachada de YouTube: hasta que el usuario pulsa solo se carga la miniatura.
 *
 * Un `<iframe>` de YouTube arrastra ~1 MB de JS de terceros (el 87 % del peso
 * de la home) y se descarga en la carga inicial aunque nadie vea el vídeo. Con
 * la fachada el iframe real solo aparece al pulsar.
 */
export function YouTubeFacade({
  id,
  title,
  className,
}: {
  id: string;
  title: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={className}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Reproducir vídeo: ${title}`}
      className={`${className ?? ''} relative block overflow-hidden bg-surface-high cursor-pointer`}
    >
      {/* `alt` vacío a propósito: el botón ya lleva el nombre accesible. */}
      <img
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt=""
        loading="lazy"
        width={480}
        height={360}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-black/25">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-[0_0_30px_rgba(255,95,31,0.45)] transition-transform duration-300 group-hover:scale-110">
          <Play className="h-7 w-7 translate-x-0.5 fill-white text-white" />
        </span>
      </span>
    </button>
  );
}
