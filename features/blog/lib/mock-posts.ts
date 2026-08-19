import type { BlogPost } from "@/shared/types/content";

const images = {
  featured: "https://lh3.googleusercontent.com/aida/AP1WRLsYVdXqeQP70m_lJ_N7mWCMB1zIrekAoEJD_RHs9Q4EFDm5BRx5XRfVtWdSz5q3P9n-LQuWTETCIobFucCCaSDIMPkqgEyMiA3EYG0NU9bEH2TwtaaEmgFcTOuDbkTgfCywoeLLHcwJa74A5babKS7B-r11BNGJH7F-4H9Y5trQwe7Oopr87QrLgHrDid9_2CB3rITpG9i5sRyTDhA1RjjCk-i4cwxkzgEnXUWYlXmk5aKdNtwWPUESwfAk",
  security: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhnIlcuINRX8B8AtwzQEONasC6_Pk94AaiYqshpGOp3-j1DJ9rQ_IfVtpwIn3jRfYzD-Fj0VKcAjHS7XOS0ltduyfG9BiF5ULyKKhmpsJtjd_hYrn7Hdy8D1bLM1JjHJ4t4RulTq2R5GiKt-tuqwRiEA4tEtyH8gd7BsR5jK7xSC_iEAIKL7reafSj6LbQJfB11E1uQGObJQwldEW0tvIS4wCv8b88QZFvt8GoAK-U7UMVaJ0Ew-XF",
  accounting: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwLwJRawUrEVFX7c-vJrUM5zxQBAFEjUFpf9Yvb5LYJGyFcb1m7R2XKqscq7Nnah8eUXOaXttyLPqhmrdflvBvKMRc0J_ER_-kAmbTGoSu-Lf_SQKB47SY34YY02ZXFv6mf05imXRpUgJpb1qC_964cPVGgSVlAMJY-_4Szbt4dP17H1Ejfw5tvL1JoqrvUYGVY6nGzaUvjkw-tKhr5ZFF9lyCE58DEQsffPLZDI8LZTpWGJSI",
  business: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYTU_4v4t102WJu6C3qNbZFMTEQdo0u9qpbVgOMKbLSDJ-UHJuXJqM01Ewi4atsDL7hVT5T5dXbISaWb6QbTIGyH7VqEteEidEDs9e4zLPn8IfWSjCIL60OpXsN6FgOMtAgD7GxHxptH_VEZP-jmSWUwSKlizX3xAEVwhhR5Kt94eSU7WoaPQypDy6TnpBg8bahvOiz6EhA1p-8Qd9yblNEqEZSRbiiwpdgbgCEV14LgkhUYQCZT7D",
  digital: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPYK6Exj6T83xvq11UXRKckPftH3zbgnp6h5xXL84PdVOh52QSWzi-3pU0pkqzZ6xfN7NhtI55QsRRXpD6QkthWxwo9C9wB2OrqqbadFXtabTp0z4K46wG49RTjHvWwmQ4j6dAQEuXtaiNxMVaOxHXZZ17mfKgOsIL2CEcTmUGMbsLwCFQ90BlFElgr9xW69G1jHxnkh6trTsHYDItsvBSinHW8-BMjQcj8ahY2IM9DM34k23t0Y-V",
  partnership: "https://lh3.googleusercontent.com/aida-public/AB6AXuAaEIvmz1Uf3ep6UQwCAmCXeXZOBejzw9p7broglnI1lUhoqhyS9poSubyj8AbPuW7sP1b8A5aDz9yqGj7AoW7iDNR2WpevEEwkyeQu96CI-6iJ1ir0HXFGz9HkwnI463G6qSjIhqS1EBbzZKXM9XNTm0kxebTUyuRBM-eLlc63sOna1g2rltjTmKN_QwQm2wTiMf0IGyiqKGysPdC-9vLua4-84Z4Obf0um052pdN4A0Vggh7YzI8P",
};

