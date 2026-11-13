import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import HTMLFlipBook from "react-pageflip";
import { ArrowUpRight, ChevronLeft, ChevronRight, Code2, Download, GraduationCap } from "lucide-react";
import { Figurita } from "../Figurita";
import ClimaWidget from "../ClimaWidget";
import ProyectoModal from "../ProyectoModal";
import { ALBUM_DISENO, ALBUM_REDES, ALBUM_UXUI, ALBUM_VIDEO, type AlbumSection } from "../../data/albumData";
import {
  CONTACTO,
  CV_URL,
  EDUCACION,
  EXPERIENCIAS,
  HOBBIES,
  PERFIL,
  SKILLS,
  type Skill,
} from "../../data/portfolioData";
import { FRONTEND_PROJECTS, GITHUB_USER } from "../../data/projectsData";
import { obtenerProyecto } from "../../data/proyectosDetalle";

/* Datos que llegan desde la API de GitHub (los pide index.astro). */
export interface RepoData {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
}

interface Props {
  repos: RepoData[];
}

type IrA = (pagina: number) => void;
type AbrirProyecto = (slug: string) => void;

/* Cada página se diseña sobre un lienzo fijo de 500 x 700 y se escala. */
const BASE_W = 500;
const BASE_H = 700;

const NAVY = "#1E2A44";

/* ------------------------------------------------------------------ */
/* PIEZAS DE IDENTIDAD: solo cruces finas (+) y flechas (↗)            */
/* ------------------------------------------------------------------ */

function Cruz({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className={className}>
      <path d="M12 3v18M3 12h18" />
    </svg>
  );
}

function formatearFecha(valor: string) {
  const fecha = new Date(valor);
  if (Number.isNaN(fecha.getTime())) return "";
  return new Intl.DateTimeFormat("es-AR", { month: "short", year: "numeric" }).format(fecha).replace(".", "");
}

/* ------------------------------------------------------------------ */
/* LIENZO ESCALABLE: el contenido nunca se recorta                     */
/* ------------------------------------------------------------------ */

