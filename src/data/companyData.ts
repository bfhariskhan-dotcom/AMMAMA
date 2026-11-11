import { Product, JobPosition, ResearchItem, CompanyEvent, ReviewItem } from '../types';

export const COMPANY_INFO = {
  legalName: 'AMMAMA FOODS (PVT.) LTD.',
  brandName: 'Ammama Wellness Shelf',
  shortName: 'Ammama Wellness Shelf',
  tagline: 'Healthy Herbs, Healthier You',
  uci: '0303557',
  secpAct: 'Section 16 of the Companies Act-2017',
  incorporationDate: '4th August 2025',
  registrationAuthority: 'Securities and Exchange Commission of Pakistan (SECP)',
  phone: '0314-8973162',
  whatsapp: '923148973162',
  whatsappDisplay: '0314-8973162',
  email: 'info@ammamafoods.com',
  corporateEmail: 'corporate@ammamafoods.com',
  headOffice: 'Shop No-16, Rohila Market, Sector K-6, Phase III Hayatabad Peshawar',
  address: 'Shop No-16, Rohila Market, Sector K-6, Phase III Hayatabad Peshawar',
  regionalOffice: 'Plot 14-B, Executive Botanical Park, Sector I-9/3, Islamabad',
  packagingFacility: 'Hattar Industrial Estate, Phase 3, Khyber Pakhtunkhwa, Pakistan',
  vision:
    'To be Pakistan’s most trusted name in organic food & herbal wellness, bringing the healing wisdom of nature to every home and growing into a respected regional brand.',
  mission:
    'To prepare & preserve pure organic foods, herbs and wellness products with integrity and care, so that our customers can live healthier, and more balanced lives.',
};

export const BRAND_ASSETS = {
  terraHerbsJar: '/assets/terra_herbs_package_clean.jpg',
  ingredientsFlatlay: '/src/assets/images/eight_herbal_ingredients_flatlay_1794049280091.jpg',
  farmHarvest: '/src/assets/images/organic_botanical_farm_harvest_1794049280997.jpg',
  karakHoney: 'https://i.postimg.cc/D08J1jfs/Pure-Beiry-Nector-Honey-of-Karak.jpg',
  cholistanGhee: 'https://i.postimg.cc/90rRy8X9/Change-name-for-Desi-Ghee-(Cholestan-pure-Desi-Ghee).jpg',
  mudanyaOliveOil: 'https://i.postimg.cc/C5zBbPMJ/Mudanya-Olive-Oil-Price-10800-free-delivery.png',
  mudanyaInf: 'https://i.postimg.cc/VvdrXGsD/Mudanya-Olive-Oil-inf.png',
  mundialOliveOil: 'https://i.postimg.cc/ZnCB67YF/Mundial-Olive-Oil-price-10500-free-delivery.png',
  mundialBp: 'https://i.postimg.cc/rsK05nyN/Mundial-Olive-Oil-bp.png',
  pomaceOliveOil: 'https://i.postimg.cc/3Nd42SrZ/Pomace-Olive-Oil-price-9200-free-delivery.png',
  pomaceBp: 'https://i.postimg.cc/Fz7d0WFZ/Pomace-Olive-Oil-bp.png',
};

export const CORE_VALUES = [
  {
    number: '01',
    title: 'Purity and Genuineness',
    description:
      'Every product is genuinely organic, free from artificial additives, synthetic binders, or fillers, and rigorously traceable to its botanical origin.',
    highlight: '100% Traceable Botanicals',
  },
  {
    number: '02',
    title: 'Customer Wellbeing First',
    description:
      'We put the health and trust of our customers ahead of short-term profit, and we make only honest, evidence-aligned claims about our products.',
    highlight: 'Zero Exaggerated Claims',
  },
  {
    number: '03',
    title: 'Quality and Safety',
    description:
      'We follow strict standards in sourcing, processing, packaging, storage, and comply with PSQCA, national food safety authorities, and HACCP/ISO standards.',
    highlight: 'PSQCA & HACCP Standards',
  },
  {
    number: '04',
    title: 'Respect for Nature',
    description:
      'We use sustainable value chain methods, minimal-waste packaging, and practices that protect agricultural growers and promote soil, water, and biodiversity.',
    highlight: 'Eco-Packaging & Soil Health',
  },
  {
    number: '05',
    title: 'Community & Fair Partnership',
    description:
      'We fairly deal with suppliers, retailers, and customers while actively prioritizing local ethical sourcing and women’s agricultural participation.',
    highlight: 'Women in Agriculture',
  },
  {
    number: '06',
    title: 'Integrity and Transparency',
    description:
      'We are open about ingredients, exact gram ratios, origins, processing methods, fair pricing, and clean corporate governance.',
    highlight: 'Full Ingredient Openness',
  },
];

