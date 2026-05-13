import React, { useState } from 'react';
import './MarketPrices.css';
import { UNIT_MAP, getUnitCategory, getScalingFactor } from '../utils/productCalculations';

const getTimeAgo = (data) => {
  if (!data) return null;
  
  // Extract the date string regardless of format
  const dateString = typeof data === 'object' ? data.date : data;
  
  const now = new Date();
  const past = new Date(dateString);
  
  // Check if date is valid
  if (isNaN(past.getTime())) return "unknown";

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
  const [editForm, setEditForm] = useState({ price: '', qty: '', unit: '' });
  const [statsItem, setStatsItem] = useState(null);

  const formatQuantity = (num) => Number(num).toString();

  const handlePriceClick = (ing) => {
    setEditingItem(ing);
    setEditForm({
      price: ing.price,
      qty: ing.quantity,
      unit: ing.unit
    });
  };

  const handleSave = () => {
    const price = parseFloat(editForm.price);
    const qty = parseFloat(editForm.qty);
    const category = getUnitCategory(editingItem.unit);
    const scalingFactor = getScalingFactor(editForm.unit, editingItem.unit, category);
    const newPrice = (price / qty) * scalingFactor;

    const storageKey = `history_${editingItem.id}`;
    const now = new Date().toISOString();

    // New: Store both the date AND the price
    const updateRecord = { date: now, price: newPrice.toFixed(2) };

    const existingHistory = JSON.parse(localStorage.getItem(storageKey) || "[]");
    const updatedHistory = [updateRecord, ...existingHistory].slice(0, 3);

    localStorage.setItem(storageKey, JSON.stringify(updatedHistory));

    onUpdatePrice(editingItem.id, {
      ...editingItem,
      price: newPrice.toFixed(2),
      quantity: 1,
      unit: editingItem.unit
    });

    setEditingItem(null);
  };

  if (loading && ingredients.length === 0) {
    return <div className="p-8 text-center">Loading Ma'Donna Market Prices...</div>;
  }

  return (
    <div className="market-prices-container">
      <div className="market-header">
        <h2>Market Prices</h2>
        <p className="hint-text">Click a row to update market rates</p>
      </div>

      <div className="table-wrapper">
        <table className="market-table">
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Market Rate</th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((ing) => {
              const history = JSON.parse(localStorage.getItem(`history_${ing.id}`) || "[]");

              return (
                <tr key={ing.id} className="clickable-row">
                  <td className="item-details-cell">
                    <div
                      className="item-name highlight-blue clickable"
                      onClick={() => setStatsItem(ing)}
                    >
                      {ing.name}
                    </div>
                    <div className="brand-tag">{ing.brand || ''}</div>
                  </td>
                  <td className="price-unit-cell">
                    {/* Main Price */}
                    <div className="price-amount highlight-blue" onClick={() => handlePriceClick(ing)}>
                      ₱{parseFloat(ing.price).toFixed(2)}
                      <span className="unit-label"> per {formatQuantity(ing.quantity)} {ing.unit}</span>
                    </div>

                    {/* History Labels */}
                    <div className="history-container">
                      {history.map((date, i) => (
                        <div key={i} className="last-update-label">
                          last update: {getTimeAgo(date)}
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {editingItem && (
        <div className="modal-overlay">
          <div className="edit-modal">
            <h3>Update Price: {editingItem.name}</h3>
            <p className="modal-sub">Current Base: 1 {editingItem.unit}</p>

            <div className="form-group">
              <label>New Purchase Price</label>
              <div className="input-with-label">
                <span>₱</span>
                <input
                  type="number"
                  value={editForm.price}
                  onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Quantity</label>
                <input
                  type="number"
                  value={editForm.qty}
                  onChange={(e) => setEditForm({ ...editForm, qty: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Unit</label>
                <select
                  value={editForm.unit}
                  onChange={(e) => setEditForm({ ...editForm, unit: e.target.value })}
                >
                  {UNIT_MAP[getUnitCategory(editingItem.unit)].map(u => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setEditingItem(null)}>Cancel</button>
              <button className="save-btn" onClick={handleSave}>Update Rate</button>
            </div>
          </div>
        </div>
      )}

      {/* --- Statistics Modal --- */}
      {statsItem && (
        <div className="modal-overlay" onClick={() => setStatsItem(null)}>
          <div className="edit-modal stats-modal" onClick={e => e.stopPropagation()}>
            <h3>{statsItem.name} Trend</h3>

            {(() => {
              const history = JSON.parse(localStorage.getItem(`history_${statsItem.id}`) || "[]");
              // Reverse so the oldest is on the left
              const trendData = [...history].reverse();
              const maxPrice = Math.max(...trendData.map(d => parseFloat(d.price)), parseFloat(statsItem.price));

              return (
                <div className="stats-content">
                  {/* Simple Visual Graph */}
                  <div className="price-graph-container">
                    {trendData.map((record, i) => {
                      const heightPercentage = (parseFloat(record.price) / maxPrice) * 100;
                      return (
                        <div key={i} className="graph-bar-wrapper">
                          <div
                            className="graph-bar"
                            style={{ height: `${heightPercentage}%` }}
                          >
                            <span className="bar-tooltip">₱{record.price}</span>
                          </div>
                          <span className="bar-label">{getTimeAgo(record.date)}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="history-timeline">
                    <h4>Update Logs</h4>
                    <div className="timeline-list">
                      {history.map((record, i) => (
                        <div key={i} className="timeline-item">
                          <div className="timeline-marker"></div>
                          <div className="timeline-info">
                            <span className="time-ago">₱{record.price} — {getTimeAgo(record.date || record)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}

            <div className="modal-actions">
              <button className="cancel-btn" style={{ width: '100%' }} onClick={() => setStatsItem(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketPrices;
