import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wrench, Download, CheckCircle2, AlertTriangle, XCircle, Clock } from "lucide-react";
import demoTrainsets from "@/data/demoTrainsets.json";

const RollingStockDashboard = () => {
  const [selectedTrain, setSelectedTrain] = useState(demoTrainsets[0].id);

  const components = [
    { 
      name: "Wheels", 
      status: "OK", 
      lastUpdated: "2025-10-02", 
      remarks: "Tread depth within limits",
      mileage: "24,000 km"
    },
    { 
      name: "Brakes", 
      status: "Warning", 
      lastUpdated: "2025-10-01", 
      remarks: "Brake pads at 70% wear - replace within 500 km",
      mileage: "24,000 km"
    },
    { 
      name: "Couplers", 
      status: "OK", 
      lastUpdated: "2025-09-30", 
      remarks: "No play detected, lubrication adequate",
      mileage: "24,000 km"
    },
    { 
      name: "Pantographs", 
      status: "OK", 
      lastUpdated: "2025-10-02", 
      remarks: "Carbon strips good, contact pressure normal",
      mileage: "24,000 km"
    },
    { 
      name: "Suspension", 
      status: "Critical", 
      lastUpdated: "2025-10-03", 
      remarks: "Secondary spring showing metal fatigue - immediate replacement required",
      mileage: "24,000 km"
    },
    { 
      name: "Traction Motors", 
      status: "OK", 
      lastUpdated: "2025-10-01", 
      remarks: "Temperature normal, no bearing noise",
      mileage: "24,000 km"
    },
    { 
      name: "Axle Counters", 
      status: "OK", 
      lastUpdated: "2025-10-02", 
      remarks: "Sensor readings accurate, no intermittent faults",
      mileage: "24,000 km"
    },
  ];

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "OK": return <CheckCircle2 className="w-5 h-5 text-success" />;
      case "Warning": return <AlertTriangle className="w-5 h-5 text-warning" />;
      case "Critical": return <XCircle className="w-5 h-5 text-destructive" />;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "OK": return "bg-success/20 text-success";
      case "Warning": return "bg-warning/20 text-warning";
      case "Critical": return "bg-destructive/20 text-destructive";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-primary/10">
              <Wrench className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Rolling Stock Engineer</h1>
              <p className="text-muted-foreground">Component Analysis & Fitness Certification</p>
            </div>
          </div>
          <Select value={selectedTrain} onValueChange={setSelectedTrain}>
            <SelectTrigger className="w-[200px] border-primary/30">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {demoTrainsets.map((t) => (
                <SelectItem key={t.id} value={t.id}>
                  {t.id}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Component Wear & Mileage - Top Section */}
        <Card className="border-border bg-card">
          <div className="p-6 border-b border-border">
            <h2 className="text-2xl font-bold text-foreground">Component Wear & Mileage</h2>
            <p className="text-sm text-muted-foreground mt-1">Trainset {selectedTrain} • Odometer: 24,000 km</p>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {components.map((comp) => (
                <Card key={comp.name} className="border-border/50 bg-muted/20">
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(comp.status)}
                        <div>
                          <h3 className="font-bold text-foreground">{comp.name}</h3>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <Clock className="w-3 h-3" />
                            Updated: {comp.lastUpdated}
                          </p>
                        </div>
                      </div>
                      <Badge className={getStatusBadge(comp.status)}>
                        {comp.status}
                      </Badge>
                    </div>
                    <div className="pl-8">
                      <p className="text-sm text-muted-foreground">{comp.remarks}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Card>

        {/* Fitness Certificates - Bottom Section */}
        <Card className="border-border bg-card">
          <div className="p-6 border-b border-border">
            <h2 className="text-2xl font-bold text-foreground">Fitness Certificates</h2>
            <p className="text-sm text-muted-foreground mt-1">Auto-generated from component analysis</p>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-lg bg-success/10 border border-success/30">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  <h3 className="font-bold text-foreground">Rolling Stock</h3>
                </div>
                <p className="text-sm text-muted-foreground">Valid until: 2026-03-15</p>
              </div>
              <div className="p-4 rounded-lg bg-success/10 border border-success/30">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  <h3 className="font-bold text-foreground">Signalling</h3>
                </div>
                <p className="text-sm text-muted-foreground">Valid until: 2026-02-20</p>
              </div>
              <div className="p-4 rounded-lg bg-success/10 border border-success/30">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  <h3 className="font-bold text-foreground">Telecom</h3>
                </div>
                <p className="text-sm text-muted-foreground">Valid until: 2026-01-10</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                <Download className="w-4 h-4" />
                Download Certificate (PDF)
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Export Data (CSV)
              </Button>
            </div>

            <div className="mt-4 p-3 rounded-md bg-muted/30">
              <p className="text-xs text-muted-foreground flex items-center gap-2">
                <Clock className="w-3 h-3" />
                Certificate generated on: 2025-10-04 14:30 by System (based on latest component data)
              </p>
            </div>
          </div>
        </Card>

        {/* Special Notes */}
        <Card className="border-border bg-card">
          <div className="p-6">
            <Label className="text-sm font-semibold text-foreground">Additional Notes / Remarks</Label>
            <Textarea 
              placeholder="Enter special observations, override requests, or additional maintenance notes..."
              className="mt-3 min-h-[100px]"
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RollingStockDashboard;
