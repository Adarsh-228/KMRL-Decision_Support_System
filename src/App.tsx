import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SupervisorDashboard from "./pages/dashboards/SupervisorDashboard";
import RollingStockDashboard from "./pages/dashboards/RollingStockDashboard";
import SignallingDashboard from "./pages/dashboards/SignallingDashboard";
import TelecomDashboard from "./pages/dashboards/TelecomDashboard";
import CleaningDashboard from "./pages/dashboards/CleaningDashboard";
import YardDashboard from "./pages/dashboards/YardDashboard";
import BrandingDashboard from "./pages/dashboards/BrandingDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/supervisor" element={<SupervisorDashboard />} />
          <Route path="/dashboard/rollingStock" element={<RollingStockDashboard />} />
          <Route path="/dashboard/signalling" element={<SignallingDashboard />} />
          <Route path="/dashboard/telecom" element={<TelecomDashboard />} />
          <Route path="/dashboard/cleaning" element={<CleaningDashboard />} />
          <Route path="/dashboard/yard" element={<YardDashboard />} />
          <Route path="/dashboard/branding" element={<BrandingDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
