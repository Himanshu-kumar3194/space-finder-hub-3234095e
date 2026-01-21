import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { cities, areas, tiers } from '@/data/sponsors';
import { Search, Filter, RotateCcw } from 'lucide-react';

interface SponsorFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCity: string;
  onCityChange: (value: string) => void;
  selectedArea: string;
  onAreaChange: (value: string) => void;
  selectedTier: string;
  onTierChange: (value: string) => void;
  onReset: () => void;
}

export const SponsorFilters = ({
  searchQuery,
  onSearchChange,
  selectedCity,
  onCityChange,
  selectedArea,
  onAreaChange,
  selectedTier,
  onTierChange,
  onReset
}: SponsorFiltersProps) => {
  const availableAreas = areas[selectedCity] || ['All Areas'];

  const handleCityChange = (city: string) => {
    onCityChange(city);
    onAreaChange('All Areas');
  };

  const tierLabels: Record<string, string> = {
    all: '🎯 All Tiers',
    platinum: '🏆 Platinum',
    gold: '🥇 Gold',
    silver: '🥈 Silver',
    bronze: '🥉 Bronze'
  };

  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">Filter Sponsors</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Search */}
        <div className="lg:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search sponsors..."
            className="pl-10 bg-secondary/30"
          />
        </div>

        {/* City Filter */}
        <Select value={selectedCity} onValueChange={handleCityChange}>
          <SelectTrigger className="bg-secondary/30">
            <SelectValue placeholder="Select City" />
          </SelectTrigger>
          <SelectContent>
            {cities.map(city => (
              <SelectItem key={city} value={city}>{city}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Area Filter */}
        <Select value={selectedArea} onValueChange={onAreaChange}>
          <SelectTrigger className="bg-secondary/30">
            <SelectValue placeholder="Select Area" />
          </SelectTrigger>
          <SelectContent>
            {availableAreas.map(area => (
              <SelectItem key={area} value={area}>{area}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Tier Filter */}
        <Select value={selectedTier} onValueChange={onTierChange}>
          <SelectTrigger className="bg-secondary/30">
            <SelectValue placeholder="Select Tier" />
          </SelectTrigger>
          <SelectContent>
            {tiers.map(tier => (
              <SelectItem key={tier} value={tier}>{tierLabels[tier]}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Reset Button */}
      <div className="flex justify-end">
        <Button variant="ghost" size="sm" onClick={onReset} className="gap-2 text-muted-foreground hover:text-foreground">
          <RotateCcw className="w-4 h-4" />
          Reset Filters
        </Button>
      </div>
    </div>
  );
};
