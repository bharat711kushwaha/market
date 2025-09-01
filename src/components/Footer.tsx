// Footer.tsx
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
  companyName = "StyleHub",
  companyLogo = "",
  address = "New York, NY",
  phone = "+1 (555) 123-4567",
  email = "support@stylehub.com",
  timings = "Mon-Fri: 9AM-6PM",
  columns,
  socialLinks,
  darkMode = true
}) => {
  const bgColor = darkMode ? 'bg-gray-900' : 'bg-white';
  const textColor = darkMode ? 'text-gray-300' : 'text-gray-700';
  const headingColor = darkMode ? 'text-white' : 'text-gray-900';
  
  return (
    <footer className={`${bgColor} pt-16 pb-6`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              {companyLogo ? (
                <img src={companyLogo} alt={companyName} className="h-10 mb-4" />
              ) : (
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-indigo-600 text-white flex items-center justify-center rounded-lg text-2xl font-bold shadow-lg">
                    S
                  </div>
                  <h2 className={`text-2xl font-bold ${headingColor}`}>{companyName}</h2>
                </div>
              )}
              
              <div className={`${textColor} mt-4`}>
                <p className="mb-2">{address}</p>
                <p className="mb-2">{phone}</p>
                <p className="mb-2">{timings}</p>
                <p className="mb-4">{email}</p>
              </div>
              
              <div className="flex space-x-2">
                {socialLinks.map((link, index) => (
                  <a 
                    key={index}
                    href={link.href}
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-600 text-gray-400 hover:text-white hover:border-white transition-colors duration-300"
                    aria-label={link.platform}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Footer Columns */}
          {columns.map((column, index) => (
            <div key={index}>
              <h4 className={`text-lg font-semibold mb-4 ${headingColor}`}>{column.title}</h4>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.href}
                      className={`${textColor} hover:text-indigo-400 transition-colors duration-300`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Newsletter */}
          <div>
            <h4 className={`text-lg font-semibold mb-4 ${headingColor}`}>Subscribe</h4>
            <p className={`${textColor} mb-4`}>
              Receive updates, hot deals, discounts sent straight in your inbox daily
            </p>
            
            <div className="relative mb-4">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:border-indigo-500"
              />
              <button 
                type="button"
                className="absolute right-0 top-0 h-full px-4 bg-indigo-600 rounded-r-md text-white hover:bg-indigo-700 transition-colors duration-300"
              >
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  xmlns="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/paypal-icon.png"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M14 5l7 7m0 0l-7 7m7-7H3" 
                  />
                </svg>
              </button>
            </div>
            
            <div>
              <h5 className={`text-sm font-semibold mb-2 ${headingColor}`}>Secure Payments</h5>
              <div className="flex space-x-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/960px-Visa_Inc._logo.svg.png?20170118154621" alt="Visa" className="h-8" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/960px-Mastercard-logo.svg.png?20210817144358" alt="Mastercard" className="h-10" />
                <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/paypal-icon.png" alt="PayPal" className="h-15" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="pt-6 border-t border-gray-800 text-center">
          <p className={`${textColor}`}>
            © {new Date().getFullYear()} {companyName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
