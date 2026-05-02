import React, { useState, useEffect } from 'react';
// Keeping your local constants for now, but we'll supplement with backend data
import { recipes } from '../constants/recipes'; 
import './LandingPage.css';

const LandingPage = ({ setView }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [ingredients, setIngredients] = useState([]);

  // Fetching the 113 items to make the "Market Items" pill live
  useEffect(() => {
    fetch("https://servewise-market-backend.onrender.com/api/v1/ingredients")
      .then(res => res.json())
      .then(data => setIngredients(data))
      .catch(err => console.error("Dashboard Sync Error:", err));
  }, []);

  const filteredRecipes = recipes.filter(r => 
    r.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="landing-container">
      {/* GLOBAL SEARCH BAR */}
      <div className="search-overlay">
        <input 
          type="text" 
          placeholder="Search products, ingredients, or recipes..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="global-search"
        />
        <span className="search-icon">🔍</span>
      </div>

      <header className="dashboard-header">
        <h1>Ma'Donna Delicacies</h1>
        <p className="subtitle">Command Center • {new Date().toLocaleDateString()}</p>
      </header>

      {/* QUICK STATS TABS */}
      <div className="stats-row">
        <div className="stat-pill">
          <label>Avg. Margin</label>
          <span className="value green">42.5%</span>
        </div>
        <div className="stat-pill">
          <label>Active Recipes</label>
          <span className="value">{recipes.length}</span>
        </div>
        <div className="stat-pill">
          <label>Market Items</label>
          <span className="value">{ingredients.length || "..."}</span>
        </div>
      </div>

      <section className="action-grid">
        <div className="nav-card red-theme">
          <h3>Product Master</h3>
          <p>Pricing, Yields & Profit Analysis</p>
          <button className="nav-btn" onClick={() => setView('products')}>
            Open Manager
          </button>
        </div>
        
        <div className="nav-card gold-theme">
          <h3>Market Prices</h3>
          <p>Update {ingredients.length} Ingredients & Packaging</p>
          <button className="nav-btn" onClick={() => setView('market')}>
            Update List
          </button>
        </div>

        <div className="nav-card dark-theme">
          <h3>Bundle Helper</h3>
          <p>Construct profitable combos & sets</p>
          <button className="nav-btn" onClick={() => setView('bundles')}>
            Build Bundle
          </button>
        </div>
      </section>

      {/* SEARCH RESULTS PREVIEW */}
      {searchQuery && (
        <section className="search-results">
          <h3>Search Results for "{searchQuery}"</h3>
          <div className="results-list">
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map(res => (
                <div key={res.id} className="result-item" onClick={() => setView('products')}>
                  Found in Recipes: <strong>{res.id}</strong>
                </div>
              ))
            ) : (
              <div className="result-item">No matches found.</div>
            )}
          </div>
        </section>
      )}

      <section className="alerts-container">
        <div className="alert-header">
          <h3>🚨 Margin Watch</h3>
          <span>Action Required</span>
        </div>
        <div className="alert-card warning">
          <div className="alert-info">
            <span className="alert-title">Empanada (Solo)</span>
            <span className="alert-desc">Cost increased due to Flour price hike.</span>
          </div>
          <button className="fix-btn" onClick={() => setView('market')}>
            Adjust Price
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
