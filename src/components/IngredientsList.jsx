import React, { useState } from 'react';

import './IngredientsList.css';

const IngredientsList = () => {
  const [items, setItems] = useState(MASTER_INGREDIENTS);
  const [filter, setFilter] = useState('All');
  const [editingId, setEditingId] = useState(null);

  const getStatus = (lastUpdated, days) => {
    const diff = Math.floor((new Date() - new Date(lastUpdated)) / (1000 * 60 * 60 * 24));
    return diff > days ? 'STALE' : 'FRESH';
  };

  const handlePriceChange = (id, newPrice) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { 
        ...item, 
        price: parseFloat(newPrice) || 0,
        lastUpdated: new Date().toISOString()
      } : item
    ));
  };

  const filteredItems = filter === 'All' 
    ? items 
    : items.filter(item => item.type === filter);

  return (
    <div className="ingredient-container">
      <div className="filter-bar">
        {['All', 'Ingredient', 'Packaging', 'Utility'].map(type => (
          <button 
            key={type} 
            className={filter === type ? 'active' : ''} 
            onClick={() => setFilter(type)}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="ingredient-table">
        <div className="table-header">
          <span>Name</span>
          <span>Brand</span>
          <span>Price</span>
          <span>Status</span>
        </div>
        
        {filteredItems.map(item => {
          const status = getStatus(item.lastUpdated, item.daysBeforeCheck);
          
          return (
            <div key={item.id} className="ingredient-row">
              <span className="item-name">{item.name}</span>
              <span className="item-brand">{item.brand || '--'}</span>
              
              <div className="price-section">
                {editingId === item.id ? (
                  <input 
                    type="number" 
                    autoFocus
                    className="price-input"
                    defaultValue={item.price}
                    onBlur={(e) => {
                      handlePriceChange(item.id, e.target.value);
                      setEditingId(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handlePriceChange(item.id, e.target.value);
                        setEditingId(null);
                      }
                    }}
                  />
                ) : (
                  <span className="item-price" onClick={() => setEditingId(item.id)}>
                    ₱{item.price.toFixed(2)}
                  </span>
                )}
              </div>

              <span className={`status-badge ${status}`}>
                {status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IngredientsList;
