// data/properties.ts
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
        image: '/hero.jpg'
    },
    {
        id: '2',
        title: 'Modern Apartment',
        location: 'Lagos',
        type: 'Apartment',
        price: 120000,
        priceUnit: 'month',
        status: 'under-inspection',
        beds: 4,
        baths: 3,
        area: 2400,
        image: '/hero.jpg'
    },
];


