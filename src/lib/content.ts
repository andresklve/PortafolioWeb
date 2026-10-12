export type Lang = "es" | "en";

export const links = {
  email: "carlosandresig91@gmail.com",
  phone: "+51 946 335 410",
  whatsapp: "https://wa.me/51946335410",
  linkedin: "https://www.linkedin.com/in/andresinfantass/",
  github: "https://github.com/andresklve",
};

export const sectionIds = ["about", "stack", "projects", "journey", "contact"] as const;
export type SectionId = (typeof sectionIds)[number];

export const stack = [
  { key: "languages", items: ["Java", "TypeScript", "JavaScript", "Python"] },
  {
    key: "backend",
    items: [
      "Spring Boot",
      "Spring Security",
      "Spring Data JPA",
      "Node.js",
      "NestJS",
      "Prisma",
      "Mongoose",
      "Microservices",
      "REST APIs",
      "JWT",
      "RabbitMQ",
      "WebSockets",
      "Event-Driven",
    ],
  },
  { key: "databases", items: ["PostgreSQL", "MongoDB", "Redis", "SQL Server"] },
  { key: "frontend", items: ["Angular", "React", "Next.js"] },
  { key: "tools", items: ["Git", "Docker", "Swagger", "Jest"] },
  { key: "methodologies", items: ["Agile Scrum"] },
] as const;

export const projects = [
  {
    id: "piensaya",
    name: "PiensaYa",
    repo: "https://github.com/andresklve/PiensaYa",
    tags: [
      "NestJS",
      "TypeScript",
      "Next.js",
      "React",
      "PostgreSQL",
      "Prisma",
      "MongoDB",
      "Redis",
      "RabbitMQ",
      "Docker",
      "Microservices",
      "Event-Driven",
      "WebSockets",
      "JWT",
      "Swagger",
      "Jest",
    ],
  },
  {
    id: "reclamaya",
    name: "ReclamaYa",
    repo: "https://github.com/andresklve/report-and-be-hear-api",
    tags: ["Java", "Spring Boot", "Angular", "TypeScript", "PostgreSQL", "REST APIs"],
  },
  {
    id: "portfolio",
    name: "PortafolioWeb",
    repo: "https://github.com/andresklve/PortafolioWeb",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Motion", "SVG"],
  },
] as const;

