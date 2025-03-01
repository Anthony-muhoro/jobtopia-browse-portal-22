
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Briefcase, Menu, X, User, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm border-b border-border/50" 
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

        {/* Desktop Navigation */}
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
            asChild
          >
            <Link to="/for-employers">For Employers</Link>
          </Button>
          <Button 
            size="sm" 
            className="hidden md:inline-flex"
            asChild
          >
            <Link to="/post-job">Post a Job</Link>
          </Button>
          
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="relative"
              title="Employee Dashboard"
            >
              <Link to="/dashboard">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="relative"
              title="Employer Dashboard"
            >
              <Link to="/employer-dashboard">
                <Building className="h-5 w-5" />
              </Link>
            </Button>
          </div>
          
          {/* Mobile Menu Toggle */}
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-background border-t border-border/10"
          >
            <nav className="flex flex-col p-4 gap-2">
              <MobileNavLink 
                to="/" 
                active={location.pathname === "/"}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </MobileNavLink>
              <MobileNavLink 
                to="/companies" 
                active={location.pathname.startsWith("/companies")}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Companies
              </MobileNavLink>
              <MobileNavLink 
                to="/jobs" 
                active={location.pathname.startsWith("/jobs")}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Browse Jobs
              </MobileNavLink>
              <MobileNavLink 
                to="/dashboard" 
                active={location.pathname.startsWith("/dashboard")}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Employee Dashboard
              </MobileNavLink>
              <MobileNavLink 
                to="/employer-dashboard" 
                active={location.pathname.startsWith("/employer-dashboard")}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Employer Dashboard
              </MobileNavLink>
              
              <div className="grid grid-cols-2 gap-2 mt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  asChild
                >
                  <Link to="/for-employers">For Employers</Link>
                </Button>
                <Button 
                  size="sm"
                  className="w-full"
                  asChild
                >
                  <Link to="/post-job">Post a Job</Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
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
        <motion.span 
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
          layoutId="navbar-indicator"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
    </Link>
  );
};

interface MobileNavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const MobileNavLink = ({ to, active, children, onClick }: MobileNavLinkProps) => {
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md transition-colors ${
        active 
          ? "bg-primary/10 text-primary font-medium" 
          : "text-foreground/80 hover:bg-muted/80"
      }`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Navbar;
