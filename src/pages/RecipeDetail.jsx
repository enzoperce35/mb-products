import React, { useState, useEffect } from 'react';
import { Layers, DollarSign } from 'lucide-react';
import './RecipeDetail.css';

const formatPeso = (value) => {
  return `₱${Number(value || 0).toFixed(2)}`;
};

const RecipeDetail = ({ recipeId, onBack }) => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPrices, setShowPrices] = useState(false);

  useEffect(() => {
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
  }, [recipeId]);

  if (loading) return <div className="loading-state">Fetching ingredients...</div>;
  if (!recipe) return <div className="error-state">Recipe not found.</div>;

  return (
    <div className="detail-page-container">
      <button className="back-link" onClick={onBack}>← Back</button>

      <div className="recipe-detail-card">

        {/* HEADER */}
        <header className="recipe-detail-header">
          <h1 className="recipe-title-main">{recipe.name}</h1>

          <div className="recipe-meta-strip">
            {recipe.base_yield_quantity} {recipe.base_yield_unit} | 8 mins | 
            <strong className="total-price">
              {formatPeso(recipe.total_cost)}
            </strong>
          </div>
        </header>

        <div className={`recipe-columns ${!recipe.instructions || recipe.instructions.trim() === "" ? 'single-column' : ''}`}>

          {/* INGREDIENTS */}
          <div className="column-ingredients">

            <h2 className="section-title-blue">
              Ingredients

              <button
                className={`price-toggle-btn ${showPrices ? 'active' : ''}`}
                onClick={() => setShowPrices(prev => !prev)}
                title="Toggle ingredient cost"
              >
                <DollarSign size={20} />
              </button>
            </h2>

            <table className="ingredients-table">
              <tbody>
                {recipe.recipe_items?.map((item, idx) => (
                  <tr key={idx}>
                    
                    {/* NAME */}
                    <td className="ing-name">
                      {item.component_name}

                      {item.component_type === "Recipe" && (
                        <Layers className="recipe-icon" />
                      )}
                    </td>

                    {/* QTY */}
                    <td className="ing-qty">
                      {Number(item.needed_quantity).toFixed(2)} {item.needed_unit}
                    </td>

                    {/* PRICE */}
                    {showPrices && (
                      <td className="ing-cost">
                        {formatPeso(item.cost)}
                      </td>
                    )}

                  </tr>
                ))}
              </tbody>
            </table>

            {/* TOTAL FOOTER (professional touch) */}
            {showPrices && (
              <div className="total-row">
                <span>Total Cost</span>
                <strong>{formatPeso(recipe.total_cost)}</strong>
              </div>
            )}

          </div>

          {/* INSTRUCTIONS */}
          {recipe.instructions && recipe.instructions.trim() !== "" && (
            <div className="column-instructions">
              <h2 className="section-title-blue">Instructions</h2>

              <ol className="instructions-list">
                {recipe.instructions
                  .split('\n')
                  .filter(step => step.trim() !== "")
                  .map((step, idx) => (
                    <li key={idx} className="instruction-step">
                      {step.replace(/^\d+\.\s*/, '')}
                    </li>
                  ))}
              </ol>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
