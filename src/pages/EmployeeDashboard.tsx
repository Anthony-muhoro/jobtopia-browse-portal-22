
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import { 
  Briefcase, 
  Settings, 
  User, 
  Bell, 
  FileText, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  Calendar, 
  MessagesSquare, 
  Plus 
} from "lucide-react";

type TabType = "applications" | "saved" | "profile" | "settings";

// Mock data
const applications = [
  {
    id: "app1",
    jobTitle: "Senior Product Designer",
    company: "Designify",
    location: "San Francisco, CA",
    status: "Interview",
    appliedDate: "Apr 12, 2023",
    upcoming: { type: "Interview", date: "May 5, 2023", time: "10:30 AM" },
    logo: "/placeholder.svg"
  },
  {
    id: "app2",
    jobTitle: "Frontend Developer",
    company: "Codewave",
    location: "Remote",
    status: "Applied",
    appliedDate: "Apr 15, 2023",
    logo: "/placeholder.svg"
  },
  {
    id: "app3",
    jobTitle: "UX Researcher",
    company: "Growth Pro",
    location: "Austin, TX",
    status: "Rejected",
    appliedDate: "Apr 2, 2023",
    logo: "/placeholder.svg"
  },
  {
    id: "app4",
    jobTitle: "Data Scientist",
    company: "Data Insights",
    location: "Chicago, IL",
    status: "Offer",
    appliedDate: "Mar 28, 2023",
    upcoming: { type: "Decision Deadline", date: "May 10, 2023" },
    logo: "/placeholder.svg"
  }
];

const savedJobs = [
  {
    id: "j1",
    title: "Product Manager",
    company: "Techflow",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$120K - $150K",
    savedDate: "Apr 18, 2023",
    logo: "/placeholder.svg"
  },
  {
    id: "j2",
    title: "UI/UX Designer",
    company: "Designify",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$90K - $120K",
    savedDate: "Apr 16, 2023",
    logo: "/placeholder.svg"
  },
  {
    id: "j3",
    title: "Frontend Engineer",
    company: "Growth Pro",
    location: "Remote",
    type: "Contract",
    salary: "$80 - $100/hr",
    savedDate: "Apr 14, 2023",
    logo: "/placeholder.svg"
  }
];

const notifications = [
  {
    id: "n1",
    title: "Interview Scheduled",
    message: "Your interview with Designify has been scheduled for May 5",
    time: "2 hours ago",
    read: false
  },
  {
    id: "n2",
    title: "Application viewed",
    message: "Codewave has viewed your application",
    time: "1 day ago",
    read: true
  },
  {
    id: "n3",
    title: "New message",
    message: "You have a new message from the hiring manager at Data Insights",
    time: "2 days ago",
    read: true
  }
];

const userProfile = {
  name: "Alex Johnson",
  title: "Senior Product Designer",
  location: "San Francisco, CA",
  email: "alex.johnson@example.com",
  phone: "+1 (555) 123-4567",
  bio: "Experienced product designer with 7+ years in creating user-centered digital experiences for startups and large companies alike. Passionate about solving complex problems through design thinking.",
  skills: ["UI Design", "UX Research", "Prototyping", "Design Systems", "Figma", "User Testing"],
  experience: [
    {
      title: "Senior Product Designer",
      company: "DesignCo",
      location: "San Francisco, CA",
      period: "Jan 2020 - Present",
      description: "Leading product design for core products, managing a team of 3 designers, and implementing design systems."
    },
    {
      title: "Product Designer",
      company: "TechStart",
      location: "New York, NY",
      period: "Mar 2018 - Dec 2019",
      description: "Designed interfaces for mobile applications and conducted user research to inform design decisions."
    }
  ],
  education: [
    {
      degree: "Master of Design",
      institution: "Design Institute of Technology",
      period: "2016 - 2018"
    },
    {
      degree: "Bachelor of Arts in Visual Communication",
      institution: "State University",
      period: "2012 - 2016"
    }
  ]
};

