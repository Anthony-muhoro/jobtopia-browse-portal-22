
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

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  title?: string;
  location?: string;
  bio?: string;
  skills?: string[];
  experience?: {
    title: string;
    company: string;
    startDate: string;
    endDate?: string;
    description: string;
  }[];
  education?: {
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate?: string;
  }[];
  resume?: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  userId: string;
  status: 'Applied' | 'Reviewing' | 'Interview' | 'Offer' | 'Rejected';
  appliedAt: string;
  notes?: string;
}
