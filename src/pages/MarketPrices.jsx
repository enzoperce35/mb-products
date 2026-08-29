import React, { useState } from 'react';
import './MarketPrices.css';
import { UNIT_MAP, getUnitCategory, getScalingFactor } from '../utils/productCalculations';

// Unit option definitions
const WEIGHT_UNITS = ["mg", "g", "kg", "oz", "lb"];
const VOLUME_UNITS = ["ml", "l", "tsp", "tbs", "fl-oz", "cup", "gal"];
const PIECE_UNIT = ["each"];

// Helper to handle DB timestamps
const getTimeAgo = (dateString) => {
  if (!dateString) return null;

  const now = new Date();
  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const past = new Date(dateString);
  const pastMidnight = new Date(past.getFullYear(), past.getMonth(), past.getDate());

  const diffInMs = todayMidnight - pastMidnight;
  const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "today";
  if (diffInDays === 1) return "yesterday";
  if (diffInDays < 30) return `${diffInDays} days ago`;

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
};

// Initial form state with blank fields
const INITIAL_ADD_FORM = {
  name: '',
  brand: '',
  price: '',
  quantity: '',
  unit: 'g',
  standard_quantity: '',
  standard_unit: 'g',
  notes: ''
};

const MarketPrices = ({ ingredients, loading, onUpdatePrice, onAddIngredient }) => {
  const [editingItem, setEditingItem] = useState(null);
  const [statsItem, setStatsItem] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form state for creating a new ingredient
  const [addForm, setAddForm] = useState(INITIAL_ADD_FORM);

  // Form state for editing existing price/purchase
  const [editForm, setEditForm] = useState({
    purchasePrice: '',
    purchaseQty: '',
    purchaseUnit: '',
    notes: ''
  });

  const handlePriceClick = (ingredient) => {
    setEditingItem(ingredient);
    setEditForm({
      purchasePrice: ingredient.last_purchase_price || ingredient.price,
      purchaseQty: ingredient.last_purchase_qty || Number(ingredient.standard_quantity) || '',
      purchaseUnit: ingredient.last_purchase_unit || ingredient.standard_unit || ingredient.unit,
      notes: ingredient.notes || ''
    });
  };

  const handleSaveEdit = async () => {
    const { purchasePrice, purchaseQty, purchaseUnit, notes } = editForm;

    if (!purchasePrice || !purchaseQty) {
      alert("Please enter both price and quantity");
      return;
    }

    const category = getUnitCategory(editingItem.standard_unit);
    const factor = getScalingFactor(purchaseUnit, editingItem.standard_unit, category);

    const totalStandardPrice = (parseFloat(purchasePrice) / parseFloat(purchaseQty)) * factor * parseFloat(editingItem.standard_quantity);

    const payload = {
      ingredient: {
        price: totalStandardPrice.toFixed(2),
        last_purchase_price: parseFloat(purchasePrice),
        last_purchase_qty: parseFloat(purchaseQty),
        last_purchase_unit: purchaseUnit,
        notes: notes
      }
    };

    try {
      await onUpdatePrice(editingItem.id, payload);
      setEditingItem(null);
    } catch (error) {
      alert("Failed to update price.");
    }
  };

  const handleSaveAdd = async () => {
    const { name, brand, price, quantity, unit, standard_quantity, standard_unit, notes } = addForm;
  
    if (!name.trim()) {
      alert("Please enter an ingredient name.");
      return;
    }
    if (!price || !quantity) {
      alert("Please enter both price and quantity.");
      return;
    }
  
    const parsedPrice = parseFloat(price);
    const parsedQty = parseFloat(quantity);
    const parsedStdQty = parseFloat(standard_quantity) || parsedQty;
  
    const payload = {
      ingredient: {
        name: name.trim(),
        brand: brand.trim(),
        price: parsedPrice,
        quantity: parsedQty, // <--- MUST BE SENT AS A FLOAT TO SATISFY RAILS VALIDATION
        unit: unit || 'g',
        standard_quantity: parsedStdQty,
        standard_unit: standard_unit || unit || 'g',
        last_purchase_price: parsedPrice,
        last_purchase_qty: parsedQty,
        last_purchase_unit: unit || 'g',
        notes: notes
      }
    };
  
    try {
      if (onAddIngredient) {
        await onAddIngredient(payload);
      }
      setIsAddModalOpen(false);
      setAddForm(INITIAL_ADD_FORM);
    } catch (error) {
      console.error("Error adding ingredient:", error);
      alert(`Failed to add new ingredient: ${error.message}`);
    }
  };

  const renderUnitOptions = () => (
    <>
      <optgroup label="Weight">
        {WEIGHT_UNITS.map(u => <option key={u} value={u}>{u}</option>)}
      </optgroup>
      <optgroup label="Volume">
        {VOLUME_UNITS.map(u => <option key={u} value={u}>{u}</option>)}
      </optgroup>
      <optgroup label="Count">
        {PIECE_UNIT.map(u => <option key={u} value={u}>{u}</option>)}
      </optgroup>
    </>
  );

  const renderTrend = (item) => {
    if (!item.history_price_1) return null;

    const current = parseFloat(item.price);
    const previous = parseFloat(item.history_price_1);

    if (current > previous) {
      return <span className="trend-up" title="Price Increased">▲</span>;
    } else if (current < previous) {
      return <span className="trend-down" title="Price Decreased">▼</span>;
    }
    return <span className="trend-stable">=</span>;
  };

  if (loading && ingredients.length === 0) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="market-prices-container">
      <div className="market-header-actions">
        <h2>Market Prices</h2>
        <button className="add-ingredient-btn" onClick={() => setIsAddModalOpen(true)}>
          + Add Ingredient
        </button>
      </div>

      <div className="table-wrapper">
        <table className="market-table">
          <thead>
            <tr>
              <th>Ingredient</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((ing) => (
              <tr key={ing.id} className="clickable-row">
                <td>
                  <div className="item-name highlight-blue clickable" onClick={() => setStatsItem(ing)}>
                    <span className="tooltip-container">
                      {ing.name}
                      <span className="tooltip-text">Ingredient ID: {ing.id}</span>
                    </span>
                  </div>
                  <div className="brand-tag">{ing.brand || ''}</div>
                </td>
                <td className="price-unit-cell">
                  <div className="price-amount highlight-blue" onClick={() => handlePriceClick(ing)}>
                    {renderTrend(ing)}
                    ₱{parseFloat(ing.price).toFixed(2)}
                    <span className="unit-label"> / {Number(ing.standard_quantity)} {ing.standard_unit}</span>
                  </div>
                  {ing.updated_at && (
                    <div className="last-update-label">last update: {getTimeAgo(ing.updated_at)}</div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- ADD INGREDIENT MODAL --- */}
      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="edit-modal">
            <h3>Add New Ingredient</h3>

            <div className="form-group">
              <label>Ingredient Name</label>
              <input
                type="text"
                placeholder="e.g. Mustard"
                value={addForm.name}
                onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Brand</label>
              <input
                type="text"
                placeholder="e.g. McCormick"
                value={addForm.brand}
                onChange={(e) => setAddForm({ ...addForm, brand: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Purchase Price</label>
              <div className="input-with-label">
                <span>₱</span>
                <input
                  type="number"
                  inputMode="decimal"
                  placeholder="0.00"
                  value={addForm.price}
                  onChange={(e) => setAddForm({ ...addForm, price: e.target.value })}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Qty Purchased</label>
                <input
                  type="number"
                  inputMode="decimal"
                  placeholder="0"
                  value={addForm.quantity}
                  onChange={(e) => setAddForm({ ...addForm, quantity: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Purchase Unit</label>
                <select
                  value={addForm.unit}
                  onChange={(e) => setAddForm({ ...addForm, unit: e.target.value })}
                >
                  {renderUnitOptions()}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Standard Qty (Costing)</label>
                <input
                  type="number"
                  inputMode="decimal"
                  placeholder="0"
                  value={addForm.standard_quantity}
                  onChange={(e) => setAddForm({ ...addForm, standard_quantity: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Standard Unit</label>
                <select
                  value={addForm.standard_unit}
                  onChange={(e) => setAddForm({ ...addForm, standard_unit: e.target.value })}
                >
                  {renderUnitOptions()}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Notes</label>
              <textarea
                value={addForm.notes}
                onChange={(e) => setAddForm({ ...addForm, notes: e.target.value })}
                placeholder="e.g. Purchased at SM Supermarket"
                className="form-textarea"
              />
            </div>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
              <button className="save-btn" onClick={handleSaveAdd}>Save Ingredient</button>
            </div>
          </div>
        </div>
      )}

      {/* --- EDIT MODAL --- */}
      {editingItem && (
        <div className="modal-overlay">
          <div className="edit-modal">
            <h3>Update {editingItem.name}</h3>
            <p className="modal-sub">Costing standard: 1 {editingItem.unit}</p>

            <div className="form-group">
              <label>Purchase Price</label>
              <div className="input-with-label"><span>₱</span>
                <input
                  type="number"
                  value={editForm.purchasePrice}
                  onChange={(e) => setEditForm({ ...editForm, purchasePrice: e.target.value })}
                  inputMode="decimal"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group"><label>Qty</label>
                <input
                  type="number"
                  value={editForm.purchaseQty}
                  onChange={(e) => setEditForm({ ...editForm, purchaseQty: e.target.value })}
                  inputMode="decimal"
                />
              </div>
              <div className="form-group"><label>Unit</label>
                <select value={editForm.purchaseUnit} onChange={(e) => setEditForm({ ...editForm, purchaseUnit: e.target.value })}>
                  {UNIT_MAP[getUnitCategory(editingItem.unit)]?.map(u => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Notes (Supplier, Quality, etc.)</label>
              <textarea
                value={editForm.notes}
                onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                placeholder="e.g. Bought from SM Supermarket"
                className="form-textarea"
              />
            </div>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setEditingItem(null)}>Cancel</button>
              <button className="save-btn" onClick={handleSaveEdit}>Update Rate</button>
            </div>
          </div>
        </div>
      )}

      {/* --- STATS MODAL --- */}
      {statsItem && (
        <div className="modal-overlay" onClick={() => setStatsItem(null)}>
          <div className="edit-modal stats-modal" onClick={e => e.stopPropagation()}>
            <h3>{statsItem.name} Trend</h3>

            <div className="price-graph-container">
              {[statsItem.history_price_3, statsItem.history_price_2, statsItem.history_price_1, statsItem.price].filter(p => p > 0).map((p, i) => {
                const max = Math.max(statsItem.price, statsItem.history_price_1 || 0);
                return (
                  <div key={i} className="graph-bar-wrapper">
                    <div className="graph-bar" style={{ height: `${(p / max) * 100}%` }}>
                      <span className="bar-tooltip">₱{p}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {statsItem.notes && (
              <div className="notes-display">
                <strong>Recent Note:</strong>
                <p>{statsItem.notes}</p>
              </div>
            )}

            <div className="modal-actions">
              <button className="cancel-btn" style={{ width: '100%' }} onClick={() => setStatsItem(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketPrices;
