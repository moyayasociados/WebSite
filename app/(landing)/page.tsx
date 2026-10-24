import { Footer } from "@/components/layout/footer";
import { LandingRouteScroller } from "@/components/layout/landing-route-scroller";
import { Header } from "@/components/layout/header";
import { WhatsAppFab } from "@/components/ui/whatsapp-fab";
import { BlogSection } from "@/features/blog/components/blog-section";
import { ContactSection } from "@/features/contact/components/contact-section";
import { About } from "@/features/landing/components/about";
import { Hero } from "@/features/landing/components/hero";
import { Process } from "@/features/landing/components/process";
import { Services } from "@/features/landing/components/services";
import { Technology } from "@/features/landing/components/technology";
import { getSiteData } from "@/features/landing/lib/site-data";
// Cached and served statically; the admin API revalidates on every content change.
export const revalidate = 3600;
export default async function HomePage() {
  const data = await getSiteData();
  return (
    <>
      <LandingRouteScroller />
      <Header config={data} />
      <main>
        <Hero data={data} />
        <Services items={data.services} />
        <Technology items={data.technologies} />
        <About data={data} />
        <Process items={data.process} />
        <BlogSection />
        <ContactSection data={data} />
      </main>
      <Footer config={data} />
      <WhatsAppFab />
    </>
  );
}
