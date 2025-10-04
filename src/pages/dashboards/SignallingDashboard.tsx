import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Radio, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import demoTrainsets from "@/data/demoTrainsets.json";

const SignallingDashboard = () => {
  const [selectedTrain, setSelectedTrain] = useState<string>("");

  const signallingData = {
    trackCommunication: { status: "OK", details: "RSSI: -45 dBm, Packet loss: 0.01%" },
    speedLimit: { status: "OK", details: "Current: 80 km/h, Max allowed: 80 km/h" },
    distanceMonitoring: { status: "OK", details: "Safe braking distance maintained" },
    signalAdherence: { status: "OK", details: "All signals acknowledged within 2s" },
    hardwareErrors: { status: "OK", details: "No faults detected in last 24h" },
    softwareErrors: { status: "Warning", details: "1 minor warning - GPS drift correction applied" },
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "OK": return <CheckCircle2 className="w-5 h-5 text-success" />;
      case "Warning": return <AlertTriangle className="w-5 h-5 text-warning" />;
      case "Critical": return <XCircle className="w-5 h-5 text-destructive" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "OK": return "border-success/30 bg-success/5";
      case "Warning": return "border-warning/30 bg-warning/5";
      case "Critical": return "border-destructive/30 bg-destructive/5";
      default: return "border-border bg-muted/20";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-primary/10">
              <Radio className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Signalling System Officer</h1>
              <p className="text-muted-foreground">Safety & Communication Verification</p>
            </div>
          </div>
        </div>

        {/* Trainset Selection */}
        <Card className="border-border bg-card">
          <div className="p-6">
            <Label className="text-sm font-semibold text-foreground mb-3 block">Select Trainset</Label>
            <Select value={selectedTrain} onValueChange={setSelectedTrain}>
              <SelectTrigger className="w-full max-w-md border-primary/30">
                <SelectValue placeholder="Choose a trainset to view signalling details..." />
              </SelectTrigger>
              <SelectContent>
                {demoTrainsets.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.id} - {t.status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Signalling Details (only show when trainset is selected) */}
        {selectedTrain && (
          <>
            <Card className="border-border bg-card">
              <div className="p-6 border-b border-border">
                <h2 className="text-2xl font-bold text-foreground">Signalling System Health</h2>
                <p className="text-sm text-muted-foreground mt-1">Trainset {selectedTrain}</p>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Track-to-Train Communication */}
                  <Card className={`border ${getStatusColor(signallingData.trackCommunication.status)}`}>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(signallingData.trackCommunication.status)}
                          <h3 className="font-bold text-foreground">Track-to-Train Communication</h3>
                        </div>
                        <Badge className={signallingData.trackCommunication.status === "OK" ? "bg-success/20 text-success" : "bg-warning/20 text-warning"}>
                          {signallingData.trackCommunication.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground pl-7">{signallingData.trackCommunication.details}</p>
                    </div>
                  </Card>

                  {/* Speed Limit */}
                  <Card className={`border ${getStatusColor(signallingData.speedLimit.status)}`}>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(signallingData.speedLimit.status)}
                          <h3 className="font-bold text-foreground">Speed Limit Monitoring</h3>
                        </div>
                        <Badge className="bg-success/20 text-success">
                          {signallingData.speedLimit.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground pl-7">{signallingData.speedLimit.details}</p>
                    </div>
                  </Card>

                  {/* Distance Monitoring */}
                  <Card className={`border ${getStatusColor(signallingData.distanceMonitoring.status)}`}>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(signallingData.distanceMonitoring.status)}
                          <h3 className="font-bold text-foreground">Distance Monitoring</h3>
                        </div>
                        <Badge className="bg-success/20 text-success">
                          {signallingData.distanceMonitoring.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground pl-7">{signallingData.distanceMonitoring.details}</p>
                    </div>
                  </Card>

                  {/* Signal Adherence */}
                  <Card className={`border ${getStatusColor(signallingData.signalAdherence.status)}`}>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(signallingData.signalAdherence.status)}
                          <h3 className="font-bold text-foreground">Signal Adherence</h3>
                        </div>
                        <Badge className="bg-success/20 text-success">
                          {signallingData.signalAdherence.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground pl-7">{signallingData.signalAdherence.details}</p>
                    </div>
                  </Card>

                  {/* Hardware Status */}
                  <Card className={`border ${getStatusColor(signallingData.hardwareErrors.status)}`}>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(signallingData.hardwareErrors.status)}
                          <h3 className="font-bold text-foreground">Hardware Status</h3>
                        </div>
                        <Badge className="bg-success/20 text-success">
                          {signallingData.hardwareErrors.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground pl-7">{signallingData.hardwareErrors.details}</p>
                    </div>
                  </Card>

                  {/* Software Status */}
                  <Card className={`border ${getStatusColor(signallingData.softwareErrors.status)}`}>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(signallingData.softwareErrors.status)}
                          <h3 className="font-bold text-foreground">Software Status</h3>
                        </div>
                        <Badge className="bg-warning/20 text-warning">
                          {signallingData.softwareErrors.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground pl-7">{signallingData.softwareErrors.details}</p>
                    </div>
                  </Card>
                </div>
              </div>
            </Card>

            {/* Error Notes */}
            <Card className="border-border bg-card">
              <div className="p-6">
                <Label className="text-sm font-semibold text-foreground mb-3 block">Error Notes / Additional Remarks</Label>
                <Textarea 
                  placeholder="Enter error codes, fault descriptions, or observations..."
                  className="min-h-[100px]"
                />
                <div className="flex gap-3 mt-4">
                  <Button variant="outline">Attach Log File</Button>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Generate Compliance Report
                  </Button>
                </div>
              </div>
            </Card>
          </>
        )}

        {/* Empty State */}
        {!selectedTrain && (
          <Card className="border-border bg-card/50">
            <div className="p-12 text-center">
              <Radio className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">No Trainset Selected</h3>
              <p className="text-sm text-muted-foreground">
                Please select a trainset from the dropdown above to view its signalling system information.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SignallingDashboard;