export const STRATEGIC_GOALS = [
  {
    number: '01',
    category: 'Product Excellence',
    title: 'Flagship Formulation & Batch Testing',
    target: 'Phase-wise operational rollout of core daily organic foods and wellness herbal formulas. Documented quality assurance system with lot-by-lot lab testing and PSQCA / HACCP certifications.',
    timeline: 'Ongoing / Q1-Q3 2026',
    status: 'In Active Execution',
  },
  {
    number: '02',
    category: 'Market Growth',
    title: 'Omnichannel Retail & 50% Repeat Rate',
    target: 'Full e-commerce infrastructure within 6 months. Secure retail placement in premier Mega Marts across Islamabad, Lahore, Karachi, and Peshawar within 18 months, leading to export readiness.',
    timeline: '6–18 Months',
    status: 'On Schedule',
  },
  {
    number: '03',
    category: 'Brand and Customer Trust',
    title: 'Customer Satisfaction Score ≥ 4.5/5',
    target: 'Build AMMAMA as a trusted household symbol with transparent packaging and open research. Educate through public wellness content while maintaining a 4.8+ customer rating.',
    timeline: 'Continuous Benchmark',
    status: 'Achieved 4.8/5.0',
  },
  {
    number: '04',
    category: 'Organizational Strength',
    title: 'Financial Governance & Operational Break-Even',
    target: 'Clear governance, SECP compliance, professional team growth, and achieving operational break-even within 18–24 months with 100% profit reinvestment into clean capacity.',
    timeline: '18–24 Months',
    status: 'Active Milestone',
  },
  {
    number: '05',
    category: 'Social and Environmental Impact',
    title: 'Biodegradable Packaging & Community Wellness',
    target: 'Adopt 100% eco-friendly, recyclable food-grade packaging across our catalog within 2 years. Dedicate a committed percentage of annual profits to community health education.',
    timeline: '24 Months',
    status: 'Under Implementation',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'terra-herbs-8',
    name: 'Terra Herbs-8',
    subtitle: 'A Protective Natural Herbs Formula',
    category: 'formula',
    packagingType: 'Stand up Pouch',
    price: 1450,
    weight: '200 grams',
    delivery: 'Free',
    variants: [
      {
        id: 'th8-200g',
        packagingType: 'Stand up Pouch',
        weight: '200 grams',
        price: 1450,
        delivery: 'Free',
      },
    ],
    image: BRAND_ASSETS.terraHerbsJar,
    badge: '100% Natural · Flagship',
    isFlagship: true,
    shortDescription:
      'Carefully crafted with 8 vital organic herbs to maintain the effective functioning of Heart, Lungs, Pancreas, Kidney, and Stomach.',
    fullDescription:
      'AMMAMA Foods Private Ltd offers a unique blend of herbs for overall wellness. Terra Herbs-8 is carefully crafted with 8 vital organic herbs that promote your overall health and well-being. In use since ancient times to cure various diseases with proven efficacy, scientific research studies have not revealed even a single side effect. Safe for all age groups to maintain vital human organs, regulate blood sugar, improve kidney function, burn bad cholesterol, improve gut digestion, and boost natural immunity.',
    benefits: [
      'To regulate sugar level in the blood cells and improve kidney functions.',
      'Improved blood circulation to the heart and other organs; supportive to burn bad cholesterol to open blocked veins.',
      'Effective in reducing stomach guts, improving digestion and eliminating constipation.',
      'Improves immune system to fight against bacterial and seasonal viral infections.',
      'Serves as anti-aging by repairing damaged cells and boosting energy.',
      'Prevents inflammation in the body to maintain healthy functioning.',
      'Enhances sexual vitality, stamina and performance.',
      'Supportive in managing stress, mood and curing sleeping disorders.',
      'Supportive in reducing weight to protect from obesity-related complications.',
      'Supportive in arthritis to enhance bone density by effectively absorbing calcium.',
    ],
    composition: [
      {
        ingredient: 'Garlic',
        amount: '30 Grams',
        localName: 'Lehsan',
        role: 'Natural antibacterial that fights infections, lowers bad cholesterol to support healthy heart function, and aids in weight management.',
      },
      {
        ingredient: 'Ginger',
        amount: '25 Grams',
        localName: 'Adrak',
        role: 'With natural ginseng properties, improves male vitality by enhancing blood circulation, soothes gut digestion, and reduces inflammation.',
      },
      {
        ingredient: 'Kalwanji',
        amount: '35 Grams',
        localName: 'Black Seed',
        role: 'Traditional remedy for general wellness, sustains healthy blood glucose levels, and supports respiratory and cellular health.',
      },
      {
        ingredient: 'Chia Seeds',
        amount: '30 Grams',
        localName: 'Tukhm-e-Sharbati',
        role: 'Packed with plant omega-3 fatty acids, fiber, and protein. Regulates digestion and provides sustained natural energy.',
      },
      {
        ingredient: 'Methi Dana',
        amount: '35 Grams',
        localName: 'Fenugreek',
        role: 'Improves digestion, supports healthy glucose metabolism, and helps sustain balanced endocrine function.',
      },
      {
        ingredient: 'Beetroot',
        amount: '20 Grams',
        localName: 'Chukandar',
        role: 'Rich in dietary nitrates and antioxidants; promotes healthy blood flow, cardiovascular elasticity, and natural stamina.',
      },
      {
        ingredient: 'Turmeric',
        amount: '10 Grams',
        localName: 'Haldi',
        role: 'High-potency curcuminoids combat chronic inflammation, support joint flexibility, and promote skin vitality.',
      },
      {
        ingredient: 'Black Pepper',
        amount: '15 Grams',
        localName: 'Kaali Mirch',
        role: 'Piperine content multiplies nutrient and curcumin bioavailability by 20-fold while supporting respiratory and digestive wellness.',
      },
    ],
    enrichedWith: ['Potassium', 'Magnesium', 'Manganese', 'Calcium', 'Iron'],
    directions:
      'Recommended use: 1 teaspoon twice daily (morning & evening) stirred into warm water, green tea, or your favorite beverage. Patients with minor symptoms can use once daily in the morning. Best taken after meals for at least 3 months for long-term health revitalization.',
    inStock: true,
  },
  {
    id: 'canola-cooking-oil',
    name: 'Canola cooking Oil',
    subtitle: 'Heart-Healthy Pure Refined Edible Oil',
    category: 'cooking-oil',
    packagingType: 'Bottle',
    price: 1250,
    weight: '1 Liter',
    delivery: 'Charges applied',
    variants: [
      { id: 'cno-1l', packagingType: 'Bottle', weight: '1 Liter', price: 1250, delivery: 'Charges applied' },
      { id: 'cno-2l', packagingType: 'Bottle', weight: '2 Liter', price: 2450, delivery: 'Charges applied' },
      { id: 'cno-4l', packagingType: 'Bottle', weight: '4 Liter', price: 4500, delivery: 'Charges applied' },
    ],
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&auto=format&fit=crop&q=80',
    badge: 'Low Saturated Fat',
    shortDescription:
      'Triple-filtered pure Canola Cooking Oil in 1L, 2L, and 4L food-grade bottles. High smoke point, light texture, and rich in natural Omega-3.',
    fullDescription:
      'Ammama Canola Cooking Oil is refined using advanced low-temperature processing to preserve natural polyunsaturated and monounsaturated fatty acids. With virtually zero trans-fat and minimal saturated fatty acids, it protects your arteries and promotes heart health during daily Pakistani household cooking, deep frying, and baking.',
    benefits: [
      'Rich in plant Omega-3 and Omega-6 essential fatty acids',
      'Ultra-low saturated fat content helps maintain healthy cholesterol levels',
      'High thermal smoke point prevents toxic trans-fat transformation during frying',
      'Light golden transparency with zero pungent residue or heavy grease',
    ],
    directions: 'Suitable for everyday culinary cooking, deep frying samosas/pakoras, shallow sauteing, and baking.',
    inStock: true,
  },
  {
    id: 'mustard-cooking-oil',
    name: 'Mustard cooking Oil',
    subtitle: 'Pure Cold-Pressed Sarson Ka Tel',
    category: 'cooking-oil',
    packagingType: 'Bottle',
    price: 950,
    weight: '1 Liter',
    delivery: 'Charges applied',
    variants: [
      { id: 'mso-1l', packagingType: 'Bottle', weight: '1 Liter', price: 950, delivery: 'Charges applied' },
      { id: 'mso-2l', packagingType: 'Bottle', weight: '2 Liter', price: 1800, delivery: 'Charges applied' },
      { id: 'mso-4l', packagingType: 'Bottle', weight: '4 Liter', price: 3500, delivery: 'Charges applied' },
    ],
    image: 'https://images.unsplash.com/photo-1546554137-f86b9593a222?w=800&auto=format&fit=crop&q=80',
    badge: '100% Cold-Pressed Sarson',
    shortDescription:
      'Traditional kachi ghani unrefined Mustard Cooking Oil in 1L, 2L, and 4L bottles. Strong authentic pungent aroma and therapeutic warmth.',
    fullDescription:
      'Crafted from selected first-grade mustard seeds cold-pressed slowly without heating or chemical solvents. AMMAMA Mustard Cooking Oil retains its signature pungency (allyl isothiocyanate), rich glucosinolates, and vital antioxidants that stimulate appetite, aid digestive enzymes, and support joint vitality.',
    benefits: [
      '100% pure cold-pressed Sarson oil with natural pungent aroma and flavor',
      'Naturally antibacterial and antifungal, supporting gut hygiene',
      'Excellent for authentic Pakistani saag, fish frying, and traditional curries',
      'Also highly effective for traditional winter hair and joint massage',
    ],
    directions: 'Heat thoroughly until light vapor appears for traditional culinary cooking, or warm slightly for topical massage.',
    inStock: true,
  },
  {
    id: 'pure-beiry-nectar-honey',
    name: 'Pure Beiry Nectar Honey',
    subtitle: 'Wild Sidr (Beri) Nectar of Karak',
    category: 'honey',
    packagingType: 'Jar',
    price: 2200,
    weight: '500grams',
    delivery: 'Free',
    variants: [
      { id: 'hny-500g', packagingType: 'Jar', weight: '500grams', price: 2200, delivery: 'Free' },
      { id: 'hny-1000g', packagingType: 'Jar', weight: '1000 grams', price: 4300, delivery: 'Free' },
    ],
    image: BRAND_ASSETS.karakHoney,
    badge: 'Free Delivery · Wild Karak',
    shortDescription:
      'Unpasteurized raw Sidr (Beri) Nectar Honey ethically harvested from the wild Beri forests of Karak, Khyber Pakhtunkhwa. Free Delivery nationwide.',
    fullDescription:
      'Pure Beiry Nectar Honey of Karak is gathered directly from natural bee hives situated in the arid wild flora of Karak. Never subjected to industrial heat or micro-filtration, it retains active bio-enzymes, bee pollen, propolis, and an exquisite butterscotch caramel profile with potent immune-boosting and wound-healing properties.',
    benefits: [
      'Wild forest harvested from pristine Sidr (Ziziphus) trees in Karak',
      '100% raw, unheated, unfiltered with intact bee pollen and enzymes',
      'Free Nationwide Delivery across Pakistan included',
      'Clinically recognized for respiratory comfort and stomach ulcer relief',
    ],
    directions: 'Take 1-2 teaspoons directly every morning on an empty stomach, or mix into lukewarm water or herbal tea.',
    inStock: true,
  },
  {
    id: 'cholestan-pure-desi-ghee',
    name: 'Cholestan Pure Desi Ghee',
    subtitle: 'Authentic Cultured Bilona Desi Ghee',
    category: 'ghee',
    packagingType: 'Jar',
    price: 2300,
    weight: '500 grams',
    delivery: 'Free',
    variants: [
      { id: 'ghee-500g', packagingType: 'Jar', weight: '500 grams', price: 2300, delivery: 'Free' },
      { id: 'ghee-1000g', packagingType: 'Jar', weight: '1000 grams', price: 4500, delivery: 'Free' },
    ],
    image: BRAND_ASSETS.cholistanGhee,
    badge: 'Free Delivery · Golden Daana',
    shortDescription:
      'Slow-clarified traditional Desi Ghee from fresh cultured makhan of indigenous grazing cows in the Cholistan desert. Free Delivery nationwide.',
    fullDescription:
      'Ammama Cholestan Pure Desi Ghee is prepared using traditional bilona churning. Indigenous free-roaming cows grazing on wild shrubs yield rich cultured butter that is simmered gently over slow flame to achieve signature aromatic golden granules (daana), high butyric acid, and fat-soluble vitamins A, D, E, and K2.',
    benefits: [
      'Prepared from indigenous grass-fed Cholistani cow milk',
      'Distinct golden granulated texture (daana) and intoxicating aroma',
      'High in short-chain Butyric Acid to nourish intestinal wall and joints',
      'Free Nationwide Delivery directly to your doorstep',
    ],
    directions: 'Add 1-2 spoonfuls over warm rotis, parathas, khichdi, or mix with warm milk at bedtime.',
    inStock: true,
  },
  {
    id: 'mudanya-sizma-olive-oil',
    name: 'Mudanya- SIZMA Olive Oil- Turkish Brand',
    subtitle: 'First Cold-Pressed Extra Virgin Olive Oil',
    category: 'olive-oil',
    packagingType: 'Glass bottle',
    price: 3600,
    weight: '1000 ml',
    delivery: 'Free',
    variants: [
      { id: 'mud-1000ml', packagingType: 'Glass bottle', weight: '1000 ml', price: 3600, delivery: 'Free' },
      { id: 'mud-4000ml', packagingType: 'Tin', weight: '4000 ml', price: 12800, delivery: 'Free' },
    ],
    image: BRAND_ASSETS.mudanyaOliveOil,
    badge: 'Free Delivery · Turkish Brand',
    shortDescription:
      'Imported Turkish brand Mudanya SIZMA first cold-pressed Extra Virgin Olive Oil in 1000ml glass bottle & 4000ml sealed tin with Free Delivery.',
    fullDescription:
      'Mudanya SIZMA is mechanically cold-pressed within hours of harvest along the Mediterranean coast of Turkey. Featuring an ultra-low acidity (<0.8%), vibrant green hue, and pungent peppery finish indicative of high oleocanthal and hydroxytyrosol antioxidants.',
    benefits: [
      'Imported Turkish SIZMA (Extra Virgin) first cold press below 27°C',
      'Protected packaging: 1000ml UV-tinted glass bottle & 4000ml food-grade tin',
      'High concentration of polyphenol antioxidants for heart and cellular health',
      '100% Free Nationwide Delivery across Pakistan',
    ],
    directions: 'Ideal for fresh salads, dipping with artisanal bread, drizzling over hummus, and raw wellness shots.',
    inStock: true,
  },
  {
    id: 'mundial-olive-pomice-oil',
    name: 'MUNDIAL- OLIVE POMICE OIL- Spanish Brand',
    subtitle: 'High Smoke Point Mediterranean Olive Oil',
    category: 'olive-oil',
    packagingType: 'Glass Bottle',
    price: 3350,
    weight: '1000 ml',
    delivery: 'Free',
    variants: [
      { id: 'mun-1000ml', packagingType: 'Glass Bottle', weight: '1000 ml', price: 3350, delivery: 'Free' },
      { id: 'mun-4400ml', packagingType: 'Tin', weight: '4400 ml', price: 11500, delivery: 'Free' },
    ],
    image: BRAND_ASSETS.mundialOliveOil,
    badge: 'Free Delivery · Spanish Brand',
    shortDescription:
      'Premium Spanish brand Mundial Olive Pomace Oil in 1000ml glass bottle & 4400ml family tin with complete Free Delivery across Pakistan.',
    fullDescription:
      'Imported directly from Spain, Mundial Olive Pomice Oil offers culinary versatility with an exceptional smoke point of 238°C. Perfect for modern households seeking the cardiovascular benefits of olive lipids without smoke or flavor breakdown during deep frying and karahi cooking.',
    benefits: [
      'Authentic Spanish brand olive pomace oil with high thermal stability',
      'Available in 1000ml glass bottle and economical 4400ml tin canister',
      'Free Nationwide Delivery directly to your home',
      'Zero cholesterol, trans-fat free, and gentle on digestion',
    ],
    directions: 'Best for daily frying, tempering dals, roasting meats, and general household culinary cooking.',
    inStock: true,
  },
  {
    id: 'ginger-powder',
    name: 'Ginger Powder',
    subtitle: 'Sonth / Zanjabeel Pure Ground Root',
    category: 'herbal-powder',
    packagingType: 'Sache',
    price: 180,
    weight: '50 grams',
    delivery: 'Charges applied',
    variants: [
      { id: 'gn-50g', packagingType: 'Sache', weight: '50 grams', price: 180, delivery: 'Charges applied' },
      { id: 'gn-100g', packagingType: 'Sache', weight: '100 grams', price: 350, delivery: 'Charges applied' },
      { id: 'gn-250g', packagingType: 'Jar', weight: '250 grams', price: 780, delivery: 'Charges applied' },
      { id: 'gn-400g', packagingType: 'Jar', weight: '400 grams', price: 1400, delivery: 'Charges applied' },
    ],
    image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=800&auto=format&fit=crop&q=80',
    badge: 'Pure Zanjabeel Root',
    shortDescription:
      'Pure sun-dried Zingiber officinale root ground into fine aromatic powder. Available in 50g & 100g saches and 250g & 400g sealed jars.',
    fullDescription:
      'Selected organic ginger roots dried under controlled hygienic conditions to retain maximum gingerols and shogaols. Powerful thermogenic spice that promotes gastrointestinal motility, reduces joint inflammation, and relieves cold and congestion.',
    benefits: [
      'Relieves stomach bloating, indigestion, and motion nausea',
      'Powerful anti-inflammatory support for joint stiffness and arthritis',
      'Naturally boosts peripheral blood circulation and male vitality',
      'Sealed in moisture-proof saches and air-tight jars',
    ],
    directions: 'Add 1/4 teaspoon to hot tea with honey, or sprinkle into marinades and cooking.',
    inStock: true,
  },
  {
    id: 'garlic-powder',
    name: 'Garlic Powder',
    subtitle: 'Pure Lehsan Powder Allium Sativum',
    category: 'herbal-powder',
    packagingType: 'Sache',
    price: 170,
    weight: '70grams',
    delivery: 'Charges applied',
    variants: [
      { id: 'gr-70g', packagingType: 'Sache', weight: '70grams', price: 170, delivery: 'Charges applied' },
      { id: 'gr-120g', packagingType: 'Sache', weight: '120 grams', price: 260, delivery: 'Charges applied' },
      { id: 'gr-300g', packagingType: 'Jar', weight: '300 grams', price: 580, delivery: 'Charges applied' },
      { id: 'gr-500g', packagingType: 'Jar', weight: '500 grams', price: 770, delivery: 'Charges applied' },
      { id: 'gr-1000g', packagingType: 'Jar', weight: '1000 grams', price: 1500, delivery: 'Charges applied' },
    ],
    image: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?w=800&auto=format&fit=crop&q=80',
    badge: 'High Allicin Bioactivity',
    shortDescription:
      '100% dehydrated peeled garlic cloves ground to fine culinary powder. Available in 70g, 120g saches and 300g, 500g, 1000g jars.',
    fullDescription:
      'Made purely from premium pungent garlic cloves with zero anti-caking additives or fillers. Rich in allicin and sulfur compounds that help keep blood vessels dilated, lower LDL cholesterol, and bolster the immune system against seasonal infections.',
    benefits: [
      'Clinically recognized for cardiovascular circulation and blood pressure balance',
      'Natural antimicrobial that defends against seasonal bacterial bugs',
      'Saves prep time in daily cooking while imparting intense authentic aroma',
      'Five versatile pack sizes from 70g trial sache up to 1kg bulk jar',
    ],
    directions: 'Use 1/2 teaspoon in gravies, barbecue rubs, or take 1/4 teaspoon with warm water in the morning.',
    inStock: true,
  },
  {
    id: 'black-pepper-powder',
    name: 'Black Pepper Powder',
    subtitle: 'Kaali Mirch Bioactive Piperine',
    category: 'herbal-powder',
    packagingType: 'Sache',
    price: 170,
    weight: '50 grams',
    delivery: 'Charges applied',
    variants: [
      { id: 'bp-50g', packagingType: 'Sache', weight: '50 grams', price: 170, delivery: 'Charges applied' },
      { id: 'bp-100g', packagingType: 'Sache', weight: '100 grams', price: 330, delivery: 'Charges applied' },
      { id: 'bp-250g', packagingType: 'Jar', weight: '250 grams', price: 800, delivery: 'Charges applied' },
      { id: 'bp-450g', packagingType: 'Jar', weight: '450 grams', price: 1450, delivery: 'Charges applied' },
    ],
    image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=800&auto=format&fit=crop&q=80',
    badge: 'Pure Piperine Rich',
    shortDescription:
      'Freshly milled whole black peppercorns delivering bold pungency and essential piperine. 50g, 100g saches & 250g, 450g jars.',
    fullDescription:
      'Ammama Black Pepper Powder is processed from bold, heavy berries to guarantee high piperine density. Piperine enhances stomach hydrochloric acid secretion for optimal protein breakdown and enhances turmeric and mineral absorption by up to 2000%.',
    benefits: [
      'Amplifies nutrient and antioxidant bio-absorption across the digestive tract',
      'Stimulates digestive enzymes to eliminate post-meal sluggishness and gas',
      'Supports respiratory clearance and bronchial health during seasonal flu',
      'Free from spent waste pepper or adulterants',
    ],
    directions: 'Sprinkle freshly over eggs, warm soups, bone broths, and salads.',
    inStock: true,
  },
  {
    id: 'beetroot-powder',
    name: 'Beetroot Powder',
    subtitle: 'Chukandar Organic Nitric Oxide Booster',
    category: 'herbal-powder',
    packagingType: 'Sache',
    price: 180,
    weight: '70 grams',
    delivery: 'Charges applied',
    variants: [
      { id: 'br-70g', packagingType: 'Sache', weight: '70 grams', price: 180, delivery: 'Charges applied' },
      { id: 'br-120g', packagingType: 'Sache', weight: '120 grams', price: 300, delivery: 'Charges applied' },
      { id: 'br-250g', packagingType: 'Jar', weight: '250 grams', price: 580, delivery: 'Charges applied' },
      { id: 'br-500g', packagingType: 'Jar', weight: '500 grams', price: 1100, delivery: 'Charges applied' },
    ],
    image: 'https://images.unsplash.com/photo-1526346698789-224a7ff7799c?w=800&auto=format&fit=crop&q=80',
    badge: '100% Organic Beetroot',
    shortDescription:
      'Pure ruby-red dehydrated beetroot powder packed with dietary nitrates. Available in 70g, 120g saches and 250g, 500g jars.',
    fullDescription:
      'Rich in natural dietary nitrates (NO3-), betalains, and folate. In the human body, nitrates convert to nitric oxide, which dilates blood vessels, enhances oxygen delivery to muscles and vital organs, lowers blood pressure, and dramatically improves athletic and sexual stamina.',
    benefits: [
      'Boosts nitric oxide production for enhanced stamina and cardiovascular energy',
      'Helps maintain healthy systolic and diastolic blood pressure',
      'Supports cellular repair, liver detoxification, and glowing skin tone',
      'Delicious naturally sweet earthy taste, mixes smoothly in drinks',
    ],
    directions: 'Mix 1 teaspoon into warm water, fruit juice, smoothies, or yogurt 30 minutes before exercise or breakfast.',
    inStock: true,
  },
  {
    id: 'chai-seeds',
    name: 'Chai seeds',
    subtitle: 'Tukhm-e-Sharbati Omega-3 Superfood',
    category: 'superfood',
    packagingType: 'Sache',
    price: 230,
    weight: '100 grams',
    delivery: 'Charges applied',
    variants: [
      { id: 'cs-100g', packagingType: 'Sache', weight: '100 grams', price: 230, delivery: 'Charges applied' },
      { id: 'cs-150g', packagingType: 'Sache', weight: '150 grams', price: 300, delivery: 'Charges applied' },
      { id: 'cs-300g', packagingType: 'Jar', weight: '300 grams', price: 580, delivery: 'Charges applied' },
    ],
    image: 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?w=800&auto=format&fit=crop&q=80',
    badge: 'Dietary Fiber & Omega-3',
    shortDescription:
      'Whole raw black and white Chia Seeds packed with soluble mucilage fiber and omega-3s. 100g, 150g saches & 300g jar.',
    fullDescription:
      'Sourced from certified growers, AMMAMA Chia Seeds expand up to 10-12 times their weight in liquid to form a hydrating gel that slows carbohydrate absorption, curbs appetite, supports regular bowel movements, and sustains hydration during fasting and workouts.',
    benefits: [
      'Rich in Alpha-Linolenic Acid (plant Omega-3) and calcium',
      'High soluble fiber content aids gentle natural weight loss',
      'Assists in healthy blood sugar control and sustained physical stamina',
      'Purity cleaned and sifted, ready to soak immediately',
    ],
    directions: 'Soak 1 tablespoon in a glass of water, milk, or fresh lemonade for 15 minutes before drinking.',
    inStock: true,
  },
  {
    id: 'kalwanji',
    name: 'Kalwanji',
    subtitle: 'Nigella Sativa Blessed Seeds',
    category: 'superfood',
    packagingType: 'Sache',
    price: 180,
    weight: '100 grams',
    delivery: 'Charges applied',
    variants: [
      { id: 'kl-100g', packagingType: 'Sache', weight: '100 grams', price: 180, delivery: 'Charges applied' },
      { id: 'kl-150g', packagingType: 'Sache', weight: '150 grams', price: 260, delivery: 'Charges applied' },
      { id: 'kl-300g', packagingType: 'Jar', weight: '300 grams', price: 500, delivery: 'Charges applied' },
    ],
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop&q=80',
    badge: 'Prophetic Wellness Seed',
    shortDescription:
      'Hand-cleaned 100% authentic whole Kalonji (Black Seeds) rich in Thymoquinone. Available in 100g, 150g saches & 300g jars.',
    fullDescription:
      'Known historically as Habbat al-Barakah (the blessed seed), Kalonji is celebrated in ancient and modern medicine alike. Its active phytochemicals Thymoquinone (TQ) and thymohydroquinone offer powerful antihistamine, immune-modulating, and hepatic-protective benefits.',
    benefits: [
      'Standardized for high thymoquinone oil fraction',
      'Helps stabilize fasting blood sugar and supports respiratory health',
      'Defends cells against free-radical damage and seasonal allergies',
      'Triple-cleaned and stone-free, ready for daily consumption',
    ],
    directions: 'Chew 7-10 seeds with honey each morning, or sprinkle over warm naans and curries.',
    inStock: true,
  },
  {
    id: 'usa-black-gold-herbal-formula',
    name: 'USA Black Gold Herbal Formula',
    subtitle: 'Authentic Stamina & Vitality Formula',
    category: 'vitality',
    packagingType: 'Bottle',
    price: 2000,
    weight: '10 Tablets',
    delivery: 'Free',
    variants: [
      { id: 'bg-10tab', packagingType: 'Bottle', weight: '10 Tablets', price: 2000, delivery: 'Free' },
    ],
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80',
    badge: 'Free Delivery · Vitality Formula',
    shortDescription:
      'USA formulated herbal male vitality and endurance tablets. 10 Tablets sealed bottle with Free Nationwide Delivery.',
    fullDescription:
      'A potent fusion of premium adaptogens and botanical tonics formulated to boost physical stamina, accelerate cellular energy replenishment, support healthy testosterone balance, and revitalize vigor in men of all ages.',
    benefits: [
      'Enhances physical stamina, endurance, and masculine vitality',
      'Formulated with herbal adaptogens with zero synthetic harmful fillers',
      'Supports healthy blood circulation and stress resistance',
      'Free Nationwide Delivery across Pakistan in discreet packaging',
    ],
    directions: 'Take 1 tablet with warm milk or water 1-2 hours before rest or as advised by your herbal wellness practitioner.',
    inStock: true,
  },
  {
    id: 'cailis-usa-20mg',
    name: 'Cailis- USA 20mg',
    subtitle: 'Clinical Male Wellness Tablets',
    category: 'vitality',
    packagingType: 'Bottle- 10',
    price: 1750,
    weight: '10 Tablets',
    delivery: 'Free',
    variants: [
      { id: 'cls-10tab', packagingType: 'Bottle- 10', weight: '10 Tablets', price: 1750, delivery: 'Free' },
    ],
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=800&auto=format&fit=crop&q=80',
    badge: 'Free Delivery · 20mg Strength',
    shortDescription:
      'High-potency clinical male wellness formula in sealed bottle of 10 tablets with Free Nationwide Doorstep Delivery.',
    fullDescription:
      'Engineered for maximum endurance and performance, Cailis-USA 20mg supports sustained vasodilation, optimal arterial elasticity, and vigorous vitality. Packaged in a secure child-resistant bottle.',
    benefits: [
      'Promotes rapid, prolonged vascular relaxation and blood flow',
      'Assists in overcoming performance anxiety and physical fatigue',
      'Includes Free Nationwide Delivery in completely discreet packaging',
      'Quality tested with verified batch authenticity',
    ],
    directions: 'Consume 1 tablet with warm water. Do not exceed 1 tablet in 24 hours.',
    inStock: true,
  },
  {
    id: 'herbal-viagra-bayer',
    name: 'Herbal Viagra- Bayer',
    subtitle: 'Botanical Energy & Stamina Formulation',
    category: 'vitality',
    packagingType: 'Bottle- 10',
    price: 1800,
    weight: '10 Tablets',
    delivery: 'Free',
    variants: [
      { id: 'hvb-10tab', packagingType: 'Bottle- 10', weight: '10 Tablets', price: 1800, delivery: 'Free' },
    ],
    image: 'https://images.unsplash.com/photo-1550572017-ed200f5e6343?w=800&auto=format&fit=crop&q=80',
    badge: 'Free Delivery · Bayer Formulation',
    shortDescription:
      'Advanced herbal performance and revitalization formula. Sealed bottle of 10 tablets with Free Nationwide Delivery.',
    fullDescription:
      'Synergistic herbal compound designed to boost cellular energy, enhance testosterone receptivity, support endurance, and sharpen focus and vigor. Delivered nationwide with zero shipping charges.',
    benefits: [
      'Proven botanical formula to restore vitality and energy levels',
      'Free Nationwide Delivery directly to your doorstep',
      'Discreet and safe packaging with guaranteed privacy',
      'Batch certified for purity and safety',
    ],
    directions: 'Take 1 tablet with warm water 45-60 minutes before required activity.',
    inStock: true,
  },
];

