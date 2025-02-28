
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import SearchFilters from "@/components/SearchFilters";
import JobCard from "@/components/JobCard";
import PageTransition from "@/components/PageTransition";
import { getAllJobs, filterJobs } from "@/lib/data";
import { SearchFilters as SearchFiltersType } from "@/lib/types";
import { motion } from "framer-motion";

const Jobs = () => {
  const [filteredJobs, setFilteredJobs] = useState(getAllJobs());
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSearch = (filters: SearchFiltersType) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const results = filterJobs({
        query: filters.query,
        location: filters.location,
        types: filters.jobType,
        locationTypes: filters.locationType,
      });
      setFilteredJobs(results);
      setIsLoading(false);
    }, 500);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <div className="bg-gradient-to-b from-background to-muted/20 py-8 mt-16">
          <div className="page-container">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl font-bold text-center mb-6">Find Your Perfect Job</h1>
                <SearchFilters onSearch={handleSearch} />
              </motion.div>
            </div>
          </div>
        </div>
        
        <main className="flex-1 py-12">
          <div className="page-container">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-medium">
                {isLoading 
                  ? "Searching jobs..." 
                  : `Found ${filteredJobs.length} job opportunities`}
              </h2>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className="job-card animate-pulse h-32 bg-muted/50"
                  />
                ))}
              </div>
            ) : (
              <>
                {filteredJobs.length > 0 ? (
                  <motion.div 
                    className="grid gap-4"
                    variants={container}
                    initial="hidden"
                    animate="show"
                  >
                    {filteredJobs.map((job, index) => (
                      <motion.div key={job.id} variants={item} custom={index}>
                        <JobCard job={job} />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <div className="text-center py-12 border border-border rounded-lg bg-muted/10">
                    <p className="text-xl text-muted-foreground">No jobs match your search criteria</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => setFilteredJobs(getAllJobs())}
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}
              </>
            )}
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

export default Jobs;
