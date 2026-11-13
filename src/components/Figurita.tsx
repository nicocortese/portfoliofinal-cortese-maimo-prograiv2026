import { useState, type MouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";

interface FiguritaProps {
  numero: string;
  titulo: string;
  descripcion: string;
  stats: { label: string; value: string }[];
  imagen?: string;
  esBrillante?: boolean;
  /** Ocupa toda la celda de la grilla en lugar de usar proporción fija. */
  compacta?: boolean;
  /** Identificador del proyecto que se abre en el modal. */
  slug?: string;
  onVerProyecto?: (slug: string) => void;
  /** Mantiene la proporción clásica 2.5/3.5 y la foto llena el marco (para fotos, no portadas). */
  formaFija?: boolean;
}

/* Duración del giro en ms: tiene que coincidir con .figurita-girando en global.css */
const DURACION_GIRO = 420;

export function Figurita({
  numero,
  titulo,
  descripcion,
  stats,
  imagen,
  esBrillante = false,
  compacta = false,
  slug,
  onVerProyecto,
  formaFija = false,
}: FiguritaProps) {
  const [girada, setGirada] = useState(false);
  const [girando, setGirando] = useState(false);
  const [imagenRota, setImagenRota] = useState(false);
  const [brillo, setBrillo] = useState({ x: 50, y: 50, visible: false });
  // Proporción real de la portada (ancho / alto), se conoce al cargar la imagen.
  const [proporcion, setProporcion] = useState(0);

  const tieneImagen = Boolean(imagen) && !imagenRota;
  const puedeAbrir = Boolean(slug && onVerProyecto);
  const statsVisibles = stats.slice(0, compacta ? 2 : 4);

  /*
   * Giro en dos tiempos: la tarjeta se pone de canto, cambia de cara a mitad
   * de camino y vuelve. Al terminar no queda ninguna transformación 3D,
   * así el texto del dorso se ve nítido (sin blur).
   */
  const girar = () => {
    if (girando) return;
    setGirando(true);
    setTimeout(() => setGirada(!girada), DURACION_GIRO / 2);
  };

  /*
   * La tarjeta toma la forma de su portada. Se limita entre 0.62 y 1.05
   * para que el dorso siempre tenga lugar. Sin imagen: proporción 2.5/3.5.
   */
  const forma = proporcion && !formaFija ? Math.min(1.05, Math.max(0.62, proporcion * 0.82)) : 2.5 / 3.5;
  const estiloTarjeta = compacta
    ? { aspectRatio: forma, width: `min(100cqw, 100cqh * ${forma})` }
    : undefined;

  const moverBrillo = (e: MouseEvent<HTMLDivElement>) => {
    const caja = e.currentTarget.getBoundingClientRect();
    setBrillo({
      x: ((e.clientX - caja.left) / caja.width) * 100,
      y: ((e.clientY - caja.top) / caja.height) * 100,
      visible: true,
    });
  };

  return (
    <div
      className={`w-full ${compacta ? "flex h-full min-h-0 items-center justify-center" : ""}`}
      style={compacta ? { containerType: "size" } : undefined}
    >
      <div
        role="button"
        tabIndex={0}
        aria-pressed={girada}
        aria-label={`${titulo}: dar vuelta la figurita`}
        onClick={girar}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            girar();
          }
        }}
        onAnimationEnd={() => setGirando(false)}
        onMouseMove={moverBrillo}
        onMouseLeave={() => setBrillo({ ...brillo, visible: false })}
        style={estiloTarjeta}
        className={`figurita relative rounded-2xl transition-transform duration-200 ease-out active:scale-[0.97] ${
          compacta ? "" : "aspect-[2.5/3.5] w-full"
        } ${girando ? "figurita-girando" : "hover:-translate-y-1"}`}
      >
        {!girada ? (
          /* ---------------- FRENTE ---------------- */
          <div className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-[#1E2A44]/10 bg-white p-2 shadow-xl shadow-[#1E2A44]/15">
            <div className="flex shrink-0 items-center justify-between pb-1.5">
              <span className="rounded-full bg-[#1E2A44] px-2 py-0.5 font-mono text-[9px] font-bold leading-none text-[#F2EFE7]">
                #{numero}
              </span>
              <span aria-hidden="true" className="font-display text-sm font-light leading-none text-[#FF704A]">
                +
              </span>
            </div>

            {/* La imagen define su propio marco: se ve completa, sin recortes. */}
            <div className="relative min-h-0 flex-1 overflow-hidden rounded-xl bg-[#F2EFE7]">
              {tieneImagen ? (
                <div className={`absolute inset-0 flex items-center justify-center ${formaFija ? "" : "p-1.5"}`}>
                  <img
                    src={imagen}
                    alt={titulo}
                    loading="lazy"
                    onLoad={(e) => setProporcion(e.currentTarget.naturalWidth / e.currentTarget.naturalHeight)}
                    onError={() => setImagenRota(true)}
                    className={
                      formaFija
                        ? "h-full w-full object-cover"
                        : "block h-auto max-h-full w-auto max-w-full rounded-lg object-contain shadow-md shadow-[#1E2A44]/15"
                    }
                  />
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col justify-between bg-[#FF704A] p-3">
                  <span aria-hidden="true" className="font-display text-lg font-light leading-none text-[#1E2A44]">
                    ↗
                  </span>
                  <h3 className="line-clamp-3 break-words font-display text-[20px] font-black uppercase leading-[0.9] tracking-tight text-[#1E2A44]">
                    {titulo}
                  </h3>
                </div>
              )}
            </div>

            <div className="flex shrink-0 items-end justify-between gap-2 pt-1.5">
              <div className="min-w-0">
                <span className="block truncate font-display text-[12px] font-bold leading-tight text-[#1E2A44]">
                  {titulo}
                </span>
                <span className="block font-mono text-[7px] uppercase tracking-[0.24em] text-[#1E2A44]/50">
                  Cortese 2026
                </span>
              </div>
              <span className="shrink-0 font-mono text-[7px] uppercase tracking-[0.18em] text-[#1E2A44]/50">
                Girar
              </span>
            </div>

            {/* Brillo holográfico que sigue al mouse */}
            {esBrillante && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-2xl mix-blend-soft-light transition-opacity duration-300"
                style={{
                  opacity: brillo.visible ? 0.85 : 0,
                  background: `radial-gradient(circle at ${brillo.x}% ${brillo.y}%, rgba(255,255,255,0.95) 0%, rgba(255,112,74,0.55) 25%, transparent 60%)`,
                }}
              />
            )}
          </div>
        ) : (
          /* ---------------- DORSO (texto nítido y de alto contraste) ---------------- */
          <div
            className={`absolute inset-0 flex flex-col overflow-hidden rounded-2xl border-2 border-[#FF704A] bg-[#1E2A44] text-white shadow-xl shadow-[#1E2A44]/30 ${
              compacta ? "p-2.5" : "p-4"
            }`}
          >
            <div className="flex shrink-0 items-start justify-between gap-2">
              <h3
                className={`line-clamp-2 min-w-0 font-display font-bold uppercase leading-tight ${
                  compacta ? "text-[13px]" : "text-base"
                }`}
              >
                {titulo}
              </h3>
              <span className="shrink-0 rounded-full bg-[#FF704A] px-1.5 py-0.5 font-mono text-[8px] font-bold leading-none text-[#1E2A44]">
                #{numero}
              </span>
            </div>

            {/* min-h-0 + line-clamp: el texto se corta con "…" y nunca empuja el botón */}
            <p
              className={`mt-1.5 min-h-0 overflow-hidden font-normal leading-[1.35] text-[#F2EFE7] ${
                compacta ? "line-clamp-3 text-[10px]" : "line-clamp-5 text-xs"
              }`}
            >
              {descripcion}
            </p>

            <dl className="my-2 grid shrink-0 grid-cols-2 gap-1.5">
              {statsVisibles.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`min-w-0 rounded-lg bg-white/10 px-1.5 py-1 ${
                    statsVisibles.length % 2 === 1 && i === statsVisibles.length - 1 ? "col-span-2" : ""
                  }`}
                >
                  <dt className="truncate font-mono text-[7px] font-bold uppercase leading-none tracking-[0.14em] text-[#FF704A]">
                    {stat.label}
                  </dt>
                  <dd className="mt-1 truncate font-display text-[11px] font-bold leading-tight text-white">{stat.value}</dd>
                </div>
              ))}
            </dl>

            {puedeAbrir && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onVerProyecto?.(slug as string);
                }}
                className={`mt-auto flex w-full shrink-0 items-center justify-center gap-1.5 rounded-xl bg-[#FF704A] font-display font-bold uppercase tracking-[0.1em] text-[#1E2A44] transition-colors hover:bg-[#F2EFE7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2EFE7] ${
                  compacta ? "py-1.5 text-[9px]" : "py-2.5 text-[11px]"
                }`}
              >
                Ver proyecto
                <ArrowUpRight size={compacta ? 12 : 14} strokeWidth={2.5} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