const EmployeeDashboard = () => {
  const [activeTab, setActiveTab] = useState<TabType>("applications");
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-muted/10">
        <Navbar />
        
        <main className="flex-1 pt-24">
          <div className="page-container">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Sidebar */}
              <div className="w-full md:w-64 shrink-0">
                <div className="bg-card rounded-lg border border-border shadow-sm p-6 space-y-6 sticky top-28">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative">
                      <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-semibold">
                        {userProfile.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <button className="absolute bottom-0 right-0 bg-primary text-white size-6 rounded-full flex items-center justify-center">
                        <Plus className="size-4" />
                      </button>
                    </div>
                    <h3 className="font-medium mt-4">{userProfile.name}</h3>
                    <p className="text-sm text-muted-foreground">{userProfile.title}</p>
                    
                    <div className="relative w-full mt-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full justify-start gap-2"
                        onClick={() => setShowNotifications(!showNotifications)}
                      >
                        <Bell className="size-4" />
                        <span>Notifications</span>
                        {notifications.some(n => !n.read) && (
                          <span className="size-2 bg-primary rounded-full absolute right-3"></span>
                        )}
                      </Button>
                      
                      {showNotifications && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-lg border border-border shadow-md z-20">
                          <div className="p-4">
                            <h4 className="font-medium text-sm mb-3">Notifications</h4>
                            <div className="space-y-3">
                              {notifications.map(notification => (
                                <div 
                                  key={notification.id} 
                                  className={`p-2 text-left text-sm rounded-md ${!notification.read ? 'bg-primary/5' : ''}`}
                                >
                                  <p className="font-medium">{notification.title}</p>
                                  <p className="text-muted-foreground text-xs mt-1">{notification.message}</p>
                                  <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                                </div>
                              ))}
                            </div>
                            <Button variant="link" className="text-xs w-full mt-2">
                              View all notifications
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-1 pt-4">
                    <Button
                      variant={activeTab === "applications" ? "secondary" : "ghost"}
                      className="w-full justify-start gap-2"
                      onClick={() => setActiveTab("applications")}
                    >
                      <Briefcase className="size-4" />
                      <span>Applications</span>
                    </Button>
                    <Button
                      variant={activeTab === "saved" ? "secondary" : "ghost"}
                      className="w-full justify-start gap-2"
                      onClick={() => setActiveTab("saved")}
                    >
                      <CheckCircle2 className="size-4" />
                      <span>Saved Jobs</span>
                    </Button>
                    <Button
                      variant={activeTab === "profile" ? "secondary" : "ghost"}
                      className="w-full justify-start gap-2"
                      onClick={() => setActiveTab("profile")}
                    >
                      <User className="size-4" />
                      <span>Profile</span>
                    </Button>
                    <Button
                      variant={activeTab === "settings" ? "secondary" : "ghost"}
                      className="w-full justify-start gap-2"
                      onClick={() => setActiveTab("settings")}
                    >
                      <Settings className="size-4" />
                      <span>Settings</span>
                    </Button>
                  </div>
                  
                  <div className="pt-4">
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/jobs">
                        <Briefcase className="size-4 mr-2" />
                        Browse Jobs
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Main Content */}
              <div className="flex-1">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === "applications" && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">My Applications</h2>
                        <Button variant="outline" size="sm">
                          <FileText className="size-4 mr-2" />
                          Export
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-4 flex gap-4 items-center">
                          <div className="size-10 bg-primary/20 rounded-full flex items-center justify-center">
                            <Briefcase className="size-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Applied Jobs</p>
                            <p className="text-2xl font-bold">{applications.length}</p>
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-r from-secondary/10 to-secondary/5 rounded-lg p-4 flex gap-4 items-center">
                          <div className="size-10 bg-secondary/20 rounded-full flex items-center justify-center">
                            <Clock className="size-5 text-secondary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Interviews</p>
                            <p className="text-2xl font-bold">
                              {applications.filter(app => app.status === "Interview").length}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {applications.some(app => app.upcoming) && (
                        <div className="bg-card rounded-lg border border-border shadow-sm p-6">
                          <h3 className="font-medium mb-4 flex items-center">
                            <Calendar className="size-4 mr-2 text-primary" />
                            Upcoming Events
                          </h3>
                          <div className="space-y-4">
                            {applications
                              .filter(app => app.upcoming)
                              .map(app => (
                                <div key={app.id} className="flex gap-4 items-start">
                                  <div className="bg-primary/10 text-primary size-10 rounded-lg flex items-center justify-center shrink-0">
                                    {app.upcoming?.type === "Interview" ? (
                                      <MessagesSquare className="size-5" />
                                    ) : (
                                      <Clock className="size-5" />
                                    )}
                                  </div>
                                  <div>
                                    <p className="font-medium">{app.upcoming?.type}</p>
                                    <p className="text-sm text-muted-foreground">
                                      {app.jobTitle} at {app.company}
                                    </p>
                                    <div className="mt-1 text-sm">
                                      <span className="text-primary font-medium">
                                        {app.upcoming?.date}
                                        {app.upcoming?.time && ` at ${app.upcoming.time}`}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="ml-auto">
                                    <Button size="sm">Prepare</Button>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
                        <div className="p-6">
                          <h3 className="font-medium mb-4">Application History</h3>
                          <div className="space-y-6">
                            {applications.map(application => (
                              <div 
                                key={application.id}
                                className="flex flex-col sm:flex-row sm:items-center gap-4 pb-6 border-b border-border last:border-0 last:pb-0"
                              >
                                <div className="size-12 bg-muted rounded flex items-center justify-center shrink-0">
                                  <img 
                                    src={application.logo} 
                                    alt={application.company} 
                                    className="size-8"
                                  />
                                </div>
                                
                                <div className="flex-1">
                                  <h4 className="font-medium">{application.jobTitle}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {application.company} · {application.location}
                                  </p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    Applied on {application.appliedDate}
                                  </p>
                                </div>
                                
                                <div className="flex items-center gap-4">
                                  <div>
                                    <span 
                                      className={`text-sm px-3 py-1 rounded-full ${
                                        application.status === "Applied" 
                                          ? "bg-muted text-muted-foreground" 
                                          : application.status === "Interview" 
                                          ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" 
                                          : application.status === "Offer" 
                                          ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" 
                                          : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                                      }`}
                                    >
                                      {application.status}
                                    </span>
                                  </div>
                                  
                                  <Button variant="ghost" size="icon">
                                    <ChevronRight className="size-5" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === "saved" && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">Saved Jobs</h2>
                        <Button variant="outline" size="sm">
                          Sort by Date
                        </Button>
                      </div>
                      
                      <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
                        <div className="p-6 space-y-6">
                          {savedJobs.map(job => (
                            <div 
                              key={job.id}
                              className="flex flex-col sm:flex-row sm:items-center gap-4 pb-6 border-b border-border last:border-0 last:pb-0"
                            >
                              <div className="size-12 bg-muted rounded flex items-center justify-center shrink-0">
                                <img 
                                  src={job.logo} 
                                  alt={job.company} 
                                  className="size-8"
                                />
                              </div>
                              
                              <div className="flex-1">
                                <h4 className="font-medium">{job.title}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {job.company} · {job.location}
                                </p>
                                <div className="flex gap-2 mt-2">
                                  <span className="text-xs px-2 py-1 bg-muted rounded">
                                    {job.type}
                                  </span>
                                  <span className="text-xs px-2 py-1 bg-muted rounded">
                                    {job.salary}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="flex flex-col sm:flex-row items-center gap-3">
                                <span className="text-xs text-muted-foreground">
                                  Saved on {job.savedDate}
                                </span>
                                
                                <div className="flex gap-2">
                                  <Button size="sm">Apply Now</Button>
                                  <Button variant="ghost" size="icon">
                                    <XCircle className="size-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === "profile" && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">My Profile</h2>
                        <Button variant="outline" size="sm">
                          <FileText className="size-4 mr-2" />
                          Download Resume
                        </Button>
                      </div>
                      
                      <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
                        <div className="p-6">
                          <div className="flex flex-col md:flex-row gap-6 items-start">
                            <div className="size-24 bg-primary/10 rounded-full flex items-center justify-center text-primary text-3xl font-semibold shrink-0">
                              {userProfile.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between mb-4">
                                <div>
                                  <h3 className="text-2xl font-bold">{userProfile.name}</h3>
                                  <p className="text-primary">{userProfile.title}</p>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {userProfile.location}
                                  </p>
                                </div>
                                
                                <Button>
                                  <Settings className="size-4 mr-2" />
                                  Edit Profile
                                </Button>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div>
                                  <p className="text-sm text-muted-foreground">Email</p>
                                  <p>{userProfile.email}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Phone</p>
                                  <p>{userProfile.phone}</p>
                                </div>
                              </div>
                              
                              <div className="mb-6">
                                <p className="text-sm text-muted-foreground mb-2">Bio</p>
                                <p className="text-sm">{userProfile.bio}</p>
                              </div>
                              
                              <div>
                                <p className="text-sm text-muted-foreground mb-2">Skills</p>
                                <div className="flex flex-wrap gap-2">
                                  {userProfile.skills.map((skill, index) => (
                                    <span 
                                      key={index} 
                                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
                        <div className="p-6">
                          <h3 className="font-medium mb-6">Work Experience</h3>
                          
                          <div className="space-y-8">
                            {userProfile.experience.map((exp, index) => (
                              <div key={index} className="relative pl-6 border-l-2 border-muted">
                                <div className="absolute top-0 left-[-9px] size-4 rounded-full bg-primary"></div>
                                <h4 className="font-medium">{exp.title}</h4>
                                <p className="text-sm text-primary">{exp.company} · {exp.location}</p>
                                <p className="text-sm text-muted-foreground mb-2">{exp.period}</p>
                                <p className="text-sm">{exp.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
                        <div className="p-6">
                          <h3 className="font-medium mb-6">Education</h3>
                          
                          <div className="space-y-8">
                            {userProfile.education.map((edu, index) => (
                              <div key={index} className="relative pl-6 border-l-2 border-muted">
                                <div className="absolute top-0 left-[-9px] size-4 rounded-full bg-secondary"></div>
                                <h4 className="font-medium">{edu.degree}</h4>
                                <p className="text-sm text-secondary">{edu.institution}</p>
                                <p className="text-sm text-muted-foreground">{edu.period}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === "settings" && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">Account Settings</h2>
                      </div>
                      
                      <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
                        <div className="p-6">
                          <h3 className="font-medium mb-6">Profile Settings</h3>
                          
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <Label htmlFor="settings-name">Full Name</Label>
                                <Input 
                                  id="settings-name" 
                                  defaultValue={userProfile.name} 
                                  placeholder="Your full name"
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="settings-title">Professional Title</Label>
                                <Input 
                                  id="settings-title" 
                                  defaultValue={userProfile.title} 
                                  placeholder="e.g. Senior Product Designer"
                                />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <Label htmlFor="settings-email">Email</Label>
                                <Input 
                                  id="settings-email" 
                                  type="email"
                                  defaultValue={userProfile.email} 
                                  placeholder="Your email address"
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="settings-phone">Phone</Label>
                                <Input 
                                  id="settings-phone" 
                                  defaultValue={userProfile.phone} 
                                  placeholder="Your phone number"
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="settings-bio">Bio</Label>
                              <textarea 
                                id="settings-bio" 
                                defaultValue={userProfile.bio}
                                placeholder="Write a short bio"
                                className="w-full min-h-[100px] p-3 text-base border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="settings-location">Location</Label>
                              <Input 
                                id="settings-location" 
                                defaultValue={userProfile.location} 
                                placeholder="City, State"
                              />
                            </div>
                          </div>
                          
                          <div className="mt-6 pt-6 border-t border-border flex justify-end">
                            <Button>Save Changes</Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
                        <div className="p-6">
                          <h3 className="font-medium mb-6">Notification Settings</h3>
                          
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Email Notifications</p>
                                <p className="text-sm text-muted-foreground">Receive job recommendations and updates</p>
                              </div>
                              <div className="flex items-center h-6">
                                <input 
                                  type="checkbox" 
                                  id="email-notifications" 
                                  defaultChecked 
                                  className="size-4 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Application Updates</p>
                                <p className="text-sm text-muted-foreground">Get notified when employers respond to your applications</p>
                              </div>
                              <div className="flex items-center h-6">
                                <input 
                                  type="checkbox" 
                                  id="application-updates" 
                                  defaultChecked 
                                  className="size-4 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Job Alerts</p>
                                <p className="text-sm text-muted-foreground">Receive alerts for new job postings matching your profile</p>
                              </div>
                              <div className="flex items-center h-6">
                                <input 
                                  type="checkbox" 
                                  id="job-alerts" 
                                  defaultChecked 
                                  className="size-4 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Marketing Communications</p>
                                <p className="text-sm text-muted-foreground">Receive newsletters and promotional content</p>
                              </div>
                              <div className="flex items-center h-6">
                                <input 
                                  type="checkbox" 
                                  id="marketing-comms" 
                                  className="size-4 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-6 pt-6 border-t border-border flex justify-end">
                            <Button>Save Preferences</Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
                        <div className="p-6">
                          <h3 className="font-medium mb-4">Privacy Settings</h3>
                          
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Profile Visibility</p>
                                <p className="text-sm text-muted-foreground">Make your profile visible to employers</p>
                              </div>
                              <div className="flex items-center h-6">
                                <input 
                                  type="checkbox" 
                                  id="profile-visibility" 
                                  defaultChecked 
                                  className="size-4 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Resume Visibility</p>
                                <p className="text-sm text-muted-foreground">Allow employers to download your resume</p>
                              </div>
                              <div className="flex items-center h-6">
                                <input 
                                  type="checkbox" 
                                  id="resume-visibility" 
                                  defaultChecked 
                                  className="size-4 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-6 pt-6 border-t border-border">
                            <h4 className="font-medium mb-4">Account Actions</h4>
                            <div className="space-y-4">
                              <Button variant="outline" className="w-full sm:w-auto text-muted-foreground">
                                Download My Data
                              </Button>
                              <Button variant="destructive" className="w-full sm:w-auto">
                                Delete Account
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
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

export default EmployeeDashboard;
