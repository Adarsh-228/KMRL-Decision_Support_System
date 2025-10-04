import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wrench, AlertCircle, Upload, Clock, Calendar } from "lucide-react";
import demoTrainsets from "@/data/demoTrainsets.json";

const RollingStockDashboard = () => {
  const [selectedTrain, setSelectedTrain] = useState(demoTrainsets[0].id);

  const components = [
    { name: "Wheels", status: "good" },
    { name: "Brakes", status: "minor" },
    { name: "Couplers", status: "good" },
    { name: "Pantographs", status: "good" },
    { name: "Suspension", status: "replace" },
    { name: "Traction Motors", status: "good" },
    { name: "Axle Counters", status: "good" },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Wrench className="w-7 h-7 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Rolling Stock Engineer</h1>
            <p className="text-muted-foreground">Maintenance & Component Management</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Checklist */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-foreground">Select Trainset</h2>
                <Select value={selectedTrain} onValueChange={setSelectedTrain}>
                  <SelectTrigger className="w-[180px]">
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
            </Card>

            <Card className="p-6 bg-card border-border">
              <h2 className="text-xl font-bold text-foreground mb-4">Fitness Certificates</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-md">
                  <Checkbox id="cert" defaultChecked />
                  <Label htmlFor="cert" className="flex-1">
                    Rolling Stock Certificate Valid
                  </Label>
                  <Badge className="bg-success/20 text-success">Valid</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Upload className="w-4 h-4" />
                    Upload Certificate
                  </Button>
                  <Button variant="outline" size="sm">
                    Verify
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  Last updated: 2025-09-15 by EMP2001
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border">
              <h2 className="text-xl font-bold text-foreground mb-4">Component Wear & Mileage</h2>
              <div className="space-y-4">
                <div>
                  <Label>Odometer Reading (km)</Label>
                  <Input type="number" defaultValue="24000" className="mt-2" />
                </div>

                <div className="space-y-2">
                  {components.map((comp) => (
                    <div key={comp.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                      <span className="font-medium">{comp.name}</span>
                      <Select defaultValue={comp.status}>
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="minor">Minor Wear</SelectItem>
                          <SelectItem value="replace">Replace Soon</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Create Job Card
                </Button>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border">
              <h2 className="text-xl font-bold text-foreground mb-4">Special Notes / Overrides</h2>
              <Textarea 
                placeholder="Enter special notes, override requests, or additional information..."
                className="min-h-[100px] mb-3"
              />
              <Button variant="outline" size="sm" className="gap-2">
                <Upload className="w-4 h-4" />
                Attach Documents/Photos
              </Button>
            </Card>
          </div>

          {/* Right Column - Alerts & Maintenance */}
          <div className="space-y-6">
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-warning" />
                <h2 className="text-xl font-bold text-foreground">Inspection Alerts</h2>
              </div>
              <div className="space-y-3">
                {demoTrainsets
                  .filter((t) => t.jobCards.length > 0)
                  .map((t) => (
                    <div key={t.id} className="p-3 bg-destructive/10 border border-destructive/30 rounded-md">
                      <div className="flex items-start justify-between mb-2">
                        <span className="font-semibold text-foreground">{t.id}</span>
                        <Badge className="bg-destructive/20 text-destructive text-xs">
                          {t.jobCards[0].severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{t.jobCards[0].description}</p>
                      <div className="mt-3 flex gap-2">
                        <Button size="sm" variant="outline" className="text-xs flex-1">
                          Acknowledge
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs flex-1">
                          Create Job
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </Card>

            <Card className="p-6 bg-card border-border">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold text-foreground">Scheduled Maintenance</h2>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-muted/30 rounded-md">
                  <p className="font-medium text-foreground">Brake System Check</p>
                  <p className="text-sm text-muted-foreground mt-1">Due: 2025-10-05</p>
                  <p className="text-xs text-muted-foreground mt-1">Assigned: EMP2001</p>
                  <Button size="sm" className="mt-2 w-full" variant="outline">
                    Mark In Progress
                  </Button>
                </div>
                <div className="p-3 bg-muted/30 rounded-md">
                  <p className="font-medium text-foreground">Wheel Inspection</p>
                  <p className="text-sm text-muted-foreground mt-1">Due: 2025-10-12</p>
                  <p className="text-xs text-muted-foreground mt-1">Assigned: EMP2002</p>
                  <Button size="sm" className="mt-2 w-full" variant="outline">
                    Mark In Progress
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RollingStockDashboard;
