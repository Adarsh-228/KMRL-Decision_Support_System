import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Header } from "@/components/Header";
import { toast } from "sonner";
import demoUsers from "@/data/demoUsers.json";

const Login = () => {
  const navigate = useNavigate();
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const roles = [
    { value: "supervisor", label: "Supervisor" },
    { value: "rollingStock", label: "Rolling Stock Engineer" },
    { value: "signalling", label: "Signalling System" },
    { value: "telecom", label: "Telecom / Communications" },
    { value: "cleaning", label: "Cleaning Lead" },
    { value: "yard", label: "Depot Operations / Yard Master" },
    { value: "branding", label: "Branding Team" },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const user = demoUsers.find(
      (u) => u.employeeId === employeeId && u.password === password && u.role === role
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      toast.success("Login successful!");
      navigate(`/dashboard/${role}`);
    } else {
      toast.error("Invalid credentials. Please try again.");
    }
  };

  const prefillDemo = (demoRole: string) => {
    const user = demoUsers.find((u) => u.role === demoRole);
    if (user) {
      setEmployeeId(user.employeeId);
      setPassword(user.password);
      setRole(user.role);
      toast.info(`Demo credentials loaded for ${roles.find((r) => r.value === demoRole)?.label}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <Header />
      
      <div className="container flex items-center justify-center px-4 py-16">
        <Card className="w-full max-w-md border-border/50 shadow-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access KMRL DSS
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="employeeId">Employee ID</Label>
                <Input
                  id="employeeId"
                  placeholder="EMP1001"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={setRole} required>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((r) => (
                      <SelectItem key={r.value} value={r.value}>
                        {r.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </Label>
                </div>
                <Button variant="link" className="px-0 text-sm text-secondary">
                  Forgot password?
                </Button>
              </div>

              <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                Sign In
              </Button>
            </form>

            <div className="mt-6 space-y-2">
              <p className="text-sm text-center text-muted-foreground">Quick Demo Access:</p>
              <div className="grid grid-cols-2 gap-2">
                {roles.slice(0, 4).map((r) => (
                  <Button
                    key={r.value}
                    variant="outline"
                    size="sm"
                    onClick={() => prefillDemo(r.value)}
                    className="text-xs"
                  >
                    {r.label.split(" ")[0]}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
