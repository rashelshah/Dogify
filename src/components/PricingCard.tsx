import React from 'react';
import { Check } from 'lucide-react';
import { SubscriptionPlan } from '../types';
import { useAuthStore } from '../store/authStore';
import { Link } from 'react-router-dom';

interface PricingCardProps {
  plan: SubscriptionPlan;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan }) => {
  const { user } = useAuthStore();
  
  const isCurrentPlan = user?.subscription === plan.name.toLowerCase();
  
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden border ${
      plan.isPopular ? 'border-indigo-500' : 'border-gray-200'
    }`}>
      {plan.isPopular && (
        <div className="bg-indigo-500 text-white text-center py-1 text-sm font-medium">
          Most Popular
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
        <div className="mt-4 flex items-baseline">
          <span className="text-4xl font-extrabold text-gray-900">${plan.price}</span>
          <span className="ml-1 text-xl font-medium text-gray-500">/month</span>
        </div>
        <ul className="mt-6 space-y-4">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className="flex-shrink-0">
                <Check className="h-5 w-5 text-green-500" />
              </div>
              <p className="ml-3 text-base text-gray-700">{feature}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          {isCurrentPlan ? (
            <button
              disabled
              className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-md font-medium"
            >
              Current Plan
            </button>
          ) : user ? (
            <button
              className={`w-full py-2 px-4 rounded-md font-medium ${
                plan.isPopular
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
              }`}
            >
              Upgrade to {plan.name}
            </button>
          ) : (
            <Link
              to="/signup"
              className={`block text-center w-full py-2 px-4 rounded-md font-medium ${
                plan.isPopular
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
              }`}
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default PricingCard;