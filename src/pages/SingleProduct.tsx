// pages/SingleProduct.tsx
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
  productId?: string; // optional banaya (kyunki kabhi undefined bhi ho sakta hai)
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
    // Add to cart logic here
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    // Navigate to checkout with this product
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-white">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm">
            <button className="text-gray-500 hover:text-indigo-600 transition-colors">Home</button>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <button className="text-gray-500 hover:text-indigo-600 transition-colors">Products</button>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-800 font-medium">{sampleProduct.name}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative group">
              {sampleProduct.badge && (
                <div className={`absolute top-4 left-4 z-10 px-3 py-2 text-sm text-white font-medium rounded-xl shadow-lg
                  ${sampleProduct.badge.type === 'hot' ? 'bg-gradient-to-r from-red-500 to-pink-500' : 
                    sampleProduct.badge.type === 'new' ? 'bg-gradient-to-r from-blue-500 to-indigo-500' : 
                    sampleProduct.badge.type === 'sale' ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 
                    'bg-gradient-to-r from-gray-500 to-gray-600'
                  }`}>
                  {sampleProduct.badge.text}
                </div>
              )}
              
              {sampleProduct.discount && (
                <div className="absolute top-4 right-4 z-10 px-3 py-2 text-sm text-white font-bold rounded-xl bg-gradient-to-r from-red-500 to-pink-500 shadow-lg">
                  -{sampleProduct.discount}
                </div>
              )}
              
              <div 
                className={`relative bg-gray-100 rounded-2xl overflow-hidden cursor-zoom-in transition-all duration-300 ${
                  isZoomed ? 'transform scale-105' : ''
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <img
                  src={sampleProduct.images[selectedImageIndex].url}
                  alt={sampleProduct.images[selectedImageIndex].alt}
                  className="w-full h-[500px] object-cover"
                />
                
                {/* Navigation Arrows */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="h-6 w-6 text-gray-700" />
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="h-6 w-6 text-gray-700" />
                </button>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {sampleProduct.images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
                    selectedImageIndex === index 
                      ? 'ring-2 ring-indigo-500 ring-offset-2' 
                      : 'hover:ring-2 hover:ring-gray-300'
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
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {sampleProduct.category}
                </span>
                <span className="text-sm text-green-600 bg-green-100 px-3 py-1 rounded-full flex items-center gap-1">
                  <Check className="h-3 w-3" />
                  In Stock ({sampleProduct.stockCount} left)
                </span>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
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
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {sampleProduct.rating} ({sampleProduct.reviews.length} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-gray-900">{sampleProduct.price}</span>
              {sampleProduct.originalPrice && (
                <>
                  <span className="text-2xl text-gray-500 line-through">{sampleProduct.originalPrice}</span>
                  {sampleProduct.discount && (
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                      Save {sampleProduct.discount}
                    </span>
                  )}
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              {sampleProduct.description}
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-2">
              {sampleProduct.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-3">
                Color: <span className="font-normal">{selectedColor.name}</span>
              </h3>
              <div className="flex gap-3">
                {sampleProduct.colors.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => setSelectedColor(color)}
                    className={`w-12 h-12 rounded-full border-4 transition-all transform hover:scale-110 ${
                      selectedColor.hex === color.hex
                        ? 'border-indigo-500 ring-2 ring-indigo-500/30'
                        : 'border-white ring-1 ring-gray-300'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">Size: {selectedSize && <span className="font-normal">{selectedSize}</span>}</h3>
                <button
                  onClick={() => setShowSizeGuide(true)}
                  className="text-indigo-600 hover:text-indigo-700 text-sm underline"
                >
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {sampleProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 border rounded-xl font-medium transition-all ${
                      selectedSize === size
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-lg font-semibold">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-3 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-indigo-600 text-white py-4 px-6 rounded-xl hover:bg-indigo-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2 text-lg font-medium shadow-lg"
                >
                  <ShoppingBag className="h-6 w-6" />
                  Add to Cart
                </button>
                
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-4 border rounded-xl transition-all transform hover:scale-105 ${
                    isWishlisted
                      ? 'border-red-500 bg-red-50 text-red-500'
                      : 'border-gray-300 hover:border-red-500 hover:bg-red-50 hover:text-red-500'
                  }`}
                >
                  <Heart className={`h-6 w-6 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
                
                <button className="p-4 border border-gray-300 rounded-xl hover:border-gray-400 transition-all transform hover:scale-105">
                  <Share2 className="h-6 w-6 text-gray-600" />
                </button>
              </div>

              {/* Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-4 px-6 rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all transform hover:scale-105 flex items-center justify-center gap-2 text-lg font-medium shadow-lg"
              >
                <Zap className="h-6 w-6" />
                Buy Now
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Truck className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-sm font-medium text-gray-800">Free Shipping</div>
                <div className="text-xs text-gray-500">On orders over $50</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <RotateCcw className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-sm font-medium text-gray-800">Easy Returns</div>
                <div className="text-xs text-gray-500">30-day return policy</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <div className="text-sm font-medium text-gray-800">Secure Payment</div>
                <div className="text-xs text-gray-500">SSL encrypted</div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Tab Headers */}
          <div className="border-b border-gray-200">
            <div className="flex">
              {[
                { id: 'description', label: 'Description', icon: MessageCircle },
                { id: 'reviews', label: `Reviews (${sampleProduct.reviews.length})`, icon: Users },
                { id: 'specifications', label: 'Specifications', icon: Award }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as any)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-all ${
                    activeTab === id
                      ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
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
                <p className="text-gray-600 leading-relaxed mb-6">
                  {sampleProduct.description}
                </p>
                <h3 className="text-xl font-semibold mb-4">Key Features:</h3>
                <ul className="space-y-2">
                  {sampleProduct.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
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
                    <div className="text-4xl font-bold text-gray-900 mb-2">{sampleProduct.rating}</div>
                    <div className="flex items-center justify-center mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(sampleProduct.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">Based on {sampleProduct.reviews.length} reviews</div>
                  </div>
                  
                  <div className="flex-1">
                    {[5, 4, 3, 2, 1].map((stars) => {
                      const count = sampleProduct.reviews.filter(r => Math.floor(r.rating) === stars).length;
                      const percentage = (count / sampleProduct.reviews.length) * 100;
                      
                      return (
                        <div key={stars} className="flex items-center gap-2 mb-2">
                          <span className="text-sm w-12">{stars} stars</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-500 w-12">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Individual Reviews */}
                <div className="space-y-6">
                  {sampleProduct.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                          <span className="font-semibold text-indigo-600">
                            {review.user.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{review.user}</span>
                            {review.verified && (
                              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                <Check className="h-3 w-3" />
                                Verified Purchase
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(sampleProduct.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b border-gray-200">
                    <span className="font-medium text-gray-800">{key}:</span>
                    <span className="text-gray-600">{value}</span>
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