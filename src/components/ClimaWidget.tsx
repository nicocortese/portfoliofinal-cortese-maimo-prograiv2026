import { useEffect, useState } from "react";
import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSun,
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
 * La key se lee de las variables de entorno: en Astro/Vite, para que una
 * variable llegue al frontend tiene que empezar con PUBLIC_.
 *   .env  →  PUBLIC_OPENWEATHER_API_KEY=tu_key
 */
const API_KEY = import.meta.env.PUBLIC_OPENWEATHER_API_KEY as string | undefined;
const CIUDAD = "Buenos Aires,AR";

interface Clima {
  temp: number;
  sensacion: number;
  humedad: number;
  viento: number;
  descripcion: string;
  ciudad: string;
  id: number;
  esNoche: boolean;
}

/* Códigos de OpenWeather: https://openweathermap.org/weather-conditions */
function iconoPara(id: number, esNoche: boolean): LucideIcon {
  if (id >= 200 && id < 300) return CloudLightning;
  if (id >= 300 && id < 400) return CloudDrizzle;
  if (id >= 500 && id < 600) return CloudRain;
  if (id >= 600 && id < 700) return Snowflake;
  if (id >= 700 && id < 800) return CloudFog;
  if (id === 800) return esNoche ? Moon : Sun;
  if (id === 801 || id === 802) return esNoche ? Moon : CloudSun;
  return Cloud;
}

function planDelDia(clima: Clima) {
  if (clima.id < 700 || clima.temp < 15) return "Día de estudio: mate, Figma y renders.";
  if (clima.temp >= 24) return "Tarde ideal para un fulbito y salir a sacar fotos.";
  return "Equilibrio justo: un poco de código y un rato afuera.";
}

export default function ClimaWidget() {
  const [clima, setClima] = useState<Clima | null>(null);
  const [estado, setEstado] = useState<"cargando" | "listo" | "error">("cargando");
  const [intento, setIntento] = useState(0);

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
    fetch(url, { signal: controlador.signal })
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error(`OpenWeather respondió ${respuesta.status}`);
        return respuesta.json();
      })
      .then((data) => {
        setClima({
          temp: Math.round(data.main.temp),
          sensacion: Math.round(data.main.feels_like),
          humedad: data.main.humidity,
          viento: Math.round(data.wind.speed * 3.6),
          descripcion: data.weather[0].description,
          ciudad: data.name,
          id: data.weather[0].id,
          esNoche: data.weather[0].icon.endsWith("n"),
        });
        setEstado("listo");
      })
      .catch((error) => {
        if (error.name === "AbortError") return;
        console.error("No se pudo obtener el clima:", error);
        setEstado("error");
      });

    return () => controlador.abort();
  }, [intento]);

  const Icono = clima ? iconoPara(clima.id, clima.esNoche) : Cloud;

  return (
    <section
      aria-label="Clima en tiempo real"
      aria-busy={estado === "cargando"}
      className="overflow-hidden rounded-2xl bg-[#1E2A44] text-[#F2EFE7]"
    >
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-[#F2EFE7]/65">
          <span className={`h-1.5 w-1.5 rounded-full ${estado === "listo" ? "bg-[#FF704A]" : "bg-white/30"}`} />
          Clima en vivo
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
        <p className="px-4 py-4 text-[12px] font-light leading-snug text-[#F2EFE7]/70">
          {API_KEY
            ? "No pude consultar el clima ahora. Probá actualizar en un rato."
            : "Falta la variable PUBLIC_OPENWEATHER_API_KEY para mostrar el clima."}
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

      {clima && estado !== "error" && (
        <>
          <div className="flex items-center gap-4 px-4 pt-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#FF704A] text-[#1E2A44]">
              <Icono size={30} strokeWidth={1.6} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-display text-[40px] font-black leading-none tracking-tight">
                {clima.temp}
                <span className="text-[#FF704A]">°</span>
              </div>
              <p className="mt-1 truncate text-[12px] font-light capitalize text-[#F2EFE7]/75">
                {clima.descripcion}
              </p>
            </div>
            <span className="inline-flex items-center gap-1 self-start font-mono text-[9px] uppercase tracking-[0.16em] text-[#F2EFE7]/55">
              <MapPin size={11} /> {clima.ciudad}
            </span>
          </div>

          <ul className="grid grid-cols-3 gap-1.5 px-4 pt-3">
            {[
              { Icono: Thermometer, label: "Sensación", valor: `${clima.sensacion}°` },
              { Icono: Droplets, label: "Humedad", valor: `${clima.humedad}%` },
              { Icono: Wind, label: "Viento", valor: `${clima.viento} km/h` },
            ].map((dato) => (
              <li key={dato.label} className="rounded-lg bg-white/[0.07] px-2 py-1.5">
                <span className="flex items-center gap-1 font-mono text-[7px] uppercase tracking-[0.14em] text-[#FF704A]">
                  <dato.Icono size={10} /> {dato.label}
                </span>
                <span className="mt-0.5 block font-display text-[12px] font-bold">{dato.valor}</span>
              </li>
            ))}
          </ul>

          <p className="line-clamp-1 px-4 pb-3 pt-2.5 font-mono text-[9px] uppercase tracking-[0.12em] text-[#F2EFE7]/60">
            ↗ {planDelDia(clima)}
          </p>
        </>
      )}
    </section>
  );
}
