import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Phone, CheckCircle2, XCircle, Loader, ServerCrash } from "lucide-react";

// --- Data Types ---
interface TelecomStatus {
  voice_data_functional: boolean;
  emergency_comm_operational: boolean;
  no_interference_detected: boolean;
}

// --- API Fetch Function ---
const fetchTelecomStatus = async (): Promise<TelecomStatus> => {
  const response = await fetch(`http://127.0.0.1:8000/api/telecom/status`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const TelecomDashboard = () => {
  const { data, isLoading, isError, error } = useQuery<TelecomStatus, Error>({
    queryKey: ["telecomStatus"],
    queryFn: fetchTelecomStatus,
  });

  const getStatusIcon = (status: boolean) => {
    return status ? <CheckCircle2 className="w-6 h-6 text-success" /> : <XCircle className="w-6 h-6 text-destructive" />;
  };

  const StatusCard = ({ title, status }: { title: string; status: boolean | undefined }) => (
    <Card className="p-6 bg-muted/30 flex items-center justify-between">
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      {status === undefined ? <div className="w-6 h-6 bg-muted rounded-full animate-pulse" /> : getStatusIcon(status)}
    </Card>
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-primary/10">
            <Phone className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Telecom System Status</h1>
            <p className="text-muted-foreground">Live System-Wide Communication Health</p>
          </div>
        </div>

        {/* Main Content */}
        <Card className="border-border bg-card">
          <div className="p-6 border-b border-border">
            <h2 className="text-2xl font-bold text-foreground">Overall System Health</h2>
          </div>
          <div className="p-6">
            {isLoading ? (
              <div className="flex items-center justify-center h-48">
                <Loader className="w-8 h-8 animate-spin text-primary" />
                <p className="ml-4 text-lg text-muted-foreground">Loading system status...</p>
              </div>
            ) : isError ? (
              <div className="flex items-center justify-center h-48 bg-destructive/10 rounded-lg">
                <ServerCrash className="w-8 h-8 text-destructive" />
                <p className="ml-4 text-lg text-destructive">Error: {error.message}</p>
              </div>
            ) : data ? (
              <div className="space-y-4">
                <StatusCard title="Voice and Data Channels Functional" status={data.voice_data_functional} />
                <StatusCard title="Emergency Communication Operational" status={data.emergency_comm_operational} />
                <StatusCard title="No Interference or Dead Zones Detected" status={data.no_interference_detected} />
              </div>
            ) : null}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TelecomDashboard;