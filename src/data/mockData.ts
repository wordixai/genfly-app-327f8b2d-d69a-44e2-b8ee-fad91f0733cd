import { Company, Job } from '@/types/job';

export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'TechCorp',
    logo: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=100&h=100&fit=crop',
    description: 'Leading technology company specializing in AI and machine learning solutions.',
    website: 'https://techcorp.com',
    size: '500-1000',
    industry: 'Technology',
    location: 'San Francisco, CA',
    founded: 2010,
    benefits: ['Health Insurance', 'Remote Work', '401k', 'Stock Options']
  },
  {
    id: '2',
    name: 'StartupXYZ',
    logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
    description: 'Fast-growing startup revolutionizing the e-commerce space.',
    website: 'https://startupxyz.com',
    size: '50-100',
    industry: 'E-commerce',
    location: 'New York, NY',
    founded: 2018,
    benefits: ['Flexible Hours', 'Lunch Provided', 'Learning Budget']
  },
  {
    id: '3',
    name: 'DataSolutions',
    logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop',
    description: 'Data analytics company helping businesses make informed decisions.',
    website: 'https://datasolutions.com',
    size: '200-500',
    industry: 'Data Analytics',
    location: 'Austin, TX',
    founded: 2015,
    benefits: ['Health Insurance', 'Unlimited PTO', 'Conference Attendance']
  }
];

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: mockCompanies[0],
    location: 'San Francisco, CA',
    type: 'full-time',
    salary: { min: 120000, max: 180000, currency: 'USD' },
    description: 'We are looking for a Senior Frontend Developer to join our team and help build amazing user experiences.',
    requirements: ['5+ years React experience', 'TypeScript proficiency', 'Modern CSS/SASS', 'Testing frameworks'],
    benefits: ['Health Insurance', 'Stock Options', 'Flexible Hours', 'Remote Work'],
    postedDate: '2024-01-15',
    applicationDeadline: '2024-02-15',
    tags: ['React', 'TypeScript', 'Frontend', 'JavaScript']
  },
  {
    id: '2',
    title: 'Backend Engineer',
    company: mockCompanies[1],
    location: 'New York, NY',
    type: 'full-time',
    salary: { min: 100000, max: 150000, currency: 'USD' },
    description: 'Join our backend team to build scalable APIs and microservices.',
    requirements: ['3+ years Python experience', 'Database design', 'API development', 'Docker knowledge'],
    benefits: ['Health Insurance', 'Lunch Provided', 'Learning Budget'],
    postedDate: '2024-01-10',
    applicationDeadline: '2024-02-10',
    tags: ['Python', 'Backend', 'API', 'Microservices']
  },
  {
    id: '3',
    title: 'Data Scientist',
    company: mockCompanies[2],
    location: 'Austin, TX',
    type: 'full-time',
    salary: { min: 110000, max: 160000, currency: 'USD' },
    description: 'Work with large datasets to extract insights and build predictive models.',
    requirements: ['Python/R proficiency', 'Machine Learning', 'Statistics', 'SQL'],
    benefits: ['Health Insurance', 'Conference Attendance', '401k'],
    postedDate: '2024-01-12',
    applicationDeadline: '2024-02-12',
    tags: ['Python', 'Machine Learning', 'Data Science', 'SQL']
  },
  {
    id: '4',
    title: 'UX Designer',
    company: mockCompanies[0],
    location: 'Remote',
    type: 'remote',
    salary: { min: 80000, max: 120000, currency: 'USD' },
    description: 'Create intuitive and beautiful user experiences for our products.',
    requirements: ['3+ years UX experience', 'Figma proficiency', 'User research', 'Prototyping'],
    benefits: ['Remote Work', 'Health Insurance', 'Design Tools Budget'],
    postedDate: '2024-01-08',
    applicationDeadline: '2024-02-08',
    tags: ['UX', 'Design', 'Figma', 'User Research']
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    company: mockCompanies[2],
    location: 'Austin, TX',
    type: 'contract',
    salary: { min: 90000, max: 140000, currency: 'USD' },
    description: 'Help us scale our infrastructure and improve deployment processes.',
    requirements: ['AWS/Azure experience', 'Kubernetes', 'CI/CD pipelines', 'Infrastructure as Code'],
    benefits: ['Flexible Schedule', 'Health Insurance'],
    postedDate: '2024-01-05',
    applicationDeadline: '2024-02-05',
    tags: ['DevOps', 'AWS', 'Kubernetes', 'CI/CD']
  }
];