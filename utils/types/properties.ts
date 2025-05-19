// utils/types/properties.ts
export type PropertyStatus = 'available' | 'unavailable' | 'reserved' | 'rented' | 'under-inspection';
export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  priceUnit: 'month' | 'total';
  beds: number;
  type: string;
  baths: number;
  area: number;
  status: PropertyStatus;
  image?: string;
  description?: string;
  videoUrl?: string;
}

