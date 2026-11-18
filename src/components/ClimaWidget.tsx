import { useEffect, useState } from "react";
import { Droplets, MapPin, RefreshCw, Thermometer, Wind } from "lucide-react";

/*
 * Clima en tiempo real (OpenWeather) consultado desde el navegador.
 * La key se lee de las variables de entorno. astro.config.mjs expone al
 * frontend las variables que empiezan con PUBLIC_ u OPENWEATHER_, así que
 * sirve cualquiera de estas dos en .env o en Vercel:
 *   PUBLIC_OPENWEATHER_API_KEY=tu_key   ó   OPENWEATHER_API_KEY=tu_key
 */
const API_KEY = (import.meta.env.PUBLIC_OPENWEATHER_API_KEY || import.meta.env.OPENWEATHER_API_KEY) as
  | string
  | undefined;
const CIUDAD = "Buenos Aires,AR";
const ZONA = "America/Argentina/Buenos_Aires";
const CADA_10_MINUTOS = 10 * 60 * 1000;

interface Clima {
  temp: number;
  sensacion: number;
  minima: number;
  maxima: number;
  humedad: number;
  viento: number;
  descripcion: string;
  ciudad: string;
  id: number;
  amanecer: number;
  atardecer: number;
  medicion: Date;
}

type Familia =
  | "sol"
  | "luna"
  | "solNube"
  | "lunaNube"
  | "nube"
  | "nubeNoche"
  | "lluvia"
  | "llovizna"
  | "tormenta"
  | "nieve"
  | "niebla";

type Momento = "manana" | "tarde" | "noche";

interface Aspecto {
  familia: Familia;
  fondo: string;
  aura: string;
}

/*
 * Matriz completa de estados: cada combinación de clima + horario tiene su
 * ícono animado, su color y su halo.
 * 
 */
function aspectoPara(id: number, esNoche: boolean): Aspecto {
  if (id >= 200 && id < 300)
    return { familia: "tormenta", fondo: esNoche ? "bg-[#8B7CF6]" : "bg-[#A99CFB]", aura: "bg-[#A48CFA]" };
  if (id >= 300 && id < 400)
    return { familia: "llovizna", fondo: esNoche ? "bg-[#41699B]" : "bg-[#9CC8F9]", aura: "bg-[#7CB8F6]" };
  if (id >= 500 && id < 600)
    return { familia: "lluvia", fondo: esNoche ? "bg-[#3E6CAB]" : "bg-[#63A2F2]", aura: "bg-[#5B9BEF]" };
  if (id >= 600 && id < 700)
    return { familia: "nieve", fondo: esNoche ? "bg-[#8FA6C9]" : "bg-[#DCE9FF]", aura: "bg-[#CFE3FF]" };
  if (id >= 700 && id < 800)
    return { familia: "niebla", fondo: esNoche ? "bg-[#4A5668]" : "bg-[#C6CEd9]", aura: "bg-[#B8C0CC]" };
  if (id === 800)
    return esNoche
      ? { familia: "luna", fondo: "bg-[#26365A]", aura: "bg-[#F2EFE7]" }
      : { familia: "sol", fondo: "bg-[#FFF3D2]", aura: "bg-[#FFB020]" };
  if (id === 801 || id === 802)
    return esNoche
      ? { familia: "lunaNube", fondo: "bg-[#243456]", aura: "bg-[#C9D6F0]" }
      : { familia: "solNube", fondo: "bg-[#FBEAC0]", aura: "bg-[#FFC94A]" };
  return esNoche
    ? { familia: "nubeNoche", fondo: "bg-[#2C3D60]", aura: "bg-[#C9D6F0]" }
    : { familia: "nube", fondo: "bg-[#DDE4EF]", aura: "bg-[#C9D6F0]" };
}

function momentoDelDia(ahora: Date, esNoche: boolean): Momento {
  if (esNoche) return "noche";
  const hora = Number(
    new Intl.DateTimeFormat("en-GB", { hour: "2-digit", hour12: false, timeZone: ZONA }).format(ahora),
  );
  return hora < 13 ? "manana" : "tarde";
}

