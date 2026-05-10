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
  count: { each: 1, pc: 1, unit: 1 }
};

/**
 * Gets the cost per unit for an item
 */
export const getUnitCost = (item, type) => {
  if (!item) return 0;
  if (type === 'Recipe') return Number(item.cost_per_unit || 0);
  if (item.price_per_base_unit !== undefined) return Number(item.price_per_base_unit || 0);

  const price = Number(item.price || 0);
  const qty = Number(item.quantity || 0);
  return qty <= 0 ? price : price / qty;
};

/**
 * Converts a quantity to the base unit of the item
 */
export const convertToBase = (qty, fromUnit, item, category) => {
  const baseUnit = (item.base_yield_unit || item.unit || '').toLowerCase();
  const from = (fromUnit || '').toLowerCase();

  if (!baseUnit || baseUnit === from) return Number(qty || 0);

  const map = UNIT_CONVERSION[category];
  if (!map || !map[from] || !map[baseUnit]) return Number(qty || 0);

  const inBase = Number(qty || 0) * map[from];
  return inBase / map[baseUnit];
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
    const adjustedQty = convertToBase(comp.qty, comp.unit, item, comp.category);

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
