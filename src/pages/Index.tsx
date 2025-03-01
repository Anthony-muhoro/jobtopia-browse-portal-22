
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import SearchFilters from "@/components/SearchFilters";
import JobCard from "@/components/JobCard";
import FeaturedJobs from "@/components/FeaturedJobs";
import PageTransition from "@/components/PageTransition";
import { getLatestJobs, filterJobs } from "@/lib/data";
import { SearchFilters as SearchFiltersType } from "@/lib/types";
import { ArrowRight, Briefcase, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Index = () => {
  const [filteredJobs, setFilteredJobs] = useState(getLatestJobs(4));

  const handleSearch = (filters: SearchFiltersType) => {
    const results = filterJobs({
      query: filters.query,
      location: filters.location,
      types: filters.jobType,
      locationTypes: filters.locationType,
    });
    setFilteredJobs(results);
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <section className="mt-20 pt-20 pb-16 bg-gradient-to-b from-background to-muted/20">
          <div className="page-container text-center space-y-6">
            <div className="space-y-4 max-w-3xl mx-auto animate-fade-in">
              <h1 className="font-bold text-balance">
                Discover Your Next Career Opportunity
              </h1>
              <p className="text-xl text-muted-foreground text-balance">
                Find the perfect job that matches your skills and aspirations from thousands of curated listings.
              </p>
            </div>
            
            <div className="mx-auto max-w-4xl pt-4 animate-slide-up">
              <SearchFilters onSearch={handleSearch} />
            </div>
          </div>
        </section>
        
        <main className="flex-1 py-12">
          <div className="page-container">
            <div className="grid grid-cols-1 gap-12">
              <FeaturedJobs />
              
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-medium">Latest Job Opportunities</h2>
                  <Button variant="ghost" asChild>
                    <Link to="/jobs" className="flex items-center">
                      View all jobs
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                <div className="grid gap-4">
                  {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-xl text-muted-foreground">No jobs match your search criteria</p>
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => setFilteredJobs(getLatestJobs(4))}
                      >
                        Reset Filters
                      </Button>
                    </div>
                  )}
                </div>
              </section>
              
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <motion.div 
                  className="glass-card rounded-xl p-8 text-center hover:shadow-md transition-all"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="mx-auto size-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Briefcase className="size-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-medium mb-3">For Employers</h2>
                  <p className="text-muted-foreground mb-6">
                    Ready to hire top talent? Post a job listing and reach thousands of qualified candidates.
                  </p>
                  <Button asChild>
                    <Link to="/for-employers">Post a Job</Link>
                  </Button>
                </motion.div>
                
                <motion.div 
                  className="glass-card rounded-xl p-8 text-center hover:shadow-md transition-all"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="mx-auto size-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                    <UserPlus className="size-8 text-secondary" />
                  </div>
                  <h2 className="text-2xl font-medium mb-3">Job Seekers</h2>
                  <p className="text-muted-foreground mb-6">
                    Track your applications, save favorite jobs, and manage your profile all in one place.
                  </p>
                  <Button asChild variant="secondary">
                    <Link to="/dashboard">Go to Dashboard</Link>
                  </Button>
                </motion.div>
              </section>
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

export default Index;
