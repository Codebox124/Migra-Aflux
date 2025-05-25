'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import PropertyStatusBadge from '@/components/PropertyStatusBadge';
import Image from 'next/image';
import { Property } from '@/utils/types/properties';

// Loading component
const LoadingSpinner = () => (
    <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
);

// Error component
const ErrorMessage = ({ message }: { message: string }) => (
    <div className="max-w-5xl mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p className="font-medium">Error:</p>
            <p>{message}</p>
        </div>
    </div>
);

export default function PropertyDetailsPage() {
    const { id } = useParams();
    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProperty = async () => {
            if (!id) return;

            try {
                setLoading(true);
                setError(null);

                const response = await fetch(`https://migra.buyjet.ng/api/listings/${id}`);

                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error('Property not found');
                    }
                    throw new Error(`Failed to fetch property: ${response.status}`);
                }

                const data = await response.json();
                console.log('Raw API response:', data);
                console.log('Data type:', typeof data);
                console.log('Data keys:', Object.keys(data));

                // Check if data is wrapped in another object
                const propertyData = data.data || data.property || data;
                console.log('Property data to use:', propertyData);

                setProperty(propertyData);
            } catch (err) {
                console.error('Error fetching property:', err);
                setError(err instanceof Error ? err.message : 'Failed to load property');
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [id]);

    // Loading state
    if (loading) {
        return <LoadingSpinner />;
    }

    // Error state
    if (error) {
        return <ErrorMessage message={error} />;
    }

    // Property not found
    if (!property) {
        return (
            <div className="max-w-5xl mx-auto p-6">
                <div className="text-center py-12">
                    <h1 className="text-2xl font-bold text-gray-700 mb-4">Property Not Found</h1>
                    <p className="text-gray-500">The requested property could not be found.</p>
                </div>
            </div>
        );
    }

    const { name, image, address, description, video_url, amount, status, intervals, other_images } = property;

    // Debug log the destructured values
    console.log('Destructured values:', {
        name,
        image,
        address,
        description,
        video_url,
        amount,
        status,
        intervals
    });

    const formatPrice = () => {
        if (!amount) return 'Price not available';
        const formatted = parseFloat(amount.toString()).toLocaleString();
        return intervals ? `₦${formatted}/${intervals}` : `₦${formatted}`;
    };

    const getImageSrc = () => {
        if (!image) return '/hero.jpg';
        return image.startsWith('http') ? image : `https://migra.buyjet.ng/${image}`;
    };

    const additionalImages = other_images
        ? other_images.split(',').map((img: string) => `https://migra.buyjet.ng/${img.trim()}`)
        : [];
    return (
        <div className="max-w-7xl mx-auto p-6 space-y-6">
            <div className="flex items-start justify-between flex-wrap gap-4">
                <h1 className="text-3xl font-bold">{name || 'Property Details'}</h1>
                <PropertyStatusBadge status={status} />
            </div>

            <div className="relative w-full h-96 rounded-lg overflow-hidden bg-gray-100">
                <Image
                    src={getImageSrc()}
                    alt={name || 'Property image'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    priority
                />
            </div>

            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="text-2xl font-bold text-blue-600">{formatPrice()}</div>
                {address && <p className="text-gray-700 text-lg">{address}</p>}
            </div>

            {description && (
                <div className="bg-gray-50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Description</h2>
                    <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {description}
                    </div>
                </div>
            )}
            {additionalImages.length > 0 && (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-4">More Images</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {additionalImages.map((imgUrl, idx) => (
                            <div
                                key={idx}
                                className="relative w-full h-72 sm:h-80 md:h-96 bg-gray-100 rounded-lg overflow-hidden"
                            >
                                <Image
                                    src={imgUrl}
                                    alt={`Additional property image ${idx + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}



            {video_url && (
                <div className="bg-gray-50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Video Tour</h2>
                    <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
                        <iframe
                            src={video_url.replace('watch?v=', 'embed/')}
                            title="Property Tour"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                        />
                    </div>
                </div>
            )}
            <div className="pt-6 border-t">
                <button
                    onClick={() => window.history.back()}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md transition-colors"
                >
                    ← Back to Properties
                </button>
            </div>

            {/* <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
                <h3 className="text-lg font-semibold mb-2">Debug Info (remove in production):</h3>
                <pre className="text-sm bg-gray-100 p-3 rounded overflow-auto">
                    {JSON.stringify(property, null, 2)}
                </pre>
            </div> */}
        </div>
    );
}