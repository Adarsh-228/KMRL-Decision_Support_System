import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { MapPin, Grid3x3, Save } from "lucide-react";
import demoTrainsets from "@/data/demoTrainsets.json";

const YardDashboard = () => {
  const [tracks, setTracks] = useState(5);
  const [trainsets, setTrainsets] = useState(5);

  const yardSlots = ["A1", "B2", "C3", "D4", "E5"];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <MapPin className="w-8 h-8 text-secondary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Depot Operations / Yard Master</h1>
            <p className="text-muted-foreground">Yard Parking & Shunting Optimization</p>
          </div>
        </div>

        <Card className="p-6 bg-card/50 border-border/50">
          <h2 className="text-xl font-bold text-foreground mb-4">Yard Configuration</h2>
          <div className="grid md:grid-cols-2 gap-4">
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
              <Label htmlFor="trainsets">Number of Trainsets Present</Label>
              <Input
                id="trainsets"
                type="number"
                value={trainsets}
                onChange={(e) => setTrainsets(Number(e.target.value))}
                className="mt-2"
              />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card/50 border-border/50">
          <div className="flex items-center gap-3 mb-6">
            <Grid3x3 className="w-6 h-6 text-secondary" />
            <h2 className="text-xl font-bold text-foreground">Yard Parking Map</h2>
          </div>

          <div className="grid md:grid-cols-5 gap-4 mb-6">
            {yardSlots.map((slot, idx) => {
              const trainset = demoTrainsets[idx];
              return (
                <div
                  key={slot}
                  className="p-4 bg-muted/30 rounded-lg border-2 border-dashed border-border hover:border-primary transition-colors cursor-move"
                >
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground mb-2">Track {slot}</div>
                    {trainset && (
                      <div className="space-y-2">
                        <div className="font-bold text-foreground">{trainset.id}</div>
                        <Badge className="text-xs bg-secondary/20 text-secondary">
                          Position {idx + 1}
                        </Badge>
                        <div className="text-xs text-muted-foreground">
                          Est. turnout: {trainset.predictedTurnoutMin}min
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Shunts: {trainset.shuntingMovesEstimate}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 bg-secondary/10 rounded-lg border border-secondary/30">
            <h3 className="font-bold text-foreground mb-2">Suggested First-Out Positions</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Based on planner ranking, shunting cost, and turnout time
            </p>
            <div className="flex flex-wrap gap-2">
              {["KM-104", "KM-105", "KM-101", "KM-103", "KM-102"].map((id, idx) => (
                <Badge key={id} className="bg-secondary/20 text-secondary">
                  {idx + 1}. {id}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground flex-1 gap-2">
              <Save className="w-4 h-4" />
              Save Slot Assignments
            </Button>
            <Button variant="outline" className="flex-1">
              Export Shunting Script
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default YardDashboard;
