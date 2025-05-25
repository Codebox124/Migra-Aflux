'use client';

import { useState, useEffect, useRef } from 'react';

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
                        image: item.image,
                        slug: item.slug,
                        category: item.category,
                        description: item.description,
                        amount: item.amount ?? '0',
                        city: item.city,
                        condition: item.condition,
                        other_images : item.other_images,
                        seller: item.seller,
                        is_active: item.is_active ?? true,
                        created_at: item.created_at,
                        updated_at: item.updated_at,
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

    // Get unique categories from items
    const allCategories = ['All', ...Array.from(new Set(items.map(item => item.category).filter(Boolean)))];

    const filteredItems = items.filter(item => {
        const matchesSearch =
            item.name?.toLowerCase().includes(search.toLowerCase()) ||
            item.city?.toLowerCase().includes(search.toLowerCase()) ||
            item.category?.toLowerCase().includes(search.toLowerCase()) ||
            item.description?.toLowerCase().includes(search.toLowerCase());

        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
        resultRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    if (loading) {
        return (
            <div className="bg-white px-4 md:px-10 py-10 min-h-screen text-black">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <span className="ml-3 text-gray-600">Loading products...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white px-4  md:px-20 py-10 min-h-screen text-black">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Marketplace</h1>
                <p className="text-gray-600">Discover amazing products from our community</p>
            </div>

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
                            className={`pb-2 text-sm font-medium whitespace-nowrap transition-all duration-200 capitalize ${selectedCategory === category
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-500 hover:text-blue-500'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results count */}
            <div className="mb-4">
                <p className="text-sm text-gray-600">
                    {filteredItems.length} {filteredItems.length === 1 ? 'product' : 'products'} found
                    {selectedCategory !== 'All' && ` in "${selectedCategory}"`}
                </p>
            </div>

            {/* Items Grid */}
            <div ref={resultRef} className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-8 gap-3">
                {filteredItems.map((product) => (
                    <MarketplaceCard key={product.id} product={product} />
                ))}
            </div>

            {/* No results message */}
            {filteredItems.length === 0 && !loading && (
                <div className="text-center text-gray-500 mt-10">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold mb-2">No products found</h3>
                    <p className="text-gray-400">
                        Try adjusting your search terms or browse all categories
                    </p>
                </div>
            )}
        </div>
    );
}