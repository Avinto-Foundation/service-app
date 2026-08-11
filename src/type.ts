export interface Service {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  address: string;
  phone: string;
  imageUrl: string;
  price: number;
  distanceMiles: number;
  tags: string[];
  email?: string;
}

export type Category = string;

