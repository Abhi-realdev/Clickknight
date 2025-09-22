import { Button } from "@/components/ui/button";

export function HeroBanner() {
  const scrollToChecker = () => {
    const element = document.getElementById('checker');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Campus background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')"
        }}
      />
      <div className="absolute inset-0 hero-gradient opacity-85" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-4" data-testid="text-hero-title">
          ClickKnight
        </h1>
        <p className="text-xl md:text-2xl text-primary-foreground/90 mb-2" data-testid="text-hero-subtitle">
          Your Digital Shield Against Suspicious Links
        </p>
        <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto" data-testid="text-hero-description">
          Paste any URL and get instant safety analysis. Learn to identify phishing, malware, and suspicious websites with detailed explanations.
        </p>
        <Button
          onClick={scrollToChecker}
          className="bg-primary-foreground text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary-foreground/90 transition-colors"
          data-testid="button-start-checking"
        >
          Start Checking URLs
        </Button>
      </div>
    </section>
  );
}
