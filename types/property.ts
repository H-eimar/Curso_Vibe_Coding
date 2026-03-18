export interface Property {
  id: string;
  slug: string;
  title: string;
  location: string;
  price: number;
  image_urls: string[];
  bedrooms: number;
  bathrooms: number;
  area: number;
  description: string | null;
  is_featured: boolean;
  created_at: string;
}
