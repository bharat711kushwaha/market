// CategoriesSection.tsx - Cyberpunk Theme
import React from 'react';

interface CategoryProps {
  id: number;
  name: string;
  icon: string;
}

interface CategoriesSectionProps {
  title?: string;
  subtitle?: string;
  categories: CategoryProps[];
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  title = "URBAN CATEGORIES",
  subtitle = "EXPLORE THE VIBE",
  categories
}) => {
  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Cyberpunk Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-transparent to-purple-900/20"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-pink-400 font-black text-lg tracking-widest uppercase mb-2">
            {subtitle}
          </h2>
          <h3 className="text-5xl font-black text-transparent bg-gradient-to-r from-pink-400 to-cyan-500 bg-clip-text tracking-wider uppercase">
            {title}
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-cyan-500 mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

const CategoryCard: React.FC<{ category: CategoryProps }> = ({ category }) => {
  return (
    <div className="text-center group cursor-pointer">
      <div className="flex justify-center mb-6">
        <div className="relative">
          {/* Main Circle */}
          <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-800 border-2 border-cyan-500/30 rounded-full flex items-center justify-center transition-all duration-500 group-hover:border-cyan-400 group-hover:shadow-2xl group-hover:shadow-cyan-500/30 group-hover:scale-110 relative overflow-hidden">
            
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-pink-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Icon */}
            <img
              src={category.icon}
              alt={category.name}
              className="h-8 w-8 md:h-10 md:w-10 transition-all duration-500 group-hover:scale-125 relative z-10 filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0"
            />
            
            {/* Glow Ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 animate-pulse"></div>
          </div>
          
          {/* Outer Ring Effect */}
          <div className="absolute inset-0 w-20 h-20 md:w-24 md:h-24 border border-cyan-500/20 rounded-full scale-125 opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700"></div>
        </div>
      </div>
      
      <h6 className="text-sm md:text-base font-black text-gray-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-pink-500 group-hover:bg-clip-text transition-all duration-300 uppercase tracking-widest">
        {category.name}
      </h6>
      
      {/* Underline Effect */}
      <div className="w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-pink-500 mx-auto mt-2 group-hover:w-full transition-all duration-500"></div>
    </div>
  );
};

export default CategoriesSection;