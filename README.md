# Portfolio final - Nicolás Cortese - Programación IV 2026

1 - **URL del portfolio publicado:**
2 - **URL repositorio:**

3 - **Descripción de la propuesta:** Portfolio web interactivo diseñado bajo la metáfora visual y táctil de un álbum de figuritas. El portfolio interactivo presenta mi trabajo como Diseñador Multimedia y Desarrollador Frontend (UX/UI, Diseño Gráfico, Producción Audiovisual, Redes Sociales y Desarrollo Web) de una forma dinámica, lúdica y bien estructurada.

**Público objetivo:** Reclutadores, estudios de diseño, agencias digitales y clientes.

**Instrucciones para instalar dependencias, ejecutar y construir el proyecto:**
## Instalación y ejecución local

### Requisitos previos
- Node.js (v18 o superior)
- npm

### Comandos

**Clonar el repositorio e instalar dependencias:**
   git clone (https://github.com/nicocortese/portfoliofinal-cortese-maimo-prograiv2026.git)
   cd portfoliofinal-cortese-maimo-prograiv2026
   npm install

1. Configurar variables de entorno:
Crear un archivo .env en la raíz del proyecto:
```
OPENWEATHER_API_KEY=tu_api_key_de_openweather
GITHUB_TOKEN=tu_token_opcional_de_github
```
**Ambos servicios cuentan con manejo de errores y fallback en caso de ausencia de variables.**

2. Ejecutar servidor de desarrollo:

npm run dev
**Disponible en http://localhost:4321.**

3. Construir y previsualizar producción:

npm run build
npm run preview

4 - **Tecnologías y decisiones principales:**
**AstroJS:** Elegido como base por su arquitectura de islas, permitiendo servir una estructura liviana y delegar a JavaScript únicamente en los componentes interactivos.

**React + TypeScript:** Seleccionado para construir las islas interactivas con manejo complejo de estado (volteo de figuritas, galerías modales, widget climático) y tipado estricto en la capa de datos.

**Tailwind CSS:** Utilizado para mantener un sistema visual consistente y resolver diseños responsivos directamente sobre los componentes. 


**page-flip (HTMLFlipBook):** Incorporado para darle al álbum una física realista de paso de páginas, evitando una navegación web convencional.

**Capa de datos separada (src/data/):** Todo el contenido del portfolio está separado de la interfaz en archivos tipados (proyectosDetalle.ts, albumData.ts, projectsData.ts y portfolioData.ts), facilitando el mantenimiento y la escalabilidad del álbum.

5 - **Explicación de componentes propios relevantes:**
* libro/LibroInteractivo.tsx (principal):
Es el núcleo de la aplicación. Monta el HTMLFlipBook, administra el estado global de navegación (página actual, saltos directos desde el índice, apertura de modals) y estructura las 17 páginas del álbum mediante funciones internas especializadas (Hoja, Encabezado, PaginaFiguritas, PaginaHobbiesFiguritas, PaginaFrontendProyectos, PaginaContratapa).

* Figurita.tsx (Pieza coleccionable reutilizable):
Representa la unidad visual central del diseño. Implementa un giro 3D limpio (sin transformaciones residuales en reposo para evitar desenfoque de texto) y soporta variantes full-bleed para hobbies y tarjetas con marco editorial para proyectos mediante props (ajustePortada, posicionPortada, icono, destacada). Al girarse revela metadata puntual (Proyecto, Año, Cliente o Vitalidad e íconos).

* ProyectoModal.tsx (Visor de detalles multimedia):
Renderizado como portal sobre document.body. Centraliza el acceso a todos los enlaces externos (Figma, Vercel, GitHub, Instagram) y adapta dinámicamente el contenedor multimedia a formatos horizontales, verticales o logotipos con contraste controlado. Incluye galería con miniaturas sincronizadas y reproducción nativa de video.

* ClimaWidget.tsx (Widget meteorológico en vivo):
Componente autónomo con una matriz de ~11 estados que combina condición climática y momento del día (mañana, tarde, noche despejada, nublada, lluviosa), renderizando ilustraciones SVG propias, iluminación ambiental animada y mensajes contextuales.

6 - **Fuente dinámica / APIS utilizadas:**
1. OpenWeatherMap API (Clima en vivo en Buenos Aires )
Información obtenida: Temperatura actual, mínima y máxima, sensación térmica, humedad, velocidad del viento, condición meteorológica y ciclo horario (día/noche).

Comportamiento dinámico: Se consulta en vivo desde el navegador y se actualiza cada 10 minutos, alimentando los estados visuales y textuales de ClimaWidget.tsx.

Comportamiento ante error o ausencia de datos: Si la petición falla, se supera el límite de uso o no está definida OPENWEATHER_API_KEY, el componente captura el error silenciosamente y muestra un estado climático de respaldo coherente con Buenos Aires sin interrumpir la navegación.

2. GitHub REST API (api.github.com)
Información obtenida: Repositorios públicos del usuario nicocortese, conteo de proyectos con deploy activo, fecha exacta del último push y lenguajes predominantes, cruzando los nombres de repositorio con projectsData.ts.

Comportamiento ante error o ausencia de datos: Se ejecuta al momento de generar el sitio (index.astro) admitiendo un GITHUB_TOKEN opcional para ampliar el límite de peticiones. Ante un error de red o rate limit de la API pública, se inyectan métricas de respaldo verificadas para que la sección Frontend mantenga su integridad.

7 -- **Criterios de responsive y accesibilidad:**
* Adaptación estructural por tamaño de pantalla: 
En escritorio (>= 1024px), LibroInteractivo despliega el álbum a doble página y ProyectoModal se ajusta al alto de la ventana evitando scrolls internos. En dispositivos móviles (< 1024px), la vista pasa a página única, las grillas de proyectos y destacados se reorganizan a una columna (grid-cols-1) y el modal habilita scroll vertical fluido con contenedores multimedia de altura fija (shrink-0).

* Accesibilidad e interacción:

Uso de atributos semánticos y ARIA (role="dialog", aria-modal="true", aria-label descriptivos).

Navegación por teclado habilitada (cierre de modals con tecla Escape y recorrido de galerías con flechas).

Ajuste manual de contraste en logotipos sobre fondos claros u oscuros (como Fixea y Hotel Real Cafayate) y aislamiento de clics (con stopPropagation) dentro de las hojas volteables.


8 - **Limitaciones conocidas y posibilidad de mejora**
* Tamaño de código LibroInteractivo.tsx: Actualmente concentra más de 1.200 líneas al reunir la lógica del libro junto con las funciones de cada página. Como refactorización prioritaria, convendría extraer cada página a componentes independientes.

* Repositorios privados: La consulta pública a GitHub sin token no contabiliza proyectos privados con desarrollo interno.

* Líneas de mejora futura: Incorporar efectos sonoros opcionales y completar los espacios "Próximamente" del álbum.

9 - **Créditos y licencias recursos de terceros:**
* Recursos de terceros: Astro (MIT), React (MIT), page-flip (MIT), Lucide Icons (ISC), OpenWeatherMap API y GitHub REST API.

* Diseño, desarrollo y contenidos: Nicolás Cortese

* Proyectos académicos: Desarrollados en la Licenciatura en Tecnología Multimedial (Universidad Maimónides).

10 - **EVIDENCIA DE PROCESO:**
> **De landing tradicional a álbum interactivo:** El proyecto nació como una web de scroll vertical, pero resultaba genérica para mostrar un perfil híbrido entre diseño multimedia y desarrollo frontend. Se descartó esa idea en favor de un **álbum de figuritas**, transformando cada trabajo y hobby en una pieza numerada que invita a explorar el contenido con curiosidad.

### Evolución, pruebas y problemas resueltos
- **Identidad visual y equilibrio de grillas:** Se definió una paleta editorial cálida (`#F2EFE7` blanco, `#1E2A44` azul noche y `#FF704A` naranja) y se incorporaron espacios troquelados con el texto *"Próximamente"* para equilibrar las secciones con menos piezas.
- **Legibilidad en las figuritas:** En las primeras pruebas, el texto del dorso perdía nitidez por la perspectiva 3D activa en reposo y se cortaba por exceso de texto. Se corrigió aplicando la rotación solo durante la animación y sintetizando el reverso a datos puntuales (*Proyecto*, *Año*, *Cliente* o *Vitalidad*).
- **Proporciones multimedia en los modals (`ProyectoModal.tsx`):** Las stories verticales (9:16) y videos horizontales (16:9) generaban bordes vacíos o scrolls forzados en escritorio. Se adaptó el contenedor según el formato real de cada pieza para aprovechar todo el ancho sin desbordar la pantalla.
- **Pruebas en mobile vs. escritorio:** Al testear en resoluciones chicas, la imagen principal del modal colapsaba y las tarjetas en 3 columnas comprimían el texto. Se reorganizó la vista móvil a una columna con altura fija para la galería y scroll vertical fluido.
- **Bloqueo de clics en la contratapa:** La librería `page-flip` interceptaba los clics sobre el botón de contacto final; se resolvió aislando el evento y enlazando directo a la redacción de correo con un mensaje prellenado.


### Pendiente o mejorable
- **Modularizar el componente `LibroInteractivo.tsx`:** Hoy concentra la lógica del libro junto con las funciones internas de las 17 páginas. El siguiente paso técnico sería separar cada página en su propio archivo dentro de `src/components/libro/paginas/` para que el código sea más limpio y fácil de mantener a futuro.

### Uso de Inteligencia Artificial
Durante el desarrollo utilicé herramientas de inteligencia artificial (asistentes de código y lenguaje) como apoyo técnico para acelerar iteraciones, siempre manteniendo el control sobre el diseño, la arquitectura y la verificación final del portfolio.

**Para qué tareas la utilicé:**
- Asistencia en la implementación de componentes interactivos en React/TypeScript (como la lógica de rotación 3D de las figuritas y las animaciones SVG en el Widget del clima).
- Reorganización de clases de Tailwind CSS para ajustar el diseño responsivo de los modals y eliminar desbordamientos.
- Depuración de problemas puntuales de entorno (diferencias de mayúsculas/minúsculas en rutas de Vercel, propagación de eventos en `page-flip` y manejo de respuestas de las APIs).

**Qué partes revisé, adapté o descarté:**
- Descarté textos generados automáticamente que no reflejaban mi perfil real (por ejemplo, frases genéricas en el widget del clima o descripciones que no iban con mi perfil ni con mis trabajos).
- Adapté manualmente las proporciones de imágenes, recortes, contrastes de logotipos (como *Fixea* y *Hotel Real Cafayate*) y los datos reales de cada proyecto
- Corregí asignaciones erróneas de activos multimedia entre proyectos (reubicando piezas y eliminando capturas mezcladas).

**Problemas, errores o límites detectados:**
- En varias iteraciones, las soluciones sugeridas para escritorio rompían la vista móvil (colapsando alturas de imágenes) o cortaban el contenido inferior al quitar los scrolls, lo que exigió pruebas manuales en el inspector de dispositivos y ajustes iterativos.
- La IA no tenía acceso directo a mi entorno local ni a repositorios privados de GitHub, por lo que requería validación constante de rutas de archivos, nombres de variables de entorno y pruebas reales tras cada cambio.

**Decisiones tomadas por mí:**
- La idea integral del concepto de **álbum de figuritas**, la dirección de arte, la selección y curaduría de todos los proyectos e imágenes, la estructura de secciones del álbum y la validación visual y funcional de cada entrega.
