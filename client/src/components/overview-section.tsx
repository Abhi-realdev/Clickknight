import { Search, GraduationCap, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function OverviewSection() {
  return (
    <section id="overview" className="py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why ClickKnight?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn to stay safe online by understanding how websites can be dangerous and how to identify them.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow" data-testid="card-smart-analysis">
            <CardHeader>
              <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mb-6">
                <Search className="text-primary text-2xl" />
              </div>
              <CardTitle className="text-xl font-bold text-foreground mb-4">
                Smart Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our tool checks domain age, SSL certificates, URL patterns, and cross-references with security databases to give you accurate results.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow" data-testid="card-educational">
            <CardHeader>
              <div className="w-16 h-16 bg-success/20 rounded-xl flex items-center justify-center mb-6">
                <GraduationCap className="text-success text-2xl" />
              </div>
              <CardTitle className="text-xl font-bold text-foreground mb-4">
                Educational
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Every result comes with detailed explanations to help you understand why a link is safe or dangerous, building your cybersecurity knowledge.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow" data-testid="card-stay-protected">
            <CardHeader>
              <div className="w-16 h-16 bg-warning/20 rounded-xl flex items-center justify-center mb-6">
                <Shield className="text-warning text-2xl" />
              </div>
              <CardTitle className="text-xl font-bold text-foreground mb-4">
                Stay Protected
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Developed by students for students, ClickKnight helps you avoid phishing scams, malware, and other online threats before they can harm you.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
