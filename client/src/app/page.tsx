import {
  HeroSection,
  CoreFeaturesSection,
  FeaturesSection,
  ScalabilitySection,
  TechStackSection,
  CTASection,
  Footer,
  LandingNavbar,
} from '@/components/landing';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingNavbar />
      <main className="flex-1">
        <HeroSection />
        <CoreFeaturesSection />
        <FeaturesSection />
        <ScalabilitySection />
        <TechStackSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
