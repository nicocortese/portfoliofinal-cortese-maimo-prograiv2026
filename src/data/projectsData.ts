import { Zap, type LucideIcon } from "lucide-react";

/* ------------------------------------------------------------------ */
/* PROYECTOS FRONTEND:
/* ------------------------------------------------------------------ */

export interface FrontendProject {
  slug: string;
  /** Nombre exacto del repositorio en GitHub. */
  repo: string;
  title: string;
  subtitle: string;
  summary: string;
  description: string[];
  technologies: string[];
  date: string;
  cover: string;
  fondoOscuro?: boolean;
  logoInteractivo?: { Icono: LucideIcon; degradado: string };
  vercelUrl: string;
  githubUrl: string;
  highlights: { title: string; detail: string }[];
}

export const GITHUB_USER = "nicocortese";

export const FRONTEND_PROJECTS: FrontendProject[] = [
  {
    slug: "fixea-web",
    repo: "fixea-web",
    title: "Fixea",
    subtitle: "Plataforma de seguimiento y feedback inmediato de proyectos de desarollo web",
    summary:
      "Extensión de Chrome para automatizar flujos de trabajo y hacer tracking en tiempo real.",
    description: [
      "Fixea nació para resolver la fragmentación en la gestión de tareas de desarrollo y diseño multimedia.",
      "Integra un dashboard con métricas clave, autenticación segura y conexión fluida mediante una extensión de navegador nativa.",
    ],
    technologies: ["HTML", "Next.js", "React", "Tailwind CSS", "MongoDB", "Node.js"],
    date: "2026",
    cover: "/assets/logos/fixea.png",
    fondoOscuro: true,
    vercelUrl: "https://fixea-web.vercel.app",
    githubUrl: "https://github.com/nicocortese/fixea-web",
    highlights: [
      { title: "Extensión Chrome", detail: "Sincronización bidireccional en tiempo real." },
      { title: "UI accesible y limpia", detail: "Interfaz ajustada a estándares WCAG 2.1 AA." },
    ],
  },
  {
    slug: "dashboard-extension-umai",
    repo: "proyecto1-cortese-maimo-prograiv2026",
    title: "Gestioná",
    subtitle: "Panel interactivo de métricas de Universidad Maimónides",
    summary:
      "Visualización analítica de actividades de extensión de UMAi mediante gráficos interactivos y datos en tiempo real.",
    description: [
      "Desarrollo de un panel interactivo para la gestión y visualización de datos de actividades de extensión de la Universidad Maimónides.",
      "Integración en tiempo real con Google Sheets API y renderizado de métricas dinámicas mediante la librería Recharts.",
    ],
    technologies: ["HTML", "React", "Vite", "Recharts", "Google Sheets API"],
    date: "2026",
    cover: "",
    logoInteractivo: { Icono: Zap, degradado: "from-indigo-500 via-purple-500 to-pink-500" },
    vercelUrl: "https://gestiona-umai.vercel.app/",
    githubUrl: "https://github.com/nicocortese/proyecto1-cortese-maimo-prograiv2026",
    highlights: [
      { title: "Datos en tiempo real", detail: "Sincronización directa y visualización dinámica conectada a hojas de cálculo." }
    ],
  },
 { 
    slug: "retro-kicks",
    repo: "retro-kicks-frontend",
    title: "Retro Kicks",
    subtitle: "E-commerce de zapatillas retro y cultura vintage",
    summary:
      "E-commerce con catálogo interactivo, carrito dinámico y checkout integrado, con estética de los 2000s.",
    description: [
      "Desarrollo e-commerce enfocado en la estética retro de los 2000s adaptada a una experiencia web moderna.",
      "Modelado de datos en MongoDB, API REST con Express y frontend responsivo de alto rendimiento.",
    ],
    technologies: ["HTML", "React", "Next.js", "Tailwind CSS", "Node.js", "MongoDB"],
    date: "2025",
    cover: "/assets/logos/retrokicks.png",
    vercelUrl: "https://retro-kicks.vercel.app/",
    githubUrl: "https://github.com/nicocortese/retro-kicks-frontend",
    highlights: [
      { title: "Carrito propio", detail: "Estado persistente con almacenamiento local." },
    ],
  },
  {
    slug: "progra3-tp2",
    repo: "maimo-progra3-2025-tp2-cortese",
    title: "Sitio web de películas",
    subtitle: "Programación III — Universidad Maimónides",
    summary:
      "Trabajo práctico de Programación III: maquetación con React, consumo de datos externos y deploy en Vercel.",
    description: [
      "Segundo trabajo práctico de la materia Programación III de la Universidad Maimónides.",
      "Maquetación con componentes en React y consumo de datos desde una API externa de películas (TMDB).",
    ],
    technologies: ["HTML", "CSS", "React", "Next.js"],
    date: "2025",
    cover: "/assets/logos/logotp2.svg",
    vercelUrl: "https://maimo-progra3-2025-tp2-cortese.vercel.app/",
    githubUrl: "https://github.com/nicocortese/maimo-progra3-2025-tp2-cortese",
    highlights: [
      { title: "Consumo de API", detail: "Datos externos con estados de carga y error." }
    ],
  },
];
