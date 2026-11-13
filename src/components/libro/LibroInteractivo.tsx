import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import HTMLFlipBook from "react-pageflip";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Cloud,
  CloudLightning,
  CloudRain,
  CloudSun,
  Moon,
  Snowflake,
  Sun,
  type LucideIcon,
} from "lucide-react";
import { Figurita } from "../Figurita";
import {
  ALBUM_UXUI,
  ALBUM_DISENO,
  ALBUM_VIDEO,
  ALBUM_REDES,
  type AlbumPageData,
} from "../../data/albumData";
import {
  EXPERIENCIAS_RECIENTES,
  EXPERIENCIAS_ANTERIORES,
  type ExperienciaItem,
} from "../../data/portfolioData";
import { PROJECTS_DETAILS } from "../../data/projectsData";
import ProyectoModal from "../ProyectoModal";
import * as detalleModulo from "../../data/proyectosDetalle";
import type { ProyectoDetalle } from "../../data/proyectosDetalle";

export interface ClimaData {
  temp: number;
  icono: string;
  condicion: string;
  cielo: string;
  estado: string;
  modo: string;
}

export interface RepoData {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
}

interface Props {
  clima: ClimaData;
  repos: RepoData[];
}

/* ------------------------------------------------------------------ */
/* CONSTANTES                                                         */
/* Cada página se diseña sobre un lienzo fijo de 500 x 700 y se       */
/* escala al tamaño real que tenga en pantalla: nada se desborda.     */
/* ------------------------------------------------------------------ */

const BASE_W = 500;
const BASE_H = 700;

/* Textos de las páginas de introducción: editalos a gusto. */
const INTROS = {
  uxui: {
    indice: "01",
    titulo: "UX / UI",
    bajada: "Interfaces pensadas desde la persona que las usa, del flujo al último detalle.",
    enfoques: ["Investigación y flujos", "Wireframes y prototipos", "Sistemas de diseño"],
  },
  diseno: {
    indice: "02",
    titulo: "Diseño gráfico",
    bajada: "Identidad, piezas y sistemas visuales con criterio y coherencia de marca.",
    enfoques: ["Identidad visual", "Piezas editoriales", "Sistemas de marca"],
  },
  video: {
    indice: "03",
    titulo: "Video",
    bajada: "Edición, ritmo y motion para contar historias en pantalla.",
    enfoques: ["Edición y montaje", "Motion graphics", "Piezas para redes"],
  },
  redes: {
    indice: "04",
    titulo: "Redes",
    bajada: "Contenido y comunidad: ideas que se ven bien y se entienden rápido.",
    enfoques: ["Estrategia de contenido", "Diseño de piezas", "Calendario y métricas"],
  },
} as const;

/* ------------------------------------------------------------------ */
/* ELEMENTOS GRÁFICOS DE IDENTIDAD                                    */
/* Solo cruces finas y flechas diagonales. Nunca asteriscos.          */
/* ------------------------------------------------------------------ */

function CruzFina({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      className={className}
    >
      <path d="M12 4v16M4 12h16" />
    </svg>
  );
}

