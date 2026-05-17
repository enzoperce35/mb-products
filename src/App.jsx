import React, { useState, useEffect, useRef } from 'react';
import MarketPrices from './pages/MarketPrices';
import ProductMaster from './pages/ProductMaster';
import Recipes from './pages/Recipes';
import RecipeDetail from './pages/RecipeDetail';
import RecipeModal from './components/RecipeModal';
import { getOrCreateDeviceId } from './utils/deviceLock';
import './App.css';

const allowedDeviceIds = [
  "65fc2e9fc80cedb5ea09f76d6ee047da",  //mac development
  "76dd4d560a2a6a4cb785aced393a633a",  //mac production
  "dc2fbca3b5ee7817c5ceee476c65c813"   //huawei tablet
];

function App() {
  const [currentView, setCurrentView] = useState(null);
  const [isDeviceAllowed, setIsDeviceAllowed] = useState(false);
  
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);

  const touchStartX = useRef(0);
  const views = ['recipes', 'market', 'products'];
  const labels = { recipes: 'Recipes', market: 'Market Prices', products: 'Product Master' };

  useEffect(() => {
    const currentId = getOrCreateDeviceId();
    const allowed = allowedDeviceIds.includes(currentId);
    setIsDeviceAllowed(allowed);
    setCurrentView('recipes'); // Default route on launch

    // Only run data fetches if the device is actually authorized
    if (allowed) {
      setLoading(true);
      Promise.all([
        fetch("https://servewise-market-backend.onrender.com/api/v1/ingredients").then(res => res.json()),
        fetch("https://servewise-market-backend.onrender.com/api/v1/recipes").then(res => res.json())
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
    }
  }, []);

  const handleExportStaticData = async () => {
    setIsExporting(true);
    try {
      const response = await fetch("https://servewise-market-backend.onrender.com/api/v1/exports/ma_donna_bundle");
      if (!response.ok) throw new Error("Backend export generation failed.");
      const rawBundle = await response.json();
      const formattedFileContent = `export const maDonnaData = ${JSON.stringify(rawBundle, null, 2)};`;

      const fileBlob = new Blob([formattedFileContent], { type: "application/javascript" });
      const temporaryUrl = URL.createObjectURL(fileBlob);

      const downloadAnchor = document.createElement("a");
      downloadAnchor.href = temporaryUrl;
      downloadAnchor.download = "maDonnaData.js";
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();

      document.body.removeChild(downloadAnchor);
      URL.revokeObjectURL(temporaryUrl);
    } catch (error) {
      console.error("Export Error:", error);
      alert("Failed to build offline relational file. Please check server logs.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    const currentIndex = views.indexOf(currentView);

    if (diff > 60 && currentIndex < views.length - 1) setCurrentView(views[currentIndex + 1]);
    if (diff < -60 && currentIndex > 0) setCurrentView(views[currentIndex - 1]);
  };

  const openRecipe = (id) => { setSelectedRecipeId(id); setCurrentView('recipe-detail'); };

  const handleUpdatePrice = async (id, payload) => {
    try {
      const response = await fetch(`https://servewise-market-backend.onrender.com/api/v1/ingredients/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error("Bad Request");
      const updatedIngredient = await response.json();
      setIngredients(prev => prev.map(ing => ing.id === id ? updatedIngredient : ing));
    } catch (error) { console.error("Update Error:", error); throw error; }
  };

  const handleAddRecipe = async (newRecipeData) => {
    try {
      const response = await fetch("https://servewise-market-backend.onrender.com/api/v1/recipes", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ recipe: newRecipeData })
      });
      const data = await response.json();
      if (response.ok) {
        setRecipes(prev => [...prev, data]);
        setIsModalOpen(false);
      } else {
        alert(`Error: ${data.errors?.join(", ") || "Failed to add"}`);
      }
    } catch (err) { console.error("Failed to save recipe:", err); }
  };

  const handleUpdateRecipe = async (updatedData) => {
    try {
      const response = await fetch(`https://servewise-market-backend.onrender.com/api/v1/recipes/${editingRecipe.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ recipe: updatedData })
      });
      const data = await response.json();
      if (response.ok) {
        setRecipes(prev => prev.map(r => r.id === data.id ? data : r));
        setEditingRecipe(null);
      } else {
        alert(`Error: ${data.errors?.join(", ") || "Update failed"}`);
      }
    } catch (err) { console.error("Update error:", err); }
  };

  if (!currentView) return null;

  // 🛡️ HARD BLOCK: Stop rendering anything if the machine isn't authorized
  if (!isDeviceAllowed) {
    return (
      <div style={{ minHeight: '100vh', position: 'relative', backgroundColor: '#ffffff' }}>
        <code style={{ 
          position: 'absolute', bottom: '12px', right: '16px',
          fontSize: '11px', color: '#cbd5e1', userSelect: 'all', fontFamily: 'monospace', zIndex: 9999
        }}>
          {getOrCreateDeviceId()}
        </code>
      </div>
    );
  }

  return (
    <div className="app-main-wrapper" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      {currentView !== 'recipe-detail' && (
        <div className="top-swipe-nav">
          {views.map(view => (
            <h1 key={view} className={currentView === view ? 'active' : ''} onClick={() => setCurrentView(view)}>
              {labels[view]}
            </h1>
          ))}
        </div>
      )}

      <main className="content-container">
        {currentView === 'market' && (
          <MarketPrices setView={setCurrentView} ingredients={ingredients} setIngredients={setIngredients} onUpdatePrice={handleUpdatePrice} />
        )}
        {currentView === 'products' && <ProductMaster setView={setCurrentView} />}
        {currentView === 'recipes' && <Recipes setView={setCurrentView} onRecipeClick={openRecipe} recipes={recipes} loading={loading} onAddRecipe={() => setIsModalOpen(true)} />}
        
        {isModalOpen && <RecipeModal onClose={() => setIsModalOpen(false)} onSave={handleAddRecipe} allIngredients={ingredients} allRecipes={recipes} />}
        {currentView === 'recipe-detail' && <RecipeDetail recipeId={selectedRecipeId} onBack={() => setCurrentView('recipes')} recipes={recipes} onEditClick={(recipe) => setEditingRecipe(recipe)} />}
        {editingRecipe && <RecipeModal recipe={editingRecipe} onClose={() => setEditingRecipe(null)} onSave={handleUpdateRecipe} allIngredients={ingredients} allRecipes={recipes} />}
      </main>

      <button className="static-export-button" onClick={handleExportStaticData} disabled={isExporting}>
        {isExporting ? 'Generating...' : '📥 Export Static JS'}
      </button>
    </div>
  );
}

export default App;
