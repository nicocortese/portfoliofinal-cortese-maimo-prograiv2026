/* ------------------------------------------------------------------ */
/* SECCIONES DEL ÁLBUM (páginas 05 a 12)                               */
/* Cada sección tiene una intro (página izquierda) y sus figuritas     */
/* (página derecha). El "slug" conecta la figurita con el modal.       */
/* ------------------------------------------------------------------ */

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
  esBrillante?: boolean;
  slug: string;
}

export interface AlbumSection {
  id: string;
  indice: string;
  titulo: string;
  bajada: string;
  enfoques: string[];
  /** Imagen de la intro de la sección. */
  portada: string;
  figures: AlbumFigure[];
}

// --- PÁGINAS 05 · 06 · UX/UI ---
export const ALBUM_UXUI: AlbumSection = {
  id: "uxui",
  indice: "01",
  titulo: "UX / UI",
  bajada: "Interfaces pensadas desde la persona que las usa, del flujo al último detalle.",
  enfoques: ["Investigación y flujos", "Wireframes y prototipos", "Sistemas de diseño"],
  portada: "/assets/uxui.jpg",
  figures: [
    {
      numero: "12",
      titulo: "MyMusicDesk",
      slug: "mymusicdesk",
      descripcion:
        "Diseño de interfaz y usabilidad para una rocola en la sala de estar de la Universidad Maimónides: selección táctil, estados claros del sistema y una sección para artistas de la universidad.",
      imagen: "/assets/mymusicdesk.png",
      esBrillante: true,
      stats: [
        { label: "Categoría", value: "Rockola" },
        { label: "Año", value: "2026" },
        { label: "Herramientas", value: "Figma · UX" },
      ],
    },
    {
      numero: "13",
      titulo: "Tótem Universitario",
      slug: "totem-universitario",
      descripcion:
        "Interfaz de tótem para docentes de la Universidad Maimónides, centrada en la accesibilidad física y cognitiva con flujos de 1 a 2 minutos.",
      imagen: "/assets/mockuptotem.jpg",
      esBrillante: true,
      stats: [
        { label: "Categoría", value: "Tótem" },
        { label: "Año", value: "2025" },
        { label: "Herramientas", value: "Figma · Accesibilidad" },
      ],
    },
    {
      numero: "14",
      titulo: "Olympichub",
      slug: "olympichub",
      descripcion:
        "App de los Juegos Olímpicos para explorar atletas y disciplinas con buscadores, perfiles y un sistema de favoritos.",
      imagen: "/assets/oly.jpg",
      stats: [
        { label: "Categoría", value: "App móvil" },
        { label: "Año", value: "2024" },
        { label: "Herramientas", value: "Figma · Mobile UI" },
      ],
    },
  ],
};

// --- PÁGINAS 07 · 08 · DISEÑO GRÁFICO ---
export const ALBUM_DISENO: AlbumSection = {
  id: "diseno",
  indice: "02",
  titulo: "Diseño gráfico",
  bajada: "Identidad, piezas y sistemas visuales con criterio y coherencia de marca.",
  enfoques: ["Identidad visual", "Piezas gráficas", "Sistemas de marca"],
  portada: "/assets/disenografico.jpg",
  figures: [
    {
      numero: "15",
      titulo: "UmaiVerse",
      slug: "umaiverse",
      descripcion:
        "Sistema de identidad visual completo para un canal de streaming: concepto, público, moodboard, paleta, tipografía, logotipo y quince piezas aplicadas.",
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

// --- PÁGINAS 09 · 10 · VIDEO ---
export const ALBUM_VIDEO: AlbumSection = {
  id: "video",
  indice: "03",
  titulo: "Video",
  bajada: "Montaje, colorimetría y ritmo narrativo para piezas horizontales y verticales.",
  enfoques: ["Edición y montaje", "Color grading", "Piezas para redes"],
  portada: "/assets/ediciondevideos.jpg",
  figures: [
    {
      numero: "16",
      titulo: "Videoclip",
      slug: "videoclip",
      descripcion:
        "Edición y postproducción del videoclip de una artista emergente, con foco en colorimetría y color grading cinematográfico.",
      imagen: "/assets/postervideoclip.png",
      esBrillante: true,
      stats: [
        { label: "Formato", value: "Videoclip" },
        { label: "Rol", value: "Edición & Color" },
        { label: "Herramientas", value: "Premiere Pro" },
      ],
    },
    {
      numero: "17",
      titulo: "Spot Publicitario",
      slug: "spot-publicitario",
      descripcion:
        "Montaje y postproducción de un spot institucional y comercial: curaduría del material, estructura narrativa y ritmo de corte.",
      imagen: "/assets/posterpublicidad.png",
      stats: [
        { label: "Formato", value: "Comercial" },
        { label: "Cliente", value: "Maimónides · Rappi" },
        { label: "Herramientas", value: "Premiere Pro" },
      ],
    },
    {
      numero: "18",
      titulo: "Reels & Verticales",
      slug: "reels",
      descripcion:
        "Videos cortos para redes pensados para retener desde el primer segundo: cortes rítmicos, dinamismo visual y diseño sonoro.",
      imagen: "/assets/portada-reels.png",
      stats: [
        { label: "Formato", value: "9:16" },
        { label: "Piezas", value: "05" },
        { label: "Herramientas", value: "Premiere · After Effects" },
      ],
    },
  ],
};

// --- PÁGINAS 11 · 12 · REDES ---
export const ALBUM_REDES: AlbumSection = {
  id: "redes",
  indice: "04",
  titulo: "Redes",
  bajada: "Estrategia de comunicación visual y contenido que se ve bien y se entiende rápido.",
  enfoques: ["Línea gráfica", "Historias y publicaciones", "Piezas promocionales"],
  portada: "/assets/redessociales.jpg",
  figures: [
    {
      numero: "19",
      titulo: "Paseo Güemes Hotel",
      slug: "paseo-guemes",
      descripcion:
        "Línea gráfica para redes desarrollada desde cero sobre los colores, la tipografía y el logotipo del hotel, con piezas promocionales para impulsar ventas.",
      imagen: "/assets/logopaseoguemes.jpg",
      esBrillante: true,
      stats: [
        { label: "Categoría", value: "Instagram & Facebook" },
        { label: "Cliente", value: "Paseo Güemes" },
        { label: "Piezas", value: "17" },
      ],
    },
    {
      numero: "20",
      titulo: "Hotel Real Cafayate",
      slug: "real-cafayate",
      descripcion:
        "Evolución visual del contenido sobre una identidad preexistente: publicaciones, historias y promociones más modernas y alineadas a objetivos comerciales.",
      imagen: "/assets/logocafayate.png",
      stats: [
        { label: "Categoría", value: "Instagram & Facebook" },
        { label: "Cliente", value: "Real Cafayate" },
        { label: "Piezas", value: "16" },
      ],
    },
  ],
};

export const SECCIONES = [ALBUM_UXUI, ALBUM_DISENO, ALBUM_VIDEO, ALBUM_REDES];