export const dict = {
  es: {
    nav: {
      about: "sobre-mí",
      stack: "stack",
      projects: "proyectos",
      journey: "trayectoria",
      contact: "contacto",
      palette: "Buscar",
    },
    boot: [
      "Montando /home/carlos",
      "Cargando java.spring.boot",
      "Levantando 5 microservicios",
      "Conectando amqp://rabbitmq",
      "Compilando portafolio",
    ],
    bootReady: "Sistema listo.",
    hero: {
      prompt: "whoami",
      roles: [
        "Backend Developer",
        "Arquitectura de software",
        "Microservicios & eventos",
        "Java · Spring Boot · NestJS",
      ],
      intro:
        "Estudiante de 7mo ciclo de Ingeniería de Sistemas de Información en la UPC. Construyo backends sólidos con Java, Spring Boot y TypeScript, con foco en arquitectura de software y sistemas que",
      introAccent: "escalan.",
      status: "Disponible para prácticas backend y trabajo remoto",
      ctaProjects: "Ver proyectos",
      ctaContact: "Contactar",
      location: "Lima, Perú",
      localTime: "hora local",
      photoMeta: [
        ["rol", "backend"],
        ["enfoque", "arquitectura"],
        ["ciclo", "7 / 10"],
        ["estado", "construyendo"],
      ],
    },
    about: {
      label: "sobre mí",
      title: "Me interesa lo que pasa detrás de la pantalla.",
      statement:
        "Apasionado por construir soluciones sólidas y en constante aprendizaje. Me enfoco en cómo se diseñan los sistemas: servicios con responsabilidades claras, comunicación por eventos y datos que viven donde deben vivir. Mi meta es crecer hacia el liderazgo técnico de equipos de desarrollo.",
      cards: [
        { k: "ahora", v: "7mo ciclo · Ingeniería de Sistemas de Información, UPC" },
        { k: "enfoque", v: "Backend, arquitectura de software y sistemas escalables" },
        { k: "busco", v: "Prácticas backend y trabajo remoto para empresas de USA" },
        { k: "rumbo", v: "Liderazgo técnico de equipos de desarrollo" },
      ],
    },
    stack: {
      label: "stack",
      title: "Herramientas con las que construyo.",
      categories: {
        languages: "lenguajes",
        backend: "backend",
        databases: "bases de datos",
        frontend: "frontend",
        tools: "herramientas",
        methodologies: "metodologías",
      },
    },
    projects: {
      label: "proyectos",
      title: "Sistemas que he construido.",
      featured: "destacado",
      repo: "Ver repositorio",
      hint: "Pasa el cursor sobre un servicio",
      items: {
        piensaya: {
          kicker: "Red social · 5 microservicios",
          description:
            "Red social para estudiantes, armada con 5 microservicios (autenticación, usuarios, publicaciones, chat y feed), cada uno con su propia base de datos. El feed se actualiza en segundo plano con RabbitMQ y Redis, y el chat funciona en tiempo real.",
        },
        reclamaya: {
          kicker: "Proyecto UPC · API REST",
          description:
            "App para que los ciudadanos peruanos reporten problemas ambientales y se les haga caso. El backend es Spring Boot con PostgreSQL.",
        },
        portfolio: {
          kicker: "Este sitio · Frontend",
          description:
            "Este mismo portafolio, construido desde cero con Next.js y TypeScript. Bilingüe (ES/EN), con animaciones, diagramas SVG en vivo y una paleta de comandos.",
        },
      },
      services: {
        auth: "Login por usuario, JWT de acceso + refresh y roles.",
        users: "Perfiles y grafo de seguidores.",
        posts: "Publicaciones, comentarios y reacciones. Publica eventos a RabbitMQ.",
        chat: "Chat 1:1 en tiempo real con WebSockets y adaptador Redis.",
        feed: "Consume eventos y arma el feed en Redis (fan-out on write).",
      },
      flow: {
        citizen: "Ciudadano",
        report: "reporte",
      },
    },
    journey: {
      label: "trayectoria",
      title: "git log --graph",
      present: "actualidad",
      next: {
        message: "feat: prácticas backend",
        detail: "Siguiente commit — buscando equipo.",
      },
      upc: {
        message: "feat: Ingeniería de Sistemas de Información",
        org: "Universidad Peruana de Ciencias Aplicadas (UPC) · Lima, Perú",
        detail: "Cursando el 7mo ciclo.",
      },
      safeway: {
        message: "work: Stocker en Safeway",
        org: "Safeway · Colorado, USA",
        bullets: [
          "Abastecí y reorganicé una amplia variedad de productos, manteniendo los estándares de presentación, limpieza y orden de la tienda.",
          "Descargué y distribuí mercancía de manera eficiente, agilizando el flujo de inventario del almacén al piso de ventas.",
          "Asistí a los clientes resolviendo sus dudas y guiándolos para asegurar una buena experiencia de compra.",
        ],
      },
    },
    contact: {
      label: "contacto",
      title: "¿Construimos algo",
      titleAccent: "juntos?",
      body: "Estoy buscando prácticas de backend y oportunidades remotas. Si tienes un proyecto o un puesto, escríbeme.",
      copy: "Copiar correo",
      copied: "¡Copiado!",
      whatsapp: "WhatsApp",
    },
    palette: {
      placeholder: "Escribe un comando…",
      empty: "Sin resultados.",
      go: "Ir a",
      open: "Abrir",
      copyEmail: "Copiar correo",
      switchLang: "Cambiar a inglés",
    },
    footer: "Diseñado y construido por Carlos Andres Infantas Galindo",
  },
  en: {
    nav: {
      about: "about",
      stack: "stack",
      projects: "projects",
      journey: "journey",
      contact: "contact",
      palette: "Search",
    },
    boot: [
      "Mounting /home/carlos",
      "Loading java.spring.boot",
      "Starting 5 microservices",
      "Connecting amqp://rabbitmq",
      "Compiling portfolio",
    ],
    bootReady: "System ready.",
    hero: {
      prompt: "whoami",
      roles: [
        "Backend Developer",
        "Software architecture",
        "Microservices & events",
        "Java · Spring Boot · NestJS",
      ],
      intro:
        "Information Systems Engineering student (7th term) at UPC. I build solid backends with Java, Spring Boot and TypeScript, focused on software architecture and systems that",
      introAccent: "scale.",
      status: "Open to backend internships and remote work",
      ctaProjects: "View projects",
      ctaContact: "Get in touch",
      location: "Lima, Peru",
      localTime: "local time",
      photoMeta: [
        ["role", "backend"],
        ["focus", "architecture"],
        ["term", "7 / 10"],
        ["status", "building"],
      ],
    },
    about: {
      label: "about",
      title: "I care about what happens behind the screen.",
      statement:
        "Passionate about building solid solutions and always learning. I focus on how systems are designed: services with clear responsibilities, event-driven communication and data that lives where it should. My goal is to grow into technical leadership of development teams.",
      cards: [
        { k: "now", v: "7th term · Information Systems Engineering, UPC" },
        { k: "focus", v: "Backend, software architecture and scalable systems" },
        { k: "seeking", v: "Backend internships and remote work for US companies" },
        { k: "heading", v: "Technical leadership of development teams" },
      ],
    },
    stack: {
      label: "stack",
      title: "Tools I build with.",
      categories: {
        languages: "languages",
        backend: "backend",
        databases: "databases",
        frontend: "frontend",
        tools: "tools",
        methodologies: "methodologies",
      },
    },
    projects: {
      label: "projects",
      title: "Systems I've built.",
      featured: "featured",
      repo: "View repository",
      hint: "Hover over a service",
      items: {
        piensaya: {
          kicker: "Social network · 5 microservices",
          description:
            "A social network for students, built from 5 microservices (auth, users, posts, chat and feed), each with its own database. The feed updates in the background through RabbitMQ and Redis, and chat works in real time.",
        },
        reclamaya: {
          kicker: "UPC project · REST API",
          description:
            "An app for Peruvian citizens to report environmental problems and actually be heard. The backend is Spring Boot with PostgreSQL.",
        },
        portfolio: {
          kicker: "This site · Frontend",
          description:
            "This very portfolio, built from scratch with Next.js and TypeScript. Bilingual (ES/EN), with animations, live SVG diagrams and a command palette.",
        },
      },
      services: {
        auth: "Username login, JWT access + refresh tokens and roles.",
        users: "Profiles and the follower graph.",
        posts: "Posts, comments and reactions. Publishes events to RabbitMQ.",
        chat: "Real-time 1:1 chat over WebSockets with a Redis adapter.",
        feed: "Consumes events and builds the feed in Redis (fan-out on write).",
      },
      flow: {
        citizen: "Citizen",
        report: "report",
      },
    },
    journey: {
      label: "journey",
      title: "git log --graph",
      present: "present",
      next: {
        message: "feat: backend internship",
        detail: "Next commit — looking for a team.",
      },
      upc: {
        message: "feat: Information Systems Engineering",
        org: "Universidad Peruana de Ciencias Aplicadas (UPC) · Lima, Peru",
        detail: "Currently in my 7th term.",
      },
      safeway: {
        message: "work: Stocker at Safeway",
        org: "Safeway · Colorado, USA",
        bullets: [
          "Stocked and reorganized a wide range of products, keeping the store's presentation, cleanliness and order standards.",
          "Unloaded and distributed merchandise efficiently, speeding up inventory flow from the warehouse to the sales floor.",
          "Helped customers with their questions and guided them to products to ensure a great shopping experience.",
        ],
      },
    },
    contact: {
      label: "contact",
      title: "Shall we build something",
      titleAccent: "together?",
      body: "I'm looking for backend internships and remote opportunities. If you have a project or a role, reach out.",
      copy: "Copy email",
      copied: "Copied!",
      whatsapp: "WhatsApp",
    },
    palette: {
      placeholder: "Type a command…",
      empty: "No results.",
      go: "Go to",
      open: "Open",
      copyEmail: "Copy email",
      switchLang: "Switch to Spanish",
    },
    footer: "Designed and built by Carlos Andres Infantas Galindo",
  },
};

export type Dict = (typeof dict)["es"];
