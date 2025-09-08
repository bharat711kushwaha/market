// Footer.tsx - Cyberpunk Theme
import React from 'react';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumnProps {
  title: string;
  links: FooterLink[];
}

interface SocialMediaLink {
  platform: string;
  href: string;
  icon: React.ReactNode;
}

interface FooterProps {
  companyName?: string;
  companyLogo?: string;
  address?: string;
  phone?: string;
  email?: string;
  timings?: string;
  columns: FooterColumnProps[];
  socialLinks: SocialMediaLink[];
  darkMode?: boolean;
}

const Footer: React.FC<FooterProps> = ({
  companyName = "URAAN",
  companyLogo = "",
  address = "New York, NY",
  phone = "+1 (555) 123-4567",
  email = "support@uraan.com",
  timings = "Mon-Fri: 9AM-6PM",
  columns,
  socialLinks,
  
}) => {
  const bgColor = 'bg-gray-900';
  const textColor = 'text-gray-300';
  const headingColor = 'text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text';
  
  return (
    <footer className={`${bgColor} pt-16 pb-6 relative overflow-hidden`}>
      {/* Cyberpunk Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              {companyLogo ? (
                <img src={companyLogo} alt={companyName} className="h-10 mb-4" />
              ) : (
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-pink-500 text-black flex items-center justify-center rounded-lg text-2xl font-black shadow-lg shadow-cyan-500/25">
                    U
                  </div>
                  <h2 className={`text-3xl font-black tracking-wider ${headingColor}`}>
                    {companyName}
                  </h2>
                </div>
              )}
              
              <div className={`${textColor} mt-4 space-y-2`}>
                <p className="flex items-center"><span className="text-cyan-400 mr-2">📍</span>{address}</p>
                <p className="flex items-center"><span className="text-cyan-400 mr-2">📞</span>{phone}</p>
                <p className="flex items-center"><span className="text-cyan-400 mr-2">🕐</span>{timings}</p>
                <p className="flex items-center"><span className="text-cyan-400 mr-2">✉️</span>{email}</p>
              </div>
              
              <div className="flex space-x-3 mt-6">
                {socialLinks.map((link, index) => (
                  <a 
                    key={index}
                    href={link.href}
                    className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-800 border border-cyan-500/30 text-cyan-400 hover:text-white hover:border-cyan-400 hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 group"
                    aria-label={link.platform}
                  >
                    <div className="group-hover:scale-110 transition-transform duration-300">
                      {link.icon}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Footer Columns */}
          {columns.map((column, index) => (
            <div key={index}>
              <h4 className={`text-lg font-black mb-6 tracking-wider uppercase ${headingColor}`}>
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.href}
                      className={`${textColor} hover:text-cyan-400 transition-all duration-300 hover:translate-x-1 block relative group`}
                    >
                      <span className="group-hover:text-shadow-sm">{link.label}</span>
                      <span className="absolute left-0 bottom-0 w-0 h-px bg-gradient-to-r from-cyan-400 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Newsletter */}
          <div>
            <h4 className={`text-lg font-black mb-6 tracking-wider uppercase ${headingColor}`}>
              STAY UPDATED
            </h4>
            <p className={`${textColor} mb-6 text-sm`}>
              Get the latest drops, exclusive deals, and cyberpunk vibes straight to your inbox
            </p>
            
            <div className="relative mb-6">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-3 bg-gray-800 border border-cyan-500/30 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/25 transition-all duration-300"
              />
              <button 
                type="button"
                className="absolute right-2 top-2 h-8 px-4 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-md text-black font-bold text-sm hover:from-cyan-400 hover:to-pink-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25"
              >
                JOIN
              </button>
            </div>
            
            <div>
              <h5 className={`text-sm font-black mb-4 tracking-wider uppercase ${headingColor}`}>
                SECURE PAYMENTS
              </h5>
              <div className="flex space-x-2">
                <div className="h-8 w-12 bg-gray-800 border border-cyan-500/30 rounded flex items-center justify-center">
                  <span className="text-xs text-cyan-400 font-bold">VISA</span>
                </div>
                <div className="h-8 w-12 bg-gray-800 border border-cyan-500/30 rounded flex items-center justify-center">
                  <span className="text-xs text-pink-400 font-bold">MC</span>
                </div>
                <div className="h-8 w-12 bg-gray-800 border border-cyan-500/30 rounded flex items-center justify-center">
                  <span className="text-xs text-purple-400 font-bold">PP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="pt-6 border-t border-gray-800 text-center relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
          <p className={`${textColor} font-medium tracking-wider`}>
            © {new Date().getFullYear()} {companyName}. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;