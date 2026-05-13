import React, { useState } from 'react';
import './MarketPrices.css';
import { UNIT_MAP, getUnitCategory, getScalingFactor } from '../utils/productCalculations';

// Updated helper to handle DB timestamps
const getTimeAgo = (dateString) => {
  if (!dateString) return null;
  const now = new Date();
  const past = new Date(dateString);
  const diffInMs = now - past;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays < 1) return "today";
  if (diffInDays < 30) return `${diffInDays} days`;

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''}`;

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} year${diffInYears > 1 ? 's' : ''}`;
};

const MarketPrices = ({ ingredients, loading, onUpdatePrice }) => {
  const [editingItem, setEditingItem] = useState(null);
  const [statsItem, setStatsItem] = useState(null);

  const [editForm, setEditForm] = useState({
    purchasePrice: '',
    purchaseQty: '',
    purchaseUnit: '',
    notes: ''
  });

  const handlePriceClick = (ingredient) => {
    setEditingItem(ingredient);
    setEditForm({
      purchasePrice: '',
      purchaseQty: '',
      purchaseUnit: ingredient.unit, // Default to the base unit
      notes: ingredient.notes || ''
    });
  };

  const handleSave = async () => {
    const { purchasePrice, purchaseQty, purchaseUnit, notes } = editForm;

  if (!purchasePrice || !purchaseQty) {
    alert("Please enter both price and quantity");
    return;
  }

  // Use standard_unit here so the math aligns with your DB sync
  const category = getUnitCategory(editingItem.standard_unit);
  const factor = getScalingFactor(purchaseUnit, editingItem.standard_unit, category);
  
  // This calculates price for ONE standard unit (e.g. 1 gram)
  const standardizedPrice = (parseFloat(purchasePrice) / (parseFloat(purchaseQty) / factor));

  const payload = {
    ingredient: {
      price: standardizedPrice.toFixed(2), 
      last_purchase_price: parseFloat(purchasePrice),
      last_purchase_qty: parseFloat(purchaseQty),
      last_purchase_unit: purchaseUnit,
      notes: notes
    }
  };

    try {
      // Use the prop passed from parent
      await onUpdatePrice(editingItem.id, payload);
      setEditingItem(null); // Close modal on success
    } catch (error) {
      alert("Failed to update price.");
    }
  };

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
                    {ing.name}
                  </div>
                  <div className="brand-tag">{ing.brand || ''}</div>
                </td>
                <td className="price-unit-cell">
                  <div className="price-amount highlight-blue" onClick={() => handlePriceClick(ing)}>
                    {renderTrend(ing)}
                    ₱{parseFloat(ing.price).toFixed(2)}
                    <span className="unit-label"> / {Number(ing.standard_quantity)} {ing.standard_unit}</span>
                  </div>
                  {ing.history_date_1 && (
                    <div className="last-update-label">last update: {getTimeAgo(ing.history_date_1)}</div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
                  {UNIT_MAP[getUnitCategory(editingItem.unit)].map(u => <option key={u} value={u}>{u}</option>)}
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
              <button className="save-btn" onClick={handleSave}>Update Rate</button>
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
