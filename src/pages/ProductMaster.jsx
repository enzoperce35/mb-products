import React, { useState, useEffect } from 'react';
import { getIngredientCost } from '../utils/factory'; 
import './ProductMaster.css';

const ProductMaster = () => {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_URL = "https://servewise-market-backend.onrender.com/api/v1/ingredients";

    fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error("Failed to load Master list");
        return res.json();
      })
      .then(data => {
        setIngredients(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Master List Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loader">Updating Master Records...</div>;

  return (
    <div className="product-master-container">
      <div className="master-header">
        <div>
          <h1>Product Master</h1>
          <p className="subtitle">Manage raw materials and base costs</p>
        </div>
        <button className="add-btn">+ New Ingredient</button>
      </div>

      <div className="master-grid">
        {ingredients.map((ing) => (
          <div key={ing.id} className="master-card">
            <div className="card-top">
              <span className="category-tag">{ing.category || 'General'}</span>
              <span className="id-badge">#{ing.id}</span>
            </div>
            
            <h3 className="ing-name">{ing.name}</h3>
            <p className="ing-brand">{ing.brand || "Generic / Market"}</p>

            <div className="stats-row">
              <div className="stat">
                <label>Inventory Unit</label>
                <span>{ing.quantity} {ing.unit}</span>
              </div>
              <div className="stat">
                <label>Yield</label>
                <span>{(ing.yield * 100).toFixed(0)}%</span>
              </div>
            </div>

            <div className="price-footer">
              <div className="price-info">
                <label>Current Price</label>
                <span className="price-amt">₱{parseFloat(ing.price).toFixed(2)}</span>
              </div>
              <button className="edit-icon-btn">Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductMaster;
