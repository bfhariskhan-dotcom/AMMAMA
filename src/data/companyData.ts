import { Product, CategoryItem, JobPosition, ResearchItem, CompanyEvent, ReviewItem } from '../types';
import ingredientsFlatlayImg from '../assets/images/eight_herbal_ingredients_flatlay_1794049280091.jpg';
import farmHarvestImg from '../assets/images/organic_botanical_farm_harvest_1794049280997.jpg';
import cholistanGheeImg from '../assets/images/cholestan_desi_ghee_1794594853855.jpg';

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
  ingredientsFlatlay: ingredientsFlatlayImg,
  farmHarvest: farmHarvestImg,
  karakHoney: 'https://i.postimg.cc/D08J1jfs/Pure-Beiry-Nector-Honey-of-Karak.jpg',
  cholistanGhee: cholistanGheeImg,
  mudanyaOliveOil: 'https://i.postimg.cc/C5zBbPMJ/Mudanya-Olive-Oil-Price-10800-free-delivery.png',
  mudanyaInf: 'https://i.postimg.cc/VvdrXGsD/Mudanya-Olive-Oil-inf.png',
  mundialOliveOil: 'https://i.postimg.cc/ZnCB67YF/Mundial-Olive-Oil-price-10500-free-delivery.png',
  mundialBp: 'https://i.postimg.cc/rsK05nyN/Mundial-Olive-Oil-bp.png',
  pomaceOliveOil: 'https://i.postimg.cc/3Nd42SrZ/Pomace-Olive-Oil-price-9200-free-delivery.png',
  pomaceBp: 'https://i.postimg.cc/Fz7d0WFZ/Pomace-Olive-Oil-bp.png',
};

