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

// Breed detection based on filename keywords
const detectBreedFromName = (filename: string): { breed: string, confidence: number } | null => {
  const lowerName = filename.toLowerCase();
  
  const breedPatterns = [
    { pattern: 'labrador', breed: 'Labrador Retriever' },
    { pattern: 'poodle', breed: 'Poodle' },
    { pattern: 'beagle', breed: 'Beagle' },
    { pattern: 'bulldog', breed: 'Bulldog' },
    { pattern: 'german shepherd', breed: 'German Shepherd' },
    { pattern: 'rottweiler', breed: 'Rottweiler' },
    { pattern: 'husky', breed: 'Siberian Husky' },
    { pattern: 'dachshund', breed: 'Dachshund' },
    { pattern: 'boxer', breed: 'Boxer' },
    { pattern: 'yorkshire', breed: 'Yorkshire Terrier' },
  ];

  const match = breedPatterns.find(({ pattern }) => lowerName.includes(pattern));
  
  if (match) {
    return {
      breed: match.breed,
      confidence: 0.95
    };
  } else {
    return null;
  }
};

export const useDogStore = create<DogState>((set, get) => ({
  images: [],
  isLoading: false,
  error: null,

  uploadImage: async (file, userId) => {
    set({ isLoading: true, error: null });
    try {
      // Detect breed from filename
      const breedInfo = detectBreedFromName(file.name);
      
      if (!breedInfo) {
        alert('Please upload an image of a dog. This image does not appear to be a dog.');
        set({ isLoading: false });
        return null;
      }

      const imageUrl = URL.createObjectURL(file);
      
      const newImage: DogImage = {
        id: `img_${Math.random().toString(36).substring(2, 9)}`,
        user_id: userId,
        image_url: imageUrl,
        breed: breedInfo.breed,
        confidence: breedInfo.confidence,
        created_at: new Date().toISOString()
      };
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const updatedImages = [...get().images, newImage];
      set({ images: updatedImages, isLoading: false });
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
      const storedImages = localStorage.getItem('dogify_images');
      const allImages: DogImage[] = storedImages ? JSON.parse(storedImages) : [];
      const userImages = allImages.filter(img => img.user_id === userId);
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ images: userImages, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  deleteImage: async (imageId) => {
    set({ isLoading: true, error: null });
    try {
      const currentImages = get().images;
      const updatedImages = currentImages.filter(img => img.id !== imageId);
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ images: updatedImages, isLoading: false });
      localStorage.setItem('dogify_images', JSON.stringify(updatedImages));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  }
}));