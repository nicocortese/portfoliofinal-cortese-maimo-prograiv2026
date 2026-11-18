/* ------------------------------------------------------------------ */
/* DATOS PERSONALES DEL ÁLBUM:                                          */
/* ------------------------------------------------------------------ */

export interface ExperienciaItem {
  period: string;
  role: string;
  company: string;
  location?: string;
  achievements: string[];
}

export interface EducacionItem {
  period: string;
  titulo: string;
  institucion: string;
  detalle: string;
  enCurso?: boolean;
  logo?: string;
}

export interface Hobby {
  numero: string;
  titulo: string;
  descripcion: string;
  stat: { label: string; value: string };
  icono: "futbol" | "mate" | "musica" | "viajes";
  imagen?: string;
}

export interface ContactoLink {
  label: string;
  valor: string;
  href: string;
}

// --- PÁGINA 02  ---
export const PERFIL = {
  nombre: "Nicolás Cortese",
  rol: "Diseñador Multimedia",
  ubicacion: "Argentina",
  foto: "/assets/fotoPerfil.jpg",
  bio: [
    "Soy un Diseñador Multimedia apasionado por construir identidades que transmitan lo que quieren comunicar las personas. Siempre digo que mi foco es muy amplio y es algo que me gusta, desde darle dinamismo a una historia en video o crear un sistema gráfico, hasta diseñar experiencias digitales intuitivas y llevarlas al código.",
  ],
};


export interface Skill {
  nombre: string;
  logo: string;
}

export const SKILLS: { diseno: Skill[]; codigo: Skill[] } = {
  diseno: [
    { nombre: "Figma", logo: "/assets/logos/figma.svg" },
    { nombre: "Photoshop", logo: "/assets/logos/photoshop.svg" },
    { nombre: "Illustrator", logo: "/assets/logos/illustrator.svg" },
    { nombre: "Premiere Pro", logo: "/assets/logos/premiere.svg" },
    { nombre: "After Effects", logo: "/assets/logos/aftereffects.svg" },
  ],
  codigo: [
    { nombre: "HTML", logo: "/assets/logos/html.svg" },
    { nombre: "Astro", logo: "/assets/logos/astro.svg" },
    { nombre: "React", logo: "/assets/logos/react.svg" },
    { nombre: "TypeScript", logo: "/assets/logos/typescript.svg" },
    { nombre: "Tailwind", logo: "/assets/logos/tailwind.svg" },
    { nombre: "Git", logo: "/assets/logos/git.svg" },
  ],
};

export const HOBBIES: Hobby[] = [
  {
    numero: "08",
    titulo: "Fútbol",
    descripcion: "Desconectar a través del fútbol.",
    stat: { label: "Vitalidad", value: "100" },
    icono: "futbol",
    imagen: "/assets/hobbies/futbol.jpg",
  },
  {
    numero: "09",
    titulo: "Mate",
    descripcion: "El mate siempre al lado.",
    stat: { label: "Vitalidad", value: "Diaria" },
    icono: "mate",
    imagen: "/assets/hobbies/mate.jpg",
  },
  {
    numero: "10",
    titulo: "Música",
    descripcion: "Me acompaña todo el día, tanto trabajando como viajando.",
    stat: { label: "Vitalidad", value: "98" },
    icono: "musica",
    imagen: "/assets/hobbies/musica.jpg"
  },
  {
    numero: "11",
    titulo: "Viajes",
    descripcion: "Recorrer y volver con la cámara llena de paisajes.",
    stat: { label: "Vitalidad", value: "90" },
    icono: "viajes",
    imagen: "/assets/hobbies/viajar.jpg",
  },
];

// --- PÁGINA 03 ---
export const EXPERIENCIAS: ExperienciaItem[] = [
  {
    period: "2025 – 2026",
    role: "Editor de Imágenes · Colaborador en Entrenamiento de IA",
    company: "Wirestock",
    location: "Remoto",
    achievements: [
      "Edité y optimicé activos visuales mediante herramientas de Adobe e IA generativa (Firefly, Photoshop).",
      "Diseñé prompts estructurados y documentación técnica mediante LLMs (ChatGPT, Claude).",
      "Aseguré la consistencia visual y técnica de los archivos para plataformas internacionales.",
    ],
  },
  {
    period: "2024 – 2026",
    role: "Diseñador Multimedia",
    company: "Independiente",
    location: "Buenos Aires, AR",
    achievements: [
      "Diseño y prototipado de interfaces UX/UI en Figma enfocadas en usabilidad.",
      "Postproducción y montaje de piezas de video.",
      "Creación de identidades visuales, afiches tipográficos y composiciones fotográficas.",
    ],
  },
  {
    period: "2025",
    role: "Ayudante de Cátedra",
    company: "Universidad Maimónides",
    location: "Buenos Aires, AR",
    achievements: [
      "Capacitación técnica a alumnos en diseño digital e interfaces (Figma, Illustrator, Photoshop).",
      "Feedback enfocado en usabilidad, jerarquía visual y arquitectura de la información.",
    ],
  },
  {
    period: "2024 – 2025",
    role: "Diseñador Multimedia · Community Manager",
    company: "Hotel Real Cafayate",
    location: "Salta, AR",
    achievements: [
      "Incrementé un 25,81% el alcance y la comunidad a través de un sistema visual coherente.",
      "Desarrollé piezas audiovisuales y estáticas semanales.",
      "Centralicé la planificación y los flujos de trabajo de diseño utilizando Notion y Excel."
    ],
  },
  {
    period: "2023 – 2026",
    role: "Creador de contenido",
    company: "Chacadeco",
    achievements: ["Filmación y edición de fotos y videos orgánicos y pagos."],
  },
  {
    period: "2020-2021",
    role: "Redactor",
    company: "Deportes al Taco",
    achievements: ["Redacción de información deportiva para web y redes."],
  },
];

// --- PÁGINA 04 ---
export const EDUCACION: EducacionItem[] = [
  {
    period: "2018-2022",
    titulo: "Bachillerato en Comunicación",
    institucion: "Colegio Nuestra Señora de Lourdes",
    detalle: "Análisis de forma crítica los medios masivos, comprensión de los procesos sociales de interacción y producción de contenidos en distintos formatos",
    logo: "/assets/logos/lourdes-escudo.png",
  },
  {
    period: "2023 - En curso",
    titulo: "Licenciatura en Tecnología Multimedial",
    institucion: "Universidad Maimónides",
    detalle:
      "Creatividad, diseño, programación y gestión de proyectos para la creación de contenidos y servicios digitales",
    enCurso: true,
    logo: "/assets/logos/umai.png",
  },
];

/* Futuros. */
export const PROXIMA_FORMACION: { titulo: string; detalle: string; logo?: string } = {
  titulo: "Próxima formación",
  detalle: "Cursos, especializaciones o posgrados próximos."
};

// --- CONTRATAPA---
const EMAIL = "nicolascortese2004@gmail.com";
const ASUNTO = encodeURIComponent("Propuesta de trabajo · Portfolio");
const CUERPO = encodeURIComponent("Hola Nico, te escribo porque ");

export const CONTACTO: ContactoLink[] = [
  {
    label: "Email",
    valor: EMAIL,
    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${ASUNTO}&body=${CUERPO}`,
  },
  {
    label: "LinkedIn",
    valor: "in/nicolascortese",
    href: "https://www.linkedin.com/in/nicolascortese/",
  },
  {
    label: "GitHub",
    valor: "@nicocortese",
    href: "https://github.com/nicocortese",
  },
];

