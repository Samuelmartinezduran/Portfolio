// Pruebas de comportamiento de la portada en un navegador real: aviso de cookies y GA4, paleta de
// comandos, atajos, vídeo y terminal. Uso: `npm run prueba:navegador`.
//
// 1. Compila una copia en dist-prueba/ como si fuera producción en Vercel, con un ID de GA4 falso.
// 2. La sirve en un puerto local con un servidor estático mínimo.
// 3. La recorre con puppeteer-core y el navegador del sistema (Edge en Windows, Chrome en macOS y Linux;
//    otro con la variable NAVEGADOR=/ruta/al/ejecutable).
// 4. Borra dist-prueba/ al terminar.
import { spawnSync } from "node:child_process";
import { createReadStream, existsSync, rmSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import puppeteer from "puppeteer-core";

const SALIDA = "dist-prueba";
const ID_FALSO = "G-PRUEBA0000";

// Orden fija, sin datos de fuera: se puede pasar como una sola cadena al shell.
const compilacion = spawnSync(`npx astro build --outDir ${SALIDA}`, {
  stdio: "inherit",
  shell: true,
  env: { ...process.env, VERCEL_ENV: "production", GA_ID_PRUEBA: ID_FALSO },
});
if (compilacion.status !== 0) process.exit(compilacion.status ?? 1);

const tipos = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".pdf": "application/pdf",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};
const servidor = createServer((peticion, respuesta) => {
  const ruta = normalize(decodeURIComponent(new URL(peticion.url ?? "/", "http://x").pathname));
  let archivo = join(SALIDA, ruta);
  if (existsSync(archivo) && statSync(archivo).isDirectory()) archivo = join(archivo, "index.html");
  if (!archivo.startsWith(SALIDA) || !existsSync(archivo)) {
    respuesta.writeHead(404).end("No existe");
    return;
  }
  respuesta.writeHead(200, { "Content-Type": tipos[extname(archivo)] ?? "application/octet-stream" });
  createReadStream(archivo).pipe(respuesta);
});
await new Promise((resolver) => servidor.listen(0, "127.0.0.1", resolver));
const URL_BASE = `http://127.0.0.1:${servidor.address().port}/`;

const rutasNavegador = {
  win32: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  darwin: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  linux: "/usr/bin/google-chrome",
};
const resultados = [];
const comprobar = (nombre, ok, detalle = "") => resultados.push({ nombre, ok: Boolean(ok), detalle });

const navegador = await puppeteer.launch({
  executablePath: process.env.NAVEGADOR ?? rutasNavegador[process.platform],
  headless: true,
  args: ["--autoplay-policy=no-user-gesture-required"],
});
const pagina = await navegador.newPage();
await pagina.setViewport({ width: 1440, height: 900 });

const errores = [];
pagina.on("pageerror", (e) => errores.push(String(e)));
const fallidas = [];
pagina.on("response", (r) => {
  if (r.status() >= 400) fallidas.push(`${r.status()} ${r.url()}`);
});
pagina.on("console", (m) => {
  // Los 404 de recursos se miran aparte con su URL (ver «fallidas»).
  if (m.type() === "error" && !m.text().startsWith("Failed to load resource")) errores.push(m.text());
});
const peticionesGA = [];
pagina.on("request", (r) => {
  if (r.url().includes("googletagmanager.com") || r.url().includes("google-analytics.com")) peticionesGA.push(r.url());
});

const visible = (sel) =>
  pagina.$eval(sel, (el) => !el.hidden && getComputedStyle(el).display !== "none").catch(() => false);

// 1. Primera visita: aviso visible y GA4 sin cargar.
await pagina.goto(URL_BASE, { waitUntil: "networkidle0" });
comprobar("aviso visible en la primera visita", await visible("[data-consentimiento]"));
comprobar("GA4 no se carga antes de decidir", peticionesGA.length === 0, peticionesGA.join(", "));

// 2. Rechazar: el aviso se va, no se carga GA4 y la decisión se recuerda.
await pagina.click("[data-consentir='no']");
comprobar("rechazar oculta el aviso", !(await visible("[data-consentimiento]")));
await pagina.reload({ waitUntil: "networkidle0" });
comprobar("tras rechazar y recargar no hay aviso", !(await visible("[data-consentimiento]")));
comprobar("tras rechazar no se carga GA4", peticionesGA.length === 0, peticionesGA.join(", "));
const decisionNo = await pagina.evaluate(() => localStorage.getItem("consentimiento-analitica"));
comprobar("la decisión «no» queda guardada", decisionNo?.includes('"valor":"no"'), decisionNo ?? "");

// 3. Cambiar de opinión desde el pie: se abre el aviso y aceptar carga GA4 con el ID.
await pagina.click("[data-cookies]");
comprobar("el botón «cookies» del pie reabre el aviso", await visible("[data-consentimiento]"));
await pagina.click("[data-consentir='si']");
await new Promise((r) => setTimeout(r, 1500));
comprobar(
  "aceptar carga gtag.js con el ID",
  peticionesGA.some((u) => u.includes(`gtag/js?id=${ID_FALSO}`)),
  peticionesGA[0] ?? "ninguna",
);
const consentimiento = await pagina.evaluate(() =>
  JSON.stringify((window.dataLayer ?? []).map((a) => Array.from(a)).find((a) => a[0] === "consent")),
);
comprobar(
  "consentimiento por defecto: solo analítica concedida",
  consentimiento.includes('"analytics_storage":"granted"') && consentimiento.includes('"ad_storage":"denied"'),
  consentimiento,
);
await pagina.evaluate(() => window.medir?.("prueba", { a: "b" }));
const evento = await pagina.evaluate(() =>
  (window.dataLayer ?? []).some((a) => Array.from(a)[0] === "event" && Array.from(a)[1] === "prueba"),
);
comprobar("window.medir envía eventos con consentimiento", evento);

