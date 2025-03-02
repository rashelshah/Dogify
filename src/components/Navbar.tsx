import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dog, User, LogOut, ShoppingCart } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const Navbar: React.FC = () => {
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Dog className="h-8 w-8 mr-2" />
              <span className="text-xl font-bold">Dogify</span>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">
                  Home
                </Link>
                <Link to="/products" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">
                  Products
                </Link>
                <Link to="/pricing" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">
                  Pricing
                </Link>
                {user && (
                  <Link to="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">
                    Dashboard
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <Link to="/cart" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500 flex items-center">
              <ShoppingCart className="h-5 w-5 mr-1" />
              <span className="hidden md:inline">Cart</span>
            </Link>
            {user ? (
              <div className="ml-4 flex items-center">
                <div className="relative group">
                  <button className="flex items-center text-sm rounded-full focus:outline-none">
                    <span className="mr-2 hidden md:block">{user.name}</span>
                    <div className="h-8 w-8 rounded-full bg-indigo-800 flex items-center justify-center">
                      <User className="h-5 w-5" />
                    </div>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                    <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Dashboard
                    </Link>
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="ml-4 flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="px-3 py-2 rounded-md text-sm font-medium bg-white text-indigo-600 hover:bg-gray-100"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;