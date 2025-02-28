
import { Link } from "react-router-dom";
import { Company } from "@/lib/types";
import { MapPin, Briefcase, Users, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CompanyCardProps {
  company: Company;
  jobCount: number;
}

const CompanyCard = ({ company, jobCount }: CompanyCardProps) => {
  return (
    <div className="job-card group animate-slide-up">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-16 h-16 rounded-md border border-border flex items-center justify-center bg-background shrink-0">
          <img 
            src={company.logo} 
            alt={company.name} 
            className="w-10 h-10 object-contain"
          />
        </div>
        <div className="flex-1">
          <Link 
            to={`/companies/${company.id}`}
            className="inline-block hover:text-primary transition-colors"
          >
            <h3 className="font-medium text-lg group-hover:text-primary transition-colors">
              {company.name}
            </h3>
          </Link>
          <div className="flex items-center text-muted-foreground mt-1">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{company.location}</span>
            </div>
            <span className="px-2">•</span>
            <div className="flex items-center">
              <Briefcase className="w-4 h-4 mr-1" />
              <span className="text-sm">{company.industry}</span>
            </div>
          </div>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {company.description}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center">
          <Users className="w-4 h-4 mr-2 text-muted-foreground" />
          <span className="text-sm">{company.employees} employees</span>
          <span className="mx-2 text-muted-foreground">•</span>
          <Briefcase className="w-4 h-4 mr-2 text-muted-foreground" />
          <span className="text-sm">{jobCount} open positions</span>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" asChild>
            <a href={company.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
              <ExternalLink className="w-3 h-3" />
              <span>Website</span>
            </a>
          </Button>
          <Button size="sm" asChild>
            <Link to={`/companies/${company.id}`}>View Profile</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
