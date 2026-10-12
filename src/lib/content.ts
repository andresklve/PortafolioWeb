export type Lang = "es" | "en";

export const links = {
  email: "carlosandresig91@gmail.com",
  phone: "+51 946 335 410",
  whatsapp: "https://wa.me/51946335410",
  linkedin: "https://www.linkedin.com/in/andresinfantass/",
  github: "https://github.com/andresklve",
};

export const routes = [
  { id: "home", href: "/" },
  { id: "stack", href: "/stack" },
  { id: "projects", href: "/proyectos" },
  { id: "journey", href: "/trayectoria" },
  { id: "contact", href: "/contacto" },
] as const;
export type RouteId = (typeof routes)[number]["id"];


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
      home: "inicio",
      stack: "stack",
      projects: "proyectos",
      journey: "trayectoria",
      contact: "contacto",
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
      ctaProjects: "Ver proyectos",
      ctaContact: "Contactar",
      location: "Lima, Perú",
      localTime: "hora local",
      photoMeta: [
        ["rol", "backend"],
        ["enfoque", "arquitectura"],
        ["stack", "java · ts"],
        ["estado", "construyendo"],
      ],
    },
    about: {
      label: "sobre mí",
      title: "Me interesa lo que pasa detrás de la pantalla.",
      statement:
        "Apasionado por construir soluciones sólidas y en constante aprendizaje. Me enfoco en cómo se diseñan los sistemas: servicios con responsabilidades claras, comunicación por eventos y datos que viven donde deben vivir. Mi meta es crecer hacia el liderazgo técnico de equipos de desarrollo.",
      cards: [
        { k: "enfoque", v: "Backend, arquitectura de software y sistemas escalables" },
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
            "Este mismo portafolio, construido desde cero con Next.js y TypeScript. Bilingüe (ES/EN), con animaciones y diagramas SVG en vivo.",
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
      upc: {
        message: "feat: Ingeniería de Sistemas de Información",
        org: "Universidad Peruana de Ciencias Aplicadas (UPC) · Lima, Perú",
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
      title: "Contacto",
      copy: "Copiar correo",
      copied: "¡Copiado!",
      whatsapp: "WhatsApp",
    },
    footer: "Diseñado y construido por Carlos Andres Infantas Galindo",
    nextPage: "Siguiente",
  },
  en: {
    nav: {
      home: "home",
      stack: "stack",
      projects: "projects",
      journey: "journey",
      contact: "contact",
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
      ctaProjects: "View projects",
      ctaContact: "Get in touch",
      location: "Lima, Peru",
      localTime: "local time",
      photoMeta: [
        ["role", "backend"],
        ["focus", "architecture"],
        ["stack", "java · ts"],
        ["status", "building"],
      ],
    },
    about: {
      label: "about",
      title: "I care about what happens behind the screen.",
      statement:
        "Passionate about building solid solutions and always learning. I focus on how systems are designed: services with clear responsibilities, event-driven communication and data that lives where it should. My goal is to grow into technical leadership of development teams.",
      cards: [
        { k: "focus", v: "Backend, software architecture and scalable systems" },
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
            "This very portfolio, built from scratch with Next.js and TypeScript. Bilingual (ES/EN), with animations and live SVG diagrams.",
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
      upc: {
        message: "feat: Information Systems Engineering",
        org: "Universidad Peruana de Ciencias Aplicadas (UPC) · Lima, Peru",
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
      title: "Contact",
      copy: "Copy email",
      copied: "Copied!",
      whatsapp: "WhatsApp",
    },
    footer: "Designed and built by Carlos Andres Infantas Galindo",
    nextPage: "Next",
  },
};

export type Dict = (typeof dict)["es"];
