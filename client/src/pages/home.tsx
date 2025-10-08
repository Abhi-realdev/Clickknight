import { Navbar } from "@/components/navbar";
import { HeroBanner } from "@/components/hero-banner";
import { UrlChecker } from "@/components/url-checker";
import { OverviewSection } from "@/components/overview-section";
import { TeamSection } from "@/components/team-section";
import { SchoolSection } from "@/components/school-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-20">
        <HeroBanner />
        <UrlChecker />
        <OverviewSection />
        <TeamSection />
        <SchoolSection />
      </main>
      <Footer />
    </div>
  );
}
