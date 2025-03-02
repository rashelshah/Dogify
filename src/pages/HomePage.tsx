import React from 'react';
import { Link } from 'react-router-dom';
import { Dog, Search, ShoppingBag, Award } from 'lucide-react';
import ImageUploader from '../components/ImageUploader';
import { useAuthStore } from '../store/authStore';
import { DogImage } from '../types';

const HomePage: React.FC = () => {
  const { user } = useAuthStore();
  const [result, setResult] = React.useState<DogImage | null>(null);

  const handleUploadSuccess = (dogImage: DogImage) => {
    setResult(dogImage);
    window.scrollTo({
      top: document.getElementById('result-section')?.offsetTop,
      behavior: 'smooth'
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                Identify Any Dog Breed with AI
              </h1>
              <p className="text-xl mb-8">
                Upload a photo of any dog and our cutting-edge AI will instantly identify the breed with amazing accuracy.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to={user ? '/dashboard' : '/signup'}
                  className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-md hover:bg-gray-100 text-center"
                >
                  {user ? 'Go to Dashboard' : 'Sign Up Free'}
                </Link>
                <a
                  href="#try-now"
                  className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white hover:bg-opacity-10 text-center"
                >
                  Try Now
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Dog"
                className="rounded-lg shadow-2xl max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-xl text-gray-600">Simple, fast, and accurate dog breed identification</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload a Photo</h3>
              <p className="text-gray-600">
                Take a photo of any dog or upload an existing image to our platform.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Dog className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
              <p className="text-gray-600">
                Our advanced AI analyzes the image and identifies the dog breed with high accuracy.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Results</h3>
              <p className="text-gray-600">
                Receive detailed information about the breed, including characteristics and care tips.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Try Now Section */}
      <section id="try-now" className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Try It Now</h2>
            <p className="mt-4 text-xl text-gray-600">
              Upload a dog photo and see our AI in action
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <ImageUploader onSuccess={handleUploadSuccess} />
          </div>
          
          {result && (
            <div id="result-section" className="mt-10 bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Results</h3>
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 mb-4 md:mb-0 md:pr-4">
                  <img 
                    src={result.image_url} 
                    alt="Uploaded dog" 
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="md:w-1/2 md:pl-4">
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      Identified Breed:
                    </h4>
                    <p className="text-2xl font-bold text-indigo-600 mb-4">
                      {result.breed}
                    </p>
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-1">Confidence Level:</p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-indigo-600 h-2.5 rounded-full" 
                          style={{ width: `${result.confidence * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-right text-sm text-gray-600 mt-1">
                        {Math.round(result.confidence * 100)}%
                      </p>
                    </div>
                    <div className="mt-6">
                      <Link
                        to={user ? '/dashboard' : '/signup'}
                        className="block w-full text-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                      >
                        {user ? 'View in Dashboard' : 'Sign Up to Save Results'}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Shop Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Shop for Your Dog</h2>
            <p className="mt-4 text-xl text-gray-600">
              Find the perfect products for your furry friend
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1589924691995-400dc9ecc119?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                alt="Dog Food" 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">Premium Dog Food</h3>
                <p className="text-gray-600 mt-2">High-quality nutrition for your furry friend</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-lg font-bold text-indigo-600">$49.99</span>
                  <Link 
                    to="/products" 
                    className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
                  >
                    <ShoppingBag className="h-4 w-4 mr-1" />
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1604578762246-41134e37f9cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                alt="Dog Bed" 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">Orthopedic Dog Bed</h3>
                <p className="text-gray-600 mt-2">Comfortable memory foam bed for better sleep</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-lg font-bold text-indigo-600">$89.99</span>
                  <Link 
                    to="/products" 
                    className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
                  >
                    <ShoppingBag className="h-4 w-4 mr-1" />
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                alt="Dog Toy" 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">Interactive Dog Toy</h3>
                <p className="text-gray-600 mt-2">Keep your dog entertained for hours</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-lg font-bold text-indigo-600">$24.99</span>
                  <Link 
                    to="/products" 
                    className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
                  >
                    <ShoppingBag className="h-4 w-4 mr-1" />
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <Link 
              to="/products" 
              className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 inline-flex items-center"
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;