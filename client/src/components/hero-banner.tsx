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
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Campus background image with animated overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 animate-pulse"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')",
          animationDuration: '8s'
        }}
      />
      <div className="absolute inset-0 hero-gradient" />
      
      {/* Floating background elements */}
      <motion.div 
        className="absolute top-20 left-10 w-6 h-6 bg-accent/20 rounded-full blur-sm"
        animate={{ 
          y: [-20, 20, -20],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-32 right-16 w-4 h-4 bg-secondary/30 rounded-full blur-sm"
        animate={{ 
          y: [20, -20, 20],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-6"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <Shield className="w-16 h-16 text-accent mx-auto" />
          </motion.div>
        </motion.div>

        <motion.h1 
          className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight"
          data-testid="text-hero-title"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          style={{
            textShadow: "0 0 30px rgba(56, 189, 248, 0.8), 0 0 60px rgba(56, 189, 248, 0.4), 0 0 100px rgba(56, 189, 248, 0.2)",
            background: "linear-gradient(135deg, #ffffff 0%, #38bdf8 50%, #facc15 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}
        >
          ClickKnight
        </motion.h1>

        <motion.p 
          className="text-2xl md:text-3xl text-white/95 mb-4 font-medium tracking-wide"
          data-testid="text-hero-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Your Guardian Against Suspicious Links
        </motion.p>

        <motion.p 
          className="text-lg md:text-xl text-white/85 mb-12 max-w-3xl mx-auto leading-relaxed"
          data-testid="text-hero-description"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
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
        >
          <Button
            onClick={scrollToChecker}
            className="bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent text-primary px-12 py-4 rounded-full text-lg font-bold shadow-2xl border-2 border-accent/50 hover:border-accent transition-all duration-300 neon-glow-yellow"
            data-testid="button-start-checking"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Start Checking URLs
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
