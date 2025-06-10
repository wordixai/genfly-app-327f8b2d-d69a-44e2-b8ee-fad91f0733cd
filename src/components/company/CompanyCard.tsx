import { Company } from '@/types/job';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Calendar, ExternalLink } from 'lucide-react';

interface CompanyCardProps {
  company: Company;
  onViewDetails: (companyId: string) => void;
  jobCount?: number;
}

export function CompanyCard({ company, onViewDetails, jobCount }: CompanyCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <img
              src={company.logo}
              alt={company.name}
              className="w-20 h-20 rounded-lg object-cover"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1 hover:text-blue-600 cursor-pointer"
                    onClick={() => onViewDetails(company.id)}>
                  {company.name}
                </h3>
                <p className="text-gray-600">{company.industry}</p>
              </div>
              {jobCount !== undefined && (
                <Badge variant="secondary">
                  {jobCount} open position{jobCount !== 1 ? 's' : ''}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {company.location}
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {company.size} employees
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Founded {company.founded}
              </div>
            </div>
            
            <p className="text-gray-600 mb-4 line-clamp-2">
              {company.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {company.benefits.slice(0, 3).map((benefit) => (
                <Badge key={benefit} variant="outline" className="text-xs">
                  {benefit}
                </Badge>
              ))}
              {company.benefits.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{company.benefits.length - 3} more
                </Badge>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button onClick={() => onViewDetails(company.id)} className="flex-1">
                View Company
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.open(company.website, '_blank')}
                className="flex items-center gap-1"
              >
                <ExternalLink className="w-4 h-4" />
                Website
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}