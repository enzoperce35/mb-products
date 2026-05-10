import React, { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import MarketPrices from './pages/MarketPrices';
import ProductMaster from './pages/ProductMaster';
import Recipes from './pages/Recipes';
import RecipeDetail from './pages/RecipeDetail';
import RecipeModal from './components/RecipeModal';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Global State for Caching
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingRecipe, setEditingRecipe] = useState(null);

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

  const handleAddRecipe = async (newRecipeData) => {
    try {
      const response = await fetch("https://servewise-market-backend.onrender.com/api/v1/recipes", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ recipe: newRecipeData })
      });

      const data = await response.json();

      if (response.ok) {
        setRecipes(prev => [...prev, data]);
        setIsModalOpen(false);
      } else {
        // Safer error handling: check if data.errors exists before joining
        const errorMsg = data.errors ? data.errors.join(", ") : (data.error || "An unauthorized error occurred.");
        alert(`Error ${response.status}: ${errorMsg}`);
      }
    } catch (err) {
      console.error("Failed to save recipe:", err);
    }
  };

  const handleUpdateRecipe = async (updatedData) => {
    try {
      const response = await fetch(`https://servewise-market-backend.onrender.com/api/v1/recipes/${editingRecipe.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ recipe: updatedData })
      });

      const data = await response.json();

      if (response.ok) {
        // Update global recipes list
        setRecipes(prev => prev.map(r => r.id === data.id ? data : r));
        setEditingRecipe(null); // Close modal
      } else {
        alert(`Error: ${data.errors?.join(", ") || "Update failed"}`);
      }
    } catch (err) {
      console.error("Update error:", err);
    }
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
            onAddRecipe={() => setIsModalOpen(true)}
          />
        )}

        {isModalOpen && (
          <RecipeModal
            onClose={() => setIsModalOpen(false)}
            onSave={handleAddRecipe}
            allIngredients={ingredients}
            allRecipes={recipes}
          />
        )}

        {currentView === 'recipe-detail' && (
          <RecipeDetail
            recipeId={selectedRecipeId}
            onBack={() => setCurrentView('recipes')}
            recipes={recipes}
            onEditClick={(recipe) => setEditingRecipe(recipe)}
          />
        )}

        {editingRecipe && (
          <RecipeModal
            recipe={editingRecipe}
            onClose={() => setEditingRecipe(null)}
            onSave={handleUpdateRecipe}
            allIngredients={ingredients}
            allRecipes={recipes}
          />
        )}
      </main>
    </div>
  );
}

export default App;
