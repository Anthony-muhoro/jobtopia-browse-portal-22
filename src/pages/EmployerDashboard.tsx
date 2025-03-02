import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
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
  XCircle,
  BellRing,
  Download,
  Archive,
  Star,
  Filter,
  RefreshCw,
  AlertTriangle,
  CheckSquare,
  Upload
} from "lucide-react";

type TabType = "jobs" | "applicants" | "company" | "stats" | "settings";
type NotificationType = "application" | "message" | "alert" | "system";

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

// New notification data
const mockNotifications = [
  {
    id: "notif1",
    type: "application" as NotificationType,
    title: "New Application",
    message: "Sarah Mitchell applied for Senior Frontend Developer",
    time: "2 minutes ago",
    read: false
  },
  {
    id: "notif2",
    type: "message" as NotificationType,
    title: "New Message",
    message: "John Doe replied to your message",
    time: "1 hour ago",
    read: false
  },
  {
    id: "notif3",
    type: "alert" as NotificationType,
    title: "Job Posting Expiring",
    message: "UX Designer posting expires in 2 days",
    time: "5 hours ago",
    read: true
  },
  {
    id: "notif4",
    type: "system" as NotificationType,
    title: "System Update",
    message: "New features available in your dashboard",
    time: "1 day ago",
    read: true
  }
];