export const DEFAULT_CATEGORIES: CategoryItem[] = [
  { id: 'formula', name: 'Flagship Herbal Formula', description: 'Protective 8-Herb & Mineral Blends', order: 1 },
  { id: 'honey', name: 'Pure Berry Honey - Karak', description: 'Wild Unheated Sidr & Berry Nectar Honey', order: 2 },
  { id: 'ghee', name: 'Cholistan Desi Ghee', description: 'Authentic Bilona Cultured Desi Ghee', order: 3 },
  { id: 'olive-oil', name: 'Imported Olive Oils', description: 'Turkish & Spanish Extra Virgin and Pomace Oils', order: 4 },
];

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
      'We are open about pure botanical ingredients, ethical sourcing origins, processing methods, fair pricing, and clean corporate governance.',
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
    sku: 'AMM-TH8-200G',
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
    images: [BRAND_ASSETS.terraHerbsJar],
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
        localName: 'Lehsan',
        role: 'Natural antibacterial that fights infections, lowers bad cholesterol to support healthy heart function, and aids in weight management.',
      },
      {
        ingredient: 'Ginger',
        localName: 'Adrak',
        role: 'With natural ginseng properties, improves male vitality by enhancing blood circulation, soothes gut digestion, and reduces inflammation.',
      },
      {
        ingredient: 'Kalwanji',
        localName: 'Black Seed',
        role: 'Traditional remedy for general wellness, sustains healthy blood glucose levels, and supports respiratory and cellular health.',
      },
      {
        ingredient: 'Chia Seeds',
        localName: 'Tukhm-e-Sharbati',
        role: 'Packed with plant omega-3 fatty acids, fiber, and protein. Regulates digestion and provides sustained natural energy.',
      },
      {
        ingredient: 'Methi Dana',
        localName: 'Fenugreek',
        role: 'Improves digestion, supports healthy glucose metabolism, and helps sustain balanced endocrine function.',
      },
      {
        ingredient: 'Beetroot',
        localName: 'Chukandar',
        role: 'Rich in dietary nitrates and antioxidants; promotes healthy blood flow, cardiovascular elasticity, and natural stamina.',
      },
      {
        ingredient: 'Turmeric',
        localName: 'Haldi',
        role: 'High-potency curcuminoids combat chronic inflammation, support joint flexibility, and promote skin vitality.',
      },
      {
        ingredient: 'Black Pepper',
        localName: 'Kaali Mirch',
        role: 'Piperine content multiplies nutrient and curcumin bioavailability by 20-fold while supporting respiratory and digestive wellness.',
      },
    ],
    enrichedWith: ['Potassium', 'Magnesium', 'Manganese', 'Calcium', 'Iron'],
    directions:
      'Recommended use: 1 teaspoon twice daily (morning & evening) stirred into warm water, green tea, or your favorite beverage. Patients with minor symptoms can use once daily in the morning. Best taken after meals for at least 3 months for long-term health revitalization.',
    inStock: true,
    createdAt: 1,
  },
  {
    id: 'pure-beiry-nectar-honey',
    name: 'Pure Berry Honey - Karak',
    subtitle: 'Wild Sidr (Beri) Nectar Harvest',
    category: 'honey',
    packagingType: 'Jar',
    price: 2200,
    weight: '500 grams',
    sku: 'AMM-KHK-500G',
    delivery: 'Free',
    variants: [
      { id: 'hny-500g', packagingType: 'Jar', weight: '500 grams', price: 2200, delivery: 'Free' },
      { id: 'hny-1000g', packagingType: 'Jar', weight: '1000 grams', price: 4300, delivery: 'Free' },
    ],
    image: BRAND_ASSETS.karakHoney,
    images: [BRAND_ASSETS.karakHoney],
    badge: 'Free Delivery · Wild Karak',
    shortDescription:
      'Unpasteurized Pure Berry Honey - Karak ethically harvested from wild Sidr (Beri) forests of Karak, Khyber Pakhtunkhwa.',
    fullDescription:
      'Pure Berry Honey - Karak is gathered directly from natural bee hives situated in the arid wild flora of Karak. Never subjected to industrial heat or micro-filtration, it retains active bio-enzymes, bee pollen, propolis, and an exquisite butterscotch caramel profile with potent immune-boosting and soothing properties.',
    benefits: [
      'Wild forest harvested from pristine Sidr (Ziziphus) trees in Karak',
      '100% raw, unheated, unfiltered with intact bee pollen and enzymes',
      'Free Nationwide Delivery across Pakistan included',
      'Clinically recognized for respiratory comfort and stomach ulcer relief',
    ],
    directions: 'Take 1-2 teaspoons directly every morning on an empty stomach, or mix into lukewarm water or herbal tea.',
    inStock: true,
    createdAt: 2,
  },
  {
    id: 'cholestan-pure-desi-ghee',
    name: 'Cholestan Pure Desi Ghee',
    subtitle: 'Authentic Cultured Bilona Desi Ghee',
    category: 'ghee',
    packagingType: 'Jar',
    price: 2300,
    weight: '500 grams',
    sku: 'AMM-CDG-500G',
    delivery: 'Free',
    variants: [
      { id: 'ghee-500g', packagingType: 'Jar', weight: '500 grams', price: 2300, delivery: 'Free' },
      { id: 'ghee-1000g', packagingType: 'Jar', weight: '1000 grams', price: 4500, delivery: 'Free' },
    ],
    image: BRAND_ASSETS.cholistanGhee,
    images: [BRAND_ASSETS.cholistanGhee],
    badge: 'Free Delivery · Golden Daana',
    shortDescription:
      'Slow-clarified traditional Desi Ghee from fresh cultured makhan of indigenous grazing cows in the Cholistan desert.',
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
    createdAt: 3,
  },
  {
    id: 'mudanya-sizma-olive-oil',
    name: 'Mudanya Extra Virgin Olive Oil',
    subtitle: 'Turkish SIZMA First Cold-Pressed (5L)',
    category: 'olive-oil',
    packagingType: 'Tin',
    price: 10800,
    weight: '5 Liter',
    sku: 'AMM-MDN-5L',
    delivery: 'Free',
    variants: [
      { id: 'mud-5l', packagingType: 'Tin', weight: '5 Liter', price: 10800, delivery: 'Free' },
      { id: 'mud-1000ml', packagingType: 'Glass bottle', weight: '1000 ml', price: 3600, delivery: 'Free' },
    ],
    image: BRAND_ASSETS.mudanyaOliveOil,
    images: [BRAND_ASSETS.mudanyaOliveOil, BRAND_ASSETS.mudanyaInf],
    badge: 'Free Delivery · Turkish Brand',
    shortDescription:
      'Imported Turkish brand Mudanya SIZMA first cold-pressed Extra Virgin Olive Oil in 5 Liter sealed tin with Free Delivery.',
    fullDescription:
      'Mudanya SIZMA is mechanically cold-pressed within hours of harvest along the Mediterranean coast of Turkey. Featuring an ultra-low acidity (<0.8%), vibrant green hue, and pungent peppery finish indicative of high oleocanthal and hydroxytyrosol antioxidants.',
    benefits: [
      'Imported Turkish SIZMA (Extra Virgin) first cold press below 27°C',
      'UV-protected 5 Liter food-grade sealed tin & 1000ml glass bottle options',
      'High concentration of polyphenol antioxidants for heart and cellular health',
      '100% Free Nationwide Delivery across Pakistan',
    ],
    directions: 'Ideal for fresh salads, dipping with artisanal bread, drizzling over hummus, and raw wellness shots.',
    inStock: true,
    createdAt: 4,
  },
  {
    id: 'mundial-olive-oil',
    name: 'Mundial Extra Virgin & Culinary Olive Oil',
    subtitle: 'Premium Spanish Brand Olive Oil (5L)',
    category: 'olive-oil',
    packagingType: 'Tin',
    price: 10500,
    weight: '5 Liter',
    sku: 'AMM-MND-5L',
    delivery: 'Free',
    variants: [
      { id: 'mun-5l', packagingType: 'Tin', weight: '5 Liter', price: 10500, delivery: 'Free' },
      { id: 'mun-1000ml', packagingType: 'Glass Bottle', weight: '1000 ml', price: 3350, delivery: 'Free' },
    ],
    image: BRAND_ASSETS.mundialOliveOil,
    images: [BRAND_ASSETS.mundialOliveOil, BRAND_ASSETS.mundialBp],
    badge: 'Free Delivery · Spanish Brand',
    shortDescription:
      'Premium imported Spanish brand Mundial Olive Oil in 5 Liter family tin canister with complete Free Delivery across Pakistan.',
    fullDescription:
      'Imported directly from Spain, Mundial Olive Oil offers crisp Mediterranean balance and clean culinary versatility. Rich in heart-protective monounsaturated oleic acid and zero cholesterol, trusted for everyday family meals.',
    benefits: [
      'Authentic Spanish imported olive oil with verified purity',
      'Available in economical 5 Liter tin canister and 1000ml glass bottle',
      'Free Nationwide Delivery directly to your home',
      'Zero cholesterol, trans-fat free, and gentle on digestion',
    ],
    directions: 'Best for daily healthy cooking, sautéing, dressings, and warm drizzling.',
    inStock: true,
    createdAt: 5,
  },
  {
    id: 'pomace-olive-oil',
    name: 'Pomace Olive Oil (Spanish Brand)',
    subtitle: 'High Smoke Point Everyday Cooking Olive Oil (5L)',
    category: 'olive-oil',
    packagingType: 'Tin',
    price: 9200,
    weight: '5 Liter',
    sku: 'AMM-PMC-5L',
    delivery: 'Free',
    variants: [
      { id: 'pmc-5l', packagingType: 'Tin', weight: '5 Liter', price: 9200, delivery: 'Free' },
      { id: 'pmc-1000ml', packagingType: 'Glass Bottle', weight: '1000 ml', price: 2950, delivery: 'Free' },
    ],
    image: BRAND_ASSETS.pomaceOliveOil,
    images: [BRAND_ASSETS.pomaceOliveOil, BRAND_ASSETS.pomaceBp],
    badge: 'Free Delivery · High Smoke Point',
    shortDescription:
      'Pure imported Pomace Olive Oil (5 Liter Tin) engineered for high-heat Pakistani frying & karahi cooking with Free Delivery.',
    fullDescription:
      'Crafted specifically for high-heat kitchen cooking, deep frying, and everyday curries without losing monounsaturated olive nutrition. High thermal stability up to 238°C keeps meals light, crisp, and heart-friendly.',
    benefits: [
      'High smoke point (238°C) ideal for deep frying and traditional curries',
      'Light neutral taste preserves authentic desi spice aroma',
      'Heart-healthy monounsaturated fats with zero trans-fat',
      'Free Nationwide Doorstep Delivery included',
    ],
    directions: 'Use cleanly as your daily cooking and frying medium in place of refined vegetable ghee.',
    inStock: true,
    createdAt: 6,
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
      'Curcumin bioavailability is significantly amplified when naturally compounded with black pepper piperine.',
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
      'Standardized dried beetroot botanical powder yields optimal daily dietary nitrates without synthetic spikes.',
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
    product: 'Pure Berry Honey - Karak & Terra Herbs-8',
    rating: 5,
    date: '28 December 2025',
    verified: true,
    comment:
      'As a clinical physician, I appreciate that AMMAMA Foods uses genuine traceable botanical ingredients rather than synthetic fillers. The Pure Berry Honey - Karak is also authentic, unheated, and of the highest purity.',
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
