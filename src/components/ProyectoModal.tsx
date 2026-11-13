import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  X,
} from "lucide-react";
import type { ProyectoDetalle } from "../data/proyectosDetalle";

interface ProyectoModalProps {
  proyecto: ProyectoDetalle | null;
  onClose: () => void;
}

export default function ProyectoModal({ proyecto, onClose }: ProyectoModalProps) {
  const [indice, setIndice] = useState(0);
  const [fallidas, setFallidas] = useState<Record<string, boolean>>({});
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const total = proyecto?.gallery.length ?? 0;

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const anterior = () => {
    if (total === 0) return;
    setIndice((actual) => (actual - 1 + total) % total);
  };

  const siguiente = () => {
    if (total === 0) return;
    setIndice((actual) => (actual + 1) % total);
  };

  useEffect(() => {
    setIndice(0);
    setFallidas({});
  }, [proyecto?.slug]);

  useEffect(() => {
    if (!proyecto) return;

    previouslyFocused.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const alPresionar = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") onCloseRef.current();
      if (evento.key === "ArrowLeft") anterior();
      if (evento.key === "ArrowRight") siguiente();
    };

    const alTabular = (evento: KeyboardEvent) => {
      if (evento.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;

      const focusables = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) {
        evento.preventDefault();
        return;
      }

      const primero = focusables[0];
      const ultimo = focusables[focusables.length - 1];
      const activo = document.activeElement;

      if (evento.shiftKey) {
        if (activo === primero || !panel.contains(activo)) {
          evento.preventDefault();
          ultimo.focus();
        }
      } else if (activo === ultimo || !panel.contains(activo)) {
        evento.preventDefault();
        primero.focus();
      }
    };

    window.addEventListener("keydown", alPresionar);
    window.addEventListener("keydown", alTabular);

    return () => {
      window.removeEventListener("keydown", alPresionar);
      window.removeEventListener("keydown", alTabular);
      document.body.style.overflow = overflowPrevio;
      previouslyFocused.current?.focus();
    };
  }, [proyecto, total]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {proyecto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-[#0A1128]/80 p-3 backdrop-blur-xl sm:p-6"
        >
          {/* Luces de fondo detrás del panel */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-[#FF704A]/20 blur-[120px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[#1E2A44]/60 blur-[120px]"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`proyecto-${proyecto.slug}-titulo`}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(evento) => evento.stopPropagation()}
            className="texture-noise relative flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#1E2A44] text-[#F2EFE7] shadow-2xl shadow-black/50"
          >
            {/* Profundidad interior */}
            <div
              aria-hidden="true"
              className="pattern-grid-light pointer-events-none absolute inset-0 opacity-40"
            />
            <div
              aria-hidden="true"
              className="pattern-waves pointer-events-none absolute inset-0 opacity-50"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#FF704A]/20 blur-3xl"
            />

            {/* HEADER */}
            <header className="relative z-10 flex shrink-0 items-start justify-between gap-4 px-5 py-4 md:px-8 md:py-6">
              <div className="min-w-0">
                <span className="inline-flex rounded-full bg-gradient-to-r from-[#FF704A] to-[#ff8a6b] px-2.5 py-1 font-mono text-[9px] font-bold uppercase leading-none tracking-[0.2em] text-[#1E2A44] shadow-lg shadow-[#FF704A]/25">
                  {proyecto.category}
                </span>
                <h2
                  id={`proyecto-${proyecto.slug}-titulo`}
                  className="mt-2 font-display text-2xl font-black uppercase leading-none tracking-[-0.02em] text-[#F2EFE7] md:text-4xl"
                >
                  {proyecto.title}
                  <span className="text-[#FF704A]">.</span>
                </h2>
                <p className="mt-2 max-w-2xl font-sans text-xs font-light leading-snug text-[#F2EFE7]/60 md:text-sm">
                  {proyecto.subtitle}
                </p>
              </div>

              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Cerrar proyecto"
                className="shrink-0 rounded-full border border-white/15 bg-white/10 p-2.5 text-[#F2EFE7] backdrop-blur-md transition-all hover:scale-105 hover:border-[#FF704A]/60 hover:bg-[#FF704A] hover:text-[#1E2A44] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF704A]"
              >
                <X size={20} />
              </button>
            </header>

            {/* CUERPO SCROLLEABLE */}
            <div className="relative z-10 grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-[1.35fr_1fr] hide-scrollbar">
              {/* CARRUSEL */}
              <section className="min-w-0 p-4 md:p-6">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0A1128]/70 shadow-2xl shadow-black/30">
                  {proyecto.gallery[indice] && !fallidas[proyecto.gallery[indice].src] ? (
                    <img
                      src={proyecto.gallery[indice].src}
                      alt={proyecto.gallery[indice].caption}
                      className="h-full w-full object-contain"
                      onError={() =>
                        setFallidas((previas) => ({
                          ...previas,
                          [proyecto.gallery[indice].src]: true,
                        }))
                      }
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[radial-gradient(circle_at_50%_35%,rgba(255,112,74,0.25),transparent_68%)] px-6 text-center">
                      <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#FF704A]">
                        Captura pendiente
                      </span>
                      <span className="font-display text-lg font-bold uppercase tracking-tight text-[#F2EFE7]/80">
                        {proyecto.gallery[indice]?.caption ?? proyecto.title}
                      </span>
                    </div>
                  )}

                  {total > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={anterior}
                        aria-label="Imagen anterior"
                        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/15 bg-[#0A1128]/70 p-2 text-[#F2EFE7] backdrop-blur-md transition-all hover:scale-105 hover:border-[#FF704A] hover:text-[#FF704A]"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        type="button"
                        onClick={siguiente}
                        aria-label="Imagen siguiente"
                        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/15 bg-[#0A1128]/70 p-2 text-[#F2EFE7] backdrop-blur-md transition-all hover:scale-105 hover:border-[#FF704A] hover:text-[#FF704A]"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}

                  <span className="absolute bottom-2 right-2 rounded-full border border-white/10 bg-[#0A1128]/70 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#F2EFE7]/80 backdrop-blur-md">
                    {total > 0 ? indice + 1 : 0} / {total}
                  </span>
                </div>

                {total > 1 && (
                  <div className="mt-3 flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
                    {proyecto.gallery.map((imagen, posicion) => (
                      <button
                        key={`${imagen.src}-${posicion}`}
                        type="button"
                        onClick={() => setIndice(posicion)}
                        aria-label={`Ir a ${imagen.caption}`}
                        className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border transition-all ${
                          posicion === indice
                            ? "border-[#FF704A] opacity-100 shadow-lg shadow-[#FF704A]/20"
                            : "border-white/10 opacity-60 hover:opacity-100"
                        }`}
                      >
                        {!fallidas[imagen.src] ? (
                          <img
                            src={imagen.src}
                            alt=""
                            className="h-full w-full object-cover"
                            onError={() =>
                              setFallidas((previas) => ({
                                ...previas,
                                [imagen.src]: true,
                              }))
                            }
                          />
                        ) : (
                          <span className="flex h-full w-full items-center justify-center bg-[#0A1128] px-1 text-center font-mono text-[7px] uppercase tracking-wider text-[#F2EFE7]/40">
                            {imagen.caption}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}

                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#F2EFE7]/45">
                  {proyecto.gallery[indice]?.caption ?? "Galería del proyecto"}
                </p>
              </section>

              {/* INFORMACIÓN */}
              <section className="min-w-0 p-4 md:p-6">
                <div className="flex flex-wrap items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-[#F2EFE7]/50">
                  <span className="rounded-full border border-white/10 bg-white/[0.06] px-2 py-1 backdrop-blur-md">
                    {proyecto.year}
                  </span>
                  {proyecto.client && (
                    <span className="rounded-full border border-white/10 bg-white/[0.06] px-2 py-1 backdrop-blur-md">
                      {proyecto.client}
                    </span>
                  )}
                  <span className="rounded-full bg-[#FF704A]/15 px-2 py-1 text-[#FF704A]">
                    {proyecto.technologies.length} herramientas
                  </span>
                </div>

                <div className="mt-4 flex flex-col gap-3">
                  {proyecto.description.map((parrafo) => (
                    <p
                      key={parrafo.slice(0, 32)}
                      className="font-sans text-[12px] font-light leading-relaxed text-[#F2EFE7]/70"
                    >
                      {parrafo}
                    </p>
                  ))}
                </div>

                <div className="mt-5">
                  <h3 className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#FF704A]">
                    Proceso
                  </h3>
                  <ol className="mt-2 flex flex-col gap-2">
                    {proyecto.process.map((paso, posicion) => (
                      <li
                        key={paso}
                        className="flex items-start gap-2.5 font-sans text-[11px] font-light leading-snug text-[#F2EFE7]/70"
                      >
                        <span className="mt-[1px] flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border border-[#FF704A]/25 bg-[#FF704A]/15 font-mono text-[8px] font-bold text-[#FF704A]">
                          {posicion + 1}
                        </span>
                        {paso}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="mt-5">
                  <h3 className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#FF704A]">
                    Destacados
                  </h3>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {proyecto.highlights.map((highlight) => (
                      <div
                        key={highlight.title}
                        className="rounded-xl border border-white/10 bg-white/[0.06] p-2.5 backdrop-blur-md"
                      >
                        <span className="block font-display text-[11px] font-bold uppercase leading-tight text-[#F2EFE7]">
                          {highlight.title}
                        </span>
                        <span className="mt-1 block font-sans text-[10px] font-light leading-snug text-[#F2EFE7]/55">
                          {highlight.detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <h3 className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#FF704A]">
                    Stack
                  </h3>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {proyecto.technologies.map((tecnologia) => (
                      <li
                        key={tecnologia}
                        className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-[#F2EFE7]/70 backdrop-blur-md"
                      >
                        {tecnologia}
                      </li>
                    ))}
                  </ul>
                </div>

                {proyecto.links && proyecto.links.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {proyecto.links.map((link, posicion) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] transition-all hover:scale-[1.03] ${
                          posicion === 0
                            ? "bg-gradient-to-r from-[#FF704A] to-[#ff8a6b] text-[#1E2A44] shadow-lg shadow-[#FF704A]/25"
                            : "border border-white/15 text-[#F2EFE7] backdrop-blur-md hover:border-[#FF704A]/60 hover:text-[#FF704A]"
                        }`}
                      >
                        {posicion === 0 ? (
                          <ArrowUpRight size={14} />
                        ) : (
                          <ExternalLink size={14} />
                        )}
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
