export type SponsorTier = 'platinum' | 'gold' | 'silver' | 'bronze';

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  tier: SponsorTier;
  area: string;
  city: string;
  website: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
  contribution: number;
  isActive: boolean;
  createdAt: string;
}

export interface SponsorFormData {
  name: string;
  logo: string;
  tier: SponsorTier;
  area: string;
  city: string;
  website: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
  contribution: number;
}
