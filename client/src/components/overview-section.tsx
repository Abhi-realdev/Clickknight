import { motion } from "framer-motion";
import { Shield, Zap, Lock, Sword, Brain, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function OverviewSection() {
  const features = [
    {
      icon: Shield,
      title: "Smart Analysis",
      description: "Advanced AI-powered detection checks domain age, SSL certificates, URL patterns, and cross-references with security databases for accurate threat assessment.",
      color: "from-secondary to-secondary/80",
      bgColor: "bg-secondary/10",
      iconColor: "text-secondary",
      testId: "card-smart-analysis"
    },
    {
      icon: Sword,
      title: "Knight Protection",
      description: "Like a digital knight, our tool stands guard against phishing, malware, and suspicious websites before they can cause harm to your digital kingdom.",
      color: "from-accent to-accent/80",
      bgColor: "bg-accent/10", 
      iconColor: "text-accent",
      testId: "card-educational"
    },
    {
      icon: Lock,
      title: "Security Lock",
      description: "Multi-layered security analysis with educational explanations helps you understand cybersecurity concepts while keeping you protected online.",
      color: "from-success to-success/80",
      bgColor: "bg-success/10",
      iconColor: "text-success",
      testId: "card-stay-protected"
    }
  ];

  return (
    <motion.section 
      id="overview" 
      className="py-20 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/5 to-accent/5" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 max-w-7xl relative">
        <motion.div 
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-6 neon-glow">
              <ShieldCheck className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black text-primary mb-6 tracking-tight">
            Why ClickKnight?
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Discover the power of intelligent URL analysis with educational insights. 
            Learn cybersecurity while staying protected from online threats.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <Card 
                className={`relative h-full border-2 border-transparent bg-gradient-to-br from-card to-card/80 backdrop-blur-sm shadow-xl scale-hover overflow-hidden`}
                data-testid={feature.testId}
              >
                {/* Animated background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 transition-opacity duration-300 hover:opacity-5`} />
                
                <CardHeader className="relative z-10 pb-4">
                  <motion.div 
                    className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 relative ${feature.bgColor}`}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <feature.icon className={`w-10 h-10 ${feature.iconColor}`} />
                    </motion.div>
                  </motion.div>
                  
                  <CardTitle className="text-2xl font-bold text-foreground mb-4">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="relative z-10">
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>

                {/* Decorative corner accent */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${feature.color} opacity-10 rounded-bl-full`} />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom call-to-action */}
        <motion.div
          className="text-center mt-16"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-4 text-lg font-medium text-muted-foreground">
            <Zap className="w-5 h-5 text-accent" />
            <span>Built by students, for students at SPS International School</span>
            <Brain className="w-5 h-5 text-secondary" />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
