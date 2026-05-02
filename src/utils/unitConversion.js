// src/utils/unitConversion.js

const conversionTable = {
  // Mass
  mg: { to: "g", factor: 0.001 },
  g: { to: "g", factor: 1 },
  kg: { to: "g", factor: 1000 },
  oz: { to: "g", factor: 28.3495 },
  lb: { to: "g", factor: 453.592 },

  // Volume
  ml: { to: "ml", factor: 1 },
  l: { to: "ml", factor: 1000 },
  tsp: { to: "ml", factor: 4.92892 },
  tbs: { to: "ml", factor: 14.7868 },
  "fl-oz": { to: "ml", factor: 29.5735 },
  cup: { to: "ml", factor: 240 },
  gal: { to: "ml", factor: 3785.41 },

  // Time
  second: { to: "second", factor: 1 },
  minute: { to: "second", factor: 60 },
  hour: { to: "second", factor: 3600 },

  // Countable
  each: { to: "each", factor: 1 },
  pcs: { to: "each", factor: 1 },
  piece: { to: "each", factor: 1 },

  // PERSONALLY MEASURED UNITS
  "bulb": { to: "g", factor: 60 }, // Based on your ^ measurement
  "clove": { to: "g", factor: 6 },
  "bundle": { to: "g", factor: 250 }, // e.g., for Sitaw or Kangkong
  "each": { to: "each", factor: 1 },
};

// Converts to a base unit (g, ml, second, each)
export function convertToBaseUnit(quantity, unit) {
  if (!unit) return { quantity, unit };
  const unitKey = unit.toLowerCase();
  const entry = conversionTable[unitKey];
  if (!entry) return { quantity, unit };
  return {
    quantity: quantity * entry.factor,
    unit: entry.to,
  };
}

// Only convert seconds to minutes (not to hours)
const displayConversions = {
  cup: { tbs: 16 },
  tbs: { tsp: 3 },
  l: { ml: 1000 },
  kg: { g: 1000 },
  second: { minute: 1 / 60 }, // ✅ only time conversion allowed
};

// Converts to a more human-friendly unit for display
export function convertToSmallerUnit(quantity, unit) {
  if (!unit) return { quantity, unit };

  let currentQuantity = quantity;
  let currentUnit = unit.toLowerCase();

  while (displayConversions[currentUnit]) {
    const [nextUnit, factor] = Object.entries(displayConversions[currentUnit])[0];
    const convertedQuantity = currentQuantity * factor;

    if (convertedQuantity < 0.01) break;

    currentQuantity = convertedQuantity;
    currentUnit = nextUnit;
  }

  currentQuantity = parseFloat(currentQuantity.toFixed(2));
  if (currentQuantity % 1 === 0) currentQuantity = parseInt(currentQuantity);

  return {
    quantity: currentQuantity,
    unit: currentUnit,
  };
}
