// Header.tsx - Cyberpunk Theme
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

      {/* Top Bar */}
      <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 border-b border-cyan-500/20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2 text-sm">
            <div className="hidden md:flex items-center space-x-6 text-gray-400">
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
            
            <div className="flex items-center space-x-4">
              <span className="text-xs bg-gradient-to-r from-cyan-500 to-pink-500 text-black px-3 py-1 rounded-full font-bold tracking-wider animate-pulse">
                ⚡ FREE SHIPPING $100+
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => navigate('home')}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/25">
              <span className="text-black font-black text-2xl">U</span>
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-wider bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
                URBAN
              </h1>
              <p className="text-xs text-gray-400 -mt-1 tracking-widest uppercase">STREETWEAR</p>
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
            
            {/* Categories Dropdown */}
            <div className="relative group">
              <button className="flex items-center text-gray-300 hover:text-cyan-400 font-bold tracking-wider uppercase transition-all duration-300 text-sm">
                CATEGORIES
                <ChevronDown className="ml-1 h-4 w-4 group-hover:rotate-180 transition-transform duration-300" />
              </button>
              
              <div className="fixed top-[120px] left-1/2 transform -translate-x-1/2 w-72 bg-gray-800 rounded-xl shadow-2xl border border-cyan-500/30 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[9999]">
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => {
                        navigate('products');
                        // You can add category filtering logic here if needed
                        // For example: setSelectedCategory('men')
                      }}
                      className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-all group border border-transparent hover:border-cyan-500/30 w-full text-left"
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-black text-sm font-bold">👔</span>
                      </div>
                      <span className="text-sm font-bold text-gray-300 group-hover:text-cyan-400 tracking-wider">MEN'S</span>
                    </button>
                    
                    <button 
                      onClick={() => {
                        navigate('products');
                        // You can add category filtering logic here if needed
                        // For example: setSelectedCategory('women')
                      }}
                      className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-all group border border-transparent hover:border-pink-500/30 w-full text-left"
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-black text-sm font-bold">👗</span>
                      </div>
                      <span className="text-sm font-bold text-gray-300 group-hover:text-pink-400 tracking-wider">WOMEN'S</span>
                    </button>
                    
                    <button 
                      onClick={() => {
                        navigate('products');
                        // You can add category filtering logic here if needed
                        // For example: setSelectedCategory('kids')
                      }}
                      className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-all group border border-transparent hover:border-green-500/30 w-full text-left"
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-black text-sm font-bold">👶</span>
                      </div>
                      <span className="text-sm font-bold text-gray-300 group-hover:text-green-400 tracking-wider">KIDS</span>
                    </button>
                    
                    <button 
                      onClick={() => {
                        navigate('products');
                        // You can add category filtering logic here if needed
                        // For example: setSelectedCategory('accessories')
                      }}
                      className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-all group border border-transparent hover:border-purple-500/30 w-full text-left"
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-black text-sm font-bold">👜</span>
                      </div>
                      <span className="text-sm font-bold text-gray-300 group-hover:text-purple-400 tracking-wider">GEAR</span>
                    </button>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-700">
                    <button
                      onClick={() => navigate('products')}
                      className="w-full text-center py-3 bg-gradient-to-r from-cyan-500 to-pink-500 text-black rounded-lg hover:from-cyan-400 hover:to-pink-400 transition-all text-sm font-black tracking-wider uppercase shadow-lg hover:shadow-cyan-500/25"
                    >
                      VIEW ALL
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
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

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-3 text-gray-400 hover:text-cyan-400 hover:bg-gray-800 rounded-lg transition-all duration-300 border border-transparent hover:border-cyan-500/30"
              >
                <Search className="h-5 w-5" />
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

            {/* Wishlist */}
            <button className="p-3 text-gray-400 hover:text-pink-400 hover:bg-gray-800 rounded-lg transition-all duration-300 relative border border-transparent hover:border-pink-500/30">
              <Heart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-purple-500 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                3
              </span>
            </button>

            {/* Shopping Cart */}
            <button 
              onClick={() => navigate('cart')}
              className="p-3 text-gray-400 hover:text-cyan-400 hover:bg-gray-800 rounded-lg transition-all duration-300 relative border border-transparent hover:border-cyan-500/30"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                2
              </span>
            </button>

            {/* User Account */}
            <button className="p-3 text-gray-400 hover:text-purple-400 hover:bg-gray-800 rounded-lg transition-all duration-300 border border-transparent hover:border-purple-500/30">
              <User className="h-5 w-5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-3 text-gray-400 hover:text-cyan-400 hover:bg-gray-800 rounded-lg transition-all duration-300 border border-transparent hover:border-cyan-500/30"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-gray-800 border-t border-cyan-500/30 relative z-10">
          <div className="container mx-auto px-4 py-4">
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
              <button
                onClick={() => navigate('cart')}
                className="block w-full text-left py-3 px-4 text-gray-300 hover:text-cyan-400 hover:bg-gray-700 rounded-lg transition-all font-bold tracking-wider uppercase text-sm"
              >
                CART
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
            
            {/* Mobile Search */}
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-cyan-400" />
                <input
                  type="text"
                  placeholder="Search urban gear..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-cyan-500/30 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/25 transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Search Overlay for mobile */}
      {isSearchOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSearchOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;