export const siteConfig = {
  name: "Moya y Asociados",
  legalName: "Moya y Asociados",
  description:
    "Tecnología y contabilidad para empresas que quieren crecer con orden.",
  logo: { src: "/logtipoMoyayAsociados1.png", alt: "Moya y Asociados" },
  email: "contacto@moyayasociados.com",
  phone: "+593 999 999 999",
  office: "Quito, Ecuador",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "593999999999",
  social: {
    instagram: "https://www.instagram.com/moyayasociados/",
    facebook: "https://www.facebook.com/moyayasociadosoficial",
    linkedin: "https://linkedin.com/",
    twitter: "",
  },
};
export const navigation = [
  { label: "Inicio", href: "/inicio" },
  { label: "Servicios", href: "/servicios" },
  { label: "Sobre Nosotros", href: "/sobre-nosotros" },
  { label: "Proceso", href: "/proceso" },
  { label: "Blog", href: "/novedades" },
  { label: "Contacto", href: "/contacto" },
];
export const heroContent = {
  eyebrow: "Tecnología + Contabilidad",
  title:
    "Impulsamos su negocio con tecnología de vanguardia y gestión contable profesional",
  description:
    "Soluciones integrales a medida para emprendedores y empresas en crecimiento. Combinamos precisión financiera con innovación digital.",
  primaryCta: "Solicitar cotización",
  secondaryCta: "Ver servicios",
};
export const processSteps = [
  {
    number: "1",
    title: "Diagnóstico",
    description: "Analizamos sus necesidades, contexto y objetivos.",
  },
  {
    number: "2",
    title: "Propuesta",
    description: "Diseñamos una solución a medida y un plan de acción.",
  },
  {
    number: "3",
    title: "Ejecución",
    description: "Desarrollamos e implementamos con un enfoque iterativo.",
  },
  {
    number: "4",
    title: "Entrega y Soporte",
    description: "Ponemos la solución en marcha y acompañamos su evolución.",
  },
];
export const contactInfo = [
  {
    icon: "mail",
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: "phone",
    label: "Teléfono",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
  },
  { icon: "map-pin", label: "Oficina", value: siteConfig.office, href: "#" },
];

export const serviceGroups = [
  {
    title: "Servicios Contables",
    items: [
      {
        icon: "wallet",
        title: "Gestión Financiera",
        description:
          "Control financiero para tomar decisiones con información clara.",
      },
      {
        icon: "receipt",
        title: "Asesoría Tributaria",
        description:
          "Acompañamiento para cumplir obligaciones y mantener sus procesos ordenados.",
      },
      {
        icon: "clipboard",
        title: "Auditoría Externa",
        description:
          "Verificación independiente para fortalecer la transparencia contable.",
      },
      {
        icon: "users",
        title: "Planificación de Nómina",
        description:
          "Gestión organizada de recursos humanos y obligaciones laborales.",
      },
    ],
  },
  {
    title: "Desarrollo de Software",
    items: [
      {
        icon: "globe",
        title: "Desarrollo Web a Medida",
        description:
          "Creamos plataformas web escalables y optimizadas para su negocio.",
      },
      {
        icon: "smartphone",
        title: "Aplicaciones Móviles",
        description:
          "Apps diseñadas para ofrecer una experiencia clara, rápida y útil.",
      },
      {
        icon: "cloud",
        title: "Arquitectura y DevOps",
        description:
          "Infraestructura robusta y despliegue continuo para una operación confiable.",
      },
      {
        icon: "workflow",
        title: "Integración de Sistemas",
        description:
          "Conectamos sus herramientas para conseguir flujos de trabajo unificados.",
      },
    ],
  },
];
export const technologyGroups = {
  development: [
    "React",
    "Angular",
    "Node.js",
    "Next.js",
    "NestJS",
    "Spring Boot",
    "SQL",
    "NoSQL",
    "DevOps",
  ],
  accounting: [
    "Cumplimiento NIIF",
    "Software Contable",
    "Gestión Tributaria",
    "Nómina y RRHH",
  ],
};