function planDelDia(clima: Clima, esNoche: boolean, momento: Momento) {
  /* Lluvia, llovizna, tormenta y nieve. */
  if (clima.id >= 200 && clima.id < 700) {
    if (clima.id >= 600)
      return esNoche ? "Noche de nieve: abrigo, té y una peli." : "Día de nieve: abrigo, té y una peli.";
    if (esNoche) return "Noche pasada por agua: mate, serie y a dormir temprano.";
    return "Día de lluvia: ideal para un mate, Figma y tirar código.";
  }
  /* Nublado, niebla y cielo cubierto (800 = despejado, no entra acá). */
  if ((clima.id >= 700 && clima.id < 800) || clima.id >= 801) {
    if (esNoche) return "Noche nublada: buen momento para música y una peli tranqui.";
    return momento === "manana"
      ? "Mañana nublada: mate, foco y código sin apuro."
      : "Tarde nublada: buen plan para diseño y una vuelta corta.";
  }
  /* Despejado de noche. */
  if (esNoche) {
    if (clima.temp <= 10) return "Noche despejada y fría: té caliente, manta y una serie.";
    if (clima.temp < 20) return "Noche despejada y fresca: ideal para música o una peli tranqui.";
    if (clima.temp >= 26) return "Noche despejada y cálida: ideal para tomar algo al aire y charlar.";
    return "Noche despejada: ideal para caminar y mirar el cielo.";
  }
  /* Soleado de mañana o de tarde. */
  if (clima.temp < 15)
    return momento === "manana"
      ? "Mañana despejada y fría: arranque con mate y código."
      : "Tarde despejada y fría: día de estudio y diseño.";
  if (clima.temp >= 24)
    return momento === "manana"
      ? "Mañana soleada: ideal para arrancar con todo."
      : "Tarde soleada: ideal para un fulbito y salir a sacar fotos.";
  return momento === "manana"
    ? "Mañana despejada y templada: mate, código y buena luz."
    : "Tarde agradable: un poco de código y un rato afuera.";
}

const horaLocal = (fecha: Date) =>
  fecha.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: ZONA,
  });

/* Reloj local en vivo:. */
function useReloj() {
  const [ahora, setAhora] = useState(() => new Date());
  useEffect(() => {
    const temporizador = window.setInterval(() => setAhora(new Date()), 1000);
    return () => window.clearInterval(temporizador);
  }, []);
  return ahora;
}

/* ------------------------------------------------------------------ */
/* ÍCONOS ANIMADOS                                                     */
/* ------------------------------------------------------------------ */

const TRAZO = "#1E2A44";
const CREMA = "#F2EFE7";
const AMARILLO_SOL = "#FFC94A";
/* Silueta de nube */
const NUBE_PATH =
  "M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z";
const LUNA_PATH = "M15.7 2.4a8.7 8.7 0 1 0 5.6 13.7A9.4 9.4 0 0 1 15.7 2.4Z";
/* Estrella de cuatro puntas. */
const ESTRELLA_PATH = "M0 -3 L0.72 -0.72 L3 0 L0.72 0.72 L0 3 L-0.72 0.72 L-3 0 L-0.72 -0.72 Z";

function Nube({ transform = "translate(0 -3)", lenta = false }: { transform?: string; lenta?: boolean }) {
  return (
    <g transform={transform}>
      <g className={lenta ? "clima-nube clima-nube--lenta" : "clima-nube"}>
        <path d={NUBE_PATH} fill={CREMA} stroke={TRAZO} strokeWidth="1.5" strokeLinejoin="round" />
      </g>
    </g>
  );
}


function Sol({ cx = 12, cy = 12, radio = 7.5, nucleo = 4 }: { cx?: number; cy?: number; radio?: number; nucleo?: number }) {
  const desde = nucleo + 1.3;
  const hasta = Math.max(desde + 1.8, radio + 1.3);
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <circle className="clima-halo" r={radio + 1.6} fill={AMARILLO_SOL} opacity="0.16" />
      <g className="clima-sol">
        {Array.from({ length: 8 }, (_, i) => (
          <g key={i} transform={`rotate(${i * 45})`}>
            <line x1="0" y1={-desde} x2="0" y2={-hasta} stroke={TRAZO} strokeWidth="3" strokeLinecap="round" />
            <line x1="0" y1={-desde} x2="0" y2={-hasta} stroke={AMARILLO_SOL} strokeWidth="1.7" strokeLinecap="round" />
          </g>
        ))}
        <circle r={nucleo} fill={AMARILLO_SOL} stroke={TRAZO} strokeWidth="1" />
      </g>
    </g>
  );
}

