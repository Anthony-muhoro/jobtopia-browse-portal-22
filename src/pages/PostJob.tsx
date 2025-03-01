
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import { JobType, JobLocation } from "@/lib/types";
import { Check, Info } from "lucide-react";

interface FormState {
  title: string;
  company: string;
  location: string;
  locationType: JobLocation;
  type: JobType;
  salary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  featuredJob: boolean;
}

const PostJob = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formState, setFormState] = useState<FormState>({
    title: "",
    company: "",
    location: "",
    locationType: "On-site",
    type: "Full-time",
    salary: "",
    description: "",
    requirements: [""],
    responsibilities: [""],
    benefits: [""],
    featuredJob: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string) => (checked: boolean) => {
    setFormState((prev) => ({ ...prev, [name]: checked }));
  };

  const handleArrayItemChange = (
    arrayName: "requirements" | "responsibilities" | "benefits",
    index: number,
    value: string
  ) => {
    setFormState((prev) => {
      const newArray = [...prev[arrayName]];
      newArray[index] = value;
      return { ...prev, [arrayName]: newArray };
    });
  };

  const addArrayItem = (arrayName: "requirements" | "responsibilities" | "benefits") => {
    setFormState((prev) => {
      return { ...prev, [arrayName]: [...prev[arrayName], ""] };
    });
  };

  const removeArrayItem = (
    arrayName: "requirements" | "responsibilities" | "benefits",
    index: number
  ) => {
    if (formState[arrayName].length <= 1) return;
    
    setFormState((prev) => {
      const newArray = [...prev[arrayName]];
      newArray.splice(index, 1);
      return { ...prev, [arrayName]: newArray };
    });
  };

  const nextStep = () => {
    setStep((prev) => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the form data to your backend
    console.log("Job posting submitted:", formState);
    
    // Show success message and redirect
    navigate("/employer-dashboard");
  };

  const jobTypes: JobType[] = [
    "Full-time",
    "Part-time",
    "Contract",
    "Freelance",
    "Internship",
  ];

  const jobLocations: JobLocation[] = ["Remote", "Hybrid", "On-site"];

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 pt-24">
          <div className="page-container">
            <div className="max-w-3xl mx-auto">
              <div className="mb-10 text-center">
                <h1 className="text-3xl font-bold mb-4">Post a New Job</h1>
                <p className="text-muted-foreground">
                  Fill out the form below to create a new job listing
                </p>
              </div>

              <div className="mb-10">
                <div className="flex justify-between items-center relative">
                  {[1, 2, 3, 4].map((stepNumber) => (
                    <div
                      key={stepNumber}
                      className={`z-10 flex flex-col items-center ${
                        stepNumber < step
                          ? "text-white"
                          : stepNumber === step
                          ? "text-primary font-medium"
                          : "text-muted-foreground"
                      }`}
                    >
                      <div
                        className={`size-10 rounded-full flex items-center justify-center mb-2 
                        ${
                          stepNumber < step
                            ? "bg-primary"
                            : stepNumber === step
                            ? "border-2 border-primary text-primary"
                            : "border-2 border-muted-foreground/30"
                        }`}
                      >
                        {stepNumber < step ? <Check className="size-5" /> : stepNumber}
                      </div>
                      <span className="text-sm hidden sm:block">
                        {stepNumber === 1
                          ? "Basic Info"
                          : stepNumber === 2
                          ? "Description"
                          : stepNumber === 3
                          ? "Requirements"
                          : "Review"}
                      </span>
                    </div>
                  ))}
                  <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted-foreground/20" />
                </div>
              </div>

              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handleSubmit}>
                  {step === 1 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="title">Job Title*</Label>
                          <Input
                            id="title"
                            name="title"
                            value={formState.title}
                            onChange={handleInputChange}
                            placeholder="e.g. Senior Product Designer"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company">Company Name*</Label>
                          <Input
                            id="company"
                            name="company"
                            value={formState.company}
                            onChange={handleInputChange}
                            placeholder="e.g. Acme Inc."
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="location">Location*</Label>
                          <Input
                            id="location"
                            name="location"
                            value={formState.location}
                            onChange={handleInputChange}
                            placeholder="e.g. San Francisco, CA"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="salary">Salary Range*</Label>
                          <Input
                            id="salary"
                            name="salary"
                            value={formState.salary}
                            onChange={handleInputChange}
                            placeholder="e.g. $100K - $120K"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="type">Job Type*</Label>
                          <select
                            id="type"
                            name="type"
                            value={formState.type}
                            onChange={handleInputChange as any}
                            className="w-full h-10 px-3 py-2 text-base border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                            required
                          >
                            {jobTypes.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="locationType">Location Type*</Label>
                          <select
                            id="locationType"
                            name="locationType"
                            value={formState.locationType}
                            onChange={handleInputChange as any}
                            className="w-full h-10 px-3 py-2 text-base border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                            required
                          >
                            {jobLocations.map((location) => (
                              <option key={location} value={location}>
                                {location}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 pt-4">
                        <Checkbox
                          id="featuredJob"
                          checked={formState.featuredJob}
                          onCheckedChange={handleCheckboxChange("featuredJob")}
                        />
                        <div className="grid gap-1.5 leading-none">
                          <Label
                            htmlFor="featuredJob"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                          >
                            Feature this job posting 
                            <Info className="ml-1 size-3 text-muted-foreground" />
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Featured jobs appear at the top of search results (additional fee applies)
                          </p>
                        </div>
                      </div>

                      <div className="pt-6 flex justify-end">
                        <Button type="button" onClick={nextStep}>
                          Next Step
                        </Button>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="description">Job Description*</Label>
                        <textarea
                          id="description"
                          name="description"
                          value={formState.description}
                          onChange={handleInputChange}
                          placeholder="Provide a detailed description of the job role and responsibilities..."
                          className="w-full min-h-[200px] p-3 text-base border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                          required
                        />
                      </div>

                      <div className="pt-6 flex justify-between">
                        <Button type="button" variant="outline" onClick={prevStep}>
                          Previous Step
                        </Button>
                        <Button type="button" onClick={nextStep}>
                          Next Step
                        </Button>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-8">
                      <div className="space-y-4">
                        <Label>Job Requirements*</Label>
                        {formState.requirements.map((req, index) => (
                          <div key={`req-${index}`} className="flex gap-2">
                            <Input
                              value={req}
                              onChange={(e) =>
                                handleArrayItemChange("requirements", index, e.target.value)
                              }
                              placeholder="e.g. 3+ years of experience in product design"
                              required
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => removeArrayItem("requirements", index)}
                              disabled={formState.requirements.length <= 1}
                            >
                              -
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          className="mt-2"
                          onClick={() => addArrayItem("requirements")}
                        >
                          Add Requirement
                        </Button>
                      </div>

                      <div className="space-y-4">
                        <Label>Responsibilities*</Label>
                        {formState.responsibilities.map((resp, index) => (
                          <div key={`resp-${index}`} className="flex gap-2">
                            <Input
                              value={resp}
                              onChange={(e) =>
                                handleArrayItemChange("responsibilities", index, e.target.value)
                              }
                              placeholder="e.g. Lead the design of new features"
                              required
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => removeArrayItem("responsibilities", index)}
                              disabled={formState.responsibilities.length <= 1}
                            >
                              -
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          className="mt-2"
                          onClick={() => addArrayItem("responsibilities")}
                        >
                          Add Responsibility
                        </Button>
                      </div>

                      <div className="space-y-4">
                        <Label>Benefits*</Label>
                        {formState.benefits.map((benefit, index) => (
                          <div key={`benefit-${index}`} className="flex gap-2">
                            <Input
                              value={benefit}
                              onChange={(e) =>
                                handleArrayItemChange("benefits", index, e.target.value)
                              }
                              placeholder="e.g. Comprehensive health insurance"
                              required
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => removeArrayItem("benefits", index)}
                              disabled={formState.benefits.length <= 1}
                            >
                              -
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          className="mt-2"
                          onClick={() => addArrayItem("benefits")}
                        >
                          Add Benefit
                        </Button>
                      </div>

                      <div className="pt-6 flex justify-between">
                        <Button type="button" variant="outline" onClick={prevStep}>
                          Previous Step
                        </Button>
                        <Button type="button" onClick={nextStep}>
                          Next Step
                        </Button>
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-8">
                      <div className="rounded-lg border border-border p-6 space-y-6">
                        <div>
                          <h2 className="text-2xl font-semibold">{formState.title}</h2>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="bg-secondary/10 text-secondary px-2 py-1 rounded text-sm">
                              {formState.company}
                            </span>
                            <span className="bg-muted px-2 py-1 rounded text-sm">
                              {formState.location}
                            </span>
                            <span className="bg-muted px-2 py-1 rounded text-sm">
                              {formState.locationType}
                            </span>
                            <span className="bg-muted px-2 py-1 rounded text-sm">
                              {formState.type}
                            </span>
                            <span className="bg-muted px-2 py-1 rounded text-sm">
                              {formState.salary}
                            </span>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Job Description</h3>
                          <p className="text-muted-foreground whitespace-pre-line">
                            {formState.description}
                          </p>
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Requirements</h3>
                          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                            {formState.requirements.map((req, index) => (
                              <li key={index}>{req}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Responsibilities</h3>
                          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                            {formState.responsibilities.map((resp, index) => (
                              <li key={index}>{resp}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Benefits</h3>
                          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                            {formState.benefits.map((benefit, index) => (
                              <li key={index}>{benefit}</li>
                            ))}
                          </ul>
                        </div>

                        {formState.featuredJob && (
                          <div className="bg-primary/10 text-primary p-4 rounded-md text-sm flex items-center">
                            <Info className="mr-2 size-4" />
                            This job will be featured in search results and highlighted on the homepage.
                          </div>
                        )}
                      </div>

                      <div className="bg-muted/30 p-6 rounded-lg border border-border">
                        <h3 className="font-medium mb-4">Posting Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Posting Period:</span>
                            <span className="ml-2 font-medium">30 days</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Basic Posting Fee:</span>
                            <span className="ml-2 font-medium">$299</span>
                          </div>
                          {formState.featuredJob && (
                            <>
                              <div>
                                <span className="text-muted-foreground">Featured Job Fee:</span>
                                <span className="ml-2 font-medium">+$199</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Total:</span>
                                <span className="ml-2 font-medium">$498</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="pt-6 flex justify-between">
                        <Button type="button" variant="outline" onClick={prevStep}>
                          Previous Step
                        </Button>
                        <Button type="submit">Post Job</Button>
                      </div>
                    </div>
                  )}
                </form>
              </motion.div>
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

export default PostJob;
