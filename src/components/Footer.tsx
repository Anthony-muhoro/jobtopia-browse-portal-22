
import { Mail, Phone, Github } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-muted/20 border-t border-border">
      <div className="page-container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4">Jobtopia</h3>
            <p className="text-muted-foreground">
              Find the perfect job that matches your skills and aspirations from thousands of curated listings.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-4 w-4" />
                <a href="mailto:contact@jobtopia.com">contact@jobtopia.com</a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="h-4 w-4" />
                <a href="tel:+15555555555">+1 (555) 555-5555</a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-4 w-4" />
                <a href="https://github.com/jobtopia" target="_blank" rel="noopener noreferrer">
                  github.com/jobtopia
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/jobs" className="text-muted-foreground hover:text-foreground transition-colors">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/companies" className="text-muted-foreground hover:text-foreground transition-colors">
                  Companies
                </Link>
              </li>
              <li>
                <Link to="/for-employers" className="text-muted-foreground hover:text-foreground transition-colors">
                  For Employers
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {currentYear} Jobtopia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
