import { useState, type MouseEvent } from "react";
import { ArrowUpRight, Disc3, Mountain } from "lucide-react";

/* Íconos de hobby dibujados a mano: solo contorno, sin relleno. */
export type IconoHobby = "futbol" | "mate" | "musica" | "viajes";

interface FiguritaProps {
  numero: string;
  titulo: string;
  descripcion: string;
  stats: { label: string; value: string }[];
  imagen?: string;
  esBrillante?: boolean;
  compacta?: boolean;
  destacada?: boolean;
  soloFicha?: boolean;
  tags?: string[];
  fondoOscuro?: boolean;
  imagenLlena?: boolean;
  ajustePortada?: "cover" | "contain";
  posicionPortada?: string;
  icono?: IconoHobby;
  portadaCompleta?: boolean;
  slug?: string;
  onVerProyecto?: (slug: string) => void;
}

const DURACION_GIRO = 420;

export function Figurita({
  numero,
  titulo,
  descripcion,
  stats,
  imagen,
  esBrillante = false,
  compacta = false,
  destacada = false,
  soloFicha = false,
  tags = [],
  fondoOscuro = false,
  imagenLlena = false,
  ajustePortada = "cover",
  posicionPortada,
  icono,
  portadaCompleta = false,
  slug,
  onVerProyecto,
}: FiguritaProps) {
  const [girada, setGirada] = useState(false);
  const [girando, setGirando] = useState(false);
  const [imagenRota, setImagenRota] = useState(false);
  const [brillo, setBrillo] = useState({ x: 50, y: 50, visible: false });
  const [proporcion, setProporcion] = useState(0);

  const tieneImagen = Boolean(imagen) && !imagenRota;
  const puedeAbrir = Boolean(slug && onVerProyecto);
  const portadaCubierta = ajustePortada !== "contain" || imagenLlena || portadaCompleta;
  const denso = compacta && !destacada;
  const statsVisibles = (soloFicha || destacada ? stats : stats.slice(0, compacta ? 2 : 4)).slice(0, 4);
  
  const statsAnchos = statsVisibles.some((stat) => stat.value.length > 14);

  const girar = () => {
    if (girando) return;
    setGirando(true);
    setTimeout(() => setGirada(!girada), DURACION_GIRO / 2);
  };


  const forma = proporcion ? Math.min(1.05, Math.max(0.6, proporcion * 0.82)) : 2.5 / 3.5;
  const estiloTarjeta = compacta
    ? destacada
      ? { width: "100%", height: "100%" }
      : { aspectRatio: forma, width: `min(100cqw, 100cqh * ${forma})` }
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
          destacada ? (
            <div className="absolute inset-0 overflow-hidden rounded-2xl border border-[#1E2A44]/10 bg-[#1E2A44] shadow-xl shadow-[#1E2A44]/15">
              {tieneImagen ? (
                <img
                  src={imagen}
                  alt={titulo}
                  loading="lazy"
                  onLoad={(e) => setProporcion(e.currentTarget.naturalWidth / e.currentTarget.naturalHeight)}
                  onError={() => setImagenRota(true)}
                  style={posicionPortada ? { objectPosition: posicionPortada } : undefined}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-[#FF704A] p-3">
                  <span className="font-display text-[15px] font-black uppercase leading-[0.9] tracking-tight text-[#1E2A44]">
                    {titulo}
                  </span>
                </div>
              )}

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A1128]/90 via-[#0A1128]/10 to-[#0A1128]/30"
              />

              <div className="absolute inset-x-2.5 top-2.5 flex items-start justify-between">
                <span className="rounded-full bg-[#1E2A44] px-2 py-0.5 font-mono text-[10px] font-bold leading-none text-[#F2EFE7]">
                  #{numero}
                </span>
                <span aria-hidden="true" className="font-display text-lg font-light leading-none text-[#F2EFE7] drop-shadow">
                  +
                </span>
              </div>

              <div className="absolute inset-x-2.5 bottom-2.5">
                <h3 className="line-clamp-2 font-display text-[16px] font-black uppercase leading-[0.92] tracking-tight text-[#F2EFE7] drop-shadow-md">
                  {titulo}
                </h3>
                <div className="mt-1 flex items-end justify-between gap-2">
                  <span className="font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-[#F2EFE7]/85">
                    Cortese 2026
                  </span>
                  <span className="font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-[#F2EFE7]/75">
                    Girar
                  </span>
                </div>
              </div>

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
            <div
              className={`absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-[#1E2A44]/10 bg-white shadow-xl shadow-[#1E2A44]/15 ${
                destacada ? "p-2.5" : "p-2"
              }`}
            >
              <div className="flex shrink-0 items-center justify-between pb-1.5">
                <span
                  className={`rounded-full bg-[#1E2A44] px-2 py-0.5 font-mono font-bold leading-none text-[#F2EFE7] ${
                    destacada ? "text-[10px]" : "text-[9px]"
                  }`}
                >
                  #{numero}
                </span>
                <span aria-hidden="true" className="font-display text-sm font-light leading-none text-[#FF704A]">
                  +
                </span>
              </div>

              <div
                className={`relative min-h-0 flex-1 overflow-hidden rounded-xl ${
                  fondoOscuro ? "bg-[#1E2A44]" : "bg-[#F2EFE7]"
                }`}
              >
                {tieneImagen ? (
                  <div className={portadaCubierta ? "absolute inset-0" : "absolute inset-0 flex items-center justify-center p-1"}>
                    <img
                      src={imagen}
                      alt={titulo}
                      loading="lazy"
                      onLoad={(e) => setProporcion(e.currentTarget.naturalWidth / e.currentTarget.naturalHeight)}
                      onError={() => setImagenRota(true)}
                      style={portadaCubierta && posicionPortada ? { objectPosition: posicionPortada } : undefined}
                      className={`block shadow-md shadow-[#1E2A44]/15 ${
                        portadaCubierta
                          ? "h-full w-full object-cover"
                          : "h-auto max-h-full w-auto max-w-full object-contain"
                      } ${portadaCubierta ? "rounded-none" : "rounded-lg"}`}
                    />
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col justify-between bg-[#FF704A] p-3">
                    <span aria-hidden="true" className="font-display text-lg font-light leading-none text-[#1E2A44]">
                      ↗
                    </span>
                    <div>
                      <h3
                        className={`break-words font-display font-black uppercase leading-[0.9] tracking-tight text-[#1E2A44] ${
                          destacada ? "text-[22px]" : "text-[20px]"
                        }`}
                      >
                        {titulo}
                      </h3>
                      <span className="mt-1 block font-mono text-[7px] font-bold uppercase tracking-[0.18em] text-[#1E2A44]/60">
                        Foto pendiente
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex shrink-0 items-end justify-between gap-2 pt-1.5">
                <div className="min-w-0">
                  <span
                    className={`block truncate font-display font-bold leading-tight text-[#1E2A44] ${
                      destacada ? "text-[13.5px]" : "text-[12px]"
                    }`}
                  >
                    {titulo}
                  </span>
                  <span className="block font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-[#1E2A44]/75">
                    Cortese 2026
                  </span>
                </div>
                <span className="shrink-0 font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-[#1E2A44]/60">
                  Girar
                </span>
              </div>

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
          )
        ) : (
          /* ---------------- DORSO ---------------- */
          <div
            className={`absolute inset-0 flex flex-col overflow-hidden rounded-2xl border-2 border-[#FF704A] bg-[#1E2A44] text-white shadow-xl shadow-[#1E2A44]/30 ${
              denso ? "p-2.5" : "p-4"
            }`}
          >
            {destacada && icono && (
              <IconoDorso
                tipo={icono}
                className="pointer-events-none absolute -bottom-3 -right-3 h-24 w-24 text-white/[0.12]"
              />
            )}

            <div className="relative flex shrink-0 items-start justify-between gap-2">
              <h3
                className={`line-clamp-2 min-w-0 font-display font-bold uppercase leading-tight ${
                  denso ? "text-[13px]" : "text-[17px]"
                }`}
              >
                {titulo}
              </h3>
              <span
                className={`shrink-0 rounded-full bg-[#FF704A] px-1.5 py-0.5 font-mono font-bold leading-none text-[#1E2A44] ${
                  denso ? "text-[8px]" : "text-[9px]"
                }`}
              >
                #{numero}
              </span>
            </div>

            {!soloFicha && (
              <p
                className={`relative mt-1.5 font-normal leading-[1.4] text-[#F2EFE7] ${
                  denso ? "line-clamp-3 text-[10.5px]" : "line-clamp-6 text-[11.5px]"
                }`}
              >
                {descripcion}
              </p>
            )}

          
            {destacada ? (
              statsVisibles.length > 0 && (
                <dl className="relative mt-2 mb-1 flex flex-col gap-1">
                  {statsVisibles.slice(0, 1).map((stat) => (
                    <div
                      key={stat.label}
                      className="flex items-baseline justify-between gap-2 border-t border-white/25 pt-1.5"
                    >
                      <dt className="font-mono text-[8px] font-bold uppercase tracking-[0.22em] text-[#FF704A]">
                        {stat.label}
                      </dt>
                      <dd className="font-display text-[13px] font-black leading-none text-white">{stat.value}</dd>
                    </div>
                  ))}
                </dl>
              )
            ) : (
              <dl className={`relative grid shrink-0 grid-cols-2 gap-1.5 ${soloFicha ? "mt-2" : "mt-auto mb-1"}`}>
                {statsVisibles.map((stat, i) => {
                  const ultimoImpar = statsVisibles.length % 2 === 1 && i === statsVisibles.length - 1;
                  const anchoCompleto =
                    ultimoImpar || (statsAnchos && (i >= 2 || i === statsVisibles.length - 1));
                  return (
                    <div
                      key={stat.label}
                      className={`min-w-0 rounded-lg border border-white/15 bg-white/10 px-1.5 py-1 ${anchoCompleto ? "col-span-2" : ""}`}
                    >
                      <dt className="truncate font-mono text-[7px] font-bold uppercase leading-none tracking-[0.14em] text-[#FF704A]">
                        {stat.label}
                      </dt>
                      <dd className="mt-1 line-clamp-2 font-display text-[10.5px] font-bold leading-[1.15] text-white">
                        {stat.value}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            )}

            {soloFicha && tags.length > 0 && (
              <ul className="relative mt-1 flex min-h-0 flex-wrap gap-1 overflow-hidden">
                {tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-white/20 px-2 py-0.5 font-mono text-[7px] font-bold uppercase tracking-[0.1em] text-[#F2EFE7]/85"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}

            {puedeAbrir ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onVerProyecto?.(slug as string);
                }}
                className={`relative mt-auto flex w-full shrink-0 items-center justify-center gap-1.5 rounded-xl bg-[#FF704A] font-display font-bold uppercase tracking-[0.1em] text-[#1E2A44] transition-colors hover:bg-[#F2EFE7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2EFE7] ${
                  denso ? "py-1.5 text-[9px]" : "py-2.5 text-[11px]"
                }`}
              >
                Ver proyecto
                <ArrowUpRight size={denso ? 12 : 14} strokeWidth={2.5} />
              </button>
            ) : (
              <span className="relative mt-auto block pt-2 font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-[#F2EFE7]/75">
                Cortese 2026
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ÍCONOS DE HOBBY:          */
/* ------------------------------------------------------------------ */
function IconoDorso({ tipo, className = "" }: { tipo: IconoHobby; className?: string }) {
  if (tipo === "musica") return <Disc3 aria-hidden="true" className={className} strokeWidth={1} />;
  if (tipo === "viajes") return <Mountain aria-hidden="true" className={className} strokeWidth={1} />;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {tipo === "futbol" && (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="m12 7.1 3.4 2.5-1.3 4h-4.2l-1.3-4L12 7.1Z" />
          <path d="M12 7.1V3.3M15.4 9.6l3.7-1.2M14.1 13.6l2.3 3.1M9.9 13.6l-2.3 3.1M8.6 9.6 4.9 8.4" />
        </>
      )}
      {tipo === "mate" && (
        <>
          <path d="M7.6 9.4h8.8c.6 3.9-1.4 11.1-4.4 11.1S7 13.3 7.6 9.4Z" />
          <path d="M7.8 9.4c1.3.7 7.1.7 8.4 0" />
          <path d="M13.5 8.6 16.8 2.4" />
          <path d="M7.9 12.6c1.4.7 3.4.9 5.2.5" />
        </>
      )}
    </svg>
  );
}
