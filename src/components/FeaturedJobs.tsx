
import { getFeaturedJobs } from "@/lib/data";
import JobCard from "./JobCard";

const FeaturedJobs = () => {
  const featuredJobs = getFeaturedJobs();
  
  return (
    <section className="w-full">
      <h2 className="text-2xl font-medium mb-6">Featured Job Opportunities</h2>
      <div className="grid gap-4">
        {featuredJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedJobs;
