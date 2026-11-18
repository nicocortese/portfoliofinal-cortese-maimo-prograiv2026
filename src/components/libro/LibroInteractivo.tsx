import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import HTMLFlipBook from "react-pageflip";
import { ArrowUpRight, ChevronLeft, ChevronRight, GraduationCap } from "lucide-react";
import { Figurita } from "../Figurita";
import ClimaWidget from "../ClimaWidget";
import ProyectoModal from "../ProyectoModal";
import LogoInteractivo from "../LogoInteractivo";
import { ALBUM_DISENO, ALBUM_REDES, ALBUM_UXUI, ALBUM_VIDEO, type AlbumFigure, type AlbumSection } from "../../data/albumData";
import {
  CONTACTO,
  EDUCACION,
  EXPERIENCIAS,
  HOBBIES,
  PERFIL,
  PROXIMA_FORMACION,
  SKILLS,
  type Skill,
} from "../../data/portfolioData";
import { FRONTEND_PROJECTS, GITHUB_USER, type FrontendProject } from "../../data/projectsData";
import { obtenerProyecto } from "../../data/proyectosDetalle";

/* Datos que llegan desde la API de GitHub (index.astro). */
export interface RepoData {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  pushed_at: string;
}

/* Métricas sobre todos los repos públicos (index.astro). */
export interface GithubResumen {
  totalRepos: number;
  conDeploy: number;
  ultimoPush: string;
  lenguajes: string[];
}

interface Props {
  repos: RepoData[];
  github: GithubResumen | null;
}

type IrA = (pagina: number) => void;
type AbrirProyecto = (slug: string) => void;

/* Cada página se diseña sobre un lienzo fijo de 500 x 700 y se escala. */
const BASE_W = 500;
const BASE_H = 700;

const NAVY = "#1E2A44";

/* ------------------------------------------------------------------ */
/* PIEZAS DE IDENTIDAD DE MARCA: cruces finas (+) y flechas (↗)            */
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
  // Fecha exacta en horario argentino: DD/MM/AAAA.
  const partes = new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "America/Argentina/Buenos_Aires",
  }).formatToParts(fecha);
  const valorDe = (tipo: string) => partes.find((parte) => parte.type === tipo)?.value ?? "";
  return `${valorDe("day")}/${valorDe("month")}/${valorDe("year")}`;
}

/* ------------------------------------------------------------------ */
/* LIENZO ESCALABLE:                     */
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
/* HOJA BASE + FOLIO + ENCABEZADO                            */
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
/* 00 · TAPA:                                                           */
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
              Apasionado por construir lo que quieren comunicar las personas.
            </p>

            {/* figurita de la tapa */}
            <div className="absolute bottom-6 right-10 w-[178px] rotate-[6deg] rounded-2xl bg-[#F2EFE7] p-2 shadow-[0_18px_40px_rgba(30,42,68,0.35)]">
              <div className="flex items-center justify-between px-0.5 pb-1.5">
                <span className="font-display text-sm leading-none text-[#FF704A]">+</span>
              </div>
              <img
                src={PERFIL.foto}
                className="aspect-[4/5] w-full rounded-xl object-cover"
              />
              <div className="px-0.5 pt-1.5">
                <span className="block font-display text-[13px] font-bold leading-tight">{PERFIL.nombre}</span>
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
            <span>Portfolio final · Programación IV · </span>
            <span className="text-[#FF704A]">19 figuritas</span>
          </div>
        </div>
      </Lienzo>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-black/20 to-transparent" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 01 · ÍNDICE + CLIMA:                                                 */
/* ------------------------------------------------------------------ */

