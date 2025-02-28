
export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Freelance' | 'Internship';

export type JobLocation = 'Remote' | 'Hybrid' | 'On-site';

export interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  website: string;
  location: string;
  industry: string;
  employees: string;
  founded: string;
  socialMedia?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
}

export interface Job {
  id: string;
  title: string;
  company: Company;
  location: string;
  locationType: JobLocation;
  type: JobType;
  salary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  postedAt: string;
  featured?: boolean;
}

export interface SearchFilters {
  query: string;
  location: string;
  jobType: JobType[];
  locationType: JobLocation[];
}
