import Link from 'next/link';
import Image from 'next/image';
import PropertyStatusBadge from './PropertyStatusBadge';
import WhatsAppButton from './WhatsappBtn';
import { Property } from '@/utils/types/properties';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const {
    id,
    name,
    address,
    amount,
    intervals,
    status,
    image,
    units_left
  } = property;


  const formatPrice = () => {
    const formatted = parseFloat(amount).toLocaleString();
    return intervals ? `₦${formatted}/${intervals}` : `₦${formatted}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-48">
        <Image
          src={image?.startsWith('http') ? image : `https://migra.buyjet.ng/${image || 'default.jpg'}`}
          alt={name || 'Property image'}
          className="object-contain rounded-t-lg"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-2 right-2">
          <PropertyStatusBadge status={status} />
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-semibold mb-1 truncate">{name}</h3>
        <p className="text-gray-600 mb-2 text-sm">{address}</p>

        <div className="flex justify-between items-center mb-4">
          <p className="text-blue-600 font-bold text-lg">{formatPrice()}</p>
          {status === 'available' && (
            <WhatsAppButton
              message={`Hello, I'm interested in the property: ${name} (ID: ${id})`}
              small
            />
          )}
        </div>

   
        {typeof property.units_left === 'string' && (
          <p className="text-sm text-gray-700 mb-2">
            <span className="font-medium">Units left:</span> {property.units_left}
          </p>
        )}




        <Link
          href={`/properties/${id}`}
          className="block mt-4 text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
