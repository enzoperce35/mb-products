export const recipes = [

// HIDDEN RECIPES  
  { name: "Orange juice", type: 'e', id: "orangejuice", quantity: 1, unit: "l", ingredients: [
    { name: 'orange powder', ingId: "powderedorangejuice", recipe: false, quantity: 19, unit: "g" }
  ] },
  { name: "Iced tea", type: 'e', id: "icedtea", quantity: 1, unit: "l", ingredients: [
    { name: 'iced tea', ingId: "powderedicedtea", recipe: false, quantity: 20, unit: "g" }
  ] },
  { name: "Palamig", type: 'e', id: "palamig", quantity: 1, unit: "l", ingredients: [
    { name: 'palamig powder', ingId: "powderedpalamig", recipe: false, quantity: 60, unit: "g" }
  ] },


// RECIPES WITH CARD
  { name: "BBQ sauce", type: 'f', id: "bbqsauce", quantity: 40, unit: "Tbs", prepTime: '8 mins',
    ingredients: [
      { name: 'tubig', ingId: "water", recipe: false, quantity: 1, unit: "cup" },
      { name: 'liquid seasoning', ingId: "liquidseasoning", recipe: false, quantity: 0.25, unit: "cup" },
      { name: 'ketchup', ingId: "bananaketchup", recipe: false, quantity: 80, unit: "g", alterQuantity: 0.25, alterUnit: 'cup' },
      { name: 'toyo', ingId: "toyo", recipe: false, quantity: 0.125, unit: "cup" },
      { name: 'garlic powder', ingId: "garlicpowder", recipe: false, quantity: 2.5, unit: "g", alterQuantity: 0.5, alterUnit: 'tsp' },
      { name: 'brown Sugar', ingId: "sugarbrown", recipe: false, quantity: 110, unit: "g", alterQuantity: 0.5, alterUnit: 'cup' },
      { name: 'worcestershire sauce', ingId: "worcestershiresauce", recipe: false, quantity: 0.125, unit: "cup" },
      { name: 'cornstarch', ingId: "cornstarch", recipe: false, quantity: 120, unit: "g", alterQuantity: 1, alterUnit: 'cup' },
      { name: 'paminta', ingId: "groundblackpepper", recipe: false, quantity: 3, unit: "g" },
      { name: 'LPG', ingId: "lpg11kgs", recipe: false, quantity: 8, unit: "minute", hide: true },
    ],
    instructions: {
      steps: [
        "Paghalu-haluin ang tubig, liquid seasoning, ketchup, toyo, garlic powder, brown sugar, worcestershire sauce at paminta.",
        "Pakuluan",
        "Tunawin ang cornstach sa tubig at ihalo ng paunti-unti hanggang sa makuha ang tamang lapot."
      ],
    },
  },
  { name: "Buffalo sauce", type: 'f', id: "buffalosauce", quantity: 36, unit: "Tbs", prepTime: '8 mins',
    ingredients: [
      { name: 'butter', ingId: "butter", recipe: false, quantity: 50, unit: "g", alterQuantity: 0.25, alterUnit: 'each' },
      { name: 'hot sauce', ingId: "hotsauce", recipe: false, quantity: 100, unit: "g", alterQuantity: 1, alterUnit: 'bottle' },
      { name: 'chili powder', ingId: "chilipowder", recipe: false, quantity: 3, unit: "g", alterQuantity: 1, alterUnit: 'tsp' },
      { name: 'paprika', ingId: "paprika", recipe: false, quantity: 1.5, unit: "g", alterQuantity: 0.5, alterUnit: 'tsp' },
      { name: 'chili flakes', ingId: "chiliflakes", recipe: false, quantity: 3.5, unit: "g", alterQuantity: 0.5, alterUnit: 'Tbs'},
      { name: 'garlic powder', ingId: "garlicpowder", recipe: false, quantity: 2.5, unit: "g", alterQuantity: 0.5, alterUnit: 'tsp' },
      { name: 'brown sugar', ingId: "sugarbrown", recipe: false, quantity: 12, unit: "g", alterQuantity: 1, alterUnit: 'Tbs' },
      { name: 'suka', ingId: "vinegar", recipe: false, quantity: 7.4, unit: "ml", alterQuantity: 0.5, alterUnit: 'Tbs' },
      { name: 'banana ketchup', ingId: "bananaketchup", recipe: false, quantity: 120, unit: "g", alterQuantity: 0.5, alterUnit: 'cup' },
      { name: 'LPG', ingId: "lpg11kgs", recipe: false, quantity: 8, unit: "minute", hide: true },
    ],
    instructions: {
      steps: [
        "Paghalu-haluin ang butter, hot sauce, chili powder, paprika, chili flakes, garlic powder, brown sugar at ketchup.",
        "Pakuluan",
        "Huling ilagay ang suka at mag-intay ng ilang minuto bago haluin."
      ],
    },
  },
  { name: "Orange sauce", type: 'f', id: "orangesauce", quantity: 2, unit: "cup", prepTime: '8 mins',
    ingredients: [
      { name: 'butter', ingId: "butter", recipe: false, quantity: 50, unit: "g", alterQuantity: 0.25, alterUnit: 'each' },
      { name: 'bawang', ingId: "bawang", recipe: false, quantity: 60, unit: "g", alterQuantity: 1, alterUnit: 'bulb' },
      { name: 'sweet chili sauce', ingId: "sweetchilisauce", recipe: false, quantity: 5.8, unit: "oz", alterQuantity: '1/2', alterUnit: 'bottle' },
      { name: 'orange powder', ingId: "powderedorangejuice", recipe: false, quantity: 10, unit: "g", alterQuantity: '1/2', alterUnit: 'pack' },
      { name: 'paminta', ingId: "groundblackpepper", recipe: false, quantity: 1, unit: "g" },
      { name: 'vetsin', ingId: "vetsin", recipe: false, quantity: 1, unit: "g" },
      { name: 'hot sauce', ingId: "hotsauce", recipe: false, quantity: 34, unit: "g", alterQuantity: 2, alterUnit: 'Tbs' },
      { name: 'LPG', ingId: "lpg11kgs", recipe: false, quantity: 8, unit: "minute", hide: true },
    ],
    instructions: {
      steps: [
        "Timplahin ang orange powder sa isang basong tubig.",
        "Paghalu-haluin ang butter, bawang, sweet chili sauce, hot sauce at pakuluan.",
        "Ihalo ang tinimplang orange powder tapos ilagay ang paminta at vetsin."
      ],
    },
  },
  { name: "Honesoy garlic sauce", type: 'f', id: "honesoygarlicsauce", quantity: 40, unit: "Tbs", prepTime: '10 mins',
    ingredients: [
      { name: 'butter', ingId: "butter", recipe: false, quantity: 50, unit: "g", alterQuantity: 0.25, alterUnit: 'each' },
      { name: 'bawang', ingId: "bawang", recipe: false, quantity: 60, unit: "g", alterQuantity: 1, alterUnit: 'bulb' },
      { name: 'honey', ingId: "honey", recipe: false, quantity: 320, unit: "g", alterQuantity: '320g', alterUnit: 'bottle' },
      { name: 'toyo', ingId: "toyo", recipe: false, quantity: 0.5, unit: "cup" },
      { name: 'white sugar', ingId: "sugarwhite", recipe: false, quantity: 50, unit: "g", alterQuantity: 0.25, alterUnit: 'cup'},
      { name: 'vetsin', ingId: "vetsin", recipe: false, quantity: 1, unit: "g" },
      { name: 'paminta', ingId: "groundblackpepper", recipe: false, quantity: 1, unit: "g" },
      { name: 'cornstarch', ingId: "cornstarch", recipe: false, quantity: 30, unit: "g", alterQuantity: 0.25, alterUnit: "cup" },
      { name: 'LPG', ingId: "lpg11kgs", recipe: false, quantity: 8, unit: "minute", hide: true },
    ],
    instructions: {
      steps: [
        "Paghalu-haluin ang butter, bawang, honey, toyo at asukal.",
        "Pakuluan",
        "Huling ilagay ang paminta at sunod ang vetsin.",
        "Tunawin ang cornstach sa tubig at ihalo ng paunti-unti hanggang sa makuha ang tamang lapot."
      ],
    },
  },
  
  { name: "Garlic mayo", type: 'f', id: "garlicmayo", quantity: .50, unit: "cup", prepTime: '10 mins',
    ingredients: [
      { name: 'mayo', ingId: "mayonnaise", recipe: false, quantity: .50, unit: "cup" },
      { name: 'bawang', ingId: "bawang", recipe: false, quantity: 12, unit: "g", alterQuantity: 2, alterUnit: 'cloves' },
      { name: 'evap', ingId: "evap", recipe: false, quantity: 1, unit: "Tbs" },
      { name: 'kalamansi', ingId: "kalamansi", recipe: false, quantity: 12, unit: "g", alterQuantity: 2, alterUnit: 'pc' },
      { name: 'asin', ingId: "saltrock", recipe: false, quantity: 2, unit: "g" },
      { name: 'paminta', ingId: "groundblackpepper", recipe: false, quantity: 2, unit: "g" },
      { name: 'garlic powder', ingId: "garlicpowder", recipe: false, quantity: 3, unit: "g", alterQuantity: '1/2', alterUnit: 'tsp' },
      { name: 'white sugar', ingId: "sugarwhite", recipe: false, quantity: 4.2, unit: 'g', alterQuantity: 1, alterUnit: "tsp" },
    ]
  },
  
  { name: "Empanada dough", type: 'f', id: "empanadadough", quantity: 36, unit: "each", prepTime: '30 mins',
    ingredients: [
      { name: 'tubig', ingId: "water", recipe: false, quantity: 5, unit: "Tbs" },
      { name: 'harina', ingId: "harina", recipe: false, quantity: 480, unit: "g", alterQuantity: 4, alterUnit: 'cup' },
      { name: 'baking powder', ingId: "bakingpowder", recipe: false, quantity: 4.8, unit: "g", alterQuantity: 1, alterUnit: 'tsp' },
      { name: 'iodized salt', ingId: "saltiodized", recipe: false, quantity: 11.5, unit: "g", alterQuantity: 0.50, alterUnit: 'Tbs' },
      { name: 'butter', ingId: "butter", recipe: false, quantity: 56, unit: "g", alterQuantity: 4, alterUnit: 'Tbs' },
      { name: 'evap', ingId: "evap", recipe: false, quantity: 1, unit: "cup" },
      { name: 'medium egg', ingId: "eggmedium", recipe: false, quantity: 1, unit: "each" },
    ],
    instructions: {
      steps: [
        "Palamigin muna ng mabuti ang tubig at evap.",
        "Paghalu-haluin lahat ng ingredients.",
        "Masahin ng mabuti, magdagdag ng harina kung kailangan hanggang hindi na moisted.",
        "Ilagay sa ref ng at least 2 oras.",
      ],
    },
  },
  { name: "Empanada filling", type: 'f', id: "empanadafilling", quantity: 73, unit: "each", prepTime: '30 mins',
    ingredients: [
      { name: 'ground pork', ingId: "groundpork", recipe: false, quantity: 1, unit: "kg" },
      { name: 'sibuyas', ingId: "sibuyas", recipe: false, quantity: 60, unit: "g", alterQuantity: 1, alterUnit: 'each' },
      { name: 'bawang', ingId: "bawang", recipe: false, quantity: 60, unit: "g", alterQuantity: 1, alterUnit: 'bulb' },
      { name: 'patatas (diced)', ingId: "patatas", recipe: false, quantity: 315, unit: "g", alterQuantity: 2, alterUnit: 'each' },
      { name: 'carrot (diced)', ingId: "carrot", recipe: false, quantity: 300, unit: "g", alterQuantity: 2, alterUnit: 'each' },
      { name: 'green peas', ingId: "greenpeas", recipe: false, quantity: 155, unit: "g", alterQuantity: 1, alterUnit: 'can' },
      { name: 'vetsin', ingId: "vetsin", recipe: false, quantity: 2.5, unit: "g", alterQuantity: 1/2, alterUnit: "tsp" },
      { name: 'paminta', ingId: "groundblackpepper", recipe: false, quantity: 1.15, unit: "g", alterQuantity: 1/2, alterUnit: "tsp" },
      { name: 'liquid seasoning', ingId: "liquidseasoning", recipe: false, quantity: .50, unit: "cup" },
      { name: 'pasas', ingId: "pasas", recipe: false, quantity: 125, unit: "g" },
      { name: 'LPG', ingId: "lpg11kgs", recipe: false, quantity: 20, unit: "minute", hide: true },
    ],
    instructions: {
      steps: [
        "Igisa ang bawang at sibuyas.",
        "Ilagay ang giniling at intayin maluto.",
        "Ilagay ang patatas, carrots, pasas, liquid seasoning, paminta at vetsin.",
        "Palambutin ang patatas at carrots bago ilagay ang green peas(walang sabaw).",
      ],
    },
  },

  { name: "Chaofan mixture", type: 'f', id: "chaofanmixture", quantity: 2.625, unit: "kg", ingredients: [
    { name: 'giniling', ingId: "groundpork", recipe: false, quantity: 2, unit: "kg" },
    { name: 'liquid seasoning', ingId: "liquidseasoning", recipe: false, quantity: 125, unit: "ml", alterQuantity: 1/2, alterUnit: 'cup' },
    { name: 'oyster sauce', ingId: "oystersauce", recipe: false, quantity: 280, unit: "g", alterQuantity: 1, alterUnit: 'cup' },
    { name: 'carrot (diced)', ingId: "carrot", recipe: false, quantity: 300, unit: "g", alterQuantity: 2, alterUnit: 'each' },
    { name: 'patatas (diced)', ingId: "patatas", recipe: false, quantity: 316, unit: "g", alterQuantity: 2, alterUnit: 'each' },
    { name: 'bawang', ingId: "bawang", recipe: false, quantity: 60, unit: "g", alterQuantity: 1, alterUnit: 'bulb' },
    { name: 'sibuyas', ingId: "sibuyas", recipe: false, quantity: 60, unit: "g", alterQuantity: 1, alterUnit: 'each' },
    { name: 'paminta', ingId: "groundblackpepper", recipe: false, quantity: 2.3, unit: "g", alterQuantity: 1, alterUnit: 'tsp' },
    { name: 'vetsin', ingId: "vetsin", recipe: false, quantity: 5, unit: "g", alterQuantity: 1, alterUnit: 'tsp' },
    { name: 'green peas', ingId: "greenpeas", recipe: false, quantity: 155, unit: "g", alterQuantity: '1 155g', alterUnit: 'can' },
    { name: 'LPG', ingId: "lpg11kgs", recipe: false, quantity: 20, unit: "minute", hide: true },
  ],
  instructions: {
    steps: [
      "Igisa ang bawang, sibuyas, patatas at carrots.",
      "Ilagay ang giniling, haluin hanggang sa maluto at maiga ng bahagya ang sabaw.",
      "Ilagay ang liquid seasoning, oyster sauce, paminta at vetsin.",
      "Kapag malambot na ang carrots at patatas, ilagay na ang green peas(walang sabaw).",
      ],
    },
  },
  { name: "Puto mixture", type: 'f', id: "putomixture", quantity: 3.75, unit: "cup", ingredients: [
    { name: 'all purpose flour', ingId: "allpurposeflour", recipe: false,  quantity: 272, unit: "g", alterQuantity: 2, alterUnit: 'cup' },
    { name: 'white sugar', ingId: "sugarwhite", recipe: false, quantity: 200, unit: "g", alterQuantity: 1, alterUnit: 'cup'},
    { name: 'egg', ingId: "eggxs", recipe: false, quantity: 2, unit: "each" },
    { name: 'baking powder', ingId: "bakingpowder", recipe: false, quantity: 25, unit: "g", alterQuantity: 2, alterUnit: 'Tbs' },
    { name: 'tubig', ingId: "water", recipe: false, quantity: 1.75, unit: "cup" },
    { name: 'butter', ingId: "butter", recipe: false, quantity: 56, unit: "g", alterQuantity: '1/4', alterUnit: 'cup' },
    { name: 'iodized salt', ingId: "saltiodized", recipe: false, quantity: 1.63, unit: "g", alterQuantity: '1/4', alterUnit: 'tsp' },
  ],
  instructions: {
    steps: [
      "Paghalu-haluing mabuti ang apf, white sugar, baking powder, at iodized salt.",
      "Ilagay ang itlog, tubig at butter.",
      "Lutuin sa steamer ang mixture ng 15 minutes. Iwasan matuluan ng tubig na galing sa takip ng steamer.",
    ],
    },
  },
  { name: "Carbonara sauce", type: 'f', id: "carbonarasauce", quantity: 7, unit: "cup", ingredients: [
    { name: 'butter', ingId: "butter", recipe: false, quantity: 50, unit: "g", alterQuantity: 0.25, alterUnit: 'each' },
    { name: 'bawang', ingId: "bawang", recipe: false, quantity: 36, unit: "g", alterQuantity: 6, alterUnit: 'cloves' },
    { name: 'sibuyas', ingId: "sibuyas", recipe: false, quantity: 60, unit: "g", alterQuantity: 1, alterUnit: 'each' },
    { name: 'mantika', ingId: "mantika", recipe: false, quantity: 2, unit: "Tbs" },
    { name: 'square ham (squared)', ingId: "squareham", recipe: false, quantity: 187.5, unit: "g", alterQuantity: '3/4', alterUnit: 'pack' },
    { name: 'mushroom p&s (dehydrated)', ingId: "mushroomps", recipe: false, quantity: 198, unit: "g" },
    { name: 'all purpose cream', ingId: "allpurposecream", recipe: false, quantity: 500, unit: "ml", alterQuantity: 2, alterUnit: 'pack' },
    { name: 'evap', ingId: "evap", recipe: false, quantity: 370, unit: "ml", alterQuantity: 1, alterUnit: 'can' },
    { name: 'cornstarch', ingId: "cornstarch", recipe: false, quantity: 68, unit: "g", alterQuantity: 0.25, alterUnit: 'cup' },
    { name: 'cheese', ingId: "cheese", recipe: false, quantity: 80, unit: "g" },
    { name: 'beef cube', ingId: "beefcube", recipe: false, quantity: 2, unit: "each" },
    { name: 'tubig', ingId: "water", recipe: false, quantity: 2, unit: "cup" },
    { name: 'asin', ingId: "saltrock", recipe: false, quantity: 9, unit: "g", alterQuantity: 1.5, alterUnit: 'tsp' },
    { name: 'paminta', ingId: "groundblackpepper", recipe: false, quantity: 2.3, unit: "g", alterQuantity: 1, alterUnit: 'tsp' },
    { name: 'vetsin', ingId: "vetsin", recipe: false, quantity: 5, unit: "g", alterQuantity: 1, alterUnit: 'tsp'  },
    { name: 'LPG', ingId: "lpg11kgs", recipe: false, quantity: 25, unit: "minute", hide: true },
  ],
  instructions: {
    steps: [
      "Ilagay ang oil at butter.",
      "Igisa ang bawang at sibuyas.",
      "Ilagay ang ham at igisa hanggang mag brown.",
      "Ilagay ang mushroom at beef cubes.",
      "Ilagay ang all purpose cream at evap.",
      "Ilagay ang tubig gamit ang box ng all purpose cream na panukat.",
      "Ilagay ang asin, vetsin at paminta. Hayaan kumulo ng 3 mins.",
      "Tunawin ang cornstarch sa tubig at dahan dahan ilagay hanggang sa makuha ang tamang lapot.",
      "Kapag kumulo na ulit gadgaran ng cheese at pakuluan ng 3-5 mins.",
      ],
    },
 },
  { name: "Spaghetti sauce", type: 'f', id: "spaghettisauce", quantity: 12, unit: "cup", ingredients: [
    { name: 'giniling', ingId: "groundpork", recipe: false, quantity: 0.5, unit: "kg" },
    { name: 'spaghetti sauce filipino style', ingId: "spaghettisaucefilipinostyle", recipe: false, quantity: 900, unit: "g", alterQuantity: '1 900g', alterUnit: 'pack' },
    { name: 'bawang', ingId: "bawang", recipe: false, quantity: 36, unit: "g", alterQuantity: 6, alterUnit: 'cloves' },
    { name: 'sibuyas', ingId: "sibuyas", recipe: false, quantity: 60, unit: "g", alterQuantity: 1, alterUnit: 'each' },
    { name: 'mantika', ingId: "mantika", recipe: false, quantity: 0.50, unit: "cup" },
    { name: 'hotdog (sliced)', ingId: "hotdog", recipe: false, quantity: 8, unit: "each" },
    { name: 'carrot (minced)', ingId: "carrot", recipe: false, quantity: 75, unit: "g", alterQuantity: 0.50, alterUnit: 'each' },
    { name: 'tubig', ingId: "water", recipe: false, quantity: 2, unit: "cup" },
    { name: 'banana ketchup', ingId: "bananaketchup", recipe: false, quantity: 600, unit: "g", alterQuantity: 2.5, alterUnit: 'cup' },
    { name: 'sugar', ingId: "sugarwhite", recipe: false, quantity: 50, unit: "g", alterQuantity: 0.25, alterUnit: 'cup'},
    { name: 'pork cube', ingId: "porkcube", recipe: false, quantity: 2, unit: "each" },
    { name: 'cheese', ingId: "cheese", recipe: false, quantity: 80, unit: "g" },
    { name: 'asin', ingId: "saltrock", recipe: false, quantity: 12, unit: "g", alterQuantity: 2, alterUnit: 'tsp' },
    { name: 'paminta', ingId: "groundblackpepper", recipe: false, quantity: 3.45, unit: "g", alterQuantity: 1.5, alterUnit: 'tsp' },
    { name: 'vetsin', ingId: "vetsin", recipe: false, quantity: 5, unit: "g", alterQuantity: 1, alterUnit: 'tsp'  },
    { name: 'LPG', ingId: "lpg11kgs", recipe: false, quantity: 25, unit: "minute", hide: true },
  ],
  instructions: {
    steps: [
      "Iprito ang hotdog at pagkatapos ay ihiwalay.",
      "Igisa ang bawang at sibuyas.",
      "Ilagay ang giniling, halu-haluin hanggang sa maluto.",
      "Ilagay ang carrots at hotdog at haluin.",
      "Ilagay ang spaghetti sauce at ketchup at haluin.",
      "Ilagay ang tubig, halu-haluin hanggang sa lumapot ang sabaw.",
      "Ilagay ang asin, paminta, vetsin, asukal, pork cubes at cheese.",
      "Timplahan pa kung kailangan hanggang sa makuha ang tamang lasa.",
    ],
    },
  note: 'need to verify the 12 cup output',
},
  { name: "Palabok sauce", type: 'f', id: "palaboksauce", quantity: 9, unit: "cup", ingredients: [
    { name: 'giniling', ingId: "groundpork", recipe: false, quantity: 375, unit: "g" },
    { name: 'atsuete', ingId: "atsuete", recipe: false, quantity: 80, unit: "g", alterQuantity: 2, alterUnit: '40g pack' },
    { name: 'mantika', ingId: "mantika", recipe: false, quantity: 1, unit: "cup" },
    { name: 'chicharon (crushed)', ingId: "chicharon", recipe: false, quantity: 80, unit: "g", alterQuantity: 4, alterUnit: 'small pack' },
    { name: 'tinapa powder', ingId: "tinapapowder", recipe: false, quantity: 120, unit: "g", alterQuantity: '3/4', alterUnit: 'cup' },
    { name: 'shrimp cube', ingId: "shrimpcube", recipe: false, quantity: 2, unit: "each" },
    { name: 'tubig', ingId: "water", recipe: false, quantity: 2, unit: "l" },
    { name: 'bawang', ingId: "bawang", recipe: false, quantity: 36, unit: "g", alterQuantity: 6, alterUnit: 'cloves' },
    { name: 'sibuyas', ingId: "sibuyas", recipe: false, quantity: 60, unit: "g", alterQuantity: 1, alterUnit: 'each' },
    { name: 'cornstarch', ingId: "cornstarch", recipe: false, quantity: 68, unit: "g", alterQuantity: 0.25, alterUnit: 'cup' },
    { name: 'paminta', ingId: "groundblackpepper", recipe: false, quantity: 3.45, unit: "g", alterQuantity: 1.5, alterUnit: 'tsp' },
    { name: 'vetsin', ingId: "vetsin", recipe: false, quantity: 5, unit: "g", alterQuantity: 1, alterUnit: 'tsp'  },
    { name: 'LPG', ingId: "lpg11kgs", recipe: false, quantity: 25, unit: "minute", hide: true },
  ],
  instructions: {
    steps: [
      "Unahin ang atsuete, pakatasin ng mabuti sa 3/4 na mantika sa mahinang apoy.",
      "Igisa ang bawang at sibuyas.",
      "Ilagay ang giniling, halu-haluin hanggang sa maluto.",
      "Ilagay ang tinapa powder at chicharon.",
      "Ilagay ang katas ng atsuete.",
      "Ilagay ang shimp cubes at tubig.",
      "Ilagay ang paminta at vetsin at hintayin kumulo.",
      "Tunawin ang cornstarch sa tubig at dahan dahan ilagay hanggang sa makuha ang tamang lapot.",
      ],
    },
  },
  { name: "Pancit toppings", type: 'f', id: "pancitbihontoppings", quantity: 1450, unit: "g", ingredients: [
    { name: 'chicken breast', ingId: "chickenbreast", recipe: false,  quantity: .50, unit: "kg", alterQuantity: '1/2', alterUnit: 'kg'  },
    { name: 'mantika', ingId: "mantika", recipe: false, quantity: 1, unit: "cup" },
    { name: 'kikiam(sliced)', ingId: "kikiam", recipe: false, quantity: 120, unit: "g", alterQuantity: '15', alterUnit: 'each' },
    { name: 'carrot', ingId: "carrot", recipe: false, quantity: 150, unit: "g", alterQuantity: 1, alterUnit: 'each' },
    { name: 'repolyo', ingId: "repolyo", recipe: false, quantity: 520, unit: "g", alterQuantity: 1, alterUnit: 'each' },
    { name: 'celery', ingId: "celery", recipe: false, quantity: 120, unit: "g", alterQuantity: '30', alterUnit: 'pesos' },
    { name: 'sayote', ingId: "sayote", recipe: false, quantity: 410, unit: "g", alterQuantity: '1', alterUnit: 'each' },
    { name: 'baguio beans', ingId: "baguiobeans", recipe: false, quantity: 180, unit: "g", alterQuantity: '20', alterUnit: 'pesos' },
    { name: 'oyster sauce', ingId: "oystersauce", recipe: false, quantity: 140, unit: "g", alterQuantity: '1/2', alterUnit: 'cup' },
    { name: 'toyo', ingId: "toyo", recipe: false, quantity: 6, unit: "Tbs" },
    { name: 'liquid seasoning', ingId: "liquidseasoning", recipe: false, quantity: .50, unit: "cup" },
    { name: 'chicken cube', ingId: "chickencube", recipe: false, quantity: 2, unit: "each" },
    { name: 'pork cube', ingId: "porkcube", recipe: false, quantity: 2, unit: "each" },
    { name: 'bawang', ingId: "bawang", recipe: false, quantity: 36, unit: "g", alterQuantity: 6, alterUnit: 'cloves' },
    { name: 'sibuyas', ingId: "sibuyas", recipe: false, quantity: 60, unit: "g", alterQuantity: 1, alterUnit: 'each' },
    { name: 'paminta', ingId: "groundblackpepper", recipe: false, quantity: 3.45, unit: "g", alterQuantity: 1.5, alterUnit: 'tsp' },
    { name: 'vetsin', ingId: "vetsin", recipe: false, quantity: 5, unit: "g", alterQuantity: 1, alterUnit: 'tsp'  },
    { name: 'LPG', ingId: "lpg11kgs", recipe: false, quantity: 40, unit: "minute", hide: true },
  ],
  instructions: {
    steps: [
      "Pakuluan ang manok kasama ang chicken cubes.",
      "Himayin ang manok pagkatapos maluto, itabi ang broth(pinagpakuluan).",
      "Iprito ang kikiam at itabi.",
      "Igisa ang bawang at sibuyas.",
      "Ilagay ang mga hiniwang carrots, sayote, baguio beans at celery.",
      "Ilagay ang himay na manok at kikiam(magtira ng pang toppings).",
      "Haluin ang mga gulay at ilagay ang oyster sauce, liquid seasoning at toyo.",
      "Ilagay ang pinagpakuluan ng manok at pork cubes.",
      "Ilagay ang repolyo, paminta at vetsin.",
      "Pakuluan ng 2-3 mins at hanguin sa sabaw pagkatapos ay itabi (itabi din ang sabaw)."
    ],
  },
  note: 'need to verify the 1450g total weight',
  },
  { name: "Siomai mixture", type: 'f', id: "siomaimixture", quantity: 150, unit: "each", ingredients: [
    { name: 'ground pork', ingId: "groundpork", recipe: false, quantity: 1, unit: "kg" },
    { name: 'bawang', ingId: "bawang", recipe: false, quantity: 60, unit: "g", alterQuantity: 1, alterUnit: 'bulb' },
    { name: 'carrot', ingId: "carrot", recipe: false, quantity: 150, unit: "g", alterQuantity: 1, alterUnit: 'each' },
    { name: 'liquid seasoning', ingId: "liquidseasoning", recipe: false, quantity: 0.25, unit: "cup" },
    { name: 'oyster sauce', ingId: "oystersauce", recipe: false, quantity: 70, unit: "g", alterQuantity: 1/4, alterUnit: 'cup' },
    { name: 'asukal', ingId: "sugarwhite", recipe: false, quantity: 12.6, unit: "g", alterQuantity: 1, alterUnit: "Tbs" },
    { name: 'harina', ingId: "harina", recipe: false, quantity: 60, unit: "g", alterQuantity: 1/2, alterUnit: "cup" },
    { name: 'medium egg', ingId: "eggmedium", recipe: false, quantity: 1, unit: "each" },
    { name: 'bread crumbs', ingId: "breadcrumbs", recipe: false, quantity: 78, unit: "g", alterQuantity: 1, alterUnit: "cup" },
    { name: 'paminta', ingId: "groundblackpepper", recipe: false, quantity: 2.3, unit: "g", alterQuantity: 1, alterUnit: 'tsp' },
    { name: 'vetsin', ingId: "vetsin", recipe: false, quantity: 5, unit: "g", alterQuantity: 1, alterUnit: "tsp" },
  ] },
  { name: "Chicken wings marinate", type: 'f', id: "chickenwingsmarinate", quantity: 137, unit: "each", ingredients: [
    { name: 'chicken wings', ingId: "chickenwings", recipe: false, quantity: 137, unit: "each", alterQuantity: 5, alterUnit: 'kg' },  // equivalent to 5 kilo at 7.29 pesos each
    { name: 'paprika', ingId: "paprika", recipe: false, quantity: 90, unit: "g", alterQuantity: 6, alterUnit: 'Tbs' },
    { name: 'garlic powder', ingId: "garlicpowder", recipe: false, quantity: 90, unit: "g", alterQuantity: 6, alterUnit: 'Tbs' },
    { name: 'kalamansi', ingId: "kalamansi", recipe: false, quantity: 42, unit: "g", alterQuantity: 7, alterUnit: 'pcs' },
    { name: 'asin', ingId: "saltrock", recipe: false, quantity: 60, unit: "g", alterQuantity: 3, alterUnit: 'Tbs' },
    { name: 'paminta', ingId: "groundblackpepper", recipe: false, quantity: 10.35, unit: "g", alterQuantity: "1.5", alterUnit: 'Tbs' },
    { name: 'vetsin', ingId: "vetsin", recipe: false, quantity: 22.5, unit: "g", alterQuantity: '1.5', alterUnit: "Tbs" },
  ],
  note: 'The ideal output of a 5 kilo chicken wings is 100 - 137 pcs. It costs 200 per kilo at 7.29 - 10 per piece.',
  },
  { name: "Beef patty", type: 'f', id: "beefpatty", quantity: 28, unit: "each", ingredients: [
    { name: 'ground beef', ingId: "groundbeef", recipe: false,  quantity: 1, unit: "kg"  },
    { name: 'liquid seasoning', ingId: "liquidseasoning", recipe: false, quantity: 0.25, unit: "cup" },
    { name: 'oyster sauce', ingId: "oystersauce", recipe: false, quantity: 70, unit: "g", alterQuantity: 1/4, alterUnit: 'cup' },
    { name: 'bawang (pino)', ingId: "bawang", recipe: false, quantity: 40, unit: "g", alterQuantity: 1/4, alterUnit: 'cup' },
    { name: 'sibuyas (pino)', ingId: "sibuyas", recipe: false, quantity: 55, unit: "g", alterQuantity: 1/3, alterUnit: 'cup' },
    { name: 'garlic powder', ingId: "garlicpowder", recipe: false, quantity: 15, unit: "g", alterQuantity: 1, alterUnit: 'Tbs' },
    { name: 'paprika', ingId: "paprika", recipe: false, quantity: 15, unit: "g", alterQuantity: 1, alterUnit: 'Tbs' },
    { name: 'medium egg', ingId: "eggmedium", recipe: false, quantity: 1, unit: "each" },
    { name: 'breadcrumbs', ingId: "breadcrumbs", recipe: false,  quantity: 100, unit: "g", alterQuantity: 1.25, alterUnit: 'cup' },
    { name: 'paminta', ingId: "groundblackpepper", recipe: false, quantity: 2.3, unit: "g", alterQuantity: 1, alterUnit: 'tsp' },
    { name: 'vetsin', ingId: "vetsin", recipe: false, quantity: 5, unit: "g", alterQuantity: 1, alterUnit: 'tsp' },
  ] },
  { name: "Chicken patty", type: 'f', id: "chickenpatty", quantity: 19, unit: "each", ingredients: [
    { name: 'chicken breast', ingId: "chickenbreast", recipe: false,  quantity: .50, unit: "kg", alterQuantity: '1/2', alterUnit: 'kg'  },
    { name: 'hot sauce', ingId: "hotsauce", recipe: false, quantity: 50, unit: "g", alterQuantity: '1/2', alterUnit: 'bottle' },
    { name: 'liquid seasoning', ingId: "liquidseasoning", recipe: false, quantity: 0.25, unit: "cup" },
    { name: 'paprika', ingId: "paprika", recipe: false, quantity: 3.75, unit: "g", alterQuantity: '1/4', alterUnit: 'Tbs' },
    { name: 'garlic powder', ingId: "garlicpowder", recipe: false, quantity: 5, unit: "g", alterQuantity: 1, alterUnit: 'tsp' },
    { name: 'chili powder', ingId: "chilipowder", recipe: false, quantity: 3, unit: "g", alterQuantity: 1, alterUnit: 'tsp' },
    { name: 'chiliflakes', ingId: "chiliflakes", recipe: false, quantity: 3, unit: "g", alterQuantity: 1, alterUnit: 'tsp' },
    { name: 'asin', ingId: "saltrock", recipe: false, quantity: 6, unit: "g", alterQuantity: 1, alterUnit: 'tsp' },
    { name: 'paminta', ingId: "groundblackpepper", recipe: false, quantity: 3, unit: "g", alterQuantity: 1, alterUnit: 'tsp' },
    { name: 'vetsin', ingId: "vetsin", recipe: false, quantity: 2.5, unit: "g", alterQuantity: 1/2, alterUnit: 'tsp' },
  ] },
  { name: "Chicken fillet marinate", type: 'f', id: "chickenfilletmarinate", quantity: 4.5, unit: "kg", ingredients: [
    { name: 'chicken breast', ingId: "chickenbreast", recipe: false,  quantity: 5, unit: "kg" },
    { name: 'paprika', ingId: "paprika", recipe: false, quantity: 90, unit: "g", alterQuantity: 6, alterUnit: 'Tbs' },
    { name: 'garlic powder', ingId: "garlicpowder", recipe: false, quantity: 60, unit: "g", alterQuantity: 6, alterUnit: 'Tbs' },
    { name: 'kalamansi', ingId: "kalamansi", recipe: false, quantity: 49, unit: "g", alterQuantity: 7, alterUnit: 'pcs' },
    { name: 'asin', ingId: "saltrock", recipe: false, quantity: 60, unit: "g", alterQuantity: 3, alterUnit: 'Tbs' },
    { name: 'paminta', ingId: "groundblackpepper", recipe: false, quantity: 10.5, unit: "g", alterQuantity: 1.5, alterUnit: 'Tbs' },
    { name: 'vetsin', ingId: "vetsin", recipe: false, quantity: 22.5, unit: "g", alterQuantity: 1.5, alterUnit: 'Tbs' },
  ] },
  { name: "Fish fillet marinate", type: 'f', id: "fishfilletmarinate", quantity: 400, unit: "g", ingredients: [
    { name: 'cream dory', ingId: "creamdory", recipe: false,  quantity: 400, unit: "g" },
    { name: 'kalamansi', ingId: "kalamansi", recipe: false, quantity: 6, unit: "g", alterQuantity: 1, alterUnit: 'pc' },
    { name: 'vetsin', ingId: "vetsin", recipe: false, quantity: 1, unit: "g" },
    { name: 'asin', ingId: "saltrock", recipe: false, quantity: 1, unit: "g" },
    { name: 'paminta', ingId: "groundblackpepper", recipe: false, quantity: 2, unit: "g" },
  ],
  note: "Average defrosted cream dory weight should be at least 400g" },
  { name: "Porkchop marinate", type: 'f', id: "porkchopmarinate", quantity: 850, unit: "g", ingredients: [
    { name: 'porkchop', ingId: "porkchop", recipe: false, quantity: 1, unit: "kg" },
    { name: 'kalamansi', ingId: "kalamansi", recipe: false, quantity: 18, unit: "g", alterQuantity: 3, alterUnit: 'pcs' },
    { name: 'asin', ingId: "saltrock", recipe: false, quantity: 6, unit: "g", alterQuantity: 1, alterUnit: 'tsp' },
    { name: 'paminta', ingId: "groundblackpepper", recipe: false, quantity: 1.5, unit: "g", alterQuantity: '3/4', alterUnit: 'tsp' },
    { name: 'vetsin', ingId: "vetsin", recipe: false, quantity: 3.33, unit: "g", alterQuantity: '3/4', alterUnit: 'tsp'  },
  ] },
  { name: "Pork tapa marinate", type: 'f', id: "porktapamarinate", quantity: 1, unit: "kg", ingredients: [
    { name: 'porkchop', ingId: "porkchop", recipe: false, quantity: 1, unit: "kg" },
    { name: 'bawang', ingId: "bawang", recipe: false, quantity: 60, unit: "g", alterQuantity: 1, alterUnit: 'bulb' },
    { name: 'liquid seasoning', ingId: "liquidseasoning", recipe: false, quantity: 6, unit: "Tbs" },
    { name: 'oyster sauce', ingId: "oystersauce", recipe: false, quantity: 105, unit: "g", alterQuantity: 6, alterUnit: 'Tbs' },
    { name: 'toyo', ingId: "toyo", recipe: false, quantity: 6, unit: "Tbs" },
    { name: 'ketchup', ingId: "bananaketchup", recipe: false, quantity: 136, unit: 'g', alterQuantity: 0.50, alterUnit: 'cup' },
    { name: 'asukal', ingId: "sugarwhite", recipe: false, quantity: 100, unit: "g", alterQuantity: 0.50, alterUnit: 'cup' },
    { name: 'kalamansi', ingId: "kalamansi", recipe: false, quantity: 18, unit: "g", alterQuantity: 3, alterUnit: 'pcs' },
    { name: 'paminta', ingId: "groundblackpepper", recipe: false, quantity: 1.73, unit: "g", alterQuantity: '1/4', alterUnit: 'Tbs' },
    { name: 'vetsin', ingId: "vetsin", recipe: false, quantity: 3.75, unit: "g", alterQuantity: '1/4', alterUnit: 'Tbs'  },
  ] },
  { name: "Shanghai mixture", type: 'f', id: "shanghaimixture", quantity: 1.290, unit: "kg", ingredients: [
    { name: 'ground pork', ingId: "groundpork", recipe: false, quantity: 1, unit: "kg" },
    { name: 'bawang', ingId: "bawang", recipe: false, quantity: 60, unit: "g", alterQuantity: 1, alterUnit: 'bulb' },
    { name: 'sibuyas', ingId: "sibuyas", recipe: false, quantity: 60, unit: "g", alterQuantity: 1, alterUnit: 'each' },
    { name: 'carrot', ingId: "carrot", recipe: false, quantity: 37.5, unit: "g", alterQuantity: '1/4', alterUnit: 'each' },
    { name: 'kinchay', ingId: "kinchay", recipe: false, quantity: 50, unit: "g", alterQuantity: '40', alterUnit: 'pesos' },
    { name: 'medium egg', ingId: "eggmedium", recipe: false, quantity: 1, unit: "each" },
    { name: 'liquid seasoning', ingId: "liquidseasoning", recipe: false, quantity: 2.5, unit: "Tbs" },
    { name: 'oyster sauce', ingId: "oystersauce", recipe: false, quantity: 43.75, unit: "g", alterQuantity: 2.5, alterUnit: 'Tbs' },
    { name: 'asukal', ingId: "sugarwhite", recipe: false, quantity: 12.6, unit: "g", alterQuantity: 1, alterUnit: "Tbs" },
    { name: 'iodized salt', ingId: "saltiodized", recipe: false, quantity: 6.5, unit: "g", alterQuantity: 1, alterUnit: 'tsp' },
    { name: 'paminta', ingId: "groundblackpepper", recipe: false, quantity: 1.2, unit: "g", alterQuantity: '1/2', alterUnit: 'tsp' },
    { name: 'vetsin', ingId: "vetsin", recipe: false, quantity: 5, unit: "g", alterQuantity: 1, alterUnit: "tsp" },
  ],
  note: "1 kg pork giniling can make 86-88 shanghai sticks" },
  { name: "Gravy", type: 'f', id: "gravy", quantity: 651, unit: "ml", prepTime: '8 mins',
  ingredients: [
    { name: 'tubig', ingId: "water", recipe: false, quantity: 5, unit: "cup" },
    { name: 'butter', ingId: "butter", recipe: false, quantity: 50, unit: "g", alterQuantity: 0.25, alterUnit: 'each' },
    { name: 'harina', ingId: "harina", recipe: false, quantity: 120, unit: "g", alterQuantity: 1, alterUnit: 'cup' },
    { name: 'beef cube', ingId: "beefcube", recipe: false, quantity: 2, unit: "each" },
    { name: 'liquid seasoning', ingId: "liquidseasoning", recipe: false, quantity: 80, unit: "ml" },
    { name: 'paminta', ingId: "groundblackpepper", recipe: false, quantity: 1.2, unit: "g", alterQuantity: 0.5, alterUnit: 'tsp'},
    { name: 'LPG', ingId: "lpg11kgs", recipe: false, quantity: 8, unit: "minute", hide: true },
  ],
  instructions: {
    steps: [
      "Tunawin ang butter kasama ng beef cubes at haluing mabuti.",
      "Ilagay ang harina.",
      "Ilagay ang tubig.",
      "Haluin mabuti hanggang wala ng buo-buong harina.",
      "Ilagay ang liquid seasoning at paminta.",
      "Haluin hanggang sa lumapot"
    ],
  },
  },
  { name: "Veggies", type: 'f', id: "veggies", quantity: 180, unit: "g", prepTime: '10 mins',
  ingredients: [
    { name: 'repolyo', ingId: "repolyo", recipe: false, quantity: 125, unit: "g" },
    { name: 'carrot', ingId: "carrot", recipe: false, quantity: 50, unit: "g" },
    { name: 'sibuyas', ingId: "sibuyas", recipe: false, quantity: 15, unit: "g" },
    { name: 'liquid seasoning', ingId: "liquidseasoning", recipe: false, quantity: 1, unit: "Tbs" },
    { name: 'sesame oil', ingId: "sesameoil", recipe: false, quantity: 1, unit: "tsp" },
    { name: 'paminta', ingId: "groundblackpepper", recipe: false, quantity: 2, unit: "g" },
    { name: 'vetsin', ingId: "vetsin", recipe: false, quantity: 1, unit: "g" },
    { name: 'asin', ingId: "saltrock", recipe: false, quantity: 1, unit: "g" },
    { name: 'mantika', ingId: "mantika", recipe: false, quantity: 3, unit: "Tbs" },
    { name: 'LPG', ingId: "lpg11kgs", recipe: false, quantity: 5, unit: "minute", hide: true },
  ],
  instructions: {
    steps: [
      "Igisa ang sibuyas.",
      "Ilagay ang carrots at repolyo.",
      "Lagyan ng liquid seasoning.",
      "Timplahan ng asin paminta at vetsin.",
      "Ilagay ang sesame oil at haluin ng ilang segundo.",
    ],
  },
  },
  { name: "Mixed Veggies", type: 'f', id: "mixedveggies", quantity: 300, unit: "g", prepTime: '10 mins',
  ingredients: [
    { name: 'mixed vegetables', ingId: "mixedvegetables", recipe: false, quantity: 200, unit: "g" },
    { name: 'sibuyas', ingId: "sibuyas", recipe: false, quantity: 15, unit: "g" },
    { name: 'liquid seasoning', ingId: "liquidseasoning", recipe: false, quantity: 2, unit: "Tbs" },
    { name: 'sesame oil', ingId: "sesameoil", recipe: false, quantity: 2, unit: "Tbs" },
    { name: 'paminta', ingId: "groundblackpepper", recipe: false, quantity: 2, unit: "g" },
    { name: 'vetsin', ingId: "vetsin", recipe: false, quantity: 1, unit: "g" },
    { name: 'asin', ingId: "saltrock", recipe: false, quantity: 1, unit: "g" },
    { name: 'mantika', ingId: "mantika", recipe: false, quantity: 3, unit: "Tbs" },
    { name: 'LPG', ingId: "lpg11kgs", recipe: false, quantity: 5, unit: "minute", hide: true },
  ],
  instructions: {
    steps: [
      "Igisa ang sibuyas.",
      "Ilagay ang mixed vegetables.",
      "Lagyan ng liquid seasoning.",
      "Timplahan ng asin paminta at vetsin.",
      "Ilagay ang sesame oil at haluin ng ilang segundo.",
    ],
  },
  },
  { name: "Chili oil", type: 'f', id: "chilioil", quantity: 2, unit: "cup", ingredients: [
    { name: 'mantika', ingId: "mantika", recipe: false, quantity: 2, unit: "cup" },
    { name: 'asukal', ingId: "sugarwhite", recipe: false, quantity: 6.3, unit: "g", alterQuantity: 0.5, alterUnit: "Tbs" },
    { name: 'chili powder', ingId: "chilipowder", recipe: false, quantity: 3, unit: "g", alterQuantity: 1, alterUnit: 'tsp' },
    { name: 'vetsin', ingId: "vetsin", recipe: false, quantity: 2.5, unit: "g", alterQuantity: 0.5, alterUnit: "tsp" },
    { name: 'sili', ingId: "sili", recipe: false, quantity: 38, unit: "g" },
    { name: 'LPG', ingId: "lpg11kgs", recipe: false, quantity: 4, unit: "minute", hide: true },
  ] },

// SUB-RECIPES
  { name: "Beef burger", type: 'g', id: "beefburger", quantity: 1, unit: "each", ingredients: [
    { name: 'beef patty', ingId: "beefpatty", recipe: true, quantity: 1, unit: "each" },
    { name: 'burger buns', ingId: "burgerbuns", recipe: false,  quantity: 1, unit: "each" },
    { name: 'coleslaw', ingId: "coleslaw", recipe: true,  quantity: 20, unit: "g" },
    { name: 'ketchup', ingId: "bananaketchup", recipe: false, quantity: 11, unit: "g" },
    { name: 'mayonnaise', ingId: "mayonnaise", recipe: false, quantity: 2, unit: 'tsp' },
    { name: 'pipino', ingId: "pipino", recipe: false, quantity: 5, unit: 'g' },
    { name: 'kamatis', ingId: "kamatis", recipe: false, quantity: 5, unit: 'g' },
    { name: 'LPG', ingId: "lpg11kgs", recipe: false, quantity: 5, unit: "minute", hide: true },
  ] },
  { name: "bihon", type: 'g', id: "bihon", quantity: 1, unit: "each", ingredients: [
    { name: 'bihon noodles', ingId: "noodlesbihon", recipe: true,  quantity: 1, unit: "cup" },
    { name: 'bihon toppings', ingId: "pancitbihontoppings", recipe: true,  quantity: 80, unit: "g" }, // 70g for veggies and 10g for kikiam
    { name: 'kalamansi', ingId: "kalamansi", recipe: false, quantity: 6, unit: "g" },
  ] },
  { name: "Bihon noodles", type: 'g', id: "noodlesbihon", quantity: 22, unit: "cup", ingredients: [
    { name: 'bihon', ingId: "bihon", recipe: false,  quantity: 750, unit: "g" },
    { name: 'kaldo(galing sa pinagpakuluan ng gulay)', ingId: "water", recipe: false,  quantity: 6, unit: "cup" },
    { name: 'LPG', ingId: "lpg11kgs", recipe: false, quantity: 10, unit: "minute", hide: true },
  ] },
  { name: "Breaded porkchop", type: 'g', id: "breadedporkchop", quantity: 1, unit: "each", ingredients: [
    { name: 'marinated porkchop', ingId: "porkchopmarinate", recipe: true,  quantity: 50, unit: "g" },
    { name: 'breading', ingId: "breading", recipe: true, quantity: .20, unit: 'cup' },
    { name: 'breadcrumbs', ingId: "breadcrumbs", recipe: false,  quantity: 40, unit: "g" },
    { name: 'eggmedium', ingId: "eggmedium", recipe: false,  quantity: 0.50, unit: "each" },
    { name: 'mantika', ingId: "mantika", recipe: false,  quantity: 20, unit: "ml" }, // √√√
    { name: 'LPG', ingId: "lpg11kgs", recipe: false, quantity: 5, unit: "minute", hide: true },
  ] },
  { name: "Breading", type: 'g', id: "breading", quantity: 26, unit: "cup", ingredients: [
    { name: 'harina', ingId: "harina", recipe: false,  quantity: 2, unit: "kg"  },
    { name: 'cornstarch', ingId: "cornstarch", recipe: true,  quantity: 1, unit: "kg" },
    { name: 'garlic powder', ingId: "garlicpowder", recipe: false, quantity: 105, unit: "g", alterQuantity: 7, alterUnit: 'Tbs' },
    { name: 'paprika', ingId: "paprika", recipe: false, quantity: 105, unit: "g", alterQuantity: 7, alterUnit: 'Tbs' },
    { name: 'iodized salt', ingId: "saltiodized", recipe: false, quantity: 60, unit: "g", alterQuantity: 3, alterUnit: 'Tbs' },
    { name: 'vetsin', ingId: "vetsin", recipe: false, quantity: 45, unit: "g", alterQuantity: 3, alterUnit: 'Tbs' },
    { name: 'paminta', ingId: "groundblackpepper", recipe: false, quantity: 20.7, unit: "g", alterQuantity: 3, alterUnit: 'Tbs' },
  ] },
  { name: "Chicken burger", type: 'g', id: "chickenburger", quantity: 1, unit: "each", ingredients: [
    { name: 'chicken patty', ingId: "chickenpatty", recipe: true, quantity: 1, unit: "each" },
    { name: 'burger buns', ingId: "burgerbuns", recipe: false, quantity: 1, unit: "each" },
    { name: 'coleslaw', ingId: "coleslaw", recipe: true,  quantity: 20, unit: "g" },
    { name: 'mayonnaise', ingId: "mayonnaise", recipe: false, quantity: 4, unit: 'tsp' },
    { name: 'eggmedium', ingId: "eggmedium", recipe: false, quantity: 0.33, unit: 'each' },
    { name: 'evap', ingId: "evap", recipe: false, quantity: 2, unit: 'tsp' },
    { name: 'breading', ingId: "breading", recipe: true, quantity: 2, unit: 'tsp' },
    { name: 'bread crumbs', ingId: "breadcrumbs", recipe: false, quantity: 10, unit: 'g' },
    { name: 'mantika', ingId: "mantika", recipe: false,  quantity: 10, unit: "ml" },
    { name: 'LPG', ingId: "lpg11kgs", recipe: false, quantity: 4, unit: "minute", hide: true },
  ] },
  { name: "Carbonara", type: 'g', id: "carbonara", quantity: 1, unit: "each", ingredients: [
    { name: 'carbonara sauce', ingId: "carbonarasauce", recipe: true,  quantity: 0.50, unit: "cup" },
    { name: 'spaghetti pasta', ingId: "spaghettipasta", recipe: true,  quantity: 1, unit: "cup" },
  ] },
  { name: "Chaofan", type: 'g', id: "chaofan", quantity: 1, unit: "each", ingredients: [
    { name: 'chaofan', ingId: "chaofanmixture", recipe: true,  quantity: 40, unit: "g" },
    { name: 'rice', ingId: "rice", recipe: true,  quantity: 1, unit: "cup", noNest: true  },
    { name: 'eggxs', ingId: "eggxs", recipe: false,  quantity: 1, unit: "each"  },
    { name: 'mantika', ingId: "mantika", recipe: false,  quantity: 1, unit: "Tbs"  },
    { name: 'liquid seasoning', ingId: "liquidseasoning", recipe: false, quantity: 1, unit: "Tbs" },
    { name: 'oyster sauce', ingId: "oystersauce", recipe: false, quantity: 17.5, unit: "g", alterQuantity: 1, alterUnit: 'Tbs' },
    { name: 'LPG', ingId: "lpg11kgs", recipe: false, quantity: 8, unit: "minute", hide: true },
  ] },
  { name: "Chicken fillet", type: 'g', id: "chickenfillet", quantity: 1, unit: "each", ingredients: [ //1 each = 100g of marinated chicken fillet
    { name: 'chicken fillet marinate', ingId: "chickenfilletmarinate", recipe: true,  quantity: 100, unit: "g"  },
    { name: 'breading', ingId: "breading", recipe: true, quantity: .25, unit: 'cup' },
    { name: 'breadcrumbs', ingId: "breadcrumbs", recipe: false,  quantity: 65.7, unit: "g" },
    { name: 'mantika', ingId: "mantika", recipe: false,  quantity: 50, unit: "ml" },
    { name: 'LPG', ingId: "lpg11kgs", recipe: false, quantity: 5, unit: "minute", hide: true },
  ] },
  { name: "Fish fillet", type: 'g', id: "fishfillet", quantity: 1, unit: "each", ingredients: [ //1 each = 160g of marinated fish fillet
    { name: 'fish fillet marinate', ingId: "fishfilletmarinate", recipe: true,  quantity: 160, unit: "g"  },
    { name: 'breading', ingId: "breading", recipe: true, quantity: .25, unit: 'cup' },
    { name: 'eggxs', ingId: "eggxs", recipe: false,  quantity: 0.50, unit: "each"  },
    { name: 'mantika', ingId: "mantika", recipe: false,  quantity: 50, unit: "ml" },
    { name: 'LPG', ingId: "lpg11kgs", recipe: false, quantity: 5, unit: "minute", hide: true },
  ],
  note: "Weight changes when packing and cooking., ex. packed as 160g then 150g when to be cooked" },
  { name: "Chicken wings", type: 'g', id: "chickenwings", quantity: 6, unit: "each", ingredients: [
    { name: 'chicken wings marinate', ingId: "chickenwingsmarinate", recipe: true,  quantity: 6, unit: "each"  },
    { name: 'breading', ingId: "breading", recipe: true, quantity: .40, unit: 'cup' },
    { name: 'mantika', ingId: "mantika", recipe: false,  quantity: 30, unit: "ml" },
    { name: 'LPG', ingId: "lpg11kgs", recipe: false, quantity: 10, unit: "minute", hide: true },
  ] },
  { name: "Coleslaw", type: 'g', id: "coleslaw", quantity: 250, unit: "g", ingredients: [
    { name: 'repolyo', ingId: "repolyo", recipe: false, quantity: 125, unit: "g" },
    { name: 'carrot', ingId: "carrot", recipe: false, quantity: 10, unit: "g" },
    { name: 'rock salt', ingId: "saltrock", recipe: false, quantity: 1.5, unit: 'g', alterQuantity: 0.2, alterUnit: "tsp" },
    { name: 'paminta', ingId: "groundblackpepper", recipe: false, quantity: 0.6, unit: "g", alterQuantity: 0.25, alterUnit: "tsp" },
    { name: 'white sugar', ingId: "sugarwhite", recipe: false, quantity: 2.1, unit: 'g', alterQuantity: 0.5, alterUnit: "tsp" },
    { name: 'mayonnaise', ingId: "mayonnaise", recipe: false, quantity: 0.5, unit: 'cup' }
  ] },
  { name: "Empanada", type: 'g', id: "empanada", quantity: 5, unit: "each", ingredients: [
    { name: 'dough', ingId: "empanadadough", recipe: true,  quantity: 5, unit: "each", noNest: true },
    { name: 'filling', ingId: "empanadafilling", recipe: true,  quantity: 5, unit: "each", noNest: true  },
    { name: 'cheese', ingId: "cheese", recipe: false,  quantity: 15, unit: "g" },
    { name: 'mantika', ingId: "mantika", recipe: false,  quantity: 20, unit: "ml" },
    { name: 'LPG', ingId: "lpg11kgs", recipe: false, quantity: 6, unit: "minute" },
  ] },
  { name: "Fried egg", type: 'g', id: "friedegg", quantity: 1, unit: "each", ingredients: [
    { name: 'egg', ingId: "eggxs", recipe: false, quantity: 1, unit: "each" },
    { name: 'mantika', ingId: "mantika", recipe: false, quantity: 1, unit: "Tbs" },
    { name: 'LPG', ingId: "lpg11kgs", recipe: false, quantity: 3, unit: "minute", hide: true },
  ] },
  { name: "Fried garlic", type: 'g', id: "friedgarlic", quantity: 200, unit: "g", ingredients: [
    { name: 'bawang', ingId: "bawang", recipe: false, quantity: 300, unit: "g", alterQuantity: 5, alterUnit: 'bulb' },
    { name: 'LPG', ingId: "lpg11kgs", recipe: false, quantity: 4, unit: "minute", hide: true },
  ] },
  { name: "Fried rice", type: 'g', id: "friedrice", quantity: 1, unit: "cup", ingredients: [
    { name: 'rice', ingId: "rice", recipe: true, quantity: 1.5, unit: "cup", noNest: true },
    { name: 'mantika', ingId: "mantika", recipe: false, quantity: 2, unit: "Tbs" },
    { name: 'bawang', ingId: "bawang", recipe: false, quantity: 5, unit: "g" },
    { name: 'garlic powder', ingId: "garlicpowder", recipe: false, quantity: 7.5, unit: "g", alterQuantity: 1.5, alterUnit: 'tsp' },
    { name: 'rock salt', ingId: "saltrock", recipe: false, quantity: 2, unit: "g" },
    { name: 'LPG', ingId: "lpg11kgs", recipe: false, quantity: 6, unit: "minute", hide: true },
  ] },
  { name: "Maruya mixture", type: 'g', id: "maruyamixture", quantity: 651, unit: "ml", ingredients: [
    { name: 'harina', ingId: "harina", recipe: false, quantity: 120, unit: "g", alterQuantity: 1, alterUnit: "cup" },
    { name: 'asukal', ingId: "sugarwhite", recipe: false, quantity: 100, unit: "g", alterQuantity: '1/2', alterUnit: "cup" },
    { name: 'saba', ingId: "sagingsaba", recipe: false, quantity: 440, unit: 'g', alterQuantity: '4-5', alterUnit: "pcs" },
    { name: 'egg xs', ingId: "eggxs", recipe: false, quantity: 1, unit: "each" },
    { name: 'evap', ingId: "evap", recipe: false, quantity: 158.7, unit: 'ml', alterQuantity: '2/3', alterUnit: "cup"},
  ] },
  { name: "Palabok", type: 'g', id: "palabok", quantity: 1, unit: "each", ingredients: [
    { name: 'palabok sauce', ingId: "palaboksauce", recipe: true,  quantity: 0.50, unit: "cup" },
    { name: 'palabok noodles', ingId: "noodlespalabok", recipe: true,  quantity: 1, unit: "cup" },
    { name: 'fried garlic', ingId: "friedgarlic", recipe: true,  quantity: 5, unit: "g" },
    { name: 'spring onions', ingId: "springonions", recipe: false, quantity: 2, unit: "g" },
    { name: 'chicharon', ingId: "chicharon", recipe: false, quantity: 5, unit: "g" },
    { name: 'egg', ingId: "eggxs", recipe: false, quantity: 0.2, unit: "each" },
    { name: 'kalamansi', ingId: "kalamansi", recipe: false, quantity: 6, unit: "g" },
  ] },
  { name: "Palabok noodles", type: 'g', id: "noodlespalabok", quantity: 25, unit: "cup", ingredients: [
    { name: 'palabok noodles', ingId: "palaboknoodles", recipe: false,  quantity: 750, unit: "g" },
    { name: 'LPG', ingId: "lpg11kgs", recipe: false, quantity: 20, unit: "minute", hide: true },
  ] },
  { name: "Puto", type: 'g', id: "puto", quantity: 19, unit: "each", ingredients: [
    { name: 'puto mixture', ingId: "putomixture", recipe: true,  quantity: 2.375, unit: "cup" },
    { name: 'cheese', ingId: "cheese", recipe: false, quantity: 11.25, unit: "g" },
    { name: 'LPG', ingId: "lpg11kgs", recipe: false, quantity: 25, unit: "minute", hide: true },
  ] },
  { name: "Rice", type: 'g', id: "rice", quantity: 17, unit: "cup", ingredients: [
    { name: 'bigas', ingId: "bigas", recipe: false, quantity: 1818, unit: "g" },
    { name: 'LPG', ingId: "lpg11kgs", recipe: false, quantity: 15, unit: "minute", hide: true }, // scaled 30 minutes to low fire usage
  ] },
  { name: "Shanghai", type: 'g', id: "lumpiangshanghai", quantity: 2, unit: "each", ingredients: [
    { name: 'shanghai mixture', ingId: "shanghaimixture", recipe: true,  quantity: 15, unit: "g" },
    { name: 'wrapper', ingId: "lumpiawrappermedium", recipe: false,  quantity: 1, unit: "each" },
  ] },
  { name: "Siomai", type: 'g', id: "siomai", quantity: 20, unit: "each", ingredients: [
    { name: 'siomai mixture', ingId: "siomaimixture", recipe: true, quantity: 20, unit: "each" },
    { name: 'molo', ingId: "molo", recipe: false, quantity: 20, unit: "each" },
    { name: 'LPG', ingId: "lpg11kgs", recipe: false, quantity: 25, unit: "minute", hide: true }, // scaled 30 minutes to low fire usage with re-heating
  ] },
  { name: "Siomai condiments", type: 'g', id: "siomaicondiments", quantity: 1, unit: "each", ingredients: [
    { name: 'chili oil', ingId: "chilioil", recipe: true,  quantity: 2, unit: "tsp"  },
    { name: 'toyo', ingId: "siomaitoyomixture", recipe: true,  quantity: 2, unit: "Tbs" },
    { name: 'fried garlic', ingId: "friedgarlic", recipe: true,  quantity: 5, unit: "g" },
    { name: 'kalamansi', ingId: "kalamansi", recipe: false, quantity: 6, unit: "g" },
  ] },
  { name: "Siomai toyo mixture", type: 'g', id: "siomaitoyomixture", quantity: 34, unit: "fl-oz", ingredients: [
    { name: 'tubig', ingId: "water", recipe: false, quantity: 2, unit: "cup" },
    { name: 'asukal', ingId: "sugarwhite", recipe: false, quantity: 37.8, unit: "g", alterQuantity: 3, alterUnit: "Tbs" },
    { name: 'vetsin', ingId: "vetsin", recipe: false, quantity: 15, unit: "g", alterQuantity: 1, alterUnit: "Tbs" },
    { name: 'toyo', ingId: "toyo", recipe: false, quantity: 17, unit: "fl-oz", alterQuantity: 2, alterUnit: "cup" },
  ] },
  { name: "Spaghetti", type: 'g', id: "spaghetti", quantity: 1, unit: "each", ingredients: [
    { name: 'spaghetti sauce', ingId: "spaghettisauce", recipe: true,  quantity: 0.50, unit: "cup" },
    { name: 'spaghetti pasta', ingId: "spaghettipasta", recipe: true,  quantity: 1, unit: "cup" },
    { name: 'cheese', ingId: "cheese", recipe: false, quantity: 5, unit: "g" },
  ] },
  { name: "Spaghetti pasta", type: 'g', id: "spaghettipasta", quantity: 20, unit: "cup", ingredients: [
    { name: 'pasta', ingId: "pasta", recipe: false,  quantity: 900, unit: "g" },
    { name: 'LPG', ingId: "lpg11kgs", recipe: false, quantity: 20, unit: "minute", hide: true },
  ] },
]

