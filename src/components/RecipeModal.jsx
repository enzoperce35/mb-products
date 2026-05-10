import React, { useState } from 'react';
import { Plus, Trash2, Layers, Citrus } from 'lucide-react';
import './RecipeModal.css';

const UNIT_GROUPS = {
  WEIGHT: ["mg", "g", "kg", "oz", "lb"],
  VOLUME: ["ml", "l", "tsp", "tbs", "fl-oz", "cup", "gal"],
  COUNT: ["each"],
  TIME: ["minute"]
};

const RECIPE_TYPES = [
  { value: 'main', label: 'Main Dish', desc: 'Final product for customers' },
  { value: 'sub', label: 'Sub-Recipe', desc: 'Prepared item used in other recipes' },
  { value: 'component', label: 'Base Component', desc: 'Basic sauce, marinade, or mix' }
];

const RecipeModal = ({ onClose, onSave, recipe, allIngredients = [], allRecipes = [] }) => {
  const [formData, setFormData] = useState({
    name: recipe?.name || '',
    recipe_type: recipe?.recipe_type || 'main',
    base_yield_quantity: recipe?.base_yield_quantity || 1,
    base_yield_unit: recipe?.base_yield_unit || 'each',
    instructions: recipe?.instructions || '',
    recipe_items_attributes: (recipe?.recipe_items || []).map(item => ({
      id: item.id,
      component_id: item.component_id,
      component_type: item.component_type,
      component_name: item.component_name,
      needed_quantity: item.needed_quantity,
      needed_unit: item.needed_unit,
      _destroy: false
    }))
  });

  const getUnitGroup = (unit) => {
    if (UNIT_GROUPS.WEIGHT.includes(unit)) return "WEIGHT";
    if (UNIT_GROUPS.VOLUME.includes(unit)) return "VOLUME";
    if (UNIT_GROUPS.COUNT.includes(unit)) return "COUNT";
    return null;
  };

  const renderRecipeGroup = (type, label) => {
    const filtered = allRecipes.filter(r => {
      // For 'sub' and 'component', we match strictly. 
      // Everything else that isn't 'main' or 'sub' falls into component/other.
      if (type === 'main') return r.recipe_type === 'main';
      if (type === 'sub') return r.recipe_type === 'sub';
      return r.recipe_type === 'component' || (!r.recipe_type && type === 'component');
    });
  
    if (filtered.length === 0) return null;
  
    return (
      <optgroup label={label}>
        {filtered.map(r => (
          <option key={`rec-${r.id}`} value={r.id}>{r.name}</option>
        ))}
      </optgroup>
    );
  };

  const renderUnitOptions = (currentItem) => {
    const sourceData = currentItem.component_type === 'Ingredient' ? allIngredients : allRecipes;
    const original = sourceData.find(i => i.id == currentItem.component_id);

    const baseUnit = currentItem.component_type === 'Ingredient' 
      ? original?.unit 
      : original?.base_yield_unit;
  
    const unitToMatch = baseUnit || currentItem.needed_unit;
    const groupKey = getUnitGroup(unitToMatch);
  
    if (groupKey && UNIT_GROUPS[groupKey]) {
      return (
        <optgroup label={`Compatible ${groupKey} Units`}>
          {UNIT_GROUPS[groupKey].map(u => (
            <option key={u} value={u}>{u}</option>
          ))}
        </optgroup>
      );
    }
  
    return Object.entries(UNIT_GROUPS).map(([group, units]) => (
      <optgroup key={group} label={group}>
        {units.map(u => <option key={u} value={u}>{u}</option>)}
      </optgroup>
    ));
  };

  const addComponent = (item, type) => {
    // Prevent adding the same recipe to itself as a sub-recipe
    if (type === 'Recipe' && item.id === recipe?.id) {
      alert("A recipe cannot be its own sub-recipe.");
      return;
    }

    const newItem = {
      component_id: item.id,
      component_type: type, // 'Ingredient' or 'Recipe'
      component_name: item.name,
      needed_quantity: 1,
      needed_unit: type === 'Ingredient' ? item.unit : item.base_yield_unit,
      _destroy: false
    };

    setFormData(prev => ({
      ...prev,
      recipe_items_attributes: [...prev.recipe_items_attributes, newItem]
    }));
  };

  const updateItem = (index, field, value) => {
    const updatedItems = [...formData.recipe_items_attributes];
    updatedItems[index][field] = value;
    setFormData({ ...formData, recipe_items_attributes: updatedItems });
  };

  const removeRow = (index) => {
    const updatedItems = [...formData.recipe_items_attributes];
    if (updatedItems[index].id) {
      updatedItems[index]._destroy = true;
    } else {
      updatedItems.splice(index, 1);
    }
    setFormData({ ...formData, recipe_items_attributes: updatedItems });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content recipe-modal-wide">
        <div className="modal-header">
          <div className="header-title-group">
            <h2>{recipe ? `Edit: ${recipe.name}` : 'Create New Recipe'}</h2>
            <span className={`type-badge badge-${formData.recipe_type}`}>
              {formData.recipe_type.toUpperCase()}
            </span>
          </div>
          <button type="button" className="close-x" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="recipe-form-grid">
          {/* LEFT COLUMN: Basic Info */}
          <div className="form-column-main">
            <div className="form-group type-selector-group">
              <label>Recipe Classification</label>
              <div className="type-options-grid">
                {RECIPE_TYPES.map((type) => (
                  <div
                    key={type.value}
                    className={`type-card ${formData.recipe_type === type.value ? 'selected' : ''}`}
                    onClick={() => setFormData({ ...formData, recipe_type: type.value })}
                  >
                    <div className="type-card-radio"></div>
                    <div className="type-card-content">
                      <strong>{type.label}</strong>
                      <span>{type.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Recipe Name</label>
              <input
                type="text"
                required
                placeholder="e.g., Special Pork Sisig"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="form-row flex-row">
              <div className="form-group flex-1">
                <label>Yield Quantity</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.base_yield_quantity}
                  onChange={e => setFormData({ ...formData, base_yield_quantity: e.target.value })}
                />
              </div>
              <div className="form-group flex-1">
                <label>Yield Unit</label>
                <select
                  value={formData.base_yield_unit}
                  onChange={e => setFormData({ ...formData, base_yield_unit: e.target.value })}
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
                rows="5"
                placeholder="Step 1: Prep ingredients..."
                value={formData.instructions}
                onChange={e => setFormData({ ...formData, instructions: e.target.value })}
              />
            </div>
          </div>

          {/* RIGHT COLUMN: Ingredients & Sub-Recipes */}
          <div className="form-column-items">
            <label>Recipe Composition</label>

            <div className="items-selector-bar">
              {/* INGREDIENTS SELECT */}
              <select
                className="select-add"
                disabled={allIngredients.length === 0}
                onChange={(e) => {
                  const val = e.target.value;
                  if (!val) return;
                  const item = allIngredients.find(i => i.id == val);
                  if (item) addComponent(item, 'Ingredient');
                  e.target.value = "";
                }}
              >
                <option value="">{allIngredients.length === 0 ? 'Loading Ingredients...' : '+ Add Ingredient'}</option>
                {allIngredients.map(ing => (
                  <option key={`ing-${ing.id}`} value={ing.id}>{ing.name}</option>
                ))}
              </select>

              {/* SUB-RECIPES SELECT */}
              <select
                className="select-add"
                disabled={allRecipes.length === 0}
                onChange={(e) => {
                  const val = e.target.value;
                  if (!val) return;
                  const item = allRecipes.find(r => r.id == val);
                  if (item) addComponent(item, 'Recipe');
                  e.target.value = "";
                }}
              >
                <option value="">+ Add Sub-Recipe</option>
                {renderRecipeGroup('main', 'Main')}
                {renderRecipeGroup('sub', 'Sub')}
                {renderRecipeGroup('component', 'Components')}
              </select>
            </div>

            <div className="recipe-items-table-container">
              <table className="modal-items-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th width="80">Qty</th>
                    <th width="100">Unit</th>
                    <th width="40"></th>
                  </tr>
                </thead>
                <tbody>
                  {formData.recipe_items_attributes.map((item, idx) => (
                    !item._destroy && (
                      <tr key={idx}>
                        <td className="item-name-cell">
                          {item.component_type === 'Recipe' ? <Layers size={14} className="icon-blue" /> : <Citrus size={14} className="icon-green" />}
                          <span>{item.component_name}</span>
                        </td>
                        <td>
                          <input
                            type="number"
                            className="table-input"
                            value={item.needed_quantity}
                            onChange={(e) => updateItem(idx, 'needed_quantity', e.target.value)}
                          />
                        </td>
                        <td>
                          <select
                            className="table-input"
                            value={item.needed_unit}
                            onChange={(e) => updateItem(idx, 'needed_unit', e.target.value)}
                          >
                            {renderUnitOptions(item)}
                          </select>
                        </td>
                        <td>
                          <button type="button" className="btn-delete-row" onClick={() => removeRow(idx)}>
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    )
                  ))}
                </tbody>
              </table>
              {formData.recipe_items_attributes.filter(i => !i._destroy).length === 0 && (
                <div className="empty-items-state">No items added yet.</div>
              )}
            </div>
          </div>
        </form>

        <div className="modal-footer">
          <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
          <button type="button" className="btn-save-main" onClick={handleSubmit}>
            {recipe ? 'Save Changes' : 'Create Recipe'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
