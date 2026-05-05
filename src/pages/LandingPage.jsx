import React from 'react';
import './LandingPage.css';

const LandingPage = ({ setView, ingredients, recipes, loading }) => {

  return (
    <div className="dashboard-wrapper">
      <section className="welcome-banner">
        <h2>Ma'Donna Dashboard</h2>
        <p>Manage your inventory, production costs, and recipe margins.</p>
      </section>

      {/* QUICK STATS PILLS - Uses props for immediate display */}
      <div className="quick-stats-row">
        <div className="stat-pill">
          <label>Ingredients</label>
          <span className="value">
            {loading ? "..." : (ingredients?.length || 0)}
          </span>
        </div>

        <div className="stat-pill">
          <label>Recipes</label>
          <span className="value">
            {loading ? "..." : (recipes?.length || 0)}
          </span>
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
            <p>Update costs for {loading ? "..." : (ingredients?.length || 0)} raw materials.</p>
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
            <p>Analyze food costs for {loading ? "..." : (recipes?.length || 0)} active menus.</p>
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
