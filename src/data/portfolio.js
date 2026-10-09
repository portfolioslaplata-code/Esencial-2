/**
 * Configuración de cada cliente. Identidad compartida y composición propia de Minimal.
 * Guardar imágenes y CV en public/ (rutas: /images/perfil.jpg, /cv.pdf).
 * Desactivar secciones con settings.sections o dejar su contenido vacío.
 */
export const portfolio = {
  locale: "es-AR",
  firstName: "Martín",
  lastName: "Acosta",
  monogram: "MA",
  profession: "Lic. en Administración · Consultor de gestión",
  location: "La Plata, Argentina",
  email: "hola@martinacosta.example",
  phone: "",
  cv: null, // { url: '/cv.pdf', label: 'Descargar CV' }
  photo: null, // { src: '/images/perfil.jpg', alt: 'Retrato de…', position: '50% 50%', caption: '' }
  socials: [], // { label: 'LinkedIn', url: 'https://www.linkedin.com/in/usuario/' }
  externalLinks: [],
  // Declaración local en orden visual; getActiveCatalogSections filtra lo visible.
  // IDs del catálogo de la Landing, sin precios ni límites de contenido.
  catalogComposition: {
    base: ["navigation", "hero", "contact", "footer"],
    sections: [
      { id: "about", type: "standard", catalogIds: ["about"], label: "Sobre mí" },
      { id: "services", type: "standard", catalogIds: ["services"], label: "Servicios" },
      { id: "achievements", type: "standard", catalogIds: ["achievements"], label: "Logros" },
      {
        id: "journey",
        type: "standard",
        catalogIds: ["experience", "education"],
        label: "Experiencia + Formación",
      },
      { id: "certifications", type: "standard", catalogIds: ["certifications"], label: "Certificaciones" },
      { id: "skills", type: "standard", catalogIds: ["skills"], label: "Habilidades" },
    ],
    complements: [],
  },
  theme: {
    background: "#f7f8f6",
    surface: "#ffffff",
    ink: "#202d2b",
    muted: "#606c68",
    accent: "#245c50",
    accentHover: "#183f37",
    soft: "#eaf0ec",
    border: "#dce3dd",
    inverse: "#ffffff",
    inverseMuted: "#c6d9d0",
    status: "#a8d4b7",
  },
  settings: {
    sections: {
      about: true,
      achievements: true,
      certifications: true,
      services: true,
      education: true,
      experience: true,
      skills: true,
      contact: true,
    },
    credit: {
      enabled: true,
      label: "Portfolio realizado por",
      name: "Portfolios La Plata",
      url: "",
    },
    demoNotice:
      "Perfil ficticio · Trayectoria, logros y certificaciones de muestra.",
  },
  seo: {
    title: "Martín Acosta — Consultoría en gestión",
    description:
      "Portfolio de demostración de Martín Acosta. Estrategia, procesos y análisis para una gestión más clara. Un modelo de Portfolios La Plata.",
    siteUrl: "", // URL final: activa canonical y URLs absolutas de Open Graph.
    image: "",
    imageAlt: "",
    favicon: "/favicon.svg",
  },
  hero: {
    eyebrow: "ESTRATEGIA · PROCESOS · RESULTADOS",
    greeting: "Hola, soy Martín Acosta.",
    headline: ["Claridad para decidir.", "Método para avanzar."],
    accentLine: 1,
    description:
      "Acompaño a profesionales y organizaciones a ordenar su gestión, mejorar sus procesos y transformar información en decisiones concretas.",
    availability: "Disponible para nuevos proyectos",
    primaryAction: { label: "Conversemos", section: "contact" },
    secondaryAction: { label: "Explorar mi experiencia", section: "journey" },
    scrollLabel: "Conocé mi enfoque",
  },
  about: {
    eyebrow: "PERFIL PROFESIONAL",
    title: "Una mirada integral.",
    accent: "Un enfoque práctico.",
    intro:
      "Los buenos resultados empiezan por entender el contexto y hacer las preguntas correctas.",
    paragraphs: [
      "Soy licenciado en Administración y trabajo en la intersección entre las personas, los procesos y los datos. Me interesa hacer más simple aquello que parece complejo.",
      "Mi forma de trabajar combina análisis y cercanía: escuchar, identificar lo importante y construir soluciones que puedan sostenerse en el tiempo.",
    ],
    facts: [
      { label: "Especialidad", value: "Gestión y mejora de procesos" },
      { label: "Modalidad", value: "Presencial y remoto" },
      { label: "Mi enfoque", value: "Analítico, cercano y colaborativo" },
    ],
    photo: null,
  },
  services: {
    eyebrow: "ÁREAS DE TRABAJO",
    title: "De la visión a la acción.",
    description:
      "Acompañamiento a medida, con objetivos claros y herramientas que se adaptan a tu realidad.",
    items: [
      {
        id: "estrategia",
        name: "Planificación estratégica",
        icon: "compass",
        description:
          "Definir prioridades, ordenar objetivos y diseñar una hoja de ruta para avanzar con dirección.",
      },
      {
        id: "procesos",
        name: "Mejora de procesos",
        icon: "layers",
        description:
          "Entender cómo funciona tu organización y encontrar oportunidades para trabajar mejor.",
      },
      {
        id: "analisis",
        name: "Análisis para la gestión",
        icon: "chart",
        description:
          "Convertir datos en información útil, con indicadores y reportes que faciliten la toma de decisiones.",
      },
    ],
  },
  achievements: {
    eyebrow: "LOGROS PROFESIONALES",
    title: "Aportes que toman forma.",
    description:
      "Hitos que muestran cómo el análisis se convierte en herramientas concretas de trabajo.",
    items: [
      {
        id: "operaciones",
        name: "Un circuito de compras documentado",
        category: "Procesos y organización",
        year: "2025",
        description:
          "Organicé las etapas de compra en un procedimiento compartido, con responsables, criterios de aprobación y puntos de control definidos para el equipo.",
      },
      {
        id: "indicadores",
        name: "Una herramienta común de seguimiento",
        category: "Análisis de gestión",
        year: "2025",
        description:
          "Desarrollé un reporte de gestión que reúne indicadores, fuentes de información y una rutina de actualización, para revisar los avances en las reuniones de equipo.",
      },
      {
        id: "planificacion",
        name: "Prioridades convertidas en un plan",
        category: "Planificación estratégica",
        year: "2024",
        description:
          "Facilité la definición de prioridades y las consolidé en una hoja de ruta con acciones, responsables y momentos de revisión acordados.",
      },
    ],
  },
  journey: {
    eyebrow: "TRAYECTORIA",
    title: "Experiencia que se construye.",
    description: "Aprendizaje continuo y práctica profesional, en diálogo.",
  },
  experience: [
    {
      id: "consultor",
      period: "2023 — Actualidad",
      title: "Consultor de gestión independiente",
      institution: "Asesoramiento a pymes y profesionales",
      description:
        "Planificación, diagnóstico de procesos y desarrollo de herramientas de seguimiento para equipos de trabajo.",
    },
    {
      id: "analista",
      period: "2020 — 2023",
      title: "Analista de planificación y control",
      institution: "Grupo Horizonte · La Plata",
      description:
        "Elaboración de reportes, seguimiento de indicadores y coordinación de iniciativas de mejora entre áreas.",
    },
  ],
  education: [
    {
      id: "grado",
      period: "2015 — 2020",
      title: "Licenciatura en Administración",
      institution: "Universidad Nacional de La Plata",
      description:
        "Formación en gestión de organizaciones, estrategia y análisis económico.",
    },
    {
      id: "especializacion",
      period: "2024",
      title: "Gestión de equipos y comunicación",
      institution: "Formación complementaria",
      description:
        "Aprendizaje sobre coordinación de equipos, comunicación organizacional y trabajo colaborativo.",
    },
  ],
  certifications: {
    eyebrow: "CERTIFICACIONES",
    title: "Conocimientos con foco.",
    description:
      "Acreditaciones específicas vinculadas con mi práctica profesional. Son ejemplos ficticios, sin credenciales verificables.",
    items: [
      {
        id: "gestion-proyectos",
        name: "Gestión de proyectos",
        institution: "Entidad emisora de muestra",
        year: "2025",
        area: "Planificación y seguimiento",
      },
      {
        id: "analisis-datos",
        name: "Análisis y visualización de datos",
        institution: "Entidad emisora de muestra",
        year: "2025",
        area: "Información para la gestión",
      },
      {
        id: "mejora-procesos",
        name: "Mejora continua de procesos",
        institution: "Entidad emisora de muestra",
        year: "2024",
        area: "Organización y métodos",
      },
    ],
  },
  skills: {
    eyebrow: "COMPETENCIAS",
    title: "Herramientas con propósito.",
    groups: [
      {
        name: "Gestión",
        items: [
          "Planificación estratégica",
          "Mejora continua",
          "Gestión de proyectos",
          "Análisis de procesos",
        ],
      },
      {
        name: "Herramientas",
        items: ["Excel avanzado", "Power BI", "Google Workspace", "Notion"],
      },
      {
        name: "Forma de trabajar",
        items: [
          "Pensamiento analítico",
          "Comunicación clara",
          "Trabajo en equipo",
          "Escucha activa",
        ],
      },
    ],
  },
  contact: {
    emailIsDemo: true,
    demoLabel: "Contacto de muestra",
    demoDescription: "Correo ficticio. No recibe mensajes.",
    eyebrow: "CONTACTO",
    title: "Todo empieza con",
    accent: "una buena conversación.",
    description:
      "Si buscás una mirada externa para tu próximo desafío, me gustaría conocerlo. Pensemos juntos cómo avanzar.",
    cta: "Escribime",
    note: "Desde La Plata, cerca de tu próximo proyecto.",
  },
  ui: {
    nav: {
      about: "Perfil",
      services: "Servicios",
      achievements: "Logros",
      journey: "Trayectoria",
      certifications: "Certificaciones",
      skills: "Competencias",
      contact: "Contacto",
    },
    navigationLabel: "Navegación principal",
    menuOpen: "Abrir menú",
    menuClose: "Cerrar menú",
    skipLink: "Saltar al contenido",
    experience: "Experiencia",
    education: "Formación",
    backToTop: "Volver arriba",
    rights: "Todos los derechos reservados.",
  },
};
