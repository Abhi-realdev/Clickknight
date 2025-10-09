import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, Sparkles } from "lucide-react";

export function HeroBanner() {
  const scrollToChecker = () => {
    const element = document.getElementById('checker');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Campus background image - steady and clear */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://www.spsipalwal.com/img/slider/sps-building.jpeg')",
          opacity: 1.0
        }}
      />
      <div className="absolute inset-0 hero-gradient" />
      
      {/* Enhanced floating background elements */}
      <motion.div 
        className="absolute top-20 left-10 w-8 h-8 bg-accent/30 rounded-full blur-sm"
        animate={{ 
          y: [-20, 20, -20],
          opacity: [0.2, 0.6, 0.2],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-32 right-16 w-6 h-6 bg-secondary/40 rounded-full blur-sm"
        animate={{ 
          y: [20, -20, 20],
          opacity: [0.2, 0.7, 0.2],
          scale: [1, 1.3, 1]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      {/* Additional animated elements */}
      <motion.div 
        className="absolute top-1/3 right-20 w-4 h-4 bg-accent/25 rounded-full blur-sm"
        animate={{ 
          x: [-15, 15, -15],
          y: [-10, 10, -10],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      <motion.div 
        className="absolute top-2/3 left-20 w-5 h-5 bg-primary/20 rounded-full blur-sm"
        animate={{ 
          x: [10, -10, 10],
          opacity: [0.2, 0.6, 0.2],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      />

      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block mb-8"
          >
            <Shield className="w-20 h-20 mx-auto" style={{ 
              filter: 'drop-shadow(0 0 20px rgba(255, 87, 34, 0.8)) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))',
              color: '#FF5722',
              background: 'linear-gradient(135deg, #FF8A65 0%, #FF5722 50%, #D84315 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              strokeWidth: '2px'
            }} />
          </motion.div>
        </motion.div>

        <motion.h1 
          className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 tracking-tight"
          data-testid="text-hero-title"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          style={{
            color: "#1976d2",
            textShadow: "0 4px 8px rgba(0, 0, 0, 0.8), 0 8px 16px rgba(0, 0, 0, 0.6), 0 0 20px rgba(25, 118, 210, 0.3)",
            letterSpacing: "-0.02em"
          }}
        >
          ClickKnight
        </motion.h1>

        <motion.p 
          className="text-2xl md:text-4xl mb-6 font-bold tracking-wide text-white bg-blue-500/20 backdrop-blur-sm rounded-lg px-6 py-2"
          data-testid="text-hero-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.7), 0 4px 8px rgba(0, 0, 0, 0.5)",
            letterSpacing: "0.05em",
            fontWeight: 800
          }}
        >
          Your Guardian Against Suspicious Links
        </motion.p>

        <motion.p 
          className="text-lg md:text-xl mb-16 max-w-4xl mx-auto leading-relaxed font-semibold text-white bg-black/20 backdrop-blur-sm rounded-lg px-6 py-4"
          data-testid="text-hero-description"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          style={{
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.6)",
            lineHeight: "1.7"
          }}
        >
          Paste any URL and get instant safety analysis with AI-powered detection. 
          Learn to identify phishing, malware, and suspicious websites through detailed explanations 
          designed for students and cybersecurity learners.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mb-12"
        >
          <Button
            onClick={scrollToChecker}
            className="bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/50 px-10 py-4 rounded-lg text-lg font-bold backdrop-blur-md transition-all duration-300 shadow-lg hover:shadow-xl"
            data-testid="button-start-checking"
            style={{
              background: 'linear-gradient(135deg, #FFB74D 0%, #FF8A65 30%, #FF5722 70%, #D84315 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.6)",
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4))'
            }}
          >
            <Sparkles className="w-5 h-5 mr-3" style={{
              color: '#FF5722',
              filter: 'drop-shadow(0 0 10px rgba(255, 87, 34, 0.6))'
            }} />
            Start Checking URLs
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 border-2 rounded-full flex justify-center backdrop-blur-sm" style={{
            borderColor: '#B39DDB',
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3), 0 0 12px rgba(179, 157, 219, 0.4)"
          }}>
            <div className="w-1.5 h-3 rounded-full mt-2 shadow-sm" style={{
              background: 'linear-gradient(135deg, #87CEEB 0%, #9575CD 100%)',
              boxShadow: '0 0 6px rgba(135, 206, 235, 0.5)'
            }}></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
