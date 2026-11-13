/* ------------------------------------------------------------------ */
/* DATOS PERSONALES DEL ÁLBUM                                          */
/* Perfil, experiencia, educación, hobbies y contacto.                 */
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
  /** Logo de la institución. Vacío = ícono de birrete. */
  logo?: string;
}

export interface Hobby {
  numero: string;
  titulo: string;
  descripcion: string;
  stat: { label: string; value: string };
  /** Dejá la ruta vacía hasta tener la foto: la figurita muestra el título. */
  imagen?: string;
}

export interface ContactoLink {
  label: string;
  valor: string;
  href: string;
}

// --- PÁGINA 02 · PERFIL ---
export const PERFIL = {
  nombre: "Nicolás Cortese",
  rol: "Diseñador Multimedia",
  ubicacion: "Buenos Aires, AR",
  foto: "/assets/fotoPerfil.jpg",
  bio: [
    "Trabajo en el puente entre la identidad visual y el código: pienso la pieza desde el concepto, la diseño y la llevo al navegador con componentes reutilizables.",
    "Diseño interfaces en Figma, construyo identidades, edito video y produzco contenido para redes. Del primer boceto al último commit.",
  ],
};

/* Skills: Adobe InDesign NO va en esta lista.
 * "logo": reemplazá el string vacío por la ruta de tu archivo local. */
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

// --- PÁGINA 02 · HOBBIES (figuritas) ---
export const HOBBIES: Hobby[] = [
  {
    numero: "08",
    titulo: "Fútbol",
    descripcion: "Jugar al fútbol para desconectar.",
    stat: { label: "Ritual", value: "100" },
    imagen: "/assets/hobbies/futbol.jpg",
  },
  {
    numero: "09",
    titulo: "Mate",
    descripcion: "Tener siempre el mate al lado.",
    stat: { label: "Ritual", value: "Diario" },
    imagen: "/assets/hobbies/mate.jpg",
  },
  {
    numero: "10",
    titulo: "Música",
    descripcion: "Me acompaña todo el día, tanto trabajando como viajando.",
    stat: { label: "Vibe", value: "95" },
    imagen: "" /* RUTA_IMAGEN_AQUI: /assets/hobbies/musica.jpg */,
  },
  {
    numero: "11",
    titulo: "Viajes",
    descripcion: "Recorrer y volver con la cámara llena de paisajes.",
    stat: { label: "Destino", value: "98" },
    imagen: "/assets/hobbies/viajar.jpg",
  },
];

// --- PÁGINA 03 · EXPERIENCIA ---
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
      "Desarrollo de piezas audiovisuales y estáticas semanales.",
    ],
  },
  {
    period: "",
    role: "Creador de contenido",
    company: "Chacadeco",
    achievements: ["Filmación y edición de fotos y videos orgánicos y pagos."],
  },
  {
    period: "",
    role: "Redactor",
    company: "Deportes al Taco",
    achievements: ["Redacción de información deportiva para web y redes."],
  },
];

// --- PÁGINA 04 · EDUCACIÓN ---
/* Orden cronológico: secundario → universidad → próximas formaciones. */
export const EDUCACION: EducacionItem[] = [
  {
    period: "" /* COMPLETAR_AÑOS: ej. "2017 – 2022" */,
    titulo: "Bachiller" /* COMPLETAR_TÍTULO */,
    institucion: "Colegio secundario" /* COMPLETAR_NOMBRE_DEL_COLEGIO */,
    detalle: "" /* COMPLETAR_DETALLE (opcional) */,
    logo: "" /* RUTA_IMAGEN_AQUI: /assets/logos/colegio.png */,
  },
  {
    period: "2023 - En curso",
    titulo: "Licenciatura en Tecnología Multimedial",
    institucion: "Universidad Maimónides",
    detalle:
      "UX/UI, diseño gráfico, producción audiovisual y programación (Programación I a IV).",
    enCurso: true,
    logo: "" /* RUTA_IMAGEN_AQUI: /assets/logos/maimonides.png */,
  },
];

/* Espacio reservado para cursos, carreras o posgrados futuros. */
export const PROXIMA_FORMACION = {
  titulo: "Próxima formación",
  detalle: "Cursos, especializaciones o posgrados que vengan.",
  logo: "" /* RUTA_IMAGEN_AQUI: /assets/logos/maimonides.png */,
};

// --- CONTRATAPA · CONTACTO ---
export const CONTACTO: ContactoLink[] = [
  {
    label: "Email",
    valor: "nicolascortese2004@gmail.com",
    href: "mailto:nicolascortese2004@gmail.com",
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

