# Dirección visual y editorial

## Objetivo

La web presenta a Samuel Martínez como desarrollador a quien contrata o selecciona: qué ha construido, con
qué, cómo se comprueba y cómo contactar. No vende servicios ni menciona Veldria.

## Voz

- Primera persona, frases cortas y datos que se pueden comprobar (pruebas, cobertura, latencia, enlaces al
  código).
- Decir el estado real de cada proyecto: publicada, beta, demo. Lo que no está probado se dice.
- Sin adjetivos de relleno («apasionado», «innovador», «premium»).

## Sistema visual

Son las reglas de Veldria (`~/Documents/Veldria/Corporativismo/04_Sistema/manual-identidad.md`), con un
acento propio.

| Pieza | Regla |
|---|---|
| Tipografía | Inter (400, 500, 600) para todo; Geist Mono 400 solo en rótulos, tecnologías y nombres de funciones. |
| Colores | Grafito `#111318` y blanco `#F8FAFC`, alternando secciones. Bordes `#DDE2EB` en claro y `#2C303A` en oscuro. |
| Acento | Naranja `#FF5F1F` en gráficos, texto grande y sobre grafito. Sobre blanco, para texto y botones, naranja tinta `#C2410C` (4,9:1). Pocas apariciones por pantalla. |
| Texto secundario | `#5B6270` sobre blanco (5,9:1) y `#A3A9B6` sobre grafito (7,9:1). |
| Composición | Retícula de 12 columnas y múltiplos de 8 px; filas separadas por líneas finas en lugar de tarjetas. |
| Superficies | Planas y opacas. Esquinas de 2 px. Sin degradados, sombras, cristal, manchas ni texto con degradado. |
| Movimiento | Ninguno salvo la flecha de los enlaces; respeta `prefers-reduced-motion`. |
| Imágenes | Capturas reales con borde de 1 px y pie que dice qué se ve. Sin foto de Samuel. |

## Comprobar antes de publicar

1. `npm run verify` sin errores.
2. Capturas a 1280 y 390 px de ancho: nada desborda y las cifras se leen.
3. Cada cifra de `src/data/perfil.ts` coincide con su repositorio y con el CV.
