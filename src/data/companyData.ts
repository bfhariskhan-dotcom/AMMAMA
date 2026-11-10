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
  terraHerbsJar: '/src/assets/images/terra_herbs_8_product_jar_1794049278896.jpg',
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
    price: 1950,
    weight: '200 grams',
    image: '/src/assets/images/terra_herbs_8_product_jar_1794049278896.jpg',
    badge: 'Flagship Formulation',
    isFlagship: true,
    shortDescription:
      'Carefully crafted with 8 vital organic herbs to promote overall health and well-being. Proven efficacy since ancient times, safe for all age groups with zero side effects.',
    fullDescription:
      'AMMAMA Foods Private Ltd offers a unique blend of herbs for its customer overall wellness. Terra Herbs-8 is carefully crafted with 8 vital, organic herbs that promote your overall health and well-being. These herbs have been in use since ancient times to cure various diseases with proven efficacy. The scientific research studies of these herbs have not revealed even a single side effect. Its uses are safe for all age groups to maintain effective functioning of vital human organs including Heart, Lungs, Pancreas, Kidney, and stomach. It also improves hormonal balance to sustain essential minerals needed for human body.',
    benefits: [
      'To regulate sugar level in the blood cell and improve kidney functions.',
      'Improved blood circulation to the heart and other organs. Supportive to burn bad cholesterol to open the blocked veins.',
      'Effective in reducing stomach guts, improving digestion and eliminated constipation.',
      'Improves immunity system to fight against bacterial and seasonal viral infections.',
      'Serve as anti-aging by repairing damage cells and boost energy.',
      'Prevent inflammation in the body to maintain healthy functioning.',
      'Enhance sexual vitality, stamina and performance.',
      'Supportive in managing stress mood and cure sleeping disorders.',
      'Supportive in reducing weight loss to protect from obesity related complications.',
      'Supportive in arthritis to enhance bone density by effectively absorbing calcium.',
    ],
    composition: [
      {
        ingredient: 'Garlic',
        amount: '30 Grams',
        localName: 'Lehsan',
        role: 'Natural antibacterial that fights infections and boosts immune system, helps in lowering bad cholesterol to support healthy heart function, and supportive in weight loss.',
      },
      {
        ingredient: 'Ginger',
        amount: '25 Grams',
        localName: 'Adrak',
        role: 'With natural ginseng properties, improves men sexual health by enhancing blood circulation, supportive in stomach guts, improves digestion, soothes nausea, and powerful anti-inflammatory that reduces pain.',
      },
      {
        ingredient: 'Kalwanji',
        amount: '35 Grams',
        localName: 'Black Seed',
        role: 'Traditionally known as black poison/cure for all diseases due to its immune boosting properties. Supportive in sustaining healthy blood sugar levels, and aids in respiratory health.',
      },
      {
        ingredient: 'Chia Seeds',
        amount: '30 Grams',
        localName: 'Tukhm-e-Sharbati',
        role: 'Packed with omega-3 fatty acids, fiber, and protein. Helps regulate digestion, supports heart health, and provides a natural energy boost.',
      },
      {
        ingredient: 'Methi Dana',
        amount: '35 Grams',
        localName: 'Fenugreek',
        role: 'A powerful herb to improve digestion, reduce cholesterol, and support hormonal balance; a great ally for overall wellness.',
      },
      {
        ingredient: 'Beetroot',
        amount: '20 Grams',
        localName: 'Chukandar',
        role: 'Rich in nitrates and antioxidants; supports healthy blood flow, reduces blood pressure, and enhances sexual stamina and performance.',
      },
      {
        ingredient: 'Turmeric',
        amount: '10 Grams',
        localName: 'Haldi',
        role: 'Known for its potent antioxidant properties; helps combat inflammation, supports joint health, and promotes radiant skin.',
      },
      {
        ingredient: 'Black Pepper',
        amount: '15 Grams',
        localName: 'Kaali Mirch',
        role: 'Enhances bioavailability of turmeric and other nutrients while supporting digestion, detoxification, calcium absorption, and respiratory health.',
      },
    ],
    enrichedWith: ['Potassium', 'Magnesium', 'Manganese', 'Calcium', 'Iron'],
    directions:
      'The recommended use of Terra Herbs-8 is twice a day i-e morning and evening. Simply add 1- teaspoon of Terra Herbs powder to your favorite beverage, drink or mix with water, hot tea of your choice to fuel your day naturally. The dose can be adjusted to health condition, patients with minor symptoms can use it once a day in the morning. To achieve better results, it is recommended to use after meals for at least 3 months.\n\nCaution: The product is for overall wellness and not the replacement of any treatment/therapy in the above-mentioned health conditions. The addition of terra herbs-8 with continued medications can improve health condition, minimize risk levels, and control damage.',
    inStock: true,
  },
  {
    id: 'pure-berry-nectar-karak',
    name: 'Pure Berry Nectar Honey of Karak',
    subtitle: 'Wild Karak Sidr (Beri) Nectar',
    category: 'honey',
    price: 2950,
    weight: '1000 grams',
    image: 'https://i.postimg.cc/D08J1jfs/Pure-Beiry-Nector-Honey-of-Karak.jpg',
    badge: 'Wild Karak Harvest',
    shortDescription:
      'Raw single-origin Sidr berry nectar honey directly harvested from wild Beri mountain flora across the valleys of Karak.',
    fullDescription:
      'Wild Karak Beri honey is unheated, unpasteurized, and 100% pure raw nectar collected from wild Sidr (Ziziphus) trees in the scenic hills of Karak. Naturally abundant in antimicrobial enzymes, trace minerals, and pollen antioxidants with a distinctive smooth, caramel finish.',
    benefits: [
      '100% Raw, unfiltered nectar preserving active digestive and medicinal bio-enzymes',
      'Effective respiratory soother for dry coughs and sore throat',
      'Natural energy booster and safe replacement for refined sugar',
      'Authentic Karak origin with laboratory-verified pollen density',
    ],
    directions:
      'Take 1 tablespoon daily directly or mix with warm water or Terra Herbs-8 for holistic health synergy.',
    inStock: true,
  },
  {
    id: 'cholistan-pure-desi-ghee',
    name: 'Cholistan Pure Desi Ghee',
    subtitle: 'Traditional Pure Cow Desi Ghee',
    category: 'ghee',
    price: 2850,
    weight: '1 kg (1000g)',
    image: 'https://i.postimg.cc/90rRy8X9/Change-name-for-Desi-Ghee-(Cholestan-pure-Desi-Ghee).jpg',
    badge: 'Pure Cholistan',
    shortDescription:
      'Pure, fragrant Desi Ghee slow-clarified from the fresh cultured butter of free-grazing indigenous cows in Cholistan.',
    fullDescription:
      'Prepared through timeless bilona and slow-simmering processes without chemical additives or vegetable oils. Features a distinct granular texture (daana) and golden aroma that enriches traditional Pakistani recipes and medicinal dietary preparations.',
    benefits: [
      'Promotes digestive fire and intestinal mucosal integrity with natural butyric acid',
      'Free from preservatives, palm oil adulteration, or synthetic coloring',
      'High thermal stability perfect for traditional home cooking and pan roasting',
      'Naturally loaded with Fat-Soluble Vitamins A, D, E, and K2',
    ],
    directions:
      'Add 1-2 spoons over warm meals, rotis, or combine with warm milk before sleep for joint and gut vitality.',
    inStock: true,
  },
  {
    id: 'mudanya-olive-oil',
    name: 'Mudanya Extra Virgin Olive Oil',
    subtitle: 'First Cold Pressed Olive Oil',
    category: 'olive-oil',
    price: 10800,
    weight: '5 Liters',
    image: 'https://i.postimg.cc/C5zBbPMJ/Mudanya-Olive-Oil-Price-10800-free-delivery.png',
    badge: 'Free Delivery',
    shortDescription:
      'Superior category first cold-pressed Mediterranean Extra Virgin Olive Oil in a 5 Liter sealed tin with Free Delivery across Pakistan.',
    fullDescription:
      'Mudanya Olive Oil is extracted exclusively by mechanical cold-pressing directly from fresh hand-picked olives. Contains exceptionally low acidity (<0.8%) and a rich polyphenol profile that provides cardiac protection, reduced systemic inflammation, and gourmet culinary flavor.',
    benefits: [
      'First cold-pressed below 27°C with ultra-low natural acidity',
      'Rich in oleic monounsaturated fatty acids and bioavailable polyphenols',
      'Includes Free Nationwide Doorstep Delivery across Pakistan',
      'Sealed in a durable 5L UV-protected food-grade tin canister',
    ],
    directions:
      'Ideal for raw salad dressings, dips, light sauteing, and daily morning wellness spoons.',
    inStock: true,
  },
  {
    id: 'mundial-olive-oil',
    name: 'Mundial Premium Olive Oil',
    subtitle: 'Pure Spanish Cold-Pressed Oil',
    category: 'olive-oil',
    price: 10500,
    weight: '5 Liters',
    image: 'https://i.postimg.cc/ZnCB67YF/Mundial-Olive-Oil-price-10500-free-delivery.png',
    badge: 'Free Delivery',
    shortDescription:
      'World-famous Mundial pure olive oil in a 5 Liter pack with complete Free Nationwide Delivery across Pakistan.',
    fullDescription:
      'Mundial Olive Oil is recognized globally for its harmonious flavor and consistent culinary performance. Extracted from premium sun-drenched olives, delivering a smooth fruity bouquet with exceptional cardiovascular and digestive benefits.',
    benefits: [
      'Premium imported cold-pressed olive oil with a balanced aroma',
      'Free Nationwide Delivery directly to your doorstep',
      'Supports healthy blood pressure, arterial elasticity, and skin hydration',
      'Generous 5 Liter economy size for healthy family nutrition',
    ],
    directions:
      'Versatile for daily cooking, marinades, drizzling over roasted dishes, and healthy baking.',
    inStock: true,
  },
  {
    id: 'pomace-olive-oil',
    name: 'Pomace Olive Oil',
    subtitle: 'Refined Culinary Olive Oil',
    category: 'olive-oil',
    price: 9200,
    weight: '5 Liters',
    image: 'https://i.postimg.cc/3Nd42SrZ/Pomace-Olive-Oil-price-9200-free-delivery.png',
    badge: 'Free Delivery',
    shortDescription:
      'Healthy high-heat cooking, frying, and baking olive oil in a 5 Liter container with Free Delivery nationwide.',
    fullDescription:
      'Pomace Olive Oil offers a high smoke point (238°C) that makes it the optimal healthy alternative to refined palm and vegetable cooking oils. Retains wholesome olive lipid properties while remaining light, odorless, and thermally resilient under demanding frying conditions.',
    benefits: [
      'High thermal smoke point prevents oil breakdown and toxic oxidation during deep frying',
      'Includes 100% Free Nationwide Delivery across Pakistan',
      'Significantly healthier than commercial palm oils or hydrogenated banaspati',
      'Economical 5 Liter bulk size for daily household wellness',
    ],
    directions:
      'Use as your primary everyday cooking oil for gravies, deep frying, roasting, and general culinary preparations.',
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
