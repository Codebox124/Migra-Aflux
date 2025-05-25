import { MarketplaceItem } from '@/utils/types/markepplace';
import Image from 'next/image';
import WhatsAppButton from './WhatsappBtn';
import Link from 'next/link';

interface ProductCardProps {
    product: MarketplaceItem;
}

export default function MarketplaceCard({ product }: ProductCardProps) {
    const {
        id,
        name,
        city,
        amount,
        condition,
        description,
        seller,
        is_active,
        image,
        category,
        units_left
    } = product;

    const formatPrice = () => {
        const formatted = parseFloat(amount).toLocaleString();
        return `₦${formatted}`;
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100">
            <div className="relative h-56">
                <div className="absolute inset-0 bg-gray-100">
                    <Image
                        src={image?.startsWith('http') ? image : `https://migra.buyjet.ng/${image || 'default.jpg'}`}
                        alt={name || 'Product image'}
                        className="object-contain rounded-t-lg"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/60 to-transparent"></div>

                {/* Location badge */}
                <div className="absolute bottom-3 left-3 bg-white/90 text-gray-800 px-2 py-1 rounded-lg text-xs font-medium flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {city}
                </div>

                {/* Condition badge */}
                <div className="absolute bottom-3 right-3 bg-blue-600 text-white px-2 py-1 rounded-lg text-xs font-medium">
                    {condition}
                </div>

                {/* Category badge */}
                <div className="absolute top-3 left-3 bg-green-600 text-white px-2 py-1 rounded-lg text-xs font-medium capitalize">
                    {category}
                </div>

                {/* Status indicator */}
                {!is_active && (
                    <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 rounded-lg text-xs font-medium">
                        Inactive
                    </div>
                )}
            </div>

            <div className="p-5">
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{name}</h3>

                {/* Price, WhatsApp, Units left */}
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <p className="text-blue-700 font-bold text-xl">{formatPrice()}</p>
                        <div className="mt-1 text-xs text-gray-600 bg-gray-100 inline-block px-2 py-0.5 rounded-md">
                            <span className="font-medium">Units left:</span> {units_left || 0}
                        </div>
                    </div>
                    <WhatsAppButton
                        message={`Hello, I'm interested in the product: ${name} (ID: ${id})`}
                        small
                    />
                </div>

                {/* Seller info */}
                <div className="mb-3">
                    <p className="text-sm text-gray-500">
                        <span className="font-medium">Seller:</span> {seller}
                    </p>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>

                {/* View Details */}
                <Link
                    href={`/marketplace/${id}`}
                    className="block w-full text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 px-4 rounded-lg font-medium transition-all hover:from-blue-700 hover:to-blue-800 hover:shadow-md"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}
