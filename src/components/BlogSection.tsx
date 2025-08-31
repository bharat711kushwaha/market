// BlogSection.tsx
import React from 'react';

interface BlogPostProps {
  id: number;
  title: string;
  date: string;
  image: string;
  excerpt: string;
}

interface BlogSectionProps {
  title?: string;
  subtitle?: string;
  posts: BlogPostProps[];
}

const BlogSection: React.FC<BlogSectionProps> = ({
  title = "New Updates",
  subtitle = "Latest News",
  posts
}) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-indigo-600 font-medium text-lg">{subtitle}</h2>
          <h3 className="text-3xl font-bold text-gray-800 mt-2">{title}</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

const BlogPostCard: React.FC<{ post: BlogPostProps }> = ({ post }) => {
  return (
    <div className="group">
      <div className="mb-4 overflow-hidden rounded-lg">
        <a href="#" className="block">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110" 
          />
        </a>
      </div>
      
      <div className="text-sm text-gray-500 mb-2">{post.date}</div>
      
      <h4 className="text-xl font-semibold text-gray-800 mb-3 leading-tight group-hover:text-indigo-600 transition-colors">
        <a href="#">{post.title}</a>
      </h4>
      
      <p className="text-gray-600 mb-4 line-clamp-3">
        {post.excerpt}
      </p>
      
      <a 
        href="#" 
        className="text-gray-800 font-medium text-sm hover:text-indigo-600 transition-colors inline-flex items-center"
      >
        Continue Reading
        <svg 
          className="w-4 h-4 ml-1" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M14 5l7 7m0 0l-7 7m7-7H3" 
          />
        </svg>
      </a>
    </div>
  );
};

export default BlogSection;