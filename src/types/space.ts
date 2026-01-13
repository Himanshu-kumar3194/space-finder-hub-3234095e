export type SpaceStatus = 'available' | 'unavailable' | 'booked' | 'allotted';

export interface Space {
  id: string;
  name: string;
  description: string;
  capacity: number;
  location: string;
  amenities: string[];
  status: SpaceStatus;
  image: string;
  price?: string;
}
