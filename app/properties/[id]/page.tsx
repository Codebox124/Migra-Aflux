'use client';

import { useParams } from 'next/navigation';
import { dummyProperties } from '@/data/properties';
import PropertyStatusBadge from '@/components/PropertyStatusBadge';
import Image from 'next/image';

export default function PropertyDetailsPage() {
    const { id } = useParams();
    const property = dummyProperties.find((p) => p.id === id);

    if (!property) {
        return <div className="p-6">Property not found</div>;
    }

    const { title, image, location, description, videoUrl, price, priceUnit, status, beds, baths, area } = property;

    const formatPrice = () =>
        priceUnit === 'month' ? `$${price.toLocaleString()}/month` : `$${price.toLocaleString()}`;

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold">{title}</h1>
            <PropertyStatusBadge status={status} />

            <div className="relative w-full h-96 rounded overflow-hidden">
                <Image
                    src={image || '/hero.jpg'}
                    alt={title}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="text-xl font-semibold text-blue-600">{formatPrice()}</div>
            <p className="text-gray-700">{location}</p>

            <div className="flex space-x-4 text-sm text-gray-500">
                <span>{beds} {beds === 1 ? 'Bed' : 'Beds'}</span>
                <span>{baths} {baths === 1 ? 'Bath' : 'Baths'}</span>
                <span>{area} sq ft</span>
            </div>

            {description && (
                <div>
                    <h2 className="text-xl font-semibold mt-6 mb-2">Description</h2>
                    <p className="text-gray-600">{description}</p>
                </div>
            )}

            {videoUrl && (
                <div>
                    <h2 className="text-xl font-semibold mt-6 mb-2">Video Tour</h2>
                    <div className="aspect-video w-full rounded-lg overflow-hidden">
                        <iframe
                            src={videoUrl.replace('watch?v=', 'embed/')}
                            title="Property Tour"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
