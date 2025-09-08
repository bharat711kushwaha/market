// BlogSection.tsx - Cyberpunk Theme
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
  title = "LATEST DROPS",
  subtitle = "STREET INTEL",
  posts
}) => {
  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Cyberpunk Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-cyan-400 font-black text-lg tracking-widest uppercase mb-2">
            {subtitle}
          </h2>
          <h3 className="text-5xl font-black text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text tracking-wider uppercase">
            {title}
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-pink-500 mx-auto mt-4"></div>
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
    <div className="group relative">
      {/* Card Container */}
      <div className="bg-gray-800 border border-cyan-500/20 rounded-xl overflow-hidden hover:border-cyan-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/25 relative">
        {/* Image Container */}
        <div className="relative overflow-hidden">
          <a href="#" className="block">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 object-cover transition-all duration-700 group-hover:scale-110"
            />
            {/* Cyberpunk Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Glitch Effect on Hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
          
          {/* Date Badge */}
          <div className="absolute top-4 left-4 bg-gradient-to-r from-cyan-500 to-pink-500 text-black px-3 py-1 rounded-lg text-xs font-black tracking-wider">
            {post.date}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <h4 className="text-xl font-black text-gray-100 mb-4 leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-pink-500 group-hover:bg-clip-text transition-all duration-300 uppercase tracking-wider">
            <a href="#">{post.title}</a>
          </h4>
          
          <p className="text-gray-400 mb-6 line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
          
          <a
            href="#"
            className="inline-flex items-center text-gray-300 font-bold text-sm hover:text-cyan-400 transition-all duration-300 tracking-wider uppercase group/link"
          >
            READ MORE
            <svg
              className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform duration-300"
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
        
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default BlogSection;