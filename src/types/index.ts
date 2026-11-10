export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'formula' | 'honey' | 'superfood' | 'ghee' | 'wellness' | 'olive-oil';
  price: number; // in PKR
  weight: string;
  image: string;
  badge?: string;
  isFlagship?: boolean;
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  composition?: {
    ingredient: string;
    amount: string;
    localName?: string;
    role: string;
  }[];
  enrichedWith?: string[];
  directions: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface AdminOrder {
  id: string;
  customerName: string;
  customerPhone: string;
  customerCity: string;
  customerAddress: string;
  items: {
    productName: string;
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
