export type SpaceStatus = 'available' | 'unavailable' | 'booked' | 'allotted';

export interface Space {
  id: string;
  name: string;
  description: string;
  capacity: number;
  location: string;
  city: string;
  area: string;
  amenities: string[];
  status: SpaceStatus;
  image: string;
  price: string;
  priceValue: number; // numeric value for filtering
}

export interface AdvancedFilters {
  city: string;
  area: string;
  minBudget: number;
  maxBudget: number;
}
