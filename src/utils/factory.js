// The Conversion Table from your old app
const conversionTable = {
  mg: { to: "g", factor: 0.001 },
  g: { to: "g", factor: 1 },
  kg: { to: "g", factor: 1000 },
  oz: { to: "g", factor: 28.3495 },
  lb: { to: "g", factor: 453.592 },
  ml: { to: "ml", factor: 1 },
  l: { to: "ml", factor: 1000 },
  tsp: { to: "ml", factor: 4.92892 },
  tbs: { to: "ml", factor: 14.7868 },
  cup: { to: "ml", factor: 240 },
  bulb: { to: "g", factor: 60 },  // Your personal measurement
  clove: { to: "g", factor: 6 },  // Your personal measurement
  each: { to: "each", factor: 1 },
  pcs: { to: "each", factor: 1 },
  minute: { to: "second", factor: 60 },
};

export const convertToBaseUnit = (quantity, unit) => {
  if (!unit) return { quantity, unit };
  const unitKey = unit.toLowerCase();
  const entry = conversionTable[unitKey];
  if (!entry) return { quantity, unit };
  return {
    quantity: quantity * entry.factor,
    unit: entry.to,
  };
};

// Ingredient cost computation with Yield factor integration
export const getIngredientCost = (ingId, usedQty, usedUnit, masterIngredients) => {
  const item = masterIngredients.find(i => i.id === ingId);
  if (!item) return 0;

  const { quantity: baseUsedQty, unit: baseUsedUnit } = convertToBaseUnit(usedQty, usedUnit);
  const { quantity: baseItemQty, unit: baseItemUnit } = convertToBaseUnit(item.quantity, item.unit);

  if (baseUsedUnit !== baseItemUnit) return 0;
  if (baseItemQty === 0) return 0;

  // We add your Yield logic here: Price / (Quantity * Yield)
  const costPerBaseUnit = item.price / (baseItemQty * (item.yield || 1));
  return costPerBaseUnit * baseUsedQty;
};

// Recursive Recipe Cost (A recipe can contain another recipe)
export const getRecipeTotalCost = (recipeId, allRecipes, masterIngredients) => {
  const recipe = allRecipes.find(r => r.id === recipeId);
  if (!recipe) return 0;

  return recipe.ingredients.reduce((total, ing) => {
    if (ing.isRecipe) {
      // Recursively call for sub-recipes (like 'palaboksauce' inside 'bilao')
      return total + getRecipeTotalCost(ing.id, allRecipes, masterIngredients) * ing.quantity;
    } else {
      return total + getIngredientCost(ing.id, ing.quantity, ing.unit, masterIngredients);
    }
  }, 0);
};
