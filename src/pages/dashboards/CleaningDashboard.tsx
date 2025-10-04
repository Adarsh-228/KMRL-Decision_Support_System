import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Upload, CheckCircle2, XCircle } from "lucide-react";
import demoTrainsets from "@/data/demoTrainsets.json";

const CleaningDashboard = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Sparkles className="w-7 h-7 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Cleaning Lead</h1>
            <p className="text-muted-foreground">Interior, Exterior & Sanitization</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {demoTrainsets.map((trainset) => (
            <Card key={trainset.id} className="p-6 bg-card border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-foreground">{trainset.id}</h2>
                <Badge
                  className={
                    trainset.cleaning === "Done"
                      ? "bg-success/20 text-success"
                      : "bg-warning/20 text-warning"
                  }
                >
                  {trainset.cleaning}
                </Badge>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-muted/30 rounded-md">
                  <h3 className="font-semibold text-foreground mb-3">Interior Cleaning</h3>
                  <div className="space-y-2">
                    {["Floors", "Windows", "Seats", "Toilets"].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <Checkbox
                          id={`${trainset.id}-${item}`}
                          defaultChecked={trainset.cleaning === "Done"}
                        />
                        <Label htmlFor={`${trainset.id}-${item}`} className="flex-1 cursor-pointer">
                          {item}
                        </Label>
                        {trainset.cleaning === "Done" ? (
                          <CheckCircle2 className="w-4 h-4 text-success" />
                        ) : (
                          <XCircle className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-muted/30 rounded-md">
                  <h3 className="font-semibold text-foreground mb-3">Pest Control & Sanitization</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id={`${trainset.id}-pest`} defaultChecked />
                      <Label htmlFor={`${trainset.id}-pest`} className="flex-1 cursor-pointer">
                        Pest Control
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id={`${trainset.id}-sanitize`} defaultChecked />
                      <Label htmlFor={`${trainset.id}-sanitize`} className="flex-1 cursor-pointer">
                        Sanitization (Post-COVID)
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-muted/30 rounded-md">
                  <h3 className="font-semibold text-foreground mb-3">Exterior Cleaning</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={`${trainset.id}-exterior`}
                        defaultChecked={trainset.cleaning === "Done"}
                      />
                      <Label htmlFor={`${trainset.id}-exterior`} className="flex-1 cursor-pointer">
                        Dust-free & Branding Visibility
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 gap-2">
                    <Upload className="w-4 h-4" />
                    Before Photo
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 gap-2">
                    <Upload className="w-4 h-4" />
                    After Photo
                  </Button>
                </div>

                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={trainset.cleaning === "Done"}
                >
                  {trainset.cleaning === "Done" ? "Completed" : "Mark Complete"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CleaningDashboard;
