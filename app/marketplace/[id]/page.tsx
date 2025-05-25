'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { MarketplaceItem } from '@/utils/types/markepplace';
import Image from 'next/image';
import WhatsAppButton from '@/components/WhatsappBtn';
import Link from 'next/link';
import { ArrowLeft, MapPin, Tag, Clock, Shield, Loader2 } from 'lucide-react';

export default function MarketplaceDetailPage() {
  const params = useParams();
  const itemId = params?.id;

  const [item, setItem] = useState<MarketplaceItem | null>(null);
  const [relatedItems, setRelatedItems] = useState<MarketplaceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchItemData = async () => {
      if (!itemId) return;

      try {
        setLoading(true);
        setError(null);

        // Fetch the specific item
        const itemResponse = await fetch(`https://migra.buyjet.ng/api/products/${itemId}`);

        if (!itemResponse.ok) {
          throw new Error(`Failed to fetch item: ${itemResponse.status}`);
        }

        const itemData = await itemResponse.json();
        console.log('API Response:', itemData); // Debug log to see the actual structure

        // Handle different possible API response structures
        const actualItem = itemData.data || itemData.product || itemData;
        setItem(actualItem);

        // Fetch related items (you might want to adjust this endpoint based on your API)
        try {
          const relatedResponse = await fetch('https://migra.buyjet.ng/api/products?limit=4');
          if (relatedResponse.ok) {
            const relatedData = await relatedResponse.json();
            console.log('Related items response:', relatedData); // Debug log

            // Handle different possible API response structures for related items
            let itemsArray = [];
            if (Array.isArray(relatedData)) {
              itemsArray = relatedData;
            } else if (relatedData.data && Array.isArray(relatedData.data)) {
              itemsArray = relatedData.data;
            } else if (relatedData.products && Array.isArray(relatedData.products)) {
              itemsArray = relatedData.products;
            }

            // Filter out the current item and limit to 3 items
            const filteredRelated = itemsArray
              .filter((relatedItem: any) => relatedItem.id?.toString() !== itemId)
              .slice(0, 3);
            setRelatedItems(filteredRelated);
          }
        } catch (relatedError) {
          console.warn('Failed to fetch related items:', relatedError);
          // Continue without related items
        }

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch item data');
        console.error('Error fetching item:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchItemData();
  }, [itemId]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading item details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-8 rounded-xl shadow-md max-w-md w-full">
          <div className="mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {error ? 'Error Loading Item' : 'Item Not Found'}
          </h2>
          <p className="text-gray-600 mb-6">
            {error || "The item you're looking for doesn't exist or has been removed."}
          </p>
          <Link
            href="/marketplace"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg transition-colors hover:bg-blue-700"
          >
            <ArrowLeft size={16} className="mr-2" />
            Return to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  const {
    id,
    name,
    city,
    amount,
    condition,
    description,
    seller,
    is_active,
    other_images,
    image,
    category,
  } = item;



  const additionalImages = other_images
    ? other_images.split(',').map((img: string) => `https://migra.buyjet.ng/${img.trim()}`)
    : [];


  const getImageSrc = () => {
    if (!image) return '/hero.jpg';
    return image.startsWith('http') ? image : `https://migra.buyjet.ng/${image}`;
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/marketplace" className="text-gray-500 hover:text-gray-700">Marketplace</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-800 font-medium truncate">{name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/marketplace" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft size={16} className="mr-1" />
            <span>Back to Marketplace</span>
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image section */}
            <div className="relative">
              {/* Main image */}
              <div className="relative w-full h-[400px] md:h-[500px]">
                <Image
                  src={getImageSrc()}
                  alt={item.name}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Details section */}
            <div className="p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{item.name}</h1>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                    ID: {item.id}
                  </span>
                </div>

                {/* Price section */}
                <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                  <p className="text-2xl md:text-3xl text-blue-700 font-bold">
                    ₦{item.amount.toLocaleString()}
                  </p>
                </div>

                {/* Item details */}
                <div className="mt-6 space-y-4">
                  <div className="flex items-center text-gray-700">
                    <MapPin size={18} className="mr-2 text-blue-600" />
                    <span><strong>Location:</strong> {item.city}</span>
                  </div>

                  <div className="flex items-center text-gray-700">
                    <Tag size={18} className="mr-2 text-blue-600" />
                    <span><strong>Condition:</strong> {item.condition}</span>
                  </div>

                  <div className="flex items-center text-gray-700">
                    <Clock size={18} className="mr-2 text-blue-600" />
                    <span><strong>Seller:</strong> {item.seller || "Recently"}</span>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>

              {/* Contact section */}
              <div className="mt-8 border-t border-gray-200 pt-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center">
                    <Shield size={20} className="text-green-600 mr-2" />
                    <span className="text-sm text-gray-600">Secure Transaction</span>
                  </div>
                  <WhatsAppButton
                    message={`Hi, I'm interested in the item: ${item.name} (ID: ${item.id})`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {additionalImages.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">More Images</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {additionalImages.map((imgUrl, idx) => (
                <div key={idx} className="relative w-full aspect-square bg-gray-100 rounded overflow-hidden">
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


        {/* Related Items */}
        {relatedItems.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Items</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 md:gap-6 gap-3">
              {relatedItems.map((relatedItem) => (
                <div key={relatedItem.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <Link href={`/marketplace/${relatedItem.id}`}>
                    <div className="relative h-48">
                      <Image
                        src={relatedItem.image || '/hero.jpg'}
                        alt={relatedItem.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-1 truncate">{relatedItem.name}</h3>
                      <p className="text-blue-600 font-bold">₦{relatedItem.amount.toLocaleString()}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}