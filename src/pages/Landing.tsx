import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Shield, Zap, BarChart3, Award, TrendingUp, Users } from "lucide-react";

const Landing = () => {
  const roles = [
    {
      id: "supervisor",
      title: "Supervisor",
      subtitle: "Operations Planner",
      description: "Oversees induction, approvals, final decision-making",
      color: "hsl(var(--role-supervisor))",
      icon: "⚡",
    },
    {
      id: "rollingStock",
      title: "Rolling Stock Engineer",
      subtitle: "Fitness & Maintenance",
      description: "Fitness certificates, inspections, wear & mileage logs",
      color: "hsl(var(--role-rolling))",
      icon: "🔧",
    },
    {
      id: "signalling",
      title: "Signalling Officer",
      subtitle: "Safety & Routing",
      description: "Track safety, interlocking approvals, route checks",
      color: "hsl(var(--role-signalling))",
      icon: "🚦",
    },
    {
      id: "telecom",
      title: "Telecom Officer",
      subtitle: "Comms & Faults",
      description: "Communication systems, train radio approvals, fault alerts",
      color: "hsl(var(--role-telecom))",
      icon: "📡",
    },
    {
      id: "branding",
      title: "Branding Officer",
      subtitle: "Marketing & Brand Checks",
      description: "Trainset branding, advertisements, exterior wrap checks",
      color: "hsl(var(--role-branding))",
      icon: "🎨",
    },
    {
      id: "cleaning",
      title: "Cleaning Lead",
      subtitle: "Clean & Ready",
      description: "Hygiene status, end-of-day cleaning compliance",
      color: "hsl(var(--role-cleaning))",
      icon: "✨",
    },
    {
      id: "yard",
      title: "Yard / Depot Operator",
      subtitle: "Ground Ops",
      description: "Train stabling, geometry updates, ground execution",
      color: "hsl(var(--role-yard))",
      icon: "🏗️",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        
        <div className="container relative px-4 pt-24 pb-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Smart Depot Induction Platform
            </h1>

            <p className="text-2xl md:text-3xl mb-12 text-muted-foreground">
              Precision. Safety. Reliability.
            </p>

            <div className="flex items-center justify-center">
              <Link to="/login">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-12 py-6 text-lg"
                >
                  Login →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Platform */}
      <section id="features" className="container px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-3">
            Why This Platform
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-12">
            Built for mission-critical operations
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="w-10 h-10" />}
              title="Seamless Train Induction"
              description="Automated workflows reduce induction time by 60%, ensuring trains are service-ready faster than ever."
            />
            <FeatureCard
              icon={<Shield className="w-10 h-10" />}
              title="AI-driven Alerts & Maintenance"
              description="Predictive analytics detect issues before they occur, preventing 95% of unscheduled downtime."
            />
            <FeatureCard
              icon={<BarChart3 className="w-10 h-10" />}
              title="Role-based Smart Dashboards"
              description="Each team member gets a tailored interface optimized for their specific operational needs."
            />
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section id="roles" className="container px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-3">
            User Roles
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-12">
            Click to access your specialized control interface
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {roles.map((role) => (
              <Link key={role.id} to="/login" state={{ preselectedRole: role.id }}>
                <div className="group relative p-6 rounded-lg bg-card border border-border/50 hover:border-primary/50 transition-all hover:shadow-lg cursor-pointer h-full">
                  <div className="text-4xl mb-3">
                    {role.icon}
                  </div>
                  
                  <h3 className="text-lg font-bold mb-1 text-foreground group-hover:text-primary transition-colors">
                    {role.title}
                  </h3>
                  <p className="text-sm font-semibold mb-2" style={{ color: role.color }}>
                    {role.subtitle}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {role.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Impact & Benefits */}
      <section id="impacts" className="container px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Operational Excellence
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <ImpactCard
              icon={<TrendingUp className="w-8 h-8" />}
              number="60%"
              label="Time Saved"
              color="hsl(var(--role-signalling))"
            />
            <ImpactCard
              icon={<Award className="w-8 h-8" />}
              number="95%"
              label="Error Reduction"
              color="hsl(var(--role-telecom))"
            />
            <ImpactCard
              icon={<Users className="w-8 h-8" />}
              number="99.9%"
              label="Reliability Boost"
              color="hsl(var(--role-branding))"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-border/50 bg-card/50">
        <div className="container px-4 py-8">
          <div className="max-w-6xl mx-auto text-center">
            <h3 className="text-xl font-bold mb-1">
              Smart Depot Induction Platform
            </h3>
            <p className="text-muted-foreground text-sm mb-3">
              Next-generation depot operations management
            </p>
            <p className="text-muted-foreground text-xs">
              © 2025 KMRL DSS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => (
  <div className="p-6 rounded-lg bg-card border border-border/50 hover:border-primary/50 transition-all">
    <div className="text-primary mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-foreground">{title}</h3>
    <p className="text-muted-foreground leading-relaxed">{description}</p>
  </div>
);

const ImpactCard = ({ icon, number, label, color }: {
  icon: React.ReactNode;
  number: string;
  label: string;
  color: string;
}) => (
  <div className="p-8 rounded-lg bg-card border border-border/50 text-center">
    <div className="flex justify-center mb-3" style={{ color }}>
      {icon}
    </div>
    <div className="text-5xl font-bold mb-2" style={{ color }}>
      {number}
    </div>
    <p className="text-muted-foreground font-semibold">{label}</p>
  </div>
);

export default Landing;
