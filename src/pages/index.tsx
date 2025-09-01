// pages/index.tsx
import React from 'react';

// Import components
import Header from '../components/Header';
import HeroSlider from '../components/HeroSlider';
import CategoriesSection from '../components/CategoriesSection';
import ProductsSection from '../components/ProductsSection';
import TrendingProductsSection from '../components/TrendingProducts';
import BlogSection from '../components/BlogSection';
import InstagramGallery from '../components/InstagramGallery';
import CustomerFeatures from '../components/CustomerFeatures';
import Footer from '../components/Footer';

// Data imports (you can move these to separate data files later)
import { 
  heroSlides, 
  categories, 
  productTabs, 
  products, 
  trendingProducts, 
  blogPosts, 
  instagramImages, 
  customerFeatures, 
  footerColumns, 
  socialLinks 
} from '../data/homeData';

const HomePage: React.FC = () => {
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

export default HomePage;