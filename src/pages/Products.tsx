// pages/Products.tsx
import React, { useState, useMemo } from 'react';
import { 
  Search, 
  
  Grid3X3, 
  List, 
  
  Star, 
  Heart, 
  ShoppingBag, 
  Eye,
  X,
  SlidersHorizontal,
  ArrowRight,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { footerColumns, socialLinks } from '../data/homeData';

// Product Interface
interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  category: string;
  badge?: {
    type: 'hot' | 'new' | 'sale' | 'sold';
    text: string;
  };
  discount?: string;
  rating: number;
  reviews: number;
  colors: string[];
  sizes: string[];
  description: string;
}

// Products Data with more realistic content
const allProducts: Product[] = [
  {
    id: 1,
    name: 'Premium Cotton T-Shirt',
    price: '$99',
    originalPrice: '$129',
    image: '1-a.jpg',
    category: 'men',
    badge: { type: 'hot', text: 'Hot' },
    discount: '23%',
    rating: 4,
    reviews: 128,
    colors: ['#000000', '#ffffff', '#3b82f6'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Ultra-soft premium cotton t-shirt with modern fit. Perfect for casual wear.'
  },
  {
    id: 2,
    name: 'Designer Floral Dress',
    price: '$149',
    originalPrice: '$199',
    image: '5-a.jpg',
    category: 'women',
    badge: { type: 'sale', text: 'Sale' },
    discount: '25%',
    rating: 5,
    reviews: 89,
    colors: ['#ec4899', '#8b5cf6', '#10b981'],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Elegant floral print dress perfect for special occasions and summer events.'
  },
  {
    id: 3,
    name: 'Kids Superhero Costume',
    price: '$79',
    image: '2-a.jpg',
    category: 'kids',
    badge: { type: 'new', text: 'New' },
    rating: 4,
    reviews: 45,
    colors: ['#dc2626', '#2563eb', '#059669'],
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'],
    description: 'High-quality superhero costume that sparks imagination and adventure.'
  },
  {
    id: 4,
    name: 'Leather Laptop Bag',
    price: '$199',
    originalPrice: '$249',
    image: '6-a.jpg',
    category: 'accessories',
    badge: { type: 'hot', text: 'Hot' },
    discount: '20%',
    rating: 5,
    reviews: 156,
    colors: ['#92400e', '#000000', '#6b7280'],
    sizes: ['One Size'],
    description: 'Professional leather laptop bag with multiple compartments for organization.'
  },
  {
    id: 5,
    name: 'Sports Running Shoes',
    price: '$159',
    originalPrice: '$199',
    image: '1-a.jpg',
    category: 'men',
    badge: { type: 'sale', text: 'Sale' },
    discount: '20%',
    rating: 4,
    reviews: 78,
    colors: ['#000000', '#ffffff', '#ef4444'],
    sizes: ['7', '8', '9', '10', '11'],
    description: 'Lightweight running shoes with advanced cushioning technology.'
  },
  {
    id: 6,
    name: 'Elegant Evening Gown',
    price: '$299',
    image: '5-a.jpg',
    category: 'women',
    badge: { type: 'new', text: 'New' },
    rating: 5,
    reviews: 34,
    colors: ['#000000', '#7c3aed', '#db2777'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Stunning evening gown crafted from premium silk with intricate detailing.'
  },
  {
    id: 7,
    name: 'Casual Denim Jacket',
    price: '$129',
    originalPrice: '$179',
    image: '2-a.jpg',
    category: 'unisex',
    badge: { type: 'sale', text: 'Sale' },
    discount: '28%',
    rating: 4,
    reviews: 92,
    colors: ['#1e40af', '#374151', '#000000'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Classic denim jacket with vintage wash. A timeless wardrobe essential.'
  },
  {
    id: 8,
    name: 'Designer Sunglasses',
    price: '$89',
    originalPrice: '$119',
    image: '6-a.jpg',
    category: 'accessories',
    badge: { type: 'hot', text: 'Hot' },
    discount: '25%',
    rating: 4,
    reviews: 203,
    colors: ['#000000', '#92400e', '#6b7280'],
    sizes: ['One Size'],
    description: 'Premium designer sunglasses with UV protection and polarized lenses.'
  }
];

const ProductsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSort, setSelectedSort] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const itemsPerPage = 8;

  const categories = [
    { id: 'all', label: 'All Products', count: allProducts.length },
    { id: 'men', label: "Men's Wear", count: allProducts.filter(p => p.category === 'men').length },
    { id: 'women', label: "Women's Wear", count: allProducts.filter(p => p.category === 'women').length },
    { id: 'kids', label: "Kids' Wear", count: allProducts.filter(p => p.category === 'kids').length },
    { id: 'accessories', label: 'Accessories', count: allProducts.filter(p => p.category === 'accessories').length },
    { id: 'unisex', label: 'Unisex', count: allProducts.filter(p => p.category === 'unisex').length }
  ];

  const sortOptions = [
    { id: 'featured', label: 'Featured' },
    { id: 'price-low', label: 'Price: Low to High' },
    { id: 'price-high', label: 'Price: High to Low' },
    { id: 'rating', label: 'Customer Rating' },
    { id: 'newest', label: 'Newest First' }
  ];

  const availableColors = ['#000000', '#ffffff', '#3b82f6', '#ec4899', '#8b5cf6', '#10b981', '#dc2626', '#92400e'];
  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '7', '8', '9', '10', '11', 'One Size'];

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let filtered = allProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const price = parseInt(product.price.replace('$', ''));
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
      const matchesColors = selectedColors.length === 0 || selectedColors.some(color => product.colors.includes(color));
      const matchesSizes = selectedSizes.length === 0 || selectedSizes.some(size => product.sizes.includes(size));
      
      return matchesSearch && matchesCategory && matchesPrice && matchesColors && matchesSizes;
    });

    // Sort products
    switch (selectedSort) {
      case 'price-low':
        filtered.sort((a, b) => parseInt(a.price.replace('$', '')) - parseInt(b.price.replace('$', '')));
        break;
      case 'price-high':
        filtered.sort((a, b) => parseInt(b.price.replace('$', '')) - parseInt(a.price.replace('$', '')));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    return filtered;
  }, [searchTerm, selectedCategory, selectedSort, priceRange, selectedColors, selectedSizes]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

