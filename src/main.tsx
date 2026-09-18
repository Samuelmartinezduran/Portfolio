import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const container = document.getElementById('root')!;

const tree = (
  <StrictMode>
    <App />
  </StrictMode>
);

// En producción el HTML llega prerenderizado (`scripts/prerender.mjs`) y hay que
// hidratar para no descartar el markup: el hero ya está pintado y es lo que hace
// que el LCP no dependa del bundle. En dev el contenedor solo lleva el comentario
// `<!--app-html-->`, así que `firstElementChild` es null y se monta desde cero.
if (container.firstElementChild !== null) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
