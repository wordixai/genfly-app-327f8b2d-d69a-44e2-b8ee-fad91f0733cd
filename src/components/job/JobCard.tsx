import { Job } from '@/types/job';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, DollarSign, Building } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface JobCardProps {
  job: Job;
  onViewDetails: (jobId: string) => void;
  onViewCompany: (companyId: string) => void;
}

export function JobCard({ job, onViewDetails, onViewCompany }: JobCardProps) {
  const formatSalary = (salary: Job['salary']) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: salary.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return `${formatter.format(salary.min)} - ${formatter.format(salary.max)}`;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <img
              src={job.company.logo}
              alt={job.company.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1 hover:text-blue-600 cursor-pointer"
                    onClick={() => onViewDetails(job.id)}>
                  {job.title}
                </h3>
                <p className="text-gray-600 hover:text-blue-600 cursor-pointer"
                   onClick={() => onViewCompany(job.company.id)}>
                  {job.company.name}
                </p>
              </div>
              <Badge variant="secondary" className="capitalize">
                {job.type.replace('-', ' ')}
              </Badge>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {job.location}
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                {formatSalary(job.salary)}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}
              </div>
            </div>
            
            <p className="text-gray-600 mb-3 line-clamp-2">
              {job.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {job.tags.slice(0, 4).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {job.tags.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{job.tags.length - 4} more
                </Badge>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button onClick={() => onViewDetails(job.id)} className="flex-1">
                View Details
              </Button>
              <Button 
                variant="outline" 
                onClick={() => onViewCompany(job.company.id)}
                className="flex items-center gap-1"
              >
                <Building className="w-4 h-4" />
                Company
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}