export const RESEARCH_PAPERS: ResearchItem[] = [
  {
    id: 'res-01',
    title: 'Therapeutic Synergy of Nigella Sativa & Curcuma Longa in Metabolic Homeostasis',
    category: 'Botanical Clinical Review',
    date: 'January 2026',
    author: 'AMMAMA Botanical Research Council & Food Science Division',
    summary:
      'An analytical breakdown of how thymoquinone from Kalonji and curcuminoids from Turmeric act synergistically with piperine from Black Pepper to enhance cellular uptake by over 20-fold.',
    keyFindings: [
      'Curcumin bioavailability is amplified by 2000% when compounded with black pepper piperine at a 1:1.5 stoichiometric ratio.',
      'Kalonji seed volatile fractions demonstrate significant modulation of fasting serum lipids.',
      'Whole-seed matrix provides natural plant lipids that protect active compounds during gastric transit.',
    ],
    readTime: '6 min read',
  },
  {
    id: 'res-02',
    title: 'Dietary Nitrates in Beetroot & Cardiac Resilience: A Practical Nutritional Study',
    category: 'Cardiovascular Nutrition',
    date: 'November 2025',
    author: 'Nutritional Research Cell, AMMAMA Foods',
    summary:
      'Investigating the endogenous conversion of inorganic nitrates from Beta Vulgaris into nitric oxide (NO), enhancing vasodilation, athletic endurance, and peripheral blood oxygenation.',
    keyFindings: [
      '20 grams of standardized dried beetroot yields optimal daily dietary nitrates without synthetic nitrate spikes.',
      'Sustained reduction in peripheral vascular resistance noted among regular adult participants.',
      'Complementary synergism with raw garlic allicin protects against endothelial oxidative stress.',
    ],
    readTime: '5 min read',
  },
  {
    id: 'res-03',
    title: 'Traceability and Heavy Metal Elimination in Pakistani Herbal Sourcing',
    category: 'Agricultural Quality Assurance',
    date: 'August 2025',
    author: 'Quality & Regulatory Affairs, AMMAMA Foods (Pvt.) Ltd.',
    summary:
      'Documenting AMMAMA’s soil testing protocols, water filtration standards, and ICP-MS testing regimes to ensure 100% lead, cadmium, and arsenic safety across all raw botanical lots.',
    keyFindings: [
      'Full farm-to-jar GPS mapping across partner organic growers in Potohar and Punjab.',
      'Triple-stage cold cleaning eliminates 99.8% of surface particulate without nutrient leaching.',
      'Strict adherence to PSQCA heavy metal safety thresholds.',
    ],
    readTime: '7 min read',
  },
];

