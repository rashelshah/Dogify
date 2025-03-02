import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Loader2, Dog, User } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useDogStore } from '../store/dogStore';
import ImageUploader from '../components/ImageUploader';
import DogCard from '../components/DogCard';
import FeedbackForm from '../components/FeedbackForm';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuthStore();
  const { images, getUserImages, isLoading } = useDogStore();
  const [showUploader, setShowUploader] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    getUserImages(user.id);
  }, [user, getUserImages, navigate]);

  // Handle clicks outside the profile dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    setShowProfileDropdown((prev) => !prev); // Toggle dropdown visibility
  };

  if (!user) {
    return null;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Welcome, {user.name}!
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Your personal dashboard for dog breed identification
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button
              onClick={() => setShowUploader(!showUploader)}
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {showUploader ? (
                'Cancel'
              ) : (
                <>
                  <Plus className="h-5 w-5 mr-2" />
                  New Analysis
                </>
              )}
            </button>
            <div className="relative ml-3" ref={profileDropdownRef}>
              <button
                onClick={handleProfileClick}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <User className="h-5 w-5" />
              </button>
              {showProfileDropdown && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        navigate('/dashboard');
                        setShowProfileDropdown(false); // Close dropdown after navigation
                      }}
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => {
                        navigate('/profile');
                        setShowProfileDropdown(false); // Close dropdown after navigation
                      }}
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        signOut();
                        navigate('/login');
                        setShowProfileDropdown(false); // Close dropdown after sign out
                      }}
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {showUploader && (
          <div className="mt-6 bg-white shadow sm:rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Upload a New Dog Image</h2>
            <ImageUploader onSuccess={() => setShowUploader(false)} />
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900">Your Dog Analyses</h2>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
            </div>
          ) : images.length > 0 ? (
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {images.map((image) => (
                <DogCard key={image.id} image={image} />
              ))}
            </div>
          ) : (
            <div className="mt-4 bg-white shadow sm:rounded-lg p-6 text-center">
              <Dog className="h-12 w-12 text-gray-400 mx-auto" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No dog images yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by uploading your first dog image for analysis.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => setShowUploader(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  New Analysis
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-12">
          <h2 className="text-lg font-medium text-gray-900 mb-4">We Value Your Feedback</h2>
          <FeedbackForm />
        </div>

        {user.subscription === 'free' && (
          <div className="mt-12 bg-indigo-50 rounded-lg p-6">
            <h2 className="text-lg font-medium text-indigo-900 mb-2">Upgrade to Premium</h2>
            <p className="text-indigo-700 mb-4">
              Get access to detailed breed information, unlimited analyses, and more with our Premium plan.
            </p>
            <button
              onClick={() => navigate('/pricing')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              View Premium Benefits
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;