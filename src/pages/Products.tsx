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
      <section className="relative h-[40vh] overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-110"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('bl-2.png')`
          }}
        ></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-white/5 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-indigo-500/10 rounded-full animate-ping"></div>
        </div>
        
        <div className="relative container mx-auto px-3 h-full flex items-center justify-center text-center">
          <div className="max-w-lg">
            <div className="flex items-center justify-center mb-2">
              <Sparkles className="h-4 w-4 text-yellow-400 mr-1 animate-pulse" />
              <span className="text-yellow-400 font-medium text-xs tracking-wide">Premium Fashion Collection</span>
              <Sparkles className="h-4 w-4 text-yellow-400 ml-1 animate-pulse" />
            </div>
            
            <h1 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-purple-100">
              Style Redefined
            </h1>
            
            <p className="text-sm mb-4 text-gray-200 leading-relaxed">
              Discover our curated collection of premium fashion pieces designed for those who dare to be different
            </p>
            
            {/* Category Quick Links */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {['Men', 'Women', 'Kids', 'Accessories'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat.toLowerCase())}
                  className="bg-white/10 backdrop-blur-sm text-white px-3 py-1.5 rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border border-white/20 hover:border-white/40 text-xs"
                >
                  {cat}
                </button>
              ))}
            </div>
            
            {/* Features */}
            <div className="flex flex-wrap justify-center gap-2 text-xs">
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-2 py-1 rounded-full">
                <TrendingUp className="h-3 w-3 mr-1 text-green-400" />
                <span className="text-white">Free Shipping</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-2 py-1 rounded-full">
                <Sparkles className="h-3 w-3 mr-1 text-blue-400" />
                <span className="text-white">Quality Guaranteed</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-2 py-1 rounded-full">
                <Heart className="h-3 w-3 mr-1 text-red-400" />
                <span className="text-white">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="flex-grow bg-gradient-to-br from-gray-50 via-white to-blue-50">
        {/* Enhanced Filter Bar */}
        <div className="sticky top-16 z-40 bg-white/90 backdrop-blur-lg shadow border-b">
          <div className="container mx-auto px-3 py-3 max-w-full">
            <div className="space-y-3">
              {/* Search */}
              <div className="relative w-full">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/90 text-sm"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Filters */}
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white/90 text-sm"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.label.replace("'s Wear", "")} ({category.count})
                      </option>
                    ))}
                  </select>

                  <select
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white/90 text-sm"
                  >
                    {sortOptions.map(option => (
                      <option key={option.id} value={option.id}>{option.label}</option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-2 justify-between">
                  {/* View Mode Toggle */}
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-1.5 rounded transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-1.5 rounded transition-all ${viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Advanced Filters Toggle */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-1 px-3 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors text-sm"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Advanced Filters Panel */}
            {showFilters && (
              <div className="mt-3 p-3 bg-white/80 rounded-lg border">
                <div className="space-y-3">
                  {/* Price Range */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2 text-sm">Price Range</h3>
                    <div className="space-y-1">
                      <input
                        type="range"
                        min="0"
                        max="500"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full accent-indigo-500"
                      />
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Colors */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2 text-sm">Colors</h3>
                    <div className="flex flex-wrap gap-1">
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
                          className={`w-6 h-6 rounded-full border-2 transition-all ${
                            selectedColors.includes(color) ? 'border-indigo-500 ring-1 ring-indigo-500/30' : 'border-gray-300'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Sizes */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2 text-sm">Sizes</h3>
                    <div className="flex flex-wrap gap-1">
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
                          className={`px-2 py-1 rounded border transition-all text-xs ${
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
                <div className="mt-3 pt-3 border-t">
                  <button
                    onClick={() => {
                      setSelectedColors([]);
                      setSelectedSizes([]);
                      setPriceRange([0, 500]);
                      setSearchTerm('');
                      setSelectedCategory('all');
                    }}
                    className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors text-sm"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Summary */}
        <div className="container mx-auto px-3 py-3 max-w-full">
          <p className="text-gray-600 text-sm">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
            {searchTerm && <span className="ml-1 text-indigo-600">for "{searchTerm}"</span>}
          </p>
        </div>

        {/* Products Grid */}
        <div className="container mx-auto px-3 pb-6 max-w-full">
          <div className={`grid gap-3 ${
            viewMode === 'grid' 
              ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4' 
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
            <div className="text-center py-12 px-3">
              <div className="w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No products found</h3>
              <p className="text-sm text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setPriceRange([0, 500]);
                  setSelectedColors([]);
                  setSelectedSizes([]);
                }}
                className="w-full px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors text-sm"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Enhanced Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 border border-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors text-sm"
              >
                Prev
              </button>
              
              {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => {
                const pageNum = currentPage <= 2 ? i + 1 : currentPage - 1 + i;
                if (pageNum > totalPages) return null;
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1.5 rounded transition-all text-sm ${
                      currentPage === pageNum
                        ? 'bg-indigo-500 text-white shadow'
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
                className="px-3 py-1.5 border border-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors text-sm flex items-center gap-1"
              >
                Next
                <ArrowRight className="h-3 w-3" />
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
}> = ({ product, viewMode, onView, onAddToCart}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow border border-gray-100 p-3">
        <div className="flex gap-3">
          <div className="relative flex-shrink-0">
            {product.badge && (
              <div className={`absolute top-1 left-1 z-10 px-1.5 py-0.5 text-xs text-white font-medium rounded
                ${product.badge.type === 'hot' ? 'bg-gradient-to-r from-red-500 to-pink-500' : 
                  product.badge.type === 'new' ? 'bg-gradient-to-r from-blue-500 to-indigo-500' : 
                  product.badge.type === 'sale' ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 
                  product.badge.type === 'sold' ? 'bg-gradient-to-r from-gray-500 to-gray-600' : 'bg-indigo-500'
                }`}>
                {product.badge.text}
              </div>
            )}
            
            {product.discount && (
              <div className="absolute top-1 right-1 z-10 px-1 py-0.5 text-xs text-white font-bold rounded bg-gradient-to-r from-red-500 to-pink-500">
                -{product.discount}
              </div>
            )}
            
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
          </div>
          
          <div className="flex-grow min-w-0">
            <div className="flex items-start justify-between mb-1">
              <div className="flex-grow pr-2 min-w-0">
                <h3 className="text-sm font-semibold text-gray-800 mb-1 hover:text-indigo-600 transition-colors cursor-pointer truncate"
                    onClick={onView}>
                  {product.name}
                </h3>
                
                <div className="flex items-center mb-1">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-3 w-3 ${
                          i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                </div>
              </div>
              
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-1 rounded transition-all ${
                  isWishlisted 
                    ? 'bg-red-50 text-red-500 hover:bg-red-100' 
                    : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-red-500'
                }`}
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>
            
            <p className="text-gray-600 mb-2 text-xs leading-relaxed line-clamp-2">
              {product.description}
            </p>
            
            <div className="flex items-center gap-1 mb-2">
              <span className="text-lg font-bold text-gray-800">{product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                  {product.discount && (
                    <span className="text-xs bg-green-100 text-green-600 px-1 py-0.5 rounded font-medium">
                      Save {product.discount}
                    </span>
                  )}
                </>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <div className="flex gap-0.5">
                  {product.colors.slice(0, 3).map((color, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 rounded-full border border-white shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  {product.colors.length > 3 && (
                    <div className="w-4 h-4 rounded-full border border-gray-300 bg-gray-100 flex items-center justify-center">
                      <span className="text-xs text-gray-600">+{product.colors.length - 3}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex gap-1">
                <button
                  onClick={onView}
                  className="p-1.5 bg-gray-50 text-gray-600 rounded hover:bg-gray-100 transition-colors"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={onAddToCart}
                  className="px-3 py-1.5 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-all flex items-center gap-1 text-xs"
                >
                  <ShoppingBag className="h-3 w-3" />
                  Add
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
      className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        {product.badge && (
          <div className={`absolute top-2 left-2 z-10 px-1.5 py-0.5 text-xs text-white font-medium rounded
            ${product.badge.type === 'hot' ? 'bg-gradient-to-r from-red-500 to-pink-500' : 
              product.badge.type === 'new' ? 'bg-gradient-to-r from-blue-500 to-indigo-500' : 
              product.badge.type === 'sale' ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 
              product.badge.type === 'sold' ? 'bg-gradient-to-r from-gray-500 to-gray-600' : 'bg-indigo-500'
            }`}>
            {product.badge.text}
          </div>
        )}
        
        {product.discount && (
          <div className="absolute top-2 right-2 z-10 px-1 py-0.5 text-xs text-white font-bold rounded bg-gradient-to-r from-red-500 to-pink-500">
            -{product.discount}
          </div>
        )}
        
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="absolute bottom-2 left-2 right-2 flex justify-center gap-2">
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-2 rounded-full backdrop-blur-sm transition-all shadow ${
                  isWishlisted ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-800 hover:bg-red-500 hover:text-white'
                }`}
              >
                <Heart className={`h-3 w-3 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
              <button 
                onClick={onView}
                className="p-2 bg-white/90 text-gray-800 rounded-full backdrop-blur-sm transition-all hover:bg-indigo-500 hover:text-white shadow"
              >
                <Eye className="h-3 w-3" />
              </button>
              <button 
                onClick={onAddToCart}
                className="p-2 bg-indigo-500 text-white rounded-full backdrop-blur-sm transition-all hover:bg-indigo-600 shadow"
              >
                <ShoppingBag className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-3">
        <div className="flex items-center mb-1">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                className={`h-3 w-3 ${
                  i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`} 
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
        </div>
        
        <h3 className="text-sm font-semibold text-gray-800 mb-1 hover:text-indigo-600 transition-colors cursor-pointer line-clamp-2 leading-tight"
            onClick={onView}>
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-xs mb-2 line-clamp-2 leading-tight">
          {product.description}
        </p>
        
        <div className="flex items-center gap-1 mb-2">
          <span className="text-base font-bold text-gray-800">{product.price}</span>
          {product.originalPrice && (
            <span className="text-xs text-gray-500 line-through">{product.originalPrice}</span>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex gap-0.5">
            {product.colors.slice(0, 3).map((color, i) => (
              <div
                key={i}
                className="w-4 h-4 rounded-full border border-white shadow-sm"
                style={{ backgroundColor: color }}
              />
            ))}
            {product.colors.length > 3 && (
              <div className="w-4 h-4 rounded-full border border-gray-300 bg-gray-100 flex items-center justify-center">
                <span className="text-xs text-gray-600">+{product.colors.length - 3}</span>
              </div>
            )}
          </div>
          
          <div className="flex gap-1 text-xs text-gray-500">
            {product.sizes.slice(0, 2).map((size, i) => (
              <span key={i} className="bg-gray-100 px-1 py-0.5 rounded">{size}</span>
            ))}
            {product.sizes.length > 2 && <span>+{product.sizes.length - 2}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;