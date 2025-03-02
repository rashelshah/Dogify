import PricingCard from '../components/PricingCard';
import { SubscriptionPlan } from '../types';

const PricingPage = () => {
  const plans: SubscriptionPlan[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: 9,
      features: [
        '5 breed identifications/day',
        'Basic breed information',
        'Email support',
        'History storage (7 days)'
      ],
      isPopular: false
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 29,
      features: [
        'Unlimited identifications',
        'Detailed breed analysis',
        'Priority email support',
        'Training tips',
        'Health recommendations',
        'History storage (30 days)'
      ],
      isPopular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 99,
      features: [
        'All Pro features',
        'Team management',
        'API access',
        'Custom model training',
        'Dedicated support',
        'Unlimited history storage'
      ],
      isPopular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Start identifying dog breeds like a pro. Upgrade anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>

        <div className="mt-16 text-center text-gray-600">
          <p>Need custom solutions? Contact us at enterprise@dogify.com</p>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;