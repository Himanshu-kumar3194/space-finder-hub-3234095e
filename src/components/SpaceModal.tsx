import { Space } from '@/types/space';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Calendar, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SpaceModalProps {
  space: Space | null;
  isOpen: boolean;
  onClose: () => void;
}

const statusColors = {
  available: 'bg-success/20 text-success border-success/30',
  unavailable: 'bg-destructive/20 text-destructive border-destructive/30',
  booked: 'bg-warning/20 text-warning border-warning/30',
  allotted: 'bg-accent/20 text-accent border-accent/30',
};

export function SpaceModal({ space, isOpen, onClose }: SpaceModalProps) {
  if (!space) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl glass-card border-border/50 p-0 overflow-hidden">
        {/* Image Header */}
        <div className="relative h-56">
          <img
            src={space.image}
            alt={space.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <Badge 
            className={cn(
              "absolute top-4 right-4 border capitalize",
              statusColors[space.status]
            )}
          >
            {space.status}
          </Badge>
        </div>

        <div className="p-6 space-y-6">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl">{space.name}</DialogTitle>
            <p className="text-muted-foreground">{space.description}</p>
          </DialogHeader>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">City & Area</p>
                <p className="font-medium">{space.city}, {space.area}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Capacity</p>
                <p className="font-medium">{space.capacity} people</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg col-span-2">
              <MapPin className="w-5 h-5 text-accent" />
              <div>
                <p className="text-xs text-muted-foreground">Address</p>
                <p className="font-medium">{space.location}</p>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h4 className="font-heading font-semibold mb-3">Amenities</h4>
            <div className="flex flex-wrap gap-2">
              {space.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm bg-secondary/50 rounded-lg"
                >
                  <Check className="w-3 h-3 text-success" />
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div>
              <p className="text-sm text-muted-foreground">Price</p>
              <p className="font-heading text-2xl font-bold text-primary">{space.price}</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              {space.status === 'available' && (
                <Button variant="glow" className="gap-2">
                  <Calendar className="w-4 h-4" />
                  Book This Space
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
