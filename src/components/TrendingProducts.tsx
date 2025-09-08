// TrendingProducts.tsx - Cyberpunk Theme
import React from 'react';
import { Heart, Eye } from 'lucide-react';

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
    <section className="py-20 bg-gray-800 relative overflow-hidden">
      {/* Cyberpunk Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-transparent to-purple-900/20"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-pink-400 font-black text-lg tracking-widest uppercase mb-2">
            {subtitle}
          </h2>
          <h3 className="text-5xl font-black text-transparent bg-gradient-to-r from-pink-400 to-cyan-500 bg-clip-text tracking-wider uppercase">
            {title}
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-cyan-500 mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <TrendingProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {showViewMoreButton && (
          <div className="flex justify-center mt-16">
            <a 
              href="#" 
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-pink-500 text-black font-black rounded-xl hover:from-cyan-400 hover:to-pink-400 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 hover:scale-105 tracking-wider uppercase"
            >
              EXPLORE MORE
              <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
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
      <div className="relative bg-gray-900 border border-cyan-500/20 rounded-xl overflow-hidden transition-all duration-500 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/25">
        {product.badge && (
          <div className={`absolute top-4 left-4 z-20 px-3 py-1 text-xs text-black font-black rounded-lg tracking-wider uppercase
            ${product.badge.type === 'success' ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 
              product.badge.type === 'info' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 
              product.badge.type === 'warning' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 
              product.badge.type === 'danger' ? 'bg-gradient-to-r from-red-500 to-pink-500' : 'bg-gradient-to-r from-cyan-500 to-pink-500'
            }`}>
            {product.badge.text}
          </div>
        )}
        
        <div className="relative overflow-hidden">
          <a href="#" className="block">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-64 object-cover transition-all duration-700 group-hover:scale-110" 
            />
          </a>
          
          {/* Cyberpunk Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-purple-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Quick View Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="bg-gray-800 border-2 border-cyan-500/50 rounded-xl px-6 py-3 hover:border-cyan-400 hover:bg-cyan-500/10 transition-all duration-300">
              <a href="#" className="text-cyan-400 text-sm font-black hover:text-white transition-colors tracking-wider uppercase flex items-center">
                <Eye className="inline-block h-4 w-4 mr-2" />
                QUICK VIEW
              </a>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          {/* Color Options */}
          <div className="flex items-center mb-6">
            <div className="flex items-center space-x-2">
              {product.colors.map((color, index) => (
                <div key={index}>
                  <div className="relative">
                    <input 
                      className="sr-only" 
                      type="radio" 
                      name={`color-${product.id}`} 
                      id={`${product.id}-${color}`} 
                      defaultChecked={index === 0}
                    />
                    <label 
                      className="w-8 h-8 rounded-full border-2 border-gray-600 cursor-pointer transition-all duration-300 hover:scale-110 hover:border-cyan-400 flex items-center justify-center" 
                      htmlFor={`${product.id}-${color}`}
                    >
                      <span 
                        className={`block rounded-full w-5 h-5 ${colorMap[color] || 'bg-gray-300'} ring-2 ring-gray-800`}
                      ></span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="ml-auto">
              <button className="text-gray-400 hover:text-pink-400 transition-all duration-300 hover:scale-110 p-2 rounded-lg hover:bg-gray-800">
                <Heart className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {/* Product Name */}
          <h5 className="text-gray-100 font-bold mb-3 text-lg group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-pink-500 group-hover:bg-clip-text transition-all duration-300 tracking-wide">
            <a href="#" className="hover:no-underline">{product.name}</a>
          </h5>
          
          {/* Price */}
          <div className="font-black text-xl text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text tracking-wider">
            {product.price}
          </div>
        </div>
        
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default TrendingProductsSection;