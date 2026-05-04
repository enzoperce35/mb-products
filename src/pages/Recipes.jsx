import React, { useState, useEffect, useMemo } from 'react';
import './Recipes.css';

const Recipes = ({ onRecipeClick }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch("https://servewise-market-backend.onrender.com/api/v1/recipes")
      .then(res => {
        if (!res.ok) throw new Error(`Server Error: ${res.status}`);
        return res.json();
      })
      .then(data => {
        setRecipes(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading recipes:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredRecipes = useMemo(() => {
    if (!recipes) return [];

    const sorted = [...recipes].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    if (showAll) return sorted;

    return sorted.filter(r => (r.recipe_items?.length || 0) > 5);
  }, [recipes, showAll]);

  if (loading) return <div className="list-loading-state">Mabuhay! Loading Ma'Donna Recipes...</div>;

  if (error) return (
    <div className="list-error-state">
      <h3>Pasensya na, may error sa server.</h3>
      <p>{error}</p>
      <button onClick={() => window.location.reload()}>Try Again</button>
    </div>
  );

  return (
    <div className="list-view-container">
      <div className="recipes-main-grid">

        {filteredRecipes.map((recipe) => (
          <div 
            key={recipe.id} 
            className="grid-item-card"
            onClick={() => onRecipeClick(recipe.id)}
          >
            <div className="grid-item-inner">
              <h3 className="grid-item-title">{recipe.name}</h3>

              <div className="grid-item-yield">
                {parseFloat(recipe.base_yield_quantity)} {recipe.base_yield_unit}
              </div>
            </div>
          </div>
        ))}

        {/* 🔘 ACTION BUTTONS */}
        <div className="grid-footer-actions">
          <button 
            className="grid-action-btn grid-btn-primary"
            onClick={() => setShowAll(prev => !prev)}
          >
            {showAll ? "Hide Simple Recipes" : "Show All (A–Z)"}
          </button>

          <button 
            className="grid-action-btn grid-btn-secondary"
            disabled
            title="Coming soon"
          >
            + Add Recipe
          </button>
        </div>

      </div>
    </div>
  );
};

export default Recipes;
