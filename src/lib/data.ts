import { Company, Job } from './types';

export const companies: Company[] = [
  {
    id: 'c1',
    name: 'Designify',
    logo: '/placeholder.svg',
    description: 'Designify is a leading design platform helping businesses create stunning visual content at scale. Our AI-powered tools enable anyone to create professional-grade designs in minutes.',
    website: 'https://designify.example',
    location: 'San Francisco, CA',
    industry: 'Design Technology',
    employees: '100-250',
    founded: '2018',
    socialMedia: {
      linkedin: 'https://linkedin.com/company/designify',
      twitter: 'https://twitter.com/designify',
    },
  },
  {
    id: 'c2',
    name: 'Codewave',
    logo: '/placeholder.svg',
    description: 'Codewave is revolutionizing how development teams build and ship software. Our platform streamlines the engineering process from ideation to deployment.',
    website: 'https://codewave.example',
    location: 'New York, NY',
    industry: 'Developer Tools',
    employees: '50-100',
    founded: '2020',
    socialMedia: {
      linkedin: 'https://linkedin.com/company/codewave',
      twitter: 'https://twitter.com/codewave',
    },
  },
  {
    id: 'c3',
    name: 'Data Insights',
    logo: '/placeholder.svg',
    description: 'Data Insights helps organizations unlock the power of their data. Our analytics platform provides real-time insights and visualization tools for better decision-making.',
    website: 'https://datainsights.example',
    location: 'Chicago, IL',
    industry: 'Data Analytics',
    employees: '250-500',
    founded: '2016',
    socialMedia: {
      linkedin: 'https://linkedin.com/company/datainsights',
      twitter: 'https://twitter.com/datainsights',
    },
  },
  {
    id: 'c4',
    name: 'Techflow',
    logo: '/placeholder.svg',
    description: 'Techflow provides innovative cloud infrastructure solutions for enterprises. Our platform allows businesses to scale their operations seamlessly.',
    website: 'https://techflow.example',
    location: 'Seattle, WA',
    industry: 'Cloud Infrastructure',
    employees: '500-1000',
    founded: '2015',
    socialMedia: {
      linkedin: 'https://linkedin.com/company/techflow',
      twitter: 'https://twitter.com/techflow',
    },
  },
  {
    id: 'c5',
    name: 'Growth Pro',
    logo: '/placeholder.svg',
    description: 'Growth Pro is a marketing technology company that helps businesses acquire and retain customers. Our suite of tools includes email marketing, SEO, and social media management.',
    website: 'https://growthpro.example',
    location: 'Austin, TX',
    industry: 'Marketing Technology',
    employees: '100-250',
    founded: '2017',
    socialMedia: {
      linkedin: 'https://linkedin.com/company/growthpro',
      twitter: 'https://twitter.com/growthpro',
    },
  },
];