// 4. Retirar el consentimiento: recarga, sin GA4 y sin cookies _ga.
peticionesGA.length = 0;
await pagina.click("[data-cookies]");
await Promise.all([pagina.waitForNavigation({ waitUntil: "networkidle0" }), pagina.click("[data-consentir='no']")]);
const cookiesGA = (await navegador.cookies()).filter((c) => c.name.startsWith("_ga"));
comprobar("retirar recarga sin GA4", peticionesGA.length === 0, peticionesGA.join(", "));
comprobar("retirar borra las cookies _ga", cookiesGA.length === 0, cookiesGA.map((c) => c.name).join(", "));

// 5. Paleta: Ctrl+K abre, filtra, aria-activedescendant sigue la selección, Escape cierra.
await pagina.keyboard.down("Control");
await pagina.keyboard.press("k");
await pagina.keyboard.up("Control");
comprobar("Ctrl+K abre la paleta", await pagina.$eval("[data-paleta]", (d) => d.open));
await pagina.keyboard.type("linked");
const visiblesPaleta = await pagina.$$eval("[data-accion]", (os) => os.filter((o) => !o.hidden).map((o) => o.textContent.trim()));
comprobar("la paleta filtra al escribir", visiblesPaleta.length === 1 && visiblesPaleta[0].startsWith("Abrir LinkedIn"), visiblesPaleta.join(" | "));
const activo = await pagina.$eval("[data-buscar]", (i) => i.getAttribute("aria-activedescendant"));
const idElegido = await pagina.$$eval("[data-accion]", (os) => os.find((o) => o.getAttribute("aria-selected") === "true")?.id);
comprobar("aria-activedescendant apunta a la opción elegida", activo && activo === idElegido, `${activo} / ${idElegido}`);
await pagina.keyboard.press("Escape");
comprobar("Escape cierra la paleta", !(await pagina.$eval("[data-paleta]", (d) => d.open)));

// 6. Atajos: «2» lleva a experiencia; desactivados, no hacen nada.
await pagina.evaluate(() => window.scrollTo(0, 0));
await pagina.keyboard.press("2");
await new Promise((r) => setTimeout(r, 1200));
const yExperiencia = await pagina.$eval("#experiencia", (s) => Math.round(s.getBoundingClientRect().top));
comprobar("el atajo 2 lleva a experiencia", Math.abs(yExperiencia) < 120, `top=${yExperiencia}`);
await pagina.keyboard.down("Control");
await pagina.keyboard.press("k");
await pagina.keyboard.up("Control");
await pagina.keyboard.type("desactivar atajos");
await pagina.keyboard.press("Enter");
await pagina.evaluate(() => window.scrollTo(0, 0));
await pagina.keyboard.press("3");
await new Promise((r) => setTimeout(r, 800));
const yTrasDesactivar = await pagina.evaluate(() => Math.round(window.scrollY));
comprobar("con los atajos desactivados, «3» no mueve la página", yTrasDesactivar === 0, `scrollY=${yTrasDesactivar}`);
comprobar(
  "la preferencia de atajos se guarda",
  (await pagina.evaluate(() => localStorage.getItem("atajos"))) === "no",
);

// 7. Vídeo: arranca al verse y el botón lo pausa.
await pagina.$eval("[data-video] video", (v) => v.scrollIntoView({ block: "center" }));
await new Promise((r) => setTimeout(r, 2500));
const enMarcha = await pagina.$eval("[data-video] video", (v) => !v.paused);
comprobar("el vídeo se reproduce al verse", enMarcha);
await pagina.click("[data-video-boton]");
await new Promise((r) => setTimeout(r, 300));
const tras = await pagina.$eval("[data-video] video", (v) => v.paused);
const textoBoton = await pagina.$eval("[data-video-boton]", (b) => b.textContent.trim());
comprobar("el botón pausa el vídeo", tras && textoBoton.includes("reproducir"), textoBoton);

// 8. La terminal termina y oculta «Saltar animación» (se da hasta 20 s desde la última carga).
await pagina.waitForFunction(() => !document.querySelector("[data-terminal]").classList.contains("animando"), { timeout: 20000 }).catch(() => {});
const terminalAcabada = await pagina.$eval("[data-terminal]", (t) => !t.classList.contains("animando"));
const saltarOculto = await pagina.$eval("[data-saltar]", (b) => b.hidden);
comprobar("la terminal termina y oculta «Saltar animación»", terminalAcabada && saltarOculto);

comprobar("sin errores en la consola", errores.length === 0, errores.join(" | "));
const ajenas = fallidas.filter((f) => !f.includes("/_vercel/insights/"));
comprobar("sin recursos rotos (salvo el script de Vercel, que solo existe en Vercel)", ajenas.length === 0, ajenas.join(" | "));
console.log("404 de Vercel Analytics (esperados fuera de Vercel):", fallidas.length - ajenas.length);

await navegador.close();
servidor.close();
rmSync(SALIDA, { recursive: true, force: true });

let fallos = 0;
for (const r of resultados) {
  if (!r.ok) fallos++;
  console.log(`${r.ok ? "OK   " : "FALLO"} ${r.nombre}${r.detalle && !r.ok ? ` — ${r.detalle}` : ""}`);
}
console.log(`
${resultados.length - fallos}/${resultados.length} correctas`);
process.exit(fallos ? 1 : 0);
