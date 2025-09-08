// pages/SingleProduct.tsx - Cyberpunk Theme
import React, { useState} from 'react';
import { 
  Heart, 
  ShoppingBag, 
  Star, 
  Minus, 
  Plus, 
  Share2, 
  Shield, 
  Truck, 
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Zap,
  Award,
  Users,
  MessageCircle,
  Check
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { footerColumns, socialLinks } from '../data/homeData';

interface ProductImage {
  id: number;
  url: string;
  alt: string;
}

interface Review {
  id: number;
  user: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  images: ProductImage[];
  category: string;
  badge?: {
    type: 'hot' | 'new' | 'sale' | 'sold';
    text: string;
  };
  discount?: string;
  rating: number;
  reviews: Review[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  description: string;
  features: string[];
  specifications: { [key: string]: string };
  inStock: boolean;
  stockCount: number;
}

// Sample product data
const sampleProduct: Product = {
  id: 1,
  name: 'Premium Cotton T-Shirt Collection',
  price: '$99',
  originalPrice: '$129',
  images: [
    { id: 1, url: '1-a.jpg', alt: 'Front view' },
    { id: 2, url: '5-a.jpg', alt: 'Back view' },
    { id: 3, url: '2-a.jpg', alt: 'Side view' },
    { id: 4, url: '6-a.jpg', alt: 'Detail view' },
  ],
  category: 'Men\'s Fashion',
  badge: { type: 'hot', text: 'Bestseller' },
  discount: '23%',
  rating: 4.8,
  reviews: [
    {
      id: 1,
      user: 'John D.',
      rating: 5,
      date: '2024-01-15',
      comment: 'Excellent quality and perfect fit. The fabric is incredibly soft and the color hasn\'t faded after multiple washes.',
      verified: true
    },
    {
      id: 2,
      user: 'Sarah M.',
      rating: 4,
      date: '2024-01-12',
      comment: 'Great t-shirt overall. Love the material and the cut is very flattering.',
      verified: true
    },
    {
      id: 3,
      user: 'Mike R.',
      rating: 5,
      date: '2024-01-08',
      comment: 'This is my third purchase. Quality is consistent and shipping is always fast.',
      verified: true
    }
  ],
  colors: [
    { name: 'Midnight Black', hex: '#000000' },
    { name: 'Pure White', hex: '#ffffff' },
    { name: 'Ocean Blue', hex: '#3b82f6' },
    { name: 'Forest Green', hex: '#10b981' }
  ],
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  description: 'Experience unparalleled comfort with our Premium Cotton T-Shirt. Crafted from 100% organic cotton, this t-shirt combines style, comfort, and sustainability. The modern fit flatters all body types while the breathable fabric keeps you comfortable all day long.',
  features: [
    '100% Organic Cotton',
    'Pre-shrunk fabric',
    'Reinforced seams',
    'Tagless design',
    'Machine washable',
    'Eco-friendly production'
  ],
  specifications: {
    'Material': '100% Organic Cotton',
    'Weight': '180 GSM',
    'Fit': 'Regular Fit',
    'Care': 'Machine wash cold',
    'Origin': 'Made in USA',
    'Certification': 'GOTS Certified'
  },
  inStock: true,
  stockCount: 47
};

interface ProductSingleViewProps {
  productId?: string;
}

const SingleProductPage: React.FC<ProductSingleViewProps> = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(sampleProduct.colors[0]);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'specifications'>('description');
  const [isZoomed, setIsZoomed] = useState(false);
  const [_showSizeGuide, setShowSizeGuide] = useState(false);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    console.log('Added to cart:', {
      product: sampleProduct,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity
    });
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    console.log('Buy now clicked');
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === sampleProduct.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? sampleProduct.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 relative">
        {/* Cyberpunk Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20 pointer-events-none"></div>
        
        {/* Breadcrumb */}
        <nav className="mb-8 relative z-10">
          <div className="flex items-center space-x-2 text-sm">
            <button className="text-gray-400 hover:text-cyan-400 transition-colors font-bold tracking-wider uppercase">HOME</button>
            <ChevronRight className="h-4 w-4 text-gray-500" />
            <button className="text-gray-400 hover:text-cyan-400 transition-colors font-bold tracking-wider uppercase">PRODUCTS</button>
            <ChevronRight className="h-4 w-4 text-gray-500" />
            <span className="text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text font-black tracking-wider uppercase">{sampleProduct.name}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 relative z-10">
          {/* Product Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative group">
              {sampleProduct.badge && (
                <div className={`absolute top-4 left-4 z-10 px-3 py-2 text-sm text-black font-black rounded-xl shadow-lg tracking-wider uppercase
                  ${sampleProduct.badge.type === 'hot' ? 'bg-gradient-to-r from-red-500 to-pink-500' : 
                    sampleProduct.badge.type === 'new' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 
                    sampleProduct.badge.type === 'sale' ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 
                    'bg-gradient-to-r from-gray-500 to-gray-600'
                  }`}>
                  {sampleProduct.badge.text}
                </div>
              )}
              
              {sampleProduct.discount && (
                <div className="absolute top-4 right-4 z-10 px-3 py-2 text-sm text-black font-black rounded-xl bg-gradient-to-r from-red-500 to-pink-500 shadow-lg tracking-wider">
                  -{sampleProduct.discount}
                </div>
              )}
              
              <div 
                className={`relative bg-gray-800 border border-cyan-500/30 rounded-2xl overflow-hidden cursor-zoom-in transition-all duration-300 ${
                  isZoomed ? 'transform scale-105 shadow-2xl shadow-cyan-500/25' : ''
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <img
                  src={sampleProduct.images[selectedImageIndex].url}
                  alt={sampleProduct.images[selectedImageIndex].alt}
                  className="w-full h-[500px] object-cover"
                />
                
                {/* Cyberpunk Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Navigation Arrows */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-gray-800/80 border border-cyan-500/50 rounded-xl shadow-lg hover:bg-gray-700 hover:border-cyan-400 transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="h-6 w-6 text-cyan-400" />
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-gray-800/80 border border-cyan-500/50 rounded-xl shadow-lg hover:bg-gray-700 hover:border-cyan-400 transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="h-6 w-6 text-cyan-400" />
                </button>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {sampleProduct.images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative rounded-xl overflow-hidden transition-all duration-300 border-2 ${
                    selectedImageIndex === index 
                      ? 'border-cyan-500 shadow-lg shadow-cyan-500/25' 
                      : 'border-gray-700 hover:border-cyan-500/50'
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded-full border border-cyan-500/30 font-bold tracking-wider uppercase">
                  {sampleProduct.category}
                </span>
                <span className="text-sm text-green-400 bg-green-500/20 px-3 py-1 rounded-full flex items-center gap-1 border border-green-500/30 font-bold tracking-wider uppercase">
                  <Check className="h-3 w-3" />
                  IN STOCK ({sampleProduct.stockCount} LEFT)
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-black text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text mb-6 tracking-wider uppercase">
                {sampleProduct.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(sampleProduct.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-300 font-bold tracking-wider">
                  {sampleProduct.rating} ({sampleProduct.reviews.length} REVIEWS)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-5xl font-black text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text tracking-wider">{sampleProduct.price}</span>
              {sampleProduct.originalPrice && (
                <>
                  <span className="text-2xl text-gray-500 line-through">{sampleProduct.originalPrice}</span>
                  {sampleProduct.discount && (
                    <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm font-black border border-red-500/30 tracking-wider uppercase">
                      SAVE {sampleProduct.discount}
                    </span>
                  )}
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-300 leading-relaxed tracking-wide">
              {sampleProduct.description}
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3">
              {sampleProduct.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-300">
                  <Check className="h-4 w-4 text-green-400" />
                  <span className="tracking-wide">{feature}</span>
                </div>
              ))}
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-black mb-4 tracking-wider uppercase text-gray-100">
                COLOR: <span className="text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text">{selectedColor.name}</span>
              </h3>
              <div className="flex gap-4">
                {sampleProduct.colors.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => setSelectedColor(color)}
                    className={`w-14 h-14 rounded-full border-4 transition-all transform hover:scale-110 shadow-lg ${
                      selectedColor.hex === color.hex
                        ? 'border-cyan-500 ring-2 ring-cyan-500/30 shadow-cyan-500/25'
                        : 'border-gray-600 ring-1 ring-gray-500'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-black tracking-wider uppercase text-gray-100">
                  SIZE: {selectedSize && <span className="text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text">{selectedSize}</span>}
                </h3>
                <button
                  onClick={() => setShowSizeGuide(true)}
                  className="text-cyan-400 hover:text-pink-400 text-sm underline font-bold tracking-wider uppercase"
                >
                  SIZE GUIDE
                </button>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {sampleProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 border-2 rounded-xl font-black transition-all tracking-wider uppercase ${
                      selectedSize === size
                        ? 'border-cyan-500 bg-cyan-500/20 text-cyan-400'
                        : 'border-gray-600 text-gray-400 hover:border-cyan-500 hover:text-cyan-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <label className="text-lg font-black tracking-wider uppercase text-gray-100">QUANTITY:</label>
                <div className="flex items-center border-2 border-cyan-500/30 rounded-xl bg-gray-800">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-700 transition-colors text-cyan-400"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-3 font-black text-gray-100 tracking-wider">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-700 transition-colors text-cyan-400"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-pink-500 text-black py-4 px-6 rounded-xl hover:from-cyan-400 hover:to-pink-400 transition-all transform hover:scale-105 flex items-center justify-center gap-2 text-lg font-black shadow-lg shadow-cyan-500/25 tracking-wider uppercase"
                >
                  <ShoppingBag className="h-6 w-6" />
                  ADD TO CART
                </button>
                
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-4 border-2 rounded-xl transition-all transform hover:scale-105 ${
                    isWishlisted
                      ? 'border-pink-500 bg-pink-500/20 text-pink-400'
                      : 'border-gray-600 text-gray-400 hover:border-pink-500 hover:bg-pink-500/20 hover:text-pink-400'
                  }`}
                >
                  <Heart className={`h-6 w-6 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
                
                <button className="p-4 border-2 border-gray-600 text-gray-400 rounded-xl hover:border-cyan-500 hover:text-cyan-400 transition-all transform hover:scale-105">
                  <Share2 className="h-6 w-6" />
                </button>
              </div>

              {/* Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-black py-4 px-6 rounded-xl hover:from-orange-400 hover:to-pink-400 transition-all transform hover:scale-105 flex items-center justify-center gap-2 text-lg font-black shadow-lg shadow-orange-500/25 tracking-wider uppercase"
              >
                <Zap className="h-6 w-6" />
                BUY NOW
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-700">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500/20 border border-blue-500/30 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Truck className="h-6 w-6 text-blue-400" />
                </div>
                <div className="text-sm font-black text-gray-300 tracking-wider uppercase">FREE SHIPPING</div>
                <div className="text-xs text-gray-500">ON ORDERS OVER $50</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <RotateCcw className="h-6 w-6 text-green-400" />
                </div>
                <div className="text-sm font-black text-gray-300 tracking-wider uppercase">EASY RETURNS</div>
                <div className="text-xs text-gray-500">30-DAY POLICY</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/20 border border-purple-500/30 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Shield className="h-6 w-6 text-purple-400" />
                </div>
                <div className="text-sm font-black text-gray-300 tracking-wider uppercase">SECURE PAYMENT</div>
                <div className="text-xs text-gray-500">SSL ENCRYPTED</div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl border border-cyan-500/20 overflow-hidden relative z-10">
          {/* Tab Headers */}
          <div className="border-b border-gray-700">
            <div className="flex">
              {[
                { id: 'description', label: 'DESCRIPTION', icon: MessageCircle },
                { id: 'reviews', label: `REVIEWS (${sampleProduct.reviews.length})`, icon: Users },
                { id: 'specifications', label: 'SPECIFICATIONS', icon: Award }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as any)}
                  className={`flex items-center gap-2 px-6 py-4 font-black tracking-wider uppercase text-sm transition-all ${
                    activeTab === id
                      ? 'text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text border-b-2 border-cyan-500 bg-gray-700'
                      : 'text-gray-400 hover:text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-300 leading-relaxed mb-6 tracking-wide">
                  {sampleProduct.description}
                </p>
                <h3 className="text-xl font-black mb-4 text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text tracking-wider uppercase">KEY FEATURES:</h3>
                <ul className="space-y-3">
                  {sampleProduct.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300 tracking-wide">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-8">
                {/* Reviews Summary */}
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-5xl font-black text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text mb-2">{sampleProduct.rating}</div>
                    <div className="flex items-center justify-center mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(sampleProduct.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-400 font-black tracking-wider uppercase">BASED ON {sampleProduct.reviews.length} REVIEWS</div>
                  </div>
                  
                  <div className="flex-1">
                    {[5, 4, 3, 2, 1].map((stars) => {
                      const count = sampleProduct.reviews.filter(r => Math.floor(r.rating) === stars).length;
                      const percentage = (count / sampleProduct.reviews.length) * 100;
                      
                      return (
                        <div key={stars} className="flex items-center gap-2 mb-2">
                          <span className="text-sm w-12 text-gray-300 font-bold tracking-wider">{stars} STARS</span>
                          <div className="flex-1 bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-cyan-400 to-pink-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-400 w-12 font-bold">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Individual Reviews */}
                <div className="space-y-6">
                  {sampleProduct.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-700 pb-6">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-full flex items-center justify-center">
                          <span className="font-black text-black text-lg">
                            {review.user.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-gray-100 tracking-wider">{review.user}</span>
                            {review.verified && (
                              <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full flex items-center gap-1 border border-green-500/30 font-bold tracking-wider uppercase">
                                <Check className="h-3 w-3" />
                                VERIFIED
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-400 tracking-wider">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-300 tracking-wide">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(sampleProduct.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b border-gray-700">
                    <span className="font-black text-gray-300 tracking-wider uppercase">{key}:</span>
                    <span className="text-gray-400 tracking-wide">{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer columns={footerColumns} socialLinks={socialLinks} />
    </div>
  );
};

export default SingleProductPage;