function Lienzo({ children }: { children: ReactNode }) {
  const contenedor = useRef<HTMLDivElement>(null);
  const [medida, setMedida] = useState({ escala: 0.8, dx: 0, dy: 0 });

  useEffect(() => {
    const el = contenedor.current;
    if (!el) return;

    const medir = () => {
      const ancho = el.clientWidth;
      const alto = el.clientHeight;
      if (ancho === 0 || alto === 0) return;
      const escala = Math.min(ancho / BASE_W, alto / BASE_H);
      setMedida({ escala, dx: (ancho - BASE_W * escala) / 2, dy: (alto - BASE_H * escala) / 2 });
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
/* HOJA BASE (#F2EFE7) + FOLIO + ENCABEZADO                            */
/* ------------------------------------------------------------------ */

function Hoja({ children, lado, folio }: { children: ReactNode; lado: "izq" | "der"; folio: string }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#F2EFE7] text-[#1E2A44]">
      <Lienzo>
        <div className="relative flex h-full w-full flex-col px-9 pb-14 pt-9">
          {children}
          <span
            className={`absolute bottom-5 flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[#1E2A44]/45 ${
              lado === "izq" ? "left-9" : "right-9 flex-row-reverse"
            }`}
          >
            {folio}
            <Cruz className="h-2.5 w-2.5 text-[#FF704A]" />
            <span>Álbum 2026</span>
          </span>
        </div>
      </Lienzo>
      {/* sombra suave del lomo */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 w-10 ${
          lado === "izq" ? "right-0 bg-gradient-to-l" : "left-0 bg-gradient-to-r"
        } from-black/12 to-transparent`}
      />
    </div>
  );
}

function Encabezado({ eyebrow, titulo, bajada }: { eyebrow: string; titulo: string; bajada?: string }) {
  return (
    <header className="flex shrink-0 flex-col gap-2">
      <span className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#FF704A]">
        <Cruz className="h-2.5 w-2.5" />
        {eyebrow}
      </span>
      <h2 className="font-display text-[40px] font-black uppercase leading-[0.9] tracking-[-0.02em]">{titulo}</h2>
      {bajada && <p className="line-clamp-2 max-w-[42ch] text-[13px] font-light leading-snug text-[#1E2A44]/65">{bajada}</p>}
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* 00 · TAPA                                                           */
/* ------------------------------------------------------------------ */

function PaginaTapa() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#FF704A] text-[#1E2A44]">
      <Lienzo>
        <div className="relative flex h-full w-full flex-col">
          {/* marco grabado de la tapa */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-4 rounded-[18px] border border-[#1E2A44]/25" />
          <Cruz className="absolute left-7 top-7 h-3.5 w-3.5 text-[#1E2A44]/60" />
          <Cruz className="absolute right-7 top-7 h-3.5 w-3.5 text-[#1E2A44]/60" />

          <div className="relative flex flex-1 flex-col px-11 pt-14">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-[#1E2A44] px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#F2EFE7]">
                Álbum oficial
              </span>
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em]">Ed. 2026</span>
            </div>

            <h1 className="mt-7 font-display text-[94px] font-black uppercase leading-[0.8] tracking-[-0.05em]">
              Nicolás
              <br />
              Cortese
            </h1>

            <p className="mt-4 max-w-[17ch] font-display text-[22px] font-bold leading-[1.05]">
              Diseño multimedial que también se programa.
            </p>

            {/* figurita de la tapa */}
            <div className="absolute bottom-6 right-10 w-[178px] rotate-[6deg] rounded-2xl bg-[#F2EFE7] p-2 shadow-[0_18px_40px_rgba(30,42,68,0.35)]">
              <div className="flex items-center justify-between px-0.5 pb-1.5">
                <span className="rounded-full bg-[#1E2A44] px-2 py-0.5 font-mono text-[9px] font-bold text-[#F2EFE7]">#01</span>
                <span className="font-display text-sm leading-none text-[#FF704A]">+</span>
              </div>
              <img
                src={PERFIL.foto}
                alt={PERFIL.nombre}
                className="aspect-[4/5] w-full rounded-xl object-cover"
              />
              <div className="px-0.5 pt-1.5">
                <span className="block font-display text-[13px] font-bold leading-tight">{PERFIL.nombre}</span>
                <span className="block font-mono text-[7px] uppercase tracking-[0.2em] text-[#1E2A44]/55">
                  {PERFIL.rol}
                </span>
              </div>
            </div>

            <ul className="mt-auto mb-8 flex flex-col gap-1.5">
              {["UX / UI", "Diseño gráfico", "Video", "Redes", "Frontend"].map((disciplina) => (
                <li key={disciplina} className="flex items-center gap-2 font-display text-[15px] font-bold uppercase tracking-tight">
                  <Cruz className="h-3 w-3" />
                  {disciplina}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative flex h-14 shrink-0 items-center justify-between bg-[#1E2A44] px-11 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#F2EFE7]">
            <span>Portfolio final · Programación IV</span>
            <span className="text-[#FF704A]">19 figuritas ↗</span>
          </div>
        </div>
      </Lienzo>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-black/20 to-transparent" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 01 · ÍNDICE + CLIMA                                                 */
/* ------------------------------------------------------------------ */

const INDICE = [
  { pagina: 2, titulo: "Perfil" },
  { pagina: 3, titulo: "Experiencia" },
  { pagina: 4, titulo: "Educación" },
  { pagina: 5, titulo: "UX / UI" },
  { pagina: 7, titulo: "Diseño gráfico" },
  { pagina: 9, titulo: "Video" },
  { pagina: 11, titulo: "Redes" },
  { pagina: 13, titulo: "Frontend" },
  { pagina: 15, titulo: "Contacto" },
];

function PaginaIndice({ irA }: { irA: IrA }) {
  return (
    <Hoja lado="izq" folio="01">
      <Encabezado eyebrow="01 · Contenido" titulo="Índice" />

      <ol className="mt-4 flex flex-col border-t border-[#1E2A44]/15">
        {INDICE.map((item) => (
          <li key={item.titulo}>
            <button
              type="button"
              onClick={() => irA(item.pagina)}
              className="group flex w-full items-baseline gap-3 border-b border-[#1E2A44]/15 py-[7px] text-left transition-colors hover:text-[#FF704A]"
            >
              <span className="w-6 font-mono text-[11px] font-bold text-[#FF704A]">
                {String(item.pagina).padStart(2, "0")}
              </span>
              <span className="font-display text-[17px] font-bold uppercase leading-none tracking-tight">{item.titulo}</span>
              <span aria-hidden="true" className="flex-1 translate-y-[-3px] border-b border-dotted border-[#1E2A44]/30" />
              <ArrowUpRight size={15} className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </li>
        ))}
      </ol>

      <div className="mt-auto pt-4">
        <ClimaWidget />
      </div>
    </Hoja>
  );
}

/* ------------------------------------------------------------------ */
/* 02 · PERFIL                                                         */
/* ------------------------------------------------------------------ */

function ChipSkill({ skill }: { skill: Skill }) {
  return (
    <li className="flex items-center gap-1.5 rounded-full border border-[#1E2A44]/15 bg-white px-2.5 py-1 text-[11px] font-medium">
      {skill.logo && <img src={skill.logo} alt="" className="h-3.5 w-3.5 object-contain" />}
      {skill.nombre}
    </li>
  );
}

function PaginaPerfil() {
  return (
    <Hoja lado="der" folio="02">
      <div className="flex shrink-0 items-center gap-4">
        <img src={PERFIL.foto} alt={PERFIL.nombre} className="h-[84px] w-[84px] shrink-0 rounded-2xl object-cover" />
        <div className="min-w-0">
          <span className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#FF704A]">
            <Cruz className="h-2.5 w-2.5" /> 02 · Perfil
          </span>
          <h2 className="mt-1 font-display text-[32px] font-black uppercase leading-[0.9] tracking-[-0.02em]">
            {PERFIL.nombre}
          </h2>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#1E2A44]/60">
            {PERFIL.rol} · {PERFIL.ubicacion}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 text-[13px] font-light leading-snug text-[#1E2A44]/80">
        {PERFIL.bio.map((parrafo) => (
          <p key={parrafo.slice(0, 30)} className="line-clamp-3">
            {parrafo}
          </p>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-2.5">
        <div>
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#1E2A44]/50">Diseño</span>
          <ul className="mt-1.5 flex flex-wrap gap-1.5">
            {SKILLS.diseno.map((skill) => (
              <ChipSkill key={skill.nombre} skill={skill} />
            ))}
          </ul>
        </div>
        <div>
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#1E2A44]/50">Código</span>
          <ul className="mt-1.5 flex flex-wrap gap-1.5">
            {SKILLS.codigo.map((skill) => (
              <ChipSkill key={skill.nombre} skill={skill} />
            ))}
          </ul>
        </div>
      </div>

      <span className="mt-4 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#1E2A44]/50">
        Fuera de la pantalla
      </span>
      <div className="mt-1.5 grid min-h-0 flex-1 grid-cols-3 gap-2.5">
        {HOBBIES.map((hobby) => (
          <Figurita
            key={hobby.numero}
            compacta
            numero={hobby.numero}
            titulo={hobby.titulo}
            descripcion={hobby.descripcion}
            stats={[hobby.stat]}
            imagen={hobby.imagen}
          />
        ))}
      </div>
    </Hoja>
  );
}

/* ------------------------------------------------------------------ */
/* 03 · EXPERIENCIA  |  04 · EDUCACIÓN                                 */
/* ------------------------------------------------------------------ */

function PaginaExperiencia() {
  return (
    <Hoja lado="izq" folio="03">
      <Encabezado eyebrow="03 · Trayectoria" titulo="Experiencia" />

      <ol className="mt-4 flex min-h-0 flex-1 flex-col justify-between">
        {EXPERIENCIAS.map((item) => (
          <li key={item.company + item.role} className="grid grid-cols-[74px_1fr] gap-3 border-t border-[#1E2A44]/15 pt-2">
            <span className="pt-0.5 font-mono text-[10px] font-bold uppercase leading-tight text-[#FF704A]">
              {item.period || "—"}
            </span>
            <div className="min-w-0">
              <h3 className="truncate font-display text-[16px] font-black uppercase leading-tight tracking-tight">
                {item.company}
              </h3>
              <p className="line-clamp-1 font-mono text-[9px] uppercase tracking-[0.1em] text-[#1E2A44]/55">
                {item.role}
                {item.location ? ` · ${item.location}` : ""}
              </p>
              <p className="mt-0.5 line-clamp-2 text-[11px] font-light leading-snug text-[#1E2A44]/75">
                {item.achievements[0]}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Hoja>
  );
}

function PaginaEducacion() {
  return (
    <Hoja lado="der" folio="04">
      <Encabezado eyebrow="04 · Formación" titulo="Educación" bajada="Dónde aprendí lo que aplico en cada proyecto." />

      <ol className="mt-5 flex min-h-0 flex-1 flex-col gap-3">
        {EDUCACION.map((item) => (
          <li
            key={item.titulo + item.institucion}
            className={`flex gap-3 rounded-2xl p-3.5 ${item.enCurso ? "bg-[#1E2A44] text-[#F2EFE7]" : "bg-white"}`}
          >
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                item.enCurso ? "bg-[#FF704A] text-[#1E2A44]" : "bg-[#F2EFE7] text-[#FF704A]"
              }`}
            >
              <GraduationCap size={20} strokeWidth={1.6} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="truncate font-display text-[16px] font-black uppercase leading-tight tracking-tight">
                  {item.titulo}
                </h3>
                {item.period && (
                  <span className="shrink-0 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#FF704A]">
                    {item.period}
                  </span>
                )}
              </div>
              <p className={`font-mono text-[9px] uppercase tracking-[0.12em] ${item.enCurso ? "text-[#F2EFE7]/65" : "text-[#1E2A44]/55"}`}>
                {item.institucion}
              </p>
              {item.detalle && (
                <p className={`mt-1 line-clamp-2 text-[11px] font-light leading-snug ${item.enCurso ? "text-[#F2EFE7]/80" : "text-[#1E2A44]/75"}`}>
                  {item.detalle}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Hoja>
  );
}

/* ------------------------------------------------------------------ */
/* 05–12 · INTRO DE SECCIÓN (izq) + FIGURITAS (der)                    */
/* ------------------------------------------------------------------ */

function PaginaIntro({ seccion, folio }: { seccion: AlbumSection; folio: string }) {
  const cantidad = seccion.figures.length;

  return (
    <Hoja lado="izq" folio={folio}>
      <div className="flex shrink-0 items-start justify-between">
        <span className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#FF704A]">
          <Cruz className="h-2.5 w-2.5" /> Sección {seccion.indice}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1E2A44]/50">
          {cantidad} {cantidad === 1 ? "figurita" : "figuritas"}
        </span>
      </div>

      <div className="mt-3 flex shrink-0 items-end gap-3">
        <span className="font-display text-[120px] font-black leading-[0.78] tracking-[-0.06em] text-[#FF704A]">
          {seccion.indice}
        </span>
        <h2 className="pb-1 font-display text-[44px] font-black uppercase leading-[0.88] tracking-[-0.03em]">
          {seccion.titulo}
        </h2>
      </div>

      <p className="mt-3 max-w-[38ch] shrink-0 text-[14px] font-light leading-snug text-[#1E2A44]/70">{seccion.bajada}</p>

      {/* portada de la sección, pegada como una figurita */}
      <div className="relative mt-4 min-h-0 flex-1">
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={seccion.portada}
            alt={`Portada de ${seccion.titulo}`}
            className="block h-auto max-h-full w-auto max-w-full -rotate-2 rounded-xl border-[6px] border-white object-contain shadow-[0_14px_30px_rgba(30,42,68,0.22)]"
          />
        </div>
      </div>

      <ul className="mt-4 flex shrink-0 flex-col border-t border-[#1E2A44]/15">
        {seccion.enfoques.map((enfoque) => (
          <li
            key={enfoque}
            className="flex items-center gap-3 border-b border-[#1E2A44]/15 py-2 font-display text-[13px] font-bold uppercase tracking-tight"
          >
            <Cruz className="h-3 w-3 shrink-0 text-[#FF704A]" />
            {enfoque}
          </li>
        ))}
      </ul>
    </Hoja>
  );
}

function SlotVacio() {
  return (
    <div className="flex h-full min-h-0 w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#1E2A44]/20">
      <Cruz className="h-8 w-8 text-[#1E2A44]/20" />
      <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#1E2A44]/35">Próximamente</span>
    </div>
  );
}

function PaginaFiguritas({
  seccion,
  folio,
  abrirProyecto,
}: {
  seccion: AlbumSection;
  folio: string;
  abrirProyecto: AbrirProyecto;
}) {
  const figuras = seccion.figures;
  // 1 figurita: centrada · 2: una fila · 3 o más: grilla de 2 x 2
  const columnas = figuras.length === 1 ? 1 : 2;
  const celdas = figuras.length <= 2 ? figuras.length : 4;
  const vacios = Math.max(0, celdas - figuras.length);

  return (
    <Hoja lado="der" folio={folio}>
      <Encabezado
        eyebrow={`${folio} · ${seccion.titulo}`}
        titulo="Figuritas"
        bajada="Tocá una figurita para darla vuelta y abrir el proyecto."
      />

      <div
        className={`mt-5 grid min-h-0 flex-1 gap-3 ${figuras.length === 1 ? "mx-auto w-[78%]" : "w-full"}`}
        style={{
          gridTemplateColumns: `repeat(${columnas}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${Math.ceil(celdas / columnas)}, minmax(0, 1fr))`,
        }}
      >
        {figuras.map((figura) => (
          <Figurita key={figura.numero} compacta {...figura} onVerProyecto={abrirProyecto} />
        ))}
        {Array.from({ length: vacios }, (_, i) => (
          <SlotVacio key={i} />
        ))}
      </div>
    </Hoja>
  );
}

/* ------------------------------------------------------------------ */
/* 13 · 14 · FRONTEND                                                  */
/* ------------------------------------------------------------------ */

const PRINCIPIOS = ["Componentes reutilizables", "Performance y carga liviana", "Accesibilidad desde el boceto"];

function PaginaFrontendIntro({ repos }: { repos: RepoData[] }) {
  const estrellas = repos.reduce((suma, repo) => suma + repo.stargazers_count, 0);
  const ultimoPush = repos.map((repo) => repo.pushed_at).sort().at(-1);

  return (
    <Hoja lado="izq" folio="13">
      <div className="flex shrink-0 items-start justify-between">
        <span className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#FF704A]">
          <Cruz className="h-2.5 w-2.5" /> Sección 05
        </span>
        <Code2 size={22} className="text-[#FF704A]" />
      </div>

      <div className="mt-3 flex shrink-0 items-end gap-3">
        <span className="font-display text-[120px] font-black leading-[0.78] tracking-[-0.06em] text-[#FF704A]">05</span>
        <h2 className="pb-1 font-display text-[44px] font-black uppercase leading-[0.88] tracking-[-0.03em]">Frontend</h2>
      </div>

      <p className="mt-3 max-w-[38ch] text-[14px] font-light leading-snug text-[#1E2A44]/70">
        Del diseño al navegador: interfaces reales, componentes reutilizables y deploy en Vercel.
      </p>

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {SKILLS.codigo.map((skill) => (
          <ChipSkill key={skill.nombre} skill={skill} />
        ))}
      </ul>

      <ul className="mt-5 flex flex-col border-t border-[#1E2A44]/15">
        {PRINCIPIOS.map((principio) => (
          <li
            key={principio}
            className="flex items-center gap-3 border-b border-[#1E2A44]/15 py-2 font-display text-[13px] font-bold uppercase tracking-tight"
          >
            <Cruz className="h-3 w-3 shrink-0 text-[#FF704A]" />
            {principio}
          </li>
        ))}
      </ul>

      {/* Datos en vivo de la API de GitHub */}
      <div className="mt-auto rounded-2xl bg-[#1E2A44] p-4 text-[#F2EFE7]">
        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#FF704A]">
          + Desde la API de GitHub
        </span>
        {repos.length > 0 ? (
          <dl className="mt-3 grid grid-cols-3 gap-2">
            {[
              { label: "Repos", valor: String(repos.length).padStart(2, "0") },
              { label: "Estrellas", valor: String(estrellas) },
              { label: "Último push", valor: ultimoPush ? formatearFecha(ultimoPush) : "—" },
            ].map((dato) => (
              <div key={dato.label}>
                <dt className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#F2EFE7]/55">{dato.label}</dt>
                <dd className="font-display text-[22px] font-black leading-tight">{dato.valor}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="mt-2 text-[12px] font-light text-[#F2EFE7]/70">No se pudieron cargar los datos de GitHub en este build.</p>
        )}
        <a
          href={`https://github.com/${GITHUB_USER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#FF704A] hover:text-[#F2EFE7]"
        >
          github.com/{GITHUB_USER} <ArrowUpRight size={13} />
        </a>
      </div>
    </Hoja>
  );
}

function PaginaFrontendProyectos({ repos, abrirProyecto }: { repos: RepoData[]; abrirProyecto: AbrirProyecto }) {
  return (
    <Hoja lado="der" folio="14">
      <Encabezado eyebrow="14 · Frontend" titulo="Proyectos" />

      <ol className="mt-4 flex min-h-0 flex-1 flex-col gap-2">
        {FRONTEND_PROJECTS.map((proyecto, i) => {
          // Se combinan los datos locales con los de GitHub: el "homepage" del repo es el link de Vercel.
          const repo = repos.find((r) => r.name === proyecto.repo);
          const vercel = repo?.homepage || proyecto.vercelUrl;
          const resumen = proyecto.summary || repo?.description || "";

          return (
            <li key={proyecto.slug} className="flex min-h-0 flex-1 gap-3 rounded-2xl bg-white p-2">
              {/* Portada gráfica: si no hay imagen, portada tipográfica */}
              <div className="flex w-[92px] shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#1E2A44]">
                {proyecto.cover ? (
                  <img src={proyecto.cover} alt={`Portada de ${proyecto.title}`} className="h-full w-full object-cover" />
                ) : (
                  <span className="font-display text-[30px] font-black text-[#FF704A]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                )}
              </div>

              <div className="flex min-w-0 flex-1 flex-col justify-center">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="truncate font-display text-[15px] font-black uppercase leading-tight tracking-tight">
                    {proyecto.title}
                  </h3>
                  <span className="shrink-0 font-mono text-[8px] uppercase tracking-[0.14em] text-[#1E2A44]/45">
                    {repo?.language ?? proyecto.technologies[0]}
                  </span>
                </div>
                <p className="line-clamp-2 text-[10px] font-light leading-snug text-[#1E2A44]/70">{resumen}</p>

                <div className="mt-1 flex items-center gap-3 font-mono text-[9px] font-bold uppercase tracking-[0.14em]">
                  {vercel && (
                    <a
                      href={vercel}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-0.5 text-[#FF704A] hover:text-[#1E2A44]"
                    >
                      Vercel <ArrowUpRight size={11} />
                    </a>
                  )}
                  <a
                    href={repo?.html_url ?? proyecto.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 text-[#1E2A44]/60 hover:text-[#FF704A]"
                  >
                    Código <ArrowUpRight size={11} />
                  </a>
                  <button
                    type="button"
                    onClick={() => abrirProyecto(proyecto.slug)}
                    className="ml-auto inline-flex items-center gap-0.5 rounded-full bg-[#1E2A44] px-2 py-1 text-[#F2EFE7] hover:bg-[#FF704A] hover:text-[#1E2A44]"
                  >
                    Detalle +
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </Hoja>
  );
}

/* ------------------------------------------------------------------ */
/* 15 · CONTRATAPA                                                     */
/* ------------------------------------------------------------------ */

/* Código de barras decorativo, como el de cualquier álbum de figuritas. */
const BARRAS = [2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 3, 1, 2, 2, 1, 3, 1, 1, 2, 1, 1, 3, 2, 1, 2];

function PaginaContratapa() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#FF704A] text-[#1E2A44]">
      <Lienzo>
        <div className="relative flex h-full w-full flex-col px-11 pb-10 pt-14">
          <div aria-hidden="true" className="pointer-events-none absolute inset-4 rounded-[18px] border border-[#1E2A44]/25" />
          <Cruz className="absolute left-7 top-7 h-3.5 w-3.5 text-[#1E2A44]/60" />
          <Cruz className="absolute right-7 top-7 h-3.5 w-3.5 text-[#1E2A44]/60" />

          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em]">15 · Contacto</span>
          <h2 className="mt-3 font-display text-[70px] font-black uppercase leading-[0.82] tracking-[-0.04em]">
            ¿Hacemos
            <br />
            algo
            <br />
            juntos<span className="text-[#F2EFE7]">?</span>
          </h2>

          <p className="mt-4 max-w-[30ch] text-[15px] font-light leading-snug">
            Escribime y lo vemos: diseño, video, redes o código.
          </p>

          <ul className="mt-6 flex flex-col overflow-hidden rounded-2xl bg-[#F2EFE7]">
            {CONTACTO.map((contacto) => (
              <li key={contacto.label} className="border-b border-[#1E2A44]/10 last:border-b-0">
                <a
                  href={contacto.href}
                  target={contacto.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-[#1E2A44] hover:text-[#F2EFE7]"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#FF704A]">
                      {contacto.label}
                    </span>
                    <span className="mt-0.5 block truncate font-display text-[19px] font-bold leading-tight">
                      {contacto.valor}
                    </span>
                  </span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FF704A] text-[#1E2A44] transition-transform group-hover:rotate-45">
                    <ArrowUpRight size={18} />
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {CV_URL && (
            <a
              href={CV_URL}
              download
              className="mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-[#1E2A44] px-5 py-2.5 font-display text-[12px] font-bold uppercase tracking-[0.1em] text-[#F2EFE7] hover:bg-[#F2EFE7] hover:text-[#1E2A44]"
            >
              <Download size={15} /> Descargar CV
            </a>
          )}

          <div className="mt-auto flex items-end justify-between">
            <div>
              <span className="block font-display text-[15px] font-black uppercase">{PERFIL.nombre}</span>
              <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-[#1E2A44]/70">
                {PERFIL.ubicacion} · Álbum 2026
              </span>
            </div>
            <div aria-hidden="true" className="flex flex-col items-center rounded-md bg-[#F2EFE7] px-2.5 pb-1 pt-2">
              <div className="flex h-9 items-stretch gap-[2px]">
                {BARRAS.map((ancho, i) => (
                  <span key={i} style={{ width: ancho, background: NAVY }} />
                ))}
              </div>
              <span className="mt-1 font-mono text-[7px] tracking-[0.2em]">7 791 2026 0019</span>
            </div>
          </div>
        </div>
      </Lienzo>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-black/20 to-transparent" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* LIBRO                                                               */
/* ------------------------------------------------------------------ */

interface FlipBookRef {
  pageFlip: () => {
    flipNext: () => void;
    flipPrev: () => void;
    flip: (pagina: number) => void;
  } | null;
}

function etiquetaPagina(pagina: number, total: number) {
  if (pagina === 0) return "Tapa";
  if (pagina >= total - 1) return "Contratapa";
  const izquierda = pagina % 2 === 1 ? pagina : pagina - 1;
  return `${String(izquierda).padStart(2, "0")} – ${String(izquierda + 1).padStart(2, "0")}`;
}

export default function LibroInteractivo({ repos }: Props) {
  const libro = useRef<FlipBookRef | null>(null);
  const [pagina, setPagina] = useState(0);
  const [slugAbierto, setSlugAbierto] = useState<string | null>(null);
  const total = 16;

  const anterior = () => libro.current?.pageFlip()?.flipPrev();
  const siguiente = () => libro.current?.pageFlip()?.flipNext();
  const irA = (destino: number) => libro.current?.pageFlip()?.flip(destino);

  const proyectoAbierto = slugAbierto ? obtenerProyecto(slugAbierto) : null;

  // Flechas del teclado: solo cuando no hay un modal abierto.
  useEffect(() => {
    if (slugAbierto) return;
    const alPresionar = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") siguiente();
      if (e.key === "ArrowLeft") anterior();
    };
    window.addEventListener("keydown", alPresionar);
    return () => window.removeEventListener("keydown", alPresionar);
  }, [slugAbierto]);

  // Con el libro cerrado, la tapa queda centrada en pantalla.
  const desplazamiento = pagina === 0 ? "-translate-x-1/4" : pagina >= total - 1 ? "translate-x-1/4" : "translate-x-0";
  const enSpread = pagina > 0 && pagina < total - 1;
  const botonLateral =
    "absolute top-1/2 z-50 hidden -translate-y-1/2 rounded-full border border-white/20 p-3.5 text-[#F2EFE7] transition-colors hover:border-[#FF704A] hover:bg-[#FF704A] hover:text-[#1E2A44] disabled:pointer-events-none disabled:opacity-0 md:block";

  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-[#1E2A44]">
      <Cruz className="pointer-events-none absolute left-6 top-6 h-4 w-4 text-white/25" />
      <Cruz className="pointer-events-none absolute bottom-6 right-6 h-4 w-4 text-white/25" />

      {/* Flechas laterales, pegadas a los bordes de la pantalla y lejos del álbum */}
      <button type="button" onClick={anterior} disabled={pagina === 0} aria-label="Página anterior" className={`${botonLateral} left-4 lg:left-8`}>
        <ChevronLeft size={24} />
      </button>
      <button type="button" onClick={siguiente} disabled={pagina >= total - 1} aria-label="Página siguiente" className={`${botonLateral} right-4 lg:right-8`}>
        <ChevronRight size={24} />
      </button>

      {/* CAJA SEGURA DEL LIBRO: 80vh de alto como máximo, proporción del spread 1000 x 700 */}
      <div className="relative z-10 flex h-[80vh] w-[90vw] items-center justify-center md:w-[82vw]">
        <div
          className="relative w-full"
          style={{
            maxWidth: "min(1000px, calc(80vh * (1000 / 700)))",
            aspectRatio: "1000 / 700",
          }}
        >
          <div className={`relative flex h-full w-full items-center justify-center transition-transform duration-700 ease-in-out ${desplazamiento}`}>
            {/* @ts-expect-error: los tipos de react-pageflip exigen todas las props opcionales */}
            <HTMLFlipBook
              ref={libro}
              className="libro"
              width={500}
              height={700}
              size="stretch"
              minWidth={150}
              maxWidth={700}
              minHeight={210}
              maxHeight={1000}
              showCover
              usePortrait={false}
              mobileScrollSupport={false}
              drawShadow
              maxShadowOpacity={0.35}
              flippingTime={800}
              showPageCorners
              useMouseEvents
              disableFlipByClick
              onFlip={(e: { data: number }) => setPagina(e.data)}
            >
              <div className="pagina" data-density="hard">
                <PaginaTapa />
              </div>

              <div className="pagina">
                <PaginaIndice irA={irA} />
              </div>
              <div className="pagina">
                <PaginaPerfil />
              </div>

              <div className="pagina">
                <PaginaExperiencia />
              </div>
              <div className="pagina">
                <PaginaEducacion />
              </div>

              <div className="pagina">
                <PaginaIntro seccion={ALBUM_UXUI} folio="05" />
              </div>
              <div className="pagina">
                <PaginaFiguritas seccion={ALBUM_UXUI} folio="06" abrirProyecto={setSlugAbierto} />
              </div>

              <div className="pagina">
                <PaginaIntro seccion={ALBUM_DISENO} folio="07" />
              </div>
              <div className="pagina">
                <PaginaFiguritas seccion={ALBUM_DISENO} folio="08" abrirProyecto={setSlugAbierto} />
              </div>

              <div className="pagina">
                <PaginaIntro seccion={ALBUM_VIDEO} folio="09" />
              </div>
              <div className="pagina">
                <PaginaFiguritas seccion={ALBUM_VIDEO} folio="10" abrirProyecto={setSlugAbierto} />
              </div>

              <div className="pagina">
                <PaginaIntro seccion={ALBUM_REDES} folio="11" />
              </div>
              <div className="pagina">
                <PaginaFiguritas seccion={ALBUM_REDES} folio="12" abrirProyecto={setSlugAbierto} />
              </div>

              <div className="pagina">
                <PaginaFrontendIntro repos={repos} />
              </div>
              <div className="pagina">
                <PaginaFrontendProyectos repos={repos} abrirProyecto={setSlugAbierto} />
              </div>

              <div className="pagina" data-density="hard">
                <PaginaContratapa />
              </div>
            </HTMLFlipBook>

            {enSpread && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-1/2 z-40 w-8 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/15 to-transparent"
              />
            )}
          </div>
        </div>
      </div>

      {/* Barra inferior: número de página y, en celulares, los botones */}
      <nav aria-label="Navegación del álbum" className="absolute bottom-3 z-20 flex items-center gap-3">
        <button
          type="button"
          onClick={anterior}
          disabled={pagina === 0}
          aria-label="Página anterior"
          className="rounded-full border border-white/20 p-2 text-[#F2EFE7] disabled:opacity-30 md:hidden"
        >
          <ChevronLeft size={18} />
        </button>
        <span aria-live="polite" className="min-w-[96px] text-center font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#F2EFE7]/70">
          {etiquetaPagina(pagina, total)}
        </span>
        <button
          type="button"
          onClick={siguiente}
          disabled={pagina >= total - 1}
          aria-label="Página siguiente"
          className="rounded-full border border-white/20 p-2 text-[#F2EFE7] disabled:opacity-30 md:hidden"
        >
          <ChevronRight size={18} />
        </button>
      </nav>

      {proyectoAbierto && (
        <ProyectoModal key={proyectoAbierto.slug} proyecto={proyectoAbierto} onClose={() => setSlugAbierto(null)} />
      )}
    </div>
  );
}
