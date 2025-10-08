import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Award, Users, GraduationCap } from "lucide-react";

export function TeamSection() {
  const mentor = {
    name: "Mr. Suraj Singh",
    role: "Mentor",
    title: "Computer Science Educator",
    image: "/Suraj-Singh.png",
    experience: "5+ years",
    specialization: "Cybersecurity & Software Engineering"
  };

  const students = [
    {
      name: "Ghanisht",
      grade: "Grade 12",
      role: "Lead Developer",
      image: "/Ghanist.jpeg",
      color: "from-secondary to-secondary/80"
    },
    {
      name: "Yogesh Kumar",
      grade: "Grade 11",
      role: "Security Researcher",
      image: "/yogesh.jpeg",
      color: "from-accent to-accent/80"
    },
    {
      name: "Aarush Soni",
      grade: "Grade 12",
      role: "UI/UX Designer",
      image: "/Aarush soni.jpeg",
      color: "from-success to-success/80"
    },
    {
      name: "Abhishek",
      grade: "Grade 11",
      role: "Backend Developer",
      image: "/Abhishek.jpg",
      color: "from-primary to-primary/80"
    },
    {
      name: "Aditya",
      grade: "Grade 12",
      role: "Quality Assurance",
      image: "/Adity.jpeg",
      color: "from-warning to-warning/80"
    }
  ];

  return (
    <motion.section 
      id="team" 
      className="py-20 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
      
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
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-6 neon-glow">
              <Users className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black text-primary mb-6 tracking-tight">
            Meet Our Team
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            The brilliant minds behind ClickKnight's cybersecurity mission
          </p>
        </motion.div>

        {/* Mentor Card (Centered with Special Styling) */}
        <motion.div 
          className="flex justify-center mb-16"
          initial={{ y: 50, opacity: 0, scale: 0.8 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.div
            whileHover={{ y: -10, scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Card 
              className="max-w-md text-center border-2 border-primary/20 shadow-2xl bg-gradient-to-br from-card to-card/80 backdrop-blur-sm overflow-hidden relative"
              data-testid="card-mentor"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-accent to-accent/50 opacity-20 rounded-bl-full" />
              
              <CardContent className="p-10 relative z-10">
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="relative mb-6"
                >
                  <div className="w-32 h-32 mx-auto relative">
                    <img 
                      src={mentor.image} 
                      alt={mentor.name}
                      className="w-32 h-32 rounded-xl object-cover border-4 border-accent shadow-xl"
                    />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-accent-foreground" />
                    </div>
                  </div>
                </motion.div>
                
                <h3 className="text-2xl font-bold text-foreground mb-2">{mentor.name}</h3>
                <p className="text-primary font-bold mb-2 flex items-center justify-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  {mentor.role}
                </p>
                <p className="text-muted-foreground mb-3">{mentor.title}</p>
                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Award className="w-4 h-4 text-accent" />
                    <span>{mentor.experience}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2 italic">
                  {mentor.specialization}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Student Cards Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
          {students.map((student, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.05 }}
            >
              <Card 
                className="text-center border border-primary/10 shadow-lg bg-gradient-to-br from-card to-card/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 overflow-hidden relative"
                data-testid={`card-student-${index}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${student.color} opacity-0 hover:opacity-5 transition-opacity duration-300`} />
                
                <CardContent className="p-8 relative z-10">
                  <motion.div
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="mb-4"
                  >
                    <img 
                      src={student.image} 
                      alt={student.name}
                      className="w-24 h-24 rounded-xl mx-auto object-cover border-2 border-primary/20 shadow-lg"
                    />
                  </motion.div>
                  
                  <h4 className="font-bold text-foreground mb-2 text-lg">{student.name}</h4>
                  <p className="text-sm text-primary font-semibold mb-1">{student.role}</p>
                  <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                    <GraduationCap className="w-3 h-3" />
                    {student.grade}
                  </p>
                </CardContent>

                {/* Decorative corner */}
                <div className={`absolute top-0 right-0 w-12 h-12 bg-gradient-to-br ${student.color} opacity-20 rounded-bl-full`} />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Team Achievement Badge */}
        <motion.div
          className="text-center mt-16"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-sm border border-primary/20 rounded-full px-8 py-4">
            <Award className="w-6 h-6 text-accent" />
            <span className="text-lg font-semibold text-foreground">
              SPS International School - Cybersecurity Champions
            </span>
            <Star className="w-6 h-6 text-accent" />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
