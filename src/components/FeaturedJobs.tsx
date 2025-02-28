
import { getFeaturedJobs } from "@/lib/data";
import JobCard from "./JobCard";
import { motion } from "framer-motion";

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

const FeaturedJobs = () => {
  const featuredJobs = getFeaturedJobs();
  
  return (
    <section className="w-full">
      <h2 className="text-2xl font-medium mb-6">Featured Job Opportunities</h2>
      <motion.div 
        className="grid gap-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {featuredJobs.map((job, index) => (
          <motion.div key={job.id} variants={item} custom={index}>
            <JobCard job={job} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturedJobs;
