import { useState, type MouseEvent, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

interface FiguritaProps {
  numero: number | string;
  titulo: string;
  descripcion: string;
  stats: { label: string; value: string | number }[];
  esBrillante?: boolean;
  link?: string;
  imagen?: string;
  ajusteImagen?: "cover" | "contain";
  linkTexto?: string;
  compacta?: boolean;
  /** Si se pasa, el dorso muestra un botón "Ver más" que abre el modal. */
  onVerMas?: () => void;
  /** Ícono grande para el frente (por ejemplo, el clima). */
  icono?: ReactNode;
  /** Aplica un filtro sutil para integrar la imagen a la paleta editorial. */
  tinte?: boolean;
}

function GloboMarca({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className={className}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.6 2.6 2.6 15.4 0 18M12 3c-2.6 2.6-2.6 15.4 0 18" />
    </svg>
  );
}

export const Figurita = ({
  numero,
  titulo,
  descripcion,
  stats,
  esBrillante = false,
  link,
  imagen,
  ajusteImagen = "cover",
  linkTexto = "VER PROYECTO",
  compacta = false,
  onVerMas,
  icono,
  tinte = false,
}: FiguritaProps) => {
  const [flipped, setFlipped] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  // Las rutas internas navegan en la misma pestaña; los archivos y links externos abren aparte
  const esArchivo = /\.(mp4|webm|mov|pdf)$/i.test(link ?? "");
  const mismaPestania = (link?.startsWith("/") ?? false) && !esArchivo;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (flipped) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const tieneImagen = Boolean(imagen);
  const tieneIcono = Boolean(icono);
  const mostrarTituloEnFrente = !tieneImagen && !tieneIcono;

  return (
    <div
      className={`group perspective-1000 w-full ${
        compacta ? "h-full min-h-0" : ""
      }`}
    >
      <div
        onClick={() => setFlipped(!flipped)}
        role="button"
        tabIndex={0}
        aria-label={`${titulo} — girar figurita`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setFlipped((v) => !v);
          }
        }}
        className={`relative w-full cursor-pointer transition-transform duration-700 transform-style-3d ${
          compacta ? "h-full" : "aspect-[2.5/3.5]"
        } ${flipped ? "rotate-y-180" : "hover:-translate-y-1 hover:scale-[1.015]"}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* --- FRENTE --- */}
        <div className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-white/40 bg-cream p-2 shadow-2xl shadow-night/25 backface-hidden">
          {/* luz suave de estudio */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_75%_at_50%_-15%,rgba(255,112,74,0.32),transparent_62%)]"
          />
          <div
            aria-hidden="true"
            className="pattern-grid pointer-events-none absolute inset-0 opacity-60"
          />

          <div className="relative z-10 flex h-full min-h-0 flex-col">
            <div className="absolute left-0 top-0 z-20 flex items-center gap-1 rounded-full border border-white/15 bg-night/90 px-2 py-0.5 font-mono text-[9px] font-medium leading-none text-cream shadow-lg shadow-night/30 backdrop-blur">
              <span className="h-1 w-1 rounded-full bg-orange" />#{numero}
            </div>

            <div
              className={`relative min-h-0 flex-1 overflow-hidden rounded-xl ${
                mostrarTituloEnFrente
                  ? "bg-gradient-to-br from-orange via-[#ff8a6b] to-[#ffb199]"
                  : "bg-night"
              }`}
            >
              {tieneImagen ? (
                <>
                  <img
                    src={imagen}
                    alt={titulo}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                    className={`h-full w-full ${
                      ajusteImagen === "contain" ? "object-contain p-2" : "object-cover"
                    } ${tinte ? "saturate-[0.78] contrast-[1.05] sepia-[0.12]" : ""}`}
                  />
                  {tinte && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/80 via-orange/15 to-transparent mix-blend-multiply"
                    />
                  )}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/70 to-transparent"
                  />
                </>
              ) : tieneIcono ? (
                <div className="flex h-full w-full items-center justify-center p-2">
                  {icono}
                </div>
              ) : (
                <div className="relative flex h-full w-full items-center justify-center p-3 text-center">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_120%,rgba(30,42,68,0.35),transparent_70%)]"
                  />
                  <h3 className="relative line-clamp-4 break-words font-display text-xl font-black uppercase leading-[0.9] tracking-tight text-night md:text-2xl">
                    {titulo}
                  </h3>
                </div>
              )}

              <GloboMarca className="pointer-events-none absolute bottom-1.5 right-1.5 h-3.5 w-3.5 text-white/60" />
            </div>

            <div className="flex shrink-0 items-center justify-between gap-1 px-0.5 pb-0.5 pt-1.5">
              <div className="min-w-0">
                {!mostrarTituloEnFrente && (
                  <span className="block truncate font-display text-[12px] font-bold leading-none tracking-tight text-night">
                    {titulo}
                  </span>
                )}
                <span className="mt-1 block font-mono text-[7px] uppercase tracking-[0.26em] text-night/45">
                  Cortese 2026
                </span>
              </div>
              <span
                aria-hidden="true"
                className="shrink-0 font-display text-sm font-light leading-none text-night/30"
              >
                +
              </span>
            </div>
          </div>

          {/* BRILLO HOLOGRÁFICO */}
          {esBrillante && !flipped && (
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl mix-blend-soft-light transition-opacity duration-300"
              style={{
                opacity: hovered ? 0.9 : 0,
                background: `radial-gradient(circle at ${position.x}% ${position.y}%, rgba(255,255,255,0.95) 0%, rgba(255,112,74,0.6) 22%, rgba(242,239,231,0.25) 45%, transparent 65%)`,
              }}
            />
          )}
        </div>

        {/* --- DORSO --- */}
        <div
          className={`absolute inset-0 flex rotate-y-180 flex-col overflow-hidden rounded-2xl border border-white/12 bg-night text-cream shadow-2xl shadow-night/40 backface-hidden ${
            compacta ? "p-2.5" : "p-4"
          }`}
        >
          {/* profundidad: glows + ondas + ruido */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(95%_70%_at_100%_0%,rgba(255,112,74,0.42),transparent_62%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(85%_65%_at_0%_100%,rgba(255,255,255,0.12),transparent_70%)]"
          />
          <div
            aria-hidden="true"
            className="pattern-waves pointer-events-none absolute inset-0 opacity-70"
          />
          <GloboMarca className="pointer-events-none absolute -bottom-3 -right-3 h-14 w-14 text-white/[0.06]" />

          <div className="relative z-10 flex min-h-0 flex-1 flex-col">
            <div className="flex shrink-0 items-start justify-between gap-2">
              <h3
                className={`min-w-0 font-display font-bold uppercase leading-tight text-cream ${
                  compacta ? "line-clamp-2 text-[12px]" : "text-base"
                }`}
              >
                {titulo}
              </h3>
              <span className="shrink-0 rounded-full bg-gradient-to-r from-orange to-[#ff8a6b] px-1.5 py-0.5 font-mono text-[8px] font-bold leading-none text-night shadow-sm shadow-orange/40">
                #{numero}
              </span>
            </div>

            <p
              className={`figurita-desc line-clamp-2 mt-1.5 min-h-0 shrink-0 font-light leading-snug text-cream/70 ${
                compacta ? "line-clamp-3 text-[9px]" : "line-clamp-4 text-xs"
              }`}
            >
              {descripcion || "Sin descripción disponible."}
            </p>

            <div className="mt-2 grid shrink-0 grid-cols-2 gap-1.5">
              {stats.map((stat, i) => (
                <div
                  key={`${stat.label}-${i}`}
                  className={`min-w-0 rounded-lg border border-white/10 bg-white/[0.07] backdrop-blur-md ${
                    compacta ? "px-1.5 py-1" : "px-2 py-1.5"
                  } ${
                    stats.length % 2 === 1 && i === stats.length - 1 ? "col-span-2" : ""
                  }`}
                >
                  <span className="block truncate font-mono text-[7px] uppercase leading-none tracking-[0.14em] text-orange">
                    {stat.label}
                  </span>
                  <span
                    className={`mt-1 block truncate font-display font-bold leading-tight text-cream ${
                      compacta ? "text-[9px]" : "text-[11px]"
                    }`}
                  >
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-auto shrink-0 pt-2">
              {onVerMas ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onVerMas();
                  }}
                  tabIndex={flipped ? 0 : -1}
                  className={`flex w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-orange to-[#ff8a6b] font-display font-bold uppercase tracking-[0.1em] text-night shadow-lg shadow-orange/25 transition-all hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-cream ${
                    compacta ? "py-1.5 text-[8px]" : "py-2.5 text-[10px]"
                  }`}
                >
                  Ver más
                  <ArrowUpRight size={compacta ? 11 : 14} strokeWidth={2.5} />
                </button>
              ) : link ? (
                <a
                  href={link}
                  target={mismaPestania ? undefined : "_blank"}
                  rel={mismaPestania ? undefined : "noopener noreferrer"}
                  onClick={(e) => e.stopPropagation()}
                  tabIndex={flipped ? 0 : -1}
                  className={`flex w-full items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-orange to-[#ff8a6b] text-center font-display font-bold uppercase tracking-[0.1em] text-night shadow-lg shadow-orange/25 transition-all hover:brightness-110 ${
                    compacta ? "py-1.5 text-[8px]" : "py-2.5 text-[10px]"
                  }`}
                >
                  {linkTexto}
                  <ArrowUpRight size={compacta ? 10 : 12} strokeWidth={2.5} />
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
