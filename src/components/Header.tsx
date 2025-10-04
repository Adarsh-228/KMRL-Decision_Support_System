import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Train, LogOut } from "lucide-react";

export const Header = () => {
  const location = useLocation();
  const isAuthenticated = location.pathname.startsWith("/dashboard");

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-secondary">
            <Train className="w-6 h-6 text-secondary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">KMRL DSS</h1>
            <p className="text-[10px] text-muted-foreground">Decision Support</p>
          </div>
        </Link>

        <nav className="flex items-center gap-6">
          {!isAuthenticated ? (
            <>
              <Link
                to="/#features"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </Link>
              <Link
                to="/#how-it-works"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                How it Works
              </Link>
              <Link
                to="/#roles"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Roles
              </Link>
              <Link to="/login">
                <Button size="sm" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
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
