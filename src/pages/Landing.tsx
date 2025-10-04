import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { TrainsetCard } from "@/components/TrainsetCard";
import { CheckCircle2, Users, FileCheck, BarChart3 } from "lucide-react";
import demoTrainsets from "@/data/demoTrainsets.json";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <Header />
      
      {/* Hero Section */}
      <section className="container px-4 pt-20 pb-32">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              <span className="text-sm font-medium text-secondary">SIH Finale Ready • Demo data included</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-center mb-6 animate-fade-in-up">
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Smarter Induction.
            </span>
            <br />
            <span className="bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent">
              Smoother Journeys.
            </span>
          </h1>

          <p className="text-xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            KMRL DSS — nightly induction planner with explainable recommendations, live what-if simulation and audit-ready approvals.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-secondary" />
              Explainable Planner
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-secondary" />
              Multi-role Workflows
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-secondary" />
              Audit Trail & Governance
            </div>
          </div>

          {/* Live Demo Snapshot */}
          <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-8 border border-border/50 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-1">Live Demo Snapshot</h3>
                <p className="text-sm text-muted-foreground">5 trainsets • Real-time status</p>
              </div>
              <Button variant="outline" size="sm" className="bg-success/10 text-success border-success/30">
                Demo Data
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {demoTrainsets.slice(0, 5).map((trainset, idx) => (
                <TrainsetCard
                  key={trainset.id}
                  trainset={trainset}
                  confidence={[82, 95, 78, 92, 85][idx]}
                />
              ))}
            </div>

            <div className="bg-muted/30 rounded-xl p-6 border border-border/30">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-secondary" />
                <h4 className="font-bold text-foreground">Supervisor Recommendation</h4>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">
                  <span className="font-semibold text-success">Recommend:</span>{" "}
                  <span className="text-foreground">KM-104</span>
                </p>
                <p className="text-muted-foreground">
                  <span className="font-semibold text-warning">Standby:</span>{" "}
                  <span className="text-foreground">KM-101, KM-102, KM-103, KM-105</span>
                </p>
                <p className="text-muted-foreground">
                  <span className="font-semibold text-destructive">IBL:</span>{" "}
                  <span className="text-foreground">KM-102</span>
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <Link to="/login">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-8">
                  Run Live Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Core Features</h2>
          <p className="text-center text-muted-foreground mb-12">
            Everything you need for intelligent trainset induction planning and execution
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BarChart3 className="w-8 h-8" />}
              title="Explainable Induction Planner"
              description="Weighted scoring with per-train breakdown showing exactly why each trainset was selected."
            />
            <FeatureCard
              icon={<CheckCircle2 className="w-8 h-8" />}
              title="What-If Simulator"
              description="Tweak weights and parameters to see KPI deltas instantly before committing."
            />
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Role Workflows"
              description="Optimized interfaces for Rolling Stock, Signalling, Telecom, Cleaning, Yard, Branding teams."
            />
            <FeatureCard
              icon={<FileCheck className="w-8 h-8" />}
              title="Audit Trail & Approvals"
              description="Every decision logged with timestamps, reasons, and digital signatures for compliance."
            />
            <FeatureCard
              icon={<CheckCircle2 className="w-8 h-8" />}
              title="Live Execution Monitor"
              description="Real-time status of cleaning, maintenance, yard operations with alerts and bottleneck detection."
            />
            <FeatureCard
              icon={<BarChart3 className="w-8 h-8" />}
              title="Export & Reports"
              description="PDF/Excel exports for plans, audit logs, and KPI dashboards for management review."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 py-20">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-2xl p-12 border border-primary/20">
          <h2 className="text-4xl font-bold mb-4">Ready to optimize your metro operations?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join the future of intelligent transit management with KMRL DSS
          </p>
          <Link to="/login">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-12">
              Get Started
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="p-6 rounded-xl bg-card/50 border border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5">
    <div className="text-secondary mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2 text-foreground">{title}</h3>
    <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
  </div>
);

export default Landing;
