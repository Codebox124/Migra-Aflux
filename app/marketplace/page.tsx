'use client';

import { useState, useEffect, useRef } from 'react';
import { dummyMarketplaceItems } from '@/data/marketplace';
import { MarketplaceItem } from '@/utils/types/markepplace';
import MarketplaceCard from '@/components/MarketPlaceCard';

export default function MarketplacePage() {
    const [items, setItems] = useState<MarketplaceItem[]>([]);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const resultRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchProperties = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://migra.buyjet.ng/api/products');

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Fetched data:', data);

                const adaptedData: MarketplaceItem[] = Array.isArray(data?.data?.data)
                    ? data.data.data.map((item: any) => ({
                        id: item.id,
                        name: item.name,
                        city: item.city,
                        amount: item.amount ?? '0',
                        image: item.image,
                        condition: item.condition,
                    }))
                    : [];

                setItems(adaptedData);
            } catch (error) {
                console.error('Failed to fetch properties:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    const allCategories = ['All', ...Array.from(new Set(items.map(item => item.category)))];

    const filteredItems = items.filter(item => {
        const matchesSearch =
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.city.toLowerCase().includes(search.toLowerCase()) ||
            item.category.toLowerCase().includes(search.toLowerCase());

        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
        resultRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="bg-white px-4 md:px-10 py-10 min-h-screen text-black">


            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-6">
                <input
                    type="text"
                    placeholder="🔍 Search for products, categories, or location..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Category Tabs */}
            <div className="overflow-x-auto mb-8">
                <div className="flex space-x-6 px-2 min-w-max border-b">
                    {allCategories.map((category, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleCategoryClick(category)}
                            className={`pb-2 text-sm font-medium whitespace-nowrap transition-all duration-200 ${selectedCategory === category
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-500 hover:text-blue-500'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Items */}
            <div ref={resultRef} className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-8 gap-3">


                {filteredItems.map((product) => (
                    <MarketplaceCard key={product.id} product={product} />
                ))}
            </div>

            {filteredItems.length === 0 && (
                <div className="text-center text-gray-500 mt-10 text-lg">No items found.</div>
            )}
        </div>
    );
}
