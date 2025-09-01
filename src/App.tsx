// App.tsx
import React, { useState } from 'react';
import HomePage from './pages/index';
import ProductsPage from './pages/Products';
import ProductSingleView from './pages/SingleProduct';
import CartPage from './pages/CartPage'; 

// Simple routing system (in production, use React Router)
type Route = 'home' | 'products' | 'product-single' | 'cart' | 'about' | 'contact';

interface AppState {
  currentRoute: Route;
  selectedProductId?: string;
}

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>({
    currentRoute: 'home'
  });

  // Function to handle navigation
  const navigate = (route: Route, productId?: string) => {
    setAppState({
      currentRoute: route,
      selectedProductId: productId
    });
    // Scroll to top when navigating
    window.scrollTo(0, 0);
  };

  // Pass navigation function to components via context or props
  React.useEffect(() => {
    // Make navigation function globally available
    (window as any).navigate = navigate;
  }, []);

  const renderCurrentPage = () => {
    switch (appState.currentRoute) {
      case 'home':
        return <HomePage />;
      
      case 'products':
        return <ProductsPage />;
      
      case 'product-single':
        return <ProductSingleView productId={appState.selectedProductId} />;
      
      case 'cart':
        return <CartPage />;
      
      case 'about':
        return (
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
              <p className="text-xl text-gray-600 mb-8">Coming Soon...</p>
              <button
                onClick={() => navigate('home')}
                className="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        );
      
      case 'contact':
        return (
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
              <p className="text-xl text-gray-600 mb-8">Coming Soon...</p>
              <button
                onClick={() => navigate('home')}
                className="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        );
      
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="App">
      {renderCurrentPage()}
    </div>
  );
};

export default App;