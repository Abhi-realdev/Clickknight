import { useState } from "react";
import { GraduationCap, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* School Logo and Name */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <GraduationCap className="text-primary-foreground text-lg" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-foreground">SPS International School</h1>
            <p className="text-xs text-muted-foreground">Palwal</p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => scrollToSection('overview')}
            className="text-muted-foreground hover:text-primary transition-colors"
            data-testid="link-overview"
          >
            Overview
          </button>
          <button 
            onClick={() => scrollToSection('team')}
            className="text-muted-foreground hover:text-primary transition-colors"
            data-testid="link-team"
          >
            Our Team
          </button>
          <button 
            onClick={() => scrollToSection('school')}
            className="text-muted-foreground hover:text-primary transition-colors"
            data-testid="link-school"
          >
            Our School
          </button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          data-testid="button-mobile-menu"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <button 
              onClick={() => scrollToSection('overview')}
              className="block w-full text-left text-muted-foreground hover:text-primary transition-colors py-2"
              data-testid="mobile-link-overview"
            >
              Overview
            </button>
            <button 
              onClick={() => scrollToSection('team')}
              className="block w-full text-left text-muted-foreground hover:text-primary transition-colors py-2"
              data-testid="mobile-link-team"
            >
              Our Team
            </button>
            <button 
              onClick={() => scrollToSection('school')}
              className="block w-full text-left text-muted-foreground hover:text-primary transition-colors py-2"
              data-testid="mobile-link-school"
            >
              Our School
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