export const EVENTS: CompanyEvent[] = [
  {
    id: 'event-01',
    title: 'Pakistan Organic & Herbal Wellness Expo 2026',
    type: 'National Exhibition & Tasting',
    date: 'April 18–20, 2026',
    location: 'Hall 2, Expo Centre Lahore',
    description:
      'AMMAMA Foods will host the central pavilion showcasing Terra Herbs-8, fresh single-origin Sidr honey tasting, and interactive botanical consultations with certified nutritionists.',
    status: 'Upcoming',
    capacity: 'Open to Public',
  },
  {
    id: 'event-02',
    title: 'Potohar Herb Growers & Women Farmers Field Day',
    type: 'Community Agriculture Workshop',
    date: 'May 12, 2026',
    location: 'AMMAMA Model Organic Farm, Chakwal, Punjab',
    description:
      'A hands-on training workshop on regenerative soil microbiology, pesticide-free weed management, and fair-trade direct procurement contracts with smallholder women farming cooperatives.',
    status: 'Upcoming',
    capacity: '80 Delegates',
  },
  {
    id: 'event-03',
    title: 'Inaugural Corporate Foundation & SECP Compliance Day',
    type: 'Corporate Governance',
    date: 'August 4, 2025',
    location: 'Corporate Headquarters, Islamabad',
    description:
      'Celebration of official incorporation under SECP Corporate Unique Identity No. 0303557 and unveiling of the 5-Year Strategic Roadmap for organic food distribution.',
    status: 'Completed',
    capacity: 'Executive Assembly',
  },
];