const handleViewProduct = (productId: number) => {
  const navigate = (window as any).navigate;
  if (navigate) {
    navigate('product-single', productId.toString());
  }
};

  const handleAddToCart = (product: Product) => {
    console.log('Adding to cart:', product);
    // Add to cart logic here
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Enhanced Hero Section with Background Image */}
      <section className="relative h-[60vh] overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-110 transition-transform duration-[20s] ease-linear"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('banner-2.png')`
          }}
        ></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-500/10 rounded-full animate-ping"></div>
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center text-center">
          <div className="max-w-4xl animate-fade-in-up">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-yellow-400 mr-2 animate-pulse" />
              <span className="text-yellow-400 font-medium text-lg tracking-wide">Premium Fashion Collection</span>
              <Sparkles className="h-8 w-8 text-yellow-400 ml-2 animate-pulse" />
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-purple-100 animate-text-shimmer">
              Style Redefined
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Discover our curated collection of premium fashion pieces designed for those who dare to be different
            </p>
            
            {/* Category Quick Links */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {['Men', 'Women', 'Kids', 'Accessories'].map((cat, index) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat.toLowerCase())}
                  className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border border-white/20 hover:border-white/40"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            {/* Features */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <TrendingUp className="h-4 w-4 mr-2 text-green-400" />
                <span className="text-white">Free Shipping</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Sparkles className="h-4 w-4 mr-2 text-blue-400" />
                <span className="text-white">Quality Guaranteed</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Heart className="h-4 w-4 mr-2 text-red-400" />
                <span className="text-white">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      <main className="flex-grow bg-gradient-to-br from-gray-50 via-white to-blue-50">
        {/* Enhanced Filter Bar */}
        <div className="sticky top-16 z-40 bg-white/80 backdrop-blur-lg shadow-lg border-b border-white/20">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-grow max-w-md">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/90 backdrop-blur-sm transition-all placeholder-gray-400"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-3 h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>

              {/* Filters */}
              <div className="flex gap-3 flex-wrap">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-indigo-500 bg-white/90 backdrop-blur-sm min-w-[160px] transition-all"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.label} ({category.count})
                    </option>
                  ))}
                </select>

                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="px-4 py-3 border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-indigo-500 bg-white/90 backdrop-blur-sm min-w-[180px] transition-all"
                >
                  {sortOptions.map(option => (
                    <option key={option.id} value={option.id}>{option.label}</option>
                  ))}
                </select>

                {/* View Mode Toggle */}
                <div className="flex bg-gray-100/80 backdrop-blur-sm rounded-xl p-1 border border-gray-200/50">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    <Grid3X3 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    <List className="h-5 w-5" />
                  </button>
                </div>

                {/* Advanced Filters Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-3 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-colors transform hover:scale-105"
                >
                  <SlidersHorizontal className="h-5 w-5" />
                  <span className="hidden sm:block">Filters</span>
                </button>
              </div>
            </div>

            {/* Advanced Filters Panel */}
            {showFilters && (
              <div className="mt-4 p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 animate-slide-down">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Price Range */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Price Range</h3>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="500"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full accent-indigo-500"
                      />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Colors */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Colors</h3>
                    <div className="flex flex-wrap gap-2">
                      {availableColors.map(color => (
                        <button
                          key={color}
                          onClick={() => {
                            if (selectedColors.includes(color)) {
                              setSelectedColors(selectedColors.filter(c => c !== color));
                            } else {
                              setSelectedColors([...selectedColors, color]);
                            }
                          }}
                          className={`w-8 h-8 rounded-full border-2 transition-all transform hover:scale-110 ${
                            selectedColors.includes(color) ? 'border-indigo-500 ring-2 ring-indigo-500/30' : 'border-gray-300'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Sizes */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Sizes</h3>
                    <div className="flex flex-wrap gap-2">
                      {availableSizes.map(size => (
                        <button
                          key={size}
                          onClick={() => {
                            if (selectedSizes.includes(size)) {
                              setSelectedSizes(selectedSizes.filter(s => s !== size));
                            } else {
                              setSelectedSizes([...selectedSizes, size]);
                            }
                          }}
                          className={`px-3 py-1 rounded-lg border transition-all text-sm ${
                            selectedSizes.includes(size)
                              ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Clear Filters */}
                <div className="mt-4 pt-4 border-t border-gray-200/50">
                  <button
                    onClick={() => {
                      setSelectedColors([]);
                      setSelectedSizes([]);
                      setPriceRange([0, 500]);
                      setSearchTerm('');
                      setSelectedCategory('all');
                    }}
                    className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Summary */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center text-gray-600">
            <p className="flex items-center">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
              {searchTerm && <span className="ml-2 text-indigo-600">for "{searchTerm}"</span>}
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="container mx-auto px-4 pb-8">
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {currentProducts.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                viewMode={viewMode} 
                onView={() => handleViewProduct(product.id)}
                onAddToCart={() => handleAddToCart(product)}
                index={index}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="w-32 h-32 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-16 w-16 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setPriceRange([0, 500]);
                  setSelectedColors([]);
                  setSelectedSizes([]);
                }}
                className="px-8 py-3 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-colors transform hover:scale-105"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Enhanced Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-16">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                Previous
              </button>
              
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const pageNum = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
                if (pageNum > totalPages) return null;
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      currentPage === pageNum
                        ? 'bg-indigo-500 text-white shadow-lg transform scale-105'
                        : 'border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer columns={footerColumns} socialLinks={socialLinks} />
    </div>
  );
};

// Enhanced Product Card Component
const ProductCard: React.FC<{ 
  product: Product; 
  viewMode: 'grid' | 'list';
  onView: () => void;
  onAddToCart: () => void;
  index: number;
}> = ({ product, viewMode, onView, onAddToCart, index }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (viewMode === 'list') {
    return (
      <div 
        className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 border border-white/50 hover:border-indigo-200 transform hover:-translate-y-1"
        style={{ animationDelay: `${index * 100}ms` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex gap-6">
          <div className="relative flex-shrink-0 group">
            {product.badge && (
              <div className={`absolute top-3 left-3 z-10 px-3 py-1 text-xs text-white font-medium rounded-full
                ${product.badge.type === 'hot' ? 'bg-gradient-to-r from-red-500 to-pink-500' : 
                  product.badge.type === 'new' ? 'bg-gradient-to-r from-blue-500 to-indigo-500' : 
                  product.badge.type === 'sale' ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 
                  product.badge.type === 'sold' ? 'bg-gradient-to-r from-gray-500 to-gray-600' : 'bg-indigo-500'
                }`}>
                {product.badge.text}
              </div>
            )}
            
            {product.discount && (
              <div className="absolute top-3 right-3 z-10 px-2 py-1 text-xs text-white font-bold rounded-full bg-gradient-to-r from-red-500 to-pink-500">
                -{product.discount}
              </div>
            )}
            
            <div className="relative overflow-hidden rounded-xl">
              <img
                src={product.image}
                alt={product.name}
                className={`w-40 h-40 object-cover transition-all duration-500 ${
                  isHovered ? 'scale-110' : 'scale-100'
                }`}
              />
              <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`} />
            </div>
          </div>
          
          <div className="flex-grow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 hover:text-indigo-600 transition-colors cursor-pointer"
                    onClick={onView}>
                  {product.name}
                </h3>
                
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 transition-colors ${
                          i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">({product.reviews} reviews)</span>
                </div>
              </div>
              
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
                  isWishlisted 
                    ? 'bg-red-50 text-red-500 hover:bg-red-100' 
                    : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-red-500'
                }`}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>
            
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">
              {product.description}
            </p>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold text-gray-800">{product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-gray-500 line-through">{product.originalPrice}</span>
                  {product.discount && (
                    <span className="text-sm bg-green-100 text-green-600 px-2 py-1 rounded-full font-medium">
                      Save {product.discount}
                    </span>
                  )}
                </>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                <div className="flex gap-1">
                  {product.colors.slice(0, 4).map((color, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full border-2 border-white shadow-sm ring-1 ring-gray-200"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  {product.colors.length > 4 && (
                    <div className="w-6 h-6 rounded-full border-2 border-white shadow-sm ring-1 ring-gray-200 bg-gray-100 flex items-center justify-center">
                      <span className="text-xs text-gray-600">+{product.colors.length - 4}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-1">
                  {product.sizes.slice(0, 3).map((size, i) => (
                    <span key={i} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      {size}
                    </span>
                  ))}
                  {product.sizes.length > 3 && (
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      +{product.sizes.length - 3}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={onView}
                  className="p-3 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <Eye className="h-5 w-5" />
                </button>
                <button
                  onClick={onAddToCart}
                  className="px-6 py-3 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg"
                >
                  <ShoppingBag className="h-5 w-5" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/50 hover:border-indigo-200 transform hover:-translate-y-2"
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        {product.badge && (
          <div className={`absolute top-3 left-3 z-10 px-2 py-1 text-xs text-white font-medium rounded-lg
            ${product.badge.type === 'hot' ? 'bg-gradient-to-r from-red-500 to-pink-500' : 
              product.badge.type === 'new' ? 'bg-gradient-to-r from-blue-500 to-indigo-500' : 
              product.badge.type === 'sale' ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 
              product.badge.type === 'sold' ? 'bg-gradient-to-r from-gray-500 to-gray-600' : 'bg-indigo-500'
            }`}>
            {product.badge.text}
          </div>
        )}
        
        {product.discount && (
          <div className="absolute top-3 right-3 z-10 px-2 py-1 text-xs text-white font-bold rounded-lg bg-gradient-to-r from-red-500 to-pink-500 shadow-lg">
            -{product.discount}
          </div>
        )}
        
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-3">
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-3 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110 shadow-lg ${
                  isWishlisted ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-800 hover:bg-red-500 hover:text-white'
                }`}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
              <button 
                onClick={onView}
                className="p-3 bg-white/90 text-gray-800 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110 hover:bg-indigo-500 hover:text-white shadow-lg"
              >
                <Eye className="h-5 w-5" />
              </button>
              <button 
                onClick={onAddToCart}
                className="p-3 bg-indigo-500 text-white rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110 hover:bg-indigo-600 shadow-lg"
              >
                <ShoppingBag className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-center mb-2">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 transition-colors ${
                  i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`} 
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-2">({product.reviews})</span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-indigo-600 transition-colors cursor-pointer truncate"
            onClick={onView}>
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-gray-800">{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex gap-1">
            {product.colors.slice(0, 3).map((color, i) => (
              <div
                key={i}
                className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: color }}
              />
            ))}
            {product.colors.length > 3 && (
              <div className="w-5 h-5 rounded-full border border-gray-300 bg-gray-100 flex items-center justify-center">
                <span className="text-xs text-gray-600">+{product.colors.length - 3}</span>
              </div>
            )}
          </div>
          
          <div className="flex gap-1 text-xs text-gray-500">
            {product.sizes.slice(0, 2).map((size, i) => (
              <span key={i} className="bg-gray-100 px-2 py-1 rounded">{size}</span>
            ))}
            {product.sizes.length > 2 && <span>+{product.sizes.length - 2}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;