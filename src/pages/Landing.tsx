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
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10" />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.05) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
        
        <div className="container relative px-4 pt-32 pb-40">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/30 mb-8 backdrop-blur-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              <span className="text-sm font-bold text-primary tracking-wider">NEXT-GEN DEPOT CONTROL SYSTEM</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-pulse-glow">
                Smart Depot
              </span>
              <br />
              <span className="text-foreground">Induction Platform</span>
            </h1>

            <p className="text-2xl md:text-3xl font-light mb-12 text-muted-foreground tracking-wide">
              Precision. <span className="text-primary">Safety.</span> Reliability.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/login">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-12 py-6 text-lg rounded-xl shadow-glow transition-all hover:shadow-glow hover:scale-105"
                >
                  Launch Control Panel
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline"
                className="border-primary/50 text-primary hover:bg-primary/10 font-bold px-12 py-6 text-lg rounded-xl backdrop-blur-sm"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Platform */}
      <section className="container px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-black text-center mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Why This Platform
            </span>
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-16">
            Built for mission-critical operations
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="w-12 h-12" />}
              title="Seamless Train Induction"
              description="Automated workflows reduce induction time by 60%, ensuring trains are service-ready faster than ever."
              glowColor="var(--primary)"
            />
            <FeatureCard
              icon={<Shield className="w-12 h-12" />}
              title="AI-driven Alerts & Maintenance"
              description="Predictive analytics detect issues before they occur, preventing 95% of unscheduled downtime."
              glowColor="var(--secondary)"
            />
            <FeatureCard
              icon={<BarChart3 className="w-12 h-12" />}
              title="Role-based Smart Dashboards"
              description="Each team member gets a tailored interface optimized for their specific operational needs."
              glowColor="var(--accent)"
            />
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section className="container px-4 py-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black text-center mb-4">
            <span className="bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent">
              Role-Based Command Centers
            </span>
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-16">
            Click to access your specialized control interface
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {roles.map((role) => (
              <Link key={role.id} to="/login" state={{ preselectedRole: role.id }}>
                <div
                  className="group relative p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden"
                  style={{
                    boxShadow: `0 0 0 1px ${role.color}20, 0 8px 32px -8px ${role.color}40`
                  }}
                >
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{ background: `radial-gradient(circle at 50% 50%, ${role.color}, transparent)` }}
                  />
                  
                  <div className="relative z-10">
                    <div 
                      className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110"
                      style={{ filter: `drop-shadow(0 0 8px ${role.color})` }}
                    >
                      {role.icon}
                    </div>
                    
                    <h3 className="text-xl font-bold mb-1 text-foreground group-hover:text-primary transition-colors">
                      {role.title}
                    </h3>
                    <p className="text-sm font-semibold mb-3" style={{ color: role.color }}>
                      {role.subtitle}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {role.description}
                    </p>
                  </div>

                  <div 
                    className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    style={{ backgroundColor: role.color }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Impact & Benefits */}
      <section className="container px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-black text-center mb-16">
            <span className="bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
              Operational Excellence
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <ImpactCard
              icon={<TrendingUp className="w-10 h-10" />}
              number="60%"
              label="Time Saved"
              color="hsl(var(--role-signalling))"
            />
            <ImpactCard
              icon={<Award className="w-10 h-10" />}
              number="95%"
              label="Error Reduction"
              color="hsl(var(--role-telecom))"
            />
            <ImpactCard
              icon={<Users className="w-10 h-10" />}
              number="99.9%"
              label="Reliability Boost"
              color="hsl(var(--role-branding))"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container px-4 py-12">
          <div className="max-w-6xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Smart Depot Induction Platform
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Next-generation depot operations management
            </p>
            <p className="text-muted-foreground text-xs">
              © 2025 KMRL DSS. All rights reserved. Built for operational excellence.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, glowColor }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  glowColor: string;
}) => (
  <div className="group relative p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 overflow-hidden">
    <div 
      className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
      style={{ background: `radial-gradient(circle at 50% 0%, ${glowColor}, transparent)` }}
    />
    
    <div className="relative z-10">
      <div 
        className="text-primary mb-6 transition-transform duration-300 group-hover:scale-110"
        style={{ filter: `drop-shadow(0 0 8px ${glowColor})` }}
      >
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4 text-foreground">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  </div>
);

const ImpactCard = ({ icon, number, label, color }: {
  icon: React.ReactNode;
  number: string;
  label: string;
  color: string;
}) => (
  <div className="relative p-10 rounded-2xl bg-card border border-border/50 text-center overflow-hidden group">
    <div 
      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
      style={{ background: `radial-gradient(circle at 50% 50%, ${color}, transparent)` }}
    />
    
    <div className="relative z-10">
      <div className="flex justify-center mb-4" style={{ color }}>
        {icon}
      </div>
      <div className="text-6xl font-black mb-2" style={{ color }}>
        {number}
      </div>
      <p className="text-muted-foreground font-semibold text-lg">{label}</p>
    </div>
  </div>
);

export default Landing;
