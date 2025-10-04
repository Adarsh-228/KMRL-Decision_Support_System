import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Phone, CheckCircle2, AlertCircle } from "lucide-react";
import demoTrainsets from "@/data/demoTrainsets.json";

const TelecomDashboard = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Phone className="w-7 h-7 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Telecom / Communications</h1>
            <p className="text-muted-foreground">Voice, Data & Emergency Systems</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demoTrainsets.map((trainset) => (
            <Card key={trainset.id} className="p-6 bg-card border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-foreground">{trainset.id}</h2>
                <Badge className="bg-success/20 text-success">Operational</Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                  <div className="flex items-center gap-2">
                    <Checkbox id={`${trainset.id}-voice`} defaultChecked />
                    <Label htmlFor={`${trainset.id}-voice`} className="cursor-pointer">
                      Voice Channels
                    </Label>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-success" />
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                  <div className="flex items-center gap-2">
                    <Checkbox id={`${trainset.id}-data`} defaultChecked />
                    <Label htmlFor={`${trainset.id}-data`} className="cursor-pointer">
                      Data Channels
                    </Label>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-success" />
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                  <div className="flex items-center gap-2">
                    <Checkbox id={`${trainset.id}-emergency`} defaultChecked />
                    <Label htmlFor={`${trainset.id}-emergency`} className="cursor-pointer">
                      Emergency Comms
                    </Label>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-success" />
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                  <div className="flex items-center gap-2">
                    <Checkbox id={`${trainset.id}-interference`} defaultChecked />
                    <Label htmlFor={`${trainset.id}-interference`} className="cursor-pointer">
                      No Interference
                    </Label>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-success" />
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <Label className="text-sm text-muted-foreground mb-2 block">Notes</Label>
                <Textarea placeholder="Additional notes or fault details..." className="min-h-[60px] mb-3" />
                <Button size="sm" variant="outline" className="w-full">
                  Schedule Tech Visit
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TelecomDashboard;
