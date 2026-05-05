import React, { useState, useEffect } from 'react';
import './ProductMaster.css';

const ProductMaster = () => {
  const [groupedProducts, setGroupedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // shop_id=1 for Ma'Donna Delicacies
    const API_URL = "https://servewise-market-backend.onrender.com/api/v1/products/master_list?shop_id=1";

    fetch(API_URL)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Server Error: ${res.status}. Check skip_before_action.`);
        }
        return res.json();
      })
      .then(data => {
        // Group by Name: Consolidates products like "Puto" into one entry
        const consolidated = data.reduce((acc, product) => {
          const nameKey = product.name.trim().toUpperCase();
          
          // Use 'variants' to match your Product model
          const currentVariants = product.variants || [];

          if (!acc[nameKey]) {
            acc[nameKey] = { 
              displayName: nameKey,
              variants: [...currentVariants] 
            };
          } else {
            // Append variants from duplicate product entries to the bottom
            acc[nameKey].variants = [...acc[nameKey].variants, ...currentVariants];
          }
          return acc;
        }, {});

        setGroupedProducts(Object.values(consolidated));
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
                    <td className="change-cell">0</td>
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
