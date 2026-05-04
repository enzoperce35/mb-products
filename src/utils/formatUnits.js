// Clean number formatting with Fraction support
export const formatQuantity = (value) => {
    const num = Number(value);
  
    if (isNaN(num)) return value;
  
    // 1. Handle specific fractions
    const decimal = num % 1;
    const integer = Math.floor(num);
    
    const fractionMap = {
      0.25: "¼",
      0.5: "½",
      0.75: "¾"
    };
  
    if (fractionMap[decimal]) {
      // If integer is 0, just return the fraction (e.g., ½)
      // If integer > 0, return mixed number (e.g., 1 ½)
      return integer === 0 
        ? fractionMap[decimal] 
        : `${integer} ${fractionMap[decimal]}`;
    }
  
    // 2. Remove trailing decimals for whole numbers (50.00 → 50)
    if (decimal === 0) return num.toString();
  
    // 3. Fallback: Keep max 2 decimals but clean trailing zeros
    return parseFloat(num.toFixed(2)).toString();
  };
  
  // Normalize + pluralize units
  export const formatUnit = (unit, quantity) => {
    if (!unit) return "";
  
    const u = unit.toLowerCase().trim();
  
    const unitMap = {
      g: "g",
      kg: "kg",
      ml: "ml",
      l: "l",
      tsp: "tsp",
      tbs: "tbsp",
      "tbs.": "tbsp",
      tbsp: "tbsp",
      cup: quantity > 1 ? "cups" : "cup",
      each: quantity > 1 ? "pcs" : "pc",
      pc: quantity > 1 ? "pcs" : "pc",
      pcs: "pcs",
      minute: quantity > 1 ? "mins" : "min",
    };
  
    return unitMap[u] || unit;
  };
  
  // Combine both
  export const formatQtyUnit = (qty, unit) => {
    const numQty = Number(qty);
    const formattedQty = formatQuantity(qty);
    const formattedUnit = formatUnit(unit, numQty);
  
    return `${formattedQty} ${formattedUnit}`;
  };