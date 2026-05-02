import React, { useState, useEffect } from 'react';
import './MarketPrices.css';

const MarketPrices = () => {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with your actual Render backend URL
    const API_URL = "https://servewise-market-backend.onrender.com/api/v1/ingredients";

    fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(data => {
        setIngredients(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8 text-center">Loading Ma'Donna Market Prices...</div>;

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
