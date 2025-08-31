// App.tsx
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

// Import components
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import CategoriesSection from './components/CategoriesSection';
import ProductsSection from './components/ProductsSection';
import TrendingProductsSection from './components/TrendingProducts';
import BlogSection from './components/BlogSection';
import InstagramGallery from './components/InstagramGallery';
import CustomerFeatures from './components/CustomerFeatures';
import Footer from './components/Footer';

// Data
// Hero slider data
const heroSlides = [
  {
    id: 1,
    backgroundImage: 'banner-2.png',
    title: 'New Winter Collections 2025',
    subtitle: 'Winter Collection',
    trending: "There's nothing like trend"
  },
  {
    id: 2,
    backgroundImage: 'bl-1.png',
    title: 'New Winter Collections 2025',
    subtitle: 'Winter Collection',
    trending: "There's nothing like trend"
  },
  {
    id: 3,
    backgroundImage: 'bl-2.png',
    title: 'New Winter Collections 2025',
    subtitle: 'Winter Collection',
    trending: "There's nothing like trend"
  }
];

// Categories data
const categories = [
  { id: 1, name: "Men's Wear", icon: 'fashion.png' },
  { id: 2, name: "Kid's Wear", icon: 'tshirt.png' },
  { id: 3, name: 'Accessories', icon: 'accessories.png' },
  { id: 4, name: "Men's Shoes", icon: 'sneakers.png' },
  { id: 5, name: 'Television', icon: 'television.png' },
  { id: 6, name: "Men's Pants", icon: 'pant.png' }
];

// Product tabs
const productTabs = [
  { id: 'all', label: 'All', active: false },
  { id: 'mens', label: "Men's", active: true },
  { id: 'women', label: 'Women', active: false },
  { id: 'kids', label: 'Kids', active: false }
];

// Products data
// Products data
const products = [
  {
    id: 1,
    name: 'Women Striped Shirt Dress',
    price: '$99 - $129',
    image: '1-a.jpg',
    badge: { type: 'hot' as const, text: 'Hot' },
    rating: 4,
    reviews: 5
  },
  {
    id: 2,
    name: 'Boys Solid Sweatshirt',
    price: '$129',
    image: '2-a.jpg',
    badge: { type: 'sold' as const, text: 'Sold Out' },
    discount: '40%',
    rating: 0,
    reviews: 0
  },
  {
    id: 3,
    name: 'Girls Floral Print Jumpsuit',
    price: '$99 - $129',
    image: '5-a.jpg',
    badge: { type: 'sale' as const, text: 'Sale' },
    rating: 5,
    reviews: 32
  },
  {
    id: 4,
    name: 'Girls Solid A-Line Dress',
    price: '$50 - $149',
    image: '6-a.jpg',
    badge: { type: 'new' as const, text: 'New' },
    discount: '55%',
    rating: 0,
    reviews: 0
  },
  {
    id: 5,
    name: 'Printed Straight Kurta',
    price: '$199',
     image: '5-a.jpg',
    badge: { type: 'sale' as const, text: 'Sale' },
    discount: '30%',
    rating: 0,
    reviews: 0
  },
  {
    id: 6,
    name: 'Women Printed A-Line Dress',
    price: '$110 - $600',
     image: '5-a.jpg',
    badge: { type: 'new' as const, text: 'New' },
    rating: 4,
    reviews: 42
  },
  {
    id: 7,
    name: 'Girls Fit and Flare Dress',
    price: '$99 - $110',
  image: '5-a.jpg',
    badge: { type: 'sale' as const, text: 'Sale' },
    rating: 0,
    reviews: 0
  },
  {
    id: 8,
    name: 'Girls Self Design Jumpsuit',
    price: '$119',
    image: '5-a.jpg',
    badge: { type: 'sold' as const, text: 'Sold Out' },
    discount: '60%',
    rating: 4,
    reviews: 15
  }
];

// Trending products data
const trendingProducts = [
  {
    id: 1,
    name: 'Half Running Set',
    price: '$99 - $129',
     image: '5-a.jpg',
    badge: { type: 'sale', text: 'Sale' },  // ✅ change success → sale
    colors: ['blc1', 'blc2', 'blc3', 'blc4']
  },
  {
    id: 2,
    name: 'Formal Men Lowers',
    price: '$99 - $129',
        image: '1-a.jpg',
    badge: { type: 'new', text: 'New' },    // ✅ change info → new
    colors: ['blc5', 'blc2', 'blc6', 'blc4']
  },
  {
    id: 4,
    name: 'Half Fancy Lady Dress',
    price: '$99 - $129',
        image: '1-a.jpg',
    badge: { type: 'hot', text: 'Hot' },   
    colors: ['blc8', 'blc2', 'blc6', 'blc5']
  },
  {
    id: 6,
    name: 'Fancy Salwar Suits',
    price: '$99 - $129',
      image: '1-a.jpg',
    badge: { type: 'hot', text: 'Hot' },   
    colors: ['blc1', 'blc7', 'blc3', 'blc6']
  }
];


