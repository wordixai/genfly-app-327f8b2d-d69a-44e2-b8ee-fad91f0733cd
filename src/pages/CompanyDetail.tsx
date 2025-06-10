import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Company, Job } from '@/types/job';
import { mockCompanies, mockJobs } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { JobCard } from '@/components/job/JobCard';
import { ArrowLeft, MapPin, Users, Calendar, ExternalLink, Building } from 'lucide-react';

export default function CompanyDetail() {
  const { companyId } = useParams<{ companyId: string }>();
  const navigate = useNavigate();
  const [company, setCompany] = useState<Company | null>(null);
  const [companyJobs, setCompanyJobs] = useState<Job[]>([]);

  useEffect(() => {
    if (companyId) {
      const foundCompany = mockCompanies.find(c => c.id === companyId);
      setCompany(foundCompany || null);
      
      const jobs = mockJobs.filter(job => job.company.id === companyId);
      setCompanyJobs(jobs);
    }
  }, [companyId]);

  if (!company) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Company Not Found</h1>
          <Button onClick={() => navigate('/')}>Back to Jobs</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Jobs
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Company Info Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-24 h-24 rounded-lg object-cover mx-auto mb-4"
                  />
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {company.name}
                  </h1>
                  <p className="text-gray-600">{company.industry}</p>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{company.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>{company.size} employees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Founded {company.founded}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-gray-400" />
                    <span>{companyJobs.length} open positions</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <Button 
                  variant="outline" 
                  onClick={() => window.open(company.website, '_blank')}
                  className="w-full"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visit Website
                </Button>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {company.benefits.map((benefit) => (
                    <Badge key={benefit} variant="outline" className="w-full justify-start">
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Company Description */}
            <Card>
              <CardHeader>
                <CardTitle>About {company.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {company.description}
                </p>
              </CardContent>
            </Card>

            {/* Open Positions */}
            <Card>
              <CardHeader>
                <CardTitle>
                  Open Positions ({companyJobs.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {companyJobs.length > 0 ? (
                  <div className="space-y-4">
                    {companyJobs.map((job) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        onViewDetails={(jobId) => navigate(`/job/${jobId}`)}
                        onViewCompany={(companyId) => navigate(`/company/${companyId}`)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No Open Positions
                    </h3>
                    <p className="text-gray-500">
                      This company doesn't have any open positions at the moment.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}