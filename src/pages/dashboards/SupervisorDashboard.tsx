import { useQueries } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Eye, CheckCircle2, XCircle, Wrench, Sparkles, Radio, Phone, Loader, ServerCrash } from "lucide-react";

// --- API Fetch Functions ---
const fetchSignallingStatus = async () => {
  const res = await fetch("http://127.0.0.1:8000/api/signalling/status");
  if (!res.ok) throw new Error("Failed to fetch signalling status");
  return res.json();
};

const fetchTelecomStatus = async () => {
  const res = await fetch("http://127.0.0.1:8000/api/telecom/status");
  if (!res.ok) throw new Error("Failed to fetch telecom status");
  return res.json();
};

const fetchRollingStockData = async (trainId: string) => {
  const res = await fetch(`http://127.0.0.1:8000/api/rollingstock/${trainId}`);
  if (!res.ok) throw new Error("Failed to fetch rolling stock data");
  return res.json();
};

const fetchCleaningStatus = async (trainId: string) => {
  const res = await fetch(`http://127.0.0.1:8000/api/cleaning/${trainId}/status`);
  if (!res.ok) throw new Error("Failed to fetch cleaning status");
  return res.json();
};

const SupervisorDashboard = () => {
  const results = useQueries({
    queries: [
      { queryKey: ["signallingStatus"], queryFn: fetchSignallingStatus },
      { queryKey: ["telecomStatus"], queryFn: fetchTelecomStatus },
      { queryKey: ["rollingStock", "train_001"], queryFn: () => fetchRollingStockData("train_001") },
      { queryKey: ["cleaningStatus", "train_001"], queryFn: () => fetchCleaningStatus("train_001") },
    ],
  });

  const isLoading = results.some(query => query.isLoading);
  const isError = results.some(query => query.isError);

  const signallingStatus = results[0].data ? 
    Object.values(results[0].data).every(Boolean) : null;
  const telecomStatus = results[1].data ? 
    Object.values(results[1].data).every(Boolean) : null;
  const rollingStockAlerts = results[2].data?.inspection_alerts.length ?? null;
  const cleaningStatus = results[3].data ? 
    Object.values(results[3].data).every(Boolean) : null;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-primary/10">
                <Eye className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Supervisor Dashboard</h1>
              <p className="text-muted-foreground mt-1">High-level System Overview</p>
            </div>
          </div>
        </div>

        <Card className="p-6 bg-card border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">System Status Overview</h2>
            {isLoading ? (
                <div className="flex items-center justify-center h-48">
                    <Loader className="w-8 h-8 animate-spin text-primary" />
                    <p className="ml-4 text-lg text-muted-foreground">Loading system statuses...</p>
                </div>
            ) : isError ? (
                <div className="flex items-center justify-center h-48 bg-destructive/10 rounded-lg">
                    <ServerCrash className="w-8 h-8 text-destructive" />
                    <p className="ml-4 text-lg text-destructive">Error fetching system data.</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatusCard 
                        title="Signalling" 
                        isOk={signallingStatus} 
                        details={signallingStatus ? "All systems nominal" : "Issues detected"} 
                        linkTo="/dashboard/signalling"
                        icon={<Radio className="w-6 h-6"/>}
                    />
                    <StatusCard 
                        title="Telecom" 
                        isOk={telecomStatus} 
                        details={telecomStatus ? "All systems nominal" : "Issues detected"} 
                        linkTo="/dashboard/telecom"
                        icon={<Phone className="w-6 h-6"/>}
                    />
                    <StatusCard 
                        title="Rolling Stock (T-001)" 
                        isOk={rollingStockAlerts === 0} 
                        details={`${rollingStockAlerts ?? 'N/A'} open alerts`} 
                        linkTo="/dashboard/rollingStock"
                        icon={<Wrench className="w-6 h-6"/>}
                    />
                    <StatusCard 
                        title="Cleaning (T-001)" 
                        isOk={cleaningStatus} 
                        details={cleaningStatus ? "Fully cleaned" : "Cleaning pending"} 
                        linkTo="/dashboard/cleaning"
                        icon={<Sparkles className="w-6 h-6"/>}
                    />
                </div>
            )}
        </Card>
      </div>
    </div>
  );
};

const StatusCard = ({ title, isOk, details, linkTo, icon }: { title: string, isOk: boolean | null, details: string, linkTo: string, icon: React.ReactNode }) => {
    const statusColor = isOk ? "text-success" : "text-destructive";
    const statusIcon = isOk ? <CheckCircle2 /> : <XCircle />;

    return (
        <Link to={linkTo}>
            <Card className="p-6 bg-muted/30 hover:bg-muted/50 transition-colors h-full">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-foreground flex items-center gap-2">{icon} {title}</h3>
                    {isOk !== null && <div className={statusColor}>{statusIcon}</div>}
                </div>
                <p className={`text-2xl font-bold ${statusColor}`}>{isOk ? "Operational" : "Issues Detected"}</p>
                <p className="text-sm text-muted-foreground mt-1">{details}</p>
            </Card>
        </Link>
    )
}

export default SupervisorDashboard;