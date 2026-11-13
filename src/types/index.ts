export interface CategoryItem {
  id: string;
  name: string;
  description?: string;
  order?: number;
}

export interface ProductVariant {
  id: string;
  packagingType: 'Bottle' | 'Tin' | 'Jar' | 'Sache' | 'Stand up Pouch' | 'Bottle- 10' | string;
  weight: string;
  price: number;
  delivery: 'Free' | 'Charges applied';
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  packagingType?: 'Bottle' | 'Tin' | 'Jar' | 'Sache' | 'Stand up Pouch' | 'Bottle- 10' | string;
  price: number; // in PKR base price
  compareAtPrice?: number; // optional original price
  weight: string; // base weight
  sku?: string;
  delivery?: 'Free' | 'Charges applied';
  variants?: ProductVariant[];
  image: string; // Primary (top) cover image
  images?: string[]; // Up to 15 images gallery
  badge?: string;
  isFlagship?: boolean;
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  composition?: {
    ingredient: string;
    amount?: string;
    localName?: string;
    role: string;
  }[];
  enrichedWith?: string[];
  directions: string;
  inStock: boolean;
  createdAt?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
}

export interface AdminOrder {
  id: string;
  customerName: string;
  customerPhone: string;
  customerCity: string;
  customerAddress: string;
  items: {
    productName: string;
    packagingType?: string;
    weight?: string;
    quantity: number;
    price: number;
  }[];
  subtotal: number;
  deliveryFee: number;
  grandTotal: number;
  paymentMode: 'Cash on Delivery (COD)' | 'Direct Bank Transfer (IBFT)';
  status: 'Pending' | 'QC Verified' | 'Dispatched' | 'Delivered' | 'Cancelled';
  date: string;
  courierTracking?: string;
  courierCompany?: 'TCS' | 'Leopards' | 'M&P' | 'Call Courier' | 'Trax';
}

export interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
}

export interface ResearchItem {
  id: string;
  title: string;
  category: string;
  date: string;
  summary: string;
  author: string;
  keyFindings: string[];
  readTime: string;
}

export interface CompanyEvent {
  id: string;
  title: string;
  type: string;
  date: string;
  location: string;
  description: string;
  status: 'Upcoming' | 'Completed';
  capacity?: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  city: string;
  product: string;
  rating: number;
  date: string;
  verified: boolean;
  comment: string;
  isApproved?: boolean;
}

export type PageTab =
  | 'home'
  | 'contact'
  | 'products'
  | 'events'
  | 'careers'
  | 'customer-hub'
  | 'governance'
  | 'admin'
  | 'single-product';
