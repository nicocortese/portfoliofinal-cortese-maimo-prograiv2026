export interface ExperienciaItem {
  period: string;
  role: string;
  company: string;
  location?: string;
  etiqueta?: string;
  achievements: string[];
}

// --- PÁGINA 03 · TRABAJOS RECIENTES ---
export const EXPERIENCIAS_RECIENTES: ExperienciaItem[] = [
  {
    period: "2025 - 2026",
    role: "Editor de Imágenes - Colaborador en Entrenamiento de IA",
    company: "Wirestock",
    location: "Remoto",
    achievements: [
      "Edité y optimicé activos visuales mediante herramientas de Adobe e IA generativa (Firefly, Photoshop).",
      "Diseñé prompts estructurados y documentación técnica mediante LLMs (ChatGPT, Claude).",
      "Aseguré la consistencia visual y técnica de los archivos para plataformas internacionales.",
    ],
  },
  {
    period: "2024 - 2026",
    role: "Diseñador Multimedia",
    company: "Independiente",
    etiqueta: "UMAI · proyectos propios",
    location: "Buenos Aires, AR",
    achievements: [
      "Diseño y prototipado de interfaces UX/UI en Figma enfocadas en usabilidad.",
      "Postproducción y montaje de piezas de video.",
      "Creación de identidades visuales, afiches tipográficos y composiciones fotográficas.",
    ],
  },
  {
    period: "2024 - 2025",
    role: "Diseñador Multimedia - Community Manager",
    company: "Hotel Real Cafayate",
    location: "Salta, AR",
    achievements: [
      "Incrementé un 25,81% el alcance y la comunidad a través de un sistema visual coherente.",
      "Desarrollo de piezas audiovisuales y estáticas semanales.",
    ],
  },
];

// --- PÁGINA 04 · TRABAJOS ANTERIORES ---
export const EXPERIENCIAS_ANTERIORES: ExperienciaItem[] = [
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
    period: "",
    role: "Creador de contenido",
    company: "Chacadeco",
    achievements: [
      "Filmación y edición de fotos y videos orgánicos y pagos.",
    ],
  },
  {
    period: "",
    role: "Redactor",
    company: "Deportes al Taco",
    achievements: [
      "Redacción de información deportiva para web y redes.",
    ],
  },
];
