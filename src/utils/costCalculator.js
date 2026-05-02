// Ingredient cost computation with unit conversion
export const getIngredientCost = (ingId, usedQty, usedUnit, useUpdated = false) => {
  let item = ingredients.find(i => i.id === ingId);
  if (!item) return 0;

  item = getUpdatedItem(item, useUpdated);

  const { quantity: baseUsedQty, unit: baseUsedUnit } = convertToBaseUnit(usedQty, usedUnit);
  const { quantity: baseItemQty, unit: baseItemUnit } = convertToBaseUnit(item.quantity, item.unit);

  if (baseUsedUnit !== baseItemUnit) {
    console.warn(`Unit mismatch for ingredient ${item.name}: used (${baseUsedUnit}) vs item (${baseItemUnit})`);
    return 0;
  }

  if (baseItemQty === 0) return 0;

  const costPerBaseUnit = item.price / baseItemQty;
  return costPerBaseUnit * baseUsedQty;
};

// Recipe cost computation
export const getRecipeCost = (recipeId, usedQty, usedUnit, useUpdated = false) => {
  const recipe = recipes.find(r => r.id === recipeId);
  if (!recipe) return 0;

  const totalCostForRecipeQty = recipe.ingredients.reduce((total, ing) => {
    if (ing.recipe) {
      return total + getRecipeCost(ing.ingId, ing.quantity, ing.unit, useUpdated);
    } else {
      return total + getIngredientCost(ing.ingId, ing.quantity, ing.unit, useUpdated);
    }
  }, 0);

  const { quantity: baseRecipeQty, unit: baseRecipeUnit } = convertToBaseUnit(recipe.quantity, recipe.unit);
  const { quantity: baseUsedQty, unit: baseUsedUnit } = convertToBaseUnit(usedQty, usedUnit);

  if (baseRecipeQty === 0) return 0;

  if (baseRecipeUnit !== baseUsedUnit) {
    console.warn(`Unit mismatch for recipe ${recipe.name}: recipe (${baseRecipeUnit}) vs used (${baseUsedUnit})`);
    return 0;
  }

  const costPerBaseUnit = totalCostForRecipeQty / baseRecipeQty;
  return costPerBaseUnit * baseUsedQty;
};

function getUpdatedItem(item, useUpdated) {
  if (!useUpdated) return item;

  const stored = localStorage.getItem("ingredient_changes_" + item.id);
  if (!stored) return item;

  try {
    const updates = JSON.parse(stored);
    if (Array.isArray(updates) && updates.length > 0) {
      const last = updates[updates.length - 1];
      return {
        ...item,
        price: last.price !== undefined ? last.price : item.price,
        quantity: last.quantity !== undefined ? last.quantity : item.quantity,
        unit: last.unit !== undefined ? last.unit : item.unit,
      };
    }
  } catch (err) {
    console.warn(`Failed to parse update for ${item.id}`, err);
  }

  return item;
}