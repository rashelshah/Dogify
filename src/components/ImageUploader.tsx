import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Loader2 } from 'lucide-react';
import { useDogStore } from '../store/dogStore';
import { useAuthStore } from '../store/authStore';
import { DogImage } from '../types';

interface ImageUploaderProps {
  onSuccess?: (result: DogImage) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onSuccess }) => {
  const { user } = useAuthStore();
  const { uploadImage, isLoading } = useDogStore();
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    
    if (acceptedFiles.length === 0) {
      return;
    }
    
    const selectedFile = acceptedFiles[0];
    
    // Check if file is an image
    if (!selectedFile.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }
    
    // Check file size (max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }
    
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1
  });

  const handleClearImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    setFile(null);
  };

  const handleUpload = async () => {
    if (!file || !user) return;
    
    try {
      const result = await uploadImage(file, user.id);
      if (result && onSuccess) {
        onSuccess(result);
      }
      handleClearImage();
    } catch (err) {
      setError('Failed to upload image');
      console.error(err);
    }
  };

  return (
    <div className="w-full">
      {!preview ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm font-medium text-gray-900">
            {isDragActive ? 'Drop the image here' : 'Drag & drop an image here, or click to select'}
          </p>
          <p className="mt-1 text-xs text-gray-500">PNG, JPG, JPEG up to 5MB</p>
        </div>
      ) : (
        <div className="relative rounded-lg overflow-hidden">
          <img src={preview} alt="Preview" className="w-full h-64 object-cover" />
          <button
            onClick={handleClearImage}
            className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 rounded-full p-1 text-white hover:bg-opacity-100"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleUpload}
              disabled={isLoading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-300 flex items-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Identify Breed'
              )}
            </button>
          </div>
        </div>
      )}
      
      {error && (
        <div className="mt-2 text-red-500 text-sm">{error}</div>
      )}
    </div>
  );
};

export default ImageUploader;