import React, { useState, useEffect } from 'react';
import { 
  UNIT_MAP, 
  getUnitCost, 
  convertToBase, 
  computeVariantStats, 
  calculateLiveCost, 
  getUnitCategory 
} from '../utils/productCalculations';
import './ProductMaster.css';

let productCache = null;

const ProductMaster = () => {
  const greeting = "Mabuhay! Welcome back to ServeWise.";

  const [groupedProducts, setGroupedProducts] = useState(productCache || []);
  const [loading, setLoading] = useState(!productCache);
  const [editingVariant, setEditingVariant] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [selectedComponents, setSelectedComponents] = useState([]);

  /* =========================
     LIVE METRICS (Using Utils)
  ========================= */
  const liveCost = calculateLiveCost(selectedComponents, recipes, ingredients);
  const livePrice = Number(editingVariant?.price || 0);
  const liveProfit = livePrice - liveCost;
  const liveMargin = livePrice > 0 ? (liveProfit / livePrice) * 100 : 0;
  
  /* =========================
     FETCHING
  ========================= */
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [pRes, rRes, iRes] = await Promise.all([
          fetch("https://servewise-market-backend.onrender.com/api/v1/products/master_list?shop_id=1"),
          fetch("https://servewise-market-backend.onrender.com/api/v1/recipes"),
          fetch("https://servewise-market-backend.onrender.com/api/v1/ingredients")
        ]);

        // Check if the response was successful before parsing
        if (!pRes.ok) throw new Error("Backend failed to load Product Master");

        const pData = await pRes.json();
        const rData = await rRes.json();
        const iData = await iRes.json();

        // STRICT CHECK: Ensure pData is an array before calling .reduce()
        if (!Array.isArray(pData)) {
          console.error("Data received is not an array:", pData);
          setGroupedProducts([]);
          return;
        }

        const grouped = pData.reduce((acc, product) => {
          const key = product.name?.trim().toUpperCase() || "UNNAMED";
          const variants = product.variants || [];
          if (!acc[key]) {
            acc[key] = { displayName: key, variants: [...variants] };
          } else {
            acc[key].variants.push(...variants);
          }
          return acc;
        }, {});

        productCache = Object.values(grouped);
        setGroupedProducts(productCache);
        setRecipes(rData);
        setIngredients(iData);
        setLoading(false);
      } catch (error) {
        console.error("Global Data Sync Error:", error);
        setLoading(false);
        // Optional: show a user-friendly error message in the UI
      }
    };

    fetchAllData();
  }, []);

  const getUnitCategory = (unit) => {
    const u = unit?.toLowerCase();
    if (UNIT_MAP.weight.includes(u)) return 'weight';
    if (UNIT_MAP.volume.includes(u)) return 'volume';
    if (UNIT_MAP.time.includes(u)) return 'time';
    return 'count';
  };

  const addComponent = (type) => {
    const list = type === 'Recipe' ? recipes : ingredients;
    const item = list[0];
    if (!item) return;

    const unit = item.base_yield_unit || item.unit || 'each';
    setSelectedComponents(prev => [
      ...prev,
      {
        type,
        component_id: item.id,
        qty: 1,
        unit,
        category: getUnitCategory(unit)
      }
    ]);
  };

  const updateRow = (index, field, value) => {
    const updated = [...selectedComponents];
    if (field === 'component_id') {
      const list = updated[index].type === 'Recipe' ? recipes : ingredients;
      const item = list.find(i => i.id === parseInt(value));
      if (!item) return;

      const unit = item.base_yield_unit || item.unit;
      updated[index] = {
        ...updated[index],
        component_id: item.id,
        unit,
        category: getUnitCategory(unit)
      };
    } else {
      updated[index][field] = value;
    }
    setSelectedComponents(updated);
  };

  const handleSave = async () => {
    try {
      const variantId = editingVariant?.id;
  
      const res = await fetch(
        `https://servewise-market-backend.onrender.com/api/v1/product_variants/${variantId}/update_components`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ components: selectedComponents })
        }
      );
  
      if (res.ok) {
  
        // 🔥 preserve scroll position
        const currentScroll = window.scrollY;
  
        // 🔥 instantly close modal
        setEditingVariant(null);
        setSelectedComponents([]);
  
        // 🔥 prevent UI jump
        setTimeout(() => {
          window.scrollTo(0, currentScroll);
        }, 0);
  
        // 🔥 refresh ONLY product list silently
        fetch(
          "https://servewise-market-backend.onrender.com/api/v1/products/master_list?shop_id=1"
        )
          .then(r => r.json())
          .then(pData => {
  
            if (!Array.isArray(pData)) return;
  
            const grouped = pData.reduce((acc, product) => {
              const key = product.name?.trim().toUpperCase() || "UNNAMED";
              const variants = product.variants || [];
  
              if (!acc[key]) {
                acc[key] = {
                  displayName: key,
                  variants: [...variants]
                };
              } else {
                acc[key].variants.push(...variants);
              }
  
              return acc;
            }, {});
  
            productCache = Object.values(grouped);
  
            // 🔥 soft UI refresh
            setGroupedProducts([...productCache]);
          });
      }
  
    } catch (err) {
      console.error(err);
      alert("Error saving components");
    }
  };

  if (loading) return <div className="loader">Loading Ma'Donna Delicacies...</div>;

  return (
    <div className="product-master-container">
      <div className="table-responsive">
        <table className="master-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Cost</th>
              <th>Profit</th>
              <th>Margin</th>
            </tr>
          </thead>
          <tbody>
            {groupedProducts.map((group, idx) => (
              <React.Fragment key={idx}>
                <tr className="group-header">
                  <td colSpan="5">{group.displayName}</td>
                </tr>
                {group.variants.map(v => {
                  const { cost, profit, margin } = computeVariantStats(v);
                  return (
                    <tr key={v.id} className="variant-row">
                      <td
                        className="variant-name clickable"
                        onClick={() => {
                          setEditingVariant(v);
                          const comps = v.variant_components || [];
                          setSelectedComponents(
                            comps.map(vc => ({
                              type: vc.component_type,
                              component_id: vc.component_id,
                              qty: Number(vc.quantity),
                              unit: vc.unit,
                              category: getUnitCategory(vc.unit),
                            }))
                          );
                        }}
                      >
                        {v.name}
                      </td>
                      <td>₱{Number(v.price).toFixed(2)}</td>
                      <td>₱{cost.toFixed(2)}</td>
                      <td style={{ color: profit < 0 ? '#ff4d4d' : 'inherit' }}>
                        ₱{profit.toFixed(2)}
                      </td>
                      <td style={{ color: margin < 0 ? '#ff4d4d' : 'inherit' }}>
                        {margin.toFixed(2)}%
                      </td>
                    </tr>
                  );
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {editingVariant && (
        <div className="modal-overlay">
          <div className="edit-modal multi-builder">
            <h3>Build {editingVariant.name}</h3>

            <div className="cost-breakdown">
              <h4>Live Cost Breakdown</h4>
              {selectedComponents.map((comp, idx) => {
                const list = comp.type === 'Recipe' ? recipes : ingredients;
                const item = list.find(i => i.id === comp.component_id);
                if (!item) return null;

                const unitCost = getUnitCost(item, comp.type);

                const adjustedQty = convertToBase(
                  comp.qty,
                  comp.unit,
                  item,
                  comp.category
                );

                const lineCost = unitCost * adjustedQty;

                return (
                  <div key={idx} className="cost-line">
                    <div>{item.name} ({comp.qty} {comp.unit})</div>
                    <div>₱{lineCost.toFixed(2)}</div>
                  </div>
                );
              })}

              <div className="cost-total">
                <span>Total Cost</span>
                <span>₱{liveCost.toFixed(2)}</span>
              </div>
              <div className="cost-profit" style={{ color: liveProfit < 0 ? '#ff4d4d' : '#2ecc71' }}>
                <span>Estimated Profit</span>
                <span>₱{liveProfit.toFixed(2)}</span>
              </div>
              <div className="cost-margin">
                <span>Margin</span>
                <span>{liveMargin.toFixed(2)}%</span>
              </div>
            </div>

            <div className="component-stack">
              {selectedComponents.map((comp, idx) => (
                <div key={idx} className="builder-row">
                  <span className={`type-tag ${comp.type.toLowerCase()}`}>
                    {comp.type[0]}
                  </span>
                  <select
                    value={comp.component_id}
                    onChange={(e) => updateRow(idx, 'component_id', e.target.value)}
                  >
                    {(comp.type === 'Recipe' ? recipes : ingredients).map(i => (
                      <option key={i.id} value={i.id}>{i.name}</option>
                    ))}
                  </select>
                  <input
                    type="number"
                    value={comp.qty}
                    onChange={(e) => updateRow(idx, 'qty', e.target.value)}
                  />
                  <select
                    value={comp.unit}
                    disabled={comp.category === 'time'}
                    onChange={(e) => updateRow(idx, 'unit', e.target.value)}
                  >
                    {UNIT_MAP[comp.category].map(u => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                  <button onClick={() =>
                    setSelectedComponents(prev => prev.filter((_, i) => i !== idx))
                  }>×</button>
                </div>
              ))}
            </div>

            <div className="builder-actions">
              <button onClick={() => addComponent('Recipe')}>+ Recipe</button>
              <button onClick={() => addComponent('Ingredient')}>+ Ingredient</button>
            </div>

            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setEditingVariant(null)}>Cancel</button>
              <button className="save-btn" onClick={handleSave}>Save Build</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductMaster;
