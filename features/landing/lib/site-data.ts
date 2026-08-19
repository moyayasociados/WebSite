import {
  siteConfig as fallbackSite,
  heroContent as fallbackHero,
  navigation as fallbackNavigation,
  processSteps as fallbackProcess,
  serviceGroups as fallbackServiceGroups,
  technologyGroups as fallbackTechnologyGroups,
} from "@/shared/constants/site";
import { createClient } from "@/shared/lib/supabase/server";
export type SiteData = {
  site: any;
  hero: any;
  about: any;
  contact: any;
  social: any;
  footer: any;
  navigation: any;
  services: any[];
  technologies: any[];
  process: any[];
  values: any[];
};
const fallbackServices = fallbackServiceGroups.flatMap(
  (group: any, groupIndex: number) =>
    group.items.map((item: any, index: number) => ({
      id: `fallback-${groupIndex}-${index}`,
      group_name: groupIndex === 0 ? "development" : "accounting",
      ...item,
      sort_order: index,
      active: true,
    })),
);
const fallbackTechnologies = [
  ...fallbackTechnologyGroups.development.map((name: string, i: number) => ({
    id: `dev-${i}`,
    group_name: "development",
    name,
    sort_order: i,
    active: true,
  })),
  ...fallbackTechnologyGroups.accounting.map((name: string, i: number) => ({
    id: `acc-${i}`,
    group_name: "accounting",
    name,
    sort_order: i,
    active: true,
  })),
];
const fallbackValues = [
  {
    id: "v1",
    icon: "handshake",
    title: "Compromiso",
    description:
      "Dedicación total a los objetivos y el éxito a largo plazo de nuestros clientes.",
  },
  {
    id: "v2",
    icon: "lightbulb",
    title: "Innovación",
    description:
      "Búsqueda constante de soluciones tecnológicas que marquen la diferencia.",
  },
  {
    id: "v3",
    icon: "eye",
    title: "Transparencia",
    description:
      "Claridad y honestidad en cada proceso financiero y desarrollo de software.",
  },
  {
    id: "v4",
    icon: "star",
    title: "Excelencia",
    description:
      "Altos estándares de calidad en cada entregable y asesoría que brindamos.",
  },
];
export async function getSiteData(): Promise<SiteData> {
  const fallback = {
    site: fallbackSite,
    hero: fallbackHero,
    about: {
      title: "Sobre Nosotros",
      paragraphs: [
        "Nuestra visión es unir la precisión financiera con la innovación digital. Creemos que las empresas del futuro necesitan un socio estratégico que comprenda tanto el lenguaje de los negocios y los números, como el poder transformador de la tecnología.",
        "Con años de experiencia en ambos sectores, ofrecemos un enfoque integral y vanguardista que impulsa el crecimiento, mitiga riesgos y optimiza cada proceso operativo.",
      ],
    },
    contact: {
      email: fallbackSite.email,
      phone: fallbackSite.phone,
      office: fallbackSite.office,
      whatsapp: fallbackSite.whatsappNumber,
    },
    social: fallbackSite.social,
    footer: {
      description: fallbackSite.description,
      portalLabel: "Ingreso a portal",
    },
    navigation: { items: fallbackNavigation },
    services: fallbackServices,
    technologies: fallbackTechnologies,
    process: fallbackProcess.map((x: any, i: number) => ({
      id: `p-${i}`,
      step_number: Number(x.number),
      ...x,
      sort_order: i,
    })),
    values: fallbackValues,
  };
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  )
    return fallback;
  const supabase = await createClient();
  const [content, services, technologies, processSteps, values] =
    await Promise.all([
      supabase.from("site_content").select("key,value"),
      supabase.from("services").select("*").order("sort_order"),
      supabase.from("technologies").select("*").order("sort_order"),
      supabase.from("process_steps").select("*").order("sort_order"),
      supabase.from("about_values").select("*").order("sort_order"),
    ]);
  const map = Object.fromEntries(
    (content.data ?? []).map((row: any) => [row.key, row.value]),
  );
  return {
    site: map.site ?? fallback.site,
    hero: map.hero ?? fallback.hero,
    about: map.about ?? fallback.about,
    contact: map.contact ?? fallback.contact,
    social: map.social ?? fallback.social,
    footer: map.footer ?? fallback.footer,
    navigation: map.navigation ?? fallback.navigation,
    services: services.data?.length ? services.data : fallback.services,
    technologies: technologies.data?.length
      ? technologies.data
      : fallback.technologies,
    process: processSteps.data?.length ? processSteps.data : fallback.process,
    values: values.data?.length ? values.data : fallback.values,
  };
}
