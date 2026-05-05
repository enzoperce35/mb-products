import React, { useState, useEffect } from 'react';
import './ProductMaster.css';

// 1. MODULE-LEVEL CACHE: This stays in memory even when the component unmounts.
let productCache = null;

const ProductMaster = () => {
  const [groupedProducts, setGroupedProducts] = useState(productCache || []);
  const [loading, setLoading] = useState(!productCache); // No loading if cache exists
  const [error, setError] = useState(null);

  useEffect(() => {
    // 2. CACHE CHECK: If we already have data, don't fetch again.
    if (productCache) {
      setLoading(false);
      return;
    }

    const API_URL = "https://servewise-market-backend.onrender.com/api/v1/products/master_list?shop_id=1";

    fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error(`Server Error: ${res.status}`);
        return res.json();
      })
      .then(data => {
        const consolidated = data.reduce((acc, product) => {
          const nameKey = product.name.trim().toUpperCase();
          const currentVariants = product.variants || []; //

          if (!acc[nameKey]) {
            acc[nameKey] = { 
              displayName: nameKey,
              variants: [...currentVariants] 
            };
          } else {
            acc[nameKey].variants = [...acc[nameKey].variants, ...currentVariants];
          }
          return acc;
        }, {});

        const result = Object.values(consolidated);
        
        // 3. SAVE TO CACHE: Update the variable outside the component
        productCache = result; 
        
        setGroupedProducts(result);
        setLoading(false);
      })
      .catch(err => {
        console.error("Master List Error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loader">Loading Master Records...</div>;
  if (error) return <div className="error-state"><h3>Failed to load Master List</h3><p>{error}</p></div>;

  return (
    <div className="product-master-container">
      <div className="master-header">
        <h1>Product Master</h1>
      </div>

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
            {groupedProducts.map((group, index) => (
              <React.Fragment key={index}>
                <tr className="group-header">
                  <td colSpan="5">{group.displayName}</td>
                </tr>
                {group.variants.map((variant) => (
                  <tr key={variant.id} className="variant-row">
                    <td className="variant-name">{variant.name}</td>
                    <td>₱{Number(variant.price).toFixed(2)}</td>
                    <td>₱0.00</td>
                    <td className="profit-cell">₱0.00</td>
                    <td className="change-cell">0%</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductMaster;
