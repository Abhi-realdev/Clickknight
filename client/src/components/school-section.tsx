import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Monitor, Lightbulb, BookOpen, Trophy, School, MapPin, Users, Calendar } from "lucide-react";

export function SchoolSection() {
  const schoolFeatures = [
    {
      title: "Modern Labs",
      description: "State-of-the-art computer labs equipped with latest technology for hands-on learning.",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=240",
      icon: Monitor,
      details: "50+ latest computers • Smart boards • VR/AR setups • Maker space with 3D printers",
      color: "from-secondary to-secondary/80"
    },
    {
      title: "Innovation Hub",
      description: "Collaborative spaces where students work together on real-world technology projects.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=240",
      icon: Lightbulb,
      details: "Project incubator • Team collaboration spaces • Mentorship programs • Innovation challenges",
      color: "from-accent to-accent/80"
    },
    {
      title: "Digital Library",
      description: "Comprehensive digital resources and learning materials accessible to all students.",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=240",
      icon: BookOpen,
      details: "10,000+ e-books • Research databases • Online courses • 24/7 access for students",
      color: "from-success to-success/80"
    },
    {
      title: "Project Showcase",
      description: "Regular opportunities for students to present and demonstrate their innovative projects.",
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=240",
      icon: Trophy,
      details: "Monthly showcases • Science fairs • Tech competitions • Industry partnerships",
      color: "from-warning to-warning/80"
    }
  ];

  return (
    <motion.section 
      id="school" 
      className="py-20 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-primary/5" />
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
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
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-accent to-secondary rounded-2xl flex items-center justify-center mb-6 neon-glow">
              <School className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black text-primary mb-6 tracking-tight">
            SPS International School
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
            Committed to world-class education with a focus on technology, innovation, and student development. 
            Empowering students to explore, create, and solve real-world problems.
          </p>
          
          {/* School Info Badge */}
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-card/80 to-card backdrop-blur-sm border border-primary/20 rounded-full px-8 py-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <MapPin className="w-4 h-4 text-accent" />
              <span>Palwal, India</span>
            </div>
            <div className="w-px h-4 bg-primary/20" />
            <div className="flex items-center gap-2 text-sm font-medium">
              <Users className="w-4 h-4 text-secondary" />
              <span>1000+ Students</span>
            </div>
            <div className="w-px h-4 bg-primary/20" />
            <div className="flex items-center gap-2 text-sm font-medium">
              <Calendar className="w-4 h-4 text-success" />
              <span>Est. 2010</span>
            </div>
          </div>
        </motion.div>

        {/* Interactive Flip Cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {schoolFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0, rotateY: -15 }}
              whileInView={{ y: 0, opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              viewport={{ once: true }}
              className="group perspective-1000"
              data-testid={`card-school-feature-${index}`}
            >
              <motion.div
                className="relative h-80 w-full cursor-pointer preserve-3d transition-transform duration-700 group-hover:rotate-y-180"
                whileHover={{ scale: 1.05 }}
              >
                {/* Front of Card */}
                <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl">
                  <Card className="h-full border-2 border-transparent bg-gradient-to-br from-card to-card/80 backdrop-blur-sm shadow-xl overflow-hidden relative">
                    {/* Image Background */}
                    <div className="absolute inset-0">
                      <img 
                        src={feature.image} 
                        alt={feature.title}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${feature.color} opacity-80`} />
                    </div>
                    
                    {/* Front Content */}
                    <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
                      <motion.div
                        className="mb-4"
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, 0]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <feature.icon className="w-12 h-12 text-white" />
                      </motion.div>
                      <CardTitle className="text-2xl font-bold mb-3">
                        {feature.title}
                      </CardTitle>
                      <p className="text-white/90 text-sm">
                        {feature.description}
                      </p>
                      
                      {/* Flip indicator */}
                      <div className="mt-4 text-xs text-white/70 flex items-center gap-1">
                        <motion.span
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                        Hover to explore
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Back of Card */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl">
                  <Card className="h-full border-2 border-primary/20 bg-gradient-to-br from-card to-card/90 backdrop-blur-sm shadow-2xl overflow-hidden relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5`} />
                    
                    <CardContent className="p-6 h-full flex flex-col justify-center relative z-10">
                      <div className="text-center mb-6">
                        <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${feature.color} bg-opacity-20 flex items-center justify-center mb-4`}>
                          <feature.icon className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-4">
                          {feature.title} Details
                        </h3>
                      </div>
                      
                      <div className="space-y-3">
                        {feature.details.split(" • ").map((detail, detailIndex) => (
                          <motion.div
                            key={detailIndex}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: detailIndex * 0.1 }}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                            <span>{detail.trim()}</span>
                          </motion.div>
                        ))}
                      </div>
                      
                      <div className="mt-6 text-center">
                        <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm rounded-full px-4 py-2 text-xs font-medium text-primary">
                          <Trophy className="w-3 h-3" />
                          Excellence in Education
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* School Statistics */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {[
            { number: "15+", label: "Years of Excellence", icon: Calendar },
            { number: "1000+", label: "Happy Students", icon: Users },
            { number: "50+", label: "Expert Faculty", icon: Trophy },
            { number: "100+", label: "Tech Projects", icon: Lightbulb }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-accent/20 to-secondary/20 rounded-2xl flex items-center justify-center mb-4">
                <stat.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
