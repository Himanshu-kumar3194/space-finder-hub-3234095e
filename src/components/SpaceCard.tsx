import { Space, SpaceStatus } from '@/types/space';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Wifi, Monitor, Coffee, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SpaceCardProps {
  space: Space;
  onClick: (space: Space) => void;
}

const statusConfig: Record<SpaceStatus, { label: string; className: string }> = {
  available: {
    label: 'Available',
    className: 'bg-success/20 text-success border-success/30',
  },
  unavailable: {
    label: 'Unavailable',
    className: 'bg-destructive/20 text-destructive border-destructive/30',
  },
  booked: {
    label: 'Booked',
    className: 'bg-warning/20 text-warning border-warning/30',
  },
  allotted: {
    label: 'Allotted',
    className: 'bg-accent/20 text-accent border-accent/30',
  },
};

const amenityIcons: Record<string, React.ReactNode> = {
  WiFi: <Wifi className="w-3 h-3" />,
  'High-Speed WiFi': <Wifi className="w-3 h-3" />,
  Projector: <Monitor className="w-3 h-3" />,
  'Coffee Machine': <Coffee className="w-3 h-3" />,
  'Power Outlets': <Zap className="w-3 h-3" />,
};

export function SpaceCard({ space, onClick }: SpaceCardProps) {
  const status = statusConfig[space.status];

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl glass-card cursor-pointer",
        "transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10",
        "animate-slide-up"
      )}
      onClick={() => onClick(space)}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={space.image}
          alt={space.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        {/* Status Badge */}
        <Badge 
          className={cn(
            "absolute top-3 right-3 border",
            status.className
          )}
        >
          {status.label}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <div>
          <h3 className="font-heading text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {space.name}
          </h3>
          <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
            {space.description}
          </p>
        </div>

        {/* Info Row */}
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{space.city}, {space.area}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-primary" />
              <span>{space.capacity} people</span>
            </div>
            <span className="text-xs text-muted-foreground/70">{space.location}</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2">
          {space.amenities.slice(0, 4).map((amenity) => (
            <span
              key={amenity}
              className="flex items-center gap-1 px-2 py-1 text-xs bg-secondary/50 rounded-md text-muted-foreground"
            >
              {amenityIcons[amenity] || null}
              {amenity}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <span className="font-heading text-lg font-semibold text-primary">
            {space.price}
          </span>
          <Button 
            variant="glow" 
            size="sm"
            disabled={space.status !== 'available'}
          >
            {space.status === 'available' ? 'Book Now' : 'View Details'}
          </Button>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
      </div>
    </div>
  );
}
