export interface User {
  id: string;
  email: string;
  name: string;
  created_at: string;
  subscription: 'free' | 'premium';
}

export interface DogImage {
  id: string;
  user_id: string;
  image_url: string;
  breed: string;
  confidence: number;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: 'food' | 'toys' | 'beds' | 'accessories';
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  isPopular?: boolean;
}

export interface Feedback {
  id: string;
  name: string;
  price: number;
  features: string[];
  isPopular?: boolean;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
}