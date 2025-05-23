// components/PropertyList.tsx
'use client';

import { useState, useEffect } from 'react';
import PropertyCard from './PropertiesCard';
import { dummyProperties } from '@/data/properties';
import { Property } from '@/utils/types/properties';


export default function PropertyList({ featured = false, limit = 6 }) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      const response = await fetch('https://migra.buyjet.ng/api/listings');
      setLoading(true);
      const data = await response.json();
      try {
        let filtered = data;
        if (featured) {
          filtered = filtered.filter(p => p.status === 'available');
        }

        setProperties(filtered.slice(0, limit));
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };


    fetchProperties();
  }, [featured, limit]);

  // useEffect(() => {
  //   const fetchProperties = async () => {
  //     setLoading(true);
  //   try {
  //     let filtered = dummyProperties;
  //     if (featured) {
  //       filtered = filtered.filter(p => p.status === 'available');
  //     }

  //     setProperties(filtered.slice(0, limit));
  //   } catch (error) {
  //     console.error('Error fetching properties:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  //   fetchProperties();
  // }, [featured, limit]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(limit)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
            <div className="h-48 bg-gray-200 rounded-md mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="flex justify-between">
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {properties.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
