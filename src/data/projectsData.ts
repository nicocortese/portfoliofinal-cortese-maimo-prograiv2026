export interface DetailedProject {
    slug: string;
    title: string;
    subtitle: string;
    category: 'Fullstack' | 'UI/UX' | 'Frontend' | 'Mobile';
    summary: string;
    description: string[]
    technologies: string[];
    date: string;
    coverImage: string;
    gallery: string[];
    githubUrl?: string;
    liveUrl?: string;
    highlights: { title: string; detail: string }[];
}

export const PROJECTS_DETAILS: Record<string, DetailedProject> = {
  "fixea-web": {
    slug: "fixea-web",
    title: "Fixea Web",
    subtitle: "Plataforma de automatización y seguimiento de proyectos multimedia",
    category: "Fullstack",
    summary: "Aplicación web en Next.js con extensión de Chrome para automatización de flujos de trabajo y tracking en tiempo real.",
    description: [
      "Fixea Web nació para resolver la fragmentación en la gestión de tareas de desarrollo y diseño multimedia.",
      "Integra un dashboard con métricas clave, sistema de autenticación seguro y conexión fluida mediante una extensión de navegador nativa."
    ],
    technologies: ["Next.js", "React", "Tailwind CSS", "Chrome API", "Node.js"],
    date: "2026",
    coverImage: "/assets/uxui/hero.webp", // Ajustá a tus assets reales
    gallery: ["/assets/uxui/screen1.webp", "/assets/uxui/screen2.webp"],
    githubUrl: "https://github.com/nicocortese/fixea-web",
    liveUrl: "https://fixea.vercel.app",
    highlights: [
      { title: "Extensión Chrome", detail: "Sincronización bidireccional en tiempo real." },
      { title: "UI/UX Optimizado", detail: "Interfaz ajustada a estándares WCAG 2.1 AA." }
    ]
  },
  "retro-kicks-frontend": {
    slug: "retro-kicks-frontend",
    title: "Retro Kicks",
    subtitle: "E-Commerce de zapatillas retro & cultura vintage",
    category: "Fullstack",
    summary: "Plataforma e-commerce completa con catálogo interactivo, carrito dinámico y checkout integrado.",
    description: [
      "Desarrollo e-commerce enfocado en la estética retro de los '80/'90 adaptada a una experiencia web moderna.",
      "Modelado de datos en MongoDB, API RESTful construida con Express y frontend responsivo de alto rendimiento."
    ],
    technologies: ["React", "Next.js", "Tailwind CSS", "Node.js", "MongoDB"],
    date: "2025 - 2026",
    coverImage: "/assets/uxui/retro-kicks-cover.webp",
    gallery: ["/assets/uxui/retro-kicks-1.webp"],
    githubUrl: "https://github.com/nicocortese/retro-kicks-frontend",
    highlights: [
      { title: "Custom Cart Engine", detail: "Manejo de estado persistente con almacenamiento local." }
    ]
  }
};