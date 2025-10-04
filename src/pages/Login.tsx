import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { toast } from "sonner";
import { ArrowLeft, Lock, Mail } from "lucide-react";
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
      bgGradient: "from-blue-500/10 to-blue-600/5",
    },
    {
      value: "rollingStock",
      label: "Rolling Stock Engineer",
      subtitle: "Fitness & Maintenance",
      icon: "🔧",
      color: "hsl(var(--role-rolling))",
      bgGradient: "from-red-500/10 to-red-600/5",
    },
    {
      value: "signalling",
      label: "Signalling Officer",
      subtitle: "Safety & Routing",
      icon: "🚦",
      color: "hsl(var(--role-signalling))",
      bgGradient: "from-green-500/10 to-green-600/5",
    },
    {
      value: "telecom",
      label: "Telecom Officer",
      subtitle: "Comms & Faults",
      icon: "📡",
      color: "hsl(var(--role-telecom))",
      bgGradient: "from-cyan-500/10 to-cyan-600/5",
    },
    {
      value: "branding",
      label: "Branding Officer",
      subtitle: "Marketing & Brand Checks",
      icon: "🎨",
      color: "hsl(var(--role-branding))",
      bgGradient: "from-purple-500/10 to-purple-600/5",
    },
    {
      value: "cleaning",
      label: "Cleaning Lead",
      subtitle: "Clean & Ready",
      icon: "✨",
      color: "hsl(var(--role-cleaning))",
      bgGradient: "from-teal-500/10 to-teal-600/5",
    },
    {
      value: "yard",
      label: "Yard / Depot Operator",
      subtitle: "Ground Ops",
      icon: "🏗️",
      color: "hsl(var(--role-yard))",
      bgGradient: "from-orange-500/10 to-orange-600/5",
    },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const user = demoUsers.find(
      (u) => u.employeeId === employeeId && u.password === password && u.role === selectedRole
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      toast.success("Access granted. Welcome to the control center.");
      navigate(`/dashboard/${selectedRole}`);
    } else {
      toast.error("Authentication failed. Invalid credentials.");
    }
  };

  const prefillDemo = () => {
    const user = demoUsers.find((u) => u.role === selectedRole);
    if (user) {
      setEmployeeId(user.employeeId);
      setPassword(user.password);
      toast.info("Demo credentials loaded", {
        description: "Click Sign In to continue"
      });
    }
  };

  const currentRole = roles.find((r) => r.value === selectedRole);

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        
        <div className="container flex items-center justify-center px-4 py-20">
          <div className="w-full max-w-6xl">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-black mb-4">
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Access Control Center
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Select your operational role to proceed
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {roles.map((role) => (
                <button
                  key={role.value}
                  onClick={() => setSelectedRole(role.value)}
                  className="group relative p-8 rounded-2xl bg-card border-2 border-border/50 hover:border-primary transition-all duration-300 hover:scale-105 text-left overflow-hidden"
                  style={{
                    boxShadow: `0 0 0 1px ${role.color}20, 0 8px 32px -8px ${role.color}40`
                  }}
                >
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{ background: `radial-gradient(circle at 50% 50%, ${role.color}, transparent)` }}
                  />
                  
                  <div className="relative z-10">
                    <div 
                      className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110"
                      style={{ filter: `drop-shadow(0 0 8px ${role.color})` }}
                    >
                      {role.icon}
                    </div>
                    
                    <h3 className="text-xl font-bold mb-1 text-foreground">
                      {role.label}
                    </h3>
                    <p className="text-sm font-semibold" style={{ color: role.color }}>
                      {role.subtitle}
                    </p>
                  </div>

                  <div 
                    className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    style={{ backgroundColor: role.color }}
                  />
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
      
      <div className="container flex items-center justify-center px-4 py-20">
        <Card 
          className="w-full max-w-md p-8 rounded-2xl bg-card border-2 border-border/50 shadow-2xl relative overflow-hidden"
          style={{
            boxShadow: `0 0 0 1px ${currentRole?.color}20, 0 20px 60px -10px ${currentRole?.color}40`
          }}
        >
          <div 
            className="absolute inset-0 opacity-5"
            style={{ background: `radial-gradient(circle at 50% 0%, ${currentRole?.color}, transparent)` }}
          />

          <div className="relative z-10">
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
              <div 
                className="text-6xl mb-4 inline-block"
                style={{ filter: `drop-shadow(0 0 12px ${currentRole?.color})` }}
              >
                {currentRole?.icon}
              </div>
              <h2 className="text-3xl font-black mb-2 text-foreground">
                {currentRole?.label}
              </h2>
              <p className="text-sm font-semibold" style={{ color: currentRole?.color }}>
                {currentRole?.subtitle}
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="employeeId" className="text-foreground font-semibold">
                  Employee ID
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="employeeId"
                    placeholder="EMP1001"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    required
                    className="pl-11 bg-muted/50 border-border focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground font-semibold">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-11 bg-muted/50 border-border focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={prefillDemo}
                className="w-full border-primary/30 text-primary hover:bg-primary/10 font-semibold"
              >
                Load Demo Credentials
              </Button>

              <Button 
                type="submit" 
                className="w-full font-bold text-lg py-6 rounded-xl shadow-glow transition-all hover:scale-105"
                style={{
                  backgroundColor: currentRole?.color,
                  color: 'hsl(var(--background))',
                  boxShadow: `0 0 20px ${currentRole?.color}60`
                }}
              >
                Sign In to Control Center
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
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
