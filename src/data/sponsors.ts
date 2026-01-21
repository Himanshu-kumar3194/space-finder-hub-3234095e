import { Sponsor } from '@/types/sponsor';

export const initialSponsors: Sponsor[] = [
  {
    id: '1',
    name: 'TechCorp Industries',
    logo: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=200&h=200&fit=crop',
    tier: 'platinum',
    area: 'Koramangala',
    city: 'Bangalore',
    website: 'https://techcorp.com',
    description: 'Leading technology solutions provider specializing in AI and cloud computing.',
    contactEmail: 'sponsors@techcorp.com',
    contactPhone: '+91 9876543210',
    contribution: 500000,
    isActive: true,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'InnovateLabs',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop',
    tier: 'gold',
    area: 'Whitefield',
    city: 'Bangalore',
    website: 'https://innovatelabs.io',
    description: 'Innovation hub focused on emerging technologies and startup ecosystem.',
    contactEmail: 'hello@innovatelabs.io',
    contactPhone: '+91 9876543211',
    contribution: 300000,
    isActive: true,
    createdAt: '2024-01-20'
  },
  {
    id: '3',
    name: 'DataDrive Solutions',
    logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=200&h=200&fit=crop',
    tier: 'silver',
    area: 'Andheri',
    city: 'Mumbai',
    website: 'https://datadrive.com',
    description: 'Data analytics and business intelligence solutions for enterprises.',
    contactEmail: 'contact@datadrive.com',
    contactPhone: '+91 9876543212',
    contribution: 150000,
    isActive: true,
    createdAt: '2024-02-01'
  },
  {
    id: '4',
    name: 'CloudNine Tech',
    logo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=200&fit=crop',
    tier: 'bronze',
    area: 'Powai',
    city: 'Mumbai',
    website: 'https://cloudnine.tech',
    description: 'Cloud infrastructure and DevOps consulting services.',
    contactEmail: 'info@cloudnine.tech',
    contactPhone: '+91 9876543213',
    contribution: 75000,
    isActive: true,
    createdAt: '2024-02-10'
  },
  {
    id: '5',
    name: 'CyberSecure Pro',
    logo: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=200&h=200&fit=crop',
    tier: 'gold',
    area: 'Connaught Place',
    city: 'Delhi',
    website: 'https://cybersecurepro.com',
    description: 'Enterprise cybersecurity solutions and threat intelligence.',
    contactEmail: 'security@cybersecurepro.com',
    contactPhone: '+91 9876543214',
    contribution: 250000,
    isActive: false,
    createdAt: '2024-02-15'
  },
  {
    id: '6',
    name: 'AI Nexus',
    logo: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=200&h=200&fit=crop',
    tier: 'platinum',
    area: 'Gurgaon',
    city: 'Delhi',
    website: 'https://ainexus.ai',
    description: 'Cutting-edge artificial intelligence and machine learning solutions.',
    contactEmail: 'partnerships@ainexus.ai',
    contactPhone: '+91 9876543215',
    contribution: 450000,
    isActive: true,
    createdAt: '2024-02-20'
  }
];

export const cities = ['All Cities', 'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai'];
export const areas: Record<string, string[]> = {
  'All Cities': ['All Areas'],
  'Bangalore': ['All Areas', 'Koramangala', 'Whitefield', 'Electronic City', 'Indiranagar', 'HSR Layout'],
  'Mumbai': ['All Areas', 'Andheri', 'Powai', 'Bandra', 'Lower Parel', 'BKC'],
  'Delhi': ['All Areas', 'Connaught Place', 'Gurgaon', 'Noida', 'Dwarka', 'Saket'],
  'Hyderabad': ['All Areas', 'HITEC City', 'Gachibowli', 'Madhapur', 'Jubilee Hills'],
  'Chennai': ['All Areas', 'OMR', 'T Nagar', 'Adyar', 'Velachery']
};
export const tiers = ['all', 'platinum', 'gold', 'silver', 'bronze'];
