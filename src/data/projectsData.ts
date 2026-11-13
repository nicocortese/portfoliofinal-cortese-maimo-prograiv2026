/* ------------------------------------------------------------------ */
/* PROYECTOS FRONTEND (páginas 13 · 14)                                */
/* Se combinan con la API de GitHub: si el repo tiene "homepage"       */
/* (el link de Vercel), se usa ese; si no, el vercelUrl de acá.        */
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
  /** Portada gráfica. Vacío = se muestra una portada tipográfica. */
  cover: string;
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
    subtitle: "Plataforma de automatización y seguimiento de proyectos multimedia",
    summary:
      "Aplicación web en Next.js con extensión de Chrome para automatizar flujos de trabajo y hacer tracking en tiempo real.",
    description: [
      "Fixea nació para resolver la fragmentación en la gestión de tareas de desarrollo y diseño multimedia.",
      "Integra un dashboard con métricas clave, autenticación segura y conexión fluida mediante una extensión de navegador nativa.",
    ],
    technologies: ["Next.js", "React", "Tailwind CSS", "Chrome API", "Node.js"],
    date: "2026",
    cover: "" /* RUTA_IMAGEN_AQUI: /assets/frontend/fixea.jpg */,
    vercelUrl: "https://fixea.vercel.app",
    githubUrl: "https://github.com/nicocortese/fixea-web",
    highlights: [
      { title: "Extensión Chrome", detail: "Sincronización bidireccional en tiempo real." },
      { title: "UI accesible", detail: "Interfaz ajustada a estándares WCAG 2.1 AA." },
    ],
  },
  {
    slug: "retro-kicks",
    repo: "retro-kicks-frontend",
    title: "Retro Kicks",
    subtitle: "E-commerce de zapatillas retro y cultura vintage",
    summary:
      "E-commerce con catálogo interactivo, carrito dinámico y checkout integrado, con estética de los '80 y '90.",
    description: [
      "Desarrollo e-commerce enfocado en la estética retro de los '80/'90 adaptada a una experiencia web moderna.",
      "Modelado de datos en MongoDB, API REST con Express y frontend responsivo de alto rendimiento.",
    ],
    technologies: ["React", "Next.js", "Tailwind CSS", "Node.js", "MongoDB"],
    date: "2025 – 2026",
    cover: "" /* RUTA_IMAGEN_AQUI: /assets/frontend/retro-kicks.jpg */,
    vercelUrl: "" /* URL_VERCEL_AQUI */,
    githubUrl: "https://github.com/nicocortese/retro-kicks-frontend",
    highlights: [
      { title: "Carrito propio", detail: "Estado persistente con almacenamiento local." },
    ],
  },
  {
    slug: "progra3-tp-final",
    repo: "maimo-progra3-2025-tpfinalfrontend-cortese",
    title: "TP Final · Progra III",
    subtitle: "Trabajo final de Programación III — Universidad Maimónides",
    summary:
      "Frontend del trabajo final de Programación III: consumo de API propia, rutas dinámicas y componentes reutilizables.",
    description: [
      "Trabajo final de la materia Programación III de la Universidad Maimónides.",
      "Frontend conectado a una API propia, con rutas dinámicas, estados de carga y componentes reutilizables.",
    ],
    technologies: ["Next.js", "React", "Tailwind CSS"],
    date: "2025",
    cover: "" /* RUTA_IMAGEN_AQUI: /assets/frontend/progra3-final.jpg */,
    vercelUrl: "" /* URL_VERCEL_AQUI */,
    githubUrl: "https://github.com/nicocortese/maimo-progra3-2025-tpfinalfrontend-cortese",
    highlights: [{ title: "API propia", detail: "Frontend y backend desarrollados de punta a punta." }],
  },
  {
    slug: "progra3-tp2",
    repo: "maimo-progra3-2025-tp2-cortese",
    title: "TP2 · Progra III",
    subtitle: "Trabajo práctico 2 de Programación III — Universidad Maimónides",
    summary:
      "Trabajo práctico de Programación III: maquetación con React, consumo de datos externos y deploy en Vercel.",
    description: [
      "Segundo trabajo práctico de la materia Programación III de la Universidad Maimónides.",
      "Maquetación con componentes en React y consumo de datos desde una API externa.",
    ],
    technologies: ["React", "Next.js", "CSS"],
    date: "2025",
    cover: "" /* RUTA_IMAGEN_AQUI: /assets/frontend/progra3-tp2.jpg */,
    vercelUrl: "" /* URL_VERCEL_AQUI */,
    githubUrl: "https://github.com/nicocortese/maimo-progra3-2025-tp2-cortese",
    highlights: [{ title: "Consumo de API", detail: "Datos externos con estados de carga y error." }],
  },
  {
    slug: "album-2026",
    repo: "portfoliofinal-cortese-maimo-prograiv2026",
    title: "Álbum 2026",
    subtitle: "Este portfolio: un álbum de figuritas interactivo",
    summary:
      "Portfolio en Astro + React con un libro que se hojea, figuritas que se dan vuelta, clima en vivo y la API de GitHub.",
    description: [
      "Trabajo final de Programación IV: el portfolio convertido en un álbum de figuritas que se hojea página por página.",
      "Astro genera la base estática y React se encarga de la interacción: el libro, las figuritas, el modal de proyectos y el clima en tiempo real.",
    ],
    technologies: ["Astro", "React", "TypeScript", "Tailwind CSS", "react-pageflip"],
    date: "2026",
    cover: "" /* RUTA_IMAGEN_AQUI: /assets/frontend/album-2026.jpg */,
    vercelUrl: "https://cortese-portfolio-2026.vercel.app/",
    githubUrl: "https://github.com/nicocortese/portfoliofinal-cortese-maimo-prograiv2026",
    highlights: [
      { title: "Libro interactivo", detail: "16 páginas que se pasan con mouse, teclado o botones." },
      { title: "Datos en vivo", detail: "Clima en tiempo real y repositorios desde la API de GitHub." },
    ],
  },
];
