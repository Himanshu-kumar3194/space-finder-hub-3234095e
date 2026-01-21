import { Sponsor } from '@/types/sponsor';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Trophy, TrendingUp, MapPin } from 'lucide-react';

interface SponsorStatsProps {
  sponsors: Sponsor[];
}

export const SponsorStats = ({ sponsors }: SponsorStatsProps) => {
  const totalContribution = sponsors.reduce((sum, s) => sum + s.contribution, 0);
  const activeSponsors = sponsors.filter(s => s.isActive).length;
  const platinumCount = sponsors.filter(s => s.tier === 'platinum').length;
  const uniqueCities = new Set(sponsors.map(s => s.city)).size;

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)}Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const stats = [
    {
      label: 'Total Sponsors',
      value: sponsors.length,
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Active Sponsors',
      value: activeSponsors,
      icon: Trophy,
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Total Contribution',
      value: formatCurrency(totalContribution),
      icon: TrendingUp,
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      label: 'Cities Covered',
      value: uniqueCities,
      icon: MapPin,
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="glass-card hover:scale-105 transition-transform duration-300">
          <CardContent className="p-4 flex items-center gap-4">
            <div className={`p-3 rounded-xl ${stat.bgColor}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
