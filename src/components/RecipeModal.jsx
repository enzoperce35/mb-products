import React, { useState } from 'react';
import './RecipeModal.css';

const UNIT_GROUPS = {
  WEIGHT: ["mg", "g", "kg", "oz", "lb"],
  VOLUME: ["ml", "l", "tsp", "tbs", "fl-oz", "cup", "gal"],
  COUNT: ["each"]
};

const RecipeModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    recipe_type: 'main', 
    base_yield_quantity: 1,
    base_yield_unit: 'each',
    instructions: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Create New Recipe</h2>
          <button className="close-x" onClick={onClose}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input 
              type="text" 
              required 
              placeholder="e.g., Special Pork Sisig"
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Recipe Category</label>
            <select 
              value={formData.recipe_type} 
              onChange={e => setFormData({...formData, recipe_type: e.target.value})}
            >
              <option value="main">Main (Final Dish/Bundle)</option>
              <option value="sub">Sub-Recipe (Prepared Element)</option>
              <option value="component">Component (Base Sauce/Mix)</option>
            </select>
          </div>

          <div className="form-row" style={{ display: 'flex', gap: '10px' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Base Yield</label>
              <input 
                type="number" 
                step="0.01"
                value={formData.base_yield_quantity} 
                onChange={e => setFormData({...formData, base_yield_quantity: e.target.value})}
              />
            </div>
            
            <div className="form-group" style={{ flex: 1 }}>
              <label>Unit</label>
              <select 
                value={formData.base_yield_unit} 
                onChange={e => setFormData({...formData, base_yield_unit: e.target.value})}
              >
                {Object.entries(UNIT_GROUPS).map(([group, units]) => (
                  <optgroup key={group} label={group}>
                    {units.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Instructions</label>
            <textarea 
              rows="3"
              value={formData.instructions} 
              onChange={e => setFormData({...formData, instructions: e.target.value})}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-save">Save Recipe</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecipeModal;
