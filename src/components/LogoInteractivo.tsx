import type { FrontendProject } from "../data/projectsData";

/*
 * Logo dibujado con código: un cuadrado con degradado y un ícono blanco.
 * Al pasar el mouse se agranda y el ícono gira un poco.
 */
export default function LogoInteractivo({
  logo,
  tamano = 56,
}: {
  logo: NonNullable<FrontendProject["logoInteractivo"]>;
  tamano?: number;
}) {
  const { Icono, degradado } = logo;

  return (
    <div
      className={`group/logo flex items-center justify-center rounded-2xl bg-gradient-to-br ${degradado} shadow-lg shadow-indigo-500/30 transition-transform duration-300 hover:scale-110`}
      style={{ width: tamano, height: tamano }}
    >
      <Icono
        size={tamano * 0.46}
        strokeWidth={2}
        className="text-white transition-transform duration-300 group-hover/logo:-rotate-12 group-hover/logo:scale-110"
        aria-hidden="true"
      />
    </div>
  );
}
