// components/PropertyList.tsx
'use client';

import { useState, useEffect } from 'react';
import PropertyCard from './PropertiesCard';
import { dummyProperties } from '@/data/properties';
import { Property } from '@/utils/types/properties';

interface PropertyListProps {
  featured?: boolean;
  limit?: number;
}

export default function PropertyList({ featured = false, limit = 6 }: PropertyListProps) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log('Attempting to fetch properties from API...');
        
        const response = await fetch('https://migra.buyjet.ng/api/listings', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          // Add timeout
          signal: AbortSignal.timeout(10000) // 10 second timeout
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
          throw new Error(`API returned ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Raw API response:', data);

        // Handle different possible API response structures
        let propertiesArray: any[] = [];
        
        if (Array.isArray(data)) {
          propertiesArray = data;
          console.log('Data is direct array');
        } else if (data?.data) {
          if (Array.isArray(data.data)) {
            propertiesArray = data.data;
            console.log('Data found in data.data');
          } else if (data.data?.data && Array.isArray(data.data.data)) {
            propertiesArray = data.data.data;
            console.log('Data found in data.data.data');
          }
        } else if (data?.listings && Array.isArray(data.listings)) {
          propertiesArray = data.listings;
          console.log('Data found in data.listings');
        } else {
          console.warn('Unknown API response structure:', data);
          throw new Error('API response does not contain expected property array');
        }

        console.log(`Found ${propertiesArray.length} properties from API`);

        if (propertiesArray.length === 0) {
          console.log('No properties returned from API, using dummy data');
          let filtered = dummyProperties;
          if (featured) {
            filtered = filtered.filter(p => p.status === 'available' && p.is_active);
          }
          setProperties(filtered.slice(0, limit));
          return;
        }

        // Map API data to Property type
        const mappedProperties: Property[] = propertiesArray.map((item: any, index: number) => {
          console.log(`Mapping property ${index + 1}:`, item);
          
          return {
            id: item.id || index + 1,
            name: item.name || item.title || `Property ${index + 1}`,
            description: item.description || 'No description available',
            slug: item.slug || `property-${item.id || index + 1}`,
            image: item.image || item.thumbnail || '',
            video_url: item.video_url || '',
            city: item.city || item.location || 'Unknown Location',
            address: item.address || item.full_address || '',
            amount: String(item.amount || item.price || '0'),
            intervals: item.intervals || item.rental_period || '',
            tags: item.tags || null,
            status: item.status || 'available',
            property_type: item.property_type || item.type || 'residential',
            is_active: item.is_active !== undefined ? Boolean(item.is_active) : true,
            created_at: item.created_at || new Date().toISOString(),
            updated_at: item.updated_at || new Date().toISOString(),
          };
        });

        console.log('Mapped properties:', mappedProperties);

        let filtered = mappedProperties;

        // Filter for featured/available properties if requested
        if (featured) {
          filtered = filtered.filter((p: Property) => {
            const isAvailable = p.status === 'available';
            const isActive = p.is_active === true;
            console.log(`Property ${p.name}: available=${isAvailable}, active=${isActive}`);
            return isAvailable && isActive;
          });
          console.log(`After filtering for featured: ${filtered.length} properties`);
        }

        // Limit the results
        const limitedProperties = filtered.slice(0, limit);
        console.log(`Final properties to display: ${limitedProperties.length}`);
        
        setProperties(limitedProperties);

      } catch (error) {
        console.error('Error fetching properties:', error);
        
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Unknown error occurred while fetching properties');
        }

        // Always fallback to dummy data on error
        console.log('Using dummy data as fallback due to error');
        let filtered = dummyProperties;
        if (featured) {
          filtered = filtered.filter(p => p.status === 'available' && p.is_active);
        }
        setProperties(filtered.slice(0, limit));
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [featured, limit]);

  if (loading) {
    return (
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(limit)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
              <div className="h-48 bg-gray-200 rounded-md mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
              <div className="flex justify-between items-center">
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              </div>
              <div className="flex justify-between mt-2">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Don't show error message if we have fallback data
  if (error && properties.length === 0) {
    return (
      <div className="text-center py-10">
        <div className="text-orange-500 mb-2">⚠️ {error}</div>
        <p className="text-gray-600">Please try again later</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-10">
        <div className="text-6xl mb-4">🏠</div>
        <h3 className="text-xl font-semibold mb-2 text-gray-700">No Properties Found</h3>
        <p className="text-gray-500">
          {featured ? 'No featured properties available at the moment.' : 'No properties available at the moment.'}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Show subtle warning if using fallback data */}
      {error && properties.length > 0 && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            ⚠️ Using cached data due to API issue. Some properties may not be up to date.
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}