export interface Job {
  id: string;
  title: string;
  company: Company;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  requirements: string[];
  benefits: string[];
  postedDate: string;
  applicationDeadline: string;
  tags: string[];
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  website: string;
  size: string;
  industry: string;
  location: string;
  founded: number;
  benefits: string[];
}

export interface JobFilters {
  search: string;
  location: string;
  type: string;
  salaryMin: number;
  tags: string[];
}