import { Card, CardContent } from "@/components/ui/card";

export function TeamSection() {
  const mentor = {
    name: "Mr. Rajesh Kumar",
    role: "Project Mentor",
    title: "Computer Science Teacher",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
  };

  const students = [
    {
      name: "Priya Sharma",
      grade: "Grade 12",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612045b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
    },
    {
      name: "Arjun Singh",
      grade: "Grade 11",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
    },
    {
      name: "Sneha Gupta",
      grade: "Grade 12",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
    },
    {
      name: "Rohit Verma",
      grade: "Grade 11",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
    },
    {
      name: "Ananya Patel",
      grade: "Grade 12",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
    }
  ];

  return (
    <section id="team" className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Meet Our Team
          </h2>
          <p className="text-xl text-muted-foreground">
            The dedicated minds behind ClickKnight
          </p>
        </div>

        {/* Mentor Card (Centered) */}
        <div className="flex justify-center mb-12">
          <Card className="max-w-sm text-center hover:shadow-lg transition-shadow" data-testid="card-mentor">
            <CardContent className="p-8">
              <img 
                src={mentor.image} 
                alt={mentor.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-foreground mb-2">{mentor.name}</h3>
              <p className="text-primary font-semibold mb-3">{mentor.role}</p>
              <p className="text-muted-foreground text-sm">{mentor.title}</p>
            </CardContent>
          </Card>
        </div>

        {/* Student Cards */}
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {students.map((student, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow" data-testid={`card-student-${index}`}>
              <CardContent className="p-6">
                <img 
                  src={student.image} 
                  alt={student.name}
                  className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
                />
                <h4 className="font-bold text-foreground mb-1">{student.name}</h4>
                <p className="text-xs text-muted-foreground">{student.grade}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