export const jobs: Job[] = [
  {
    id: 'j1',
    title: 'Senior Product Designer',
    company: companies[0],
    location: 'San Francisco, CA',
    locationType: 'Hybrid',
    type: 'Full-time',
    salary: '$120K - $150K',
    description: 'We\'re looking for a Senior Product Designer to join our growing design team. You\'ll work on our flagship product, collaborating with product managers, engineers, and other designers to create intuitive and beautiful user experiences.',
    requirements: [
      'At least 5 years of experience in product design',
      'Strong portfolio demonstrating your design process',
      'Proficiency with design tools like Figma, Sketch, and Adobe Creative Suite',
      'Experience with user research and testing',
      'Strong communication and collaboration skills',
    ],
    responsibilities: [
      'Lead the design of new features from concept to implementation',
      'Create wireframes, prototypes, and high-fidelity mockups',
      'Conduct user research and usability testing',
      'Collaborate with product managers to define requirements',
      'Work with engineers to ensure design quality in implementation',
    ],
    benefits: [
      'Competitive salary and equity',
      'Comprehensive health, dental, and vision insurance',
      'Unlimited PTO',
      'Remote work flexibility',
      '401(k) matching',
      'Professional development budget',
    ],
    postedAt: '2023-07-10',
    featured: true,
  },
  {
    id: 'j2',
    title: 'Senior Backend Engineer',
    company: companies[1],
    location: 'New York, NY',
    locationType: 'Remote',
    type: 'Full-time',
    salary: '$140K - $180K',
    description: 'We\'re seeking an experienced Backend Engineer to join our engineering team. You\'ll be responsible for designing, building, and maintaining the core infrastructure of our platform.',
    requirements: [
      'At least 5 years of experience in backend development',
      'Proficiency in Node.js, Python, or Go',
      'Experience with database design and optimization',
      'Familiarity with cloud platforms (AWS, GCP, or Azure)',
      'Strong problem-solving and debugging skills',
    ],
    responsibilities: [
      'Design and implement scalable backend services',
      'Optimize database queries and schemas',
      'Implement robust error handling and logging',
      'Write comprehensive unit and integration tests',
      'Participate in code reviews and technical discussions',
    ],
    benefits: [
      'Competitive salary and equity',
      'Health, dental, and vision insurance',
      'Flexible working hours',
      'Remote work policy',
      '401(k) with company match',
      'Home office stipend',
    ],
    postedAt: '2023-07-15',
    featured: true,
  },
  {
    id: 'j3',
    title: 'Data Scientist',
    company: companies[2],
    location: 'Chicago, IL',
    locationType: 'On-site',
    type: 'Full-time',
    salary: '$110K - $140K',
    description: 'Join our data science team to build machine learning models and analytics solutions. You\'ll work on challenging problems that help our customers extract insights from their data.',
    requirements: [
      'Advanced degree in a quantitative field (Computer Science, Statistics, Mathematics)',
      'Experience with statistical analysis and data mining',
      'Proficiency in Python and SQL',
      'Familiarity with machine learning frameworks (scikit-learn, TensorFlow, PyTorch)',
      'Strong analytical and problem-solving skills',
    ],
    responsibilities: [
      'Develop and implement machine learning models',
      'Analyze large datasets to identify patterns and insights',
      'Create data visualizations to communicate findings',
      'Collaborate with product and engineering teams',
      'Stay current with advancements in machine learning and data science',
    ],
    benefits: [
      'Competitive compensation package',
      'Health and wellness benefits',
      'Flexible working hours',
      'Continuous learning opportunities',
      '401(k) with matching',
      'Regular team events',
    ],
    postedAt: '2023-06-28',
  },
  {
    id: 'j4',
    title: 'DevOps Engineer',
    company: companies[3],
    location: 'Seattle, WA',
    locationType: 'Hybrid',
    type: 'Full-time',
    salary: '$120K - $150K',
    description: 'We\'re looking for a DevOps Engineer to help us build and maintain our cloud infrastructure. You\'ll work on automating our deployment processes and ensuring the reliability of our systems.',
    requirements: [
      'At least 3 years of experience in DevOps or Site Reliability Engineering',
      'Experience with cloud platforms (AWS, GCP, or Azure)',
      'Proficiency with infrastructure as code (Terraform, Cloudformation)',
      'Knowledge of containerization (Docker, Kubernetes)',
      'Experience with CI/CD tools (Jenkins, GitHub Actions, CircleCI)',
    ],
    responsibilities: [
      'Design and implement cloud infrastructure',
      'Automate deployment and monitoring processes',
      'Implement security best practices',
      'Troubleshoot and resolve infrastructure issues',
      'Collaborate with development teams to improve deployment processes',
    ],
    benefits: [
      'Competitive salary',
      'Comprehensive benefits package',
      'Flexible work arrangements',
      'Professional development opportunities',
      'Employee stock options',
      'Casual work environment',
    ],
    postedAt: '2023-07-05',
  },
  {
    id: 'j5',
    title: 'Growth Marketing Manager',
    company: companies[4],
    location: 'Austin, TX',
    locationType: 'Remote',
    type: 'Full-time',
    salary: '$90K - $120K',
    description: 'Join our marketing team to develop and execute growth strategies. You\'ll be responsible for user acquisition and retention across multiple channels.',
    requirements: [
      'At least 4 years of experience in growth marketing or digital marketing',
      'Experience with user acquisition channels (SEO, SEM, social)',
      'Strong analytical skills and data-driven approach',
      'Experience with marketing automation tools',
      'Excellent communication and project management skills',
    ],
    responsibilities: [
      'Develop and execute growth marketing strategies',
      'Manage user acquisition campaigns across multiple channels',
      'Analyze campaign performance and optimize for ROI',
      'Collaborate with product and design teams on user retention',
      'Stay current with marketing trends and best practices',
    ],
    benefits: [
      'Competitive compensation package',
      'Health insurance benefits',
      'Unlimited PTO policy',
      'Remote-first culture',
      '401(k) plan',
      'Professional development budget',
    ],
    postedAt: '2023-07-18',
  },
  {
    id: 'j6',
    title: 'Frontend Developer',
    company: companies[1],
    location: 'New York, NY',
    locationType: 'Hybrid',
    type: 'Full-time',
    salary: '$100K - $130K',
    description: 'We\'re looking for a talented Frontend Developer to create stunning user interfaces for our web applications. You\'ll work closely with designers and backend developers to implement responsive and accessible UI components.',
    requirements: [
      'At least 3 years of experience in frontend development',
      'Strong knowledge of JavaScript, HTML, and CSS',
      'Experience with React, Vue, or Angular',
      'Understanding of responsive design principles',
      'Familiarity with modern frontend build tools',
    ],
    responsibilities: [
      'Implement UI components based on design specifications',
      'Ensure cross-browser compatibility and responsive design',
      'Optimize applications for maximum speed and scalability',
      'Collaborate with designers and backend developers',
      'Write clean, maintainable code with appropriate documentation',
    ],
    benefits: [
      'Competitive salary',
      'Health, dental, and vision insurance',
      'Flexible working hours',
      'Remote work options',
      '401(k) with company match',
      'Continuing education stipend',
    ],
    postedAt: '2023-07-12',
  },
  {
    id: 'j7',
    title: 'UI/UX Designer',
    company: companies[0],
    location: 'San Francisco, CA',
    locationType: 'On-site',
    type: 'Full-time',
    salary: '$90K - $120K',
    description: 'Join our design team to create intuitive and beautiful user experiences. You\'ll be responsible for designing user interfaces that are both functional and aesthetically pleasing.',
    requirements: [
      'At least 2 years of experience in UI/UX design',
      'Strong portfolio showcasing your design skills',
      'Proficiency with design tools like Figma, Sketch, or Adobe XD',
      'Understanding of user-centered design principles',
      'Basic knowledge of HTML, CSS, and JavaScript',
    ],
    responsibilities: [
      'Create wireframes, prototypes, and high-fidelity mockups',
      'Conduct user research and usability testing',
      'Design intuitive and accessible user interfaces',
      'Collaborate with product managers and developers',
      'Stay current with design trends and best practices',
    ],
    benefits: [
      'Competitive salary and equity',
      'Comprehensive health benefits',
      'Flexible work schedule',
      'Professional development opportunities',
      'Modern office with amenities',
      'Regular team events and activities',
    ],
    postedAt: '2023-07-08',
  },
  {
    id: 'j8',
    title: 'Product Manager',
    company: companies[2],
    location: 'Chicago, IL',
    locationType: 'Hybrid',
    type: 'Full-time',
    salary: '$110K - $140K',
    description: 'We\'re seeking an experienced Product Manager to lead the development of our data analytics platform. You\'ll be responsible for defining product requirements and working with cross-functional teams to deliver features that meet customer needs.',
    requirements: [
      'At least 3 years of experience in product management',
      'Strong understanding of data analytics and visualization',
      'Experience working with agile development teams',
      'Excellent communication and presentation skills',
      'Analytical mindset and data-driven approach',
    ],
    responsibilities: [
      'Define product requirements and roadmap',
      'Work with design and engineering teams to deliver features',
      'Conduct market research and competitive analysis',
      'Gather and prioritize customer feedback',
      'Monitor product metrics and KPIs',
    ],
    benefits: [
      'Competitive compensation package',
      'Health, dental, and vision insurance',
      'Flexible work arrangements',
      '401(k) with company match',
      'Professional development budget',
      'Regular team outings',
    ],
    postedAt: '2023-07-15',
  },
];

