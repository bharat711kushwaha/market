// pages/Cart.tsx
import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, 
  Minus, 
  Plus, 
  X, 
  Heart, 
  Tag, 
  ArrowRight, 
  Shield, 
  Truck, 
  CreditCard,
  Lock,
  Gift,
  Percent,
  AlertCircle,
  CheckCircle,
  Star,
  Clock,
  
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { footerColumns, socialLinks } from '../data/homeData';

interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
  inStock: boolean;
  rating: number;
  reviews: number;
  discount?: number;
}

interface CouponCode {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minAmount?: number;
}

// Sample cart items
const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: 'Premium Cotton T-Shirt',
    price: 99,
    originalPrice: 129,
    image: '1-a.jpg',
    color: 'Midnight Black',
    size: 'L',
    quantity: 2,
    inStock: true,
    rating: 5,
    reviews: 128,
    discount: 23
  },
  {
    id: 2,
    name: 'Designer Floral Dress',
    price: 149,
    originalPrice: 199,
    image: '5-a.jpg',
    color: 'Ocean Blue',
    size: 'M',
    quantity: 1,
    inStock: true,
    rating: 4,
    reviews: 89,
    discount: 25
  },
  {
    id: 3,
    name: 'Leather Laptop Bag',
    price: 199,
    originalPrice: 249,
    image: '6-a.jpg',
    color: 'Brown',
    size: 'One Size',
    quantity: 1,
    inStock: false,
    rating: 5,
    reviews: 156,
    discount: 20
  }
];

