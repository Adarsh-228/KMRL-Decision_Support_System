import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wrench, Download, CheckCircle2, AlertTriangle, XCircle, Clock, Loader, ServerCrash } from "lucide-react";
import demoTrainsets from "@/data/demoTrainsets.json";

// --- Data Types ---
interface RollingStockChecklist {
  fitness_certificates: boolean;
  component_wear: boolean;
  mileage: boolean;
}

interface RollingStockData {
  checklist: RollingStockChecklist;
  inspection_alerts: string[];
  scheduled_maintenance: string[];
  special_notes: string[];
}

// --- API Fetch Function ---
const fetchRollingStockData = async (trainId: string): Promise<RollingStockData> => {
  const response = await fetch(`http://127.0.0.1:8000/api/rollingstock/${trainId}`);
  if (!response.ok) {
    throw new Error(`Network response was not ok for train ${trainId}`);
  }
  return response.json();
};

const RollingStockDashboard = () => {
  const [selectedTrain, setSelectedTrain] = useState(demoTrainsets[0].id);

  const { data, isLoading, isError, error } = useQuery<RollingStockData, Error>({
    queryKey: ["rollingStock", selectedTrain],
    queryFn: () => fetchRollingStockData(selectedTrain),
  });

  const getStatusIcon = (status: boolean) => {
    return status ? <CheckCircle2 className="w-5 h-5 text-success" /> : <XCircle className="w-5 h-5 text-destructive" />;
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

        {/* Main Content */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader className="w-8 h-8 animate-spin text-primary" />
            <p className="ml-4 text-lg text-muted-foreground">Loading data for {selectedTrain}...</p>
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center h-64 bg-destructive/10 rounded-lg">
            <ServerCrash className="w-8 h-8 text-destructive" />
            <p className="ml-4 text-lg text-destructive">Error: {error.message}</p>
          </div>
        ) : data ? (
          <div className="space-y-6">
            {/* Checklists */}
            <Card className="border-border bg-card">
              <div className="p-6 border-b border-border">
                <h2 className="text-2xl font-bold text-foreground">Fitness Checklist</h2>
                <p className="text-sm text-muted-foreground mt-1">Trainset {selectedTrain}</p>
              </div>
              <div className="p-6 grid md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-muted/30 flex items-center justify-between">
                    <h3 className="font-bold text-foreground">Fitness Certificates</h3>
                    {getStatusIcon(data.checklist.fitness_certificates)}
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30 flex items-center justify-between">
                    <h3 className="font-bold text-foreground">Component Wear</h3>
                    {getStatusIcon(data.checklist.component_wear)}
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30 flex items-center justify-between">
                    <h3 className="font-bold text-foreground">Mileage</h3>
                    {getStatusIcon(data.checklist.mileage)}
                  </div>
              </div>
            </Card>

            {/* Data Sections */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-border bg-card col-span-1">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground flex items-center gap-2"><AlertTriangle className="text-warning"/> Inspection Alerts</h3>
                  <ul className="mt-4 space-y-2 list-disc list-inside text-muted-foreground">
                    {data.inspection_alerts.map((alert, i) => <li key={i}>{alert}</li>)}
                  </ul>
                </div>
              </Card>
              <Card className="border-border bg-card col-span-1">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground flex items-center gap-2"><Clock className="text-primary"/> Scheduled Maintenance</h3>
                  <ul className="mt-4 space-y-2 list-disc list-inside text-muted-foreground">
                    {data.scheduled_maintenance.map((m, i) => <li key={i}>{m}</li>)}
                  </ul>
                </div>
              </Card>
              <Card className="border-border bg-card col-span-1">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground">Special Notes</h3>
                  <ul className="mt-4 space-y-2 list-disc list-inside text-muted-foreground">
                    {data.special_notes.map((note, i) => <li key={i}>{note}</li>)}
                  </ul>
                </div>
              </Card>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default RollingStockDashboard;