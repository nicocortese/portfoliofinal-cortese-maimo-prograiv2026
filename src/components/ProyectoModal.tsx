import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, AtSign, ChevronLeft, ChevronRight, Globe, Play, X } from "lucide-react";
import type { ProyectoDetalle } from "../data/proyectosDetalle";

interface ProyectoModalProps {
  proyecto: ProyectoDetalle;
  onClose: () => void;
}

/*
 * Modal de proyecto.
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
      className="modal-fondo fixed inset-0 z-[99999] flex items-center justify-center bg-[#0A1128]/85 p-3 sm:p-6"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-titulo"
        onClick={(e) => e.stopPropagation()}
        className="modal-panel relative flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl bg-[#F2EFE7] text-[#1E2A44] shadow-2xl shadow-black/50"
      >
        {/* ENCABEZADO */}
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-[#1E2A44]/10 px-5 py-4 md:px-8 md:py-5">
          <div className="min-w-0">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#FF704A]">
              + {proyecto.category}
            </p>
            <h2
              id="modal-titulo"
              className="mt-1.5 font-display text-2xl font-black uppercase leading-none tracking-tight md:text-4xl"
            >
              {proyecto.title}
            </h2>
            <p className="mt-2 max-w-2xl text-sm font-light leading-snug text-[#1E2A44]/65">{proyecto.subtitle}</p>
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

        <div className="grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-[1.4fr_1fr]">
          {/* CARRUSEL (imágenes y videos) */}
          <section aria-label="Galería del proyecto" className="min-w-0 p-4 md:p-6">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#1E2A44]">
              {!actual && (
                <div className="flex h-full items-center justify-center p-6 text-center font-display text-xl font-bold uppercase text-[#F2EFE7]/70">
                  Portada pendiente
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
                actual && (
                  <img
                    key={actual.src}
                    src={actual.src}
                    alt={actual.caption}
                    className="h-full w-full object-contain"
                  />
                )
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

            <div className="mt-3 flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#1E2A44]/60">
              <span className="truncate">{actual?.caption ?? proyecto.title}</span>
              <span className="shrink-0 text-[#FF704A]">
                {total > 0 ? indice + 1 : 0} / {total}
              </span>
            </div>

            {total > 1 && (
              <ul className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {galeria.map((item, posicion) => (
                  <li key={item.src} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => setIndice(posicion)}
                      aria-label={`Ver ${item.caption}`}
                      aria-current={posicion === indice}
                      className={`relative block h-14 w-20 overflow-hidden rounded-lg border-2 bg-[#1E2A44] transition-opacity ${
                        posicion === indice ? "border-[#FF704A]" : "border-transparent opacity-55 hover:opacity-100"
                      }`}
                    >
                      {item.tipo === "video" ? (
                        <span className="flex h-full w-full items-center justify-center text-[#F2EFE7]">
                          {item.poster && (
                            <img src={item.poster} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" />
                          )}
                          <Play size={18} className="relative" />
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

          {/* INFORMACIÓN */}
          <section className="min-w-0 border-t border-[#1E2A44]/10 p-4 md:p-6 lg:border-l lg:border-t-0">
            <ul className="flex flex-wrap gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em]">
              {proyecto.year && <li className="rounded-full bg-[#1E2A44] px-2.5 py-1 text-[#F2EFE7]">{proyecto.year}</li>}
              {proyecto.client && (
                <li className="rounded-full border border-[#1E2A44]/20 px-2.5 py-1">{proyecto.client}</li>
              )}
            </ul>

            <div className="mt-4 flex flex-col gap-3 text-[14px] font-light leading-relaxed text-[#1E2A44]/80">
              {proyecto.description.map((parrafo) => (
                <p key={parrafo.slice(0, 40)}>{parrafo}</p>
              ))}
            </div>

            <h3 className="mt-6 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#FF704A]">Proceso</h3>
            <ol className="mt-2 flex flex-col">
              {proyecto.process.map((paso, i) => (
                <li
                  key={paso}
                  className="flex items-start gap-3 border-b border-[#1E2A44]/10 py-2 text-[13px] leading-snug last:border-b-0"
                >
                  <span className="font-mono text-[11px] font-bold text-[#FF704A]">{String(i + 1).padStart(2, "0")}</span>
                  {paso}
                </li>
              ))}
            </ol>

            <h3 className="mt-6 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#FF704A]">Destacados</h3>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {proyecto.highlights.map((h) => (
                <div key={h.title} className="rounded-xl bg-white p-3">
                  <span className="block font-display text-[13px] font-bold uppercase leading-tight">{h.title}</span>
                  <span className="mt-1 block text-[12px] font-light leading-snug text-[#1E2A44]/65">{h.detail}</span>
                </div>
              ))}
            </div>

            <h3 className="mt-6 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#FF704A]">Herramientas</h3>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {proyecto.technologies.map((tec) => (
                <li
                  key={tec}
                  className="rounded-full border border-[#1E2A44]/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em]"
                >
                  {tec}
                </li>
              ))}
            </ul>

            {redes.length > 0 && (
              <>
                <h3 className="mt-6 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#FF704A]">Redes</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {redes.map((red) => (
                    <a
                      key={red.href}
                      href={red.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border-2 border-[#1E2A44] px-4 py-2 font-display text-[12px] font-bold uppercase tracking-[0.08em] transition-colors hover:bg-[#1E2A44] hover:text-[#F2EFE7]"
                    >
                      {red.label === "Instagram" ? <AtSign size={15} /> : <Globe size={15} />}
                      {red.label}
                      <ArrowUpRight size={14} />
                    </a>
                  ))}
                </div>
              </>
            )}

            {links.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#FF704A] px-5 py-2.5 font-display text-[12px] font-bold uppercase tracking-[0.08em] text-[#1E2A44] transition-colors hover:bg-[#1E2A44] hover:text-[#F2EFE7]"
                  >
                    {link.label}
                    <ArrowUpRight size={15} />
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