// Blog posts data
const blogPosts = [
  {
    id: 1,
    title: "Let's start bring sale on this summer vacation.",
    date: '26 Jan 2021',
    image: 'bl-1.png',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis'
  },
  {
    id: 2,
    title: "Let's start bring sale on this summer vacation.",
    date: '17 July 2021',
    image: 'bl-2.png',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis'
  },
  {
    id: 3,
    title: "Let's start bring sale on this summer vacation.",
    date: '10 Aug 2021',
    image: 'bl-3.png',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis'
  }
];

// Instagram gallery data
const instagramImages = [
  { id: 1, image: 'i-1.png' },
  { id: 2, image: 'i-2.png' },
  { id: 3, image: 'i-3.png' },
  { id: 4, image: 'i-7.png' },
  { id: 5, image: 'i-8.png' }
];

// Customer features data
const customerFeatures = [
  {
    id: 1,
    icon: 'shopping-basket',
    title: 'Free Shipping',
    description: 'Capped at $10 per order'
  },
  {
    id: 2,
    icon: 'credit-card',
    title: 'Secure Payments',
    description: 'Up to 6 months installments'
  },
  {
    id: 3,
    icon: 'shield',
    title: '15-Days Returns',
    description: 'Shop with fully confidence'
  },
  {
    id: 4,
    icon: 'headphones',
    title: '24x7 Fully Support',
    description: 'Get friendly support'
  }
];

// Footer columns
const footerColumns = [
  {
    title: 'Supports',
    links: [
      { label: 'Contact Us', href: '#' },
      { label: 'About Page', href: '#' },
      { label: 'Size Guide', href: '#' },
      { label: 'Shipping & Returns', href: '#' },
      { label: "FAQ's Page", href: '#' },
      { label: 'Privacy', href: '#' }
    ]
  },
  {
    title: 'Shop',
    links: [
      { label: "Men's Shopping", href: '#' },
      { label: "Women's Shopping", href: '#' },
      { label: "Kids's Shopping", href: '#' },
      { label: 'Furniture', href: '#' },
      { label: 'Discounts', href: '#' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Affiliate', href: '#' },
      { label: 'Login', href: '#' }
    ]
  }
];

// Social media links
const socialLinks = [
  { 
    platform: 'Facebook', 
    href: '#', 
    icon: <Facebook className="h-5 w-5" /> 
  },
  { 
    platform: 'Twitter', 
    href: '#', 
    icon: <Twitter className="h-5 w-5" /> 
  },
  { 
    platform: 'Youtube', 
    href: '#', 
    icon: <Youtube className="h-5 w-5" /> 
  },
  { 
    platform: 'Instagram', 
    href: '#', 
    icon: <Instagram className="h-5 w-5" /> 
  },
  { 
    platform: 'LinkedIn', 
    href: '#', 
    icon: <Linkedin className="h-5 w-5" /> 
  }
];

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Slider */}
        <HeroSlider slides={heroSlides} />
        
        {/* Categories Section */}
        <CategoriesSection categories={categories} />
        
        {/* Products Section */}
        <ProductsSection 
          tabs={productTabs} 
          products={products} 
        />
        
        {/* Trending Products Section */}
        <TrendingProductsSection 
          title="Our Trending Products" 
          subtitle="Trendy Products" 
          products={trendingProducts} 
        />
        
        {/* Blog Section */}
        <BlogSection 
          title="New Updates" 
          subtitle="Latest News" 
          posts={blogPosts} 
        />
        
        {/* Instagram Gallery */}
        <InstagramGallery 
          title="From Instagram" 
          subtitle="Instagram Gallery" 
          username="@mahak_71" 
          images={instagramImages} 
        />
        
        {/* Customer Features */}
        <CustomerFeatures features={customerFeatures} />
      </main>
      
      {/* Footer */}
      <Footer 
        columns={footerColumns} 
        socialLinks={socialLinks} 
      />
    </div>
  );
};

export default App;