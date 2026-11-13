import { PROJECTS_DETAILS } from "./projectsData";

export interface ProyectoImagen {
  src: string;
  caption: string;
}

export interface ProyectoLink {
  label: string;
  href: string;
}

export interface ProyectoDetalle {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  client?: string;
  summary: string;
  description: string[];
  process: string[];
  technologies: string[];
  gallery: ProyectoImagen[];
  highlights: { title: string; detail: string }[];
  links?: ProyectoLink[];
}

const fixea = PROJECTS_DETAILS["fixea-web"];

const linksFixea: ProyectoLink[] = [
  ...(fixea.liveUrl
    ? [{ label: "Ver en vivo", href: fixea.liveUrl }]
    : []),
  ...(fixea.githubUrl
    ? [{ label: "Repositorio", href: fixea.githubUrl }]
    : []),
];

export const PROYECTOS_MODAL: Record<string, ProyectoDetalle> = {
  mymusicdesk: {
    slug: "mymusicdesk",
    title: "MyMusicDesk",
    subtitle:
      "Interfaz táctil para una rocola en la sala de estar de la Universidad Maimónides.",
    category: "UX/UI · Rockola",
    year: "2026",
    client: "Universidad Maimónides",
    summary:
      "Diseño de interfaz y usabilidad para una rocola universitaria, con foco en selección táctil, estados claros del sistema y visibilización de artistas de la casa de estudios.",
    description: [
      "MyMusicDesk es una rocola pensada para la sala de estar de la Universidad Maimónides. El desafío no era solo estético: había que resolver una interacción rápida, táctil y comprensible para estudiantes que pasan pocos minutos frente a la pantalla.",
      "El trabajo partió de un diagnóstico de uso y de una propuesta de valor clara. A partir de ahí construí la arquitectura de información, los flujos de navegación y un sistema visual con estados explícitos para que la persona siempre sepa qué está seleccionando, qué se está reproduciendo y cómo volver atrás.",
      "La interfaz incluye una sección dedicada a artistas de la universidad, con el objetivo de dar visibilidad a la producción local dentro de la experiencia cotidiana del campus.",
    ],
    process: [
      "Diagnóstico de uso y definición de la propuesta de valor.",
      "Arquitectura de información y mapa de navegación táctil.",
      "Sistema de diseño, tipografía y componentes de reproducción.",
      "Prototipo navegable y validación de estados del sistema.",
    ],
    technologies: [
      "Figma",
      "UX Research",
      "Arquitectura de Información",
      "UI Design",
      "Prototipado",
    ],
    gallery: [
      { src: "/assets/mymusicdesk.png", caption: "Interfaz principal" },
      { src: "/assets/diagnostico.png", caption: "Diagnóstico" },
      { src: "/assets/propuestadevalor.png", caption: "Propuesta de valor" },
      { src: "/assets/matrizdenorman.png", caption: "Matriz de Norman" },
      { src: "/assets/modelodenegocio.png", caption: "Modelo de negocio" },
      { src: "/assets/tipografia.png", caption: "Sistema tipográfico" },
      { src: "/assets/mockup.png", caption: "Mockup en contexto" },
    ],
    highlights: [
      {
        title: "Interacción táctil",
        detail: "Selección directa con botones de gran formato y feedback inmediato.",
      },
      {
        title: "Estados del sistema",
        detail: "Reproducción, pausa y selección siempre visibles para evitar errores.",
      },
      {
        title: "Artistas UMAI",
        detail: "Sección para visibilizar la producción musical de la universidad.",
      },
    ],
    links: [
      {
        label: "Abrir prototipo en Figma",
        href: "https://www.figma.com/proto/XF40qUl2SrIovN4wEmif9L/Mapa-conceptual-rockola-Cortese---Motta?node-id=206-827&viewport=354%2C127%2C0.05&t=ZtK5lbfvNkDh2xjz-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=206%3A827&page-id=187%3A734",
      },
    ],
  },

  umaiverse: {
    slug: "umaiverse",
    title: "UmaiVerse",
    subtitle:
      "Sistema de identidad visual completo para un canal de streaming universitario.",
    category: "Diseño Gráfico · Branding",
    year: "2026",
    client: "Universidad Maimónides",
    summary:
      "Identidad visual de punta a punta: concepto, público, moodboard, paleta, tipografía, logotipo y aplicaciones en afiches, folleto, volante y redes.",
    description: [
      "UmaiVerse es un canal de streaming con una personalidad joven, curiosa y cultural. El proyecto consistió en construir una identidad visual completa capaz de sostener esa personalidad en pantalla y en piezas impresas.",
      "El proceso arrancó con la definición del público objetivo, el concepto y un moodboard que fijó el tono visual. Sobre esa base construí el sistema cromático, la tipografía, el logotipo y sus variantes de uso.",
      "La identidad se aplicó a un ecosistema de quince piezas: afiches, folleto, volante y contenido para redes. El objetivo fue que cualquier pieza se reconociera como parte del mismo universo, incluso antes de leer el nombre del canal.",
    ],
    process: [
      "Definición de público objetivo y concepto de marca.",
      "Moodboard, paleta cromática y exploración tipográfica.",
      "Construcción del logotipo, variantes y usos correctos.",
      "Aplicación del sistema a quince piezas gráficas y digitales.",
    ],
    technologies: [
      "Illustrator",
      "Photoshop",
      "Branding",
      "Dirección de Arte",
      "Diseño Editorial",
    ],
    gallery: [
      { src: "/assets/identidadumaiverse.jpg", caption: "Identidad" },
      { src: "/assets/sloganumaiverse.jpg", caption: "Slogan" },
      { src: "/assets/palabrasumaiverse.jpg", caption: "Palabras clave" },
      { src: "/assets/publicoumaiverse.jpg", caption: "Público objetivo" },
      { src: "/assets/conceptoumaiverse.jpg", caption: "Concepto" },
      { src: "/assets/moodboardumaiverse.jpg", caption: "Moodboard" },
      { src: "/assets/identidadvisualumaiverse.jpg", caption: "Identidad visual" },
      { src: "/assets/logoumaiverse.jpg", caption: "Logotipo" },
      { src: "/assets/variantesumaiverse.jpg", caption: "Variantes del logo" },
      { src: "/assets/paletaumaiverse.jpg", caption: "Paleta cromática" },
      { src: "/assets/tipografiaumiaverse.jpg", caption: "Tipografía" },
      { src: "/assets/afichesumaiverse.jpg", caption: "Afiches" },
      { src: "/assets/folletoumaiverse.jpg", caption: "Folleto" },
      { src: "/assets/volanteumaiverse.jpg", caption: "Volante" },
      { src: "/assets/rsumaiverse.jpg", caption: "Redes sociales" },
    ],
    highlights: [
      {
        title: "Sistema completo",
        detail: "Logotipo, variantes, paleta, tipografía y reglas de uso.",
      },
      {
        title: "Quince piezas",
        detail: "Aplicaciones impresas y digitales con una misma lógica visual.",
      },
      {
        title: "Coherencia",
        detail: "Cada pieza se reconoce como parte del universo UmaiVerse.",
      },
    ],
  },

  "fixea-web": {
    slug: "fixea-web",
    title: fixea.title,
    subtitle: fixea.subtitle,
    category: fixea.category,
    year: fixea.date,
    client: "Proyecto propio",
    summary: fixea.summary,
    description: [
      ...fixea.description,
      "El frontend prioriza claridad operativa: un dashboard con métricas accionables, navegación simple y componentes reutilizables. La extensión de Chrome se comunica con la aplicación para sincronizar el estado de las tareas sin salir del flujo de trabajo.",
      "El proyecto me permitió trabajar de punta a punta: modelo de datos, API, autenticación, interfaz y experiencia de uso. El foco estuvo puesto en que la herramienta se sienta rápida y no agregue fricción al trabajo diario.",
    ],
    process: [
      "Definición del problema y del flujo de trabajo a automatizar.",
      "Modelado de datos, API y sistema de autenticación.",
      "Diseño de dashboard, componentes y estados de carga.",
      "Integración con la extensión de Chrome y deploy en Vercel.",
    ],
    technologies: fixea.technologies,
    // Reemplazar por capturas reales de Fixea cuando estén disponibles.
    gallery: [
      { src: "/assets/hero.png", caption: "Vista general del producto" },
      { src: "/assets/mockup.png", caption: "Interfaz en contexto" },
      { src: "/assets/uxui.jpg", caption: "Sistema de diseño y componentes" },
    ],
    highlights: fixea.highlights,
    links: linksFixea,
  },
};

export function obtenerProyecto(slug: string): ProyectoDetalle | null {
  return PROYECTOS_MODAL[slug] ?? null;
}
