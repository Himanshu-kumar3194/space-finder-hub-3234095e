import { AdvancedFilters as FiltersType } from '@/types/space';
import { cities, areas, priceRange } from '@/data/spaces';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { MapPin, Building, IndianRupee, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface AdvancedFiltersProps {
  filters: FiltersType;
  onFiltersChange: (filters: FiltersType) => void;
}

export function AdvancedFilters({ filters, onFiltersChange }: AdvancedFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCityChange = (value: string) => {
    onFiltersChange({ ...filters, city: value });
  };

  const handleAreaChange = (value: string) => {
    onFiltersChange({ ...filters, area: value });
  };

  const handleBudgetChange = (values: number[]) => {
    onFiltersChange({ ...filters, minBudget: values[0], maxBudget: values[1] });
  };

  const handleReset = () => {
    onFiltersChange({
      city: 'all',
      area: 'all',
      minBudget: priceRange.min,
      maxBudget: priceRange.max,
    });
  };

  const hasActiveFilters = 
    filters.city !== 'all' || 
    filters.area !== 'all' || 
    filters.minBudget !== priceRange.min || 
    filters.maxBudget !== priceRange.max;

  return (
    <div className="glass-card rounded-xl p-4 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors"
        >
          <SlidersHorizontal className="w-5 h-5" />
          <span>Advanced Filters</span>
          {hasActiveFilters && (
            <span className="px-2 py-0.5 text-xs bg-primary/20 text-primary rounded-full">
              Active
            </span>
          )}
        </button>
        
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </Button>
        )}
      </div>

      {/* Filters Grid */}
      <div className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-4 transition-all duration-300",
        isExpanded ? "opacity-100 max-h-[500px]" : "opacity-100 max-h-[500px] md:max-h-none"
      )}>
        {/* City Filter */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            City
          </label>
          <Select value={filters.city} onValueChange={handleCityChange}>
            <SelectTrigger className="bg-secondary/50 border-border/50">
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Area Filter */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building className="w-4 h-4" />
            Area
          </label>
          <Select value={filters.area} onValueChange={handleAreaChange}>
            <SelectTrigger className="bg-secondary/50 border-border/50">
              <SelectValue placeholder="Select area" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Areas</SelectItem>
              {areas.map((area) => (
                <SelectItem key={area} value={area}>
                  {area}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Budget Filter */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <IndianRupee className="w-4 h-4" />
            Budget Range
          </label>
          <div className="px-2 pt-2">
            <Slider
              value={[filters.minBudget, filters.maxBudget]}
              min={priceRange.min}
              max={priceRange.max}
              step={500}
              onValueChange={handleBudgetChange}
              className="w-full"
            />
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>₹{filters.minBudget.toLocaleString()}</span>
              <span>₹{filters.maxBudget.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
