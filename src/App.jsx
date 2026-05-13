import React, { useState, useEffect, useRef } from 'react';
import MarketPrices from './pages/MarketPrices';
import ProductMaster from './pages/ProductMaster';
import Recipes from './pages/Recipes';
import RecipeDetail from './pages/RecipeDetail';
import RecipeModal from './components/RecipeModal';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('market');
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingRecipe, setEditingRecipe] = useState(null);

  const touchStartX = useRef(0);

  const views = ['market', 'products', 'recipes'];

  const labels = {
    market: 'Market Prices',
    products: 'Product Master',
    recipes: 'Recipes'
  };

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

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    const currentIndex = views.indexOf(currentView);

    // swipe left
    if (diff > 60 && currentIndex < views.length - 1) {
      setCurrentView(views[currentIndex + 1]);
    }

    // swipe right
    if (diff < -60 && currentIndex > 0) {
      setCurrentView(views[currentIndex - 1]);
    }
  };

  const openRecipe = (id) => {
    setSelectedRecipeId(id);
    setCurrentView('recipe-detail');
  };

  const handleUpdatePrice = async (id, payload) => {
    try {
      const response = await fetch(
        `https://servewise-market-backend.onrender.com/api/v1/ingredients/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend validation error:", errorData);
        throw new Error("Bad Request");
      }

      const updatedIngredient = await response.json();

      setIngredients(prev =>
        prev.map(ing => ing.id === id ? updatedIngredient : ing)
      );

    } catch (error) {
      console.error("Update Error:", error);
      throw error;
    }
  };

  const handleAddRecipe = async (newRecipeData) => {
    try {
      const response = await fetch(
        "https://servewise-market-backend.onrender.com/api/v1/recipes",
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ recipe: newRecipeData })
        }
      );

      const data = await response.json();

      if (response.ok) {
        setRecipes(prev => [...prev, data]);
        setIsModalOpen(false);
      } else {
        const errorMsg =
          data.errors
            ? data.errors.join(", ")
            : (data.error || "An unauthorized error occurred.");

        alert(`Error ${response.status}: ${errorMsg}`);
      }
    } catch (err) {
      console.error("Failed to save recipe:", err);
    }
  };

  const handleUpdateRecipe = async (updatedData) => {
    try {
      const response = await fetch(
        `https://servewise-market-backend.onrender.com/api/v1/recipes/${editingRecipe.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ recipe: updatedData })
        }
      );

      const data = await response.json();

      if (response.ok) {
        setRecipes(prev =>
          prev.map(r => r.id === data.id ? data : r)
        );

        setEditingRecipe(null);

      } else {
        alert(`Error: ${data.errors?.join(", ") || "Update failed"}`);
      }

    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <div
      className="app-main-wrapper"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >

      {/* Horizontal Swipe Navigation */}
      {currentView !== 'recipe-detail' && (
        <div className="top-swipe-nav">
          {views.map(view => (
            <h1
              key={view}
              className={currentView === view ? 'active' : ''}
              onClick={() => setCurrentView(view)}
            >
              {labels[view]}
            </h1>
          ))}
        </div>
      )}

      <main className="content-container">

        {currentView === 'market' && (
          <MarketPrices
            setView={setCurrentView}
            ingredients={ingredients}
            setIngredients={setIngredients}
            onUpdatePrice={handleUpdatePrice}
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
