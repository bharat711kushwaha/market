// Header.tsx
import React, { useState } from 'react';
import { Heart, ShoppingBag, Search, ChevronDown, User } from 'lucide-react';

interface NavItem {
  label: string;
  link: string;
  hasSubmenu?: boolean;
  submenu?: { label: string; link: string }[];
}

const navItems: NavItem[] = [
  {
    label: 'Home',
    link: '#',
    hasSubmenu: true,
    submenu: [
      { label: 'Home 1', link: '#' },
      { label: 'Home 2', link: '#' },
      { label: 'Home 3', link: '#' }
    ]
  },
  {
    label: 'Shop',
    link: '#',
    hasSubmenu: true,
    submenu: [
      { label: 'Shop Style 1', link: '#' },
      { label: 'Shop Style 2', link: '#' },
      { label: 'Shop List View', link: '#' }
    ]
  },
  {
    label: 'Product',
    link: '#',
    hasSubmenu: true,
    submenu: [
      { label: 'Product Detail v1', link: '#' },
      { label: 'Product Detail v2', link: '#' },
      { label: 'Product Detail v3', link: '#' }
    ]
  },
  {
    label: 'Pages',
    link: '#',
    hasSubmenu: true,
    submenu: [
      { label: 'About Us', link: '#' },
      { label: 'Contact', link: '#' },
      { label: 'FAQ', link: '#' },
      { label: '404', link: '#' }
    ]
  },
  {
    label: 'Docs',
    link: '#',
    hasSubmenu: false
  }
];

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header>
      {/* Top Header */}
      <div className="py-2 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 items-center">
            <div className="hidden md:block">
              <div className="top_first">
                <a href="tel:(+84)0123456789" className="text-sm text-white">(+84) 0123 456 789</a>
              </div>
            </div>
            
            <div className="hidden md:block text-center">
              <p className="text-sm m-0 p-0">Get Free delivery from $2000 <a href="#" className="text-white underline">Shop Now</a></p>
            </div>
            
            {/* Right Menu */}
            <div className="flex justify-center md:justify-end space-x-4">
              <div className="dropdown relative">
                <a href="#" className="flex items-center text-sm text-white">
                  <span className="hidden xl:inline">Currency:</span>
                  <span className="iso_code text-sm text-white ml-1">$USD</span>
                  <ChevronDown className="h-4 w-4 ml-1" />
                </a>
              </div>
              
              <div className="dropdown relative">
                <a href="#" className="flex items-center text-sm text-white">
                  <span className="hidden xl:inline">Language:</span>
                  <span className="iso_code text-sm text-white ml-1">English</span>
                  <ChevronDown className="h-4 w-4 ml-1" />
                </a>
              </div>
              
              <div className="hidden md:block">
                <a href="#" className="text-sm text-white">Wishlist</a>
              </div>
              
              <div className="hidden md:block">
                <a href="#" className="text-sm text-white">My Account</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Navigation */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <a className="flex-shrink-0" href="#">
                <img src="/assets/img/logo.png" className="h-10" alt="Kumo" />
              </a>
              
              <button 
                className="md:hidden ml-4"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <NavMenu navItems={navItems} />
            </div>
            
            <div className="flex items-center space-x-4">
              <a href="#" className="hidden md:block">
                <Search className="h-5 w-5" />
              </a>
              <a href="#" className="hidden md:block">
                <User className="h-5 w-5" />
              </a>
              <a href="#" className="relative">
                <Heart className="h-5 w-5" />
                <span className="absolute -top-2 -right-2 bg-gray-800 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">2</span>
              </a>
              <a href="#" className="relative">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="container mx-auto px-4 py-4">
              <MobileNavMenu navItems={navItems} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

interface NavMenuProps {
  navItems: NavItem[];
}

const NavMenu: React.FC<NavMenuProps> = ({ navItems }) => {
  return (
    <nav className="flex space-x-6">
      {navItems.map((item, index) => (
        <div key={index} className={`relative group ${item.hasSubmenu ? 'has-submenu' : ''}`}>
          <a 
            href={item.link} 
            className="text-gray-800 hover:text-indigo-600 font-medium flex items-center"
          >
            {item.label}
            {item.hasSubmenu && <ChevronDown className="h-4 w-4 ml-1" />}
          </a>
          
          {item.hasSubmenu && item.submenu && (
            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200 z-50">
              <div className="py-1">
                {item.submenu.map((subItem, subIndex) => (
                  <a 
                    key={subIndex} 
                    href={subItem.link} 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {subItem.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

const MobileNavMenu: React.FC<NavMenuProps> = ({ navItems }) => {
  const [openSubmenus, setOpenSubmenus] = useState<Record<number, boolean>>({});
  
  const toggleSubmenu = (index: number) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  
  return (
    <nav className="flex flex-col space-y-0">
      {navItems.map((item, index) => (
        <React.Fragment key={index}>
          <div 
            className="text-gray-800 py-3 border-b border-gray-100 flex justify-between items-center"
            onClick={() => item.hasSubmenu && toggleSubmenu(index)}
          >
            <a href={!item.hasSubmenu ? item.link : undefined} className="flex-grow">
              {item.label}
            </a>
            {item.hasSubmenu && (
              <button className="focus:outline-none">
                <ChevronDown className={`h-4 w-4 transform transition-transform ${openSubmenus[index] ? 'rotate-180' : ''}`} />
              </button>
            )}
          </div>
          
          {item.hasSubmenu && item.submenu && openSubmenus[index] && (
            <div className="pl-4 py-2 bg-gray-50 border-b border-gray-100">
              {item.submenu.map((subItem, subIndex) => (
                <a 
                  key={subIndex} 
                  href={subItem.link} 
                  className="block py-2 text-sm text-gray-700 hover:text-indigo-600"
                >
                  {subItem.label}
                </a>
              ))}
            </div>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Header;