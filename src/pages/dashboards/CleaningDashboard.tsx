import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, CheckCircle2, XCircle, Loader, ServerCrash } from "lucide-react";
import demoTrainsets from "@/data/demoTrainsets.json";

// --- Data Types ---
interface CleaningStatus {
  interior_cleaning: boolean;
  pest_control: boolean;
  exterior_cleaning: boolean;
}

// --- API Fetch Function ---
const fetchCleaningStatus = async (trainId: string): Promise<CleaningStatus> => {
  const response = await fetch(`http://127.0.0.1:8000/api/cleaning/${trainId}/status`);
  if (!response.ok) {
    throw new Error(`Network response was not ok for train ${trainId}`);
  }
  return response.json();
};

// --- API Update Function ---
const updateCleaningStatus = async ({ trainId, status }: { trainId: string; status: CleaningStatus }): Promise<CleaningStatus> => {
  const response = await fetch(`http://127.0.0.1:8000/api/cleaning/${trainId}/status`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(status),
  });
  if (!response.ok) {
    throw new Error("Failed to update status");
  }
  return response.json();
};

const CleaningDashboard = () => {
  const [selectedTrain, setSelectedTrain] = useState<string>("");
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery<CleaningStatus, Error>({
    queryKey: ["cleaningStatus", selectedTrain],
    queryFn: () => fetchCleaningStatus(selectedTrain),
    enabled: !!selectedTrain, // Only fetch when a train is selected
  });

  const mutation = useMutation<CleaningStatus, Error, { trainId: string; status: CleaningStatus }>({
    mutationFn: updateCleaningStatus,
    onSuccess: (newData) => {
      queryClient.setQueryData(["cleaningStatus", selectedTrain], newData);
    },
  });

  const handleCheckChange = (task: keyof CleaningStatus, checked: boolean) => {
    if (data) {
      const newStatus = { ...data, [task]: checked };
      mutation.mutate({ trainId: selectedTrain, status: newStatus });
    }
  };

  const ChecklistItem = ({ task, label }: { task: keyof CleaningStatus; label: string }) => (
    <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-md">
      <Checkbox
        id={task}
        checked={data?.[task] || false}
        onCheckedChange={(checked) => handleCheckChange(task, checked as boolean)}
        disabled={!data || mutation.isPending}
      />
      <Label htmlFor={task} className="flex-1 cursor-pointer text-sm">
        {label}
      </Label>
      {data?.[task] ? (
        <CheckCircle2 className="w-5 h-5 text-success" />
      ) : (
        <XCircle className="w-5 h-5 text-muted-foreground" />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-primary/10">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Cleaning Lead</h1>
              <p className="text-muted-foreground">Hygiene & Sanitization Management</p>
            </div>
          </div>
        </div>

        {/* Trainset Selection */}
        <Card className="border-border bg-card">
          <div className="p-6">
            <Label className="text-sm font-semibold text-foreground mb-3 block">Select Trainset</Label>
            <Select value={selectedTrain} onValueChange={setSelectedTrain}>
              <SelectTrigger className="w-full max-w-md border-primary/30">
                <SelectValue placeholder="Choose a trainset to view cleaning checklist..." />
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

        {/* Cleaning Checklist */}
        {selectedTrain && (
          <Card className="border-border bg-card">
            <div className="p-6 border-b border-border">
              <h2 className="text-2xl font-bold text-foreground">Cleaning Checklist for {selectedTrain}</h2>
            </div>
            <div className="p-6">
              {isLoading ? (
                <div className="flex items-center justify-center h-32">
                  <Loader className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : isError ? (
                <div className="flex items-center justify-center h-32 bg-destructive/10 rounded-lg">
                  <ServerCrash className="w-8 h-8 text-destructive" />
                  <p className="ml-4 text-lg text-destructive">Error: {error.message}</p>
                </div>
              ) : data ? (
                <div className="space-y-3">
                  <ChecklistItem task="interior_cleaning" label="Interior Cleaning (Floors, Windows, Seats, Toilets)" />
                  <ChecklistItem task="pest_control" label="Pest Control & Sanitization" />
                  <ChecklistItem task="exterior_cleaning" label="Exterior Cleaning (Dust-free & Branding)" />
                </div>
              ) : null}
            </div>
          </Card>
        )}

        {/* Empty State */}
        {!selectedTrain && (
          <Card className="border-border bg-card/50">
            <div className="p-12 text-center">
              <Sparkles className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">No Trainset Selected</h3>
              <p className="text-sm text-muted-foreground">
                Please select a trainset to view its cleaning checklist.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CleaningDashboard;