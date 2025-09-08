// Header.tsx - Fixed Mobile Responsive Version
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
    <header className="bg-gray-900 shadow-2xl sticky top-0 z-50 relative overflow-hidden">
      {/* Cyberpunk Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-gray-900 to-cyan-900/30"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-70"></div>

      {/* Top Bar - Hidden on mobile */}
      <div className="hidden sm:block bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 border-b border-cyan-500/20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2 text-sm">
            <div className="hidden lg:flex items-center space-x-6 text-gray-400">
              <div className="flex items-center space-x-2 group">
                <Phone className="h-4 w-4 text-cyan-400 group-hover:text-pink-400 transition-colors" />
                <span className="group-hover:text-white transition-colors">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 group">
                <MapPin className="h-4 w-4 text-cyan-400 group-hover:text-pink-400 transition-colors" />
                <span className="group-hover:text-white transition-colors">New York, NY</span>
              </div>
              <div className="flex items-center space-x-2 group">
                <Clock className="h-4 w-4 text-cyan-400 group-hover:text-pink-400 transition-colors" />
                <span className="group-hover:text-white transition-colors">Mon-Fri: 9AM-6PM</span>
              </div>
            </div>
            
            <div className="flex items-center">
              <span className="text-xs bg-gradient-to-r from-cyan-500 to-pink-500 text-black px-2 sm:px-3 py-1 rounded-full font-bold tracking-wider animate-pulse">
                ⚡ FREE SHIPPING $100+
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        <div className="flex items-center justify-between py-3 sm:py-4">
          {/* Logo - Responsive sizing */}
          <div 
            className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group"
            onClick={() => navigate('home')}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/25">
              <span className="text-black font-black text-xl sm:text-2xl">U</span>
            </div>
            <div className="hidden xs:block">
              <h1 className="text-2xl sm:text-3xl font-black tracking-wider bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
                URAAN
              </h1>
              <p className="text-xs text-gray-400 -mt-1 tracking-widest uppercase hidden sm:block">STREETWEAR</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => navigate('home')}
              className="text-gray-300 hover:text-cyan-400 font-bold tracking-wider uppercase transition-all duration-300 relative group text-sm"
            >
              HOME
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-pink-500 group-hover:w-full transition-all duration-300"></span>
            </button>
            
            <button
              onClick={() => navigate('products')}
              className="text-gray-300 hover:text-cyan-400 font-bold tracking-wider uppercase transition-all duration-300 relative group text-sm"
            >
              PRODUCTS
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-pink-500 group-hover:w-full transition-all duration-300"></span>
            </button>
            

            
            <button
              onClick={() => navigate('about')}
              className="text-gray-300 hover:text-cyan-400 font-bold tracking-wider uppercase transition-all duration-300 relative group text-sm"
            >
              ABOUT
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-pink-500 group-hover:w-full transition-all duration-300"></span>
            </button>
            
            <button
              onClick={() => navigate('contact')}
              className="text-gray-300 hover:text-cyan-400 font-bold tracking-wider uppercase transition-all duration-300 relative group text-sm"
            >
              CONTACT
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-pink-500 group-hover:w-full transition-all duration-300"></span>
            </button>
          </nav>

          {/* Right Side Actions - Responsive */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Search - Hidden on small mobile, visible on larger screens */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 sm:p-3 text-gray-400 hover:text-cyan-400 hover:bg-gray-800 rounded-lg transition-all duration-300 border border-transparent hover:border-cyan-500/30"
              >
                <Search className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              
              {/* Search Dropdown */}
              {isSearchOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-gray-800 rounded-xl shadow-2xl border border-cyan-500/30 p-4 z-50">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-cyan-400" />
                    <input
                      type="text"
                      placeholder="Search urban gear..."
                      className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-cyan-500/30 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/25 transition-all"
                      autoFocus
                    />
                  </div>
                  <div className="mt-3 text-xs text-gray-400 tracking-wider">
                    TRENDING: HOODIES, KICKS, CHAINS, TEES
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist - Hidden on small mobile */}
            <button className="hidden sm:block p-2 sm:p-3 text-gray-400 hover:text-pink-400 hover:bg-gray-800 rounded-lg transition-all duration-300 relative border border-transparent hover:border-pink-500/30">
              <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-purple-500 text-black text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-bold">
                3
              </span>
            </button>

            {/* Shopping Cart */}
            <button 
              onClick={() => navigate('cart')}
              className="p-2 sm:p-3 text-gray-400 hover:text-cyan-400 hover:bg-gray-800 rounded-lg transition-all duration-300 relative border border-transparent hover:border-cyan-500/30"
            >
              <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-black text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-bold">
                2
              </span>
            </button>

            {/* User Account - Hidden on small mobile */}
            <button className="hidden sm:block p-2 sm:p-3 text-gray-400 hover:text-purple-400 hover:bg-gray-800 rounded-lg transition-all duration-300 border border-transparent hover:border-purple-500/30">
              <User className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            {/* Mobile Menu Button - Always visible on mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 sm:p-3 text-gray-400 hover:text-cyan-400 hover:bg-gray-800 rounded-lg transition-all duration-300 border border-transparent hover:border-cyan-500/30 ml-2"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-75 z-40 lg:hidden backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Mobile Menu */}
          <div className="lg:hidden fixed top-full left-0 right-0 bg-gray-800 border-t border-cyan-500/30 z-50 max-h-[calc(100vh-100px)] overflow-y-auto shadow-2xl">
            <div className="container mx-auto px-4 py-4">
              {/* Mobile Search - Always visible in mobile menu */}
              <div className="mb-4 pb-4 border-b border-gray-700">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-cyan-400" />
                  <input
                    type="text"
                    placeholder="Search urban gear..."
                    className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-cyan-500/30 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/25 transition-all text-sm"
                  />
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-2">
                <button
                  onClick={() => navigate('home')}
                  className="block w-full text-left py-3 px-4 text-gray-300 hover:text-cyan-400 hover:bg-gray-700 rounded-lg transition-all font-bold tracking-wider uppercase text-sm"
                >
                  HOME
                </button>
                <button
                  onClick={() => navigate('products')}
                  className="block w-full text-left py-3 px-4 text-gray-300 hover:text-cyan-400 hover:bg-gray-700 rounded-lg transition-all font-bold tracking-wider uppercase text-sm"
                >
                  PRODUCTS
                </button>
                
                {/* Mobile Categories */}
                <div className="space-y-2 ml-4">
                  <button
                    onClick={() => navigate('products')}
                    className="block w-full text-left py-2 px-4 text-gray-400 hover:text-cyan-300 hover:bg-gray-700 rounded-lg transition-all text-sm"
                  >
                    👔 MEN'S
                  </button>
                  <button
                    onClick={() => navigate('products')}
                    className="block w-full text-left py-2 px-4 text-gray-400 hover:text-pink-300 hover:bg-gray-700 rounded-lg transition-all text-sm"
                  >
                    👗 WOMEN'S
                  </button>
                  <button
                    onClick={() => navigate('products')}
                    className="block w-full text-left py-2 px-4 text-gray-400 hover:text-green-300 hover:bg-gray-700 rounded-lg transition-all text-sm"
                  >
                    👶 KIDS
                  </button>
                  <button
                    onClick={() => navigate('products')}
                    className="block w-full text-left py-2 px-4 text-gray-400 hover:text-purple-300 hover:bg-gray-700 rounded-lg transition-all text-sm"
                  >
                    👜 GEAR
                  </button>
                </div>
                
                <button
                  onClick={() => navigate('cart')}
                  className="flex items-center justify-between w-full text-left py-3 px-4 text-gray-300 hover:text-cyan-400 hover:bg-gray-700 rounded-lg transition-all font-bold tracking-wider uppercase text-sm"
                >
                  CART
                  <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    2
                  </span>
                </button>
                <button
                  onClick={() => navigate('about')}
                  className="block w-full text-left py-3 px-4 text-gray-300 hover:text-cyan-400 hover:bg-gray-700 rounded-lg transition-all font-bold tracking-wider uppercase text-sm"
                >
                  ABOUT
                </button>
                <button
                  onClick={() => navigate('contact')}
                  className="block w-full text-left py-3 px-4 text-gray-300 hover:text-cyan-400 hover:bg-gray-700 rounded-lg transition-all font-bold tracking-wider uppercase text-sm"
                >
                  CONTACT
                </button>
              </nav>
              
              {/* Mobile Action Buttons */}
              <div className="mt-6 pt-4 border-t border-gray-700 flex space-x-4">
                <button className="flex-1 flex items-center justify-center py-3 px-4 text-gray-300 hover:text-pink-400 hover:bg-gray-700 rounded-lg transition-all border border-gray-600 hover:border-pink-500/30">
                  <Heart className="h-4 w-4 mr-2" />
                  <span className="text-sm font-bold">WISHLIST</span>
                  <span className="ml-2 bg-gradient-to-r from-pink-500 to-purple-500 text-black text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">3</span>
                </button>
                <button className="flex-1 flex items-center justify-center py-3 px-4 text-gray-300 hover:text-purple-400 hover:bg-gray-700 rounded-lg transition-all border border-gray-600 hover:border-purple-500/30">
                  <User className="h-4 w-4 mr-2" />
                  <span className="text-sm font-bold">ACCOUNT</span>
                </button>
              </div>
              
              {/* Mobile Promo Banner */}
              <div className="mt-4 p-3 bg-gradient-to-r from-cyan-500/10 to-pink-500/10 rounded-lg border border-cyan-500/20 text-center">
                <span className="text-xs bg-gradient-to-r from-cyan-500 to-pink-500 text-black px-3 py-1 rounded-full font-bold tracking-wider animate-pulse">
                  ⚡ FREE SHIPPING $100+
                </span>
              </div>
            </div>
          </div>
        </>
      )}
      
      {/* Search Overlay for desktop */}
      {isSearchOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-40 hidden sm:block lg:hidden backdrop-blur-sm"
          onClick={() => setIsSearchOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;