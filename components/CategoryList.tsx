import Link from 'next/link';
import Image from 'next/image';

// Category data
const categories = [
  {
    id: 'phones',
    name: 'Phones',
    description: 'Latest smartphones and mobile phones',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
        <line x1="12" y1="18" x2="12.01" y2="18"></line>
      </svg>
    ),
    image: '/images/phones.jpg',
    color: 'bg-blue-500'
  },
  {
    id: 'cars',
    name: 'Cars',
    description: 'Used and new cars for sale',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 16H9m10 0h3v-3.15a1 1 0 00-.84-.99L16 11l-2.7-3.6a1 1 0 00-.8-.4H5.24a2 2 0 00-1.8 1.1l-.8 1.63A6 6 0 002 12.42V16h2"></path>
        <circle cx="6.5" cy="16.5" r="2.5"></circle>
        <circle cx="16.5" cy="16.5" r="2.5"></circle>
      </svg>
    ),
    image: '/images/cars.jpg',
    color: 'bg-red-500'
  },
  {
    id: 'electronics',
    name: 'Electronics',
    description: 'Computers, TVs, and other electronics',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
      </svg>
    ),
    image: '/images/electronics.jpg',
    color: 'bg-purple-500'
  },
  {
    id: 'furniture',
    name: 'Furniture',
    description: 'Home and office furniture',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 8v12a2 2 0 01-2 2H6a2 2 0 01-2-2V8"></path>
        <path d="M2 4h20a0 0 0 110 4H2a0 0 0 010-4z"></path>
        <path d="M6 12h12"></path>
      </svg>
    ),
    image: '/images/furniture.jpg',
    color: 'bg-yellow-500'
  },
  {
    id: 'clothing',
    name: 'Clothing',
    description: 'Fashion and apparel',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z"></path>
      </svg>
    ),
    image: '/images/clothing.jpg',
    color: 'bg-green-500'
  }
];

export default function CategoryList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <Link 
          key={category.id} 
          href={`/marketplace/${category.id}`}
          className="block group"
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
            <div className="relative h-48">
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <div className={`${category.color} text-white p-4 rounded-full`}>
                  {category.icon}
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-1">{category.name}</h3>
              <p className="text-gray-600 mb-3">{category.description}</p>
              
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}