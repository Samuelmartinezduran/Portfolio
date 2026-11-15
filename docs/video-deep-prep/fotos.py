"""Fotogramas de la demo de Deep Prep 2.1 (Qt Quick) para el vídeo de la web, sin enseñar ninguna ventana.

Uso: python fotos.py <carpeta de salida>
Recorre las escenas de la demo como lo haría alguien con la app: selección, pantalla de carga (el mapa del jungla
rival minuto a minuto), en partida, el overlay y Revisiones. Una captura por estado, a 1500 x 950 como las del README.
"""

import json
import sys
from pathlib import Path

sys.argv.append("--demo")  # antes de importar config: la demo va a su carpeta temporal
sys.path.insert(0, r"C:\Users\samue\deep-prep")

from PySide6.QtCore import QObject, QTimer  # noqa: E402
from PySide6.QtGui import QGuiApplication  # noqa: E402
from PySide6.QtQuick import QQuickItem  # noqa: E402

from deepprep import config  # noqa: E402
from deepprep.demo import AppDemo, borrar_carpeta  # noqa: E402

SALIDA = Path(sys.argv[1]).resolve()
SALIDA.mkdir(parents=True, exist_ok=True)

qapp = QGuiApplication(sys.argv)
from deepprep.nativa.ventanas import ANCHO_OVERLAY, ALTO_OVERLAY, VentanasQt  # noqa: E402

demo = AppDemo(config.DATOS, escena="seleccion", barra=False)
v = VentanasQt(demo, titulo="Deep Prep · demo", demo=True, vista="partida", minuto_fijo=-1)
principal = v.preparar()
principal.resize(1500, 950)
flotante = v.flotante
if flotante:
    flotante.resize(ANCHO_OVERLAY, ALTO_OVERLAY)


def buscar(item: QQuickItem, tipo: str) -> list[QQuickItem]:
    """Los elementos de QML de ese tipo (CajaJungla, ...) debajo de item."""
    hallados = []
    for hijo in item.childItems():
        if hijo.metaObject().className().startswith(tipo):
            hallados.append(hijo)
        hallados += buscar(hijo, tipo)
    return hallados


registro: list[dict] = []


def foto(nombre: str, ventana=None) -> None:
    ruta = SALIDA / f"{len(registro):02d}-{nombre}.png"
    (ventana or principal).grabWindow().save(str(ruta))
    registro.append({"archivo": ruta.name, "nombre": nombre})
    print("foto", ruta.name, flush=True)


def escena(nombre: str) -> None:
    print("escena", nombre, demo.elegir_escena(nombre), flush=True)


def minutos_del_mapa() -> list[str]:
    cajas = [c for c in buscar(principal.contentItem(), "CajaJungla") if c.isVisible()]
    if not cajas:
        print("sin CajaJungla visible", flush=True)
        return []
    datos = cajas[0].property("datos")
    datos = datos.toVariant() if hasattr(datos, "toVariant") else datos
    mapa = (datos or {}).get("mapa") or {}
    print("mapa: inicial", mapa.get("inicial"), "minutos", [m.get("id") if isinstance(m, dict) else m for m in mapa.get("minutos", [])], flush=True)
    return [str(m.get("id") if isinstance(m, dict) else m) for m in mapa.get("minutos", [])]


def poner_minuto(m: str) -> None:
    for c in buscar(principal.contentItem(), "CajaJungla"):
        if c.isVisible():
            c.setProperty("minuto", m)


def flickable_de(item: QQuickItem) -> QQuickItem | None:
    p = item.parentItem()
    while p is not None and p.property("maxDesp") is None:
        p = p.parentItem()
    return p


def desplazamientos_hasta_jungla(n: int = 14) -> list[float]:
    """Los contentY de un desplazamiento suave (ease in-out) desde arriba hasta que se ve la caja del jungla."""
    cajas = [c for c in buscar(principal.contentItem(), "CajaJungla") if c.isVisible()]
    if not cajas:
        return []
    caja = cajas[0]
    f = flickable_de(caja)
    if f is None:
        print("sin Flickable", flush=True)
        return []
    from PySide6.QtCore import QPointF

    y0 = float(f.property("desp"))
    arriba = caja.mapToItem(f, QPointF(0, 0)).y() + y0
    maximo = float(f.property("maxDesp"))
    # Que la caja quede entera si cabe; si no, su parte de arriba con un margen.
    destino = min(maximo, max(0.0, arriba - max(16.0, (f.height() - caja.height()) / 2)))
    print(f"desplazamiento: {y0:.0f} -> {destino:.0f} (caja {caja.height():.0f} px, vista {f.height():.0f})", flush=True)

    def suave(t: float) -> float:
        return 4 * t**3 if t < 0.5 else 1 - (-2 * t + 2) ** 3 / 2

    return [y0 + (destino - y0) * suave(i / n) for i in range(1, n + 1)]


def poner_desplazamiento(y: float) -> None:
    cajas = [c for c in buscar(principal.contentItem(), "CajaJungla") if c.isVisible()]
    f = flickable_de(cajas[0]) if cajas else None
    if f is not None:
        f.setProperty("desp", y)


def arriba_del_todo() -> None:
    for f in {id(x): x for x in [flickable_de(c) for c in buscar(principal.contentItem(), "CajaJungla")] if x}.values():
        f.setProperty("desp", 0.0)


pasos: list[tuple[int, object]] = []  # (ms de espera antes, acción)


def plan() -> None:
    pasos.append((3500, lambda: foto("seleccion")))
    pasos.append((0, lambda: escena("carga")))
    pasos.append((2500, lambda: foto("carga")))

    def mapa() -> None:
        ms = minutos_del_mapa()
        extra = []
        for i, y in enumerate(desplazamientos_hasta_jungla()):
            extra.append((40, lambda y=y: poner_desplazamiento(y)))
            extra.append((60, lambda i=i: foto(f"baja{i:02d}")))
        for m in ms:
            extra.append((350, lambda m=m: poner_minuto(m)))
            extra.append((350, lambda m=m: foto(f"carga-min{m}")))
        pasos[0:0] = extra  # justo después de este paso (ya salió de la lista)

    pasos.append((0, mapa))
    pasos.append((0, lambda: escena("juego")))
    pasos.append((0, arriba_del_todo))
    pasos.append((2500, lambda: foto("juego")))
    pasos.append((300, lambda: foto("overlay", flotante)))
    pasos.append((0, lambda: principal.setProperty("vista", "revisiones")))
    pasos.append((2500, lambda: foto("revisiones")))
    pasos.append((0, terminar))


def terminar() -> None:
    (SALIDA / "registro.json").write_text(json.dumps(registro, ensure_ascii=False, indent=1), encoding="utf-8")
    qapp.quit()


def siguiente() -> None:
    if not pasos:
        return
    espera, accion = pasos[0]

    def hacer() -> None:
        pasos.pop(0)
        accion()
        siguiente()

    QTimer.singleShot(espera, hacer)


plan()
siguiente()
try:
    codigo = qapp.exec()
finally:
    v.desmontar()
    borrar_carpeta(config.DATOS)
sys.exit(codigo)
