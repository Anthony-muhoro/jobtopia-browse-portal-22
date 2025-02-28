
import { Link } from "react-router-dom";
import { Job } from "@/lib/types";
import { MapPin, Building, Clock, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
  const postedDate = new Date(job.postedAt);

  return (
    <div className="job-card group animate-slide-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-md border border-border flex items-center justify-center bg-background/50 shrink-0">
            <img
              src={job.company.logo}
              alt={job.company.name}
              className="w-8 h-8 object-contain"
            />
          </div>
          <div className="space-y-1">
            <Link 
              to={`/jobs/${job.id}`}
              className="inline-block hover:text-primary transition-colors"
            >
              <h3 className="font-medium text-lg group-hover:text-primary transition-colors">
                {job.title}
              </h3>
            </Link>
            <div className="flex items-center text-muted-foreground">
              <Link 
                to={`/companies/${job.company.id}`}
                className="flex items-center hover:text-primary transition-colors"
              >
                <Building className="w-4 h-4 mr-1" />
                <span className="text-sm">{job.company.name}</span>
              </Link>
              <span className="px-2">•</span>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">{job.location}</span>
              </div>
            </div>
          </div>
        </div>

        {job.featured && (
          <Badge variant="default" className="mr-auto md:mr-0">
            Featured
          </Badge>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Badge variant="outline" className="bg-background/50">
          <Briefcase className="w-3 h-3 mr-1" />
          {job.type}
        </Badge>
        <Badge variant="outline" className="bg-background/50">
          <MapPin className="w-3 h-3 mr-1" />
          {job.locationType}
        </Badge>
        <Badge variant="outline" className="bg-background/50">
          <Clock className="w-3 h-3 mr-1" />
          {formatDistanceToNow(postedDate, { addSuffix: true })}
        </Badge>
      </div>

      <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="text-foreground/90 font-medium">
          {job.salary}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to={`/jobs/${job.id}`}>View Details</Link>
          </Button>
          <Button size="sm">
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
