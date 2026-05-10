import React, { useState, useMemo } from 'react';
import './Recipes.css';

const Recipes = ({ onRecipeClick, recipes, loading, onAddRecipe }) => {
  // 1. Manage active tab for grouping
  const [activeTab, setActiveTab] = useState('sub');

  // 2. Group recipes by type (Main, Sub, Component)
  const groupedRecipes = useMemo(() => {
    if (!recipes) return { main: [], sub: [], component: [] };

    const groups = {
      main: [],
      sub: [],
      component: []
    };

    // Sort alphabetically and group
    [...recipes]
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach(recipe => {
        const type = recipe.recipe_type || 'component';
        if (groups[type]) groups[type].push(recipe);
      });

    return groups;
  }, [recipes]);

  if (loading && recipes.length === 0) {
    return <div className="list-loading-state">Mabuhay! Loading Ma'Donna Recipes...</div>;
  }

  return (
    <div className="list-view-container">
      {/* Tab Navigation for Groups */}
      <div className="recipe-type-tabs">
        {['sub', 'main', 'component'].map((type) => (
          <button
            key={type}
            className={`tab-btn ${activeTab === type ? 'active' : ''}`}
            onClick={() => setActiveTab(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}s
          </button>
        ))}
      </div>

      <div className="recipes-main-grid">
        {groupedRecipes[activeTab].length > 0 ? (
          groupedRecipes[activeTab].map((recipe) => (
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
          ))
        ) : (
          <div className="empty-group-state">No {activeTab} recipes found.</div>
        )}

        <div className="grid-footer-actions">
          {/* 3. Add Recipe now calls the prop function */}
          <button 
            className="grid-action-btn grid-btn-primary"
            onClick={onAddRecipe}
          >
            + Add New {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recipes;
