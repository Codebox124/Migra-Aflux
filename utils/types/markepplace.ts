
export type MarketplaceItem = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: 'new' | 'used';
  location: string;
  image: string;
  sellerName: string;
  status: 'available' | 'sold';
};