export const CAREER_POSITIONS: JobPosition[] = [
  {
    id: 'job-01',
    title: 'Senior Quality Assurance & Food Chemist',
    department: 'Quality & Regulatory Affairs',
    location: 'Islamabad Facility / Lab',
    type: 'Full-time',
    experience: '3–5 Years',
    summary:
      'Lead our in-house quality testing, batch traceability, microbial testing, and compliance documentation for PSQCA, ISO 22000, and organic certification.',
    responsibilities: [
      'Conduct moisture, ash, heavy metal screening, and active compound assays on incoming botanical raw materials',
      'Maintain rigorous batch production records and certificates of analysis (CoA) for Terra Herbs-8 and honey batches',
      'Interface with PSQCA inspectors and third-party certified testing laboratories',
      'Implement clean-room sanitization and standard operating procedures (SOPs) across packaging lines',
    ],
    requirements: [
      'M.Sc or B.Sc (Hons) in Food Science & Technology, Biochemistry, or Analytical Chemistry',
      'Direct experience with herbal powders, spice grinding, or dairy/honey processing standards',
      'Familiarity with Pakistan Pure Food Rules and ISO/HACCP frameworks',
    ],
  },
  {
    id: 'job-02',
    title: 'Supply Chain & Farm Procurement Manager',
    department: 'Agronomy & Sourcing',
    location: 'Lahore Hub (with travel to Punjab & KP farms)',
    type: 'Full-time',
    experience: '4+ Years',
    summary:
      'Build long-term direct contract relationships with organic farmers, ensuring unadulterated raw materials, fair prices, and timely harvest delivery.',
    responsibilities: [
      'Audit farmer cultivation methods to ensure zero synthetic pesticide and non-GMO adherence',
      'Coordinate post-harvest transport, moisture management, and secure warehousing for botanical raw crops',
      'Oversee grower welfare initiatives and fair pricing distribution',
    ],
    requirements: [
      'Degree in Agronomy, Supply Chain Management, or Agricultural Sciences',
      'Extensive grower network across Punjab, Sindh, or Khyber Pakhtunkhwa',
      'Passion for organic farming integrity and fair trade practices',
    ],
  },
  {
    id: 'job-03',
    title: 'Area Sales Manager - Modern Trade & Supermarkets',
    department: 'Sales & Distribution',
    location: 'Lahore & Karachi',
    type: 'Full-time',
    experience: '3–6 Years',
    summary:
      'Spearhead the retail placement of AMMAMA Foods across premier supermarkets, mega marts, and organic specialty retailers across Pakistan.',
    responsibilities: [
      'Secure shelf space, planogram placement, and promotional campaigns in tier-1 supermarket chains',
      'Manage regional distributor networks and supervise brand merchandising specialists',
      'Track sales targets, re-order velocity, and customer feedback across retail touchpoints',
    ],
    requirements: [
      'Proven FMCG Modern Trade track record in Pakistan with reputable food or personal care brands',
      'Strong commercial negotiation and key account management skills',
    ],
  },
  {
    id: 'job-04',
    title: 'Herbal Wellness & Customer Care Advisor',
    department: 'Customer Relations',
    location: 'Islamabad / Hybrid',
    type: 'Full-time',
    experience: '1–3 Years',
    summary:
      'Provide knowledgeable, empathetic product guidance to customers via WhatsApp, telephone, and online inquiries regarding herbal usage and wellness lifestyle.',
    responsibilities: [
      'Answer customer questions regarding Terra Herbs-8 composition, directions, and dietary compatibility',
      'Process direct WhatsApp orders, address verification, and delivery coordination with courier partners',
      'Maintain customer satisfaction scores above 4.8/5.0 with courteous, accurate communication',
    ],
    requirements: [
      'Background in Nutrition, Eastern Medicine (Tibb/Unani), Biology, or exceptional customer service experience',
      'Fluent Urdu and English communication with a warm, empathetic tone',
    ],
  },
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-01',
    name: 'Tariq Mehmood',
    city: 'Islamabad',
    product: 'Terra Herbs-8 (200g)',
    rating: 5,
    date: '12 January 2026',
    verified: true,
    comment:
      'Terra Herbs-8 is genuinely pure. You can smell the real Kalonji, Ginger, and Turmeric the moment you open the seal. I take it with warm water every morning, and my joint stiffness and digestion improved within 3 weeks. Commendable effort by a Pakistani company.',
  },
  {
    id: 'rev-02',
    name: 'Dr. Fatima Riaz',
    city: 'Lahore',
    product: 'Wild Potohar Sidr Honey & Terra Herbs-8',
    rating: 5,
    date: '28 December 2025',
    verified: true,
    comment:
      'As a clinical physician, I appreciate that AMMAMA Foods explicitly lists the exact gram weights of each ingredient right on the label instead of keeping it a mystery formula. The raw Sidr honey is also authentic, unheated, and of highest purity.',
  },
  {
    id: 'rev-03',
    name: 'Hamza Zubair',
    city: 'Karachi',
    product: 'A2 Vedic Bilona Desi Ghee',
    rating: 5,
    date: '19 February 2026',
    verified: true,
    comment:
      'Finally, real bilona ghee in Pakistan that smells like village butter from childhood! The granular texture is evidence of genuine slow clarification. Arrived securely packed in heavy bubble wrap via TCS.',
  },
  {
    id: 'rev-04',
    name: 'Nighat Shaheen',
    city: 'Rawalpindi',
    product: 'Terra Herbs-8 (200g)',
    rating: 5,
    date: '04 February 2026',
    verified: true,
    comment:
      'Ordered 2 bottles for my elderly parents. The balance of Methi Dana, Garlic, and Beetroot has helped them maintain steady energy and digestive comfort. Very swift delivery and courteous WhatsApp team.',
  },
  {
    id: 'rev-05',
    name: 'Zeeshan Akhtar',
    city: 'Faisalabad',
    product: 'Organic Moringa Powder',
    rating: 4,
    date: '15 January 2026',
    verified: true,
    comment:
      'Vibrant green color and earthy aroma. You can tell it wasn\'t baked in a high-temperature dryer. Excellent quality and good packaging.',
  },
];

