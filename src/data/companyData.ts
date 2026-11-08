import { Product, JobPosition, ResearchItem, CompanyEvent, ReviewItem } from '../types';

export const COMPANY_INFO = {
  legalName: 'AMMAMA FOODS (PVT.) LTD.',
  shortName: 'AMMAMA Foods',
  tagline: 'Healthy Herbs, Healthier You',
  uci: '0303557',
  secpAct: 'Section 16 of the Companies Act-2017',
  incorporationDate: '4th August 2025',
  registrationAuthority: 'Securities and Exchange Commission of Pakistan (SECP)',
  phone: '+92 300 0303557',
  whatsapp: '923000303557',
  email: 'info@ammamafoods.com',
  corporateEmail: 'corporate@ammamafoods.com',
  headOffice: 'Plot 14-B, Executive Botanical Park, Sector I-9/3, Industrial Area, Islamabad, Pakistan',
  regionalOffice: 'Commercial Boulevard, Phase 6, DHA, Lahore, Pakistan',
  packagingFacility: 'Hattar Industrial Estate, Phase 3, Khyber Pakhtunkhwa, Pakistan',
  vision:
    'To be Pakistan’s most trusted name in organic food & herbal wellness, bringing the healing wisdom of nature to every home and growing into a respected regional brand.',
  mission:
    'To prepare & preserve pure organic foods, herbs and wellness products with integrity and care, so that our customers can live healthier, and more balanced lives.',
};

