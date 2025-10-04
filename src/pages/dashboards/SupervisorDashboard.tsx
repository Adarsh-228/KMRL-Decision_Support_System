import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrainsetCard } from "@/components/TrainsetCard";
import { BarChart3, FileCheck, Users, AlertTriangle } from "lucide-react";
import demoTrainsets from "@/data/demoTrainsets.json";

const SupervisorDashboard = () => {
  const [selectedTrain, setSelectedTrain] = useState<string | null>(null);

  const kpis = [
    { label: "Fleet Readiness", value: "60%", icon: <BarChart3 className="w-5 h-5" />, color: "text-success" },
    { label: "Branding Exposure", value: "75%", icon: <Users className="w-5 h-5" />, color: "text-primary" },
    { label: "Open Job Cards", value: "2", icon: <AlertTriangle className="w-5 h-5" />, color: "text-warning" },
    { label: "Shunting Score", value: "8.2", icon: <FileCheck className="w-5 h-5" />, color: "text-info" },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Supervisor Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Run Optimizer
          </Button>
        </div>

        {/* KPI Strip */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {kpis.map((kpi) => (
            <Card key={kpi.label} className="p-4 bg-card border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{kpi.label}</p>
                  <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
                </div>
                <div className={kpi.color}>{kpi.icon}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Ranked Induction Panel */}
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Ranked Induction Plan</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {demoTrainsets.map((trainset, idx) => (
              <TrainsetCard
                key={trainset.id}
                trainset={trainset}
                confidence={[92, 85, 82, 78, 72][idx]}
                expanded={selectedTrain === trainset.id}
                onClick={() => setSelectedTrain(trainset.id)}
              />
            ))}
          </div>

          <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border/30">
            <h3 className="font-bold text-foreground mb-3">Final Recommendation</h3>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-semibold text-success">Recommend for Service:</span>{" "}
                <span className="text-foreground">KM-104, KM-105</span>
              </p>
              <p>
                <span className="font-semibold text-warning">Standby:</span>{" "}
                <span className="text-foreground">KM-101, KM-103</span>
              </p>
              <p>
                <span className="font-semibold text-destructive">IBL (Immediate Block):</span>{" "}
                <span className="text-foreground">KM-102</span>
              </p>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1">
              Lock & Approve Plan
            </Button>
            <Button variant="outline" className="flex-1">
              Export PDF
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SupervisorDashboard;
