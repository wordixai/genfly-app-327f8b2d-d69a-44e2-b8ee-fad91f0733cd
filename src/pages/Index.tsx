import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { JobFilters } from '@/types/job';
import { mockJobs } from '@/data/mockData';
import { JobCard } from '@/components/job/JobCard';
import { JobFilters as JobFiltersComponent } from '@/components/job/JobFilters';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Filter } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<JobFilters>({
    search: '',
    location: '',
    type: '',
    salaryMin: 0,
    tags: []
  });

  // Initialize search from URL params
  useEffect(() => {
    const searchFromUrl = searchParams.get('search');
    if (searchFromUrl) {
      setFilters(prev => ({ ...prev, search: searchFromUrl }));
    }
  }, [searchParams]);

  const filteredJobs = useMemo(() => {
    return mockJobs.filter(job => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          job.title.toLowerCase().includes(searchLower) ||
          job.company.name.toLowerCase().includes(searchLower) ||
          job.description.toLowerCase().includes(searchLower) ||
          job.tags.some(tag => tag.toLowerCase().includes(searchLower));
        
        if (!matchesSearch) return false;
      }

      // Location filter
      if (filters.location) {
        const locationLower = filters.location.toLowerCase();
        if (!job.location.toLowerCase().includes(locationLower)) return false;
      }

      // Job type filter
      if (filters.type && job.type !== filters.type) return false;

      // Salary filter
      if (filters.salaryMin > 0 && job.salary.min < filters.salaryMin) return false;

      // Tags filter
      if (filters.tags.length > 0) {
        const hasMatchingTag = filters.tags.some(filterTag => 
          job.tags.some(jobTag => jobTag.toLowerCase().includes(filterTag.toLowerCase()))
        );
        if (!hasMatchingTag) return false;
      }

      return true;
    });
  }, [filters]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.search) count++;
    if (filters.location) count++;
    if (filters.type) count++;
    if (filters.salaryMin > 0) count++;
    if (filters.tags.length > 0) count += filters.tags.length;
    return count;
  }, [filters]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Find Your Dream Job
        </h1>
        <p className="text-gray-600">
          Discover {mockJobs.length} job opportunities from top companies
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
          <JobFiltersComponent 
            filters={filters} 
            onFiltersChange={setFilters}
          />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Mobile Filter Toggle & Results Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
              <div className="text-sm text-gray-600">
                {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
              </div>
            </div>
            
            {/* Active Filters */}
            {activeFiltersCount > 0 && (
              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm text-gray-500">Active filters:</span>
                <Badge variant="secondary">
                  {activeFiltersCount} applied
                </Badge>
              </div>
            )}
          </div>

          {/* Job Results */}
          {filteredJobs.length > 0 ? (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onViewDetails={(jobId) => navigate(`/job/${jobId}`)}
                  onViewCompany={(companyId) => navigate(`/company/${companyId}`)}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12">
                <div className="text-center">
                  <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No Jobs Found
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Try adjusting your filters to find more job opportunities.
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => setFilters({
                      search: '',
                      location: '',
                      type: '',
                      salaryMin: 0,
                      tags: []
                    })}
                  >
                    Clear All Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;