// quantity and unit are market units they will be used for price computations
// alterQuantity and alterunit are recipe units they will be used in the menu instructions


// ^ = measured personally
// groundblackpepper 1tsp = 2.3g 1tbsp = 6.9g
// rock salt 1tsp = 6g 1tbsp = 20g
// vetsin 1tsp = 5g 1tbsp = 15g
// white sugar 1tsp = 4.17g^ 1tbsp = 12.5g^ 1cup = 200g^
// bawang 1 bulb = 60g clove = 6g
// sibuyas 1 whole = 60g
// harina 1 cup = 120g
// hot sauce 2tbs = 34g
// iodized salt 1tsp = 6.5g 1tbsp = 20g
// butter 1tbsp = 14g 1/4cup = 56g
// banana catsup 1tbsp = 17g 1tsp = 5g 1cup = 240g
// mayonnaise 1tbsp = 17g
// oyster 1/8cup = 35g^ 1tbsp = 17.5g^ 1/2cup = 140g 1cup = 280g^
// chili flakes 1tsp = 3g 1tbsp = 15g
// chili powder 1tsp = 3g 1tbsp = 8g
// garlic powder 1tsp = 5g 1tbsp = 15g
// paprika powder 1tsp = 3g 1tbsp = 15g
// breadcrumbs 1cup = 80g^ 1tbsp = 5g^
// kalamansi = 6g
// liquid seasoning 1cup = 250g^
// harina 1cup = 136g^
// baking powder 1cup = 125g 1tbsp = 12.5g 1tsp = 4.2g
// carrots = 150g^
// condensed = 1tbsp = 20g

//chicken fillet reg = 65.7g breadcrumbs

const weightUnits = ["mg", "g", "kg", "oz", "lb"];
const volumeUnits = ["ml", "l", "tsp", "Tbs", "fl-oz", "cup", "gal"];
