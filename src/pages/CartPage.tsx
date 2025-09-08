// pages/Cart.tsx - Cyberpunk Theme
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
      <div className="min-h-screen flex flex-col bg-gray-900">
        <Header />
        <main className="flex-grow container mx-auto px-3 py-4 max-w-full relative">
          {/* Cyberpunk Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20 pointer-events-none"></div>
          
          <div className="max-w-lg mx-auto text-center relative z-10">
            <div className="w-16 h-16 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
            <h1 className="text-xl font-black text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text mb-3 tracking-wider uppercase">CHECKOUT PROCESS</h1>
            <p className="text-sm text-gray-400 mb-6 tracking-wide">This is a demo checkout process. In a real application, this would integrate with payment processors like Stripe, PayPal, etc.</p>
            
            <div className="bg-gray-800 border border-cyan-500/30 rounded-lg shadow-2xl p-4">
              <h2 className="text-lg font-black mb-3 text-gray-100 tracking-wider uppercase">ORDER SUMMARY</h2>
              <div className="space-y-2">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <span className="text-gray-400 truncate pr-2 tracking-wide">{item.name} x {item.quantity}</span>
                    <span className="font-black text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t border-gray-700 pt-2 mt-2">
                  <div className="flex justify-between items-center font-black">
                    <span className="text-gray-100 tracking-wider uppercase">TOTAL</span>
                    <span className="text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text">${calculations.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setCheckoutStep('cart')}
              className="mt-4 w-full px-4 py-3 bg-gradient-to-r from-cyan-500 to-pink-500 text-black font-black rounded-lg hover:from-cyan-400 hover:to-pink-400 transition-all text-sm tracking-wider uppercase"
            >
              BACK TO CART
            </button>
          </div>
        </main>
        <Footer columns={footerColumns} socialLinks={socialLinks} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />
      
      <main className="flex-grow container mx-auto px-3 py-4 max-w-full relative">
        {/* Cyberpunk Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20 pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
        
        {/* Header */}
        <div className="mb-6 relative z-10">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-black text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text mb-2 tracking-wider uppercase">SHOPPING CART</h1>
            <p className="text-sm text-gray-400 font-bold tracking-wider uppercase">
              {cartItems.length} {cartItems.length === 1 ? 'ITEM' : 'ITEMS'} IN YOUR CART
            </p>
            
            {cartItems.length > 0 && (
              <div className="mt-3 md:hidden">
                <div className="text-2xl font-black text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text">${calculations.total.toFixed(2)}</div>
                <div className="text-xs text-gray-500 tracking-wider uppercase">TOTAL INCLUDING TAX</div>
              </div>
            )}
          </div>
        </div>

        {cartItems.length === 0 ? (
          // Empty Cart State
          <div className="text-center py-12 px-3 relative z-10">
            <div className="w-20 h-20 bg-gray-800 border border-cyan-500/30 rounded-xl flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-10 w-10 text-cyan-400" />
            </div>
            <h2 className="text-lg font-black text-gray-100 mb-3 tracking-wider uppercase">YOUR CART IS EMPTY</h2>
            <p className="text-sm text-gray-400 mb-6 tracking-wide">
              Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
            </p>
            <button
              onClick={() => console.log('Navigate to products')}
              className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-pink-500 text-black font-black rounded-lg hover:from-cyan-400 hover:to-pink-400 transition-all flex items-center justify-center gap-2 tracking-wider uppercase"
            >
              CONTINUE SHOPPING
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-4 relative z-10">
            {/* Cart Items */}
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-800 border border-cyan-500/20 rounded-lg p-3 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-500"
                >
                  <div className="flex gap-3">
                    {/* Product Image */}
                    <div className="relative flex-shrink-0">
                      {!item.inStock && (
                        <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center z-10">
                          <span className="text-white font-black text-xs bg-red-500 px-2 py-1 rounded tracking-wider uppercase">
                            OUT OF STOCK
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
                          <h3 className="text-sm font-black text-gray-100 mb-1 line-clamp-2 tracking-wider uppercase">{item.name}</h3>
                          <div className="flex items-center gap-1 mb-1">
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < item.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-400 tracking-wider">({item.reviews})</span>
                          </div>
                          <div className="text-xs text-gray-400 space-y-1 tracking-wide">
                            <div>COLOR: <span className="font-black text-gray-300">{item.color}</span></div>
                            <div>SIZE: <span className="font-black text-gray-300">{item.size}</span></div>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1 text-gray-400 hover:text-red-400 transition-all flex-shrink-0 hover:bg-red-500/20 rounded"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Price and Quantity */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-black text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text">
                            ${item.price.toFixed(2)}
                          </span>
                          {item.originalPrice && (
                            <>
                              <span className="text-sm text-gray-500 line-through">
                                ${item.originalPrice.toFixed(2)}
                              </span>
                              {item.discount && (
                                <span className="bg-green-500/20 text-green-400 text-xs px-1 py-0.5 rounded font-black tracking-wider uppercase">
                                  {item.discount}% OFF
                                </span>
                              )}
                            </>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Quantity Control */}
                          <div className="flex items-center border border-cyan-500/30 rounded-lg bg-gray-700">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-gray-600 transition-colors text-cyan-400"
                              disabled={!item.inStock}
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-3 py-1 text-sm font-black min-w-[2rem] text-center text-gray-100">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-gray-600 transition-colors text-cyan-400"
                              disabled={!item.inStock}
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          {/* Wishlist */}
                          <button
                            onClick={() => moveToWishlist(item.id)}
                            className="p-1 text-gray-400 hover:text-pink-400 transition-all hover:bg-pink-500/20 rounded"
                            title="Move to Wishlist"
                          >
                            <Heart className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Subtotal */}
                        <div className="flex justify-between items-center pt-2 border-t border-gray-700">
                          <span className="text-sm text-gray-400 font-bold tracking-wider uppercase">SUBTOTAL:</span>
                          <span className="text-sm font-black text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text">
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
            <div className="bg-gray-800 border border-cyan-500/20 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="h-4 w-4 text-cyan-400" />
                <h3 className="text-sm font-black text-gray-100 tracking-wider uppercase">PROMO CODE</h3>
              </div>
              
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-green-500/20 border border-green-500/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 flex-grow min-w-0">
                    <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                    <span className="font-black text-green-400 text-sm truncate tracking-wider uppercase">
                      {appliedCoupon.code} APPLIED!
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-red-400 hover:text-red-300 transition-colors flex-shrink-0 ml-2"
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
                      className="flex-1 px-3 py-2 border border-cyan-500/30 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400 bg-gray-900 text-gray-300 placeholder-gray-500 text-sm"
                    />
                    <button
                      onClick={applyCoupon}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-pink-500 text-black font-black rounded-lg hover:from-cyan-400 hover:to-pink-400 transition-all text-sm tracking-wider uppercase"
                    >
                      APPLY
                    </button>
                  </div>
                  
                  <button
                    onClick={() => setShowCoupons(!showCoupons)}
                    className="text-cyan-400 hover:text-pink-400 text-xs transition-colors flex items-center gap-1 font-bold tracking-wider uppercase"
                  >
                    <Gift className="h-3 w-3" />
                    VIEW AVAILABLE COUPONS
                  </button>
                  
                  {showCoupons && (
                    <div className="mt-2 space-y-1">
                      {availableCoupons.map((coupon) => (
                        <div
                          key={coupon.code}
                          className="flex items-center justify-between bg-gray-700 rounded-lg p-2 cursor-pointer hover:bg-gray-600 transition-colors border border-cyan-500/20 hover:border-cyan-400"
                          onClick={() => {
                            setCouponCode(coupon.code);
                            setShowCoupons(false);
                          }}
                        >
                          <div className="flex-grow min-w-0">
                            <span className="font-black text-gray-100 text-sm tracking-wider">{coupon.code}</span>
                            <div className="text-xs text-gray-400 tracking-wide">
                              {coupon.type === 'percentage' ? `${coupon.discount}% OFF` : `${coupon.discount} OFF`}
                              {coupon.minAmount && ` ON ORDERS OVER ${coupon.minAmount}`}
                            </div>
                          </div>
                          <Percent className="h-3 w-3 text-cyan-400 flex-shrink-0" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="bg-gray-800 border border-cyan-500/20 rounded-lg p-3">
              <h2 className="text-lg font-black text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text mb-3 tracking-wider uppercase">ORDER SUMMARY</h2>
              
              {/* Price Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 tracking-wider">SUBTOTAL ({cartItems.length} ITEMS)</span>
                  <span className="font-black text-gray-100">${calculations.subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-400 tracking-wider">SHIPPING</span>
                    {calculations.shipping === 0 && (
                      <span className="text-xs bg-green-500/20 text-green-400 px-1 py-0.5 rounded font-black tracking-wider uppercase">FREE</span>
                    )}
                  </div>
                  <span className="font-black text-gray-100">
                    {calculations.shipping === 0 ? 'FREE' : `${calculations.shipping.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 tracking-wider">TAX</span>
                  <span className="font-black text-gray-100">${calculations.tax.toFixed(2)}</span>
                </div>
                
                {calculations.discount > 0 && (
                  <div className="flex justify-between text-green-400 text-sm">
                    <span className="tracking-wider">DISCOUNT</span>
                    <span className="font-black">-${calculations.discount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="border-t border-gray-700 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-black text-gray-100 tracking-wider uppercase">TOTAL</span>
                    <span className="text-xl font-black text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text">
                      ${calculations.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Out of Stock Warning */}
              {cartItems.some(item => !item.inStock) && (
                <div className="flex items-start gap-2 p-3 bg-red-500/20 border border-red-500/30 rounded-lg mt-3">
                  <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="text-red-400 font-black tracking-wider uppercase">SOME ITEMS ARE OUT OF STOCK</p>
                    <p className="text-red-400 tracking-wide">Please remove them to continue checkout</p>
                  </div>
                </div>
              )}

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={cartItems.length === 0 || cartItems.some(item => !item.inStock) || isCheckingOut}
                className="w-full bg-gradient-to-r from-cyan-500 to-pink-500 text-black py-3 px-4 rounded-lg hover:from-cyan-400 hover:to-pink-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 text-sm font-black shadow-lg shadow-cyan-500/25 mt-4 tracking-wider uppercase"
              >
                {isCheckingOut ? (
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    SECURE CHECKOUT
                  </>
                )}
              </button>

              {/* Payment Methods */}
              <div className="text-center mt-4">
                <p className="text-xs text-gray-400 mb-2 font-bold tracking-wider uppercase">WE ACCEPT</p>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-8 h-5 bg-blue-600 rounded flex items-center justify-center border border-cyan-500/30">
                    <CreditCard className="h-2 w-2 text-white" />
                  </div>
                  <div className="w-8 h-5 bg-red-500 rounded flex items-center justify-center border border-pink-500/30">
                    <span className="text-xs text-white font-black">M</span>
                  </div>
                  <div className="w-8 h-5 bg-yellow-500 rounded flex items-center justify-center border border-yellow-500/30">
                    <span className="text-xs text-black font-black">V</span>
                  </div>
                  <div className="w-8 h-5 bg-blue-500 rounded flex items-center justify-center border border-blue-500/30">
                    <span className="text-xs text-white font-black">PP</span>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="border-t border-gray-700 pt-3 mt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-400 flex-shrink-0" />
                  <span className="text-xs text-gray-400 tracking-wider uppercase">SSL SECURE CHECKOUT</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-blue-400 flex-shrink-0" />
                  <span className="text-xs text-gray-400 tracking-wider uppercase">FREE SHIPPING ON ORDERS OVER $100</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-purple-400 flex-shrink-0" />
                  <span className="text-xs text-gray-400 tracking-wider uppercase">EXPRESS DELIVERY AVAILABLE</span>
                </div>
              </div>
            </div>

            {/* Continue Shopping */}
            <button
              onClick={() => console.log('Navigate to products')}
              className="w-full bg-gray-800 border border-cyan-500/30 text-gray-300 py-3 px-4 rounded-lg hover:bg-gray-700 hover:border-cyan-400 transition-all flex items-center justify-center gap-2 text-sm font-bold tracking-wider uppercase"
            >
              CONTINUE SHOPPING
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