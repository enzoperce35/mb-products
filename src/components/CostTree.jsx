import React from "react";

const CostNode = ({ node, level = 0 }) => {
  return (
    <div style={{ marginLeft: level * 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>
          {node.name} {node.quantity && `(${node.quantity} ${node.unit})`}
        </span>

        <strong>
          ₱{Number(node.cost || node.total_cost || 0).toFixed(2)}
        </strong>
      </div>

      {node.children && node.children.map((child, idx) => (
        <CostNode key={idx} node={child} level={level + 1} />
      ))}
    </div>
  );
};

const CostTree = ({ tree }) => {
  if (!tree) return null;

  return (
    <div className="cost-tree">
      <h3>Cost Breakdown</h3>
      <CostNode node={tree} />
    </div>
  );
};

export default CostTree;
