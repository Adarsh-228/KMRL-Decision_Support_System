import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Radio, CheckCircle2, XCircle, Loader, ServerCrash } from "lucide-react";

// --- Data Types ---
interface SignallingStatus {
  track_communication_stable: boolean;
  safety_limits_operational: boolean;
  no_errors_detected: boolean;
}

// --- API Fetch Function ---
const fetchSignallingStatus = async (): Promise<SignallingStatus> => {
  const response = await fetch(`http://127.0.0.1:8000/api/signalling/status`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const SignallingDashboard = () => {
  const { data, isLoading, isError, error } = useQuery<SignallingStatus, Error>({
    queryKey: ["signallingStatus"],
    queryFn: fetchSignallingStatus,
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
            <Radio className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Signalling System Status</h1>
            <p className="text-muted-foreground">Live System-Wide Safety & Communication Verification</p>
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
                <StatusCard title="Track-to-Train Communication Stable" status={data.track_communication_stable} />
                <StatusCard title="Safety Limits Operational" status={data.safety_limits_operational} />
                <StatusCard title="No Software/Hardware Errors Detected" status={data.no_errors_detected} />
              </div>
            ) : null}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignallingDashboard;