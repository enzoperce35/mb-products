import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import MarketPrices from './pages/MarketPrices';
import ProductMaster from './pages/ProductMaster'; // Ensure this is imported
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('landing');

  return (
    <div className="app-main-wrapper">
      <nav className="main-nav">
        <div className="nav-logo" onClick={() => setCurrentView('landing')}>
          MB <span>PRODUCTS</span>
        </div>
        <div className="nav-links">
          <button 
            className={currentView === 'market' ? 'active' : ''} 
            onClick={() => setCurrentView('market')}
          >
            Market Prices
          </button>
          <button 
            className={currentView === 'products' ? 'active' : ''} 
            onClick={() => setCurrentView('products')}
          >
            Product Master
          </button>
        </div>
      </nav>

      <main className="content-container">
  {currentView === 'landing' && <LandingPage setView={setCurrentView} />}
  {currentView === 'market' && <MarketPrices setView={setCurrentView} />}
  {currentView === 'products' && <ProductMaster setView={setCurrentView} />}
</main>
    </div>
  );
}

export default App;
