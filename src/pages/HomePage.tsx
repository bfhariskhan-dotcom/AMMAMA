import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Check,
  ArrowRight,
  Sparkles,
  Leaf,
  Scale,
  Award,
  Users,
  Compass,
  CheckCircle2,
  MessageCircle,
  ShoppingBag,
  Star,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  ArrowUpRight,
} from 'lucide-react';
import { PageTab, Product, ReviewItem } from '../types';
import {
  COMPANY_INFO,
  CORE_VALUES,
  STRATEGIC_GOALS,
  PRODUCTS,
  BRAND_ASSETS,
  REVIEWS,
} from '../data/companyData';

interface HomePageProps {
  setActiveTab: (tab: PageTab) => void;
  onOpenSingleProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onShowToast: (msg: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  setActiveTab,
  onOpenSingleProduct,
  onAddToCart,
  onShowToast,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedHerb, setSelectedHerb] = useState<number>(0);
  const [testimonialSlide, setTestimonialSlide] = useState(0);

  const terraHerbs = PRODUCTS.find((p) => p.id === 'terra-herbs-8') || PRODUCTS[0];
  const sidrHoney = PRODUCTS.find((p) => p.id === 'organic-sidr-honey') || PRODUCTS[1];

  // Hero Banners Slider - STRICTLY NO PRICING in banners as requested
  const slides = [
    {
      id: 1,
      tag: 'Flagship Formulation · 200g Whole-Plant Jar',
      title: 'Pure Botanical Synergy. Nature’s Ultimate Defense.',
      subtitle:
        'Terra Herbs-8 is AMMAMA’s breakthrough compound, formulated with eight standardized therapeutic herbs and five essential bio-available minerals to support cellular balance and daily vitality.',
      image: BRAND_ASSETS.terraHerbsJar,
      ctaText: 'Explore Terra Herbs-8',
      ctaAction: () => onOpenSingleProduct(terraHerbs),
      secondaryText: 'View All Formulations',
      secondaryAction: () => {
        setActiveTab('products');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },
    {
      id: 2,
      tag: 'Single-Origin Potohar Harvest · 100% Raw',
      title: 'Unpasteurized Wild Berry Sidr Honey',
      subtitle:
        'Harvested by generational beekeepers across the ancient Potohar plateau. Cold-extracted to safeguard live botanical enzymes, bee pollen, and soothing antioxidants.',
      image: BRAND_ASSETS.sidrHoney,
      ctaText: 'Discover Raw Sidr Honey',
      ctaAction: () => onOpenSingleProduct(sidrHoney),
      secondaryText: 'Explore Organic Pantry',
      secondaryAction: () => {
        setActiveTab('products');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },
    {
      id: 3,
      tag: 'Regenerative Agriculture · Certified Organic Terroir',
      title: 'From Pakistani Soil to Sealed Glass Jars',
      subtitle:
        'Direct contract farming with smallholder growers across Chakwal and Punjab. 100% non-GMO, zero chemical pesticides, and strict laboratory testing for heavy metals.',
      image: BRAND_ASSETS.farmHarvest,
      ctaText: 'Read Botanical Research',
      ctaAction: () => {
        setActiveTab('events');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      secondaryText: 'Our Quality Charter',
      secondaryAction: () => {
        setActiveTab('contact');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },
  ];

  // Auto-advance banner slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Testimonials Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialSlide((prev) => (prev + 1) % REVIEWS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const herbDetails = [
    { name: 'Garlic', amount: '30 Grams', urdu: 'Lehsan', desc: 'Concentrated natural allicin that fortifies immune defense and cardiovascular tone.' },
    { name: 'Ginger', amount: '25 Grams', urdu: 'Adrak', desc: 'Therapeutic gingerols that ease digestive discomfort and soothe systemic inflammation.' },
    { name: 'Turmeric', amount: '10 Grams', urdu: 'Haldi', desc: 'Standardized natural curcumin for cellular antioxidant defense and joint vitality.' },
    { name: 'Black Pepper', amount: '15 Grams', urdu: 'Kaali Mirch', desc: 'Piperine matrix that amplifies active curcumin bioavailability by up to 20-fold.' },
    { name: 'Beet Root', amount: '20 Grams', urdu: 'Chukandar', desc: 'Natural organic nitrates supporting arterial dilation, endurance, and blood flow.' },
    { name: 'Chia Seeds', amount: '30 Grams', urdu: 'Tukhm-e-Sharbati', desc: 'Dense Omega-3 ALA fatty acids and soothing soluble dietary fiber.' },
    { name: 'Kalonji', amount: '35 Grams', urdu: 'Black Seed', desc: 'Thymoquinone-rich prophetic seed for metabolic balance and deep vitality.' },
    { name: 'Methi Dana', amount: '35 Grams', urdu: 'Fenugreek', desc: 'Soluble galactomannans supporting balanced glucose metabolism and healthy lipid profiles.' },
  ];

  const minerals = ['Potassium', 'Magnesium', 'Manganese', 'Calcium', 'Iron'];

  return (
    <div className="space-y-24 pb-20 text-left">
      {/* 1. CINEMATIC FULL-WIDTH BANNER SLIDER (STRICTLY NO PRICING) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F2EFE8] via-[#FAF9F5] to-[#FAF9F5] border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center min-h-[460px]">
            {/* Slide Text Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border border-stone-300/80 rounded-full text-xs font-semibold text-[#155D27] shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#155D27] animate-pulse" />
                <span>{slides[currentSlide].tag}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0D3818] leading-[1.14]">
                {slides[currentSlide].title}
              </h1>

              <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-xl">
                {slides[currentSlide].subtitle}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  onClick={slides[currentSlide].ctaAction}
                  className="px-6 py-3.5 bg-[#155D27] hover:bg-[#1C7A38] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <span>{slides[currentSlide].ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={slides[currentSlide].secondaryAction}
                  className="px-6 py-3.5 bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow-2xs"
                >
                  <span>{slides[currentSlide].secondaryText}</span>
                </button>
              </div>

              {/* Slider Dots & Arrow Navigation */}
              <div className="flex items-center gap-4 pt-4 text-xs text-stone-500">
                <div className="flex items-center gap-2">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        currentSlide === idx ? 'w-8 bg-[#155D27]' : 'w-2.5 bg-stone-300 hover:bg-stone-400'
                      }`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-1 pl-4 border-l border-stone-300">
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
                    className="p-1.5 rounded-full hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                    className="p-1.5 rounded-full hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Slide Visual Presentation */}
            <div className="lg:col-span-5 flex justify-center">
              <div
                onClick={slides[currentSlide].ctaAction}
                className="relative max-w-md w-full bg-white rounded-3xl p-5 shadow-xl border border-stone-200/90 group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl bg-[#F4EFE6] aspect-4/3 flex items-center justify-center">
                  <img
                    src={slides[currentSlide].image}
                    alt={slides[currentSlide].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
                  />
                  <div className="absolute top-3 left-3 bg-[#155D27] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                    Pure & Natural
                  </div>
                </div>

                <div className="mt-4 p-1 flex items-center justify-between text-xs text-stone-700">
                  <span className="font-serif font-bold text-stone-900 text-sm">
                    {slides[currentSlide].tag.split('·')[0]}
                  </span>
                  <span className="text-[#155D27] font-semibold flex items-center gap-1">
                    <span>View Product</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORPORATE TRUST & GUARANTEE STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-2xs text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#155D27] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <strong className="block text-stone-900 font-serif text-sm">SECP Registered</strong>
              <span className="text-stone-500 text-[11px]">UCI: 0303557 (Sec 16)</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#155D27] flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <strong className="block text-stone-900 font-serif text-sm">PSQCA Aligned</strong>
              <span className="text-stone-500 text-[11px]">Zero Synthetic Fillers</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#155D27] flex items-center justify-center shrink-0">
              <Star className="w-5 h-5 text-[#C28E3A] fill-current" />
            </div>
            <div>
              <strong className="block text-stone-900 font-serif text-sm">4.8 / 5.0 Rating</strong>
              <span className="text-stone-500 text-[11px]">340+ Verified Buyers</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#155D27] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <strong className="block text-stone-900 font-serif text-sm">Nationwide COD</strong>
              <span className="text-stone-500 text-[11px]">Direct Courier Delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED FLAGSHIP SPOTLIGHT (TERRA HERBS-8) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 lg:p-12 border border-stone-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C28E3A]">
              Flagship Innovation · 200 Grams
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0D3818] tracking-tight">
              Terra Herbs-8
            </h2>
            <p className="text-stone-500 italic text-sm">A Protective Natural Herbs Formula</p>

            <p className="text-stone-700 text-sm leading-relaxed">
              Formulated to counter modern metabolic and oxidative stressors. A golden, coarse, aromatic herbal powder compounded from 8 whole botanical plants, enriched with five vital natural minerals.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-1 text-xs text-stone-700">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <strong className="block text-stone-900 font-serif">8 Active Herbs</strong>
                <span className="text-[11px] text-stone-500">Garlic, Kalonji, Ginger, etc.</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <strong className="block text-stone-900 font-serif">5 Vital Minerals</strong>
                <span className="text-[11px] text-stone-500">Potassium, Magnesium, Iron, etc.</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onOpenSingleProduct(terraHerbs)}
                className="px-6 py-3.5 bg-[#155D27] hover:bg-[#1C7A38] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-all shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <span>View Complete Product Page</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onAddToCart(terraHerbs, 1)}
                className="px-5 py-3.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Quick Add to Cart
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <div
              onClick={() => onOpenSingleProduct(terraHerbs)}
              className="relative max-w-md w-full bg-[#FAF9F5] rounded-3xl p-6 border border-stone-200/80 aspect-square flex items-center justify-center cursor-pointer group"
            >
              <img
                src={BRAND_ASSETS.terraHerbsJar}
                alt="Terra Herbs-8 Jar"
                className="w-full h-full object-contain group-hover:scale-104 transition-transform duration-500"
              />
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-xs text-[#155D27] text-xs font-bold px-3 py-1 rounded-full border border-stone-200 shadow-2xs">
                Net Wt: 200g
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE 8 INGREDIENTS INTERACTIVE SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#155D27] text-white rounded-3xl p-8 lg:p-12 overflow-hidden shadow-xl space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-emerald-800/80 pb-8">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#E6C687] font-bold">
                Unlock the Power of Natural Ingredients
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
                The 8 Botanical Ingredients of Terra Herbs-8
              </h2>
              <p className="text-emerald-100 text-sm leading-relaxed">
                Click any botanical below to inspect its exact gram weight and clinical synergistic role in the formulation.
              </p>
            </div>

            <div className="text-left md:text-right">
              <span className="text-[11px] text-emerald-200 uppercase tracking-wider block">Formula Standard</span>
              <span className="font-serif text-lg font-bold text-[#E6C687]">100% Whole-Plant Matrix</span>
            </div>
          </div>

          {/* Flatlay Media & Interactive Ingredients Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Flatlay Photography Box */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-emerald-700/60 aspect-4/3 shadow-md group">
              <img
                src={BRAND_ASSETS.ingredientsFlatlay}
                alt="8 Natural Herbs in ceramic bowls with mortar and pestle"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-xs text-white flex justify-between items-center">
                <span className="font-serif italic font-medium">Artisanal Whole Harvest</span>
                <span className="font-mono text-[11px] text-[#E6C687]">Net Wt. 200g</span>
              </div>
            </div>

            {/* Interactive Ingredients List */}
            <div className="lg:col-span-7 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {herbDetails.map((herb, idx) => {
                  const isSelected = selectedHerb === idx;
                  return (
                    <button
                      key={herb.name}
                      onClick={() => setSelectedHerb(idx)}
                      className={`p-3 rounded-xl text-left transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-white text-[#155D27] border-white shadow-md scale-102 font-bold'
                          : 'bg-[#1C7A38]/40 text-stone-100 border-[#248A46] hover:bg-[#1C7A38]/70'
                      }`}
                    >
                      <span className="block text-[10px] uppercase tracking-wider opacity-75">
                        {herb.urdu}
                      </span>
                      <span className="font-serif text-sm block mt-0.5">
                        {herb.name}
                      </span>
                      <span className="font-mono text-xs font-semibold mt-1 block">
                        {herb.amount}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Selected Herb Deep Dive Callout */}
              <div className="bg-[#0D3818] p-6 rounded-2xl border border-emerald-800/80 space-y-3">
                <div className="flex items-baseline justify-between border-b border-emerald-900 pb-2">
                  <div>
                    <span className="text-[10px] text-[#E6C687] uppercase tracking-wider font-semibold">
                      Selected Botanical Component
                    </span>
                    <h4 className="font-serif text-xl font-bold text-white">
                      {herbDetails[selectedHerb].name} ({herbDetails[selectedHerb].amount})
                    </h4>
                  </div>
                  <span className="text-xs text-emerald-300 italic">
                    Local Name: {herbDetails[selectedHerb].urdu}
                  </span>
                </div>

                <p className="text-xs text-emerald-100 leading-relaxed">
                  {herbDetails[selectedHerb].desc}
                </p>

                {/* Mineral Enrichment List */}
                <div className="pt-2">
                  <span className="text-[11px] font-semibold text-[#E6C687] block mb-2">
                    Enriched with Bio-Available Minerals:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {minerals.map((m) => (
                      <span
                        key={m}
                        className="px-2.5 py-0.5 bg-[#1C7A38]/60 text-stone-100 text-xs rounded-full border border-[#248A46] font-medium"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CURATED BOUTIQUE STORE (CARDS OPEN SINGLE PRODUCT PAGE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#C28E3A]">
              100% Traceable Botanicals
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#0D3818] mt-1">
              Curated Organic Store
            </h2>
          </div>
          <button
            onClick={() => {
              setActiveTab('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-semibold text-[#155D27] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div
                onClick={() => onOpenSingleProduct(prod)}
                className="relative bg-[#FAF9F5] aspect-square overflow-hidden flex items-center justify-center p-4 cursor-pointer"
              >
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-104"
                />
                {prod.badge && (
                  <div className="absolute top-3 left-3 bg-[#155D27] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                    {prod.badge}
                  </div>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div onClick={() => onOpenSingleProduct(prod)} className="cursor-pointer">
                  <div className="flex justify-between items-baseline text-[11px] text-stone-500 mb-1">
                    <span className="uppercase tracking-wider font-semibold text-[#C28E3A]">
                      {prod.weight}
                    </span>
                    <span className="text-emerald-700 font-medium">100% Pure</span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-[#155D27] transition-colors line-clamp-1">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-2 mt-1">
                    {prod.shortDescription}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-100 space-y-2.5">
                  <div className="flex justify-between items-baseline">
                    <span className="font-serif text-xl font-bold text-[#155D27]">
                      PKR {prod.price.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-stone-400">Cash on Delivery</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onOpenSingleProduct(prod)}
                      className="py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg transition-colors text-center cursor-pointer"
                    >
                      Product Page
                    </button>
                    <button
                      onClick={() => onAddToCart(prod, 1)}
                      className="py-2.5 bg-[#155D27] hover:bg-[#1C7A38] text-white text-xs font-semibold rounded-lg transition-colors text-center cursor-pointer shadow-xs"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. SLIDING TESTIMONIALS CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF9F5] rounded-3xl p-8 lg:p-12 border border-stone-200 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <div className="flex items-center gap-1 text-[#C28E3A] mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <span className="text-xs font-bold font-mono text-stone-800 ml-1.5">
                  4.8 / 5.0 Rating (340+ Reviews)
                </span>
              </div>
              <h2 className="font-serif text-3xl font-bold text-[#0D3818]">
                What Our Customers Say
              </h2>
            </div>

            {/* Testimonials Slider Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setTestimonialSlide((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1))
                }
                className="p-2 rounded-full bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 transition-colors cursor-pointer shadow-2xs"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTestimonialSlide((prev) => (prev + 1) % REVIEWS.length)}
                className="p-2 rounded-full bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 transition-colors cursor-pointer shadow-2xs"
                aria-label="Next review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Testimonial Card Display */}
          <div className="relative bg-white p-8 sm:p-10 rounded-3xl border border-stone-200/90 shadow-sm transition-all duration-300">
            <div className="max-w-3xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[#C28E3A]">
                  {[...Array(REVIEWS[testimonialSlide].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full font-semibold border border-emerald-100">
                  Verified Buyer
                </span>
              </div>

              <blockquote className="font-serif text-lg sm:text-2xl text-stone-800 italic leading-relaxed">
                "{REVIEWS[testimonialSlide].comment}"
              </blockquote>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <div>
                  <strong className="text-stone-900 block font-serif text-base font-bold">
                    {REVIEWS[testimonialSlide].name}
                  </strong>
                  <span>{REVIEWS[testimonialSlide].city}, Pakistan</span>
                </div>
                <span className="text-[#155D27] font-semibold text-xs font-mono">
                  {REVIEWS[testimonialSlide].product}
                </span>
              </div>
            </div>

            {/* Testimonials Indicator Dots */}
            <div className="flex items-center gap-1.5 pt-6">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialSlide(i)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    testimonialSlide === i ? 'w-6 bg-[#155D27]' : 'w-2 bg-stone-300'
                  }`}
                  aria-label={`Review ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. POTOHAR FARM SOURCING & TERROIR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 lg:p-12 border border-stone-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C28E3A]">
              Potohar & Punjab Terroir
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0D3818]">
              Direct Sourcing from Pakistani Soil
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              We contract directly with smallholder farmers across Potohar, Chakwal, and Southern Punjab. We provide non-GMO organic seeds, soil health testing, and fair-wage off-take agreements.
            </p>

            <div className="space-y-2 text-xs text-stone-700 pt-1">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Zero synthetic pesticides, glyphosate, or chemical fertilizers</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Empowering rural women agricultural cooperatives through fair direct pay</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Shade-drying and cold stone milling below 38°C to preserve live enzymes</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setActiveTab('events');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-semibold text-[#155D27] hover:underline flex items-center gap-1.5 cursor-pointer"
              >
                <span>Read our Agricultural Case Studies</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden aspect-16/10 shadow-lg border border-stone-200">
              <img
                src={BRAND_ASSETS.farmHarvest}
                alt="Organic herbal farm at sunrise"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs flex justify-between items-center">
                <span className="font-serif font-medium">Model Farm · Potohar Valley</span>
                <span className="font-mono text-[11px] text-[#E6C687]">Regenerative Agriculture</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CORPORATE CHARTER & SECP REGISTRATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF9F5] rounded-3xl p-8 lg:p-12 border border-stone-200 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C28E3A]">
                Corporate Legal Identity
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#0D3818]">
                AMMAMA Foods (Pvt.) Ltd.
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Registered with the Securities and Exchange Commission of Pakistan under <strong>Corporate Unique Identity No. 0303557</strong>, pursuant to Section 16 of the Companies Act-2017 on <strong>4th August 2025</strong>.
              </p>
            </div>

            <button
              onClick={() => {
                setActiveTab('governance');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-2.5 bg-white border border-stone-300 rounded-lg text-xs font-semibold text-[#155D27] hover:bg-stone-50 transition-colors shadow-2xs self-start md:self-auto cursor-pointer"
            >
              Verify SECP Credentials
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-stone-200">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-2">
              <Compass className="w-5 h-5 text-[#C28E3A]" />
              <h4 className="font-serif font-bold text-base text-stone-900">Our Vision</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                To be Pakistan’s most trusted name in organic food & herbal wellness, bringing nature's healing wisdom to every home.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-2">
              <Leaf className="w-5 h-5 text-[#C28E3A]" />
              <h4 className="font-serif font-bold text-base text-stone-900">Our Mission</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                To prepare & preserve pure organic foods, herbs, and wellness products with integrity and care for healthier lives.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-2">
              <Award className="w-5 h-5 text-[#C28E3A]" />
              <h4 className="font-serif font-bold text-base text-stone-900">Quality Charter</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Every batch follows strict PSQCA compliance, batch testing, transparent gram weights, and zero synthetic fillers.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
