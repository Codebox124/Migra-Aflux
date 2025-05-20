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

  useEffect(() => {
    setItems(dummyMarketplaceItems);
  }, []);

  const allCategories = ['All', ...Array.from(new Set(dummyMarketplaceItems.map(item => item.category)))];

  const filteredItems = items.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase()) ||
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
      <h1 className="text-4xl font-bold mb-8 text-center">Migra Aflux Marketplace</h1>

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
              className={`pb-2 text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                selectedCategory === category
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
      <div ref={resultRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map(item => (
          <MarketplaceCard key={item.id} item={item} />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center text-gray-500 mt-10 text-lg">No items found.</div>
      )}
    </div>
  );
}
