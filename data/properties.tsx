import { Property } from '@/utils/types/properties';

export const dummyProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Apartment',
    location: 'Lagos',
    type: 'Apartment',
    price: 120000,
    priceUnit: 'month',
    status: 'available',
    beds: 4,
    baths: 3,
    area: 2400,
    image: '/hero.jpg',
    description: 'A modern and spacious apartment located in the heart of Lagos. Close to malls, schools, and public transport.',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: '2',
    title: 'Luxury Villa',
    location: 'Abuja',
    type: 'Villa',
    price: 450000,
    priceUnit: 'total',
    status: 'under-inspection',
    beds: 5,
    baths: 4,
    area: 3800,
    image: '/hero.jpg',
    description: 'Experience luxury living in this elegant villa. Comes with a private pool, garden, and garage.',
    videoUrl: 'https://www.youtube.com/watch?v=5qap5aO4i9A'
  },
];
