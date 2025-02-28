
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-border/50" 
          : "bg-transparent"
      }`}
    >
      <div className="page-container py-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 focus-ring rounded-md"
        >
          <Briefcase className="w-5 h-5 text-primary" />
          <span className="text-xl font-medium tracking-tight">Jobtopia</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" active={location.pathname === "/"}>
            Home
          </NavLink>
          <NavLink 
            to="/companies" 
            active={location.pathname.startsWith("/companies")}
          >
            Companies
          </NavLink>
          <NavLink 
            to="/jobs" 
            active={location.pathname.startsWith("/jobs")}
          >
            Browse Jobs
          </NavLink>
        </nav>

        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="hidden md:inline-flex"
          >
            For Employers
          </Button>
          <Button size="sm">
            Post a Job
          </Button>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

const NavLink = ({ to, active, children }: NavLinkProps) => {
  return (
    <Link
      to={to}
      className={`relative font-medium px-1 py-2 transition-colors hover:text-primary focus-ring rounded-md ${
        active ? "text-primary" : "text-foreground/80"
      }`}
    >
      {children}
      {active && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"></span>
      )}
    </Link>
  );
};

export default Navbar;
