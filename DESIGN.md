# Dirección visual y editorial

## Objetivo

La web presenta a Samuel Martínez como desarrollador a quien contrata o selecciona: qué ha construido, con
qué, cómo se comprueba y cómo contactar. No vende servicios ni menciona Veldria.

## Voz

- Primera persona, frases cortas y datos que se pueden comprobar (pruebas, cobertura, latencia, enlaces al
  código).
- Decir el estado real de cada proyecto: publicada, beta, demo. Lo que no está probado se dice.
- Sin adjetivos de relleno («apasionado», «innovador», «premium»).

## Dirección

La web se presenta como una herramienta de desarrollador: barra de ventana, terminal que teclea los comandos de
prueba reales con su salida, barra de estado, proyectos como `README.md` en pestañas, la trayectoria como un
`git log` y las habilidades como un `.json`. El cierre es un «Escríbeme→» enorme. El carácter sale de esa
metáfora y de la escala del texto, no de adornos.

Reglas de la metáfora:

- Todo lo que sale en la terminal es real: comandos que existen y salidas copiadas de una ejecución (ver los
  comentarios de `sesionTerminal` en `src/data/perfil.ts`). Si un número cambia, se cambia allí y en el CV.
- La lectura no depende de la metáfora: los textos largos van en Inter, no en monoespaciada, y sin JavaScript
  o con movimiento reducido se ve todo el contenido de golpe.
- Los atajos (1, 2, 3, C, G, L y Ctrl/Cmd+K) son un extra: todo se puede hacer con enlaces normales.

## Sistema visual

Son las reglas de Veldria (`~/Documents/Veldria/Corporativismo/04_Sistema/manual-identidad.md`) en oscuro, con
acento propio y colores de sintaxis.

| Pieza | Regla |
|---|---|
| Tipografía | Inter (400, 500, 600) para titulares y texto; Geist Mono 400 para la terminal, rutas, comandos, tablas y rótulos. |
| Fondos | Terminal y paneles `#0B0D11`; página grafito `#111318`; superficie `#1B1E25`. Bordes `#2C303A`. |
| Texto | Blanco `#F8FAFC`; secundario `#A3A9B6` (7,9:1 sobre grafito). |
| Acento | Naranja `#FF5F1F`: barra de estado, cursor, punto del nombre, rótulos `#`, flecha de «Escríbeme». |
| Sintaxis | Solo dentro de la metáfora: verde `#4ADE80` (prompt, OK), azul `#8F9FFF` (rutas, formación), ámbar `#FBBF77` (cadenas, fechas), rojo `#F87171` (error de la 404). No se usan fuera de código o salidas. |
| Composición | Contenedor de 72 rem, múltiplos de 8 px, filas separadas por líneas finas. |
| Superficies | Planas. Esquinas de 2 px. Sin degradados, sombras, cristal ni texto con degradado. |
| Movimiento | Tecleo de la terminal, cursor que parpadea y transiciones cortas al pasar el ratón. Todo se desactiva con `prefers-reduced-motion`. |
| Imágenes | Grabación y capturas reales con borde de 1 px y pie. Sin foto de Samuel. |

## Comprobar antes de publicar

1. `npm run verify` sin errores.
2. Capturas a 1280 y 390 px de ancho: nada desborda y las cifras se leen.
3. Cada cifra de `src/data/perfil.ts` coincide con su repositorio y con el CV.
