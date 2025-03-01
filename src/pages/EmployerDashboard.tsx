
import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import { 
  BarChart3, 
  Briefcase, 
  Building, 
  Users, 
  Settings, 
  ChevronRight, 
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Mail,
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react";

type TabType = "jobs" | "applicants" | "company" | "stats" | "settings";

// Mock data for employer dashboard
const mockJobPostings = [
  {
    id: "job1",
    title: "Senior Frontend Developer",
    datePosted: "2023-06-15",
    applicants: 24,
    status: "Active",
    featured: true,
    views: 352
  },
  {
    id: "job2",
    title: "UX Designer",
    datePosted: "2023-06-10",
    applicants: 16,
    status: "Active",
    featured: false,
    views: 178
  },
  {
    id: "job3",
    title: "Product Manager",
    datePosted: "2023-05-28",
    applicants: 32,
    status: "Closed",
    featured: false,
    views: 421
  },
  {
    id: "job4",
    title: "Backend Developer",
    datePosted: "2023-06-18",
    applicants: 10,
    status: "Active",
    featured: true,
    views: 134
  }
];

const mockApplicants = [
  {
    id: "app1",
    name: "John Doe",
    jobTitle: "Senior Frontend Developer",
    appliedDate: "2023-06-20",
    status: "Reviewing",
    resumeUrl: "#",
    matchScore: 85
  },
  {
    id: "app2",
    name: "Sarah Mitchell",
    jobTitle: "Senior Frontend Developer",
    appliedDate: "2023-06-19",
    status: "Interview",
    resumeUrl: "#",
    matchScore: 92
  },
  {
    id: "app3",
    name: "Michael Johnson",
    jobTitle: "UX Designer",
    appliedDate: "2023-06-18",
    status: "Applied",
    resumeUrl: "#",
    matchScore: 78
  },
  {
    id: "app4",
    name: "Emily Brown",
    jobTitle: "Backend Developer",
    appliedDate: "2023-06-21",
    status: "Rejected",
    resumeUrl: "#",
    matchScore: 65
  },
  {
    id: "app5",
    name: "David Wilson",
    jobTitle: "Senior Frontend Developer",
    appliedDate: "2023-06-17",
    status: "Offer",
    resumeUrl: "#",
    matchScore: 95
  }
];

const mockCompanyData = {
  name: "TechCorp Solutions",
  logo: "/placeholder.svg",
  description: "TechCorp Solutions is a leading technology company specializing in innovative software solutions for businesses of all sizes. With over 10 years of experience in the industry, we deliver cutting-edge products that solve real-world problems.",
  website: "https://techcorp-solutions.example.com",
  location: "San Francisco, CA",
  industry: "Information Technology",
  employees: "50-200",
  founded: "2013",
  socialMedia: {
    linkedin: "https://linkedin.com/company/techcorp-solutions",
    twitter: "https://twitter.com/techcorpsolutions"
  }
};

const mockStatistics = {
  totalApplicants: 82,
  totalJobs: 4,
  activeJobs: 3,
  viewsThisMonth: 1085,
  applicantsThisWeek: 28,
  conversionRate: "3.5%",
  averageTimeToHire: "18 days",
  topPerformingJob: "Senior Frontend Developer"
};

const EmployerDashboard = () => {
  const [activeTab, setActiveTab] = useState<TabType>("jobs");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log("Searching for:", searchQuery);
  };

  const renderDashboardContent = () => {
    switch (activeTab) {
      case "jobs":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Job Postings</h2>
              <Button onClick={() => navigate("/post-job")}>
                <Plus className="mr-2 h-4 w-4" /> Post New Job
              </Button>
            </div>
            
            <div className="grid gap-4">
              {/* Search and filter */}
              <div className="bg-card rounded-lg p-4 border border-border flex items-center gap-4">
                <form onSubmit={handleSearch} className="flex-1 flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search job postings..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button type="submit">Search</Button>
                </form>
                <select className="h-10 px-3 rounded-md border border-input">
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              
              {/* Job listings */}
              <div className="bg-card rounded-lg border border-border overflow-hidden">
                <div className="grid grid-cols-12 gap-4 p-4 font-medium text-sm border-b border-border bg-muted/30">
                  <div className="col-span-4">Job Title</div>
                  <div className="col-span-2">Posted Date</div>
                  <div className="col-span-1">Views</div>
                  <div className="col-span-1">Applicants</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-2 text-right">Actions</div>
                </div>
                
                {mockJobPostings.map((job) => (
                  <div 
                    key={job.id}
                    className="grid grid-cols-12 gap-4 p-4 text-sm border-b border-border last:border-0 items-center hover:bg-muted/20"
                  >
                    <div className="col-span-4 font-medium flex items-center gap-2">
                      {job.title}
                      {job.featured && (
                        <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="col-span-2 text-muted-foreground">{job.datePosted}</div>
                    <div className="col-span-1">{job.views}</div>
                    <div className="col-span-1">{job.applicants}</div>
                    <div className="col-span-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        job.status === "Active" 
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {job.status}
                      </span>
                    </div>
                    <div className="col-span-2 flex justify-end gap-2">
                      <Button size="icon" variant="ghost" asChild>
                        <Link to={`/jobs/${job.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button size="icon" variant="ghost" asChild>
                        <Link to={`/edit-job/${job.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "applicants":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Applicants</h2>
            
            <div className="grid gap-4">
              {/* Search and filter */}
              <div className="bg-card rounded-lg p-4 border border-border flex items-center gap-4">
                <form onSubmit={handleSearch} className="flex-1 flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search applicants..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button type="submit">Search</Button>
                </form>
                <select className="h-10 px-3 rounded-md border border-input">
                  <option value="all">All Status</option>
                  <option value="applied">Applied</option>
                  <option value="reviewing">Reviewing</option>
                  <option value="interview">Interview</option>
                  <option value="offer">Offer</option>
                  <option value="rejected">Rejected</option>
                </select>
                <select className="h-10 px-3 rounded-md border border-input">
                  <option value="all">All Jobs</option>
                  <option value="job1">Senior Frontend Developer</option>
                  <option value="job2">UX Designer</option>
                  <option value="job3">Product Manager</option>
                  <option value="job4">Backend Developer</option>
                </select>
              </div>
              
              {/* Applicants list */}
              <div className="bg-card rounded-lg border border-border overflow-hidden">
                <div className="grid grid-cols-12 gap-4 p-4 font-medium text-sm border-b border-border bg-muted/30">
                  <div className="col-span-3">Applicant</div>
                  <div className="col-span-3">Job</div>
                  <div className="col-span-1">Match</div>
                  <div className="col-span-2">Applied Date</div>
                  <div className="col-span-1">Status</div>
                  <div className="col-span-2 text-right">Actions</div>
                </div>
                
                {mockApplicants.map((applicant) => (
                  <div 
                    key={applicant.id}
                    className="grid grid-cols-12 gap-4 p-4 text-sm border-b border-border last:border-0 items-center hover:bg-muted/20"
                  >
                    <div className="col-span-3 font-medium">{applicant.name}</div>
                    <div className="col-span-3 text-muted-foreground">{applicant.jobTitle}</div>
                    <div className="col-span-1">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${applicant.matchScore}%` }}
                        ></div>
                      </div>
                      <span className="text-xs">{applicant.matchScore}%</span>
                    </div>
                    <div className="col-span-2 text-muted-foreground">{applicant.appliedDate}</div>
                    <div className="col-span-1">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        applicant.status === "Applied" 
                          ? "bg-blue-100 text-blue-800"
                          : applicant.status === "Reviewing"
                          ? "bg-purple-100 text-purple-800"
                          : applicant.status === "Interview"
                          ? "bg-yellow-100 text-yellow-800"
                          : applicant.status === "Offer"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                        {applicant.status}
                      </span>
                    </div>
                    <div className="col-span-2 flex justify-end gap-2">
                      <Button size="icon" variant="ghost">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      case "company":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Company Profile</h2>
              <Button>
                <Edit className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="shrink-0">
                  <img 
                    src={mockCompanyData.logo} 
                    alt={mockCompanyData.name} 
                    className="w-32 h-32 object-contain border border-border rounded-lg"
                  />
                </div>
                
                <div className="space-y-4 flex-1">
                  <h3 className="text-2xl font-semibold">{mockCompanyData.name}</h3>
                  
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span>{mockCompanyData.industry}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{mockCompanyData.employees} employees</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Founded in {mockCompanyData.founded}</span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground">{mockCompanyData.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-4 pt-4">
                    <div>
                      <h4 className="font-medium mb-2">Contact Information</h4>
                      <div className="space-y-2 text-sm">
                        <p>Website: <a href={mockCompanyData.website} className="text-primary hover:underline">{mockCompanyData.website}</a></p>
                        <p>Location: {mockCompanyData.location}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Social Media</h4>
                      <div className="space-y-2 text-sm">
                        <p>LinkedIn: <a href={mockCompanyData.socialMedia.linkedin} className="text-primary hover:underline">Company Profile</a></p>
                        <p>Twitter: <a href={mockCompanyData.socialMedia.twitter} className="text-primary hover:underline">@techcorpsolutions</a></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case "stats":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Analytics & Statistics</h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-card rounded-lg border border-border p-4">
                <h3 className="text-muted-foreground text-sm font-medium mb-1">Total Applicants</h3>
                <p className="text-3xl font-semibold">{mockStatistics.totalApplicants}</p>
                <div className="mt-2 text-xs text-green-600">+12% from last month</div>
              </div>
              
              <div className="bg-card rounded-lg border border-border p-4">
                <h3 className="text-muted-foreground text-sm font-medium mb-1">Active Jobs</h3>
                <p className="text-3xl font-semibold">{mockStatistics.activeJobs}</p>
                <div className="mt-2 text-xs text-muted-foreground">Out of {mockStatistics.totalJobs} total</div>
              </div>
              
              <div className="bg-card rounded-lg border border-border p-4">
                <h3 className="text-muted-foreground text-sm font-medium mb-1">Job Views</h3>
                <p className="text-3xl font-semibold">{mockStatistics.viewsThisMonth}</p>
                <div className="mt-2 text-xs text-green-600">+8% from last month</div>
              </div>
              
              <div className="bg-card rounded-lg border border-border p-4">
                <h3 className="text-muted-foreground text-sm font-medium mb-1">Conversion Rate</h3>
                <p className="text-3xl font-semibold">{mockStatistics.conversionRate}</p>
                <div className="mt-2 text-xs text-red-600">-0.5% from last month</div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card rounded-lg border border-border p-4">
                <h3 className="font-medium mb-4">Applicant Status Breakdown</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Applied</span>
                      <span>35%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "35%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Reviewing</span>
                      <span>25%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: "25%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Interview</span>
                      <span>20%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "20%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Offer</span>
                      <span>10%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "10%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Rejected</span>
                      <span>10%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: "10%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-lg border border-border p-4">
                <h3 className="font-medium mb-4">Top Performing Jobs</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Senior Frontend Developer</p>
                      <p className="text-xs text-muted-foreground">24 applicants</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">352 views</p>
                      <p className="text-xs text-muted-foreground">6.8% conversion</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">UX Designer</p>
                      <p className="text-xs text-muted-foreground">16 applicants</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">178 views</p>
                      <p className="text-xs text-muted-foreground">9.0% conversion</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Product Manager</p>
                      <p className="text-xs text-muted-foreground">32 applicants</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">421 views</p>
                      <p className="text-xs text-muted-foreground">7.6% conversion</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Backend Developer</p>
                      <p className="text-xs text-muted-foreground">10 applicants</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">134 views</p>
                      <p className="text-xs text-muted-foreground">7.5% conversion</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-4">
              <h3 className="font-medium mb-4">Additional Metrics</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <p className="text-muted-foreground text-sm">Average Time to Hire</p>
                  <p className="text-xl font-medium">{mockStatistics.averageTimeToHire}</p>
                </div>
                
                <div>
                  <p className="text-muted-foreground text-sm">Applicants This Week</p>
                  <p className="text-xl font-medium">{mockStatistics.applicantsThisWeek}</p>
                </div>
                
                <div>
                  <p className="text-muted-foreground text-sm">Top Performing Job</p>
                  <p className="text-xl font-medium">{mockStatistics.topPerformingJob}</p>
                </div>
              </div>
            </div>
          </div>
        );
        
      case "settings":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Account Settings</h2>
            
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-medium mb-4">Notification Preferences</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">New applicant alerts</p>
                      <p className="text-sm text-muted-foreground">Receive notifications when someone applies to your job</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Job status changes</p>
                      <p className="text-sm text-muted-foreground">Notifications about expired or auto-renewed job postings</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Marketing emails</p>
                      <p className="text-sm text-muted-foreground">Receive tips, product updates and inspiration</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-border p-6">
                <h3 className="text-xl font-medium mb-4">Email Preferences</h3>
                
                <div className="space-y-4 max-w-xl">
                  <div className="space-y-2">
                    <Label htmlFor="recruit-email">Recruiting Email</Label>
                    <Input
                      id="recruit-email"
                      type="email"
                      defaultValue="recruiting@techcorp-solutions.example.com"
                    />
                    <p className="text-sm text-muted-foreground">All applicant communications will be sent to this email</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Admin Email</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      defaultValue="admin@techcorp-solutions.example.com"
                    />
                    <p className="text-sm text-muted-foreground">Account notifications and billing information</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-border p-6">
                <h3 className="text-xl font-medium mb-4">Subscription Plan</h3>
                
                <div className="bg-muted/30 p-4 rounded-lg border border-border">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Premium Employer Plan</p>
                      <p className="text-sm text-muted-foreground">$199/month, billed monthly</p>
                    </div>
                    <Button variant="outline">Manage Plan</Button>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="font-medium mb-2">Your plan includes:</p>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Unlimited job postings</li>
                      <li>• Featured job listings</li>
                      <li>• Advanced analytics</li>
                      <li>• Candidate management tools</li>
                      <li>• Email integration</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-border p-6">
                <h3 className="text-xl font-medium mb-4">Security Settings</h3>
                
                <div className="space-y-4 max-w-xl">
                  <Button variant="outline">Change Password</Button>
                  <Button variant="outline">Two-Factor Authentication</Button>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 pt-24">
          <div className="page-container">
            <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
              {/* Sidebar */}
              <div className="w-full md:w-64 shrink-0">
                <div className="bg-card rounded-lg border border-border sticky top-24">
                  <div className="p-6 border-b border-border">
                    <h2 className="font-medium mb-2">TechCorp Solutions</h2>
                    <p className="text-sm text-muted-foreground">Employer Dashboard</p>
                  </div>
                  
                  <nav className="p-2">
                    <button
                      className={`w-full text-left px-4 py-2 rounded-md text-sm mb-1 flex items-center ${
                        activeTab === "jobs" 
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-muted/80"
                      }`}
                      onClick={() => handleTabChange("jobs")}
                    >
                      <Briefcase className="mr-2 h-4 w-4" />
                      Job Postings
                    </button>
                    
                    <button
                      className={`w-full text-left px-4 py-2 rounded-md text-sm mb-1 flex items-center ${
                        activeTab === "applicants" 
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-muted/80"
                      }`}
                      onClick={() => handleTabChange("applicants")}
                    >
                      <Users className="mr-2 h-4 w-4" />
                      Applicants
                    </button>
                    
                    <button
                      className={`w-full text-left px-4 py-2 rounded-md text-sm mb-1 flex items-center ${
                        activeTab === "company" 
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-muted/80"
                      }`}
                      onClick={() => handleTabChange("company")}
                    >
                      <Building className="mr-2 h-4 w-4" />
                      Company Profile
                    </button>
                    
                    <button
                      className={`w-full text-left px-4 py-2 rounded-md text-sm mb-1 flex items-center ${
                        activeTab === "stats" 
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-muted/80"
                      }`}
                      onClick={() => handleTabChange("stats")}
                    >
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Analytics
                    </button>
                    
                    <button
                      className={`w-full text-left px-4 py-2 rounded-md text-sm mb-1 flex items-center ${
                        activeTab === "settings" 
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-muted/80"
                      }`}
                      onClick={() => handleTabChange("settings")}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </button>
                  </nav>
                  
                  <div className="p-6 border-t border-border">
                    <Button className="w-full" onClick={() => navigate("/post-job")}>
                      <Plus className="mr-2 h-4 w-4" /> Post New Job
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Main content */}
              <div className="flex-1">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderDashboardContent()}
                </motion.div>
              </div>
            </div>
          </div>
        </main>
        
        <footer className="bg-muted/20 border-t border-border mt-20">
          <div className="page-container py-8 text-center text-sm text-muted-foreground">
            <p>© 2023 Jobtopia. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
};

export default EmployerDashboard;
