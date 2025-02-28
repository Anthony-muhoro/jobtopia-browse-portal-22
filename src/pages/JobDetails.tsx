
import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import { getJobById, getJobsByCompany } from "@/lib/data";
import { Job } from "@/lib/types";
import { 
  MapPin, 
  Building, 
  Clock, 
  Briefcase, 
  DollarSign,
  CheckCircle2,
  ArrowLeft,
  ExternalLink,
  Share2,
  ArrowRight 
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const job = getJobById(id || "");
  const similarJobs = job 
    ? getJobsByCompany(job.company.id).filter(j => j.id !== job.id).slice(0, 3) 
    : [];
  
  useEffect(() => {
    if (!job) {
      navigate("/jobs", { replace: true });
    }
    
    window.scrollTo(0, 0);
  }, [job, navigate]);
  
  if (!job) return null;
  
  const postedDate = new Date(job.postedAt);
  
  const handleApply = () => {
    toast.success("Application submitted successfully!", {
      description: "Thank you for applying to this position. The hiring team will review your application shortly.",
    });
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${job.title} at ${job.company.name}`,
        text: `Check out this job: ${job.title} at ${job.company.name}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Job URL copied to clipboard!");
    }
  };
  
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 pt-24 pb-12">
          <div className="page-container">
            <div className="flex flex-col gap-6">
              <Link 
                to="/jobs" 
                className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to all jobs
              </Link>
              
              <div className="grid md:grid-cols-[1fr_300px] gap-6">
                <div className="space-y-8">
                  <div className="job-card">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="w-16 h-16 rounded-md border border-border flex items-center justify-center bg-background shrink-0">
                        <img 
                          src={job.company.logo} 
                          alt={job.company.name} 
                          className="w-10 h-10 object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <h1 className="text-2xl md:text-3xl font-medium">{job.title}</h1>
                        <div className="flex items-center text-muted-foreground mt-2">
                          <Link 
                            to={`/companies/${job.company.id}`}
                            className="flex items-center hover:text-primary transition-colors"
                          >
                            <Building className="w-4 h-4 mr-1" />
                            <span>{job.company.name}</span>
                          </Link>
                          <span className="px-2">•</span>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{job.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex flex-wrap gap-2">
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
                      <Badge variant="outline" className="bg-background/50">
                        <DollarSign className="w-3 h-3 mr-1" />
                        {job.salary}
                      </Badge>
                    </div>
                    
                    <div className="mt-6 flex items-center gap-2">
                      <Button onClick={handleApply}>Apply Now</Button>
                      <Button variant="outline" onClick={handleShare} title="Share job">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <section className="job-card">
                    <h2 className="text-xl font-medium mb-4">Job Description</h2>
                    <p className="text-foreground/80 whitespace-pre-line">
                      {job.description}
                    </p>
                  </section>
                  
                  <section className="job-card">
                    <h2 className="text-xl font-medium mb-4">Requirements</h2>
                    <ul className="space-y-3">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5 mr-2" />
                          <span className="text-foreground/80">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                  
                  <section className="job-card">
                    <h2 className="text-xl font-medium mb-4">Responsibilities</h2>
                    <ul className="space-y-3">
                      {job.responsibilities.map((resp, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5 mr-2" />
                          <span className="text-foreground/80">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                  
                  <section className="job-card">
                    <h2 className="text-xl font-medium mb-4">Benefits</h2>
                    <ul className="space-y-3">
                      {job.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5 mr-2" />
                          <span className="text-foreground/80">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>
                
                <div className="space-y-6">
                  <div className="job-card sticky top-24">
                    <h2 className="text-lg font-medium mb-4">About {job.company.name}</h2>
                    <div className="space-y-4">
                      <div className="flex justify-center">
                        <div className="w-20 h-20 rounded-md border border-border flex items-center justify-center bg-background">
                          <img 
                            src={job.company.logo} 
                            alt={job.company.name} 
                            className="w-14 h-14 object-contain"
                          />
                        </div>
                      </div>
                      <p className="text-sm text-foreground/80">{job.company.description}</p>
                      <div className="text-sm">
                        <div className="flex items-start py-1">
                          <MapPin className="w-4 h-4 mr-2 mt-0.5 text-muted-foreground" />
                          <span>{job.company.location}</span>
                        </div>
                        <div className="flex items-start py-1">
                          <Briefcase className="w-4 h-4 mr-2 mt-0.5 text-muted-foreground" />
                          <span>{job.company.industry}</span>
                        </div>
                      </div>
                      <div className="pt-2">
                        <Button variant="outline" size="sm" className="w-full" asChild>
                          <Link to={`/companies/${job.company.id}`} className="flex items-center justify-center">
                            <span>View Company Profile</span>
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {similarJobs.length > 0 && (
                    <div className="job-card">
                      <h2 className="text-lg font-medium mb-4">More Jobs at {job.company.name}</h2>
                      <div className="space-y-4">
                        {similarJobs.map((similarJob) => (
                          <SimilarJobCard key={similarJob.id} job={similarJob} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <footer className="bg-muted/20 border-t border-border">
          <div className="page-container py-8 text-center text-sm text-muted-foreground">
            <p>© 2023 Jobtopia. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
};

interface SimilarJobCardProps {
  job: Job;
}

const SimilarJobCard = ({ job }: SimilarJobCardProps) => {
  return (
    <Link 
      to={`/jobs/${job.id}`}
      className="block p-4 rounded-md border border-border hover:border-primary/30 hover:bg-muted/20 transition-all"
    >
      <h3 className="font-medium text-base line-clamp-1">{job.title}</h3>
      <div className="flex flex-wrap gap-2 mt-2">
        <Badge variant="outline" className="bg-background/50 text-xs">
          <Briefcase className="w-3 h-3 mr-1" />
          {job.type}
        </Badge>
        <Badge variant="outline" className="bg-background/50 text-xs">
          <MapPin className="w-3 h-3 mr-1" />
          {job.locationType}
        </Badge>
      </div>
    </Link>
  );
};

export default JobDetails;