function FlechaDiagonal({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
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

/* ------------------------------------------------------------------ */
/* LIENZO ESCALABLE                                                   */
/* ------------------------------------------------------------------ */

function Lienzo({ children }: { children: ReactNode }) {
  const contenedor = useRef<HTMLDivElement>(null);
  const [medida, setMedida] = useState({ escala: 0.8, dx: 0, dy: 0 });

  useEffect(() => {
    const el = contenedor.current;
    if (!el) return;

    const medir = () => {
      // clientWidth/clientHeight ignoran las transformaciones 3D del giro de página
      const ancho = el.clientWidth;
      const alto = el.clientHeight;
      if (ancho === 0 || alto === 0) return;
      const escala = Math.min(ancho / BASE_W, alto / BASE_H);
      setMedida({
        escala,
        dx: (ancho - BASE_W * escala) / 2,
        dy: (alto - BASE_H * escala) / 2,
      });
    };

    medir();
    const observador = new ResizeObserver(medir);
    observador.observe(el);
    return () => observador.disconnect();
  }, []);

  const estilo: CSSProperties = {
    width: BASE_W,
    height: BASE_H,
    transform: `translate(${medida.dx}px, ${medida.dy}px) scale(${medida.escala})`,
    transformOrigin: "top left",
  };

  return (
    <div ref={contenedor} className="absolute inset-0 overflow-hidden">
      <div className="relative" style={estilo}>
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* HOJA BASE                                                          */
/* ------------------------------------------------------------------ */

function Hoja({
  children,
  lado,
  oscura = false,
}: {
  children: ReactNode;
  lado: "izq" | "der";
  oscura?: boolean;
}) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden ${
        oscura ? "bg-[#1E2A44] text-[#F2EFE7]" : "bg-[#F2EFE7] text-[#1E2A44]"
      }`}
    >
      <Lienzo>
        <div className="relative flex h-full w-full flex-col overflow-hidden px-8 pb-14 pt-8">
          <CruzFina
            className={`pointer-events-none absolute top-4 h-3 w-3 ${
              lado === "izq" ? "left-4" : "right-4"
            } ${oscura ? "text-white/25" : "text-[#1E2A44]/25"}`}
          />
          {children}
        </div>
      </Lienzo>

      {/* luz del lomo */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 z-10 w-8 ${
          lado === "izq"
            ? "right-0 bg-gradient-to-l from-black/15 to-transparent"
            : "left-0 bg-gradient-to-r from-black/15 to-transparent"
        }`}
      />
    </div>
  );
}

function Folio({
  n,
  lado,
  oscura = false,
}: {
  n: string;
  lado: "izq" | "der";
  oscura?: boolean;
}) {
  return (
    <span
      className={`absolute bottom-5 font-mono text-[10px] font-medium uppercase tracking-[0.2em] ${
        oscura ? "text-white/45" : "text-[#1E2A44]/45"
      } ${lado === "izq" ? "left-8" : "right-8"}`}
    >
      {n} <span className="text-[#FF704A]">+</span>
    </span>
  );
}

function EncabezadoPagina({
  eyebrow,
  titulo,
  bajada,
  oscura = false,
}: {
  eyebrow: string;
  titulo: string;
  bajada?: string;
  oscura?: boolean;
}) {
  return (
    <header className="flex shrink-0 flex-col gap-2">
      <span
        className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 font-sans text-[10px] font-medium uppercase leading-none tracking-[0.18em] ${
          oscura
            ? "border-white/15 text-white/65"
            : "border-[#1E2A44]/15 text-[#1E2A44]/60"
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#FF704A]" />
        {eyebrow}
      </span>
      <h2
        className={`font-display text-[38px] font-black uppercase leading-[0.92] tracking-[-0.02em] ${
          oscura ? "text-[#F2EFE7]" : "text-[#1E2A44]"
        }`}
      >
        {titulo}
        <span className="text-[#FF704A]">.</span>
      </h2>
      {bajada && (
        <p
          className={`line-clamp-2 max-w-[40ch] font-sans text-[13px] font-light leading-snug ${
            oscura ? "text-[#F2EFE7]/65" : "text-[#1E2A44]/60"
          }`}
        >
          {bajada}
        </p>
      )}
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* CLIMA                                                              */
/* Evalúa icono, condicion, cielo, estado y modo sin romperse ante    */
/* valores vacíos, en inglés/español, con tildes o con emojis.        */
/* ------------------------------------------------------------------ */

const EMOJIS_CLIMA: [RegExp, string][] = [
  [/[⛈🌩]/u, " tormenta "],
  [/[❄🌨☃⛄]/u, " nieve "],
  [/[🌧🌦]/u, " lluvia "],
  [/[⛅🌤🌥]/u, " parcial "],
  [/[☁🌫]/u, " nublado "],
  [/[🌙🌛🌜🌑]/u, " noche "],
];

function normalizar(texto: unknown) {
  let valor = typeof texto === "string" ? texto : "";
  for (const [patron, palabra] of EMOJIS_CLIMA) {
    valor = valor.replace(patron, palabra);
  }
  return valor
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function elegirIconoClima(clima?: Partial<ClimaData> | null): LucideIcon {
  const texto = [clima?.icono, clima?.condicion, clima?.cielo, clima?.estado]
    .map(normalizar)
    .join(" ");
  const esNoche =
    /noche|night|nocturn/.test(normalizar(clima?.modo)) ||
    /noche|night|nocturn|moon|luna/.test(texto);

  if (/tormenta|thunder|storm|rayo|lightning|electric/.test(texto)) {
    return CloudLightning;
  }
  if (/nieve|snow|nevada|nevisca|granizo|hail|sleet|helada/.test(texto)) {
    return Snowflake;
  }
  if (/lluvi|rain|chubasco|llovizna|drizzle|shower|aguacero|precipit/.test(texto)) {
    return CloudRain;
  }
  if (
    /parcial|partly|algo nubl|poco nubl|pocas nubes|sol y nub|sol con nub|sun and cloud|intervalos|few clouds|scattered|mayormente (soleado|despejado)|mostly (sunny|clear)/.test(
      texto,
    )
  ) {
    return esNoche ? Moon : CloudSun;
  }
  if (
    /nubl|nube|cloud|cubierto|overcast|nuboso|niebla|fog|mist|bruma|neblina|viento|wind/.test(
      texto,
    )
  ) {
    return Cloud;
  }
  return esNoche ? Moon : Sun;
}

function WidgetClima({ clima }: { clima: ClimaData }) {
  const Icono = elegirIconoClima(clima);
  const esNoche = /noche|night|nocturn/.test(normalizar(clima?.modo));
  const grados = Number(clima?.temp);
  const temperatura = Number.isFinite(grados) ? Math.round(grados) : "--";

  const detalles = [clima?.cielo, clima?.estado]
    .filter((valor): valor is string => typeof valor === "string" && valor.trim() !== "")
    .filter((valor, indice, lista) => lista.indexOf(valor) === indice);

  return (
    <section
      aria-label="Clima en vivo"
      className="shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]"
    >
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#F2EFE7]/60">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF704A]" />
          Clima en vivo
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-[#F2EFE7]/45">
          {esNoche ? <Moon size={11} /> : <Sun size={11} />}
          {esNoche ? "Noche" : "Día"}
        </span>
      </div>

      <div className="flex items-center gap-4 px-4 py-4">
        <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-2xl border border-[#FF704A]/30 bg-[#FF704A]/10">
          <Icono size={38} strokeWidth={1.4} className="text-[#FF704A]" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="font-display text-[52px] font-black leading-none tracking-tight text-[#F2EFE7]">
            {temperatura}
            <span className="text-[#FF704A]">°C</span>
          </div>
          {clima?.condicion && (
            <p className="mt-1.5 line-clamp-1 font-sans text-[14px] font-light capitalize text-[#F2EFE7]/75">
              {clima.condicion}
            </p>
          )}
        </div>

        <FlechaDiagonal className="h-5 w-5 shrink-0 self-start text-[#FF704A]" />
      </div>

      {detalles.length > 0 && (
        <ul className="flex flex-wrap gap-1.5 px-4 pb-4">
          {detalles.slice(0, 3).map((detalle) => (
            <li
              key={detalle}
              className="line-clamp-1 rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-[#F2EFE7]/60"
            >
              {detalle}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FICHA TÉCNICA                                                      */
/* ------------------------------------------------------------------ */

const CORE_STACK = ["Astro", "React", "TypeScript", "Tailwind", "Git"];
const ADOBE_STACK = ["Ps", "Ai", "Pr", "Ae", "Fg"];

function FichaTecnica() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <span className="font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-[#1E2A44]/50">
          Frontend y maquetación
        </span>
        <ul className="flex flex-wrap gap-1.5">
          {CORE_STACK.map((item) => (
            <li
              key={item}
              className="rounded-full border border-[#1E2A44]/15 bg-white/80 px-2.5 py-1 font-sans text-[11px] font-medium text-[#1E2A44]/80"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-2">
        <span className="font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-[#1E2A44]/50">
          Ecosistema Adobe y diseño
        </span>
        <ul className="flex flex-wrap gap-1.5">
          {ADOBE_STACK.map((siglas) => (
            <li
              key={siglas}
              className="flex h-8 w-9 items-center justify-center rounded-lg border border-[#FF704A]/30 bg-[#FF704A]/10 font-display text-[12px] font-bold uppercase text-[#FF704A]"
            >
              {siglas}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* TARJETA DE EXPERIENCIA                                             */
/* ------------------------------------------------------------------ */

function StickerExperiencia({
  item,
  cantidad,
}: {
  item: ExperienciaItem;
  cantidad: number;
}) {
  // Con más tarjetas por página, cada una muestra menos texto para no recortar a mitad de frase
  const maxLogros = cantidad >= 4 ? 2 : 3;
  const clampLogro = cantidad <= 2 ? "line-clamp-2" : "line-clamp-1";
  const clampRol = cantidad <= 2 ? "line-clamp-2" : "line-clamp-1";

  return (
    <article className="relative flex min-h-0 flex-1 flex-col gap-1.5 overflow-hidden rounded-2xl border border-[#1E2A44]/10 bg-white/80 p-3.5 shadow-lg shadow-[#1E2A44]/5">
      <CruzFina className="pointer-events-none absolute right-3 top-3 h-3 w-3 text-[#1E2A44]/25" />

      <div className="flex flex-wrap items-baseline justify-between gap-x-2 pr-5">
        <h3 className="line-clamp-1 font-display text-[17px] font-black uppercase leading-tight tracking-tight text-[#1E2A44]">
          {item.company}
        </h3>
        {item.period && (
          <span className="rounded-full bg-[#FF704A]/10 px-2 py-0.5 font-sans text-[9px] font-medium uppercase tracking-[0.14em] text-[#FF704A]">
            {item.period}
          </span>
        )}
      </div>

      <p
        className={`${clampRol} font-sans text-[10px] font-medium uppercase leading-snug tracking-[0.08em] text-[#1E2A44]/55`}
      >
        {item.role}
        {item.location ? ` · ${item.location}` : ""}
      </p>

      <ul className="flex min-h-0 flex-col gap-1 overflow-hidden pt-0.5">
        {item.achievements.slice(0, maxLogros).map((logro) => (
          <li
            key={logro}
            className="flex items-start gap-2 font-sans text-[11px] font-light leading-[1.3] text-[#1E2A44]/75"
          >
            <span className="mt-[0.5em] h-1 w-1 shrink-0 rounded-full bg-[#FF704A]" />
            <span className={clampLogro}>{logro}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* SLOT VACÍO                                                         */
/* ------------------------------------------------------------------ */

function SlotVacio({ numero, oscura }: { numero: number; oscura: boolean }) {
  return (
    <div
      className={`relative flex h-full min-h-0 w-full items-center justify-center overflow-hidden rounded-2xl border border-dashed ${
        oscura
          ? "border-white/15 bg-white/[0.03]"
          : "border-[#1E2A44]/20 bg-white/40"
      }`}
    >
      <span
        className={`select-none font-display text-5xl font-black ${
          oscura ? "text-white/10" : "text-[#1E2A44]/10"
        }`}
      >
        {numero}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* TAPAS                                                              */
/* ------------------------------------------------------------------ */

function PaginaTapa() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#1E2A44] text-[#F2EFE7]">
      <Lienzo>
        <div className="relative flex h-full w-full flex-col justify-between p-12">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-[#F2EFE7]/45">
                Conceptos
              </span>
              <span className="font-sans text-[13px] font-light leading-relaxed text-[#F2EFE7]/75">
                Curiosidad
                <br />
                Creatividad
                <br />
                Diseño
              </span>
            </div>
            <div className="flex items-center gap-3">
              <GloboMarca className="h-6 w-6 text-[#F2EFE7]/40" />
              <FlechaDiagonal className="h-7 w-7 text-[#FF704A]" />
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="font-display text-[84px] font-black leading-[0.86] tracking-[-0.035em] text-[#F2EFE7]">
              Nicolás
              <br />
              Cortese
            </h1>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-1 w-20 rounded-full bg-[#FF704A]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#FF704A]">
              Portfolio Final
              </span>
            </div>
            <p className="mt-5 max-w-[24ch] font-sans text-[18px] font-light leading-snug text-[#F2EFE7]/85">
              Programación IV - 2026.
            </p>
          </div>

          <div className="flex items-end justify-between">
            <div className="flex items-center gap-2 rounded-full bg-[#F2EFE7] px-5 py-2.5 font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#1E2A44]">
              <span>Abrir álbum</span>
              <ArrowUpRight size={16} className="text-[#FF704A]" />
            </div>
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#F2EFE7]/40">
              Ed. 2026 <CruzFina className="h-3 w-3" />
            </span>
          </div>
        </div>
      </Lienzo>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-black/25 to-transparent" />
    </div>
  );
}

function PaginaContratapa() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#FF704A] text-[#1E2A44]">
      <Lienzo>
        <div className="relative flex h-full w-full flex-col justify-between p-12">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#1E2A44]/60">
              Gracias por pasar
            </span>
            <FlechaDiagonal className="h-7 w-7 text-[#1E2A44]/70" />
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="font-display text-[88px] font-black uppercase leading-[0.85] tracking-[-0.03em] text-[#1E2A44]">
              Fin<span className="text-[#F2EFE7]">.</span>
            </h2>
            <p className="max-w-[26ch] font-sans text-[16px] font-light leading-snug text-[#1E2A44]/75">
              ¿Trabajamos juntos? Escribime y lo vemos.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href="mailto:nicolascortese2004@gmail.com"
              className="flex items-center justify-between rounded-2xl border border-[#1E2A44]/15 bg-[#F2EFE7]/50 px-5 py-4 font-display text-[22px] font-bold text-[#1E2A44] transition-colors hover:bg-[#F2EFE7]"
            >
              <span>Email</span>
              <ArrowUpRight size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/nicolascortese/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-2xl border border-[#1E2A44]/15 bg-[#F2EFE7]/50 px-5 py-4 font-display text-[22px] font-bold text-[#1E2A44] transition-colors hover:bg-[#F2EFE7]"
            >
              <span>LinkedIn</span>
              <ArrowUpRight size={24} />
            </a>
          </div>
        </div>
      </Lienzo>
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-black/20 to-transparent" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* SPREAD 01 · 02 — PRESENTACIÓN                                      */
/* ------------------------------------------------------------------ */

function PaginaPerfilIzq() {
  return (
    <Hoja lado="izq">
      <EncabezadoPagina eyebrow="01 · Presentación" titulo="Quién soy" />

      <div className="flex min-h-0 flex-1 flex-col justify-center gap-3 py-4">
        <div className="rounded-2xl border border-[#1E2A44]/10 bg-white/75 p-4 shadow-lg shadow-[#1E2A44]/5">
          <div className="flex flex-col gap-2 font-sans text-[13px] font-light leading-snug text-[#1E2A44]/80">
            <p className="line-clamp-4">
              Trabajo en el puente entre la identidad visual y el código: pienso
              la pieza desde el concepto, la maqueto y la llevo al navegador con
              componentes reutilizables.
            </p>
            <p className="line-clamp-3">
              Maquetación con Astro, React y Tailwind, cuidando jerarquía, ritmo
              y accesibilidad. Del primer boceto al último commit.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-[#1E2A44]/10 bg-white/60 p-4 shadow-lg shadow-[#1E2A44]/5">
          <FichaTecnica />
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { valor: "4", label: "Disciplinas" },
            { valor: "15+", label: "Proyectos" },
            { valor: "2026", label: "Edición" },
          ].map((dato) => (
            <div
              key={dato.label}
              className="rounded-xl border border-[#1E2A44]/10 bg-white/70 px-2 py-2.5 text-center"
            >
              <span className="block font-display text-[22px] font-black leading-none tracking-tight text-[#1E2A44]">
                {dato.valor}
              </span>
              <span className="mt-1.5 block font-mono text-[8px] uppercase tracking-[0.16em] text-[#1E2A44]/50">
                {dato.label}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2">
          {["UX / UI", "Diseño gráfico", "Audiovisual", "Redes"].map(
            (disciplina) => (
              <div
                key={disciplina}
                className="flex items-center justify-between gap-1 rounded-lg border border-[#1E2A44]/10 bg-white/70 px-3 py-2"
              >
                <span className="truncate font-display text-[11px] font-bold uppercase tracking-tight text-[#1E2A44]/80">
                  {disciplina}
                </span>
                <FlechaDiagonal className="h-3.5 w-3.5 shrink-0 text-[#FF704A]" />
              </div>
            ),
          )}
        </div>
      </div>

      <Folio n="01" lado="izq" />
    </Hoja>
  );
}

function PaginaPerfilDer({ clima }: { clima: ClimaData }) {
  return (
    <Hoja lado="der" oscura>
      <EncabezadoPagina
        eyebrow="02 · Entorno"
        titulo="Inspiración"
        bajada="Diseño, deporte, música y todo lo que me inspira."
        oscura
      />

      <div className="mt-4 flex min-h-0 flex-1 flex-col gap-3">
        <WidgetClima clima={clima} />

        <div className="grid min-h-0 flex-1 grid-cols-2 gap-3">
          <Figurita
            compacta
            numero="10"
            titulo="Fútbol & Mate"
            descripcion="Jugar al fútbol para desconectar y tener siempre el mate al lado."
            esBrillante
            stats={[{ label: "Ritual", value: "Diario" }]}
          />
          <Figurita
            compacta
            numero="08"
            titulo="Música"
            descripcion="Me acompaña todo el día, tanto trabajando como viajando."
            esBrillante
            stats={[{ label: "Vibe", value: "95" }]}
          />
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-1.5">
          <CruzFina className="mr-1 h-3 w-3 text-white/30" />
          {["Fútbol", "Mate", "Música", "Diseño", "Viajes"].map((hobby) => (
            <span
              key={hobby}
              className="rounded-full border border-white/15 bg-white/[0.05] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-[#F2EFE7]/65"
            >
              {hobby}
            </span>
          ))}
        </div>
      </div>

      <Folio n="02" lado="der" oscura />
    </Hoja>
  );
}

/* ------------------------------------------------------------------ */
/* SPREAD 03 · 04 — EXPERIENCIA                                       */
/* ------------------------------------------------------------------ */

function PaginaExperiencia({
  eyebrow,
  titulo,
  bajada,
  items,
  folio,
  lado,
}: {
  eyebrow: string;
  titulo: string;
  bajada: string;
  items: ExperienciaItem[];
  folio: string;
  lado: "izq" | "der";
}) {
  return (
    <Hoja lado={lado}>
      <EncabezadoPagina eyebrow={eyebrow} titulo={titulo} bajada={bajada} />
      <div className="mt-4 flex min-h-0 flex-1 flex-col gap-2.5 overflow-hidden">
        {items.map((item) => (
          <StickerExperiencia
            key={item.company + item.role}
            item={item}
            cantidad={items.length}
          />
        ))}
      </div>
      <Folio n={folio} lado={lado} />
    </Hoja>
  );
}

function PaginaExperienciaIzq() {
  return (
    <PaginaExperiencia
      eyebrow="03 · Trayectoria"
      titulo="Experiencia"
      bajada="Trabajos recientes de diseño y contenido para marcas."
      items={EXPERIENCIAS_RECIENTES}
      folio="03"
      lado="izq"
    />
  );
}

function PaginaExperienciaDer() {
  return (
    <PaginaExperiencia
      eyebrow="04 · Archivo"
      titulo="Anteriores"
      bajada="Docencia y redacción."
      items={EXPERIENCIAS_ANTERIORES}
      folio="04"
      lado="der"
    />
  );
}

/* ------------------------------------------------------------------ */
/* SPREADS 05–12 — INTRO (izq) + FIGURITAS (der) POR SECCIÓN          */
/* ------------------------------------------------------------------ */

function PaginaIntroSeccion({
  indice,
  titulo,
  bajada,
  enfoques,
  cantidad,
  folio,
  oscura = false,
}: {
  indice: string;
  titulo: string;
  bajada: string;
  enfoques: readonly string[];
  cantidad: number;
  folio: string;
  oscura?: boolean;
}) {
  const tenue = oscura ? "text-[#F2EFE7]/60" : "text-[#1E2A44]/60";
  const linea = oscura ? "border-white/15" : "border-[#1E2A44]/15";

  return (
    <Hoja lado="izq" oscura={oscura}>
      <div className="flex shrink-0 items-start justify-between">
        <span
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-sans text-[10px] font-medium uppercase leading-none tracking-[0.18em] ${
            oscura
              ? "border-white/15 text-white/65"
              : "border-[#1E2A44]/15 text-[#1E2A44]/60"
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF704A]" />
          Sección
        </span>
        <FlechaDiagonal className="h-6 w-6 text-[#FF704A]" />
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-center gap-5">
        <div className="flex items-end gap-3">
          <span
            className={`font-display text-[150px] font-black leading-[0.8] tracking-[-0.05em] ${
              oscura ? "text-[#F2EFE7]" : "text-[#1E2A44]"
            }`}
          >
            {indice}
          </span>
          <CruzFina className="mb-3 h-6 w-6 text-[#FF704A]" />
        </div>

        <div className="flex flex-col gap-3">
          <h2
            className={`line-clamp-2 font-display text-[50px] font-black uppercase leading-[0.9] tracking-[-0.03em] ${
              oscura ? "text-[#F2EFE7]" : "text-[#1E2A44]"
            }`}
          >
            {titulo}
            <span className="text-[#FF704A]">.</span>
          </h2>
          <p
            className={`line-clamp-3 max-w-[34ch] font-sans text-[15px] font-light leading-snug ${tenue}`}
          >
            {bajada}
          </p>
        </div>

        <ul className={`flex flex-col border-t ${linea}`}>
          {enfoques.map((enfoque) => (
            <li
              key={enfoque}
              className={`flex items-center gap-3 border-b py-2.5 font-display text-[14px] font-bold uppercase tracking-tight ${linea} ${
                oscura ? "text-[#F2EFE7]/85" : "text-[#1E2A44]/85"
              }`}
            >
              <CruzFina className="h-3.5 w-3.5 shrink-0 text-[#FF704A]" />
              <span className="line-clamp-1">{enfoque}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex shrink-0 items-center justify-between">
        <span
          className={`font-mono text-[10px] uppercase tracking-[0.2em] ${tenue}`}
        >
          {cantidad} {cantidad === 1 ? "proyecto" : "proyectos"}
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#FF704A]">
          Pasá la página <ArrowUpRight size={13} />
        </span>
      </div>

      <Folio n={folio} lado="izq" oscura={oscura} />
    </Hoja>
  );
}

function PaginaFiguritas({
  album,
  eyebrow,
  titulo,
  bajada,
  folio,
  oscura = false,
  onVerMas,
}: {
  album: AlbumPageData;
  eyebrow: string;
  titulo: string;
  bajada: string;
  folio: string;
  oscura?: boolean;
  onVerMas: (slug: string) => void;
}) {
  const figuras = album.figures.slice(0, 6);
  const celdas = figuras.length > 4 ? 6 : 4;
  const filas = celdas / 2;

  const numeros = figuras
    .map((figura) => Number(figura.numero))
    .filter((numero) => !Number.isNaN(numero));
  const ultimo = numeros.length > 0 ? Math.max(...numeros) : 0;
  const vacios = Array.from(
    { length: Math.max(0, celdas - figuras.length) },
    (_, indice) => ultimo + 1 + indice,
  );

  return (
    <Hoja lado="der" oscura={oscura}>
      <EncabezadoPagina
        eyebrow={eyebrow}
        titulo={titulo}
        bajada={bajada}
        oscura={oscura}
      />

      <div
        className="mt-4 grid min-h-0 flex-1 grid-cols-2 gap-3"
        style={{ gridTemplateRows: `repeat(${filas}, minmax(0, 1fr))` }}
      >
        {figuras.map((figura) => {
          const slug = (figura as { slug?: string }).slug;
          return (
            <Figurita
              key={figura.numero}
              compacta
              {...figura}
              onVerMas={slug ? () => onVerMas(slug) : undefined}
            />
          );
        })}
        {vacios.map((numero) => (
          <SlotVacio key={numero} numero={numero} oscura={oscura} />
        ))}
      </div>

      <Folio n={folio} lado="der" oscura={oscura} />
    </Hoja>
  );
}

/* ------------------------------------------------------------------ */
/* SPREAD 13 · 14 — FRONTEND Y GITHUB                                 */
/* ------------------------------------------------------------------ */

const PRINCIPIOS_CODIGO = [
  "Componentes reutilizables",
  "Performance y carga liviana",
  "Accesibilidad desde el boceto",
];

function PaginaFrontend() {
  const fixea = PROJECTS_DETAILS["fixea-web"];

  return (
    <Hoja lado="izq" oscura>
      <EncabezadoPagina
        eyebrow="13 · Desarrollo web"
        titulo="Frontend"
        bajada="Interfaces reales, componentes reutilizables y foco en performance."
        oscura
      />

      <div className="mt-5 flex min-h-0 flex-1 flex-col gap-4 overflow-hidden">
        {fixea && (
          <article className="relative flex shrink-0 flex-col gap-2 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="line-clamp-1 font-display text-[22px] font-black uppercase leading-tight tracking-tight text-[#F2EFE7]">
                {fixea.title}
              </h3>
              <FlechaDiagonal className="h-5 w-5 shrink-0 text-[#FF704A]" />
            </div>

            <p className="line-clamp-4 font-sans text-[12px] font-light leading-relaxed text-[#F2EFE7]/70">
              {fixea.summary}
            </p>

            <ul className="mt-1 flex flex-wrap gap-1.5">
              {fixea.technologies.slice(0, 5).map((tecnologia: string) => (
                <li
                  key={tecnologia}
                  className="rounded-full border border-white/15 bg-white/[0.05] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-[#F2EFE7]/65"
                >
                  {tecnologia}
                </li>
              ))}
            </ul>

            <div className="mt-2 flex flex-wrap gap-4 font-sans text-[10px] font-medium uppercase tracking-[0.18em]">
              {fixea.liveUrl && (
                <a
                  href={fixea.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#FF704A] transition-colors hover:text-white"
                >
                  En vivo <ArrowUpRight size={13} />
                </a>
              )}
              {fixea.githubUrl && (
                <a
                  href={fixea.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#F2EFE7]/60 transition-colors hover:text-white"
                >
                  Repo <ArrowUpRight size={13} />
                </a>
              )}
            </div>
          </article>
        )}

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#FF704A]">
            Cómo construyo
          </span>
          <ul className="mt-3 flex flex-col gap-2.5">
            {PRINCIPIOS_CODIGO.map((principio) => (
              <li
                key={principio}
                className="flex items-center gap-3 border-b border-white/10 pb-2.5 font-display text-[14px] font-bold uppercase tracking-tight text-[#F2EFE7]/85 last:border-b-0 last:pb-0"
              >
                <CruzFina className="h-3.5 w-3.5 shrink-0 text-[#FF704A]" />
                <span className="line-clamp-1">{principio}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Folio n="13" lado="izq" oscura />
    </Hoja>
  );
}

function PaginaRepositorio({ repos }: { repos: RepoData[] }) {
  const fecha = (valor: string) => {
    const date = new Date(valor);
    if (Number.isNaN(date.getTime())) return "—";
    return new Intl.DateTimeFormat("es-AR", { month: "short", year: "numeric" })
      .format(date)
      .replace(".", "");
  };

  return (
    <Hoja lado="der">
      <EncabezadoPagina
        eyebrow="14 · GitHub"
        titulo="Repositorios"
        bajada="Lo último que subí a GitHub, en vivo desde la API."
      />

      {repos.length === 0 ? (
        <div className="mt-4 flex flex-1 items-center justify-center rounded-2xl border border-dashed border-[#1E2A44]/20 bg-white/40 p-6 text-center font-sans text-[13px] font-light text-[#1E2A44]/60">
          No se pudieron cargar los repositorios ahora mismo.
        </div>
      ) : (
        <div className="mt-4 grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-3">
          {repos.slice(0, 4).map((repo, index) => (
            <Figurita
              key={repo.name}
              compacta
              numero={(index + 1).toString().padStart(2, "0")}
              titulo={repo.name.replace(/-/g, " ")}
              descripcion={repo.description || "Proyecto sin descripción."}
              esBrillante={repo.name === "fixea-web"}
              link={repo.html_url}
              linkTexto="VER CÓDIGO"
              stats={[
                { label: "Stars", value: repo.stargazers_count.toString() },
                { label: "Upd.", value: fecha(repo.pushed_at) },
              ]}
            />
          ))}
        </div>
      )}

      <Folio n="14" lado="der" />
    </Hoja>
  );
}

/* ------------------------------------------------------------------ */
/* RESOLUCIÓN slug → ProyectoDetalle                                  */
/* Busca en lo que exporte data/proyectosDetalle (objeto o array).    */
/* ------------------------------------------------------------------ */

function buscarProyecto(slug: string): ProyectoDetalle | null {
  const coincide = (valor: unknown): valor is ProyectoDetalle =>
    typeof valor === "object" &&
    valor !== null &&
    (valor as { slug?: unknown }).slug === slug;

  for (const exportado of Object.values(
    detalleModulo as Record<string, unknown>,
  )) {
    if (coincide(exportado)) return exportado;

    if (Array.isArray(exportado)) {
      const hallado = exportado.find(coincide);
      if (hallado) return hallado;
    } else if (exportado && typeof exportado === "object") {
      const hallado = Object.values(
        exportado as Record<string, unknown>,
      ).find(coincide);
      if (hallado) return hallado as ProyectoDetalle;
    }
  }
  return null;
}

/* ------------------------------------------------------------------ */
/* LIBRO                                                              */
/* ------------------------------------------------------------------ */

interface FlipBookRef {
  pageFlip: () => {
    flipNext: () => void;
    flipPrev: () => void;
    flip: (pagina: number) => void;
    getPageCount: () => number;
    turnToPage: (pagina: number) => void;
  } | null;
}

export default function LibroInteractivo({ clima, repos }: Props) {
  const libro = useRef<FlipBookRef | null>(null);
  const [pagina, setPagina] = useState(0);
  const [total, setTotal] = useState(16);
  const [proyectoAbierto, setProyectoAbierto] =
    useState<ProyectoDetalle | null>(null);
  const modalAbierto = useRef(false);

  const anterior = () => libro.current?.pageFlip()?.flipPrev();
  const siguiente = () => libro.current?.pageFlip()?.flipNext();

  useEffect(() => {
    modalAbierto.current = proyectoAbierto !== null;
  }, [proyectoAbierto]);

  useEffect(() => {
    const alPresionar = (evento: KeyboardEvent) => {
      // Con el modal abierto, las flechas pertenecen a la galería, no al libro
      if (modalAbierto.current) return;
      if (evento.key === "ArrowRight") siguiente();
      if (evento.key === "ArrowLeft") anterior();
    };
    window.addEventListener("keydown", alPresionar);
    return () => window.removeEventListener("keydown", alPresionar);
  }, []);

  const abrirProyecto = (slug: string) => {
    const proyecto = buscarProyecto(slug);
    if (proyecto) {
      modalAbierto.current = true;
      setProyectoAbierto(proyecto);
    } else {
      console.warn(`[Libro] No se encontró el proyecto con slug "${slug}".`);
    }
  };

  const cerrarProyecto = () => {
    modalAbierto.current = false;
    setProyectoAbierto(null);
  };

  const enSpread = pagina > 0 && pagina < total - 1;

  const bookTransform =
    pagina === 0
      ? "-translate-x-1/4"
      : pagina >= total - 1
        ? "translate-x-1/4"
        : "translate-x-0";

  return (
    <div className="relative flex min-h-screen w-screen flex-col items-center justify-center overflow-hidden bg-[#1E2A44]">
      {/* Fondo liso: solo una cruz de registro en dos esquinas */}
      <CruzFina className="pointer-events-none absolute left-6 top-6 h-5 w-5 text-white/20" />
      <CruzFina className="pointer-events-none absolute bottom-6 right-6 h-5 w-5 text-white/20" />

      {/*
        CAJA SEGURA DEL LIBRO
        Alto máximo 80vh, ancho máximo 90vw y 1000px de tope.
        El aspect ratio 1000 / 700 coincide con el spread (2 páginas de 500 x 700).
      */}
      <div className="relative z-10 flex h-[80vh] w-[90vw] items-center justify-center">
        <div
          className="relative w-full"
          style={{
            maxWidth: "min(1000px, calc(80vh * (1000 / 700)))",
            aspectRatio: "1000 / 700",
          }}
        >
          <div
            className={`relative flex h-full w-full items-center justify-center transition-transform duration-700 ease-in-out ${bookTransform}`}
          >
            {/* @ts-ignore: los tipos de react-pageflip no declaran children */}
            <HTMLFlipBook
              ref={libro as never}
              className="libro"
              width={500}
              height={700}
              size="stretch"
              minWidth={240}
              maxWidth={700}
              minHeight={320}
              maxHeight={1000}
              showCover={true}
              startPage={0}
              usePortrait={false}
              mobileScrollSupport={false}
              drawShadow={true}
              maxShadowOpacity={0.35}
              flippingTime={800}
              showPageCorners
              useMouseEvents
              startZIndex={0}
              autoSize={true}
              disableFlipByClick
              onFlip={(evento: { data: number }) => setPagina(evento.data)}
              onInit={(evento: { object: { getPageCount: () => number } }) =>
                setTotal(evento.object.getPageCount())
              }
            >
              {/* 00 · TAPA */}
              <div className="pagina" data-density="hard">
                <PaginaTapa />
              </div>

              {/* 01 · 02 · PRESENTACIÓN */}
              <div className="pagina">
                <PaginaPerfilIzq />
              </div>
              <div className="pagina">
                <PaginaPerfilDer clima={clima} />
              </div>

              {/* 03 · 04 · EXPERIENCIA */}
              <div className="pagina">
                <PaginaExperienciaIzq />
              </div>
              <div className="pagina">
                <PaginaExperienciaDer />
              </div>

              {/* 05 · 06 · UX / UI */}
              <div className="pagina">
                <PaginaIntroSeccion
                  {...INTROS.uxui}
                  cantidad={ALBUM_UXUI.figures.length}
                  folio="05"
                  oscura
                />
              </div>
              <div className="pagina">
                <PaginaFiguritas
                  album={ALBUM_UXUI}
                  eyebrow="06 · UX / UI"
                  titulo="Proyectos"
                  bajada="Girá la figurita y tocá «Ver más» para abrir el caso."
                  folio="06"
                  onVerMas={abrirProyecto}
                />
              </div>

              {/* 07 · 08 · DISEÑO GRÁFICO */}
              <div className="pagina">
                <PaginaIntroSeccion
                  {...INTROS.diseno}
                  cantidad={ALBUM_DISENO.figures.length}
                  folio="07"
                />
              </div>
              <div className="pagina">
                <PaginaFiguritas
                  album={ALBUM_DISENO}
                  eyebrow="08 · Diseño gráfico"
                  titulo="Proyectos"
                  bajada="Identidad y piezas para marcas. Tocá «Ver más» para el detalle."
                  folio="08"
                  oscura
                  onVerMas={abrirProyecto}
                />
              </div>

              {/* 09 · 10 · VIDEO */}
              <div className="pagina">
                <PaginaIntroSeccion
                  {...INTROS.video}
                  cantidad={ALBUM_VIDEO.figures.length}
                  folio="09"
                  oscura
                />
              </div>
              <div className="pagina">
                <PaginaFiguritas
                  album={ALBUM_VIDEO}
                  eyebrow="10 · Video"
                  titulo="Proyectos"
                  bajada="Edición, motion y piezas audiovisuales."
                  folio="10"
                  onVerMas={abrirProyecto}
                />
              </div>

              {/* 11 · 12 · REDES */}
              <div className="pagina">
                <PaginaIntroSeccion
                  {...INTROS.redes}
                  cantidad={ALBUM_REDES.figures.length}
                  folio="11"
                />
              </div>
              <div className="pagina">
                <PaginaFiguritas
                  album={ALBUM_REDES}
                  eyebrow="12 · Redes"
                  titulo="Proyectos"
                  bajada="Contenido y estrategia para redes sociales."
                  folio="12"
                  oscura
                  onVerMas={abrirProyecto}
                />
              </div>

              {/* 13 · 14 · FRONTEND Y GITHUB */}
              <div className="pagina">
                <PaginaFrontend />
              </div>
              <div className="pagina">
                <PaginaRepositorio repos={repos} />
              </div>

              {/* CONTRATAPA */}
              <div className="pagina" data-density="hard">
                <PaginaContratapa />
              </div>
            </HTMLFlipBook>

            {/* LOMO CENTRAL */}
            {enSpread && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-[2%] left-1/2 z-40 hidden w-10 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/20 to-transparent md:block"
              />
            )}
          </div>

          {/* CONTROLES */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              anterior();
            }}
            disabled={pagina === 0}
            aria-label="Página anterior"
            className="pointer-events-auto absolute left-1 top-1/2 z-[9999] -translate-y-1/2 cursor-pointer rounded-full border border-white/15 bg-[#F2EFE7]/95 p-2.5 text-[#1E2A44] shadow-2xl shadow-black/30 backdrop-blur transition-all hover:scale-110 hover:bg-[#FF704A] disabled:pointer-events-none disabled:opacity-0 md:-left-8 md:p-3 lg:-left-10"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              siguiente();
            }}
            disabled={pagina >= total - 1}
            aria-label="Página siguiente"
            className="pointer-events-auto absolute right-1 top-1/2 z-[9999] -translate-y-1/2 cursor-pointer rounded-full border border-white/15 bg-[#F2EFE7]/95 p-2.5 text-[#1E2A44] shadow-2xl shadow-black/30 backdrop-blur transition-all hover:scale-110 hover:bg-[#FF704A] disabled:pointer-events-none disabled:opacity-0 md:-right-8 md:p-3 lg:-right-10"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>

      {/* PISTA DE NAVEGACIÓN */}
      <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-white/40 sm:flex">
        <span>←</span>
        <span>Navegá con las flechas</span>
        <span>→</span>
      </div>

      {proyectoAbierto && (
        <ProyectoModal proyecto={proyectoAbierto} onClose={cerrarProyecto} />
      )}
    </div>
  );
}