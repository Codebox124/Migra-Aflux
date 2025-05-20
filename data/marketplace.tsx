// data/marketplace.ts

import { MarketplaceItem } from "@/utils/types/markepplace";


export const dummyMarketplaceItems: MarketplaceItem[] = [
    {
        id: '1',
        title: 'Used Generator',
        description: '7KVA diesel generator, working perfectly.',
        price: 150000,
        category: 'Electronics',
        condition: 'used',
        location: 'Lagos',
        image: '/OIP.jpeg',
        sellerName: 'John Doe',
        status: 'available',
    },
    {
        id: '2',
        title: '3 Bedroom Flat for Rent',
        description: 'Spacious flat in a serene environment.',
        price: 350000,
        category: 'Real Estate',
        condition: 'used',
        location: 'Ibadan',
        image: '/OIP.jpeg',
        sellerName: 'Jane Smith',
        status: 'available',
    },
    // Add 8 more items as needed
];
