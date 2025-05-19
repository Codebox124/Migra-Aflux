// utils/types/properties.ts
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
  status: 'available' | 'under-inspection' | 'rented' | ' unavailable' | ' reserved:';
  image?: string;
};
