// components/MarketplaceCard.tsx

import { MarketplaceItem } from '@/utils/types/markepplace';
import Image from 'next/image';
import WhatsAppButton from './WhatsappBtn';
import Link from 'next/link';

export default function MarketplaceCard({ item }: { item: MarketplaceItem }) {


    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
            <div className="relative h-64">
                <Image
                    src={item.image || "/hero.jpg"}
                    alt={item.title}
                    className="object-contain"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

            </div>

            <div className="p-4">
                <h3 className="text-xl font-semibold mb-1 truncate">{item.title}</h3>


                <div className="flex justify-between items-center mb-4">
                    <p className="text-blue-600 font-semibold mb-1">₦{item.price.toLocaleString()}</p>
                    <WhatsAppButton
                        message={`Hello, I'm interested in the property: ${item.title} (ID: ${item.id})`}
                        small
                    />


                </div>
                <p className="text-gray-600 text-sm mb-2">{item.location} • {item.condition}</p>

                <p className="text-sm text-gray-500">{item.description.substring(0, 60)}...</p>


                <Link href={`/marketplace/${item.id}`} className="block mt-4 text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                    View Details
                </Link>
            </div>
        </div>
        
    );
}
