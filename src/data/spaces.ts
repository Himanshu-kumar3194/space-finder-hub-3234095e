import { Space } from '@/types/space';

export const spacesData: Space[] = [
  {
    id: '1',
    name: 'Innovation Hub A',
    description: 'State-of-the-art workspace with high-speed WiFi, projectors, and collaborative seating.',
    capacity: 50,
    location: 'Building A, Floor 2',
    city: 'Mumbai',
    area: 'Andheri',
    amenities: ['WiFi', 'Projector', 'Whiteboard', 'AC'],
    status: 'available',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    price: '₹5,000/day',
    priceValue: 5000
  },
  {
    id: '2',
    name: 'Tech Arena B',
    description: 'Large open space perfect for team collaborations and presentations.',
    capacity: 100,
    location: 'Building B, Floor 1',
    city: 'Delhi',
    area: 'Connaught Place',
    amenities: ['WiFi', 'Stage', 'Sound System', 'AC'],
    status: 'booked',
    image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=800',
    price: '₹8,000/day',
    priceValue: 8000
  },
  {
    id: '3',
    name: 'Startup Zone C',
    description: 'Cozy environment with ergonomic furniture for focused work sessions.',
    capacity: 30,
    location: 'Building C, Floor 3',
    city: 'Bangalore',
    area: 'Koramangala',
    amenities: ['WiFi', 'Standing Desks', 'Coffee Machine'],
    status: 'allotted',
    image: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=800',
    price: '₹3,500/day',
    priceValue: 3500
  },
  {
    id: '4',
    name: 'Code Lab D',
    description: 'High-performance computing lab with developer-friendly setup.',
    capacity: 40,
    location: 'Building D, Floor 2',
    city: 'Mumbai',
    area: 'Bandra',
    amenities: ['High-Speed WiFi', 'Monitors', 'Power Outlets'],
    status: 'available',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800',
    price: '₹4,500/day',
    priceValue: 4500
  },
  {
    id: '5',
    name: 'Conference Hall E',
    description: 'Professional conference room with video conferencing facilities.',
    capacity: 25,
    location: 'Building E, Floor 1',
    city: 'Hyderabad',
    area: 'HITEC City',
    amenities: ['Video Conferencing', 'Projector', 'Microphones'],
    status: 'unavailable',
    image: 'https://images.unsplash.com/photo-1505409859467-3a796fd5798e?w=800',
    price: '₹6,000/day',
    priceValue: 6000
  },
  {
    id: '6',
    name: 'Maker Space F',
    description: 'Creative space with 3D printers, tools, and prototyping equipment.',
    capacity: 20,
    location: 'Building F, Ground Floor',
    city: 'Pune',
    area: 'Hinjewadi',
    amenities: ['3D Printers', 'Tools', 'Workbenches'],
    status: 'available',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
    price: '₹7,000/day',
    priceValue: 7000
  },
  {
    id: '7',
    name: 'Presentation Hall G',
    description: 'Large auditorium style hall for keynotes and demos.',
    capacity: 200,
    location: 'Building G, Floor 1',
    city: 'Delhi',
    area: 'Nehru Place',
    amenities: ['Stage', 'Lighting', 'Sound System', 'Recording'],
    status: 'booked',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    price: '₹15,000/day',
    priceValue: 15000
  },
  {
    id: '8',
    name: 'Breakout Room H',
    description: 'Small quiet room for team discussions and brainstorming.',
    capacity: 10,
    location: 'Building H, Floor 2',
    city: 'Bangalore',
    area: 'Whitefield',
    amenities: ['Whiteboard', 'TV Screen', 'Comfortable Seating'],
    status: 'allotted',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
    price: '₹2,000/day',
    priceValue: 2000
  },
];

// Extract unique cities and areas for filter options
export const cities = [...new Set(spacesData.map(s => s.city))];
export const areas = [...new Set(spacesData.map(s => s.area))];
export const priceRange = {
  min: Math.min(...spacesData.map(s => s.priceValue)),
  max: Math.max(...spacesData.map(s => s.priceValue))
};
