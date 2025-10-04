import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Radio, CheckCircle2, AlertCircle, FileText } from "lucide-react";
import demoTrainsets from "@/data/demoTrainsets.json";

const SignallingDashboard = () => {
  const [selectedTests, setSelectedTests] = useState<Record<string, boolean>>({});

  const checklistItems = [
    "Track-to-train communication stable",
    "Safety limits operational (speed, distance, signal adherence)",
    "No software or hardware errors detected",
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Radio className="w-8 h-8 text-secondary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Signalling System</h1>
            <p className="text-muted-foreground">Safety & Communication Verification</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {demoTrainsets.map((trainset) => (
            <Card key={trainset.id} className="p-6 bg-card/50 border-border/50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-foreground">{trainset.id}</h2>
                <Badge
                  className={
                    trainset.status === "Ready"
                      ? "bg-success/20 text-success"
                      : "bg-warning/20 text-warning"
                  }
                >
                  {trainset.status}
                </Badge>
              </div>

              <div className="space-y-4">
                {checklistItems.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                    <Checkbox
                      id={`${trainset.id}-${idx}`}
                      checked={selectedTests[`${trainset.id}-${idx}`]}
                      onCheckedChange={(checked) =>
                        setSelectedTests((prev) => ({ ...prev, [`${trainset.id}-${idx}`]: checked as boolean }))
                      }
                      className="mt-1"
                    />
                    <Label htmlFor={`${trainset.id}-${idx}`} className="flex-1 cursor-pointer">
                      {item}
                    </Label>
                    {selectedTests[`${trainset.id}-${idx}`] ? (
                      <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    )}
                  </div>
                ))}

                <div className="pt-3 border-t border-border/50">
                  <Label className="text-sm text-muted-foreground mb-2 block">Error Notes (if any)</Label>
                  <Textarea
                    placeholder="Enter error code, description, or attach log..."
                    className="min-h-[80px]"
                  />
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm" className="flex-1">
                      Attach Log
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Create Job Card
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-6 bg-card/50 border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-secondary" />
              <div>
                <h2 className="text-xl font-bold text-foreground">Compliance Report</h2>
                <p className="text-sm text-muted-foreground">Last 24h test logs</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">Export PDF</Button>
              <Button variant="outline">Export CSV</Button>
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                Generate Report
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignallingDashboard;
