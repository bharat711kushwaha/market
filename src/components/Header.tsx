// components/Header.tsx
import React, { useState } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Menu, 
  X,
  ChevronDown,
  Phone,
  MapPin,
  Clock
} from 'lucide-react';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Get navigation function from window (set in App.tsx)
  const navigate = (route: 'home' | 'products' | 'product-single' | 'cart' | 'about' | 'contact', productId?: string) => {
    if ((window as any).navigate) {
      (window as any).navigate(route, productId);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2 text-sm">
            <div className="hidden md:flex items-center space-x-6 text-gray-600">
              <div className="flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>New York, NY</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>Mon-Fri: 9AM-6PM</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-gray-600">
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                ✨ Free Shipping on Orders $100+
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => navigate('home')}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                StyleHub
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Fashion & Lifestyle</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => navigate('home')}
              className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-200"></span>
            </button>
            
            <button
              onClick={() => navigate('products')}
              className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 relative group"
            >
              Products
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-200"></span>
            </button>
            
            {/* Categories Dropdown */}
            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200">
                Categories
                <ChevronDown className="ml-1 h-4 w-4 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-3">
                    <a href="#" className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-blue-600 text-sm">👔</span>
                      </div>
                      <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600">Men's Wear</span>
                    </a>
                    
                    <a href="#" className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                      <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-pink-600 text-sm">👗</span>
                      </div>
                      <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600">Women's Wear</span>
                    </a>
                    
                    <a href="#" className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-green-600 text-sm">👶</span>
                      </div>
                      <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600">Kid's Wear</span>
                    </a>
                    
                    <a href="#" className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-purple-600 text-sm">👜</span>
                      </div>
                      <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600">Accessories</span>
                    </a>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => navigate('products')}
                      className="w-full text-center py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium"
                    >
                      View All Products
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => navigate('about')}
              className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 relative group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-200"></span>
            </button>
            
            <button
              onClick={() => navigate('contact')}
              className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 relative group"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-200"></span>
            </button>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
              >
                <Search className="h-5 w-5" />
              </button>
              
              {/* Search Dropdown */}
              {isSearchOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-50">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      autoFocus
                    />
                  </div>
                  <div className="mt-3 text-xs text-gray-500">
                    Popular: Dresses, Shoes, Bags, T-Shirts
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist */}
            <button className="p-2 text-gray-600 hover:text-red-500 hover:bg-gray-50 rounded-lg transition-all duration-200 relative">
              <Heart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>

            {/* Shopping Cart */}
            <button 
              onClick={() => navigate('cart')}
              className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-all duration-200 relative"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-indigo-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </button>

            {/* User Account */}
            <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-all duration-200">
              <User className="h-5 w-5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 py-4">
            <nav className="space-y-3">
              <button
                onClick={() => navigate('home')}
                className="block w-full text-left py-3 px-4 text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => navigate('products')}
                className="block w-full text-left py-3 px-4 text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Products
              </button>
              <button
                onClick={() => navigate('cart')}
                className="block w-full text-left py-3 px-4 text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Cart
              </button>
              <button
                onClick={() => navigate('about')}
                className="block w-full text-left py-3 px-4 text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                About
              </button>
              <button
                onClick={() => navigate('contact')}
                className="block w-full text-left py-3 px-4 text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Contact
              </button>
            </nav>
            
            {/* Mobile Search */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Search Overlay for mobile */}
      {isSearchOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSearchOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;