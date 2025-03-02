import React from 'react';
import { Trash2 } from 'lucide-react';
import { DogImage } from '../types';
import { useDogStore } from '../store/dogStore';

interface DogCardProps {
  image: DogImage;
}

const DogCard: React.FC<DogCardProps> = ({ image }) => {
  const { deleteImage, isLoading } = useDogStore();
  
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      await deleteImage(image.id);
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img 
          src={image.image_url} 
          alt={`Dog classified as ${image.breed}`} 
          className="w-full h-48 object-cover"
        />
        <button
          onClick={handleDelete}
          disabled={isLoading}
          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 disabled:bg-red-300"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{image.breed}</h3>
        <div className="mt-2 flex items-center">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-indigo-600 h-2.5 rounded-full" 
              style={{ width: `${image.confidence * 100}%` }}
            ></div>
          </div>
          <span className="ml-2 text-sm text-gray-600">{Math.round(image.confidence * 100)}%</span>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Analyzed on {formatDate(image.created_at)}
        </p>
      </div>
    </div>
  );
};

export default DogCard;