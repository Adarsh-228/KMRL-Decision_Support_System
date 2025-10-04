import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import demoTrainsets from "@/data/demoTrainsets.json";

const TelecomDashboard = () => {
  const [selectedTrain, setSelectedTrain] = useState<string>("");

  const telecomData = {
    voiceChannels: { status: "Healthy", details: "All 4 channels operational, clarity: 98%" },
    dataChannels: { status: "Healthy", details: "LTE connection stable, latency: 12ms" },
    emergencyComms: { status: "Healthy", details: "PA system tested OK, emergency button functional" },
    interference: { status: "Healthy", details: "No RF interference detected in last 24h" },
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "Healthy": return <CheckCircle2 className="w-6 h-6 text-success" />;
      case "Degraded": return <AlertTriangle className="w-6 h-6 text-warning" />;
      case "Faulty": return <XCircle className="w-6 h-6 text-destructive" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Healthy": return "border-success/30 bg-success/5";
      case "Degraded": return "border-warning/30 bg-warning/5";
      case "Faulty": return "border-destructive/30 bg-destructive/5";
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
              <Phone className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Telecom Officer</h1>
              <p className="text-muted-foreground">Communication Systems Management</p>
            </div>
          </div>
        </div>

        {/* Trainset Selection */}
        <Card className="border-border bg-card">
          <div className="p-6">
            <Label className="text-sm font-semibold text-foreground mb-3 block">Select Trainset</Label>
            <Select value={selectedTrain} onValueChange={setSelectedTrain}>
              <SelectTrigger className="w-full max-w-md border-primary/30">
                <SelectValue placeholder="Choose a trainset to view telecom status..." />
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

        {/* Telecom System Details (only show when trainset is selected) */}
        {selectedTrain && (
          <>
            <Card className="border-border bg-card">
              <div className="p-6 border-b border-border">
                <h2 className="text-2xl font-bold text-foreground">Communication System Status</h2>
                <p className="text-sm text-muted-foreground mt-1">Trainset {selectedTrain}</p>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Voice Channels */}
                  <Card className={`border ${getStatusColor(telecomData.voiceChannels.status)}`}>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        {getStatusIcon(telecomData.voiceChannels.status)}
                        <Badge className="bg-success/20 text-success">
                          {telecomData.voiceChannels.status}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2">Voice Channels</h3>
                      <p className="text-sm text-muted-foreground">{telecomData.voiceChannels.details}</p>
                    </div>
                  </Card>

                  {/* Data Channels */}
                  <Card className={`border ${getStatusColor(telecomData.dataChannels.status)}`}>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        {getStatusIcon(telecomData.dataChannels.status)}
                        <Badge className="bg-success/20 text-success">
                          {telecomData.dataChannels.status}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2">Data Channels</h3>
                      <p className="text-sm text-muted-foreground">{telecomData.dataChannels.details}</p>
                    </div>
                  </Card>

                  {/* Emergency Communications */}
                  <Card className={`border ${getStatusColor(telecomData.emergencyComms.status)}`}>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        {getStatusIcon(telecomData.emergencyComms.status)}
                        <Badge className="bg-success/20 text-success">
                          {telecomData.emergencyComms.status}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2">Emergency Comms</h3>
                      <p className="text-sm text-muted-foreground">{telecomData.emergencyComms.details}</p>
                    </div>
                  </Card>

                  {/* Interference Detection */}
                  <Card className={`border ${getStatusColor(telecomData.interference.status)}`}>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        {getStatusIcon(telecomData.interference.status)}
                        <Badge className="bg-success/20 text-success">
                          {telecomData.interference.status}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2">Interference / Dead Zones</h3>
                      <p className="text-sm text-muted-foreground">{telecomData.interference.details}</p>
                    </div>
                  </Card>
                </div>
              </div>
            </Card>

            {/* Remarks */}
            <Card className="border-border bg-card">
              <div className="p-6">
                <Label className="text-sm font-semibold text-foreground mb-3 block">Fault Notes / Additional Remarks</Label>
                <Textarea 
                  placeholder="Enter fault details, dead zone locations, or maintenance notes..."
                  className="min-h-[100px]"
                />
              </div>
            </Card>
          </>
        )}

        {/* Empty State */}
        {!selectedTrain && (
          <Card className="border-border bg-card/50">
            <div className="p-12 text-center">
              <Phone className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">No Trainset Selected</h3>
              <p className="text-sm text-muted-foreground">
                Please select a trainset from the dropdown above to view its communication system status.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TelecomDashboard;
