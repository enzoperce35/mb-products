/**
 * This calculations are for the frontend only
 * Table calculations were done in the backend
 */

export const UNIT_MAP = {
  weight: ['mg', 'g', 'kg', 'oz', 'lb'],
  volume: ['ml', 'l', 'tsp', 'tbs', 'fl-oz', 'cup', 'gal'],
  count: ['each', 'pc', 'unit'],
  time: ['minute']
};

const UNIT_CONVERSION = {
  weight: { mg: 0.001, g: 1, kg: 1000, oz: 28.3495, lb: 453.592 },
  volume: { ml: 1, l: 1000, tsp: 4.92892, tbs: 14.7868, 'fl-oz': 29.5735, cup: 240, gal: 3785.41 },
  count: { each: 1, pc: 1, unit: 1 },
  time: { minute: 1 }
};

/**
 * Gets the cost per unit for an item
 */
export const getUnitCost = (item, type) => {
  if (!item) return 0;

  // RECIPES
  if (type === 'Recipe') {

    const category = getUnitCategory(item.base_yield_unit);

    const baseQty = convertToBase(
      item.base_yield_quantity || 1,
      item.base_yield_unit,
      category
    );

    return baseQty > 0
      ? Number(item.total_cost || item.cost_per_unit || 0) / baseQty
      : 0;
  }

  // INGREDIENTS
  const category = getUnitCategory(item.unit);

  const baseQty = convertToBase(
    item.quantity || 1,
    item.unit,
    category
  );

  return baseQty > 0
    ? Number(item.price || 0) / baseQty
    : 0;
};

/**
 * Converts a quantity to the base unit of the item
 */
export const convertToBase = (qty, unit, category) => {
  const q = Number(qty || 0);
  const u = unit?.toLowerCase();

  const map = UNIT_CONVERSION[category];

  if (!map || !map[u]) return q;

  return q * map[u];
};

/**
 * Computes stats (cost, profit, margin) for a variant based on pre-calculated component costs
 */
export const computeVariantStats = (variant) => {
  const components = variant.variant_components || [];
  const cost = components.reduce((sum, c) => sum + Number(c.component_cost || 0), 0);
  const price = Number(variant.price || 0);
  const profit = price - cost;
  const margin = price > 0 ? (profit / price) * 100 : 0;

  return { cost, profit, margin };
};

/**
 * Live calculation for the Modal builder
 */
export const calculateLiveCost = (components, recipes, ingredients) => {
  return components.reduce((sum, comp) => {
    const list = comp.type === 'Recipe' ? recipes : ingredients;
    const item = list.find(i => i.id === comp.component_id);
    if (!item) return sum;

    const unitCost = getUnitCost(item, comp.type);
    const adjustedQty = convertToBase(
      comp.qty,
      comp.unit,
      comp.category
    );

    return sum + (unitCost * adjustedQty);
  }, 0);
};

/**
 * Identifies the unit category
 */
export const getUnitCategory = (unit) => {
  const u = unit?.toLowerCase();
  if (UNIT_MAP.weight.includes(u)) return 'weight';
  if (UNIT_MAP.volume.includes(u)) return 'volume';
  if (UNIT_MAP.time.includes(u)) return 'time';
  return 'count';
};

export const getScalingFactor = (fromUnit, toUnit, category) => {
  const from = fromUnit?.toLowerCase();
  const to = toUnit?.toLowerCase();
  
  if (!from || !to || from === to) return 1;

  const map = UNIT_CONVERSION[category];
  if (!map || !map[from] || !map[to]) return 1;

  // Scaling Factor = Target Value / Source Value
  // Example: kg (1000) / g (1) = 1000
  return map[to] / map[from];
};
