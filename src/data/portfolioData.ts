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
  rol: "Diseñador Multimedial · Frontend",
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
    { nombre: "Figma", logo: "" /* RUTA_IMAGEN_AQUI: /assets/logos/figma.svg */ },
    { nombre: "Photoshop", logo: "" /* RUTA_IMAGEN_AQUI: /assets/logos/photoshop.svg */ },
    { nombre: "Illustrator", logo: "" /* RUTA_IMAGEN_AQUI: /assets/logos/illustrator.svg */ },
    { nombre: "Premiere Pro", logo: "" /* RUTA_IMAGEN_AQUI: /assets/logos/premiere.svg */ },
    { nombre: "After Effects", logo: "" /* RUTA_IMAGEN_AQUI: /assets/logos/aftereffects.svg */ },
    { nombre: "Firefly", logo: "" /* RUTA_IMAGEN_AQUI: /assets/logos/firefly.svg */ },
  ],
  codigo: [
    { nombre: "Astro", logo: "" /* RUTA_IMAGEN_AQUI: /assets/logos/astro.svg */ },
    { nombre: "React", logo: "" /* RUTA_IMAGEN_AQUI: /assets/logos/react.svg */ },
    { nombre: "TypeScript", logo: "" /* RUTA_IMAGEN_AQUI: /assets/logos/typescript.svg */ },
    { nombre: "Next.js", logo: "" /* RUTA_IMAGEN_AQUI: /assets/logos/nextjs.svg */ },
    { nombre: "Tailwind", logo: "" /* RUTA_IMAGEN_AQUI: /assets/logos/tailwind.svg */ },
    { nombre: "Git", logo: "" /* RUTA_IMAGEN_AQUI: /assets/logos/git.svg */ },
  ],
};

// --- PÁGINA 02 · HOBBIES (figuritas) ---
export const HOBBIES: Hobby[] = [
  {
    numero: "08",
    titulo: "Fútbol & Mate",
    descripcion: "Jugar al fútbol para desconectar y tener siempre el mate al lado.",
    stat: { label: "Ritual", value: "Diario" },
    imagen: "" /* RUTA_IMAGEN_AQUI: /assets/hobbies/futbol.jpg */,
  },
  {
    numero: "09",
    titulo: "Música",
    descripcion: "Me acompaña todo el día, tanto trabajando como viajando.",
    stat: { label: "Vibe", value: "95" },
    imagen: "" /* RUTA_IMAGEN_AQUI: /assets/hobbies/musica.jpg */,
  },
  {
    numero: "10",
    titulo: "Viajes",
    descripcion: "Recorrer el norte y volver con la cámara llena de paisajes.",
    stat: { label: "Destino", value: "Salta" },
    imagen: "" /* RUTA_IMAGEN_AQUI: /assets/hobbies/viajes.jpg */,
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
/* VERIFICAR: completá títulos y años exactos. */
export const EDUCACION: EducacionItem[] = [
  {
    period: "En curso",
    titulo: "Diseño Multimedial",
    institucion: "Universidad Maimónides",
    detalle:
      "UX/UI, diseño gráfico, producción audiovisual y programación frontend (Programación I a IV).",
    enCurso: true,
  },
  {
    period: "2026",
    titulo: "Programación IV",
    institucion: "Universidad Maimónides",
    detalle: "Astro, React, consumo de APIs y deploy en Vercel. Este álbum es el trabajo final.",
  },
  {
    period: "2025",
    titulo: "Programación III",
    institucion: "Universidad Maimónides",
    detalle: "Next.js, Node.js y MongoDB: frontend y backend de aplicaciones completas.",
  },
  {
    period: "" /* COMPLETAR_AÑO */,
    titulo: "Bachiller" /* COMPLETAR_TÍTULO */,
    institucion: "Colegio secundario" /* COMPLETAR_INSTITUCIÓN */,
    detalle: "" /* COMPLETAR_DETALLE (opcional) */,
  },
];

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

/* Dejá vacío para ocultar el botón hasta tener el PDF. */
export const CV_URL = "" /* RUTA_CV_AQUI: /cv-nicolas-cortese.pdf */;
