// utils/types/properties.ts
export type PropertyStatus = 'available' | 'unavailable' | 'reserved' | 'rented' | 'under-inspection';
export type Property = {
  id: string | number;
  title: string;
  location: string;
  type: string;
  price: number;
  priceUnit: 'month' | 'total';
  beds: number;
  baths: number;
  area: number;
  status: PropertyStatus;
  image?: string;
};
