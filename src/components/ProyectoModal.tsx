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


export default function ProyectoModal({ proyecto, onClose }: ProyectoModalProps) {
  const [indice, setIndice] = useState(0);
  const botonCerrar = useRef<HTMLButtonElement>(null);

  const galeria = proyecto.gallery;
  const total = galeria.length;
  const actual = galeria[indice];
  const links = (proyecto.links ?? []).filter((link) => link.href);
  const redes = (proyecto.redes ?? []).filter((red) => red.href);
  const galeriaDensa = total > 8;
  const esLogo = proyecto.ajusteGaleria === "contain" || Boolean(proyecto.logoInteractivo);
  const fondoOscuro = proyecto.fondoGaleria === "oscuro";
  const matteLogo = fondoOscuro
    ? "bg-[#0A1128] ring-white/15"
    : "bg-[#E7E5DB] ring-[#1E2A44]/10";

  const anterior = () => setIndice((i) => (i - 1 + total) % total);
  const siguiente = () => setIndice((i) => (i + 1) % total);

  useEffect(() => {
    const elementoPrevio = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    botonCerrar.current?.focus();

    const alPresionar = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
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
        className={`modal-panel relative flex max-h-[94vh] w-full flex-col overflow-hidden rounded-3xl bg-[#F2EFE7] text-[#1E2A44] shadow-2xl shadow-black/50 ${
          galeriaDensa ? "max-w-[86rem] lg:h-[min(94vh,880px)]" : "max-w-6xl lg:h-[min(90vh,760px)]"
        }`}
      >
        {/* ENCABEZADO: título + datos clave */}
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

        <div
          className={`flex min-h-0 flex-1 flex-col overflow-y-auto lg:grid lg:overflow-hidden ${
            galeriaDensa ? "lg:grid-cols-[1.5fr_1fr]" : "lg:grid-cols-[1.3fr_1fr]"
          }`}
        >
          <section
            aria-label="Galería del proyecto"
            className="flex min-w-0 shrink-0 flex-col gap-2 p-4 lg:min-h-0 md:p-5"
          >
            <div
              className={`relative flex h-56 w-full shrink-0 items-center justify-center overflow-hidden sm:h-72 lg:h-auto lg:flex-1 lg:shrink ${
                esLogo || !actual ? `rounded-2xl p-6 ring-1 ring-inset md:p-10 ${matteLogo}` : ""
              }`}
            >
              {!actual && (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3">
                  {proyecto.logoInteractivo ? (
                    <LogoInteractivo logo={proyecto.logoInteractivo} tamano={132} />
                  ) : (
                    <span
                      className={`font-display text-xl font-bold uppercase ${
                        fondoOscuro ? "text-[#F2EFE7]/60" : "text-[#1E2A44]/50"
                      }`}
                    >
                      Portada pendiente
                    </span>
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
                  className="modal-media block max-h-full max-w-full rounded-2xl bg-[#0A1128] object-contain shadow-lg shadow-[#1E2A44]/20"
                >
                  Tu navegador no puede reproducir este video.
                </video>
              ) : (
                actual && (
                  <img
                    key={actual.src}
                    src={actual.src}
                    alt={actual.caption}
                    className={`modal-media block max-h-full max-w-full object-contain ${
                      esLogo ? "" : "rounded-2xl shadow-lg shadow-[#1E2A44]/20"
                    }`}
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

            <div className="flex shrink-0 items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[#1E2A44]/65">
              <span className="truncate">{actual?.caption ?? proyecto.title}</span>
              {total > 0 && (
                <span className="shrink-0 font-bold text-[#FF704A]">
                  {indice + 1} / {total}
                </span>
              )}
            </div>

            {total > 1 && (
              <ul className="flex shrink-0 gap-1 overflow-x-auto pb-1 [scrollbar-width:thin] sm:grid sm:grid-cols-[repeat(auto-fill,minmax(46px,1fr))] sm:overflow-visible sm:pb-0">
                {galeria.map((item, posicion) => (
                  <li key={item.src} className="w-11 shrink-0 sm:w-auto sm:min-w-0">
                    <button
                      type="button"
                      onClick={() => setIndice(posicion)}
                      aria-label={`Ver ${item.caption}`}
                      aria-current={posicion === indice}
                      className={`relative block aspect-square w-full overflow-hidden rounded-md border-2 bg-[#1E2A44] transition-opacity ${
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

        
          <section
            className={`flex min-w-0 shrink-0 flex-col border-t border-[#1E2A44]/10 p-4 pb-7 md:p-5 md:pb-8 lg:min-h-0 lg:overflow-hidden lg:border-l lg:border-t-0 lg:pb-5 ${
              galeriaDensa ? "gap-2" : "gap-2.5"
            }`}
          >
            <div
              className={`flex min-h-0 flex-1 flex-col leading-snug text-[#1E2A44]/85 lg:overflow-y-auto lg:pr-1 [scrollbar-width:thin] ${
                galeriaDensa ? "gap-2 text-[12.5px]" : "gap-2.5 text-[13px]"
              }`}
            >
              <div className="flex flex-col gap-1.5">
                {proyecto.description.map((parrafo) => (
                  <p key={parrafo.slice(0, 40)} className={galeriaDensa ? "line-clamp-3" : "line-clamp-4"}>
                    {parrafo}
                  </p>
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
                <ul
                  className={`mt-1.5 grid gap-1.5 ${
                    proyecto.highlights.length >= 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"
                  }`}
                >
                  {proyecto.highlights.map((h) => (
                    <li key={h.title} className="rounded-xl bg-white p-2.5">
                      <span className="block font-display text-[11.5px] font-bold uppercase leading-tight">{h.title}</span>
                      <span className="mt-0.5 line-clamp-2 block text-[10.5px] leading-snug text-[#1E2A44]/70">{h.detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
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
            </div>

            {(links.length > 0 || redes.length > 0) && (
              <div className="flex shrink-0 flex-wrap gap-2 border-t border-[#1E2A44]/10 pt-2.5">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-[#FF704A] px-4 py-2 text-center font-display text-[11px] font-bold uppercase tracking-[0.08em] text-[#1E2A44] transition-colors hover:bg-[#1E2A44] hover:text-[#F2EFE7]"
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
                    className="inline-flex max-w-full items-center gap-1.5 rounded-full border-2 border-[#1E2A44] px-4 py-1.5 text-center font-display text-[11px] font-bold uppercase tracking-[0.08em] transition-colors hover:bg-[#1E2A44] hover:text-[#F2EFE7]"
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
