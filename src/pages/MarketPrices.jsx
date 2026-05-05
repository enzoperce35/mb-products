import React from 'react';
import './MarketPrices.css';

// 1. Accept ingredients and loading as props from App.js
const MarketPrices = ({ ingredients, loading }) => {

  // 2. Local fetch and useEffect are removed to prevent redundant network calls
  
  // 3. Use the global loading state passed from App.js
  if (loading && ingredients.length === 0) {
    return <div className="p-8 text-center">Loading Ma'Donna Market Prices...</div>;
  }

  return (
    <div className="market-prices-container">
      <div className="market-header">
        <h2>Market Prices</h2>
        <span className="ingredient-count">{ingredients.length} Ingredients Loaded</span>
      </div>

      <div className="table-wrapper">
        <table className="market-table">
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Price</th>
              <th>Quantity/Unit</th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((ing) => (
              <tr key={ing.id}>
                <td>
                  <div className="item-name">{ing.name}</div>
                  {/* brand tag helps distinguish local Philippine suppliers */}
                  <div className="brand-tag show-mobile">{ing.brand}</div>
                </td>
                <td className="price-cell">₱{parseFloat(ing.price).toFixed(2)}</td>
                <td className="unit-info">{ing.quantity} {ing.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketPrices;
