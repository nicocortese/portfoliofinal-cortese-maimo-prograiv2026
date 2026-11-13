export interface AlbumStat {
  label: string;
  value: string;
}

export interface AlbumFigure {
  numero: string;
  titulo: string;
  descripcion: string;
  stats: AlbumStat[];
  imagen?: string;
  ajusteImagen?: "cover" | "contain";
  link?: string;
  linkTexto?: string;
  esBrillante?: boolean;
  /** Conecta la figurita con el detalle que se muestra en el modal. */
  slug?: string;
}

export interface AlbumPageData {
  page: string;
  label: string;
  titulo: string;
  subtitulo: string;
  ruta: string;
  figures: AlbumFigure[];
}

export const DISCIPLINA_LINKS: { label: string; href: string }[] = [
  { label: "UX / UI", href: "#uxui" },
  { label: "Diseño Gráfico", href: "#diseno-grafico" },
  { label: "Audiovisual", href: "#video" },
  { label: "Redes Sociales", href: "#redes" },
];

// --- PÁGINA 03 · UX/UI ---
export const ALBUM_UXUI: AlbumPageData = {
  page: "05",
  label: "UX/UI",
  titulo: "UX/UI Design",
  subtitulo:
    "Interfaces, prototipado y sistemas de diseño pensados desde la usabilidad.",
  ruta: "#uxui",
  figures: [
    {
      numero: "11",
      titulo: "MyMusicDesk",
      slug: "mymusicdesk",
      descripcion:
        "Diseño de interfaz y usabilidad para una rocola en la sala de estar de la Universidad Maimónides. El foco estuvo en resolver la interacción en pantalla mediante selección táctil para moverse, claridad en los estados del sistema y una sección para visibilizar artistas de la universidad.",
      imagen: "/assets/mymusicdesk.png",
      esBrillante: true,
      stats: [
        { label: "Categoría", value: "Rockola" },
        { label: "Año", value: "2026" },
        { label: "Herramientas", value: "Figma · UX" },
      ],
    },
    {
      numero: "12",
      titulo: "Tótem Universitario",
      descripcion:
        "Diseño de interfaz de tótem para docentes de la Universidad Maimónides. El proyecto se centró en la accesibilidad física y cognitiva del usuario mediante botones de gran formato con alto contraste, una tipografía legible en diferentes distancias y una arquitectura de navegación reducida y directa, optimizada para flujos ágiles de interacción estimados entre 1 y 2 minutos por docente antes de iniciar su clase.",
      imagen: "/assets/mockuptotem.jpg",
      esBrillante: true,
      linkTexto: "VER PROTOTIPO",
      link: "https://www.figma.com/proto/CtvOtjeBKGaJFSsvzVImAa/Viaje-de-usuario-Cortese?node-id=292-4&viewport=304%2C327%2C0.08&t=aj6yLcyrhVVx22iF-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=292%3A4&page-id=289%3A2",
      stats: [
        { label: "Categoría", value: "Tótem interactivo" },
        { label: "Año", value: "2025" },
        { label: "Herramientas", value: "Figma · Accesibilidad" },
      ],
    },
    {
      numero: "13",
      titulo: "Olympichub",
      descripcion:
        "Diseño de una aplicación de los Juegos Olímpicos centrada en facilitar la exploración de atletas y disciplinas mediante buscadores, perfiles individuales, información deportiva y un sistema de favoritos para personalizar la experiencia del usuario en vivo.",
      imagen: "/assets/oly.jpg",
      linkTexto: "VER PROTOTIPO",
      link: "https://www.figma.com/proto/SZR5VNR5f0XBPUtUM2I7Cd/Proyecto-app?node-id=961-780&p=f&viewport=-1916%2C-865%2C0.28&t=pOanZjXnkiGy3wMb-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=961%3A780&page-id=788%3A29",
      stats: [
        { label: "Categoría", value: "App móvil" },
        { label: "Año", value: "2024" },
        { label: "Herramientas", value: "Figma · Mobile UI" },
      ],
    },
  ],
};

// --- PÁGINA 04 · DISEÑO GRÁFICO ---
export const ALBUM_DISENO: AlbumPageData = {
  page: "07",
  label: "Diseño Gráfico",
  titulo: "Diseño Gráfico",
  subtitulo:
    "Branding, identidad visual y composición aplicada a piezas reales.",
  ruta: "#diseno-grafico",
  figures: [
    {
      numero: "14",
      titulo: "UmaiVerse",
      slug: "umaiverse",
      descripcion:
        "Sistema de identidad visual completo para un canal de streaming: concepto, público objetivo, moodboard, paleta cromática, tipografía, logotipo y sus variantes, aplicado a afiches, folleto, volante y piezas para redes.",
      imagen: "/assets/posterumaiverse.jpg",
      esBrillante: true,
      stats: [
        { label: "Categoría", value: "Branding" },
        { label: "Entregables", value: "15 piezas" },
        { label: "Herramientas", value: "Illustrator · Photoshop" },
      ],
    },
  ],
};

