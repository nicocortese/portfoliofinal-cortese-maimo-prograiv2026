/* ------------------------------------------------------------------ */
/* SECCIONES DEL ÁLBUM:
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
  fondoOscuro?: boolean;
  imagenLlena?: boolean;
  ajustePortada?: "cover" | "contain";
  posicionPortada?: string;
  portadaCompleta?: boolean;
  slug: string;
}

export interface AlbumSection {
  id: string;
  indice: string;
  titulo: string;
  bajada: string;
  enfoques: string[];
  portada: string;
  figures: AlbumFigure[];
}

// --- PÁGINAS 05 - 06 ---
export const ALBUM_UXUI: AlbumSection = {
  id: "uxui",
  indice: "01",
  titulo: "UX / UI",
  bajada: "Diseño de productos digitales, wireframing interactivo, sistemas de diseño escalables y flujos de usuario optimizados para conversión.",
  enfoques: ["Figma", "Experiencia de Usuario", "Design Systems", "Wireframing", "User Research", "Prototipado"],
  portada: "/assets/uxui.jpg",
  figures: [
    {
      numero: "12",
      titulo: "MyMusicDesk",
      slug: "mymusicdesk",
      descripcion:
        "Diseño de interfaz y usabilidad para una rocola en la sala de estar de la Universidad Maimónides. El foco estuvo en resolver la interacción en pantalla mediante selección táctil para moverse, claridad en los estados del sistema y una sección para visibilizar artistas de la universidad.",
      imagen: "/assets/mymusicdesk.png",
      esBrillante: true,
      stats: [
        { label: "Categoría", value: "Rockola" },
        { label: "Año", value: "2026" },
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
      ],
    },
  ],
};

// --- PÁGINAS 07 - 08---
export const ALBUM_DISENO: AlbumSection = {
  id: "diseno",
  indice: "02",
  titulo: "Diseño gráfico",
  bajada: "Sistemas de identidad visual integral para canales de streaming (UmaiVerse), series de afiches deportivos y fotocomposición hiperrealista.",
  enfoques: ["Photoshop", "Illustrator", "Identidad visual", "Piezas gráficas", "Branding", "Posters", "Composición"],
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
      ],
    },
  ],
};

// --- PÁGINAS 09 - 10 ---
export const ALBUM_VIDEO: AlbumSection = {
  id: "video",
  indice: "03",
  titulo: "Video",
  bajada: "Montaje de reels de alto impacto para retención en redes, videoclips musicales con tratamiento de colorimetría y spots comerciales.",
  enfoques: ["Premiere Pro", "Edición y montaje", "Color grading", "Reels", "Producciones"],
  portada: "/assets/ediciondevideos.jpg",
  figures: [
    {
      numero: "16",
      titulo: "Videoclip",
      slug: "videoclip",
      descripcion:
        "Edición y postproducción del videoclip de una artista emergente, con foco en colorimetría y color grading cinematográfico.",
      imagen: "/assets/postervideoclip.png",
      portadaCompleta: true,
      esBrillante: true,
      stats: [
        { label: "Formato", value: "Videoclip" },
        { label: "Rol", value: "Edición & Color" },
      ],
    },
    {
      numero: "17",
      titulo: "Spot Publicitario",
      slug: "spot-publicitario",
      descripcion:
        "Montaje y postproducción de un spot institucional y comercial: curaduría del material, estructura narrativa y ritmo de corte.",
      imagen: "/assets/posterpublicidad.png",
      portadaCompleta: true,
      stats: [
        { label: "Formato", value: "Comercial" },
        { label: "Cliente", value: "Universidad Maimónides x Rappi" },
      ],
    },
    {
      numero: "18",
      titulo: "Reels (9:16)",
      slug: "reels",
      descripcion:
        "Videos cortos para redes pensados para retener desde el primer segundo: cortes rítmicos, dinamismo visual y diseño sonoro.",
      imagen: "/assets/portada-reels.png",
      portadaCompleta: true,
      posicionPortada: "100% 50%",
      stats: [
        { label: "Formato", value: "9:16" },
        { label: "Piezas", value: "05" },
      ],
    },
  ],
};

// --- PÁGINAS 11 - 12--
export const ALBUM_REDES: AlbumSection = {
  id: "redes",
  indice: "04",
  titulo: "Redes",
  bajada: "Estrategia de comunicación visual y producción de contenido integral orientado a identidad de marca, hotelería y gastronomía.",
  enfoques: ["Social Media", "Instagram", "Facebook", "Estrategia", "Campañas", "Identidad"],
  portada: "/assets/redessociales.jpg",
  figures: [
    {
      numero: "19",
      titulo: "Paseo Güemes Hotel",
      slug: "paseo-guemes",
      descripcion:
        "Línea gráfica para redes desarrollada desde cero sobre los colores, la tipografía y el logotipo del hotel, con piezas promocionales para impulsar ventas.",
      imagen: "/assets/logopaseoguemes.jpg",
      imagenLlena: true,
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
      fondoOscuro: true,
      ajustePortada: "contain",
      stats: [
        { label: "Categoría", value: "Instagram & Facebook" },
        { label: "Cliente", value: "Real Cafayate" },
        { label: "Piezas", value: "16" },
      ],
    },
  ],
};

export const SECCIONES = [ALBUM_UXUI, ALBUM_DISENO, ALBUM_VIDEO, ALBUM_REDES];
