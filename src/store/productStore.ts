import { create } from 'zustand';
import { Product } from '../types';

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  getProducts: () => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  isLoading: false,
  error: null,

  getProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would fetch from a database
      // For now, we'll use mock data
      const mockProducts: Product[] = [
        {
          id: 'prod_1',
          name: 'Premium Dog Food',
          description: 'High-quality nutrition for your furry friend',
          price: 49.99,
          image_url: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          category: 'food'
        },
        {
          id: 'prod_2',
          name: 'Orthopedic Dog Bed',
          description: 'Comfortable memory foam bed for better sleep',
          price: 89.99,
          image_url: 'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          category: 'beds'
        },
        {
          id: 'prod_3',
          name: 'Interactive Dog Toy',
          description: 'Keep your dog entertained for hours',
          price: 24.99,
          image_url: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          category: 'toys'
        },
        {
          id: 'prod_4',
          name: 'Adjustable Dog Collar',
          description: 'Durable and comfortable collar for daily use',
          price: 19.99,
          image_url: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          category: 'accessories'
        },
        {
          id: 'prod_5',
          name: 'Grain-Free Dog Treats',
          description: 'Healthy treats for training and rewards',
          price: 14.99,
          image_url: 'https://images.unsplash.com/photo-1582798358481-d199fb7347bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          category: 'food'
        },
        {
          id: 'prod_6',
          name: 'Dog Raincoat',
          description: 'Keep your dog dry during walks in the rain',
          price: 34.99,
          image_url: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          category: 'accessories'
        }
      ];
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set({ products: mockProducts, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  }
}));