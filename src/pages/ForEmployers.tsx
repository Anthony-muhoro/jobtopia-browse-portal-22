
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import { CheckCircle, Users, TrendingUp, Globe, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

const ForEmployers = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        
        <main className="flex-1 pt-24">
          <section className="bg-gradient-to-b from-primary/10 to-transparent py-20">
            <div className="page-container">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <motion.h1 
                    className="text-4xl md:text-5xl font-bold tracking-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    Find the Perfect Talent for Your Company
                  </motion.h1>
                  <motion.p 
                    className="text-xl text-muted-foreground"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    Post jobs, review applications, and connect with qualified candidates all in one place.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <Button asChild size="lg" className="font-medium">
                      <Link to="/post-job">Post a Job Now</Link>
                    </Button>
                    <Button variant="outline" size="lg" className="font-medium">
                      <Link to="/pricing">View Pricing Plans</Link>
                    </Button>
                  </motion.div>
                </div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-xl overflow-hidden shadow-xl"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=1200" 
                    alt="Team collaboration" 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </section>

          <section className="py-20">
            <div className="page-container">
              <div className="text-center mb-16 max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-6">Why Recruiters Choose Us</h2>
                <p className="text-lg text-muted-foreground">
                  Our platform offers powerful tools to help you find the right candidates efficiently.
                </p>
              </div>

              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                <motion.div variants={item} className="bg-card rounded-xl p-6 shadow-sm border border-border">
                  <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <Users className="size-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Qualified Candidates</h3>
                  <p className="text-muted-foreground">Access a pool of pre-screened professionals with verified skills and experience.</p>
                </motion.div>

                <motion.div variants={item} className="bg-card rounded-xl p-6 shadow-sm border border-border">
                  <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <TrendingUp className="size-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Advanced Analytics</h3>
                  <p className="text-muted-foreground">Track application metrics and optimize your hiring process with detailed insights.</p>
                </motion.div>

                <motion.div variants={item} className="bg-card rounded-xl p-6 shadow-sm border border-border">
                  <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <Globe className="size-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Global Reach</h3>
                  <p className="text-muted-foreground">Expand your search worldwide and find the best talent regardless of location.</p>
                </motion.div>
              </motion.div>
            </div>
          </section>

          <section className="py-20 bg-muted/30">
            <div className="page-container">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="order-2 md:order-1">
                  <motion.img 
                    src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=1200"
                    alt="Employer dashboard" 
                    className="rounded-xl shadow-lg border border-border"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="order-1 md:order-2 space-y-6">
                  <h2 className="text-3xl font-bold">Streamlined Hiring Process</h2>
                  <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="space-y-6"
                  >
                    <motion.div variants={item} className="flex gap-4">
                      <CheckCircle className="size-6 text-primary shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-medium mb-2">Easy Job Posting</h3>
                        <p className="text-muted-foreground">Create and publish job listings in minutes with our intuitive interface.</p>
                      </div>
                    </motion.div>
                    <motion.div variants={item} className="flex gap-4">
                      <CheckCircle className="size-6 text-primary shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-medium mb-2">Smart Candidate Matching</h3>
                        <p className="text-muted-foreground">Our AI-powered system matches your job requirements with the most suitable candidates.</p>
                      </div>
                    </motion.div>
                    <motion.div variants={item} className="flex gap-4">
                      <CheckCircle className="size-6 text-primary shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-medium mb-2">Efficient Communication</h3>
                        <p className="text-muted-foreground">Message candidates directly and schedule interviews without leaving the platform.</p>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-20">
            <div className="page-container">
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-8 md:p-12 text-center">
                <h2 className="text-3xl font-bold mb-6">Ready to Find Your Next Star Employee?</h2>
                <p className="text-lg mb-8 max-w-2xl mx-auto">
                  Join thousands of companies that have found their perfect match on our platform.
                </p>
                <Button asChild size="lg" className="font-medium">
                  <Link to="/post-job">Post a Job Today</Link>
                </Button>
              </div>
            </div>
          </section>
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

export default ForEmployers;
