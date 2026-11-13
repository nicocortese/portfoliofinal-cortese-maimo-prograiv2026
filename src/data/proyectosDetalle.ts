import { FRONTEND_PROJECTS } from "./projectsData";

/* ------------------------------------------------------------------ */
/* DETALLE DE PROYECTOS PARA EL MODAL                                  */
/* La galería acepta imágenes y videos: si "tipo" es "video", el modal */
/* muestra un <video controls> nativo para reproducir y pausar.        */
/* ------------------------------------------------------------------ */

export interface ProyectoMedia {
  src: string;
  caption: string;
  tipo?: "imagen" | "video";
  /** Imagen que se ve antes de darle play al video. */
  poster?: string;
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
  year?: string;
  client?: string;
  description: string[];
  process: string[];
  technologies: string[];
  gallery: ProyectoMedia[];
  highlights: { title: string; detail: string }[];
  /** Prototipos, sitios en vivo, repositorios. */
  links?: ProyectoLink[];
  /** Perfiles de redes sociales del proyecto o del cliente. */
  redes?: ProyectoLink[];
}

/* Arma la galería de un hotel a partir de los nombres de archivo. */
const piezas = (archivos: string[], caption: string): ProyectoMedia[] =>
  archivos.map((archivo, i) => ({
    src: `/assets/${archivo}`,
    caption: `${caption} ${String(i + 1).padStart(2, "0")}`,
  }));

