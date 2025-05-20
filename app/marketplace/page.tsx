'use client';

import { useState, useEffect, useRef } from 'react';
import { dummyMarketplaceItems } from '@/data/marketplace';
import { MarketplaceItem } from '@/utils/types/markepplace';
import MarketplaceCard from '@/components/MarketPlaceCard';

export default function MarketplacePage() {
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [search, setSearch] = useState('');
  const [showCategories, setShowCategories] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setItems(dummyMarketplaceItems);
  }, []);

  const allCategories = Array.from(new Set(dummyMarketplaceItems.map(item => item.category)));

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.location.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowCategories(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategoryClick = (category: string) => {
    setSearch(category);
    setShowCategories(false);
    resultRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white px-4 md:px-10 py-10 min-h-screen text-black">
      <h1 className="text-4xl font-bold mb-8 text-center">Migra Aflux Marketplace</h1>

      <div className="relative max-w-2xl mx-auto mb-8">
        <input
          type="text"
          placeholder="🔍 Search for products, categories, or location..."
          className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          ref={inputRef}
          onFocus={() => setShowCategories(true)}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Category Dropdown */}
        {showCategories && (
          <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
            {allCategories.map((category, idx) => (
              <div
                key={idx}
                onClick={() => handleCategoryClick(category)}
                className="px-4 py-2 cursor-pointer hover:bg-blue-50 text-sm"
              >
                {category}
              </div>
            ))}
          </div>
        )}
      </div>

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
