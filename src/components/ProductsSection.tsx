// ProductsSection.tsx
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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {subtitle && <h2 className="text-indigo-600 font-medium text-lg">{subtitle}</h2>}
            {title && <h3 className="text-3xl font-bold text-gray-800 mt-2">{title}</h3>}
          </div>
        )}
        
        {tabs.length > 0 && (
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-md shadow-sm">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`px-6 py-2 text-gray-800 font-medium border transition-colors duration-200 ${
                    activeTab === tab.id 
                      ? 'bg-indigo-50 border-indigo-500 z-10' 
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                  } ${tab.id === tabs[0].id ? 'rounded-l-md' : ''} ${tab.id === tabs[tabs.length - 1].id ? 'rounded-r-md' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
      <div className="relative bg-white rounded-lg shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-md">
        {product.badge && (
          <div className={`absolute top-3 left-3 z-10 px-2 py-1 text-xs text-white font-medium rounded
            ${product.badge.type === 'hot' ? 'bg-red-500' : 
              product.badge.type === 'new' ? 'bg-blue-500' : 
              product.badge.type === 'sale' ? 'bg-green-500' : 
              product.badge.type === 'sold' ? 'bg-gray-500' : 'bg-indigo-500'
            }`}>
            {product.badge.text}
          </div>
        )}
        
        {product.discount && (
          <div className="absolute top-3 right-3 z-10 px-2 py-1 text-xs text-white font-medium rounded bg-red-500">
            -{product.discount}
          </div>
        )}
        
        <div className="relative overflow-hidden">
          <div className="block cursor-pointer" onClick={onView}>
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105" 
            />
          </div>
          
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="space-y-2">
              <button 
                onClick={onView}
                className="flex items-center justify-center h-10 w-10 bg-white rounded-full transform transition-transform duration-300 hover:scale-110"
              >
                <Eye className="h-5 w-5 text-gray-800" />
              </button>
              <button 
                onClick={onAddToWishlist}
                className="flex items-center justify-center h-10 w-10 bg-white rounded-full transform transition-transform duration-300 hover:scale-110"
              >
                <Heart className="h-5 w-5 text-gray-800" />
              </button>
              <button 
                onClick={onAddToCart}
                className="flex items-center justify-center h-10 w-10 bg-white rounded-full transform transition-transform duration-300 hover:scale-110"
              >
                <ShoppingBag className="h-5 w-5 text-gray-800" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg 
                  key={i}
                  className={`h-4 w-4 ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-xs text-gray-500 ml-2">({product.reviews} Reviews)</span>
            </div>
          </div>
          
          <h5 className="text-gray-800 font-medium mb-1 text-lg truncate">
            <button 
              onClick={onView}
              className="hover:text-indigo-600 transition-colors duration-200 text-left w-full"
            >
              {product.name}
            </button>
          </h5>
          
          <div className="font-bold text-gray-900">{product.price}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductsSection;