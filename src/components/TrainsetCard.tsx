import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "./StatusBadge";
import { AlertCircle, CheckCircle2, Clock } from "lucide-react";

interface TrainsetCardProps {
  trainset: {
    id: string;
    status: string;
    odometerKm: number;
    fitnessExpiry: {
      rolling: string;
      signalling: string;
      telecom: string;
    };
    jobCards: Array<{
      id: string;
      severity: string;
      status: string;
      description: string;
    }>;
    branding: Array<{
      id: string;
      advertiser: string;
      requiredHours: number;
      actualHours: number;
    }>;
    cleaning: string;
  };
  confidence?: number;
  expanded?: boolean;
  onClick?: () => void;
}

export const TrainsetCard = ({ trainset, confidence, expanded = false, onClick }: TrainsetCardProps) => {
  const roleBadges = [
    { key: "ROL", label: "Rolling Stock", color: "bg-emerald-500/20 text-emerald-400" },
    { key: "SIG", label: "Signalling", color: "bg-blue-500/20 text-blue-400" },
    { key: "TEL", label: "Telecom", color: "bg-purple-500/20 text-purple-400" },
    { key: "BRA", label: "Branding", color: "bg-amber-500/20 text-amber-400" },
    { key: "CLE", label: "Cleaning", color: "bg-cyan-500/20 text-cyan-400" },
  ];

  const getIssueText = () => {
    if (trainset.jobCards.length > 0) {
      const job = trainset.jobCards[0];
      return `${job.severity === "critical" ? "Critical" : "High severity"} ${job.description.toLowerCase()} (${job.id})`;
    }
    
    const sigExpiry = new Date(trainset.fitnessExpiry.signalling);
    const today = new Date();
    const daysUntil = Math.floor((sigExpiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntil < 30) {
      return "Signalling fitness expiring soon — requires re-certification";
    }
    
    if (trainset.status === "Ready") {
      return "Optimal fitness • Low mileage • Recent maintenance";
    }
    
    return "CCTV system update pending • PA functional";
  };

  return (
    <Card
      className={cn(
        "p-4 bg-card/50 border-border/50 hover:border-primary/50 transition-all cursor-pointer",
        "backdrop-blur-sm hover:shadow-lg hover:shadow-primary/10",
        expanded && "ring-2 ring-primary"
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-lg font-bold text-foreground">{trainset.id}</h3>
          </div>
        </div>
        <StatusBadge status={trainset.status} />
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {roleBadges.map((badge) => (
          <Badge
            key={badge.key}
            className={cn("text-[10px] font-semibold px-2 py-0.5", badge.color)}
          >
            {badge.key}
          </Badge>
        ))}
      </div>

      <div className="flex items-start gap-2 text-sm text-muted-foreground mb-3">
        {trainset.status === "Maintenance" || trainset.jobCards.length > 0 ? (
          <AlertCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
        ) : (
          <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
        )}
        <p className="text-xs leading-relaxed">{getIssueText()}</p>
      </div>

      {confidence !== undefined && (
        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <span className="text-xs text-muted-foreground font-medium">Confidence</span>
          <span className="text-sm font-bold text-secondary">{confidence}%</span>
        </div>
      )}
    </Card>
  );
};

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
