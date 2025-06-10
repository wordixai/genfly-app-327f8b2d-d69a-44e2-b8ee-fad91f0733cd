import { useState } from 'react';
import { JobFilters } from '@/types/job';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Search, MapPin, Briefcase, X } from 'lucide-react';

interface JobFiltersProps {
  filters: JobFilters;
  onFiltersChange: (filters: JobFilters) => void;
}

const popularTags = ['React', 'TypeScript', 'Python', 'JavaScript', 'Node.js', 'AWS', 'Docker', 'SQL'];
const jobTypes = ['full-time', 'part-time', 'contract', 'remote'];

export function JobFilters({ filters, onFiltersChange }: JobFiltersProps) {
  const [tagInput, setTagInput] = useState('');

  const handleAddTag = (tag: string) => {
    if (tag && !filters.tags.includes(tag)) {
      onFiltersChange({
        ...filters,
        tags: [...filters.tags, tag]
      });
    }
    setTagInput('');
  };

  const handleRemoveTag = (tag: string) => {
    onFiltersChange({
      ...filters,
      tags: filters.tags.filter(t => t !== tag)
    });
  };

  const handleClearFilters = () => {
    onFiltersChange({
      search: '',
      location: '',
      type: '',
      salaryMin: 0,
      tags: []
    });
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search">Job Title or Keywords</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              id="search"
              placeholder="e.g. Frontend Developer"
              value={filters.search}
              onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
              className="pl-10"
            />
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              id="location"
              placeholder="e.g. San Francisco, Remote"
              value={filters.location}
              onChange={(e) => onFiltersChange({ ...filters, location: e.target.value })}
              className="pl-10"
            />
          </div>
        </div>

        {/* Job Type */}
        <div className="space-y-2">
          <Label>Job Type</Label>
          <Select value={filters.type} onValueChange={(value) => onFiltersChange({ ...filters, type: value })}>
            <SelectTrigger>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <SelectValue placeholder="All job types" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All job types</SelectItem>
              {jobTypes.map((type) => (
                <SelectItem key={type} value={type} className="capitalize">
                  {type.replace('-', ' ')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Salary Range */}
        <div className="space-y-2">
          <Label>Minimum Salary: ${filters.salaryMin.toLocaleString()}</Label>
          <Slider
            value={[filters.salaryMin]}
            onValueChange={([value]) => onFiltersChange({ ...filters, salaryMin: value })}
            max={200000}
            min={0}
            step={10000}
            className="w-full"
          />
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <Label>Skills & Technologies</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {popularTags.map((tag) => (
              <Badge
                key={tag}
                variant={filters.tags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => {
                  if (filters.tags.includes(tag)) {
                    handleRemoveTag(tag);
                  } else {
                    handleAddTag(tag);
                  }
                }}
              >
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Input
              placeholder="Add custom skill"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTag(tagInput)}
            />
            <Button onClick={() => handleAddTag(tagInput)} variant="outline" size="sm">
              Add
            </Button>
          </div>

          {filters.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {filters.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-1">
                  {tag}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => handleRemoveTag(tag)}
                  />
                </Badge>
              ))}
            </div>
          )}
        </div>

        <Button 
          onClick={handleClearFilters} 
          variant="outline" 
          className="w-full"
        >
          Clear All Filters
        </Button>
      </CardContent>
    </Card>
  );
}