export const mockPosts: BlogPost[] = [
  {
    id: "1", slug: "impacto-de-la-ia-en-la-contabilidad-moderna", category: "Tecnología & Contabilidad",
    title: "Impacto de la IA en la Contabilidad Moderna: Lo que toda PyME debe saber",
    excerpt: "Una mirada práctica a cómo la inteligencia artificial está transformando procesos contables y decisiones empresariales.", publishedAt: "2024-10-15", coverImage: images.featured,
    readingTime: 6, tags: ["IA", "Contabilidad", "PyMEs"],
    content: [
      { type: "paragraph", text: "La inteligencia artificial está dejando de ser una promesa futurista para convertirse en una herramienta concreta dentro de las áreas financieras. Para las PyMEs, el mayor valor no está en reemplazar personas, sino en automatizar tareas repetitivas y liberar tiempo para analizar el negocio." },
      { type: "heading", level: 2, text: "Dónde empieza el cambio" },
      { type: "paragraph", text: "Conciliaciones, clasificación documental, revisión de datos y generación de reportes son algunos de los procesos donde la automatización puede aportar velocidad y consistencia." },
      { type: "quote", text: "La tecnología genera valor cuando resuelve un problema real y puede medirse su impacto.", caption: "Perspectiva Moya y Asociados" },
      { type: "heading", level: 3, text: "Una adopción responsable" },
      { type: "bulleted", items: ["Definir procesos repetitivos antes de elegir una herramienta.", "Mantener controles humanos sobre decisiones financieras relevantes.", "Medir ahorro de tiempo, errores y calidad de información."] },
      { type: "paragraph", text: "La combinación de criterio contable y tecnología permite que la automatización sea una herramienta de gestión, no simplemente una colección de funciones llamativas." },
    ],
  },
  {
    id: "2", slug: "seguridad-en-la-nube-para-pymes", category: "Seguridad", title: "Seguridad en la Nube para PyMEs: Guía Definitiva",
    excerpt: "Descubra las mejores prácticas para proteger los datos financieros de su empresa en entornos cloud sin comprometer la accesibilidad.", publishedAt: "2024-10-12", coverImage: images.security, readingTime: 7, tags: ["Cloud", "Seguridad", "PyMEs"],
    content: [{ type: "paragraph", text: "Migrar a la nube no elimina la responsabilidad sobre la seguridad. La arquitectura, las identidades y las políticas de acceso deben diseñarse desde el inicio." }, { type: "heading", level: 2, text: "Controles fundamentales" }, { type: "bulleted", items: ["Autenticación multifactor.", "Principio de mínimo privilegio.", "Copias de seguridad y recuperación probada."] }],
  },
  {
    id: "3", slug: "nuevas-reformas-fiscales-2024", category: "Contabilidad", title: "Nuevas Reformas Fiscales 2024: Prepárese a Tiempo",
    excerpt: "Un análisis de los cambios impositivos recientes y cómo pueden afectar la planificación fiscal de las empresas.", publishedAt: "2024-10-05", coverImage: images.accounting, readingTime: 5, tags: ["Tributación", "Contabilidad"],
    content: [{ type: "paragraph", text: "Los cambios normativos requieren revisar procesos, calendarios y documentación para evitar que una obligación nueva se convierta en una sorpresa operativa." }, { type: "heading", level: 2, text: "Preparación y seguimiento" }, { type: "paragraph", text: "Una revisión periódica con el equipo contable permite anticipar ajustes y mantener la información financiera alineada con las obligaciones vigentes." }],
  },
  {
    id: "4", slug: "estrategias-de-crecimiento-sostenible", category: "Negocios", title: "Estrategias de Crecimiento Sostenible",
    excerpt: "Cómo alinear sus objetivos financieros con prácticas de sostenibilidad para asegurar el éxito a largo plazo.", publishedAt: "2024-09-28", coverImage: images.business, readingTime: 5, tags: ["Negocios", "Estrategia"],
    content: [{ type: "paragraph", text: "Crecer de forma sostenible implica conectar las decisiones comerciales con la capacidad financiera y operativa de la empresa." }],
  },
  {
    id: "5", slug: "digitalizacion-de-procesos-financieros", category: "Tecnología", title: "Digitalización de Procesos Financieros",
    excerpt: "Pasos clave para migrar de sistemas heredados a plataformas financieras ágiles y centralizadas.", publishedAt: "2024-09-20", coverImage: images.digital, readingTime: 6, tags: ["Digitalización", "Finanzas"],
    content: [{ type: "paragraph", text: "Digitalizar procesos financieros no consiste únicamente en cambiar herramientas. El verdadero salto ocurre cuando los datos fluyen con menos fricción y los equipos pueden tomar decisiones con información oportuna." }],
  },
  {
    id: "6", slug: "fusiones-y-adquisiciones-sector-tech", category: "Consultoría", title: "Fusiones y Adquisiciones en el Sector Tech",
    excerpt: "Aspectos contables y legales críticos a considerar antes de iniciar un proceso de M&A.", publishedAt: "2024-09-10", coverImage: images.partnership, readingTime: 8, tags: ["Consultoría", "M&A"],
    content: [{ type: "paragraph", text: "Una operación de M&A necesita coordinación entre estrategia, finanzas, tecnología y aspectos legales desde las primeras etapas." }],
  },
  {
    id: "7", slug: "el-futuro-del-desarrollo-cloud", category: "Tecnología", title: "El futuro del desarrollo Cloud en 2024: Tendencias y Estrategias",
    excerpt: "La evolución cloud, Serverless y FinOps está cambiando la forma en que las empresas diseñan y administran sus plataformas digitales.", publishedAt: "2024-05-15", coverImage: "https://lh3.googleusercontent.com/aida/AP1WRLsYVdXqeQP70m_lJ_N7mWCMB1zIrekAoEJD_RHs9Q4EFDm5BRx5XRfVtWdSz5q3P9n-LQuWTETCIobFucCCaSDIMPkqgEyMiA3EYG0NU9bEH2TwtaaEmgFcTOuDbkTgfCywoeLLHcwJa74A5babKS7B-r11BNGJH7F-4H9Y5trQwe7Oopr87QrLgHrDid9_2CB3rITpG9i5sRyTDhA1RjjCk-i4cwxkzgEnXUWYlXmk5aKdNtwWPUESwfAk", author: { name: "Carlos Méndez", role: "Director de Tecnología", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDr7Itk68SQBI1LbOtnkBbRm3_74dXgBbn2_uCSPuv-2oE35J_Uzgj35wi8uQqpBYjQ8ePRZm38VwdaKc06xfxEtQ2kso9l-zz-h3dj9kl0WkFhJYWYHsWiJyUESip69xOU_i5QDsC6fhM6X2Y2L4KEADMoqKOMCaLPexhtiB6LgM0Cokh9F9WWWNZ7mS5j_xayjKK0JT4QYI6SSCFve9tLbcXHst3_HXEQzRIRWIXDc-wWGVKe1G-2" }, readingTime: 8, tags: ["Cloud", "Finanzas", "Estrategia"],
    content: [
      { type: "paragraph", text: "La adopción de tecnologías en la nube ha dejado de ser una ventaja competitiva para convertirse en un imperativo operacional. Las empresas buscan no solo migrar sus operaciones, sino optimizar la arquitectura subyacente para garantizar resiliencia, seguridad y eficiencia en costos." },
      { type: "heading", level: 2, text: "La Evolución hacia Arquitecturas Serverless" },
      { type: "paragraph", text: "Las arquitecturas Serverless están redefiniendo cómo las organizaciones despliegan aplicaciones. Al abstraer la gestión de la infraestructura, los equipos de desarrollo pueden centrarse en la lógica de negocio, reduciendo tiempos de lanzamiento y optimizando recursos de ingeniería." },
      { type: "quote", text: "La verdadera optimización cloud no ocurre al apagar servidores, sino al rediseñar sistemas para que consuman recursos únicamente en el milisegundo exacto en que son requeridos.", caption: "Informe de Perspectivas Tecnológicas 2024" },
      { type: "heading", level: 3, text: "Optimización de Costos en Entornos Híbridos" },
      { type: "paragraph", text: "Con la fluctuación de los mercados globales, la gestión financiera de la nube (FinOps) ha cobrado protagonismo. Implementar estrategias de Right-sizing y reservar capacidad en instancias de uso constante puede reducir los gastos operativos. La visibilidad granular del gasto por departamento es esencial para una contabilidad tecnológica precisa." },
      { type: "bulleted", items: ["Auditorías automatizadas: identificar recursos huérfanos.", "Estrategias Multi-Cloud: mitigar riesgos de dependencia de un solo proveedor.", "Etiquetado riguroso (Tagging): mantener un rastreo financiero exacto en modelos de chargeback."] },
      { type: "paragraph", text: "En Moya y Asociados, integramos la excelencia contable con la consultoría tecnológica para asegurar que cada inversión en infraestructura digital genere un retorno medible y estratégico." },
    ],
  },
];
