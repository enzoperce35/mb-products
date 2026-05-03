import React, { useState, useEffect } from 'react';
import './LandingPage.css';

const LandingPage = ({ setView }) => {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        console.error("Dashboard Sync Error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="dashboard-wrapper">
      <section className="welcome-banner">
        <h2>Ma'Donna Dashboard</h2>
        <p>Manage your inventory, production costs, and recipe margins.</p>
      </section>

      {/* QUICK STATS PILLS */}
      <div className="quick-stats-row">
        <div className="stat-pill">
          <label>Ingredients</label>
          <span className="value">{loading ? "..." : ingredients.length}</span>
        </div>

        <div className="stat-pill">
          <label>Recipes</label>
          <span className="value">{loading ? "..." : recipes.length}</span>
        </div>

        <div className="stat-pill">
          <label>System Status</label>
          <span className="status-dot"></span>
          <span className="value">Online</span>
        </div>
      </div>

      <div className="action-grid">

        {/* MARKET PRICES */}
        <div className="dashboard-card market-card" onClick={() => setView('market')}>
          <div className="card-icon">🏷️</div>
          <div className="card-info">
            <h3>Market Prices</h3>
            <p>Update costs for {ingredients.length} raw materials.</p>
          </div>
          <button className="go-btn">Update List</button>
        </div>

        {/* PRODUCT MASTER */}
        <div className="dashboard-card master-card" onClick={() => setView('products')}>
          <div className="card-icon">📦</div>
          <div className="card-info">
            <h3>Product Master</h3>
            <p>Calculate yields and base inventory units.</p>
          </div>
          <button className="go-btn">Manage</button>
        </div>

        {/* RECIPES */}
        <div className="dashboard-card recipes-card" onClick={() => setView('recipes')}>
          <div className="card-icon">📝</div>
          <div className="card-info">
            <h3>Recipes</h3>
            <p>Analyze food costs for {recipes.length} active menus.</p>
          </div>
          <button className="go-btn">View Costs</button>
        </div>

        {/* BUNDLE HELPER */}
        <div className="dashboard-card bundle-card" onClick={() => alert('Bundle Builder feature coming soon!')}>
          <div className="card-icon">⚖️</div>
          <div className="card-info">
            <h3>Bundle Helper</h3>
            <p>Create profitable combos and set meals.</p>
          </div>
          <button className="go-btn">Build</button>
        </div>

      </div>
    </div>
  );
};

export default LandingPage;
