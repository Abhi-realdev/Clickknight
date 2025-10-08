import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
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
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 navbar-gradient backdrop-blur-sm border-b border-white/10 z-50 shadow-lg"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* School Logo and Name */}
        <motion.div 
          className="flex items-center space-x-3"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-12 h-18 bg-white/100 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/30 p-2">
            <img 
              src="/logo.jpg"
              alt="SPS International School Logo" 
              className="w-full h-full object-contain"
              onError={(e) => {
                console.error('Logo failed to load:', e);
                console.log('Attempted to load:', '/logo.jpg');
                // Try alternative path as fallback
                const img = e.target as HTMLImageElement;
                if (img.src.includes('/logo.jpg')) {
                  img.src = './logo.jpg';
                }
              }}
              onLoad={() => console.log('Logo loaded successfully')}
            />
          </div>
          <div>
            <h1 className="font-bold text-lg text-white">SPS International School</h1>
            <p className="text-xs text-white/80">Palwal</p>
          </div>
        </motion.div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 ml-auto">
          {[
            { label: 'Home', id: 'home' },
            { label: 'Overview', id: 'overview' },
            { label: 'Our Team', id: 'team' },
            { label: 'Our School', id: 'school' }
          ].map((item, index) => (
            <motion.button 
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-white hover:text-white/90 font-bold text-lg px-4 py-2 rounded-lg transition-all duration-300 relative hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20"
              data-testid={`link-${item.id}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                textShadow: "0 0 12px rgba(255,255,255,0.9)",
                boxShadow: "0 4px 20px rgba(255,255,255,0.2)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-1 bg-accent rounded-full"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-lg"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <motion.div
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-white hover:bg-white/20 border-white/30"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden bg-white/10 backdrop-blur-md border-t border-white/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              {[
                { label: 'Home', id: 'home' },
                { label: 'Overview', id: 'overview' },
                { label: 'Our Team', id: 'team' },
                { label: 'Our School', id: 'school' }
              ].map((item, index) => (
                <motion.button 
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left text-white hover:text-white/90 font-bold text-lg transition-all duration-300 py-4 px-6 rounded-lg hover:bg-white/20 border border-transparent hover:border-white/30 backdrop-blur-sm"
                  data-testid={`mobile-link-${item.id}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    x: 15, 
                    scale: 1.02,
                    boxShadow: "0 4px 15px rgba(255,255,255,0.1)" 
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative">
                    {item.label}
                    <motion.div
                      className="absolute -bottom-1 left-0 h-0.5 bg-accent rounded-full"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
