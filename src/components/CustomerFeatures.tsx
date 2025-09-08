// CustomerFeatures.tsx - Cyberpunk Theme
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
  bgColor = 'bg-gray-800',
  textColor = 'text-gray-300'
}) => {
  // Map string icon names to Lucide components with cyberpunk styling
  const getIcon = (iconName: string) => {
    const iconClass = "h-8 w-8 text-cyan-400 group-hover:text-pink-400 transition-all duration-300";
    
    switch (iconName) {
      case 'shopping-basket':
        return <ShoppingBasket className={iconClass} />;
      case 'credit-card':
        return <CreditCard className={iconClass} />;
      case 'shield':
        return <ShieldCheck className={iconClass} />;
      case 'headphones':
        return <Headphones className={iconClass} />;
      default:
        return <ShoppingBasket className={iconClass} />;
    }
  };

  return (
    <section className={`py-12 border-t border-cyan-500/20 ${bgColor} relative overflow-hidden`}>
      {/* Cyberpunk Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 via-transparent to-gray-900/50"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-70"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={feature.id} className="flex items-center group cursor-pointer">
              {/* Icon Container */}
              <div className="flex-shrink-0 mr-6">
                <div className="w-16 h-16 bg-gray-900 border-2 border-cyan-500/30 rounded-xl flex items-center justify-center group-hover:border-cyan-400 group-hover:shadow-lg group-hover:shadow-cyan-500/25 transition-all duration-500 relative overflow-hidden">
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Icon */}
                  <div className="relative z-10 group-hover:scale-110 transition-transform duration-300">
                    {getIcon(feature.icon)}
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <h5 className={`font-black mb-2 text-lg tracking-wider uppercase group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-pink-500 group-hover:bg-clip-text transition-all duration-300 ${textColor}`}>
                  {feature.title}
                </h5>
                <span className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300 tracking-wide">
                  {feature.description}
                </span>
              </div>
              
              {/* Separator Line (except for last item) */}
              {index < features.length - 1 && (
                <div className="hidden lg:block w-px h-12 bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent ml-8"></div>
              )}
            </div>
          ))}
        </div>
        
        {/* Bottom Glow Effect */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-50"></div>
      </div>
    </section>
  );
};

export default CustomerFeatures;