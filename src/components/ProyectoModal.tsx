import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, AtSign, ChevronLeft, ChevronRight, Globe, Play, X } from "lucide-react";
import type { ProyectoDetalle } from "../data/proyectosDetalle";
import LogoInteractivo from "./LogoInteractivo";

interface ProyectoModalProps {
  proyecto: ProyectoDetalle;
  onClose: () => void;
}

/* Título chico de cada bloque de información. */
function Rotulo({ children }: { children: string }) {
  return <h3 className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-[#FF704A]">{children}</h3>;
}

/*
 * Modal de proyecto, pensado para verse entero sin scroll en pantallas
 * de escritorio: la imagen/video ocupa todo el alto disponible y la
 * información va compacta al costado. En celulares sí hay scroll.
 *
 * Para que el carrusel arranque siempre en la primera imagen, el padre
 * lo renderiza con key={proyecto.slug}: al cambiar de proyecto se monta de cero.
 */
export default function ProyectoModal({ proyecto, onClose }: ProyectoModalProps) {
  const [indice, setIndice] = useState(0);
  const botonCerrar = useRef<HTMLButtonElement>(null);

  const galeria = proyecto.gallery;
  const total = galeria.length;
  const actual = galeria[indice];
  const links = (proyecto.links ?? []).filter((link) => link.href);
  const redes = (proyecto.redes ?? []).filter((red) => red.href);

  const anterior = () => setIndice((i) => (i - 1 + total) % total);
  const siguiente = () => setIndice((i) => (i + 1) % total);

  useEffect(() => {
    const elementoPrevio = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    botonCerrar.current?.focus();

    const alPresionar = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      // Si el foco está en un video, las flechas adelantan/atrasan el video.
      if (e.target instanceof HTMLVideoElement || total < 2) return;
      if (e.key === "ArrowLeft") setIndice((i) => (i - 1 + total) % total);
      if (e.key === "ArrowRight") setIndice((i) => (i + 1) % total);
    };

    window.addEventListener("keydown", alPresionar);
    return () => {
      window.removeEventListener("keydown", alPresionar);
      document.body.style.overflow = "";
      elementoPrevio?.focus();
    };
    // Se ejecuta una sola vez al abrir: el modal se vuelve a montar con cada proyecto.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(
    <div
      onClick={onClose}
      className="modal-fondo fixed inset-0 z-[99999] flex items-center justify-center bg-[#0A1128]/85 p-3 sm:p-5"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-titulo"
        onClick={(e) => e.stopPropagation()}
        className="modal-panel relative flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl bg-[#F2EFE7] text-[#1E2A44] shadow-2xl shadow-black/50 lg:h-[min(90vh,760px)]"
      >
        {/* ENCABEZADO: título + datos clave en una sola franja */}
        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-[#1E2A44]/10 px-5 py-3 md:px-6">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[9px] font-bold uppercase tracking-[0.18em]">
              <span className="text-[#FF704A]">+ {proyecto.category}</span>
              {proyecto.year && <span className="rounded-full bg-[#1E2A44] px-2 py-0.5 text-[#F2EFE7]">{proyecto.year}</span>}
              {proyecto.client && <span className="text-[#1E2A44]/60">{proyecto.client}</span>}
            </div>
            <h2 id="modal-titulo" className="mt-1 font-display text-2xl font-black uppercase leading-none tracking-tight md:text-3xl">
              {proyecto.title}
            </h2>
            <p className="mt-1 line-clamp-1 text-[13px] text-[#1E2A44]/70">{proyecto.subtitle}</p>
          </div>
          <button
            ref={botonCerrar}
            type="button"
            onClick={onClose}
            aria-label="Cerrar proyecto"
            className="shrink-0 rounded-full bg-[#1E2A44] p-2.5 text-[#F2EFE7] transition-colors hover:bg-[#FF704A] hover:text-[#1E2A44]"
          >
            <X size={20} />
          </button>
        </header>

        <div className="grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-[1.3fr_1fr] lg:overflow-hidden">
          {/* CARRUSEL (imágenes y videos): ocupa todo el alto disponible */}
          <section aria-label="Galería del proyecto" className="flex min-h-0 min-w-0 flex-col gap-2 p-4 md:p-5">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-[#1E2A44] lg:aspect-auto lg:min-h-0 lg:flex-1">
              {!actual && (
                <div className="flex h-full flex-col items-center justify-center gap-3 p-6">
                  {proyecto.logoInteractivo ? (
                    <LogoInteractivo logo={proyecto.logoInteractivo} tamano={120} />
                  ) : (
                    <span className="font-display text-xl font-bold uppercase text-[#F2EFE7]/70">Portada pendiente</span>
                  )}
                </div>
              )}

              {actual?.tipo === "video" ? (
                <video
                  key={actual.src}
                  src={actual.src}
                  poster={actual.poster}
                  controls
                  playsInline
                  preload="metadata"
                  className="h-full w-full bg-black object-contain"
                >
                  Tu navegador no puede reproducir este video.
                </video>
              ) : (
                actual && <img key={actual.src} src={actual.src} alt={actual.caption} className="h-full w-full object-contain" />
              )}

              {total > 1 && (
                <>
                  <button
                    type="button"
                    onClick={anterior}
                    aria-label="Anterior"
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-[#F2EFE7] p-2 text-[#1E2A44] shadow-lg transition-colors hover:bg-[#FF704A]"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={siguiente}
                    aria-label="Siguiente"
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-[#F2EFE7] p-2 text-[#1E2A44] shadow-lg transition-colors hover:bg-[#FF704A]"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            <div className="flex shrink-0 items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[#1E2A44]/65">
              <span className="truncate">{actual?.caption ?? proyecto.title}</span>
              {total > 0 && (
                <span className="shrink-0 font-bold text-[#FF704A]">
                  {indice + 1} / {total}
                </span>
              )}
            </div>

            {total > 1 && (
              <ul className="flex shrink-0 gap-1.5 overflow-x-auto pb-1">
                {galeria.map((item, posicion) => (
                  <li key={item.src} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => setIndice(posicion)}
                      aria-label={`Ver ${item.caption}`}
                      aria-current={posicion === indice}
                      className={`relative block h-11 w-16 overflow-hidden rounded-lg border-2 bg-[#1E2A44] transition-opacity ${
                        posicion === indice ? "border-[#FF704A]" : "border-transparent opacity-55 hover:opacity-100"
                      }`}
                    >
                      {item.tipo === "video" ? (
                        <span className="flex h-full w-full items-center justify-center text-[#F2EFE7]">
                          {item.poster && (
                            <img src={item.poster} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" />
                          )}
                          <Play size={16} className="relative" />
                        </span>
                      ) : (
                        <img src={item.src} alt="" loading="lazy" className="h-full w-full object-cover" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* INFORMACIÓN compacta */}
          <section className="flex min-h-0 min-w-0 flex-col gap-4 border-t border-[#1E2A44]/10 p-4 md:p-5 lg:overflow-y-auto lg:border-l lg:border-t-0">
            <div className="flex flex-col gap-2 text-[13px] leading-snug text-[#1E2A44]/85">
              {proyecto.description.map((parrafo) => (
                <p key={parrafo.slice(0, 40)}>{parrafo}</p>
              ))}
            </div>

            <div>
              <Rotulo>Proceso</Rotulo>
              <ol className="mt-1.5 grid grid-cols-2 gap-x-3 gap-y-1.5">
                {proyecto.process.map((paso, i) => (
                  <li key={paso} className="flex items-start gap-1.5 text-[11.5px] leading-snug">
                    <span className="font-mono text-[10px] font-bold text-[#FF704A]">{String(i + 1).padStart(2, "0")}</span>
                    {paso}
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <Rotulo>Destacados</Rotulo>
              <ul className="mt-1.5 grid grid-cols-2 gap-2">
                {proyecto.highlights.map((h) => (
                  <li key={h.title} className="rounded-xl bg-white px-2.5 py-2">
                    <span className="block font-display text-[12px] font-bold uppercase leading-tight">{h.title}</span>
                    <span className="mt-0.5 line-clamp-2 block text-[11px] leading-snug text-[#1E2A44]/70">{h.detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Rotulo>Herramientas</Rotulo>
              <ul className="mt-1.5 flex flex-wrap gap-1">
                {proyecto.technologies.map((tec) => (
                  <li
                    key={tec}
                    className="rounded-full border border-[#1E2A44]/20 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.08em]"
                  >
                    {tec}
                  </li>
                ))}
              </ul>
            </div>

            {(links.length > 0 || redes.length > 0) && (
              <div className="mt-auto flex flex-wrap gap-2 pt-1">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#FF704A] px-4 py-2 font-display text-[11px] font-bold uppercase tracking-[0.08em] text-[#1E2A44] transition-colors hover:bg-[#1E2A44] hover:text-[#F2EFE7]"
                  >
                    {link.label}
                    <ArrowUpRight size={14} />
                  </a>
                ))}
                {redes.map((red) => (
                  <a
                    key={red.href}
                    href={red.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#1E2A44] px-4 py-1.5 font-display text-[11px] font-bold uppercase tracking-[0.08em] transition-colors hover:bg-[#1E2A44] hover:text-[#F2EFE7]"
                  >
                    {red.label === "Instagram" ? <AtSign size={14} /> : <Globe size={14} />}
                    {red.label}
                    <ArrowUpRight size={13} />
                  </a>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>,
    document.body,
  );
}
