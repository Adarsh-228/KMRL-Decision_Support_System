import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Train, LogOut } from "lucide-react";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = location.pathname.startsWith("/dashboard");

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  };

  const scrollToSection = (sectionId: string) => {
    // If not on landing page, navigate there first
    if (location.pathname !== "/") {
      navigate("/");
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      // Already on landing page, just scroll
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary">
            <Train className="w-6 h-6 text-primary-foreground" />
          </div>
        </Link>

        <nav className="flex items-center gap-6">
          {!isAuthenticated ? (
            <>
              <button
                onClick={() => scrollToSection("features")}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                How it Works
              </button>
              <button
                onClick={() => scrollToSection("roles")}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Roles
              </button>
              <Link to="/login">
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Login
                </Button>
              </Link>
            </>
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};