// Available coupon codes
const availableCoupons: CouponCode[] = [
  { code: 'SAVE10', discount: 10, type: 'percentage', minAmount: 100 },
  { code: 'WELCOME20', discount: 20, type: 'fixed', minAmount: 150 },
  { code: 'SUMMER25', discount: 25, type: 'percentage', minAmount: 200 }
];

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<CouponCode | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showCoupons, setShowCoupons] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'payment' | 'confirmation'>('cart');

  // Calculate totals
  const calculations = useMemo(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 15;
    const tax = subtotal * 0.08;
    
    let discount = 0;
    if (appliedCoupon) {
      if (appliedCoupon.type === 'percentage') {
        discount = (subtotal * appliedCoupon.discount) / 100;
      } else {
        discount = appliedCoupon.discount;
      }
    }
    
    const total = subtotal + shipping + tax - discount;
    
    return {
      subtotal,
      shipping,
      tax,
      discount,
      total: Math.max(0, total)
    };
  }, [cartItems, appliedCoupon]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyCoupon = () => {
    const coupon = availableCoupons.find(c => c.code.toLowerCase() === couponCode.toLowerCase());
    
    if (!coupon) {
      alert('Invalid coupon code');
      return;
    }
    
    if (coupon.minAmount && calculations.subtotal < coupon.minAmount) {
      alert(`Minimum order amount of $${coupon.minAmount} required for this coupon`);
      return;
    }
    
    setAppliedCoupon(coupon);
    setCouponCode('');
    setShowCoupons(false);
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const moveToWishlist = (id: number) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      console.log('Moving to wishlist:', item);
      removeItem(id);
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }
    
    if (cartItems.some(item => !item.inStock)) {
      alert('Please remove out of stock items before checkout');
      return;
    }
    
    setIsCheckingOut(true);
    setCheckoutStep('shipping');
  };

  if (checkoutStep !== 'cart') {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-white">
        <Header />
        <main className="flex-grow container mx-auto px-3 py-4 max-w-full">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-3">Checkout Process</h1>
            <p className="text-sm text-gray-600 mb-6">This is a demo checkout process. In a real application, this would integrate with payment processors like Stripe, PayPal, etc.</p>
            
            <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-100">
              <h2 className="text-lg font-semibold mb-3">Order Summary</h2>
              <div className="space-y-2">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 truncate pr-2">{item.name} x {item.quantity}</span>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between items-center font-bold">
                    <span>Total</span>
                    <span>${calculations.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setCheckoutStep('cart')}
              className="mt-4 w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
            >
              Back to Cart
            </button>
          </div>
        </main>
        <Footer columns={footerColumns} socialLinks={socialLinks} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-white">
      <Header />
      
      <main className="flex-grow container mx-auto px-3 py-4 max-w-full">
        {/* Header */}
        <div className="mb-4">
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
            <p className="text-sm text-gray-600">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
            </p>
            
            {cartItems.length > 0 && (
              <div className="mt-3 md:hidden">
                <div className="text-2xl font-bold text-gray-900">${calculations.total.toFixed(2)}</div>
                <div className="text-xs text-gray-500">Total including tax</div>
              </div>
            )}
          </div>
        </div>

        {cartItems.length === 0 ? (
          // Empty Cart State
          <div className="text-center py-12 px-3">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-10 w-10 text-gray-400" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Your cart is empty</h2>
            <p className="text-sm text-gray-600 mb-6">
              Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
            </p>
            <button
              onClick={() => console.log('Navigate to products')}
              className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
            >
              Continue Shopping
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Cart Items */}
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow border border-gray-100 p-3"
                >
                  <div className="flex gap-3">
                    {/* Product Image */}
                    <div className="relative flex-shrink-0">
                      {!item.inStock && (
                        <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center z-10">
                          <span className="text-white font-semibold text-xs bg-red-500 px-2 py-1 rounded">
                            Out of Stock
                          </span>
                        </div>
                      )}
                      
                      <img
                        src={item.image}
                        alt={item.name}
                        className={`w-20 h-20 object-cover rounded-lg ${!item.inStock ? 'opacity-50' : ''}`}
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-grow min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-grow pr-2">
                          <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">{item.name}</h3>
                          <div className="flex items-center gap-1 mb-1">
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < item.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500">({item.reviews})</span>
                          </div>
                          <div className="text-xs text-gray-600 space-y-1">
                            <div>Color: <span className="font-medium">{item.color}</span></div>
                            <div>Size: <span className="font-medium">{item.size}</span></div>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1 text-gray-400 hover:text-red-500 transition-all flex-shrink-0"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Price and Quantity */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-gray-900">
                            ${item.price.toFixed(2)}
                          </span>
                          {item.originalPrice && (
                            <>
                              <span className="text-sm text-gray-500 line-through">
                                ${item.originalPrice.toFixed(2)}
                              </span>
                              {item.discount && (
                                <span className="bg-green-100 text-green-700 text-xs px-1 py-0.5 rounded">
                                  {item.discount}% off
                                </span>
                              )}
                            </>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Quantity Control */}
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-gray-50 transition-colors"
                              disabled={!item.inStock}
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-gray-50 transition-colors"
                              disabled={!item.inStock}
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          {/* Wishlist */}
                          <button
                            onClick={() => moveToWishlist(item.id)}
                            className="p-1 text-gray-400 hover:text-red-500 transition-all"
                            title="Move to Wishlist"
                          >
                            <Heart className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Subtotal */}
                        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                          <span className="text-sm text-gray-600">Subtotal:</span>
                          <span className="text-sm font-bold text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon Section */}
            <div className="bg-white rounded-lg shadow border border-gray-100 p-3">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="h-4 w-4 text-indigo-600" />
                <h3 className="text-sm font-semibold">Promo Code</h3>
              </div>
              
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 flex-grow min-w-0">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span className="font-medium text-green-800 text-sm truncate">
                      {appliedCoupon.code} applied!
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-red-500 hover:text-red-700 transition-colors flex-shrink-0 ml-2"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter promo code"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                    />
                    <button
                      onClick={applyCoupon}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
                    >
                      Apply
                    </button>
                  </div>
                  
                  <button
                    onClick={() => setShowCoupons(!showCoupons)}
                    className="text-indigo-600 hover:text-indigo-700 text-xs transition-colors flex items-center gap-1"
                  >
                    <Gift className="h-3 w-3" />
                    View available coupons
                  </button>
                  
                  {showCoupons && (
                    <div className="mt-2 space-y-1">
                      {availableCoupons.map((coupon) => (
                        <div
                          key={coupon.code}
                          className="flex items-center justify-between bg-gray-50 rounded-lg p-2 cursor-pointer hover:bg-gray-100 transition-colors"
                          onClick={() => {
                            setCouponCode(coupon.code);
                            setShowCoupons(false);
                          }}
                        >
                          <div className="flex-grow min-w-0">
                            <span className="font-medium text-gray-900 text-sm">{coupon.code}</span>
                            <div className="text-xs text-gray-600">
                              {coupon.type === 'percentage' ? `${coupon.discount}% off` : `$${coupon.discount} off`}
                              {coupon.minAmount && ` on orders over $${coupon.minAmount}`}
                            </div>
                          </div>
                          <Percent className="h-3 w-3 text-gray-400 flex-shrink-0" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow border border-gray-100 p-3">
              <h2 className="text-lg font-bold text-gray-900 mb-3">Order Summary</h2>
              
              {/* Price Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                  <span className="font-medium">${calculations.subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-600">Shipping</span>
                    {calculations.shipping === 0 && (
                      <span className="text-xs bg-green-100 text-green-700 px-1 py-0.5 rounded">Free</span>
                    )}
                  </div>
                  <span className="font-medium">
                    {calculations.shipping === 0 ? 'Free' : `$${calculations.shipping.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${calculations.tax.toFixed(2)}</span>
                </div>
                
                {calculations.discount > 0 && (
                  <div className="flex justify-between text-green-600 text-sm">
                    <span>Discount</span>
                    <span className="font-medium">-${calculations.discount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="border-t pt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-xl font-bold text-gray-900">
                      ${calculations.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Out of Stock Warning */}
              {cartItems.some(item => !item.inStock) && (
                <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg mt-3">
                  <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="text-red-800 font-medium">Some items are out of stock</p>
                    <p className="text-red-600">Please remove them to continue checkout</p>
                  </div>
                </div>
              )}

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={cartItems.length === 0 || cartItems.some(item => !item.inStock) || isCheckingOut}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 text-sm font-medium shadow-lg mt-4"
              >
                {isCheckingOut ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    Secure Checkout
                  </>
                )}
              </button>

              {/* Payment Methods */}
              <div className="text-center mt-4">
                <p className="text-xs text-gray-500 mb-2">We accept</p>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-8 h-5 bg-blue-600 rounded flex items-center justify-center">
                    <CreditCard className="h-2 w-2 text-white" />
                  </div>
                  <div className="w-8 h-5 bg-red-500 rounded flex items-center justify-center">
                    <span className="text-xs text-white font-bold">M</span>
                  </div>
                  <div className="w-8 h-5 bg-yellow-500 rounded flex items-center justify-center">
                    <span className="text-xs text-white font-bold">V</span>
                  </div>
                  <div className="w-8 h-5 bg-blue-500 rounded flex items-center justify-center">
                    <span className="text-xs text-white font-bold">PP</span>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="border-t pt-3 mt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span className="text-xs text-gray-600">SSL Secure Checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-blue-600 flex-shrink-0" />
                  <span className="text-xs text-gray-600">Free shipping on orders over $100</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-purple-600 flex-shrink-0" />
                  <span className="text-xs text-gray-600">Express delivery available</span>
                </div>
              </div>
            </div>

            {/* Continue Shopping */}
            <button
              onClick={() => console.log('Navigate to products')}
              className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-sm"
            >
              Continue Shopping
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        )}
      </main>

      <Footer columns={footerColumns} socialLinks={socialLinks} />
    </div>
  );
};

export default CartPage;