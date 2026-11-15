// Monta los fotogramas (20 por segundo, 1200 x 760) a partir de las capturas de fotos.py, con fundidos entre escenas.
// Uso: node docs/video-deep-prep/montar.cjs <carpeta de trabajo>, con las capturas en <carpeta>/fotos.
// Escribe <carpeta>/montaje/NNNN.png y <carpeta>/montaje/capitulos.json (segundo en que termina cada fundido de
// entrada, lo que va en «capitulos» de perfil.ts). El MP4 y el póster: ver ADR, «Vídeo de Deep Prep 2.1».
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const FPS = 20;
const W = 1200;
const H = 760;
const dir = path.resolve(process.argv[2] || ".");
const fotos = path.join(dir, "fotos");
const salida = path.join(dir, "montaje");
fs.rmSync(salida, { recursive: true, force: true });
fs.mkdirSync(salida);

const lista = fs.readdirSync(fotos).filter((f) => f.endsWith(".png")).sort();
const de = (patron) => lista.find((f) => f.includes(patron));
const bajadas = lista.filter((f) => f.includes("-baja"));
const minutos = lista.filter((f) => f.includes("-carga-min"));

async function plano(f) {
  if (f.includes("overlay")) {
    // El overlay va a su tamaño (escala 0,8, la misma que el resto) sobre el fondo de la app.
    const fondo = await sharp(path.join(fotos, de("-juego"))).extract({ left: 1400, top: 900, width: 1, height: 1 }).raw().toBuffer();
    const o = await sharp(path.join(fotos, f)).resize(Math.round(1180 * 0.8), Math.round(580 * 0.8)).png().toBuffer();
    const m = await sharp(o).metadata();
    return sharp({ create: { width: W, height: H, channels: 3, background: { r: fondo[0], g: fondo[1], b: fondo[2] } } })
      .composite([{ input: o, left: Math.round((W - m.width) / 2), top: Math.round((H - m.height) / 2) }])
      .removeAlpha()
      .raw()
      .toBuffer();
  }
  return sharp(path.join(fotos, f)).flatten({ background: "#000" }).resize(W, H).removeAlpha().raw().toBuffer();
}

// Guion: [archivo, segundos que se queda, ¿fundido de entrada?, capítulo]
const guion = [
  [de("-seleccion"), 2.0, false, "selección"],
  [de("01-carga"), 1.0, true, "carga"],
  ...bajadas.map((f) => [f, 1 / FPS, false]),
  ...minutos.map((f, i) => [f, i === minutos.length - 1 ? 0.9 : 0.7, false]),
  [de("-juego"), 1.6, true, "partida"],
  [de("-overlay"), 2.0, true, "overlay"],
  [de("-revisiones"), 2.8, true, "revisión"],
];
const FUNDIDO = 0.4;

(async () => {
  let n = 0;
  let previo = null;
  const capitulos = [];
  const escribir = (buf) => sharp(buf, { raw: { width: W, height: H, channels: 3 } }).png({ compressionLevel: 1 }).toFile(path.join(salida, String(n++).padStart(4, "0") + ".png"));
  for (const [f, seg, fundido, capitulo] of guion) {
    const actual = await plano(f);
    if (fundido && previo) {
      const k = Math.round(FUNDIDO * FPS);
      for (let i = 1; i <= k; i++) {
        const t = i / (k + 1);
        const mezcla = Buffer.alloc(actual.length);
        for (let j = 0; j < actual.length; j++) mezcla[j] = Math.round(previo[j] * (1 - t) + actual[j] * t);
        await escribir(mezcla);
      }
    }
    if (capitulo) capitulos.push({ desde: Math.round((n / FPS) * 10) / 10, texto: capitulo });
    for (let i = 0; i < Math.max(1, Math.round(seg * FPS)); i++) await escribir(actual);
    previo = actual;
  }
  fs.writeFileSync(path.join(salida, "capitulos.json"), JSON.stringify({ fotogramas: n, segundos: n / FPS, capitulos }, null, 1));
  console.log(n, "fotogramas,", n / FPS, "s", JSON.stringify(capitulos));
})();
