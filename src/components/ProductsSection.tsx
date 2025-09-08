// ProductsSection.tsx - Cyberpunk Theme
import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye } from 'lucide-react';

interface ProductTabProps {
  id: string;
  label: string;
  active: boolean;
}

interface ProductBadgeProps {
  type: 'hot' | 'new' | 'sale' | 'sold';
  text: string;
}

interface ProductProps {
  id: number;
  name: string;
  price: string;
  image: string;
  badge?: ProductBadgeProps;
  discount?: string;
  rating: number;
  reviews: number;
}

interface ProductsSectionProps {
  title?: string;
  subtitle?: string;
  tabs: ProductTabProps[];
  products: ProductProps[];
}

const ProductsSection: React.FC<ProductsSectionProps> = ({ 
  title,
  subtitle,
  tabs,
  products
}) => {
  const [activeTab, setActiveTab] = useState(() => {
    const defaultTab = tabs.find(tab => tab.active);
    return defaultTab ? defaultTab.id : tabs[0]?.id;
  });

  const handleViewProduct = (productId: number) => {
    const navigate = (window as any).navigate;
    if (navigate) {
      navigate('product-single', productId.toString());
    }
  };

  const handleAddToCart = (productId: number) => {
    console.log('Adding product to cart:', productId);
    // Add your cart logic here
  };

  const handleAddToWishlist = (productId: number) => {
    console.log('Adding product to wishlist:', productId);
    // Add your wishlist logic here
  };
  
  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Cyberpunk Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {subtitle && (
              <h2 className="text-cyan-400 font-black text-lg tracking-widest uppercase mb-2">
                {subtitle}
              </h2>
            )}
            {title && (
              <h3 className="text-5xl font-black text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text tracking-wider uppercase">
                {title}
              </h3>
            )}
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-pink-500 mx-auto mt-4"></div>
          </div>
        )}
        
        {tabs.length > 0 && (
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-xl bg-gray-800 p-2 border border-cyan-500/30">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`px-6 py-3 font-black tracking-wider uppercase text-sm transition-all duration-300 rounded-lg ${
                    activeTab === tab.id 
                      ? 'bg-gradient-to-r from-cyan-500 to-pink-500 text-black shadow-lg shadow-cyan-500/25' 
                      : 'text-gray-300 hover:text-cyan-400 hover:bg-gray-700'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onView={() => handleViewProduct(product.id)}
              onAddToCart={() => handleAddToCart(product.id)}
              onAddToWishlist={() => handleAddToWishlist(product.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductCard: React.FC<{ 
  product: ProductProps;
  onView: () => void;
  onAddToCart: () => void;
  onAddToWishlist: () => void;
}> = ({ product, onView, onAddToCart, onAddToWishlist }) => {
  return (
    <div className="group">
      <div className="relative bg-gray-800 border border-cyan-500/20 rounded-xl overflow-hidden transition-all duration-500 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/25">
        {product.badge && (
          <div className={`absolute top-4 left-4 z-20 px-3 py-1 text-xs text-black font-black rounded-lg tracking-wider uppercase
            ${product.badge.type === 'hot' ? 'bg-gradient-to-r from-red-500 to-orange-500' : 
              product.badge.type === 'new' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 
              product.badge.type === 'sale' ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 
              product.badge.type === 'sold' ? 'bg-gradient-to-r from-gray-500 to-gray-600' : 'bg-gradient-to-r from-cyan-500 to-pink-500'
            }`}>
            {product.badge.text}
          </div>
        )}
        
        {product.discount && (
          <div className="absolute top-4 right-4 z-20 px-3 py-1 text-xs text-black font-black rounded-lg bg-gradient-to-r from-red-500 to-pink-500 tracking-wider">
            -{product.discount}
          </div>
        )}
        
        <div className="relative overflow-hidden">
          <div className="block cursor-pointer" onClick={onView}>
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-64 object-cover transition-all duration-700 group-hover:scale-110" 
            />
          </div>
          
          {/* Cyberpunk Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-purple-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Action Buttons */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="flex space-x-3">
              <button 
                onClick={onView}
                className="flex items-center justify-center h-12 w-12 bg-gray-800 border-2 border-cyan-500/50 rounded-xl text-cyan-400 hover:border-cyan-400 hover:bg-cyan-500/10 hover:scale-110 transition-all duration-300"
              >
                <Eye className="h-5 w-5" />
              </button>
              <button 
                onClick={onAddToWishlist}
                className="flex items-center justify-center h-12 w-12 bg-gray-800 border-2 border-pink-500/50 rounded-xl text-pink-400 hover:border-pink-400 hover:bg-pink-500/10 hover:scale-110 transition-all duration-300"
              >
                <Heart className="h-5 w-5" />
              </button>
              <button 
                onClick={onAddToCart}
                className="flex items-center justify-center h-12 w-12 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-xl text-black hover:from-cyan-400 hover:to-pink-400 hover:scale-110 transition-all duration-300 shadow-lg"
              >
                <ShoppingBag className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg 
                  key={i}
                  className={`h-4 w-4 ${i < product.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-xs text-gray-400 ml-2 tracking-wider">({product.reviews} Reviews)</span>
            </div>
          </div>
          
          {/* Product Name */}
          <h5 className="text-gray-100 font-bold mb-3 text-lg group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-pink-500 group-hover:bg-clip-text transition-all duration-300 tracking-wide">
            <button 
              onClick={onView}
              className="text-left w-full"
            >
              {product.name}
            </button>
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

export default ProductsSection;