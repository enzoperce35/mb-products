import React, { useState, useEffect } from 'react';
import { Layers, ChevronLeft, DollarSign, Edit3 } from 'lucide-react';
import { formatQtyUnit } from '../utils/formatUnits';
import './RecipeDetail.css';

const formatPeso = (value) => `₱${Number(value || 0).toFixed(2)}`;

const RecipeDetail = ({ recipeId, onBack, recipes, onEditClick }) => {
  // 1. Initialize with cached data if available to prevent a blank white screen
  const cachedRecipe = recipes?.find(r => r.id === recipeId);
  const [recipe, setRecipe] = useState(cachedRecipe || null);
  const [loading, setLoading] = useState(!cachedRecipe);
  const [showPrices, setShowPrices] = useState(false);

  useEffect(() => {
    // If the cached version already has instructions/items, skip the fetch
    if (cachedRecipe && cachedRecipe.recipe_items) {
      setLoading(false);
      return;
    }

    fetch(`https://servewise-market-backend.onrender.com/api/v1/recipes/${recipeId}`)
      .then(res => res.json())
      .then(data => {
        setRecipe(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading recipe details:", err);
        setLoading(false);
      });
  }, [recipeId, cachedRecipe]);

  if (loading && !recipe) return <div className="loading-state">Fetching ingredients...</div>;
  if (!recipe) return <div className="error-state">Recipe not found.</div>;

  return (
    <div className="page-container-minimal">
      <div className="recipe-detail-header">
        <button className="back-link-minimal" onClick={onBack}>
          <ChevronLeft size={16} /> Back
        </button>

        <button 
          className="edit-recipe-btn-minimal" 
          onClick={() => onEditClick(recipe)}
        >
          <Edit3 size={18} /> Edit Recipe
        </button>
      </div>

      <div className="recipe-hero-section">
        <h1 className="minimal-recipe-title">{recipe.name}</h1>
        <div className="meta-pairs-container">
          <div className="meta-pair">
            <span className="meta-key">Quantity:</span>
            <span className="meta-value">{recipe.base_yield_quantity} {recipe.base_yield_unit}</span>
          </div>
          <div className="meta-pair">
            <span className="meta-key">Cost:</span>
            <strong className="meta-value-cost">{formatPeso(recipe.total_cost)}</strong>
          </div>
        </div>
      </div>

      <div className="recipe-sections-stack">
        <section className="column-ingredients">
          <div className="minimal-section-header">
            <h2 className="minimal-section-title">Ingredients</h2>
            <button
              className={`price-toggle-btn-minimal ${showPrices ? 'active' : ''}`}
              onClick={() => setShowPrices(prev => !prev)}
            >
              <DollarSign size={22} />
            </button>
          </div>

          <table className="minimal-ingredients-table">
            <tbody>
              {recipe.recipe_items?.map((item, idx) => (
                <tr key={idx} className="ing-item-row-minimal">
                  <td className="ing-name-minimal">
                    {item.component_name}
                    {/* Shows an icon if the ingredient is actually another recipe (Sub-recipe) */}
                    {item.component_type === "Recipe" && <Layers className="recipe-icon-minimal" />}
                  </td>
                  <td className="ing-qty-minimal">
                    {item.custom_display_name?.trim() 
                      ? item.custom_display_name 
                      : formatQtyUnit(item.needed_quantity, item.needed_unit)
                    }
                  </td>
                  {showPrices && (
                    <td className="ing-cost-minimal">{formatPeso(item.cost)}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>


          {showPrices && (
            <div className="minimal-total-row">
              <span>Total Cost</span>
              <strong>{formatPeso(recipe.total_cost)}</strong>
            </div>
          )}

        </section>

        {/* INSTRUCTIONS SECTION */}
        {recipe.instructions?.trim() && (
          <section className="column-instructions">
            <div className="minimal-section-header">
              <h2 className="minimal-section-title">Instructions</h2>
            </div>
            <ol className="minimal-instructions-list">
              {recipe.instructions.split('\n').filter(s => s.trim()).map((step, idx) => (
                <li key={idx} className="minimal-instruction-step">
                  {step.replace(/^\d+\.\s*/, '')}
                </li>
              ))}
            </ol>
          </section>
        )}
      </div>
    </div>
  );
};

export default RecipeDetail;
