// TrendingProducts.tsx
import React from 'react';
import { Heart, Eye } from 'lucide-react';

// interface ProductColorProps {
//   id: string;
//   colorClass: string;
// }

interface TrendingProductProps {
  id: number;
  name: string;
  price: string;
  image: string;
  badge?: {
    type: string;
    text: string;
  };
  colors: string[];
}

interface TrendingProductsSectionProps {
  title?: string;
  subtitle?: string;
  products: TrendingProductProps[];
  showViewMoreButton?: boolean;
}

const TrendingProductsSection: React.FC<TrendingProductsSectionProps> = ({
  title = "Our Trending Products",
  subtitle = "Trendy Products",
  products,
  showViewMoreButton = true
}) => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-indigo-600 font-medium text-lg">{subtitle}</h2>
          <h3 className="text-3xl font-bold text-gray-800 mt-2">{title}</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <TrendingProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {showViewMoreButton && (
          <div className="flex justify-center mt-12">
            <a 
              href="#" 
              className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 hover:border-indigo-500 transition duration-300"
            >
              Explore More
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

const TrendingProductCard: React.FC<{ product: TrendingProductProps }> = ({ product }) => {
  // Map color codes to Tailwind classes for better visualization
  const colorMap: Record<string, string> = {
    'blc1': 'bg-blue-500',
    'blc2': 'bg-red-500',
    'blc3': 'bg-green-500',
    'blc4': 'bg-yellow-500',
    'blc5': 'bg-purple-500',
    'blc6': 'bg-pink-500',
    'blc7': 'bg-gray-500',
    'blc8': 'bg-black'
  };
  
  return (
    <div className="group">
      <div className="relative bg-white rounded-lg shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-md">
        {product.badge && (
          <div className={`absolute top-3 left-3 z-10 px-2 py-1 text-xs text-white font-medium rounded
            ${product.badge.type === 'success' ? 'bg-green-500' : 
              product.badge.type === 'info' ? 'bg-blue-500' : 
              product.badge.type === 'warning' ? 'bg-yellow-500' : 
              product.badge.type === 'danger' ? 'bg-red-500' : 'bg-indigo-500'
            }`}>
            {product.badge.text}
          </div>
        )}
        
        <div className="relative overflow-hidden">
          <a href="#" className="block">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105" 
            />
          </a>
          
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-white rounded-md px-4 py-2">
              <a href="#" className="text-gray-800 text-sm font-medium hover:text-indigo-600 transition-colors">
                <Eye className="inline-block h-4 w-4 mr-1" />
                Quick View
              </a>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          {/* Color Options */}
          <div className="flex items-center mb-4">
            {product.colors.map((color, index) => (
              <div key={index} className="mr-2">
                <div className="form-check form-option form-check-inline mb-1">
                  <input 
                    className="sr-only" 
                    type="radio" 
                    name={`color-${product.id}`} 
                    id={`${product.id}-${color}`} 
                    defaultChecked={index === 0}
                  />
                  <label 
                    className="w-6 h-6 rounded-full p-1 border border-gray-200 cursor-pointer transition-transform hover:scale-110" 
                    htmlFor={`${product.id}-${color}`}
                  >
                    <span 
                      className={`block rounded-full w-full h-full ${colorMap[color] || 'bg-gray-300'}`}
                    ></span>
                  </label>
                </div>
              </div>
            ))}
            
            <div className="ml-auto">
              <button className="text-gray-400 hover:text-red-500 transition-colors">
                <Heart className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <h5 className="text-gray-800 font-medium mb-1 text-lg truncate">
            <a href="#" className="hover:text-indigo-600 transition-colors duration-200">{product.name}</a>
          </h5>
          
          <div className="font-bold text-gray-900">{product.price}</div>
        </div>
      </div>
    </div>
  );
};

export default TrendingProductsSection;