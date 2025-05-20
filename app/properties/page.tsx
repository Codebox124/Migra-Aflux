'use client'
import PropertyCard from '@/components/PropertiesCard'
import PropertyFilters from '@/components/PropertiesFilter'
import { dummyProperties } from '@/data/properties'
import { Property } from '@/utils/types/properties'
import { Search } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

type PropertyStatus = 'available' | 'under-inspection' | 'unavailable';

export default function Page() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState<{ status?: PropertyStatus; type?: string }>({});
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            setLoading(true);
            try {
               
                let filtered = dummyProperties;

               

                setProperties(filtered);
            } catch (error) {
                console.error('Error fetching properties:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    const filteredProperties = properties.filter((property) => {
        const matchesSearch =
            searchQuery === '' ||
            property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            property.location.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = !filters.status || property.status === filters.status;
        const matchesType = !filters.type || property.type === filters.type;

        return matchesSearch && matchesStatus && matchesType;
    });

    return (
        <div className="text-black bg-white mx-auto px-4 md:px-8 py-8">
          

         
            <div className="relative mb-6">
                <input
                    type="text"
                    placeholder="Search by location or property name..."
                    className="w-full px-4 py-3 pl-10 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
            </div>

            <div className="flex flex-col md:flex-row gap-6">
           
                <div className="md:w-1/4">
                    <PropertyFilters onFilterChange={setFilters} />

                    <div className="bg-white rounded-lg shadow p-4 mt-6">
                        <h3 className="text-lg font-semibold mb-4">Payment Assistance</h3>
                        <Link href="/chat">
                            <button className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-medium flex justify-center items-center">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16z" fillRule="evenodd" />
                                </svg>
                                Payment Support
                            </button>
                        </Link>
                    </div>
                </div>

             
                <div className="md:w-3/4 md:h-screen md:overflow-y-auto">
                    {loading ? (
                        <div className="text-center py-10 text-gray-500">Loading properties...</div>
                    ) : filteredProperties.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProperties.map((property) => (
                                <PropertyCard key={property.id} property={property} />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow p-8 text-center">
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">No properties found</h3>
                            <p className="text-gray-500">Try adjusting your search criteria or filters</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
