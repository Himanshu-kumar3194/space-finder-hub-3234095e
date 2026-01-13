import { SpaceStatus } from '@/types/space';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LayoutGrid, CheckCircle, XCircle, Clock, Star } from 'lucide-react';

type FilterOption = SpaceStatus | 'all';

interface SpaceFilterProps {
  activeFilter: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
  counts: Record<FilterOption, number>;
}

const filterConfig: Record<FilterOption, { label: string; icon: React.ReactNode; color: string }> = {
  all: {
    label: 'All Spaces',
    icon: <LayoutGrid className="w-4 h-4" />,
    color: 'text-foreground',
  },
  available: {
    label: 'Available',
    icon: <CheckCircle className="w-4 h-4" />,
    color: 'text-success',
  },
  unavailable: {
    label: 'Unavailable',
    icon: <XCircle className="w-4 h-4" />,
    color: 'text-destructive',
  },
  booked: {
    label: 'Booked',
    icon: <Clock className="w-4 h-4" />,
    color: 'text-warning',
  },
  allotted: {
    label: 'Allotted',
    icon: <Star className="w-4 h-4" />,
    color: 'text-accent',
  },
};

export function SpaceFilter({ activeFilter, onFilterChange, counts }: SpaceFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 p-1 bg-secondary/30 rounded-xl backdrop-blur-sm">
      {(Object.keys(filterConfig) as FilterOption[]).map((filter) => {
        const config = filterConfig[filter];
        const isActive = activeFilter === filter;

        return (
          <Button
            key={filter}
            variant={isActive ? 'glow' : 'ghost'}
            size="sm"
            onClick={() => onFilterChange(filter)}
            className={cn(
              "relative gap-2 transition-all duration-300",
              isActive && "shadow-lg",
              !isActive && config.color
            )}
          >
            {config.icon}
            <span>{config.label}</span>
            <span 
              className={cn(
                "px-1.5 py-0.5 text-xs rounded-full",
                isActive ? "bg-primary-foreground/20" : "bg-secondary"
              )}
            >
              {counts[filter]}
            </span>
          </Button>
        );
      })}
    </div>
  );
}
