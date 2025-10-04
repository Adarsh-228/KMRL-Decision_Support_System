import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const variants: Record<string, { bg: string; text: string }> = {
    Ready: { bg: "bg-success/20", text: "text-success" },
    Standby: { bg: "bg-warning/20", text: "text-warning" },
    Maintenance: { bg: "bg-destructive/20", text: "text-destructive" },
    IBL: { bg: "bg-destructive/30", text: "text-destructive" },
  };

  const variant = variants[status] || { bg: "bg-muted", text: "text-muted-foreground" };

  return (
    <Badge
      className={cn(
        "font-semibold uppercase text-xs px-3 py-1",
        variant.bg,
        variant.text,
        className
      )}
    >
      {status}
    </Badge>
  );
};
