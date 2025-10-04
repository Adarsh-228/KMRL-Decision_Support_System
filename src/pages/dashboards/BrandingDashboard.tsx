import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Palette, Plus, Flag } from "lucide-react";
import demoTrainsets from "@/data/demoTrainsets.json";

const BrandingDashboard = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Palette className="w-8 h-8 text-secondary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Branding Team</h1>
              <p className="text-muted-foreground">Campaign Management & Exposure Tracking</p>
            </div>
          </div>
          <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2">
            <Plus className="w-4 h-4" />
            New Campaign
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {demoTrainsets
            .filter((t) => t.branding.length > 0)
            .map((trainset) =>
              trainset.branding.map((brand) => {
                const exposurePercent = Math.round((brand.actualHours / brand.requiredHours) * 100);
                return (
                  <Card key={brand.id} className="p-6 bg-card/50 border-border/50">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-xl font-bold text-foreground">{brand.advertiser}</h2>
                        <p className="text-sm text-muted-foreground mt-1">Trainset: {trainset.id}</p>
                      </div>
                      <Badge
                        className={
                          exposurePercent >= 100
                            ? "bg-success/20 text-success"
                            : exposurePercent >= 75
                            ? "bg-warning/20 text-warning"
                            : "bg-destructive/20 text-destructive"
                        }
                      >
                        {exposurePercent}% Complete
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Exposure Hours</span>
                          <span className="font-semibold text-foreground">
                            {brand.actualHours} / {brand.requiredHours}h
                          </span>
                        </div>
                        <Progress value={exposurePercent} className="h-2" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-xs text-muted-foreground">Start Date</Label>
                          <Input type="date" defaultValue="2025-09-01" className="mt-1" />
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">End Date</Label>
                          <Input type="date" defaultValue="2025-10-31" className="mt-1" />
                        </div>
                      </div>

                      <div>
                        <Label className="text-xs text-muted-foreground">Duration (hours/day)</Label>
                        <Input type="number" defaultValue="4" className="mt-1" />
                      </div>

                      <div className="flex gap-2 pt-2 border-t border-border/50">
                        <Button size="sm" variant="outline" className="flex-1 gap-2">
                          <Flag className="w-4 h-4" />
                          Flag for Refresh
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          Upload Proof
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })
            )}
        </div>

        <Card className="p-6 bg-card/50 border-border/50">
          <h2 className="text-xl font-bold text-foreground mb-4">Create New Campaign</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="advertiser">Advertiser Name</Label>
              <Input id="advertiser" placeholder="Enter advertiser name" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="target">Exposure Target (hours)</Label>
              <Input id="target" type="number" placeholder="100" className="mt-2" />
            </div>
          </div>
          <div className="mt-4">
            <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              Create Campaign
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BrandingDashboard;