export const BRAND_ASSETS = {
  terraHerbsJar: '/src/assets/images/terra_herbs_8_product_jar_1794049278896.jpg',
  ingredientsFlatlay: '/src/assets/images/eight_herbal_ingredients_flatlay_1794049280091.jpg',
  farmHarvest: '/src/assets/images/organic_botanical_farm_harvest_1794049280997.jpg',
  sidrHoney: '/src/assets/images/product_organic_sidr_honey_1794047490604.jpg',
  moringaPowder: '/src/assets/images/product_moringa_powder_jar_1794047490765.jpg',
  desiGhee: '/src/assets/images/product_desi_ghee_jar_1794047491328.jpg',
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
    price: 1950,
    weight: '200 grams',
    image: '/src/assets/images/terra_herbs_8_product_jar_1794049278896.jpg',
    badge: 'Flagship Formulation',
    isFlagship: true,
    shortDescription:
      'Scientifically proportioned 8-herb compound formula crafted to boost metabolic resilience, immune protection, and cellular vitality.',
    fullDescription:
      'Terra Herbs-8 is AMMAMA Foods\' flagship protective botanical compound. Formulated through precise herbal synergy, it blends eight potent therapeutic herbs into a golden, aromatic coarse powder. Designed to support cardiac wellness, digestion, natural detoxification, and daily energy without any synthetic binders or artificial preservatives.',
    benefits: [
      'Fortifies innate immune defenses against seasonal and environmental stressors',
      'Supports healthy blood circulation, arterial elasticity, and cellular vitality',
      'Naturally aids digestive motility and gut microbiome balance',
      'Enriched with essential bio-available minerals: Potassium, Magnesium, Manganese, Calcium, and Iron',
      'Contains 100% natural, whole-plant active compounds with zero chemical additives',
    ],
    composition: [
      { ingredient: 'Garlic', amount: '30 Grams', localName: 'Lehsan', role: 'Rich in allicin; supports cardiovascular wellness & immune defense' },
      { ingredient: 'Ginger', amount: '25 Grams', localName: 'Adrak', role: 'Potent gingerols that aid digestion and soothe systemic inflammation' },
      { ingredient: 'Turmeric', amount: '10 Grams', localName: 'Haldi', role: 'Standardized curcumin for cellular antioxidant protection' },
      { ingredient: 'Black Pepper', amount: '15 Grams', localName: 'Kaali Mirch', role: 'Piperine activates up to 2000% enhanced curcumin absorption' },
      { ingredient: 'Beet Root', amount: '20 Grams', localName: 'Chukandar', role: 'Natural dietary nitrates support nitric oxide and blood flow' },
      { ingredient: 'Chia Seeds', amount: '30 Grams', localName: 'Tukhm-e-Sharbati', role: 'Rich plant-based Omega-3 fatty acids and soluble dietary fiber' },
      { ingredient: 'Kalonji', amount: '35 Grams', localName: 'Black Seed', role: 'Thymoquinone-dense miracle herb for cellular immunity' },
      { ingredient: 'Methi Dana', amount: '35 Grams', localName: 'Fenugreek', role: 'Balances glucose metabolism and supports lipid profiles' },
    ],
    enrichedWith: ['Potassium', 'Magnesium', 'Manganese', 'Calcium', 'Iron'],
    directions:
      'Take 1 level teaspoon (approx. 5g) daily. Mix in half a cup of warm water, skimmed milk, or blend with pure raw honey 20 minutes before breakfast.',
    inStock: true,
  },
  {
    id: 'organic-sidr-honey',
    name: 'Wild Potohar Sidr Honey',
    subtitle: '100% Raw Unpasteurized Berry Nectar',
    category: 'honey',
    price: 2450,
    weight: '500 grams',
    image: '/src/assets/images/product_organic_sidr_honey_1794047490604.jpg',
    badge: 'Single-Origin Harvest',
    shortDescription:
      'Pure single-origin Sidr (Beri) honey harvested from wild Ziziphus blossoms across the pristine Potohar plateau.',
    fullDescription:
      'Harvested sustainably by traditional beekeepers without heat processing or ultra-filtration, retaining all live enzymes, bee pollen, and propolis. Possesses a deep golden hue, velvety consistency, and a distinctive warm caramel note.',
    benefits: [
      'Natural antibacterial and antimicrobial enzyme matrix',
      'Provides sustained, clean morning vitality and respiratory soothing',
      'Zero sugar adulteration, corn syrup, or artificial feeding',
      'Lab-tested for diastase activity and pollen purity',
    ],
    directions:
      'Consume 1 tablespoon in the morning with lukewarm water, or drizzle over natural oats and yoghurt.',
    inStock: true,
  },
  {
    id: 'moringa-leaf-powder',
    name: 'Organic Moringa Powder',
    subtitle: 'Pure Shade-Dried Drumstick Leaf',
    category: 'superfood',
    price: 1250,
    weight: '150 grams',
    image: '/src/assets/images/product_moringa_powder_jar_1794047490765.jpg',
    badge: 'Nutrient Dense',
    shortDescription:
      'Cold shade-dried and micro-milled organic Moringa Oleifera leaves packed with plant protein, vitamins, and chlorophyll.',
    fullDescription:
      'Sourced directly from certified pesticide-free farms in Southern Punjab. Gently washed in purified water and shade-dried below 38°C to safeguard heat-sensitive antioxidants, vitamins A, C, and E, and essential amino acids.',
    benefits: [
      'Contains 7x more Vitamin C than oranges and 4x more Calcium than milk',
      'Fights fatigue and boosts mental alertness naturally without caffeine',
      'Supports healthy lactation and post-partum recovery',
    ],
    directions:
      'Stir half a teaspoon into green smoothies, fresh citrus juices, or warm herbal infusions.',
    inStock: true,
  },
  {
    id: 'desi-cow-ghee',
    name: 'A2 Vedic Bilona Desi Ghee',
    subtitle: 'Hand-Churned Cultured Butter Ghee',
    category: 'ghee',
    price: 2850,
    weight: '450 grams',
    image: '/src/assets/images/product_desi_ghee_jar_1794047491328.jpg',
    badge: 'Traditional Bilona',
    shortDescription:
      'Traditional bilona ghee slow-clarified over earthen flame from whole cultured curd of indigenous grass-fed Sahiwal cows.',
    fullDescription:
      'Prepared strictly following the timeless bilona method: fresh milk is boiled, curdled into natural yogurt, hand-churned with a wooden churner (Madhaani) to isolate makkhan (butter), and then gently simmered on low firewood to yield fragrant, granular golden nectar.',
    benefits: [
      'Rich in natural Butyric acid supporting intestinal mucosal integrity',
      'Free from rBST hormones, chemical neutralizers, or palm oil adulteration',
      'High smoke point ideal for wholesome family cooking and medicinal tonics',
    ],
    directions:
      'Use 1-2 teaspoons atop warm daal, parathas, or enjoy with warm milk at bedtime for restful sleep.',
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
