import { create } from 'zustand';
import { DogImage } from '../types';

interface DogState {
  images: DogImage[];
  isLoading: boolean;
  error: string | null;
  uploadImage: (file: File, userId: string) => Promise<DogImage | null>;
  getUserImages: (userId: string) => Promise<void>;
  deleteImage: (imageId: string) => Promise<void>;
}

export const useDogStore = create<DogState>((set, get) => ({
  images: [],
  isLoading: false,
  error: null,

  uploadImage: async (file, userId) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would upload to storage and call an AI API
      // For now, we'll simulate a successful upload and classification
      
      // Create a URL for the file (this is temporary and will be lost on page refresh)
      const imageUrl = URL.createObjectURL(file);
      
      // Mock dog breeds for random selection
      const breeds = [
        'Labrador Retriever', 'German Shepherd', 'Golden Retriever', 
        'Bulldog', 'Beagle', 'Poodle', 'Rottweiler', 'Yorkshire Terrier',
        'Boxer', 'Dachshund', 'Siberian Husky', 'Great Dane'
      ];
      
      // Randomly select a breed and confidence score
      const breed = breeds[Math.floor(Math.random() * breeds.length)];
      const confidence = Math.round((0.7 + Math.random() * 0.3) * 100) / 100;
      
      // Create a new dog image record
      const newImage: DogImage = {
        id: `img_${Math.random().toString(36).substring(2, 9)}`,
        user_id: userId,
        image_url: imageUrl,
        breed,
        confidence,
        created_at: new Date().toISOString()
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update state with the new image
      const updatedImages = [...get().images, newImage];
      set({ images: updatedImages, isLoading: false });
      
      // Save to localStorage for persistence
      localStorage.setItem('dogify_images', JSON.stringify(updatedImages));
      
      return newImage;
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      return null;
    }
  },

  getUserImages: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would fetch from a database
      // For now, we'll get from localStorage or return empty array
      const storedImages = localStorage.getItem('dogify_images');
      const allImages: DogImage[] = storedImages ? JSON.parse(storedImages) : [];
      
      // Filter images for this user
      const userImages = allImages.filter(img => img.user_id === userId);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set({ images: userImages, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  deleteImage: async (imageId) => {
    set({ isLoading: true, error: null });
    try {
      // Get current images
      const currentImages = get().images;
      
      // Filter out the image to delete
      const updatedImages = currentImages.filter(img => img.id !== imageId);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update state
      set({ images: updatedImages, isLoading: false });
      
      // Update localStorage
      localStorage.setItem('dogify_images', JSON.stringify(updatedImages));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  }
}));