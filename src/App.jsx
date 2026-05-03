import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import MarketPrices from './pages/MarketPrices';
import ProductMaster from './pages/ProductMaster'; 
import Recipes from './pages/Recipes';
import RecipeDetail from './pages/RecipeDetail'; // You'll create this file next
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  // Helper to handle going to details
  const openRecipe = (id) => {
    setSelectedRecipeId(id);
    setCurrentView('recipe-detail');
  };

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
          <button 
            className={currentView === 'recipes' || currentView === 'recipe-detail' ? 'active' : ''} 
            onClick={() => setCurrentView('recipes')}
          >
            Recipes
          </button>
        </div>
      </nav>

      <main className="content-container">
        {currentView === 'landing' && <LandingPage setView={setCurrentView} />}
        {currentView === 'market' && <MarketPrices setView={setCurrentView} />}
        {currentView === 'products' && <ProductMaster setView={setCurrentView} />}
        
        {/* Pass the openRecipe function to the Recipes grid */}
        {currentView === 'recipes' && (
          <Recipes setView={setCurrentView} onRecipeClick={openRecipe} />
        )}

        {/* New View for the Detail Page */}
        {currentView === 'recipe-detail' && (
          <RecipeDetail 
            recipeId={selectedRecipeId} 
            onBack={() => setCurrentView('recipes')} 
          />
        )}
      </main>
    </div>
  );
}

export default App;
