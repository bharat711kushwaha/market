// CategoriesSection.tsx
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
  title = "Trending Categories", 
  subtitle = "Popular Categories", 
  categories 
}) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-indigo-600 font-medium text-lg">{subtitle}</h2>
          <h3 className="text-3xl font-bold text-gray-800 mt-2">{title}</h3>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
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
    <div className="text-center group">
      <div className="flex justify-center mb-4">
        <div className="p-4 border border-gray-200 rounded-full transition-all duration-300 group-hover:border-indigo-500 group-hover:shadow-md">
          <img 
            src={category.icon} 
            alt={category.name} 
            className="h-10 w-10 transition-transform duration-300 group-hover:scale-110" 
          />
        </div>
      </div>
      <h6 className="text-sm font-medium text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">
        {category.name}
      </h6>
    </div>
  );
};

export default CategoriesSection;