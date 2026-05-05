import React, { useState, useMemo } from 'react';
import './Recipes.css';

// 1. Receive recipes and loading as props from App.js
const Recipes = ({ onRecipeClick, recipes, loading }) => {
  const [showAll, setShowAll] = useState(false);
  const [error] = useState(null); // Managed globally now, but kept for UI structure

  // 2. Remove the useEffect and local fetch entirely

  const filteredRecipes = useMemo(() => {
    if (!recipes) return [];

    const sorted = [...recipes].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    if (showAll) return sorted;

    // Logic for Ma'Donna Delicacies: filter for complex recipes by default
    return sorted.filter(r => (r.recipe_items?.length || 0) > 5);
  }, [recipes, showAll]);

  // 3. Use the global loading state
  if (loading && recipes.length === 0) {
    return <div className="list-loading-state">Mabuhay! Loading Ma'Donna Recipes...</div>;
  }

  if (error) return (
    <div className="list-error-state">
      <h3>Pasensya na, may error sa server.</h3>
      <p>{error}</p>
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

        <div className="grid-footer-actions">
          <button 
            className="grid-action-btn grid-btn-primary"
            onClick={() => setShowAll(prev => !prev)}
          >
            {showAll ? "Hide Simple Recipes" : "Show All (A–Z)"}
          </button>
          <button className="grid-action-btn grid-btn-secondary" disabled>
            + Add Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recipes;
