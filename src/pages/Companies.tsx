
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import { getAllCompanies } from "@/lib/data";
import { Company } from "@/lib/types";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CompanyCard = ({ company }: { company: Company }) => {
  return (
    <Link to={`/companies/${company.id}`} className="block group">
      <div className="border border-border bg-card rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/30">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-md border border-border flex items-center justify-center bg-background shrink-0">
            <img
              src={company.logo}
              alt={company.name}
              className="w-10 h-10 object-contain"
            />
          </div>
          <div>
            <h3 className="text-lg font-medium group-hover:text-primary transition-colors">
              {company.name}
            </h3>
            <p className="text-muted-foreground">{company.industry}</p>
            <div className="flex items-center mt-1 text-sm text-muted-foreground">
              <span>{company.location}</span>
              <span className="mx-2">•</span>
              <span>{company.employees}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const Companies = () => {
  const [companies, setCompanies] = useState(getAllCompanies());
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setCompanies(getAllCompanies());
      return;
    }
    
    const filtered = getAllCompanies().filter(
      company => 
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setCompanies(filtered);
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
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl font-bold mb-6">Explore Top Companies</h1>
                <p className="text-muted-foreground mb-6">
                  Discover companies that are hiring and learn more about their culture, benefits, and open positions.
                </p>
                
                <div className="flex gap-2 max-w-xl mx-auto">
                  <Input
                    placeholder="Search by company name, industry, or location"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleSearch}>
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        
        <main className="flex-1 py-12">
          <div className="page-container">
            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-medium">
                {companies.length} Companies
              </h2>
            </div>

            <motion.div 
              className="grid gap-4 md:grid-cols-2"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {companies.length > 0 ? (
                companies.map((company, index) => (
                  <motion.div key={company.id} variants={item} custom={index}>
                    <CompanyCard company={company} />
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12 border border-border rounded-lg bg-muted/10 col-span-2">
                  <p className="text-xl text-muted-foreground">No companies match your search criteria</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery("");
                      setCompanies(getAllCompanies());
                    }}
                  >
                    Reset Search
                  </Button>
                </div>
              )}
            </motion.div>
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

export default Companies;
