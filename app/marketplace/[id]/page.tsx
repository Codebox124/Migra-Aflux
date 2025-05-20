'use client';

import { useParams } from 'next/navigation';
import { dummyMarketplaceItems } from '@/data/marketplace';
import { MarketplaceItem } from '@/utils/types/markepplace';
import Image from 'next/image';
import WhatsAppButton from '@/components/WhatsappBtn';
import Link from 'next/link';

export default function MarketplaceDetailPage() {
  const params = useParams();
  const itemId = params?.id;

  const item: MarketplaceItem | undefined = dummyMarketplaceItems.find(
    (itm) => itm.id.toString() === itemId
  );

  if (!item) {
    return (
      <div className="p-8 text-center text-gray-600">
        <p>Item not found.</p>
        <Link href="/marketplace" className="text-blue-600 hover:underline mt-4 block">
          Go back to marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 md:px-12 py-10">
      <div className="max-w-5xl mx-auto">
        <Link href="/marketplace" className="text-blue-600 hover:underline mb-6 inline-block">
          ← Back to Marketplace
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow">
            <Image
              src={item.image || '/hero.jpg'}
              alt={item.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{item.title}</h1>
              <p className="text-xl text-blue-600 font-semibold mb-4">
                ₦{item.price.toLocaleString()}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Location:</strong> {item.location}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Condition:</strong> {item.condition}
              </p>
              <p className="text-gray-700 mt-4 leading-relaxed">{item.description}</p>
            </div>

            <div className="mt-6">
              <WhatsAppButton
                message={`Hi, I'm interested in the item: ${item.title} (ID: ${item.id})`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
