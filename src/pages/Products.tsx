// pages/Products.tsx - Cyberpunk Theme
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
  },
  {
  id: 9,
  name: 'Slim Fit Chinos',
  price: '$89',
  originalPrice: '$119',
  image: '1-a.jpg',
  category: 'men',
  badge: { type: 'sale', text: 'Sale' },
  discount: '25%',
  rating: 4,
  reviews: 67,
  colors: ['#374151', '#f59e0b', '#ffffff'],
  sizes: ['S', 'M', 'L', 'XL'],
  description: 'Comfortable slim fit chinos suitable for office and casual wear.'
},
{
  id: 10,
  name: 'Boho Maxi Skirt',
  price: '$129',
  originalPrice: '$169',
  image: '5-a.jpg',
  category: 'women',
  badge: { type: 'hot', text: 'Hot' },
  discount: '24%',
  rating: 5,
  reviews: 53,
  colors: ['#f43f5e', '#8b5cf6', '#10b981'],
  sizes: ['XS', 'S', 'M', 'L'],
  description: 'Free-flowing bohemian maxi skirt with artistic prints.'
},
{
  id: 11,
  name: 'Kids Cartoon Pajamas',
  price: '$49',
  originalPrice: '$69',
  image: '2-a.jpg',
  category: 'kids',
  badge: { type: 'sale', text: 'Sale' },
  discount: '29%',
  rating: 4,
  reviews: 38,
  colors: ['#fbbf24', '#22d3ee', '#10b981'],
  sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'],
  description: 'Soft cotton pajamas with fun cartoon prints for kids.'
},
{
  id: 12,
  name: 'Vintage Leather Wallet',
  price: '$59',
  originalPrice: '$79',
  image: '6-a.jpg',
  category: 'accessories',
  badge: { type: 'new', text: 'New' },
  discount: '25%',
  rating: 5,
  reviews: 121,
  colors: ['#92400e', '#000000', '#6b7280'],
  sizes: ['One Size'],
  description: 'Compact and durable wallet made from genuine vintage leather.'
},
{
  id: 13,
  name: 'Men’s Casual Hoodie',
  price: '$109',
  originalPrice: '$139',
  image: '1-a.jpg',
  category: 'men',
  badge: { type: 'hot', text: 'Hot' },
  discount: '22%',
  rating: 4,
  reviews: 74,
  colors: ['#000000', '#3b82f6', '#ffffff'],
  sizes: ['M', 'L', 'XL', 'XXL'],
  description: 'Warm and stylish hoodie perfect for everyday wear.'
},
{
  id: 14,
  name: 'Elegant Lace Blouse',
  price: '$119',
  image: '5-a.jpg',
  category: 'women',
  badge: { type: 'new', text: 'New' },
  rating: 5,
  reviews: 42,
  colors: ['#ffffff', '#f472b6', '#8b5cf6'],
  sizes: ['XS', 'S', 'M', 'L'],
  description: 'Delicate lace blouse perfect for formal and semi-formal occasions.'
},
{
  id: 15,
  name: 'Kid’s Winter Jacket',
  price: '$99',
  originalPrice: '$129',
  image: '2-a.jpg',
  category: 'kids',
  badge: { type: 'hot', text: 'Hot' },
  discount: '23%',
  rating: 4,
  reviews: 58,
  colors: ['#2563eb', '#000000', '#6ee7b7'],
  sizes: ['4-5Y', '6-7Y', '8-9Y'],
  description: 'Insulated jacket to keep kids warm and cozy in winter.'
},
{
  id: 16,
  name: 'Unisex Travel Backpack',
  price: '$139',
  originalPrice: '$179',
  image: '6-a.jpg',
  category: 'accessories',
  badge: { type: 'sale', text: 'Sale' },
  discount: '22%',
  rating: 5,
  reviews: 199,
  colors: ['#6b7280', '#000000', '#3b82f6'],
  sizes: ['One Size'],
  description: 'Spacious and durable backpack perfect for travel and daily use.'
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
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />
      
      {/* Enhanced Hero Section with Cyberpunk Background */}
      <section className="relative h-[60vh] overflow-hidden">
        {/* Cyberpunk Background with Parallax Effect */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-100"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url('bl-3.png')`
          }}
        ></div>
        
        {/* Cyberpunk Grid Lines */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-cyan-900/30"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-70"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-cyan-500/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-pink-500/10 rounded-full animate-ping"></div>
        </div>
        
        <div className="relative container mx-auto px-3 h-full flex items-center justify-center text-center z-10">
          <div className="max-w-lg">
            <div className="flex items-center justify-center mb-3">
              <Sparkles className="h-4 w-4 text-cyan-400 mr-1 animate-pulse" />
              <span className="text-cyan-400 font-black text-xs tracking-widest uppercase">PREMIUM URBAN COLLECTION</span>
              <Sparkles className="h-4 w-4 text-cyan-400 ml-1 animate-pulse" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black mb-4 text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text tracking-wider uppercase">
              STYLE REDEFINED
            </h1>
            
            <p className="text-sm mb-6 text-gray-300 leading-relaxed tracking-wide">
              Discover our curated collection of premium streetwear pieces designed for those who dare to be different
            </p>
            
            {/* Category Quick Links */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {['Men', 'Women', 'Kids', 'Accessories'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat.toLowerCase())}
                  className="bg-gray-800/80 backdrop-blur-sm text-gray-300 px-4 py-2 rounded-lg hover:bg-cyan-500/20 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 border border-cyan-500/30 text-xs font-bold tracking-wider uppercase"
                >
                  {cat}
                </button>
              ))}
            </div>
            
            {/* Features */}
            <div className="flex flex-wrap justify-center gap-2 text-xs">
              <div className="flex items-center bg-gray-800/80 backdrop-blur-sm px-3 py-2 rounded-full border border-cyan-500/30">
                <TrendingUp className="h-3 w-3 mr-1 text-green-400" />
                <span className="text-gray-300 font-bold tracking-wider">FREE SHIPPING</span>
              </div>
              <div className="flex items-center bg-gray-800/80 backdrop-blur-sm px-3 py-2 rounded-full border border-cyan-500/30">
                <Sparkles className="h-3 w-3 mr-1 text-blue-400" />
                <span className="text-gray-300 font-bold tracking-wider">QUALITY GUARANTEED</span>
              </div>
              <div className="flex items-center bg-gray-800/80 backdrop-blur-sm px-3 py-2 rounded-full border border-cyan-500/30">
                <Heart className="h-3 w-3 mr-1 text-red-400" />
                <span className="text-gray-300 font-bold tracking-wider">EASY RETURNS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="flex-grow bg-gray-900 relative">
        {/* Enhanced Filter Bar */}
        <div className="sticky top-16 z-40 bg-gray-800/95 backdrop-blur-lg shadow-lg border-b border-cyan-500/20">
          <div className="container mx-auto px-3 py-3 max-w-full">
            <div className="space-y-3">
              {/* Search */}
              <div className="relative w-full">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-cyan-400" />
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-cyan-500/30 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400 bg-gray-900 text-gray-300 placeholder-gray-500 text-sm"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 hover:text-cyan-400"
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
                    className="px-3 py-2 border border-cyan-500/30 rounded-lg focus:ring-2 focus:ring-cyan-500 bg-gray-900 text-gray-300 text-sm"
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
                    className="px-3 py-2 border border-cyan-500/30 rounded-lg focus:ring-2 focus:ring-cyan-500 bg-gray-900 text-gray-300 text-sm"
                  >
                    {sortOptions.map(option => (
                      <option key={option.id} value={option.id}>{option.label}</option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-2 justify-between">
                  {/* View Mode Toggle */}
                  <div className="flex bg-gray-800 rounded-lg p-1 border border-cyan-500/30">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-1.5 rounded transition-all ${viewMode === 'grid' ? 'bg-cyan-500 text-black' : 'text-gray-400 hover:text-cyan-400'}`}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-1.5 rounded transition-all ${viewMode === 'list' ? 'bg-cyan-500 text-black' : 'text-gray-400 hover:text-cyan-400'}`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Advanced Filters Toggle */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-cyan-500 to-pink-500 text-black rounded-lg hover:from-cyan-400 hover:to-pink-400 transition-all text-sm font-black tracking-wider uppercase"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    FILTERS
                  </button>
                </div>
              </div>
            </div>

            {/* Advanced Filters Panel */}
            {showFilters && (
              <div className="mt-3 p-3 bg-gray-800/80 rounded-lg border border-cyan-500/30">
                <div className="space-y-3">
                  {/* Price Range */}
                  <div>
                    <h3 className="font-black text-gray-300 mb-2 text-sm tracking-wider uppercase">PRICE RANGE</h3>
                    <div className="space-y-1">
                      <input
                        type="range"
                        min="0"
                        max="500"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full accent-cyan-500"
                      />
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Colors */}
                  <div>
                    <h3 className="font-black text-gray-300 mb-2 text-sm tracking-wider uppercase">COLORS</h3>
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
                            selectedColors.includes(color) ? 'border-cyan-500 ring-1 ring-cyan-500/30' : 'border-gray-600'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Sizes */}
                  <div>
                    <h3 className="font-black text-gray-300 mb-2 text-sm tracking-wider uppercase">SIZES</h3>
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
                          className={`px-2 py-1 rounded border transition-all text-xs font-bold tracking-wider ${
                            selectedSizes.includes(size)
                              ? 'border-cyan-500 bg-cyan-500/20 text-cyan-400'
                              : 'border-gray-600 text-gray-400 hover:border-cyan-500 hover:text-cyan-400'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Clear Filters */}
                <div className="mt-3 pt-3 border-t border-gray-700">
                  <button
                    onClick={() => {
                      setSelectedColors([]);
                      setSelectedSizes([]);
                      setPriceRange([0, 500]);
                      setSearchTerm('');
                      setSelectedCategory('all');
                    }}
                    className="text-pink-400 hover:text-pink-300 font-black transition-colors text-sm tracking-wider uppercase"
                  >
                    CLEAR ALL FILTERS
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Summary */}
        <div className="container mx-auto px-3 py-3 max-w-full">
          <p className="text-gray-400 text-sm font-bold tracking-wider">
            SHOWING {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} OF {filteredProducts.length} PRODUCTS
            {searchTerm && <span className="ml-1 text-cyan-400">FOR "{searchTerm}"</span>}
          </p>
        </div>

        {/* Products Grid */}
        <div className="container mx-auto px-3 pb-6 max-w-full">
          <div className={`grid gap-4 ${
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
              <div className="w-20 h-20 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 border border-cyan-500/30">
                <Search className="h-10 w-10 text-cyan-400" />
              </div>
              <h3 className="text-xl font-black text-gray-300 mb-3 tracking-wider uppercase">NO PRODUCTS FOUND</h3>
              <p className="text-sm text-gray-500 mb-6 tracking-wide">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setPriceRange([0, 500]);
                  setSelectedColors([]);
                  setSelectedSizes([]);
                }}
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-pink-500 text-black font-black rounded-lg hover:from-cyan-400 hover:to-pink-400 transition-all text-sm tracking-wider uppercase"
              >
                RESET ALL FILTERS
              </button>
            </div>
          )}

          {/* Enhanced Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-cyan-500/30 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cyan-500/20 hover:border-cyan-400 transition-all text-sm text-gray-300 font-bold tracking-wider"
              >
                PREV
              </button>
              
              {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => {
                const pageNum = currentPage <= 2 ? i + 1 : currentPage - 1 + i;
                if (pageNum > totalPages) return null;
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-4 py-2 rounded-lg transition-all text-sm font-black tracking-wider ${
                      currentPage === pageNum
                        ? 'bg-gradient-to-r from-cyan-500 to-pink-500 text-black'
                        : 'border border-cyan-500/30 text-gray-300 hover:bg-cyan-500/20 hover:border-cyan-400'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-cyan-500/30 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cyan-500/20 hover:border-cyan-400 transition-all text-sm text-gray-300 font-bold tracking-wider flex items-center gap-1"
              >
                NEXT
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
      <div className="bg-gray-800 rounded-lg border border-cyan-500/20 p-4 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-500">
        <div className="flex gap-4">
          <div className="relative flex-shrink-0">
            {product.badge && (
              <div className={`absolute top-1 left-1 z-10 px-2 py-1 text-xs text-black font-black rounded tracking-wider uppercase
                ${product.badge.type === 'hot' ? 'bg-gradient-to-r from-red-500 to-pink-500' : 
                  product.badge.type === 'new' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 
                  product.badge.type === 'sale' ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 
                  product.badge.type === 'sold' ? 'bg-gradient-to-r from-gray-500 to-gray-600' : 'bg-gradient-to-r from-cyan-500 to-pink-500'
                }`}>
                {product.badge.text}
              </div>
            )}
            
            {product.discount && (
              <div className="absolute top-1 right-1 z-10 px-2 py-1 text-xs text-black font-black rounded bg-gradient-to-r from-red-500 to-pink-500 tracking-wider">
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
            <div className="flex items-start justify-between mb-2">
              <div className="flex-grow pr-2 min-w-0">
                <h3 className="text-sm font-black text-gray-100 mb-2 hover:text-transparent hover:bg-gradient-to-r hover:from-cyan-400 hover:to-pink-500 hover:bg-clip-text transition-all cursor-pointer truncate tracking-wider uppercase"
                    onClick={onView}>
                  {product.name}
                </h3>
                
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-3 w-3 ${
                          i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400 ml-1 tracking-wider">({product.reviews})</span>
                </div>
              </div>
              
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-2 rounded-lg transition-all transform hover:scale-110 ${
                  isWishlisted 
                    ? 'bg-pink-500/20 text-pink-400 hover:bg-pink-500/30' 
                    : 'bg-gray-700 text-gray-400 hover:bg-pink-500/20 hover:text-pink-400'
                }`}
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>
            
            <p className="text-gray-400 mb-3 text-xs leading-relaxed line-clamp-2 tracking-wide">
              {product.description}
            </p>
            
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg font-black text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text tracking-wider">{product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                  {product.discount && (
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded font-black tracking-wider uppercase">
                      SAVE {product.discount}
                    </span>
                  )}
                </>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <div className="flex gap-1">
                  {product.colors.slice(0, 3).map((color, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 rounded-full border-2 border-gray-600 shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  {product.colors.length > 3 && (
                    <div className="w-4 h-4 rounded-full border-2 border-gray-600 bg-gray-700 flex items-center justify-center">
                      <span className="text-xs text-gray-400 font-bold">+{product.colors.length - 3}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={onView}
                  className="p-2 bg-gray-700 text-gray-400 rounded-lg hover:bg-cyan-500/20 hover:text-cyan-400 transition-all border border-cyan-500/30"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={onAddToCart}
                  className="px-3 py-2 bg-gradient-to-r from-cyan-500 to-pink-500 text-black rounded-lg hover:from-cyan-400 hover:to-pink-400 transition-all flex items-center gap-1 text-xs font-black tracking-wider uppercase"
                >
                  <ShoppingBag className="h-3 w-3" />
                  ADD
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
      className="bg-gray-800 rounded-lg border border-cyan-500/20 overflow-hidden hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        {product.badge && (
          <div className={`absolute top-2 left-2 z-10 px-2 py-1 text-xs text-black font-black rounded tracking-wider uppercase
            ${product.badge.type === 'hot' ? 'bg-gradient-to-r from-red-500 to-pink-500' : 
              product.badge.type === 'new' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 
              product.badge.type === 'sale' ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 
              product.badge.type === 'sold' ? 'bg-gradient-to-r from-gray-500 to-gray-600' : 'bg-gradient-to-r from-cyan-500 to-pink-500'
            }`}>
            {product.badge.text}
          </div>
        )}
        
        {product.discount && (
          <div className="absolute top-2 right-2 z-10 px-2 py-1 text-xs text-black font-black rounded bg-gradient-to-r from-red-500 to-pink-500 tracking-wider">
            -{product.discount}
          </div>
        )}
        
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-40 object-cover transition-all duration-700 group-hover:scale-110"
          />
          
          {/* Cyberpunk Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-gray-900/90 via-purple-900/30 to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="absolute bottom-2 left-2 right-2 flex justify-center gap-2">
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-2 rounded-lg backdrop-blur-sm transition-all shadow border border-transparent ${
                  isWishlisted ? 'bg-pink-500 text-black border-pink-400' : 'bg-gray-800/90 text-pink-400 hover:bg-pink-500 hover:text-black border-pink-500/50'
                }`}
              >
                <Heart className={`h-3 w-3 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
              <button 
                onClick={onView}
                className="p-2 bg-gray-800/90 text-cyan-400 rounded-lg backdrop-blur-sm transition-all hover:bg-cyan-500 hover:text-black shadow border border-cyan-500/50"
              >
                <Eye className="h-3 w-3" />
              </button>
              <button 
                onClick={onAddToCart}
                className="p-2 bg-gradient-to-r from-cyan-500 to-pink-500 text-black rounded-lg backdrop-blur-sm transition-all hover:from-cyan-400 hover:to-pink-400 shadow"
              >
                <ShoppingBag className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-3">
        <div className="flex items-center mb-2">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                className={`h-3 w-3 ${
                  i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                }`} 
              />
            ))}
          </div>
          <span className="text-xs text-gray-400 ml-1 tracking-wider">({product.reviews})</span>
        </div>
        
        <h3 className="text-sm font-black text-gray-100 mb-2 hover:text-transparent hover:bg-gradient-to-r hover:from-cyan-400 hover:to-pink-500 hover:bg-clip-text transition-all cursor-pointer line-clamp-2 leading-tight tracking-wider uppercase"
            onClick={onView}>
          {product.name}
        </h3>
        
        <p className="text-gray-400 text-xs mb-3 line-clamp-2 leading-tight tracking-wide">
          {product.description}
        </p>
        
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base font-black text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text tracking-wider">{product.price}</span>
          {product.originalPrice && (
            <span className="text-xs text-gray-500 line-through">{product.originalPrice}</span>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex gap-1">
            {product.colors.slice(0, 3).map((color, i) => (
              <div
                key={i}
                className="w-4 h-4 rounded-full border-2 border-gray-600 shadow-sm"
                style={{ backgroundColor: color }}
              />
            ))}
            {product.colors.length > 3 && (
              <div className="w-4 h-4 rounded-full border-2 border-gray-600 bg-gray-700 flex items-center justify-center">
                <span className="text-xs text-gray-400 font-bold">+{product.colors.length - 3}</span>
              </div>
            )}
          </div>
          
          <div className="flex gap-1 text-xs text-gray-400">
            {product.sizes.slice(0, 2).map((size, i) => (
              <span key={i} className="bg-gray-700 px-1 py-0.5 rounded font-bold tracking-wider">{size}</span>
            ))}
            {product.sizes.length > 2 && <span className="font-bold">+{product.sizes.length - 2}</span>}
          </div>
        </div>
      </div>
      
      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
};

export default ProductsPage;