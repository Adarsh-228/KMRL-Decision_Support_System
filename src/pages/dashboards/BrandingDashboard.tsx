import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Palette, Plus, Loader, ServerCrash } from "lucide-react";
import { format } from 'date-fns';

// --- Data Types ---
interface BrandingCampaign {
  campaign_id: string;
  brand_name: string;
  ad_content: string;
  start_date: string; // Assuming ISO string format from backend
  end_date: string;
}

interface BrandingCampaignCreate {
  brand_name: string;
  ad_content: string;
  start_date: string;
  end_date: string;
}

// --- API Functions ---
const fetchBrandingCampaigns = async (): Promise<BrandingCampaign[]> => {
  const response = await fetch(`http://127.0.0.1:8000/api/branding/campaigns`);
  if (!response.ok) {
    throw new Error("Failed to fetch campaigns");
  }
  return response.json();
};

const createBrandingCampaign = async (newCampaign: BrandingCampaignCreate): Promise<BrandingCampaign> => {
  const response = await fetch(`http://127.0.0.1:8000/api/branding/campaigns`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newCampaign),
  });
  if (!response.ok) {
    throw new Error("Failed to create campaign");
  }
  return response.json();
};

const BrandingDashboard = () => {
  const queryClient = useQueryClient();
  const [newCampaign, setNewCampaign] = useState<BrandingCampaignCreate>({
    brand_name: "",
    ad_content: "",
    start_date: "",
    end_date: "",
  });

  const { data: campaigns, isLoading, isError, error } = useQuery<BrandingCampaign[], Error>({
    queryKey: ["brandingCampaigns"],
    queryFn: fetchBrandingCampaigns,
  });

  const mutation = useMutation<BrandingCampaign, Error, BrandingCampaignCreate>({
    mutationFn: createBrandingCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brandingCampaigns"] });
      setNewCampaign({ brand_name: "", ad_content: "", start_date: "", end_date: "" });
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewCampaign(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(newCampaign);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="p-3 rounded-lg bg-primary/10">
                <Palette className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Branding Team</h1>
              <p className="text-muted-foreground">Campaign Management</p>
            </div>
          </div>
        </div>

        <Card className="p-6 bg-card border-border">
          <h2 className="text-xl font-bold text-foreground mb-4">Active Campaigns</h2>
          {isLoading ? (
            <div className="text-center text-muted-foreground">Loading campaigns...</div>
          ) : isError ? (
            <div className="text-center text-destructive">Error: {error.message}</div>
          ) : campaigns && campaigns.length > 0 ? (
            <div className="grid lg:grid-cols-2 gap-6">
              {campaigns.map((campaign) => (
                <Card key={campaign.campaign_id} className="p-4 bg-muted/30">
                  <h3 className="font-bold text-foreground">{campaign.brand_name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">Content: {campaign.ad_content}</p>
                  <Badge>From {format(new Date(campaign.start_date), 'PPP')} to {format(new Date(campaign.end_date), 'PPP')}</Badge>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-8">No active campaigns.</div>
          )}
        </Card>

        <Card className="p-6 bg-card border-border">
          <h2 className="text-xl font-bold text-foreground mb-4">Create New Campaign</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="brand_name">Advertiser / Brand Name</Label>
                <Input id="brand_name" value={newCampaign.brand_name} onChange={handleInputChange} placeholder="Enter advertiser name" className="mt-2" required />
              </div>
              <div>
                <Label htmlFor="ad_content">Ad Content</Label>
                <Input id="ad_content" value={newCampaign.ad_content} onChange={handleInputChange} placeholder="e.g., 'Summer Sale Poster'" className="mt-2" required />
              </div>
              <div>
                <Label htmlFor="start_date">Start Date</Label>
                <Input id="start_date" value={newCampaign.start_date} onChange={handleInputChange} type="date" className="mt-2" required />
              </div>
              <div>
                <Label htmlFor="end_date">End Date</Label>
                <Input id="end_date" value={newCampaign.end_date} onChange={handleInputChange} type="date" className="mt-2" required />
              </div>
            </div>
            {mutation.isError && (
                <div className="text-destructive text-sm">Error creating campaign: {mutation.error.message}</div>
            )}
            <Button type="submit" disabled={mutation.isPending} className="gap-2">
              {mutation.isPending ? <Loader className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              Create Campaign
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default BrandingDashboard;