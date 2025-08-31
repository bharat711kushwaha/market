// CustomerFeatures.tsx
import React from 'react';
import { ShoppingBasket, CreditCard, ShieldCheck, Headphones } from 'lucide-react';

interface FeatureProps {
  id: number;
  icon: string;
  title: string;
  description: string;
}

interface CustomerFeaturesProps {
  features: FeatureProps[];
  bgColor?: string;
  textColor?: string;
}

const CustomerFeatures: React.FC<CustomerFeaturesProps> = ({
  features,
  bgColor = 'bg-white',
  textColor = 'text-gray-800'
}) => {
  // Map string icon names to Lucide components
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'shopping-basket':
        return <ShoppingBasket className="h-6 w-6 text-indigo-600" />;
      case 'credit-card':
        return <CreditCard className="h-6 w-6 text-indigo-600" />;
      case 'shield':
        return <ShieldCheck className="h-6 w-6 text-indigo-600" />;
      case 'headphones':
        return <Headphones className="h-6 w-6 text-indigo-600" />;
      default:
        return <ShoppingBasket className="h-6 w-6 text-indigo-600" />;
    }
  };

  return (
    <section className={`py-8 border-t border-gray-200 ${bgColor}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div key={feature.id} className="flex items-center">
              <div className="flex-shrink-0 mr-4">
                {getIcon(feature.icon)}
              </div>
              <div>
                <h5 className={`font-bold mb-1 ${textColor}`}>{feature.title}</h5>
                <span className="text-gray-500 text-sm">{feature.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerFeatures;