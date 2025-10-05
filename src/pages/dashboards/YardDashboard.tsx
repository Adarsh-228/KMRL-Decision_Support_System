import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { MapPin, Grid3x3, Save, Loader, ServerCrash, Send } from "lucide-react";

// --- Data Types ---
interface YardInput {
  tracks: number;
  trainsets: string[];
}

interface YardPlan {
  suggested_map: Record<string, string>;
  service: string[];
  standby: string[];
  maintenance: string[];
}

// --- API Functions ---
const generateYardPlan = async (input: YardInput): Promise<YardPlan> => {
  const response = await fetch(`http://127.0.0.1:8000/api/yard/plan`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!response.ok) {
    throw new Error("Failed to generate yard plan");
  }
  return response.json();
};

const YardDashboard = () => {
  const [tracks, setTracks] = useState(5);
  const [trainsets, setTrainsets] = useState("T101, T102, T103, T104, T105, T106, T107");
  const [yardPlan, setYardPlan] = useState<YardPlan | null>(null);

  const mutation = useMutation<YardPlan, Error, YardInput>({
    mutationFn: generateYardPlan,
    onSuccess: (data) => {
      setYardPlan(data);
    },
  });

  const handleGeneratePlan = () => {
    const trainsetList = trainsets.split(",").map(t => t.trim()).filter(t => t);
    mutation.mutate({ tracks, trainsets: trainsetList });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-primary/10">
             <MapPin className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Depot Operations / Yard Master</h1>
            <p className="text-muted-foreground">Yard Parking & Shunting Optimization</p>
          </div>
        </div>

        <Card className="p-6 bg-card border-border">
          <h2 className="text-xl font-bold text-foreground mb-4">Yard Configuration</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-4">
            <div>
              <Label htmlFor="tracks">Number of Tracks Available</Label>
              <Input
                id="tracks"
                type="number"
                value={tracks}
                onChange={(e) => setTracks(Number(e.target.value))}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="trainsets">Trainsets Present (comma-separated)</Label>
              <Input
                id="trainsets"
                value={trainsets}
                onChange={(e) => setTrainsets(e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
          <Button onClick={handleGeneratePlan} disabled={mutation.isPending} className="gap-2">
            {mutation.isPending ? <Loader className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            Generate Plan
          </Button>
        </Card>

        {mutation.isError && (
          <div className="flex items-center justify-center h-32 bg-destructive/10 rounded-lg">
            <ServerCrash className="w-8 h-8 text-destructive" />
            <p className="ml-4 text-lg text-destructive">Error: {mutation.error.message}</p>
          </div>
        )}

        {yardPlan && (
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center gap-3 mb-6">
              <Grid3x3 className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Suggested Yard Plan</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <StatusColumn title="Service" trains={yardPlan.service} color="bg-success/20 text-success" />
              <StatusColumn title="Standby" trains={yardPlan.standby} color="bg-warning/20 text-warning" />
              <StatusColumn title="Maintenance" trains={yardPlan.maintenance} color="bg-destructive/20 text-destructive" />
            </div>

            <h3 className="text-lg font-bold text-foreground mb-4">Track Map</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Object.entries(yardPlan.suggested_map).map(([track, train]) => (
                <div key={track} className="p-4 bg-muted/30 rounded-md border text-center">
                  <p className="text-sm font-semibold text-foreground">{train}</p>
                  <p className="text-xs text-muted-foreground">on {track.replace("_", " ")}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-4">
              <Button className="flex-1 gap-2">
                <Save className="w-4 h-4" />
                Save & Finalize Plan
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

const StatusColumn = ({ title, trains, color }: { title: string, trains: string[], color: string }) => (
  <Card className="p-4 bg-muted/20">
    <h3 className={`text-lg font-bold mb-3 ${color.split(' ')[1]}`}>{title}</h3>
    <div className="space-y-2">
      {trains.map(train => (
        <Badge key={train} className={`w-full justify-center py-1 ${color}`}>{train}</Badge>
      ))}
    </div>
  </Card>
);

export default YardDashboard;