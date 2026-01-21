import { Sponsor } from '@/types/sponsor';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Globe, Mail, Phone, MapPin } from 'lucide-react';

interface SponsorCardProps {
  sponsor: Sponsor;
  onEdit: (sponsor: Sponsor) => void;
  onDelete: (id: string) => void;
}

const tierColors: Record<string, string> = {
  platinum: 'bg-gradient-to-r from-slate-400 to-slate-200 text-slate-900',
  gold: 'bg-gradient-to-r from-yellow-500 to-amber-400 text-yellow-900',
  silver: 'bg-gradient-to-r from-gray-400 to-gray-300 text-gray-900',
  bronze: 'bg-gradient-to-r from-orange-600 to-orange-400 text-orange-100'
};

const tierGlow: Record<string, string> = {
  platinum: 'shadow-slate-400/30',
  gold: 'shadow-yellow-500/30',
  silver: 'shadow-gray-400/30',
  bronze: 'shadow-orange-500/30'
};

export const SponsorCard = ({ sponsor, onEdit, onDelete }: SponsorCardProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Card className={`glass-card group hover:scale-[1.02] transition-all duration-300 hover:shadow-xl ${tierGlow[sponsor.tier]} relative overflow-hidden`}>
      {/* Tier ribbon */}
      <div className={`absolute top-4 -right-8 rotate-45 px-10 py-1 text-xs font-bold uppercase ${tierColors[sponsor.tier]}`}>
        {sponsor.tier}
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Logo */}
          <div className="w-20 h-20 rounded-xl overflow-hidden bg-secondary/50 flex-shrink-0 border border-border/50">
            <img 
              src={sponsor.logo} 
              alt={sponsor.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-lg text-foreground truncate">{sponsor.name}</h3>
              <Badge variant={sponsor.isActive ? 'default' : 'secondary'} className="text-xs">
                {sponsor.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
              <MapPin className="w-3 h-3" />
              <span>{sponsor.area}, {sponsor.city}</span>
            </div>
            
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {sponsor.description}
            </p>
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <a href={sponsor.website} target="_blank" rel="noopener noreferrer" 
                className="flex items-center gap-1 hover:text-primary transition-colors">
                <Globe className="w-3 h-3" />
                Website
              </a>
              <a href={`mailto:${sponsor.contactEmail}`} 
                className="flex items-center gap-1 hover:text-primary transition-colors">
                <Mail className="w-3 h-3" />
                Email
              </a>
              <a href={`tel:${sponsor.contactPhone}`} 
                className="flex items-center gap-1 hover:text-primary transition-colors">
                <Phone className="w-3 h-3" />
                Call
              </a>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
          <div>
            <p className="text-xs text-muted-foreground">Contribution</p>
            <p className="text-lg font-bold text-primary">{formatCurrency(sponsor.contribution)}</p>
          </div>
          
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onEdit(sponsor)}
              className="gap-1"
            >
              <Edit className="w-4 h-4" />
              Edit
            </Button>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={() => onDelete(sponsor.id)}
              className="gap-1"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