export const getJobById = (id: string): Job | undefined => {
  return jobs.find(job => job.id === id);
};

export const getCompanyById = (id: string): Company | undefined => {
  return companies.find(company => company.id === id);
};

export const getJobsByCompany = (companyId: string): Job[] => {
  return jobs.filter(job => job.company.id === companyId);
};

export const getFeaturedJobs = (): Job[] => {
  return jobs.filter(job => job.featured);
};

export const getLatestJobs = (limit: number = 5): Job[] => {
  return [...jobs]
    .sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime())
    .slice(0, limit);
};

export const filterJobs = (filters: {
  query?: string;
  location?: string;
  types?: string[];
  locationTypes?: string[];
}): Job[] => {
  return jobs.filter(job => {
    if (filters.query && !job.title.toLowerCase().includes(filters.query.toLowerCase()) &&
        !job.company.name.toLowerCase().includes(filters.query.toLowerCase())) {
      return false;
    }
    
    if (filters.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    
    if (filters.types && filters.types.length > 0 && !filters.types.includes(job.type)) {
      return false;
    }
    
    if (filters.locationTypes && filters.locationTypes.length > 0 && !filters.locationTypes.includes(job.locationType)) {
      return false;
    }
    
    return true;
  });
};

export const getAllJobs = (): Job[] => {
  return jobs;
};

export const getAllCompanies = (): Company[] => {
  return companies;
};
