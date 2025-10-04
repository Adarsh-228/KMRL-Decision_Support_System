import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { toast } from "sonner";
import { ArrowLeft, Lock, User } from "lucide-react";
import demoUsers from "@/data/demoUsers.json";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const preselectedRole = (location.state as any)?.preselectedRole;
  
  const [selectedRole, setSelectedRole] = useState<string | null>(preselectedRole || null);
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");

  const roles = [
    {
      value: "supervisor",
      label: "Supervisor",
      subtitle: "Strategic Control",
      icon: "⚡",
      color: "hsl(var(--role-supervisor))",
    },
    {
      value: "rollingStock",
      label: "Rolling Stock Engineer",
      subtitle: "Fitness & Maintenance",
      icon: "🔧",
      color: "hsl(var(--role-rolling))",
    },
    {
      value: "signalling",
      label: "Signalling Officer",
      subtitle: "Safety & Routing",
      icon: "🚦",
      color: "hsl(var(--role-signalling))",
    },
    {
      value: "telecom",
      label: "Telecom Officer",
      subtitle: "Comms & Faults",
      icon: "📡",
      color: "hsl(var(--role-telecom))",
    },
    {
      value: "branding",
      label: "Branding Officer",
      subtitle: "Marketing & Brand Checks",
      icon: "🎨",
      color: "hsl(var(--role-branding))",
    },
    {
      value: "cleaning",
      label: "Cleaning Lead",
      subtitle: "Clean & Ready",
      icon: "✨",
      color: "hsl(var(--role-cleaning))",
    },
    {
      value: "yard",
      label: "Yard / Depot Operator",
      subtitle: "Ground Ops",
      icon: "🏗️",
      color: "hsl(var(--role-yard))",
    },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const user = demoUsers.find(
      (u) => u.employeeId === employeeId && u.password === password && u.role === selectedRole
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      toast.success("Login successful");
      navigate(`/dashboard/${selectedRole}`);
    } else {
      toast.error("Invalid credentials");
    }
  };

  const prefillDemo = () => {
    const user = demoUsers.find((u) => u.role === selectedRole);
    if (user) {
      setEmployeeId(user.employeeId);
      setPassword(user.password);
      toast.info("Demo credentials loaded");
    }
  };

  const currentRole = roles.find((r) => r.value === selectedRole);

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        
        <div className="container flex items-center justify-center px-4 py-16">
          <div className="w-full max-w-6xl">
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                Access Control Center
              </h1>
              <p className="text-lg text-muted-foreground">
                Select your operational role to proceed
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {roles.map((role) => (
                <button
                  key={role.value}
                  onClick={() => setSelectedRole(role.value)}
                  className="group relative p-6 rounded-lg bg-card border border-border/50 hover:border-primary transition-all text-left"
                >
                  <div className="text-4xl mb-3">
                    {role.icon}
                  </div>
                  
                  <h3 className="text-lg font-bold mb-1 text-foreground">
                    {role.label}
                  </h3>
                  <p className="text-sm font-semibold" style={{ color: role.color }}>
                    {role.subtitle}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <div className="container flex items-center justify-center px-4 py-16">
        <Card className="w-full max-w-md p-8 rounded-lg bg-card border border-border/50">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedRole(null)}
            className="mb-6 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Role Selection
          </Button>

          <div className="text-center mb-8">
            <div className="text-5xl mb-3">
              {currentRole?.icon}
            </div>
            <h2 className="text-2xl font-bold mb-1 text-foreground">
              {currentRole?.label}
            </h2>
            <p className="text-sm font-semibold" style={{ color: currentRole?.color }}>
              {currentRole?.subtitle}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="employeeId" className="text-foreground font-semibold">
                Employee ID
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="employeeId"
                  placeholder="EMP1001"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  required
                  className="pl-10 bg-muted/30 border-border"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-semibold">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 bg-muted/30 border-border"
                />
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={prefillDemo}
              className="w-full border-primary/30 text-primary hover:bg-primary/10"
            >
              Load Demo Credentials
            </Button>

            <Button 
              type="submit" 
              className="w-full font-semibold py-5 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Sign In
            </Button>

            <div className="text-center">
              <Button 
                variant="link" 
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Forgot password?
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
