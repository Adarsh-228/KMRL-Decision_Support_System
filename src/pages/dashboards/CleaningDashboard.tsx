import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, CheckCircle2, XCircle } from "lucide-react";
import demoTrainsets from "@/data/demoTrainsets.json";

const CleaningDashboard = () => {
  const [selectedTrain, setSelectedTrain] = useState<string>("");
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});

  const cleaningTasks = {
    interior: ["Floors", "Windows", "Seats", "Toilets"],
    pestControl: ["Pest Control", "Sanitization (Post-COVID)"],
    exterior: ["Dust-free & Branding Visibility"],
  };

  const allTasks = [...cleaningTasks.interior, ...cleaningTasks.pestControl, ...cleaningTasks.exterior];
  const completedTasks = Object.values(checklist).filter(Boolean).length;
  const totalTasks = allTasks.length;

  const handleCheckChange = (taskId: string, checked: boolean) => {
    setChecklist(prev => ({ ...prev, [taskId]: checked }));
  };

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
                    {t.id} - Cleaning Status: {t.cleaning}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Cleaning Checklist (only show when trainset is selected) */}
        {selectedTrain && (
          <>
            {/* Progress Card */}
            <Card className="border-border bg-card">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-foreground">Cleaning Progress</h2>
                  <Badge className={completedTasks === totalTasks ? "bg-success/20 text-success" : "bg-warning/20 text-warning"}>
                    {completedTasks} / {totalTasks} Tasks
                  </Badge>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div 
                    className="bg-success h-3 rounded-full transition-all" 
                    style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
                  />
                </div>
              </div>
            </Card>

            {/* Cleaning Checklist */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Interior Cleaning */}
              <Card className="border-border bg-card">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">Interior Cleaning</h3>
                  <div className="space-y-3">
                    {cleaningTasks.interior.map((task) => {
                      const taskId = `${selectedTrain}-${task}`;
                      const isChecked = checklist[taskId] || false;
                      return (
                        <div key={task} className="flex items-center gap-3 p-3 bg-muted/20 rounded-md">
                          <Checkbox
                            id={taskId}
                            checked={isChecked}
                            onCheckedChange={(checked) => handleCheckChange(taskId, checked as boolean)}
                          />
                          <Label htmlFor={taskId} className="flex-1 cursor-pointer text-sm">
                            {task}
                          </Label>
                          {isChecked ? (
                            <CheckCircle2 className="w-5 h-5 text-success" />
                          ) : (
                            <XCircle className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card>

              {/* Pest Control & Sanitization */}
              <Card className="border-border bg-card">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">Pest Control & Sanitization</h3>
                  <div className="space-y-3">
                    {cleaningTasks.pestControl.map((task) => {
                      const taskId = `${selectedTrain}-${task}`;
                      const isChecked = checklist[taskId] || false;
                      return (
                        <div key={task} className="flex items-center gap-3 p-3 bg-muted/20 rounded-md">
                          <Checkbox
                            id={taskId}
                            checked={isChecked}
                            onCheckedChange={(checked) => handleCheckChange(taskId, checked as boolean)}
                          />
                          <Label htmlFor={taskId} className="flex-1 cursor-pointer text-sm">
                            {task}
                          </Label>
                          {isChecked ? (
                            <CheckCircle2 className="w-5 h-5 text-success" />
                          ) : (
                            <XCircle className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card>

              {/* Exterior Cleaning */}
              <Card className="border-border bg-card">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">Exterior Cleaning</h3>
                  <div className="space-y-3">
                    {cleaningTasks.exterior.map((task) => {
                      const taskId = `${selectedTrain}-${task}`;
                      const isChecked = checklist[taskId] || false;
                      return (
                        <div key={task} className="flex items-center gap-3 p-3 bg-muted/20 rounded-md">
                          <Checkbox
                            id={taskId}
                            checked={isChecked}
                            onCheckedChange={(checked) => handleCheckChange(taskId, checked as boolean)}
                          />
                          <Label htmlFor={taskId} className="flex-1 cursor-pointer text-sm">
                            {task}
                          </Label>
                          {isChecked ? (
                            <CheckCircle2 className="w-5 h-5 text-success" />
                          ) : (
                            <XCircle className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card>
            </div>

            {/* Remarks */}
            <Card className="border-border bg-card">
              <div className="p-6">
                <Label className="text-sm font-semibold text-foreground mb-3 block">Additional Remarks</Label>
                <Textarea 
                  placeholder="Enter any observations, issues found, or special cleaning requirements..."
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
              <Sparkles className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">No Trainset Selected</h3>
              <p className="text-sm text-muted-foreground">
                Please select a trainset from the dropdown above to view its cleaning checklist.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CleaningDashboard;
