import React, { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import MarketPrices from './pages/MarketPrices';
import ProductMaster from './pages/ProductMaster'; 
import Recipes from './pages/Recipes';
import RecipeDetail from './pages/RecipeDetail';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  // Global State for Caching
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Centralized Data Fetching (Fetched only once on mount)
  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch("https://servewise-market-backend.onrender.com/api/v1/ingredients")
        .then(res => res.json()),
      fetch("https://servewise-market-backend.onrender.com/api/v1/recipes")
        .then(res => res.json())
    ])
      .then(([ingredientsData, recipesData]) => {
        setIngredients(ingredientsData);
        setRecipes(recipesData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Global Data Sync Error:", err);
        setLoading(false);
      });
  }, []);

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
        {currentView === 'landing' && (
          <LandingPage 
            setView={setCurrentView} 
            ingredients={ingredients} 
            recipes={recipes} 
            loading={loading} 
          />
        )}
        
        {currentView === 'market' && (
          <MarketPrices 
            setView={setCurrentView} 
            ingredients={ingredients} 
            setIngredients={setIngredients} // Allows local updates to sync globally
          />
        )}

        {currentView === 'products' && (
          <ProductMaster setView={setCurrentView} />
        )}
        
        {currentView === 'recipes' && (
          <Recipes 
            setView={setCurrentView} 
            onRecipeClick={openRecipe} 
            recipes={recipes} 
            loading={loading}
          />
        )}

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
