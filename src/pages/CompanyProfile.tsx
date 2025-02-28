
import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import JobCard from "@/components/JobCard";
import { getCompanyById, getJobsByCompany } from "@/lib/data";
import { 
  MapPin, 
  Building, 
  Users, 
  Calendar, 
  Globe, 
  ArrowLeft,
  Linkedin,
  Twitter,
  Facebook,
  ExternalLink
} from "lucide-react";

const CompanyProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const company = getCompanyById(id || "");
  const companyJobs = company ? getJobsByCompany(company.id) : [];
  
  useEffect(() => {
    if (!company) {
      navigate("/", { replace: true });
    }
    
    window.scrollTo(0, 0);
  }, [company, navigate]);
  
  if (!company) return null;
  
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 pt-24 pb-12">
          <div className="page-container">
            <div className="flex flex-col gap-6">
              <Link 
                to="/companies" 
                className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to all companies
              </Link>
              
              <div className="grid md:grid-cols-[1fr_300px] gap-6">
                <div className="space-y-8">
                  <div className="job-card">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                      <div className="w-24 h-24 rounded-md border border-border flex items-center justify-center bg-background shrink-0">
                        <img 
                          src={company.logo} 
                          alt={company.name} 
                          className="w-16 h-16 object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <h1 className="text-2xl md:text-3xl font-medium">{company.name}</h1>
                        <div className="flex items-center text-muted-foreground mt-2">
                          <div className="flex items-center">
                            <Building className="w-4 h-4 mr-1" />
                            <span>{company.industry}</span>
                          </div>
                          <span className="px-2">•</span>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{company.location}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          {company.socialMedia?.linkedin && (
                            <Button variant="outline" size="icon" asChild>
                              <a href={company.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                                <Linkedin className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                          {company.socialMedia?.twitter && (
                            <Button variant="outline" size="icon" asChild>
                              <a href={company.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                                <Twitter className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                          {company.socialMedia?.facebook && (
                            <Button variant="outline" size="icon" asChild>
                              <a href={company.socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                                <Facebook className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                          <Button variant="outline" asChild>
                            <a href={company.website} target="_blank" rel="noopener noreferrer" className="flex items-center">
                              <Globe className="mr-2 h-4 w-4" />
                              Visit Website
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <section className="job-card">
                    <h2 className="text-xl font-medium mb-4">About {company.name}</h2>
                    <p className="text-foreground/80 whitespace-pre-line">
                      {company.description}
                    </p>
                  </section>
                  
                  <section>
                    <h2 className="text-xl font-medium mb-6">Open Positions ({companyJobs.length})</h2>
                    {companyJobs.length > 0 ? (
                      <div className="grid gap-4">
                        {companyJobs.map(job => (
                          <JobCard key={job.id} job={job} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center p-12 border border-border rounded-lg bg-muted/10">
                        <p className="text-muted-foreground">No open positions at this time.</p>
                      </div>
                    )}
                  </section>
                </div>
                
                <div className="space-y-6">
                  <div className="job-card sticky top-24">
                    <h2 className="text-lg font-medium mb-4">Company Details</h2>
                    <div className="space-y-4">
                      <div className="border-b border-border pb-3">
                        <div className="flex items-start py-1">
                          <Users className="w-4 h-4 mr-2 mt-0.5 text-muted-foreground" />
                          <div>
                            <div className="font-medium text-sm">Company Size</div>
                            <div className="text-foreground/80">{company.employees}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-b border-border pb-3">
                        <div className="flex items-start py-1">
                          <Calendar className="w-4 h-4 mr-2 mt-0.5 text-muted-foreground" />
                          <div>
                            <div className="font-medium text-sm">Founded</div>
                            <div className="text-foreground/80">{company.founded}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-b border-border pb-3">
                        <div className="flex items-start py-1">
                          <Building className="w-4 h-4 mr-2 mt-0.5 text-muted-foreground" />
                          <div>
                            <div className="font-medium text-sm">Industry</div>
                            <div className="text-foreground/80">{company.industry}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-start py-1">
                          <MapPin className="w-4 h-4 mr-2 mt-0.5 text-muted-foreground" />
                          <div>
                            <div className="font-medium text-sm">Location</div>
                            <div className="text-foreground/80">{company.location}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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

export default CompanyProfile;