// --- PÁGINA 05 · AUDIOVISUAL ---
export const ALBUM_VIDEO: AlbumPageData = {
  page: "09",
  label: "Audiovisual",
  titulo: "Edición de Video",
  subtitulo:
    "Montaje, colorimetría y ritmo narrativo para piezas horizontales y verticales.",
  ruta: "#video",
  figures: [
    {
      numero: "15",
      titulo: "Sesión Musical / Videoclip",
      descripcion:
        "Edición y postproducción para el videoclip oficial de una artista emergente independiente. Si bien formé parte de todo el proceso de montaje y ensamble visual de la pieza, mi foco principal estuvo en el tratamiento de colorimetría y color grading, buscando consolidar una atmósfera visual envolvente y cinematográfica acorde a la narrativa estética del tema musical.",
      imagen: "/assets/postervideoclip.png",
      esBrillante: true,
      link: "/videos/videoclipmejorado.mp4",
      linkTexto: "VER PIEZA",
      stats: [
        { label: "Formato", value: "Videoclip" },
        { label: "Rol", value: "Edición & Color" },
        { label: "Herramientas", value: "Premiere Pro" },
      ],
    },
    {
      numero: "16",
      titulo: "Spot Publicitario",
      descripcion:
        "Montaje y postproducción completa para spot publicitario institucional y comercial. Mi trabajo se centró en la curaduría y descarte de todo el material grabado, definiendo la estructura narrativa y el ritmo de corte de cada escena para construir una pieza ágil, contundente y alineada a los objetivos comunicacionales de la campaña.",
      imagen: "/assets/posterpublicidad.png",
      link: "/videos/publicidad.mp4",
      linkTexto: "VER PIEZA",
      stats: [
        { label: "Formato", value: "Comercial" },
        { label: "Cliente", value: "Maimónides · Rappi" },
        { label: "Herramientas", value: "Premiere Pro" },
      ],
    },
    {
      numero: "17",
      titulo: "Reels & Verticales",
      descripcion:
        "Edición y montaje de videos cortos para redes sociales, pensados para retener a la audiencia desde el primer segundo mediante cortes rítmicos, dinamismo visual y diseño sonoro.",
      stats: [
        { label: "Formato", value: "9:16" },
        { label: "Piezas", value: "05" },
        { label: "Herramientas", value: "Premiere · After Effects" },
      ],
    },
  ],
};

// --- PÁGINA 06 · REDES SOCIALES ---
export const ALBUM_REDES: AlbumPageData = {
  page: "11",
  label: "Redes Sociales",
  titulo: "Contenido Digital",
  subtitulo:
    "Estrategia de comunicación visual y producción de contenido integral.",
  ruta: "#redes",
  figures: [
    {
      numero: "18",
      titulo: "Paseo Güemes Hotel",
      descripcion:
        "Desarrollo desde cero de toda la línea gráfica para redes sociales, construyendo la identidad visual en base a los colores, la tipografía y el logotipo del hotel. Diseño de las publicaciones e historias, integrando piezas promocionales pensadas para impulsar las ventas y posicionar al hotel como el lugar ideal para hospedarse al visitar Salta, manteniendo un estilo visual atractivo y coherente en cada pieza.",
      imagen: "/assets/logopaseoguemes.jpg",
      ajusteImagen: "contain",
      esBrillante: true,
      link: "https://www.instagram.com/paseoguemeshotel/",
      linkTexto: "VER EN INSTAGRAM",
      stats: [
        { label: "Categoría", value: "Instagram & Facebook" },
        { label: "Cliente", value: "Paseo Güemes" },
        { label: "Piezas", value: "17" },
      ],
    },
    {
      numero: "19",
      titulo: "Hotel Real Cafayate",
      descripcion:
        "Diseño y evolución visual del contenido norteño, trabajando sobre una identidad gráfica preexistente. Tomé como base la paleta y el branding establecido del hotel para diseñar publicaciones, historias y piezas promocionales, renovando el estilo visual de las campañas para lograr piezas más atractivas, modernas y alineadas a los objetivos comerciales.",
      imagen: "/assets/logocafayate.png",
      ajusteImagen: "contain",
      link: "https://www.instagram.com/hotelrealcafayate/",
      linkTexto: "VER EN INSTAGRAM",
      stats: [
        { label: "Categoría", value: "Instagram & Facebook" },
        { label: "Cliente", value: "Real Cafayate" },
        { label: "Piezas", value: "16" },
      ],
    },
  ],
};
