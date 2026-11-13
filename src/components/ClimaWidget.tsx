import { useEffect, useState } from "react";
import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSun,
  CloudMoon,
  Droplets,
  MapPin,
  Moon,
  RefreshCw,
  Snowflake,
  Sun,
  Thermometer,
  Wind,
  type LucideIcon,
} from "lucide-react";

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
  esNoche: boolean;
  /** Hora en que OpenWeather tomó la medición. */
  medicion: Date;
}

/* Ícono y color según el código de OpenWeather: https://openweathermap.org/weather-conditions */
function aspectoPara(id: number, esNoche: boolean): { Icono: LucideIcon; fondo: string } {
  if (id >= 200 && id < 300) return { Icono: CloudLightning, fondo: "bg-[#8B7CF6]" };
  if (id >= 300 && id < 400) return { Icono: CloudDrizzle, fondo: "bg-[#7CB8F6]" };
  if (id >= 500 && id < 600) return { Icono: CloudRain, fondo: "bg-[#5B9BEF]" };
  if (id >= 600 && id < 700) return { Icono: Snowflake, fondo: "bg-[#CFE3FF]" };
  if (id >= 700 && id < 800) return { Icono: CloudFog, fondo: "bg-[#B8C0CC]" };
  if (id === 800) return esNoche ? { Icono: Moon, fondo: "bg-[#F2EFE7]" } : { Icono: Sun, fondo: "bg-[#FFC94A]" };
  if (id === 801 || id === 802)
    return esNoche ? { Icono: CloudMoon, fondo: "bg-[#F2EFE7]" } : { Icono: CloudSun, fondo: "bg-[#FF704A]" };
  return { Icono: Cloud, fondo: "bg-[#C9D2DE]" };
}

function planDelDia(clima: Clima) {
  if (clima.id < 700) return "Llueve: mate, Figma y renders adentro.";
  if (clima.esNoche) return "De noche: código frontend y música.";
  if (clima.temp < 15) return "Hace frío: día de estudio y diseño.";
  if (clima.temp >= 24) return "Tarde ideal para un fulbito y salir a sacar fotos.";
  return "Equilibrio justo: un poco de código y un rato afuera.";
}

const hora = (fecha: Date) =>
  fecha.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit", timeZone: "America/Argentina/Buenos_Aires" });

export default function ClimaWidget() {
  const [clima, setClima] = useState<Clima | null>(null);
  const [estado, setEstado] = useState<"cargando" | "listo" | "error">("cargando");
  const [intento, setIntento] = useState(0);

  // Pide el clima al montar, al tocar "actualizar" y cada 10 minutos.
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
          // Es de noche si la medición es antes del amanecer o después del atardecer.
          esNoche: data.dt < data.sys.sunrise || data.dt > data.sys.sunset,
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

  const aspecto = clima ? aspectoPara(clima.id, clima.esNoche) : null;

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
          {clima && <span className="text-[#F2EFE7]/45">· {hora(clima.medicion)}</span>}
        </span>
        <button
          type="button"
          onClick={() => setIntento(intento + 1)}
          aria-label="Actualizar clima"
          className="rounded-full p-1 text-[#F2EFE7]/60 transition-colors hover:text-[#FF704A]"
        >
          <RefreshCw size={12} className={estado === "cargando" ? "animate-spin" : ""} />
        </button>
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
          <div className="flex items-center gap-4 px-4 pt-3">
            <div
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-[#1E2A44] transition-colors duration-500 ${aspecto.fondo}`}
            >
              <aspecto.Icono size={30} strokeWidth={1.6} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-[40px] font-black leading-none tracking-tight">
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

          <ul className="grid grid-cols-3 gap-1.5 px-4 pt-3">
            {[
              { Icono: Thermometer, label: "Sensación", valor: `${clima.sensacion}°` },
              { Icono: Droplets, label: "Humedad", valor: `${clima.humedad}%` },
              { Icono: Wind, label: "Viento", valor: `${clima.viento} km/h` },
            ].map((dato) => (
              <li key={dato.label} className="rounded-lg bg-white/[0.08] px-2 py-1.5">
                <span className="flex items-center gap-1 font-mono text-[7px] uppercase tracking-[0.14em] text-[#FF704A]">
                  <dato.Icono size={10} /> {dato.label}
                </span>
                <span className="mt-0.5 block font-display text-[12px] font-bold">{dato.valor}</span>
              </li>
            ))}
          </ul>

          <p className="line-clamp-1 px-4 pb-3 pt-2.5 font-mono text-[9px] uppercase tracking-[0.12em] text-[#F2EFE7]/70">
            ↗ {planDelDia(clima)}
          </p>
        </>
      )}
    </section>
  );
}
