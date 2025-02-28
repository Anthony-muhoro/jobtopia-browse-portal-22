
import { useState } from "react";
import { Search, MapPin, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { JobType, JobLocation, SearchFilters } from "@/lib/types";

interface SearchFiltersProps {
  onSearch: (filters: SearchFilters) => void;
}

const SearchFiltersComponent = ({ onSearch }: SearchFiltersProps) => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [jobTypes, setJobTypes] = useState<JobType[]>([]);
  const [locationTypes, setLocationTypes] = useState<JobLocation[]>([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      query,
      location,
      jobType: jobTypes,
      locationType: locationTypes,
    });
  };

  const handleJobTypeChange = (type: JobType) => {
    setJobTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const handleLocationTypeChange = (type: JobLocation) => {
    setLocationTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  return (
    <div className="w-full rounded-xl bg-card border border-border shadow-sm transition-all animate-fade-in">
      <form onSubmit={handleSubmit} className="p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto_auto] gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Job title or keyword..."
              className="pl-10"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Location..."
              className="pl-10"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Filters</span>
                {(jobTypes.length > 0 || locationTypes.length > 0) && (
                  <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {jobTypes.length + locationTypes.length}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 p-4" align="start">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Job Type</h4>
                  <div className="space-y-2">
                    {["Full-time", "Part-time", "Contract", "Freelance", "Internship"].map(
                      (type) => (
                        <div
                          key={type}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`job-type-${type}`}
                            checked={jobTypes.includes(type as JobType)}
                            onCheckedChange={() =>
                              handleJobTypeChange(type as JobType)
                            }
                          />
                          <Label
                            htmlFor={`job-type-${type}`}
                            className="text-sm"
                          >
                            {type}
                          </Label>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Location Type</h4>
                  <div className="space-y-2">
                    {["Remote", "Hybrid", "On-site"].map((type) => (
                      <div
                        key={type}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`location-type-${type}`}
                          checked={locationTypes.includes(type as JobLocation)}
                          onCheckedChange={() =>
                            handleLocationTypeChange(type as JobLocation)
                          }
                        />
                        <Label
                          htmlFor={`location-type-${type}`}
                          className="text-sm"
                        >
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setJobTypes([]);
                      setLocationTypes([]);
                    }}
                  >
                    Reset
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => setIsPopoverOpen(false)}
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Button type="submit" className="w-full md:w-auto">
            Search Jobs
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchFiltersComponent;
