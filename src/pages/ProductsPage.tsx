import React, { useEffect, useState } from 'react';
import { useProductStore } from '../store/productStore';
import ProductCard from '../components/ProductCard';
import { Search, Filter, Loader2 } from 'lucide-react';

const ProductsPage: React.FC = () => {
  const { products, getProducts, isLoading } = useProductStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<number>(100);
  
  useEffect(() => {
    getProducts();
  }, [getProducts]);
  
  const categories = [
    { id: 'food', name: 'Food' },
    { id: 'toys', name: 'Toys' },
    { id: 'beds', name: 'Beds' },
    { id: 'accessories', name: 'Accessories' }
  ];
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesPrice = product.price <= priceRange;
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Find maximum price for dynamic range
  const maxPrice = Math.max(...products.map(p => p.price), 100);
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Dog Products
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              High-quality products for your furry friend
            </p>
          </div>
        </div>
        
        <div className="mt-6 flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white p-4 shadow rounded-lg">
              <h2 className="font-medium text-gray-900 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Categories
              </h2>
              <div className="mt-4 space-y-2">
                <div className="flex items-center">
                  <input
                    id="all"
                    name="category"
                    type="radio"
                    checked={selectedCategory === null}
                    onChange={() => setSelectedCategory(null)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <label htmlFor="all" className="ml-3 text-sm text-gray-700">
                    All Products
                  </label>
                </div>
                
                {categories.map(category => (
                  <div key={category.id} className="flex items-center">
                    <input
                      id={category.id}
                      name="category"
                      type="radio"
                      checked={selectedCategory === category.id}
                      onChange={() => setSelectedCategory(category.id)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <label htmlFor={category.id} className="ml-3 text-sm text-gray-700">
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <h2 className="font-medium text-gray-900 mb-2">Price Range</h2>
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$0</span>
                  <span>${maxPrice}</span>
                </div>
                <div className="text-center text-sm mt-2">
                  Selected: ${priceRange}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white shadow rounded-lg p-6 text-center">
                <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                <p className="mt-1 text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;