function Estrella({ x, y, escala = 1, retraso = 0 }: { x: number; y: number; escala?: number; retraso?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${escala})`}>
      <path d={ESTRELLA_PATH} fill={AMARILLO_SOL} className="clima-estrella" style={{ animationDelay: `${retraso}s` }} />
    </g>
  );
}

function Luna({
  transform = "translate(0 0)",
  escala = 1,
  conEstrellas = true,
}: {
  transform?: string;
  escala?: number;
  conEstrellas?: boolean;
}) {
  return (
    <g transform={`${transform} scale(${escala})`}>
      <g className="clima-luna">
        <path d={LUNA_PATH} fill={CREMA} />
        <circle className="clima-nube clima-nube--lenta" cx="3.6" cy="6.4" r="0.8" fill={CREMA} opacity="0.55" />
        <circle className="clima-nucleo" cx="6.2" cy="2.8" r="0.65" fill={CREMA} opacity="0.4" />
      </g>
      {conEstrellas && (
        <>
          <Estrella x={18.6} y={3.4} escala={0.9} />
          <Estrella x={20.4} y={9.4} escala={0.6} retraso={0.9} />
          <Estrella x={2.2} y={3} escala={0.5} retraso={1.7} />
        </>
      )}
    </g>
  );
}

function Gotas({ cantidad, cortas = false }: { cantidad: number; cortas?: boolean }) {
  const xs = [6.6, 12, 17.4, 9.3, 14.7];
  const largo = cortas ? 2.6 : 4.2;
  return (
    <g stroke={TRAZO} strokeWidth={cortas ? "1.6" : "2"} strokeLinecap="round">
      {Array.from({ length: cantidad }, (_, i) => (
        <line
          key={i}
          x1={xs[i]}
          y1={18.2}
          x2={xs[i] - 0.5}
          y2={18.2 + largo}
          className="clima-gota"
          style={{ animationDelay: `${i * 0.34}s`, animationDuration: cortas ? "2.1s" : "1.5s" }}
        />
      ))}
    </g>
  );
}

function IconoClima({ familia }: { familia: Familia }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-10 w-10 overflow-visible" fill="none">
      {familia === "sol" && <Sol radio={7.8} nucleo={4.2} />}

      {familia === "luna" && <Luna transform="translate(-0.6 1.4)" escala={0.92} />}

      {familia === "nube" && <Nube lenta />}

      {familia === "nubeNoche" && (
        <>
          <Luna transform="translate(9.4 0.2)" escala={0.5} conEstrellas={false} />
          <Estrella x={20.6} y={2.4} escala={0.75} />
          <Estrella x={3.4} y={3} escala={0.5} retraso={1.3} />
          <Nube transform="translate(1.6 4.6) scale(0.7)" lenta />
        </>
      )}

      {familia === "solNube" && (
        <>
          <Sol cx={16.4} cy={7.2} radio={4.9} nucleo={2.7} />
          <Nube transform="translate(1.6 4.6) scale(0.7)" />
        </>
      )}

      {familia === "lunaNube" && (
        <>
          <Luna transform="translate(8.6 0.6)" escala={0.56} conEstrellas={false} />
          <Estrella x={21} y={2.6} escala={0.8} />
          <Estrella x={4.4} y={3.4} escala={0.55} retraso={1.1} />
          <Nube transform="translate(1.6 4.6) scale(0.7)" lenta />
        </>
      )}

      {familia === "lluvia" && (
        <>
          <Gotas cantidad={3} />
          <Nube transform="translate(0 -3.6)" />
        </>
      )}

      {familia === "llovizna" && (
        <>
          <Gotas cantidad={3} cortas />
          <Nube transform="translate(0 -3.6)" lenta />
        </>
      )}

      {familia === "tormenta" && (
        <>
          <Nube transform="translate(0 -3.6)" />
          <path
            className="clima-destello"
            d="M14.2 16.8 10 21.4h2.7l-1 2.6 4.4-5.2h-2.5l1.4-2Z"
            fill={TRAZO}
            stroke={TRAZO}
            strokeWidth="0.8"
            strokeLinejoin="round"
          />
        </>
      )}

      {familia === "nieve" && (
        <>
          {[
            { x: 6.6, y: 19.4, d: 0 },
            { x: 12, y: 21, d: 0.7 },
            { x: 17.4, y: 19.4, d: 1.4 },
          ].map((copo) => (
            <circle
              key={copo.x}
              cx={copo.x}
              cy={copo.y}
              r="1.15"
              fill={TRAZO}
              className="clima-nieve"
              style={{ animationDelay: `${copo.d}s` }}
            />
          ))}
          <Nube transform="translate(0 -3.6)" lenta />
        </>
      )}
      {familia === "niebla" && (
        <>
          <Nube transform="translate(0 -4.2)" />
          {[
            { y: 17.4, d: 0 },
            { y: 19.8, d: 0.6 },
            { y: 22.2, d: 1.2 },
          ].map((linea) => (
            <line
              key={linea.y}
              x1="5"
              y1={linea.y}
              x2="19"
              y2={linea.y}
              stroke={TRAZO}
              strokeWidth="1.7"
              strokeLinecap="round"
              className="clima-niebla"
              style={{ animationDelay: `${linea.d}s` }}
            />
          ))}
        </>
      )}
    </svg>
  );
}

export default function ClimaWidget() {
  const [clima, setClima] = useState<Clima | null>(null);
  const [estado, setEstado] = useState<"cargando" | "listo" | "error">("cargando");
  const [intento, setIntento] = useState(0);
  const ahora = useReloj();

  /*
   * Se recalcula con el reloj en vivo: al cruzar el atardecer el widget
   * pasa a modo noche sin esperar a la próxima consulta de la API.
   */
  const esNocheAhora = (() => {
    if (!clima) return false;
    const segundos = Math.floor(ahora.getTime() / 1000);
    if (clima.amanecer > 0 && clima.atardecer > 0) {
      return segundos < clima.amanecer || segundos > clima.atardecer;
    }
    // Sin datos de sol: fallback por hora local de Buenos Aires.
    const hora = Number(
      new Intl.DateTimeFormat("en-GB", { hour: "2-digit", hour12: false, timeZone: ZONA }).format(ahora),
    );
    return hora >= 20 || hora < 6;
  })();

  useEffect(() => {
    if (!API_KEY) {
      setEstado("error");
      return;
    }

    const controlador = new AbortController();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      CIUDAD,
    )}&units=metric&lang=es&appid=${API_KEY}`;

    setEstado("cargando");
    fetch(url, { signal: controlador.signal, cache: "no-store" })
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error(`OpenWeather respondió ${respuesta.status}`);
        return respuesta.json();
      })
      .then((data) => {
        setClima({
          temp: Math.round(data.main.temp),
          sensacion: Math.round(data.main.feels_like),
          minima: Math.round(data.main.temp_min),
          maxima: Math.round(data.main.temp_max),
          humedad: data.main.humidity,
          viento: Math.round(data.wind.speed * 3.6),
          descripcion: data.weather[0].description,
          ciudad: data.name,
          id: data.weather[0].id,
          amanecer: data.sys.sunrise ?? 0,
          atardecer: data.sys.sunset ?? 0,
          medicion: new Date(data.dt * 1000),
        });
        setEstado("listo");
      })
      .catch((error) => {
        if (error.name === "AbortError") return;
        console.error("No se pudo obtener el clima:", error);
        setEstado("error");
      });

    const temporizador = setTimeout(() => setIntento(intento + 1), CADA_10_MINUTOS);
    return () => {
      controlador.abort();
      clearTimeout(temporizador);
    };
  }, [intento]);

  const aspecto = clima ? aspectoPara(clima.id, esNocheAhora) : null;
  const momento = momentoDelDia(ahora, esNocheAhora);
  const minutos = clima ? Math.max(0, Math.round((ahora.getTime() - clima.medicion.getTime()) / 60000)) : 0;

  return (
    <section
      aria-label="Clima en tiempo real"
      aria-busy={estado === "cargando"}
      className="overflow-hidden rounded-2xl bg-[#1E2A44] text-[#F2EFE7]"
    >
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-[#F2EFE7]/70">
          <span className={`h-1.5 w-1.5 rounded-full ${estado === "listo" ? "animate-pulse bg-[#4ADE80]" : "bg-white/30"}`} />
          Clima en vivo
          <span
            className="ml-0.5 inline-flex items-center gap-1 tracking-normal tabular-nums text-[#F2EFE7]/55"
            title="Hora local en Buenos Aires, actualizada en tiempo real"
          >
            · {horaLocal(ahora)}
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-1.5">
          {clima && (
            <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-[#F2EFE7]/40">
              {minutos === 0 ? "al día" : `hace ${minutos} min`}
            </span>
          )}
          <button
            type="button"
            onClick={() => setIntento(intento + 1)}
            aria-label="Actualizar clima"
            className="rounded-full p-1 text-[#F2EFE7]/60 transition-colors hover:text-[#FF704A]"
          >
            <RefreshCw size={12} className={estado === "cargando" ? "animate-spin" : ""} />
          </button>
        </span>
      </div>

      {estado === "error" && (
        <p className="px-4 py-4 text-[12px] leading-snug text-[#F2EFE7]/80">
          {API_KEY
            ? "No pude consultar el clima ahora. Probá actualizar en un rato."
            : "Falta la variable OPENWEATHER_API_KEY (o PUBLIC_OPENWEATHER_API_KEY) para mostrar el clima."}
        </p>
      )}

      {estado === "cargando" && !clima && (
        <div className="flex items-center gap-4 px-4 py-4">
          <div className="h-14 w-14 animate-pulse rounded-xl bg-white/10" />
          <div className="flex flex-1 flex-col gap-2">
            <div className="h-7 w-20 animate-pulse rounded bg-white/10" />
            <div className="h-3 w-32 animate-pulse rounded bg-white/10" />
          </div>
        </div>
      )}

      {clima && aspecto && estado !== "error" && (
        <>
          <div className="flex items-center gap-3.5 px-4 pt-2.5">
            <div className="relative shrink-0">
              <div
                aria-hidden="true"
                className={`clima-aurora absolute -inset-2 rounded-2xl blur-[10px] ${aspecto.aura}`}
              />
              <div
                className={`relative flex h-12 w-12 items-center justify-center rounded-xl text-[#1E2A44] transition-colors duration-500 ${aspecto.fondo}`}
              >
                <IconoClima familia={aspecto.familia} />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-[36px] font-black leading-none tracking-tight">
                  {clima.temp}
                  <span className="text-[#FF704A]">°</span>
                </span>
                <span className="font-mono text-[9px] text-[#F2EFE7]/60">
                  {clima.minima}° / {clima.maxima}°
                </span>
              </div>
              <p className="mt-1 truncate text-[12px] capitalize text-[#F2EFE7]/85">{clima.descripcion}</p>
            </div>
            <span className="inline-flex items-center gap-1 self-start font-mono text-[9px] uppercase tracking-[0.16em] text-[#F2EFE7]/60">
              <MapPin size={11} /> {clima.ciudad}
            </span>
          </div>

          <ul className="grid grid-cols-3 gap-1.5 px-4 pt-2.5">
            {[
              { Icono: Thermometer, label: "Sensación", valor: `${clima.sensacion}°` },
              { Icono: Droplets, label: "Humedad", valor: `${clima.humedad}%` },
              { Icono: Wind, label: "Viento", valor: `${clima.viento} km/h` },
            ].map((dato) => (
              <li key={dato.label} className="rounded-lg bg-white/[0.08] px-2 py-1">
                <span className="flex items-center gap-1 font-mono text-[7px] uppercase tracking-[0.14em] text-[#FF704A]">
                  <dato.Icono size={10} /> {dato.label}
                </span>
                <span className="mt-0.5 block font-display text-[11px] font-bold">{dato.valor}</span>
              </li>
            ))}
          </ul>

          <p className="line-clamp-2 px-4 pb-2.5 pt-2 font-mono text-[9px] uppercase leading-snug tracking-[0.12em] text-[#F2EFE7]/75">
            ↗ {planDelDia(clima, esNocheAhora, momento)}
          </p>
        </>
      )}
    </section>
  );
}
