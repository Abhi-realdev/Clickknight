import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SchoolSection() {
  const schoolFeatures = [
    {
      title: "Modern Labs",
      description: "State-of-the-art computer labs equipped with latest technology for hands-on learning.",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=240"
    },
    {
      title: "Innovation Hub",
      description: "Collaborative spaces where students work together on real-world technology projects.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=240"
    },
    {
      title: "Digital Library",
      description: "Comprehensive digital resources and learning materials accessible to all students.",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=240"
    },
    {
      title: "Project Showcase",
      description: "Regular opportunities for students to present and demonstrate their innovative projects.",
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=240"
    }
  ];

  return (
    <section id="school" className="py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            About Our School
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            SPS International School, Palwal is committed to providing world-class education with a focus on technology, innovation, and student development. Our students are encouraged to explore, create, and solve real-world problems through hands-on projects like ClickKnight.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {schoolFeatures.map((feature, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow" data-testid={`card-school-feature-${index}`}>
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="p-4">
                <CardTitle className="text-lg font-bold text-foreground">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