export const FAQ_ITEMS = [
  {
    q: 'How do I take Terra Herbs-8 daily?',
    a: 'Mix 1 level teaspoon (approx. 5 grams) in half a cup of lukewarm water, warm milk, or blend with 1 teaspoon of raw Sidr honey. Take it 20–30 minutes before breakfast on an empty stomach for optimal absorption of active nutrients.',
  },
  {
    q: 'Is Terra Herbs-8 registered and safe?',
    a: 'AMMAMA Foods (Pvt.) Ltd. is a legally incorporated corporate entity registered with the Securities and Exchange Commission of Pakistan under UCI No. 0303557. All our formulations are prepared under strict hygiene standards and comply with PSQCA guidelines. We use 100% whole-food botanical herbs without any synthetic binders or artificial preservatives.',
  },
  {
    q: 'How does Cash on Delivery (COD) and delivery across Pakistan work?',
    a: 'We offer reliable Cash on Delivery (COD) across all cities and towns in Pakistan via our courier partners (TCS, Leopards, and Trax). Orders are typically dispatched within 24 hours from our Islamabad hub and delivered within 2–4 business days. Advance bank transfer (IBFT) is also accepted.',
  },
  {
    q: 'Can I order directly via WhatsApp?',
    a: 'Yes! You can click "Order via WhatsApp" on any product card or in your shopping cart. It pre-populates your order summary, items, and total in PKR so our customer service team can confirm your shipping details immediately.',
  },
  {
    q: 'What is your return and refund policy?',
    a: 'We offer a 7-day hassle-free return and replacement policy for any unopened products with intact tamper-proof safety seals. If a package arrives damaged in transit, we dispatch a fresh replacement free of charge upon receiving a photo of the damaged carton.',
  },
];
