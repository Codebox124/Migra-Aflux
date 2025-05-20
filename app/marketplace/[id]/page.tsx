'use client';

import { useParams } from 'next/navigation';
import { dummyMarketplaceItems } from '@/data/marketplace';
import { MarketplaceItem } from '@/utils/types/markepplace';
import Image from 'next/image';
import WhatsAppButton from '@/components/WhatsappBtn';
import Link from 'next/link';
import { ArrowLeft, MapPin, Tag, Clock, Shield } from 'lucide-react';

export default function MarketplaceDetailPage() {
  const params = useParams();
  const itemId = params?.id;

  const item: MarketplaceItem | undefined = dummyMarketplaceItems.find(
    (itm) => itm.id.toString() === itemId
  );

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-8 rounded-xl shadow-md max-w-md w-full">
          <div className="mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Item Not Found</h2>
          <p className="text-gray-600 mb-6">The item you're looking for doesn't exist or has been removed.</p>
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

  // Get related items (excluding current item)
  const relatedItems = dummyMarketplaceItems
    .filter(relatedItem => relatedItem.id !== item.id)
    .slice(0, 3);

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
            <span className="text-gray-800 font-medium truncate">{item.title}</span>
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
                  src={item.image || '/hero.jpg'}
                  alt={item.title}
                  fill
                  className="object-cover"
                  priority
                />
                
               
              
              </div>
            </div>

            {/* Details section */}
            <div className="p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{item.title}</h1>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                    ID: {item.id}
                  </span>
                </div>

                {/* Price section */}
                <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                  <p className="text-2xl md:text-3xl text-blue-700 font-bold">
                    ₦{item.price.toLocaleString()}
                  </p>
                </div>

                {/* Item details */}
                <div className="mt-6 space-y-4">
                  <div className="flex items-center text-gray-700">
                    <MapPin size={18} className="mr-2 text-blue-600" />
                    <span><strong>Location:</strong> {item.location}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-700">
                    <Tag size={18} className="mr-2 text-blue-600" />
                    <span><strong>Condition:</strong> {item.condition}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-700">
                    <Clock size={18} className="mr-2 text-blue-600" />
                    <span><strong>Seller:</strong> {item.sellerName || "Recently"}</span>
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
                    message={`Hi, I'm interested in the item: ${item.title} (ID: ${item.id})`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

      
        {relatedItems.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Items</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedItems.map((relatedItem) => (
                <div key={relatedItem.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <Link href={`/marketplace/${relatedItem.id}`}>
                    <div className="relative h-48">
                      <Image
                        src={relatedItem.image || '/hero.jpg'}
                        alt={relatedItem.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-1 truncate">{relatedItem.title}</h3>
                      <p className="text-blue-600 font-bold">₦{relatedItem.price.toLocaleString()}</p>
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