const EmployerDashboard = () => {
  const [activeTab, setActiveTab] = useState<TabType>("jobs");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedApplicants, setSelectedApplicants] = useState<string[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [unreadCount, setUnreadCount] = useState(0);
  const [statusFilter, setStatusFilter] = useState("all");
  const [jobFilter, setJobFilter] = useState("all");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  
  const navigate = useNavigate();

  useEffect(() => {
    // Count unread notifications
    const count = notifications.filter(notif => !notif.read).length;
    setUnreadCount(count);
  }, [notifications]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setSelectedApplicants([]);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log("Searching for:", searchQuery);
    toast.success(`Search results for "${searchQuery}"`);
  };

  const toggleApplicantSelection = (id: string) => {
    if (selectedApplicants.includes(id)) {
      setSelectedApplicants(selectedApplicants.filter(appId => appId !== id));
    } else {
      setSelectedApplicants([...selectedApplicants, id]);
    }
  };

  const selectAllApplicants = () => {
    if (selectedApplicants.length === mockApplicants.length) {
      setSelectedApplicants([]);
    } else {
      setSelectedApplicants(mockApplicants.map(app => app.id));
    }
  };

  const handleBulkAction = (action: string) => {
    if (selectedApplicants.length === 0) {
      toast.error("No applicants selected");
      return;
    }

    // Simulate bulk actions
    toast.success(`${action} ${selectedApplicants.length} applicants`);
    console.log(`${action} applicants:`, selectedApplicants);
    
    // Reset selection after action
    setSelectedApplicants([]);
  };

  const markAllNotificationsAsRead = () => {
    const updatedNotifications = notifications.map(notif => ({
      ...notif,
      read: true
    }));
    setNotifications(updatedNotifications);
    setUnreadCount(0);
    toast.success("All notifications marked as read");
  };

  const markNotificationAsRead = (id: string) => {
    const updatedNotifications = notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    );
    setNotifications(updatedNotifications);
    setUnreadCount(prev => prev - 1);
  };

  const toggleSort = () => {
    setSortDirection(prev => prev === "asc" ? "desc" : "asc");
    toast.info(`Sorted by date ${sortDirection === "asc" ? "newest first" : "oldest first"}`);
  };

  const filteredApplicants = mockApplicants
    .filter(app => {
      // Filter by status
      if (statusFilter !== "all" && app.status.toLowerCase() !== statusFilter.toLowerCase()) {
        return false;
      }
      
      // Filter by job
      if (jobFilter !== "all" && app.jobTitle !== jobFilter) {
        return false;
      }
      
      // Search query
      if (searchQuery) {
        return app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
               app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
      }
      
      return true;
    })
    .sort((a, b) => {
      // Sort by date
      const dateA = new Date(a.appliedDate).getTime();
      const dateB = new Date(b.appliedDate).getTime();
      
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    });

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
                <select 
                  className="h-10 px-3 rounded-md border border-input"
                  onChange={(e) => setStatusFilter(e.target.value)}
                  value={statusFilter}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="closed">Closed</option>
                </select>
                
                <Button variant="outline" onClick={toggleSort} className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Sort {sortDirection === "asc" ? "↑" : "↓"}
                </Button>
              </div>
              
              {/* Enhanced Job Management Tools */}
              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" /> Export Jobs
                  </Button>
                  <Button variant="outline" size="sm">
                    <Archive className="h-4 w-4 mr-2" /> Archive Selected
                  </Button>
                  <Button variant="outline" size="sm">
                    <Star className="h-4 w-4 mr-2" /> Feature Selected
                  </Button>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" /> Advanced Filters
                  </Button>
                </div>
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
                <select 
                  className="h-10 px-3 rounded-md border border-input"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="applied">Applied</option>
                  <option value="reviewing">Reviewing</option>
                  <option value="interview">Interview</option>
                  <option value="offer">Offer</option>
                  <option value="rejected">Rejected</option>
                </select>
                <select 
                  className="h-10 px-3 rounded-md border border-input"
                  value={jobFilter}
                  onChange={(e) => setJobFilter(e.target.value)}
                >
                  <option value="all">All Jobs</option>
                  <option value="Senior Frontend Developer">Senior Frontend Developer</option>
                  <option value="UX Designer">UX Designer</option>
                  <option value="Product Manager">Product Manager</option>
                  <option value="Backend Developer">Backend Developer</option>
                </select>
              </div>
              
              {/* Bulk Actions */}
              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="flex flex-wrap gap-3 items-center">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={selectAllApplicants}
                    className={selectedApplicants.length === mockApplicants.length ? "bg-primary/10" : ""}
                  >
                    <CheckSquare className="h-4 w-4 mr-2" />
                    {selectedApplicants.length === mockApplicants.length ? "Deselect All" : "Select All"}
                  </Button>
                  
                  {selectedApplicants.length > 0 && (
                    <span className="text-sm text-muted-foreground mr-2">
                      {selectedApplicants.length} selected
                    </span>
                  )}
                  
                  <div className="h-6 w-px bg-border mx-1"></div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleBulkAction("Downloaded")}
                    disabled={selectedApplicants.length === 0}
                  >
                    <Download className="h-4 w-4 mr-2" /> Download Resumes
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleBulkAction("Emailed")}
                    disabled={selectedApplicants.length === 0}
                  >
                    <Mail className="h-4 w-4 mr-2" /> Email Selected
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleBulkAction("Advanced")}
                    disabled={selectedApplicants.length === 0}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" /> Move to Interview
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleBulkAction("Rejected")}
                    disabled={selectedApplicants.length === 0}
                  >
                    <XCircle className="h-4 w-4 mr-2" /> Reject Selected
                  </Button>
                </div>
              </div>
              
              {/* Applicants list */}
              <div className="bg-card rounded-lg border border-border overflow-hidden">
                <div className="grid grid-cols-12 gap-4 p-4 font-medium text-sm border-b border-border bg-muted/30">
                  <div className="col-span-1"></div>
                  <div className="col-span-2">Applicant</div>
                  <div className="col-span-3">Job</div>
                  <div className="col-span-1">Match</div>
                  <div className="col-span-2">Applied Date</div>
                  <div className="col-span-1">Status</div>
                  <div className="col-span-2 text-right">Actions</div>
                </div>
                
                {filteredApplicants.map((applicant) => (
                  <div 
                    key={applicant.id}
                    className={`grid grid-cols-12 gap-4 p-4 text-sm border-b border-border last:border-0 items-center hover:bg-muted/20 ${
                      selectedApplicants.includes(applicant.id) ? "bg-primary/5" : ""
                    }`}
                  >
                    <div className="col-span-1">
                      <input 
                        type="checkbox" 
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        checked={selectedApplicants.includes(applicant.id)}
                        onChange={() => toggleApplicantSelection(applicant.id)}
                      />
                    </div>
                    <div className="col-span-2 font-medium">{applicant.name}</div>
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
                
                {filteredApplicants.length === 0 && (
                  <div className="p-8 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
                      <AlertTriangle className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No applicants found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                )}
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
            <h2 className="text-2xl font