const PROYECTOS_DISENO: ProyectoDetalle[] = [
  {
    slug: "mymusicdesk",
    title: "MyMusicDesk",
    subtitle: "Interfaz táctil para una rocola en la sala de estar de la Universidad Maimónides.",
    category: "UX/UI · Rockola",
    year: "2026",
    client: "Universidad Maimónides",
    description: [
      "Diseño de interfaz y usabilidad para una rocola en la sala de estar de la Universidad Maimónides. El foco estuvo en resolver la interacción en pantalla mediante selección táctil para moverse, claridad en los estados del sistema y una sección para visibilizar artistas de la universidad.",
      "El trabajo partió de un diagnóstico de uso y de una propuesta de valor clara. A partir de ahí construí la arquitectura de información, los flujos de navegación y un sistema visual con estados explícitos.",
    ],
    process: [
      "Diagnóstico de uso y definición de la propuesta de valor.",
      "Arquitectura de información y mapa de navegación táctil.",
      "Sistema de diseño, tipografía y componentes de reproducción.",
      "Prototipo navegable y validación de estados del sistema.",
    ],
    technologies: ["Figma", "UX Research", "Arquitectura de Información", "UI Design", "Prototipado"],
    gallery: [
      { src: "/assets/mymusicdesk.png", caption: "Interfaz principal" },
      { src: "/assets/diagnostico.png", caption: "Diagnóstico" },
      { src: "/assets/propuestadevalor.png", caption: "Propuesta de valor" },
      { src: "/assets/matrizdenorman.png", caption: "Matriz de Norman" },
      { src: "/assets/modelodenegocio.png", caption: "Modelo de negocio" },
      { src: "/assets/sistemadediseño.png", caption: "Sistema de diseño" },
      { src: "/assets/tipografia.png", caption: "Sistema tipográfico" },
      { src: "/assets/mockup.png", caption: "Mockup en contexto" },
    ],
    highlights: [
      { title: "Interacción táctil", detail: "Selección directa con botones de gran formato y feedback inmediato." },
      { title: "Estados del sistema", detail: "Reproducción, pausa y selección siempre visibles." },
      { title: "Artistas UMAI", detail: "Sección para visibilizar la producción musical de la universidad." },
    ],
    links: [
      {
        label: "Abrir prototipo en Figma",
        href: "https://www.figma.com/proto/XF40qUl2SrIovN4wEmif9L/Mapa-conceptual-rockola-Cortese---Motta?node-id=206-827&viewport=354%2C127%2C0.05&t=ZtK5lbfvNkDh2xjz-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=206%3A827&page-id=187%3A734",
      },
    ],
  },
  {
    slug: "totem-universitario",
    title: "Tótem Universitario",
    subtitle: "Tótem digital para docentes de la Universidad Maimónides.",
    category: "UX/UI · Tótem interactivo",
    year: "2025",
    client: "Universidad Maimónides",
    description: [
      "Diseño de interfaz de tótem para docentes de la Universidad Maimónides. El proyecto se centró en la accesibilidad física y cognitiva del usuario mediante botones de gran formato con alto contraste, una tipografía legible en diferentes distancias y una arquitectura de navegación reducida y directa.",
      "Los flujos de interacción están optimizados para durar entre 1 y 2 minutos por docente antes de iniciar su clase.",
    ],
    process: [
      "Morfología y accesibilidad física del tótem.",
      "Wireframes en baja fidelidad del flujo docente.",
      "MVP y validación del estado del aula.",
      "Identidad visual: paleta y sistema tipográfico.",
      "Testeo con usuario ideal.",
    ],
    technologies: ["Figma", "Accesibilidad", "Wireframing", "Prototipado", "Testeo de usuarios"],
    gallery: [
      { src: "/assets/mockuptotem.jpg", caption: "Mockup del tótem" },
      { src: "/assets/uxui.jpg", caption: "Tótem digital para docentes" },
      { src: "/assets/morfologia.jpg", caption: "Morfología y accesibilidad" },
      { src: "/assets/wireframeenbaja.jpg", caption: "Wireframes" },
      { src: "/assets/mvp.jpg", caption: "MVP" },
      { src: "/assets/paleta.jpg", caption: "Paleta de colores" },
      { src: "/assets/tipografia.jpg", caption: "Sistema tipográfico" },
      { src: "/assets/testeousuario.jpg", caption: "Testeo con usuario" },
    ],
    highlights: [
      { title: "Alto contraste", detail: "Botones de gran formato legibles a distintas distancias." },
      { title: "Flujos cortos", detail: "Entre 1 y 2 minutos por docente antes de la clase." },
    ],
    links: [
      {
        label: "Ver prototipo",
        href: "https://www.figma.com/proto/CtvOtjeBKGaJFSsvzVImAa/Viaje-de-usuario-Cortese?node-id=292-4&viewport=304%2C327%2C0.08&t=aj6yLcyrhVVx22iF-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=292%3A4&page-id=289%3A2",
      },
    ],
  },
  {
    slug: "olympichub",
    title: "Olympichub",
    subtitle: "App de los Juegos Olímpicos para seguir atletas y disciplinas.",
    category: "UX/UI · App móvil",
    year: "2024",
    description: [
      "Diseño de una aplicación de los Juegos Olímpicos centrada en facilitar la exploración de atletas y disciplinas mediante buscadores, perfiles individuales, información deportiva y un sistema de favoritos para personalizar la experiencia del usuario en vivo.",
    ],
    process: [
      "Identidad de la marca: misión, visión y valores.",
      "Paleta, tipografía y usos correctos del logo.",
      "Diseño de pantallas y sistema de favoritos.",
      "Prototipo navegable en Figma.",
    ],
    technologies: ["Figma", "Mobile UI", "Branding", "Prototipado"],
    gallery: [
      { src: "/assets/oly.jpg", caption: "Olympichub" },
      { src: "/assets/jjooapp.png", caption: "La app de los Juegos Olímpicos" },
      { src: "/assets/identidad.png", caption: "Identidad de la marca" },
      { src: "/assets/identidad2.png", caption: "Valores" },
      { src: "/assets/paletaoly.png", caption: "Paleta" },
      { src: "/assets/tipografiaoly.png", caption: "Tipografía" },
      { src: "/assets/usoscorrectos.png", caption: "Usos correctos" },
    ],
    highlights: [
      { title: "Buscadores", detail: "Atletas y disciplinas a un toque de distancia." },
      { title: "Favoritos", detail: "Una experiencia personalizada para seguir los juegos en vivo." },
    ],
    links: [
      {
        label: "Ver prototipo",
        href: "https://www.figma.com/proto/SZR5VNR5f0XBPUtUM2I7Cd/Proyecto-app?node-id=961-780&p=f&viewport=-1916%2C-865%2C0.28&t=pOanZjXnkiGy3wMb-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=961%3A780&page-id=788%3A29",
      },
    ],
  },
  {
    slug: "umaiverse",
    title: "UmaiVerse",
    subtitle: "Sistema de identidad visual completo para un canal de streaming universitario.",
    category: "Diseño Gráfico · Branding",
    year: "2026",
    client: "Universidad Maimónides",
    description: [
      "Sistema de identidad visual completo para un canal de streaming: concepto, público objetivo, moodboard, paleta cromática, tipografía, logotipo y sus variantes, aplicado a afiches, folleto, volante y piezas para redes.",
      "El objetivo fue que cualquier pieza se reconociera como parte del mismo universo, incluso antes de leer el nombre del canal.",
    ],
    process: [
      "Definición de público objetivo y concepto de marca.",
      "Moodboard, paleta cromática y exploración tipográfica.",
      "Construcción del logotipo, variantes y usos correctos.",
      "Aplicación del sistema a quince piezas gráficas y digitales.",
    ],
    technologies: ["Illustrator", "Photoshop", "Branding", "Dirección de Arte"],
    gallery: [
      { src: "/assets/posterumaiverse.jpg", caption: "Afiche principal" },
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
      { title: "Sistema completo", detail: "Logotipo, variantes, paleta, tipografía y reglas de uso." },
      { title: "Quince piezas", detail: "Aplicaciones impresas y digitales con una misma lógica visual." },
    ],
  },
  {
    slug: "videoclip",
    title: "Videoclip",
    subtitle: "Videoclip oficial de una artista emergente independiente.",
    category: "Video · Edición y color",
    description: [
      "Edición y postproducción para el videoclip oficial de una artista emergente independiente. Si bien formé parte de todo el proceso de montaje y ensamble visual de la pieza, mi foco principal estuvo en el tratamiento de colorimetría y color grading, buscando consolidar una atmósfera visual envolvente y cinematográfica acorde a la narrativa estética del tema musical.",
    ],
    process: [
      "Selección y ordenamiento del material grabado.",
      "Montaje sobre el ritmo del tema.",
      "Corrección de color y color grading cinematográfico.",
      "Exportación final para plataformas.",
    ],
    technologies: ["Premiere Pro", "Color grading", "Montaje"],
    gallery: [
      {
        src: "/videos/videoclipmejorado.mp4",
        caption: "Videoclip completo",
        tipo: "video",
        poster: "/assets/postervideoclip.png",
      },
    ],
    highlights: [
      { title: "Color grading", detail: "Atmósfera envolvente y cinematográfica." },
      { title: "Montaje", detail: "Ensamble visual acompañando la narrativa del tema." },
    ],
  },
  {
    slug: "spot-publicitario",
    title: "Spot Publicitario",
    subtitle: "Spot institucional y comercial.",
    category: "Video · Publicidad",
    client: "Maimónides · Rappi",
    description: [
      "Montaje y postproducción completa para spot publicitario institucional y comercial. Mi trabajo se centró en la curaduría y descarte de todo el material grabado, definiendo la estructura narrativa y el ritmo de corte de cada escena para construir una pieza ágil, contundente y alineada a los objetivos comunicacionales de la campaña.",
    ],
    process: [
      "Curaduría y descarte del material grabado.",
      "Estructura narrativa del spot.",
      "Ritmo de corte por escena.",
      "Postproducción y entrega final.",
    ],
    technologies: ["Premiere Pro", "Montaje", "Postproducción"],
    gallery: [
      {
        src: "/videos/publicidad.mp4",
        caption: "Spot publicitario",
        tipo: "video",
        poster: "/assets/posterpublicidad.png",
      },
    ],
    highlights: [
      { title: "Ritmo", detail: "Una pieza ágil y contundente." },
      { title: "Objetivos", detail: "Alineada a la comunicación de la campaña." },
    ],
  },
  {
    slug: "reels",
    title: "Reels & Verticales",
    subtitle: "Videos cortos en 9:16 para redes sociales.",
    category: "Video · Redes",
    description: [
      "Edición y montaje de videos cortos para redes sociales, pensados para retener a la audiencia desde el primer segundo mediante cortes rítmicos, dinamismo visual y diseño sonoro.",
    ],
    process: [
      "Gancho en el primer segundo.",
      "Cortes rítmicos sincronizados con el audio.",
      "Textos y gráficos en movimiento.",
      "Exportación vertical optimizada para cada red.",
    ],
    technologies: ["Premiere Pro", "After Effects", "Diseño sonoro"],
    gallery: [
      { src: "/videos/reel.mp4", caption: "Reel", tipo: "video" },
      { src: "/videos/reelchacadeco.mp4", caption: "Chacadeco", tipo: "video" },
      { src: "/videos/reelcomida.mp4", caption: "Comida", tipo: "video" },
      { src: "/videos/reelgatostubbs.mp4", caption: "Gatos Tubbs", tipo: "video" },
      { src: "/videos/reelguerradelemu.mp4", caption: "La guerra del emú", tipo: "video" },
    ],
    highlights: [
      { title: "Retención", detail: "Pensados para enganchar desde el primer segundo." },
      { title: "Formato 9:16", detail: "Cinco piezas verticales para Reels, TikTok y Shorts." },
    ],
  },
  {
    slug: "paseo-guemes",
    title: "Paseo Güemes Hotel",
    subtitle: "Línea gráfica para redes sociales desarrollada desde cero.",
    category: "Redes · Contenido digital",
    client: "Paseo Güemes Hotel",
    description: [
      "Desarrollo desde cero de toda la línea gráfica para redes sociales, construyendo la identidad visual en base a los colores, la tipografía y el logotipo del hotel.",
      "Diseño de las publicaciones e historias, integrando piezas promocionales pensadas para impulsar las ventas y posicionar al hotel como el lugar ideal para hospedarse al visitar Salta, manteniendo un estilo visual atractivo y coherente en cada pieza.",
    ],
    process: [
      "Relevamiento de la marca: colores, tipografía y logotipo.",
      "Construcción de la línea gráfica para redes.",
      "Historias, carruseles y publicaciones.",
      "Piezas promocionales orientadas a ventas.",
    ],
    technologies: ["Photoshop", "Illustrator", "Instagram", "Facebook"],
    gallery: piezas(
      [
        "carrusel1.jpg",
        "carrusel2.jpg",
        "carrusel3.jpg",
        "carrusel4.jpg",
        "Story39.jpg",
        "story218.jpg",
        "story48.jpg",
        "story55.png",
        "story771.jpg",
        "story772.jpg",
        "story773.jpg",
        "storydesfile.png",
        "promomarzo.png",
        "promomayo.png",
        "Promoestadia.png",
        "Promocióntodoslosbancos.jpg",
      ],
      "Pieza",
    ),
    highlights: [
      { title: "17 piezas", detail: "Publicaciones, historias y promociones." },
      { title: "Desde cero", detail: "Toda la línea gráfica construida sobre la marca." },
    ],
    redes: [
      { label: "Instagram", href: "https://www.instagram.com/paseoguemeshotel/" },
      { label: "Facebook", href: "" /* URL_FACEBOOK_AQUI */ },
    ],
  },
  {
    slug: "real-cafayate",
    title: "Hotel Real Cafayate",
    subtitle: "Evolución visual del contenido sobre una identidad preexistente.",
    category: "Redes · Contenido digital",
    year: "2024 – 2025",
    client: "Hotel Real Cafayate",
    description: [
      "Diseño y evolución visual del contenido norteño, trabajando sobre una identidad gráfica preexistente.",
      "Tomé como base la paleta y el branding establecido del hotel para diseñar publicaciones, historias y piezas promocionales, renovando el estilo visual de las campañas para lograr piezas más atractivas, modernas y alineadas a los objetivos comerciales. Incrementé un 25,81% el alcance y la comunidad.",
    ],
    process: [
      "Análisis de la identidad existente.",
      "Renovación del estilo visual de las campañas.",
      "Historias, carruseles y promociones semanales.",
      "Seguimiento de alcance y comunidad.",
    ],
    technologies: ["Photoshop", "Illustrator", "Premiere Pro", "Instagram", "Facebook"],
    gallery: piezas(
      [
        "carrusel771.jpg",
        "carrusel772.jpg",
        "carrusel773.jpg",
        "promoagosto.jpg",
        "publi177.jpg",
        "storie39hrc.jpg",
        "story107.jpg",
        "story118.jpg",
        "story19.jpg",
        "story2171.jpg",
        "story2172.jpg",
        "story2173.jpg",
        "story2174.jpg",
        "story481.jpg",
        "story482.jpg",
        "story483.jpg",
        "story89.jpg",
      ],
      "Pieza",
    ),
    highlights: [
      { title: "+25,81%", detail: "De alcance y comunidad." },
      { title: "16 piezas", detail: "Publicaciones, historias y promociones." },
    ],
    redes: [
      { label: "Instagram", href: "https://www.instagram.com/hotelrealcafayate/" },
      { label: "Facebook", href: "" /* URL_FACEBOOK_AQUI */ },
    ],
  },
];

/* Los proyectos frontend se arman desde projectsData. */
const PROYECTOS_FRONTEND: ProyectoDetalle[] = FRONTEND_PROJECTS.map((p) => ({
  slug: p.slug,
  title: p.title,
  subtitle: p.subtitle,
  category: "Frontend",
  year: p.date,
  description: p.description,
  process: [
    "Definición del problema y del flujo principal.",
    "Diseño de componentes y estados de carga.",
    "Desarrollo y consumo de datos.",
    "Deploy en Vercel.",
  ],
  technologies: p.technologies,
  gallery: p.cover ? [{ src: p.cover, caption: p.title }] : [],
  highlights: p.highlights,
  links: [
    ...(p.vercelUrl ? [{ label: "Ver en Vercel", href: p.vercelUrl }] : []),
    { label: "Código en GitHub", href: p.githubUrl },
  ],
}));

export const PROYECTOS_MODAL: Record<string, ProyectoDetalle> = Object.fromEntries(
  [...PROYECTOS_DISENO, ...PROYECTOS_FRONTEND].map((p) => [p.slug, p]),
);

export function obtenerProyecto(slug: string): ProyectoDetalle | null {
  return PROYECTOS_MODAL[slug] ?? null;
}