const INDICE = [
  { pagina: 2, titulo: "Perfil" },
  { pagina: 3, titulo: "Fuera de pantalla" },
  { pagina: 5, titulo: "Experiencia" },
  { pagina: 6, titulo: "Educación" },
  { pagina: 7, titulo: "UX / UI" },
  { pagina: 9, titulo: "Diseño gráfico" },
  { pagina: 11, titulo: "Video" },
  { pagina: 13, titulo: "Redes" },
  { pagina: 15, titulo: "Frontend" },
  { pagina: 17, titulo: "Contacto" },
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
/* 02 · PERFIL:                                                        */
/* ------------------------------------------------------------------ */

function ChipSkill({ skill }: { skill: Skill }) {
  return (
    <li className="chip-skill flex items-center gap-1.5 rounded-full border border-[#1E2A44]/15 bg-white px-2.5 py-1 text-[11px] font-medium">
      {skill.logo && <img src={skill.logo} alt="" className="h-3.5 w-3.5 object-contain" />}
      {skill.nombre}
    </li>
  );
}

function PaginaPerfil() {
  return (
    <Hoja lado="der" folio="02">
      <div className="flex shrink-0 items-center gap-4">
        <img src={PERFIL.foto} alt={PERFIL.nombre} className="h-[96px] w-[96px] shrink-0 rounded-2xl object-cover" />
        <div className="min-w-0">
          <span className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#FF704A]">
            <Cruz className="h-2.5 w-2.5" /> 02 · Perfil
          </span>
          <h2 className="mt-1 font-display text-[30px] font-black uppercase leading-[0.9] tracking-[-0.02em]">
            {PERFIL.nombre}
          </h2>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#1E2A44]/60">
            {PERFIL.rol} · {PERFIL.ubicacion}
          </p>
        </div>
      </div>

      {/* Bio completa: */}
      <div className="mt-5 flex flex-col gap-2.5 text-[13.5px] font-light leading-[1.55] text-[#1E2A44]/85">
        {PERFIL.bio.map((parrafo) => (
          <p key={parrafo.slice(0, 30)}>{parrafo}</p>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-3">
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

      <div className="mt-auto pt-5">
        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#1E2A44]/50">Actualmente</span>
        <ul className="mt-2 flex flex-col border-t border-[#1E2A44]/15">
          {[
            { rotulo: "Cursando", detalle: "Lic. en Tecnología Multimedial · UMAI" },
            { rotulo: "Trabajando", detalle: "Paseo Güemes Hotel" },
            { rotulo: "Abierto a", detalle: "Diseño, video, redes y frontend" },
          ].map((item) => (
            <li key={item.rotulo} className="flex items-baseline gap-3 border-b border-[#1E2A44]/15 py-1.5">
              <span className="w-[72px] shrink-0 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-[#FF704A]">
                {item.rotulo}
              </span>
              <span className="min-w-0 text-[11.5px] leading-snug text-[#1E2A44]/80">{item.detalle}</span>
            </li>
          ))}
        </ul>
      </div>
    </Hoja>
  );
}

/* ------------------------------------------------------------------ */
/* 03 · 04 · FUERA DE LA PANTALLA (hobbies):        */
/* ------------------------------------------------------------------ */

function PaginaHobbiesIntro() {
  return (
    <Hoja lado="izq" folio="03">
      <span className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#FF704A]">
        <Cruz className="h-2.5 w-2.5" /> 03 · Fuera de la pantalla
      </span>

      <h2 className="mt-3 font-display text-[46px] font-black uppercase leading-[0.86] tracking-[-0.03em]">
        Lo que hago
        <br />
        cuando no
        <br />
        estoy
        <br />
        <span className="text-[#FF704A]">diseñando</span>
      </h2>

      <p className="mt-3 max-w-[36ch] text-[13.5px] font-light leading-snug text-[#1E2A44]/70">
        Fuera del monitor también se entrena el ojo:
      </p>

      <ul className="mt-4 flex flex-col border-t border-[#1E2A44]/15">
        {HOBBIES.map((hobby) => (
          <li key={hobby.numero} className="flex items-start gap-3 border-b border-[#1E2A44]/15 py-2">
            <span className="w-8 shrink-0 font-mono text-[10px] font-bold text-[#FF704A]">#{hobby.numero}</span>
            <div className="min-w-0">
              <span className="block font-display text-[15px] font-bold uppercase leading-none tracking-tight">
                {hobby.titulo}
              </span>
              <span className="mt-1 block text-[11px] leading-snug text-[#1E2A44]/70">{hobby.descripcion}</span>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-auto pt-4 font-mono text-[9px] uppercase leading-relaxed tracking-[0.16em] text-[#1E2A44]/45">
        Todo eso también me alimenta en lo que diseño ↗
      </p>
    </Hoja>
  );
}

function PaginaHobbiesFiguritas() {
  return (
    <Hoja lado="der" folio="04">
      <Encabezado
        eyebrow="04 · Fuera de la pantalla"
        titulo="Figuritas"
        bajada="Cuatro cosas que me acompañan cuando cierro la computadora."
      />

      <div
        className="mt-3 grid min-h-0 w-full flex-1 grid-cols-2 gap-2.5"
        style={{ gridTemplateRows: "repeat(2, minmax(0, 1fr))" }}
      >
        {HOBBIES.map((hobby) => (
          <Figurita
            key={hobby.numero}
            compacta
            destacada
            numero={hobby.numero}
            titulo={hobby.titulo}
            descripcion={hobby.descripcion}
            stats={[hobby.stat]}
            icono={hobby.icono}
            imagen={hobby.imagen}
          />
        ))}
      </div>
    </Hoja>
  );
}

/* ------------------------------------------------------------------ */
/* 05 · EXPERIENCIA  y  06 · EDUCACIÓN :                                */
/* ------------------------------------------------------------------ */

function PaginaExperiencia() {
  return (
    <Hoja lado="izq" folio="05">
      <Encabezado eyebrow="05 · Trayectoria" titulo="Experiencia" />

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
              <p className="line-clamp-2 font-mono text-[9px] uppercase leading-tight tracking-[0.1em] text-[#1E2A44]/85">
                {item.role}
                {item.location ? ` · ${item.location}` : ""}
              </p>
              <p className="mt-0.5 line-clamp-2 text-[11px] font-light leading-snug text-[#1E2A44]/85">
                {item.achievements[0]}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Hoja>
  );
}

function LogoInstitucion({ logo, destacado = false }: { logo?: string; destacado?: boolean }) {
  return (
    <span
      className={`flex h-14 w-[74px] shrink-0 items-center justify-center overflow-hidden rounded-xl ${
        destacado ? "bg-white px-1.5" : "bg-transparent"
      }`}
    >
      {logo ? (
        <img src={logo} alt="" className="max-h-full max-w-full object-contain" />
      ) : (
        <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${destacado ? "text-[#1E2A44]" : "text-[#FF704A]"}`}>
          <GraduationCap size={22} strokeWidth={1.6} />
        </span>
      )}
    </span>
  );
}

function PaginaEducacion() {
  return (
    <Hoja lado="der" folio="06">
      <Encabezado eyebrow="06 · Formación" titulo="Educación" bajada="Dónde aprendí lo que aplico en cada proyecto." />

      {/* Línea de tiempo: secundario + universidad + lo que viene */}
      <ol className="relative mt-5 flex min-h-0 flex-1 flex-col gap-3">
        {EDUCACION.map((item) => (
          <li
            key={item.titulo + item.institucion}
            className={`flex gap-3 rounded-2xl p-3.5 ${item.enCurso ? "bg-[#1E2A44] text-[#F2EFE7]" : "bg-white"}`}
          >
            <LogoInstitucion logo={item.logo} destacado={item.enCurso} />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="line-clamp-2 font-display text-[16px] font-black uppercase leading-tight tracking-tight">
                  {item.titulo}
                </h3>
                {item.period && (
                  <span className="shrink-0 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#FF704A]">
                    {item.period}
                  </span>
                )}
              </div>
              <p className={`font-mono text-[9px] uppercase tracking-[0.12em] ${item.enCurso ? "text-[#F2EFE7]/70" : "text-[#1E2A44]/60"}`}>
                {item.institucion}
              </p>
              {item.detalle && (
                <p className={`mt-1 text-[11px] leading-snug ${item.enCurso ? "text-[#F2EFE7]/85" : "text-[#1E2A44]/80"}`}>
                  {item.detalle}
                </p>
              )}
            </div>
          </li>
        ))}

        {/* Figurita vacía para futuros */}
        <li className="flex items-center gap-3 rounded-2xl border-2 border-dashed border-[#1E2A44]/25 p-3.5">
          <span className="flex h-14 w-[74px] shrink-0 items-center justify-center overflow-hidden rounded-xl border border-dashed border-[#1E2A44]/25 text-[#1E2A44]/35">
            {PROXIMA_FORMACION.logo ? (
              <img src={PROXIMA_FORMACION.logo} alt="Universidad Maimónides" className="max-h-full max-w-full object-contain opacity-60" />
            ) : (
              <Cruz className="h-5 w-5" />
            )}
          </span>
          <div className="min-w-0">
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#FF704A]">Próximamente</span>
            <h3 className="font-display text-[16px] font-black uppercase leading-tight tracking-tight text-[#1E2A44]/55">
              {PROXIMA_FORMACION.titulo}
            </h3>
            <p className="text-[11px] leading-snug text-[#1E2A44]/55">{PROXIMA_FORMACION.detalle}</p>
          </div>
        </li>
      </ol>
    </Hoja>
  );
}

/* ------------------------------------------------------------------ */
/* 07–14 · INTRO DE SECCIÓN (izquierda) + FIGURITAS (derecha):                    */
/* ------------------------------------------------------------------ */

function PaginaIntro({ seccion, folio }: { seccion: AlbumSection; folio: string }) {
  const cantidad = seccion.figures.length;

  return (
    <Hoja lado="izq" folio={folio}>
      <div className="flex shrink-0 items-start justify-between">
        <span className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#FF704A]">
          <Cruz className="h-2.5 w-2.5" /> Sección {seccion.indice}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1E2A44]/55">
          {cantidad} {cantidad === 1 ? "figurita" : "figuritas"}
        </span>
      </div>

      
      <div className="relative mt-4 shrink-0">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-2 top-0 select-none whitespace-nowrap font-display text-[200px] font-black leading-none tracking-[-0.07em] text-[#FF704A]"
        >
          {seccion.indice}
        </span>
        <div aria-hidden="true" className="h-[184px]" />
        <h2 className="relative z-10 max-w-[330px] font-display text-[52px] font-black uppercase leading-[0.84] tracking-[-0.035em]">
          {seccion.titulo}
        </h2>
      </div>

      <p className="mt-5 max-w-[36ch] shrink-0 text-[14px] font-light leading-snug text-[#1E2A44]/70">{seccion.bajada}</p>

      <ul className="mt-4 flex shrink-0 flex-wrap gap-x-3 gap-y-1">
        {seccion.enfoques.map((enfoque) => (
          <li
            key={enfoque}
            className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-[#1E2A44]/60"
          >
            <span className="text-[#FF704A]">+</span>
            {enfoque}
          </li>
        ))}
      </ul>

      {/* Qué figuritas trae la sección. */}
      <div className="mt-auto shrink-0 border-t border-[#1E2A44]/15 pt-3">
        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#1E2A44]/50">En esta sección</span>
        <ul className="mt-1.5 flex flex-col">
          {seccion.figures.map((figura) => (
            <li key={figura.numero} className="flex items-center gap-2.5 border-b border-[#1E2A44]/10 py-1.5">
              <span className="w-6 shrink-0 font-mono text-[10px] font-bold text-[#FF704A]">{figura.numero}</span>
              <span className="truncate font-display text-[13px] font-bold uppercase tracking-tight">{figura.titulo}</span>
              <ArrowUpRight size={12} className="ml-auto shrink-0 text-[#1E2A44]/30" />
            </li>
          ))}
        </ul>
      </div>
    </Hoja>
  );
}

function SlotVacio() {
  return (
    <div className="flex h-full min-h-0 w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#1E2A44]/25">
      <Cruz className="h-8 w-8 text-[#1E2A44]/25" />
      <span className="font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-[#1E2A44]/45">Próximamente</span>
    </div>
  );
}


function fichaDeProyecto(figura: AlbumFigure) {
  const detalle = obtenerProyecto(figura.slug);
  if (!detalle) return { stats: figura.stats.slice(0, 4), tags: [] as string[] };

  const stats = [
    ...(detalle.year ? [{ label: "Año", value: detalle.year }] : []),
    ...(detalle.client ? [{ label: "Cliente", value: detalle.client }] : []),
  ];

  return { stats, tags: [] as string[] };
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
  const celdas = figuras.length <= 4 ? 4 : 6;
  const vacios = celdas - Math.min(figuras.length, celdas);

  return (
    <Hoja lado="der" folio={folio}>
      <Encabezado
        eyebrow={`${folio} · ${seccion.titulo}`}
        titulo="Figuritas"
        bajada="Tocá una figurita para darla vuelta y abrir el proyecto."
      />

      <div
        className="mt-5 grid min-h-0 w-full flex-1 grid-cols-2 gap-3"
        style={{ gridTemplateRows: `repeat(${celdas / 2}, minmax(0, 1fr))` }}
      >
        {figuras.slice(0, celdas).map((figura) => {
          const { stats, tags } = fichaDeProyecto(figura);
          return (
            <Figurita
              key={figura.numero}
              compacta
              soloFicha
              {...figura}
              stats={stats}
              tags={tags}
              onVerProyecto={abrirProyecto}
            />
          );
        })}
        {Array.from({ length: vacios }, (_, i) => (
          <SlotVacio key={i} />
        ))}
      </div>
    </Hoja>
  );
}

/* ------------------------------------------------------------------ */
/* 15 · 16 · FRONTEND:                                                  */
/* ------------------------------------------------------------------ */

const PRINCIPIOS = ["Componentes reutilizables", "Performance y carga liviana", "Accesibilidad desde el boceto"];

/* Contador de GitHub. */
function Contador({ valor }: { valor: number }) {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(valor);
      return;
    }

    let frame = 0;
    const inicio = performance.now();
    const duracion = 900;

    const paso = (ahora: number) => {
      const progreso = Math.min(1, (ahora - inicio) / duracion);
      setVisible(Math.round(valor * (1 - Math.pow(1 - progreso, 3))));
      if (progreso < 1) frame = requestAnimationFrame(paso);
    };

    frame = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(frame);
  }, [valor]);

  return <>{String(visible).padStart(2, "0")}</>;
}

function PaginaFrontendIntro({ github }: { github: GithubResumen | null }) {
  const lenguajes = github ? ["HTML", ...github.lenguajes.filter((l) => l !== "HTML")].slice(0, 6) : [];
  const [replay, setReplay] = useState(0);

  return (
    <Hoja lado="izq" folio="15">
      <div className="flex shrink-0 items-start justify-between">
        <span className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#FF704A]">
          <Cruz className="h-2.5 w-2.5" /> Sección 05
        </span>
        <span
          title="Frontend"
          className="codigo-icono relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#1E2A44] font-mono text-[12px] font-bold leading-none text-[#FF704A] shadow-md shadow-[#1E2A44]/25"
        >
          <span aria-hidden="true" className="codigo-halo pointer-events-none absolute inset-0 rounded-xl" />
          <span aria-hidden="true">
            &lt;<span className="codigo-barra">/</span>&gt;
          </span>
        </span>
      </div>

      <div className="mt-3 flex shrink-0 items-end gap-3">
        <span className="font-display text-[120px] font-black leading-[0.78] tracking-[-0.06em] text-[#FF704A]">05</span>
        <h2 className="pb-1 font-display text-[44px] font-black uppercase leading-[0.88] tracking-[-0.03em]">Frontend</h2>
      </div>

      <p className="mt-3 max-w-[38ch] text-[14px] font-light leading-snug text-[#1E2A44]/70">
        Del diseño al navegador: interfaces reales, componentes reutilizables y estilos dinámicos.
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

      {/* Datos de la API de GitHub */}
      <div className="github-panel group/github relative mt-auto overflow-hidden rounded-2xl bg-[#1E2A44] p-4 text-[#F2EFE7] transition-shadow duration-300 hover:shadow-[0_16px_36px_rgba(30,42,68,0.4)]">
        <div className="relative flex items-center justify-between gap-2">
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#FF704A]">
            + Desde la API de GitHub
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-[#F2EFE7]/55">
            <span className="github-sync h-1.5 w-9 overflow-hidden rounded-full bg-white/10">
              <span className="github-sync-barra block h-full w-1/2 rounded-full bg-[#4ADE80]/80" />
            </span>
            sync
          </span>
        </div>
        {github ? (
          <>
            <dl
              className="relative mt-3 grid grid-cols-3 gap-2"
              onMouseEnter={() => setReplay((n) => n + 1)}
            >
              <div>
                <dt className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#F2EFE7]/65">Repos</dt>
                <dd className="origin-left font-display text-[22px] font-black leading-tight tabular-nums transition-transform duration-300 hover:scale-105">
                  <Contador key={`repos-${replay}`} valor={github.totalRepos} />
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#F2EFE7]/65">Con deploy</dt>
                <dd className="origin-left font-display text-[22px] font-black leading-tight tabular-nums transition-transform duration-300 hover:scale-105">
                  <Contador key={`deploy-${replay}`} valor={github.conDeploy} />
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#F2EFE7]/65">Último push</dt>
                <dd className="pt-1 font-display text-[12px] font-black leading-tight tabular-nums">
                  {github.ultimoPush ? formatearFecha(github.ultimoPush) : "—"}
                </dd>
              </div>
            </dl>

            <div className="relative mt-3 flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.07] px-2 py-1.5 transition-colors duration-300 hover:border-[#4ADE80]/35 hover:bg-white/[0.11]">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="github-pulso absolute inline-flex h-full w-full rounded-full bg-[#4ADE80]" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4ADE80] shadow-[0_0_7px_rgba(74,222,128,0.85)]" />
              </span>
              <span className="font-mono text-[8px] font-bold uppercase tracking-[0.12em] text-[#F2EFE7]/85">
                Deploy en vivo · Vercel
              </span>
              <span className="ml-auto font-mono text-[8px] uppercase tracking-[0.12em] text-[#F2EFE7]/55">
                Astro + islas React
              </span>
            </div>

            <ul className="relative mt-3 flex flex-wrap gap-1.5">
              {lenguajes.map((lenguaje, i) => (
                <li
                  key={lenguaje}
                  style={{ animationDelay: `${120 + i * 70}ms` }}
                  className="github-tag rounded-full bg-white/10 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.12em] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#FF704A] hover:text-[#1E2A44] hover:shadow-[0_4px_10px_rgba(255,112,74,0.35)]"
                >
                  {lenguaje}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="relative mt-2 text-[12px] text-[#F2EFE7]/75">
            No se pudieron cargar los datos de GitHub en este build.
          </p>
        )}
        <a
          href={`https://github.com/${GITHUB_USER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative mt-3 inline-flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#FF704A] hover:text-[#F2EFE7]"
        >
          github.com/{GITHUB_USER}
          <ArrowUpRight size={13} className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </Hoja>
  );
}

/* Portada de proyecto frontend: */
function PortadaFrontend({ proyecto, numero }: { proyecto: FrontendProject; numero: number }) {
  if (proyecto.logoInteractivo) {
    return (
      <div className="flex w-[116px] shrink-0 items-center justify-center rounded-xl bg-[#F2EFE7]">
        <LogoInteractivo logo={proyecto.logoInteractivo} tamano={52} />
      </div>
    );
  }
  if (proyecto.cover) {
    return (
      <div
        className={`flex w-[116px] shrink-0 items-center justify-center rounded-xl p-3 ${
          proyecto.fondoOscuro ? "bg-[#0A1128]" : "bg-[#F2EFE7]"
        }`}
      >
        <img src={proyecto.cover} alt={`Logo de ${proyecto.title}`} className="max-h-full max-w-full object-contain" />
      </div>
    );
  }
  return (
    <div className="flex w-[116px] shrink-0 items-center justify-center rounded-xl bg-[#1E2A44]">
      <span className="font-display text-[30px] font-black text-[#FF704A]">{String(numero).padStart(2, "0")}</span>
    </div>
  );
}

function PaginaFrontendProyectos({ repos, abrirProyecto }: { repos: RepoData[]; abrirProyecto: AbrirProyecto }) {
  const vacios = Math.max(0, 5 - FRONTEND_PROJECTS.length);

  return (
    <Hoja lado="der" folio="16">
      <Encabezado eyebrow="16 · Frontend" titulo="Proyectos" />

      <ol className="mt-4 flex min-h-0 flex-1 flex-col gap-2">
        {FRONTEND_PROJECTS.map((proyecto, i) => {
          const repo = repos.find((r) => r.name === proyecto.repo);
          const resumen = proyecto.summary || repo?.description || "";

          return (
            <li key={proyecto.slug} className="flex min-h-0 flex-1 gap-3 rounded-2xl bg-white p-2">
              <PortadaFrontend proyecto={proyecto} numero={i + 1} />

              <div className="flex min-w-0 flex-1 flex-col justify-center">
                <h3 className="truncate font-display text-[15px] font-black uppercase leading-tight tracking-tight">
                  {proyecto.title}
                </h3>
                <p className="line-clamp-2 text-[10px] leading-snug text-[#1E2A44]/75">{resumen}</p>
                <ul className="mt-1 flex gap-1 overflow-hidden">
                  {proyecto.technologies.slice(0, 3).map((tec) => (
                    <li
                      key={tec}
                      className="shrink-0 rounded-full bg-[#F2EFE7] px-1.5 py-0.5 font-mono text-[7px] font-bold uppercase tracking-[0.1em] text-[#1E2A44]/70"
                    >
                      {tec}
                    </li>
                  ))}
                </ul>

                <div className="mt-1 flex items-center font-mono text-[9px] font-bold uppercase tracking-[0.14em]">
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
        {Array.from({ length: vacios }, (_, i) => (
          <li key={i} className="min-h-0 flex-1">
            <SlotVacio />
          </li>
        ))}
      </ol>
    </Hoja>
  );
}

/* ------------------------------------------------------------------ */
/* 15 · CONTRATAPA:                                                     */
/* ------------------------------------------------------------------ */

/* Código de barras decorativo: */
const BARRAS = [2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 3, 1, 2, 2, 1, 3, 1, 1, 2, 1, 1, 3, 2, 1, 2];

function PaginaContratapa() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#FF704A] text-[#1E2A44]">
      <Lienzo>
        <div className="relative flex h-full w-full flex-col px-11 pb-10 pt-14">
          <div aria-hidden="true" className="pointer-events-none absolute inset-4 rounded-[18px] border border-[#1E2A44]/25" />
          <Cruz className="absolute left-7 top-7 h-3.5 w-3.5 text-[#1E2A44]/60" />
          <Cruz className="absolute right-7 top-7 h-3.5 w-3.5 text-[#1E2A44]/60" />

          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em]">17 · Contacto</span>
          <h2 className="mt-3 font-display text-[70px] font-black uppercase leading-[0.82] tracking-[-0.04em]">
            ¿Hacemos
            <br />
            algo
            <br />
            juntos<span className="text-[#F2EFE7]">?</span>
          </h2>

          <p className="mt-4 max-w-[30ch] text-[15px] font-light leading-snug">
            Contactate y lo vemos: diseño, video, redes o código.
          </p>

          <ul className="mt-6 flex flex-col overflow-hidden rounded-2xl bg-[#F2EFE7]">
            {CONTACTO.map((contacto) => (
              <li key={contacto.label} className="border-b border-[#1E2A44]/10 last:border-b-0">
                <a
                  href={contacto.href}
                  target={contacto.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  onPointerDown={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
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

          <div className="mt-auto flex items-end justify-between">
            <div>
              <span className="block font-display text-[15px] font-black uppercase">{PERFIL.nombre}</span>
              <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-[#1E2A44]/70">
                {PERFIL.ubicacion} · 19-11-2026
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
/* LIBRO:                                                               */
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

export default function LibroInteractivo({ repos, github }: Props) {
  const libro = useRef<FlipBookRef | null>(null);
  const [pagina, setPagina] = useState(0);
  const [slugAbierto, setSlugAbierto] = useState<string | null>(null);
  const total = 18;

  const anterior = () => libro.current?.pageFlip()?.flipPrev();
  const siguiente = () => libro.current?.pageFlip()?.flipNext();
  const irA = (destino: number) => libro.current?.pageFlip()?.flip(destino);

  const proyectoAbierto = slugAbierto ? obtenerProyecto(slugAbierto) : null;

  useEffect(() => {
    if (slugAbierto) return;
    const alPresionar = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") siguiente();
      if (e.key === "ArrowLeft") anterior();
    };
    window.addEventListener("keydown", alPresionar);
    return () => window.removeEventListener("keydown", alPresionar);
  }, [slugAbierto]);

  const desplazamiento = pagina === 0 ? "-translate-x-1/4" : pagina >= total - 1 ? "translate-x-1/4" : "translate-x-0";
  const enSpread = pagina > 0 && pagina < total - 1;
  const botonLateral =
    "absolute top-1/2 z-50 hidden -translate-y-1/2 rounded-full border border-white/20 p-3.5 text-[#F2EFE7] transition-colors hover:border-[#FF704A] hover:bg-[#FF704A] hover:text-[#1E2A44] disabled:pointer-events-none disabled:opacity-0 md:block";

  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-[#1E2A44]">
      <Cruz className="pointer-events-none absolute left-6 top-6 h-4 w-4 text-white/25" />
      <Cruz className="pointer-events-none absolute bottom-6 right-6 h-4 w-4 text-white/25" />

      {/* Flechas laterales: */}
      <button type="button" onClick={anterior} disabled={pagina === 0} aria-label="Página anterior" className={`${botonLateral} left-4 lg:left-8`}>
        <ChevronLeft size={24} />
      </button>
      <button type="button" onClick={siguiente} disabled={pagina >= total - 1} aria-label="Página siguiente" className={`${botonLateral} right-4 lg:right-8`}>
        <ChevronRight size={24} />
      </button>

      {/* CAJA SEGURA DEL LIBRO: */}
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
                <PaginaHobbiesIntro />
              </div>
              <div className="pagina">
                <PaginaHobbiesFiguritas />
              </div>

              <div className="pagina">
                <PaginaExperiencia />
              </div>
              <div className="pagina">
                <PaginaEducacion />
              </div>

              <div className="pagina">
                <PaginaIntro seccion={ALBUM_UXUI} folio="07" />
              </div>
              <div className="pagina">
                <PaginaFiguritas seccion={ALBUM_UXUI} folio="08" abrirProyecto={setSlugAbierto} />
              </div>

              <div className="pagina">
                <PaginaIntro seccion={ALBUM_DISENO} folio="09" />
              </div>
              <div className="pagina">
                <PaginaFiguritas seccion={ALBUM_DISENO} folio="10" abrirProyecto={setSlugAbierto} />
              </div>

              <div className="pagina">
                <PaginaIntro seccion={ALBUM_VIDEO} folio="11" />
              </div>
              <div className="pagina">
                <PaginaFiguritas seccion={ALBUM_VIDEO} folio="12" abrirProyecto={setSlugAbierto} />
              </div>

              <div className="pagina">
                <PaginaIntro seccion={ALBUM_REDES} folio="13" />
              </div>
              <div className="pagina">
                <PaginaFiguritas seccion={ALBUM_REDES} folio="14" abrirProyecto={setSlugAbierto} />
              </div>

              <div className="pagina">
                <PaginaFrontendIntro github={github} />
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
