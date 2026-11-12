import React, { useState, useEffect, useRef } from 'react';
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
  Truck,
  Box,
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

  const featuredCarouselRef = useRef<HTMLDivElement>(null);
  const powdersCarouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === 'left' ? -340 : 340,
        behavior: 'smooth',
      });
    }
  };

  const terraHerbs = PRODUCTS.find((p) => p.id === 'terra-herbs-8') || PRODUCTS[0];
  const karakHoney = PRODUCTS.find((p) => p.id === 'pure-beiry-nectar-honey') || PRODUCTS[3];
  const mudanyaOil = PRODUCTS.find((p) => p.id === 'mudanya-sizma-olive-oil') || PRODUCTS[5];

  // Hero Banners Slider - Only real user products, strictly NO pricing, full height
  const slides = [
    {
      id: 1,
      title: 'Terra Herbs-8: Nature’s Protective Formula',
      subtitle:
        'Crafted with 8 vital organic herbs and 5 essential minerals. In use since ancient times to protect vital organs, improve circulation, and sustain daily vitality with zero side effects.',
      image: BRAND_ASSETS.terraHerbsJar,
      ctaText: 'Explore Terra Herbs-8',
      ctaAction: () => onOpenSingleProduct(terraHerbs),
      secondaryText: 'View All Products',
      secondaryAction: () => {
        setActiveTab('products');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },
    {
      id: 2,
      title: 'Pure Berry Nectar Honey of Karak',
      subtitle:
        '100% raw, unheated single-origin Sidr berry nectar collected from wild mountain Beri forests across Karak. Naturally rich in active enzymes and soothing antioxidants.',
      image: BRAND_ASSETS.karakHoney,
      ctaText: 'Discover Karak Honey',
      ctaAction: () => onOpenSingleProduct(karakHoney),
      secondaryText: 'Explore Store',
      secondaryAction: () => {
        setActiveTab('products');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },
    {
      id: 3,
      title: 'Mudanya & Mundial Premium Olive Oils (5L)',
      subtitle:
        'First cold-pressed Extra Virgin and culinary olive oils preserved in 5 Liter UV-protected canisters. Low acidity, rich polyphenols, and complete Free Nationwide Delivery.',
      image: BRAND_ASSETS.mudanyaOliveOil,
      ctaText: 'Explore Olive Oils',
      ctaAction: () => {
        setActiveTab('products');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      secondaryText: 'View All Products',
      secondaryAction: () => {
        setActiveTab('products');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },
    {
      id: 4,
      title: 'Cholistan Pure Desi Ghee',
      subtitle:
        'Aromatic traditional Desi Ghee slow-clarified from fresh cultured butter of free-grazing indigenous cows in Cholistan. Natural golden granules (daana) and authentic taste.',
      image: BRAND_ASSETS.cholistanGhee,
      ctaText: 'Discover Desi Ghee',
      ctaAction: () => {
        const ghee = PRODUCTS.find((p) => p.id === 'cholistan-pure-desi-ghee') || PRODUCTS[2];
        onOpenSingleProduct(ghee);
      },
      secondaryText: 'View All Products',
      secondaryAction: () => {
        setActiveTab('products');
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
    {
      name: 'Garlic',
      amount: '30 Grams',
      urdu: 'Lehsan',
      desc: 'Natural antibacterial that fights infections and boosts immune system, helps in lowering bad cholesterol to support healthy function of heart, and supportive in weight loss.',
    },
    {
      name: 'Ginger',
      amount: '25 Grams',
      urdu: 'Adrak',
      desc: 'With natural ginseng properties, improves men sexual health by enhancing blood circulation, supportive in stomach guts, improves digestion, soothes nausea, and a powerful anti-inflammatory that reduces pain.',
    },
    {
      name: 'Kalwanji',
      amount: '35 Grams',
      urdu: 'Black Seed',
      desc: 'Traditionally known as black poison/cure for all diseases due to its immune boosting properties. Supportive in sustaining healthy blood sugar levels, and aids in respiratory health.',
    },
    {
      name: 'Chia Seeds',
      amount: '30 Grams',
      urdu: 'Tukhm-e-Sharbati',
      desc: 'Packed with omega-3 fatty acids, fiber, and protein. Helps regulate digestion, supports heart health, and provides a natural energy boost.',
    },
    {
      name: 'Methi Dana',
      amount: '35 Grams',
      urdu: 'Fenugreek',
      desc: 'A powerful herb to improve digestion, reduce cholesterol, and support hormonal balance; a great ally for overall wellness.',
    },
    {
      name: 'Beetroot',
      amount: '20 Grams',
      urdu: 'Chukandar',
      desc: 'Rich in nitrates and antioxidants; supports healthy blood flow, reduces blood pressure, and enhances sexual stamina and performance.',
    },
    {
      name: 'Turmeric',
      amount: '10 Grams',
      urdu: 'Haldi',
      desc: 'Known for its potent antioxidant properties; helps combat inflammation, supports joint health, and promotes radiant skin.',
    },
    {
      name: 'Black Pepper',
      amount: '15 Grams',
      urdu: 'Kaali Mirch',
      desc: 'Enhances the bioavailability of turmeric and other nutrients while supporting digestion, detoxification, calcium absorption, and respiratory health.',
    },
  ];

  const minerals = ['Potassium', 'Magnesium', 'Manganese', 'Calcium', 'Iron'];

  return (
    <div className="space-y-8 sm:space-y-12 pb-14 text-left">
      {/* 1. CINEMATIC FULL-WIDTH BANNER SLIDER (STRICTLY NO PRICING) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F2EFE8] via-[#FAF9F5] to-[#FAF9F5] border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[380px] sm:min-h-[440px]">
            {/* Slide Text Content */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0D3818] leading-[1.15]">
                {slides[currentSlide].title}
              </h1>

              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-xl">
                {slides[currentSlide].subtitle}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={slides[currentSlide].ctaAction}
                  className="px-5 py-3 bg-[#155D27] hover:bg-[#1C7A38] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <span>{slides[currentSlide].ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={slides[currentSlide].secondaryAction}
                  className="px-5 py-3 bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow-2xs"
                >
                  <span>{slides[currentSlide].secondaryText}</span>
                </button>
              </div>

              {/* Slider Dots & Arrow Navigation */}
              <div className="flex items-center gap-4 pt-2 text-xs text-stone-500">
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

            {/* Slide Visual Presentation - Full Height, 100% Never Cropped */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div
                onClick={slides[currentSlide].ctaAction}
                className="relative w-full max-w-md h-[320px] sm:h-[420px] lg:h-[460px] bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border border-stone-200/90 group cursor-pointer flex items-center justify-center overflow-hidden"
              >
                <img
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  className="max-w-full max-h-full w-auto h-auto object-contain transition-transform duration-500 group-hover:scale-102"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORPORATE TRUST & GUARANTEE STRIP (Horizontal sliding on mobile) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 sm:grid sm:grid-cols-4 sm:gap-4 bg-white p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl border border-stone-200/90 shadow-2xs text-xs scrollbar-none">
          <div className="flex items-center gap-3 shrink-0 min-w-[210px] sm:min-w-0 snap-start bg-stone-50/70 sm:bg-transparent p-2 sm:p-0 rounded-xl">
            <div className="w-9 h-9 rounded-full bg-emerald-50 text-[#155D27] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <strong className="block text-stone-900 font-serif text-xs sm:text-sm">SECP Registered</strong>
              <span className="text-stone-500 text-[10px] sm:text-[11px]">UCI: 0303557 (Sec 16)</span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 min-w-[210px] sm:min-w-0 snap-start bg-stone-50/70 sm:bg-transparent p-2 sm:p-0 rounded-xl">
            <div className="w-9 h-9 rounded-full bg-emerald-50 text-[#155D27] flex items-center justify-center shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <strong className="block text-stone-900 font-serif text-xs sm:text-sm">PSQCA Aligned</strong>
              <span className="text-stone-500 text-[10px] sm:text-[11px]">Zero Synthetic Fillers</span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 min-w-[210px] sm:min-w-0 snap-start bg-stone-50/70 sm:bg-transparent p-2 sm:p-0 rounded-xl">
            <div className="w-9 h-9 rounded-full bg-emerald-50 text-[#155D27] flex items-center justify-center shrink-0">
              <Star className="w-4 h-4 text-[#C28E3A] fill-current" />
            </div>
            <div>
              <strong className="block text-stone-900 font-serif text-xs sm:text-sm">4.8 / 5.0 Rating</strong>
              <span className="text-stone-500 text-[10px] sm:text-[11px]">340+ Verified Buyers</span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 min-w-[210px] sm:min-w-0 snap-start bg-stone-50/70 sm:bg-transparent p-2 sm:p-0 rounded-xl">
            <div className="w-9 h-9 rounded-full bg-emerald-50 text-[#155D27] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            </div>
            <div>
              <strong className="block text-stone-900 font-serif text-xs sm:text-sm">Nationwide COD</strong>
              <span className="text-stone-500 text-[10px] sm:text-[11px]">Direct Courier Delivery</span>
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
              AMMAMA Foods Private Ltd offers a unique blend of 8 vital organic herbs for comprehensive daily wellness. In use since ancient times with proven efficacy and scientific research revealing zero side effects. Safe for all age groups to maintain vital human organs including Heart, Lungs, Pancreas, Kidney, and Stomach.
            </p>

            {/* 10 Key Health Indications */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold text-[#0D3818] uppercase tracking-wider block">
                Regular Use Improves Health Conditions In:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                <div className="flex items-start gap-2 bg-stone-50 p-2 rounded-lg border border-stone-200/80">
                  <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  <span>Regulate blood sugar &amp; kidney functions</span>
                </div>
                <div className="flex items-start gap-2 bg-stone-50 p-2 rounded-lg border border-stone-200/80">
                  <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  <span>Circulation, burn bad cholesterol &amp; open veins</span>
                </div>
                <div className="flex items-start gap-2 bg-stone-50 p-2 rounded-lg border border-stone-200/80">
                  <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  <span>Reduce stomach guts &amp; eliminate constipation</span>
                </div>
                <div className="flex items-start gap-2 bg-stone-50 p-2 rounded-lg border border-stone-200/80">
                  <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  <span>Boost immunity against bacterial/viral infections</span>
                </div>
                <div className="flex items-start gap-2 bg-stone-50 p-2 rounded-lg border border-stone-200/80">
                  <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  <span>Anti-aging, cellular repair &amp; energy booster</span>
                </div>
                <div className="flex items-start gap-2 bg-stone-50 p-2 rounded-lg border border-stone-200/80">
                  <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  <span>Enhance sexual vitality, stamina &amp; performance</span>
                </div>
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

      {/* 5A. SLIDING CAROUSEL 1: FEATURED BOTANICAL ESSENTIALS & OILS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#C28E3A] block">
              Signature Formulations &amp; Premium Oils
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0D3818] mt-1">
              Featured Flagship Collection
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setActiveTab('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-semibold text-[#155D27] hover:underline flex items-center gap-1 cursor-pointer mr-2"
            >
              <span>View All 16 Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Slider Navigation Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => scrollCarousel(featuredCarouselRef, 'left')}
                className="p-2 sm:p-2.5 rounded-full bg-white border border-stone-300 hover:bg-stone-100 text-stone-700 transition-colors shadow-2xs cursor-pointer hover:border-[#155D27]"
                aria-label="Previous products"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollCarousel(featuredCarouselRef, 'right')}
                className="p-2 sm:p-2.5 rounded-full bg-white border border-stone-300 hover:bg-stone-100 text-stone-700 transition-colors shadow-2xs cursor-pointer hover:border-[#155D27]"
                aria-label="Next products"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Scroll Track */}
        <div
          ref={featuredCarouselRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory scrollbar-none"
        >
          {PRODUCTS.filter(
            (p) =>
              p.category === 'formula' ||
              p.category === 'cooking-oil' ||
              p.category === 'olive-oil' ||
              p.category === 'honey' ||
              p.category === 'ghee'
          ).map((prod) => (
            <div
              key={prod.id}
              className="w-[230px] sm:w-[300px] shrink-0 snap-start bg-white rounded-2xl sm:rounded-3xl border border-stone-200/90 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div
                onClick={() => onOpenSingleProduct(prod)}
                className="relative bg-[#FAF9F5] aspect-square overflow-hidden flex items-center justify-center p-3 sm:p-4 cursor-pointer"
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
                <div className="absolute bottom-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-[#155D27] border border-stone-200">
                  {prod.packagingType || 'Pack'} · {prod.weight}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div onClick={() => onOpenSingleProduct(prod)} className="cursor-pointer space-y-1">
                  <div className="flex justify-between items-baseline text-[11px] text-stone-500">
                    <span className="uppercase tracking-wider font-semibold text-[#C28E3A]">
                      {prod.variants && prod.variants.length > 1
                        ? `${prod.variants.length} Sizes Available`
                        : prod.weight}
                    </span>
                    <span
                      className={`font-semibold text-[10px] ${
                        prod.delivery === 'Free' ? 'text-emerald-700' : 'text-stone-500'
                      }`}
                    >
                      {prod.delivery === 'Free' ? 'Free Delivery' : 'Charges applied'}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-[#155D27] transition-colors truncate">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                    {prod.shortDescription}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-100 space-y-2.5">
                  <div className="flex justify-between items-baseline">
                    <span className="font-serif text-xl font-bold text-[#155D27]">
                      PKR {prod.price.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-stone-400">COD Available</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onOpenSingleProduct(prod)}
                      className="py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl transition-colors text-center cursor-pointer"
                    >
                      Product Page
                    </button>
                    <button
                      onClick={() => onAddToCart(prod, 1)}
                      className="py-2.5 bg-[#155D27] hover:bg-[#1C7A38] text-white text-xs font-semibold rounded-xl transition-colors text-center cursor-pointer shadow-xs"
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

      {/* 5B. SLIDING CAROUSEL 2: ORGANIC POWDERS, SUPERFOOD SEEDS & VITALITY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#C28E3A] block">
              Hygienic Dehydrated Roots, Seeds &amp; Formulations
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0D3818] mt-1">
              Organic Powders &amp; Superfood Shelf
            </h2>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => scrollCarousel(powdersCarouselRef, 'left')}
              className="p-2 sm:p-2.5 rounded-full bg-white border border-stone-300 hover:bg-stone-100 text-stone-700 transition-colors shadow-2xs cursor-pointer hover:border-[#155D27]"
              aria-label="Previous powders"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollCarousel(powdersCarouselRef, 'right')}
              className="p-2 sm:p-2.5 rounded-full bg-white border border-stone-300 hover:bg-stone-100 text-stone-700 transition-colors shadow-2xs cursor-pointer hover:border-[#155D27]"
              aria-label="Next powders"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Track for Powders & Superfoods */}
        <div
          ref={powdersCarouselRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory scrollbar-none"
        >
          {PRODUCTS.filter(
            (p) =>
              p.category === 'herbal-powder' ||
              p.category === 'superfood' ||
              p.category === 'vitality'
          ).map((prod) => (
            <div
              key={prod.id}
              className="w-[230px] sm:w-[300px] shrink-0 snap-start bg-white rounded-2xl sm:rounded-3xl border border-stone-200/90 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div
                onClick={() => onOpenSingleProduct(prod)}
                className="relative bg-[#FAF9F5] aspect-square overflow-hidden flex items-center justify-center p-3 sm:p-4 cursor-pointer"
              >
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-104"
                />
                {prod.badge && (
                  <div className="absolute top-3 left-3 bg-[#C28E3A] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                    {prod.badge}
                  </div>
                )}
                <div className="absolute bottom-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-stone-700 border border-stone-200">
                  {prod.packagingType || 'Sache / Jar'}: {prod.weight}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div onClick={() => onOpenSingleProduct(prod)} className="cursor-pointer space-y-1">
                  <div className="flex justify-between items-baseline text-[11px] text-stone-500">
                    <span className="uppercase tracking-wider font-semibold text-[#C28E3A]">
                      {prod.variants && prod.variants.length > 1
                        ? `${prod.variants.length} Pack Sizes`
                        : prod.weight}
                    </span>
                    <span
                      className={`font-semibold text-[10px] ${
                        prod.delivery === 'Free' ? 'text-emerald-700' : 'text-stone-500'
                      }`}
                    >
                      {prod.delivery === 'Free' ? 'Free Delivery' : 'Charges applied'}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-[#155D27] transition-colors truncate">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                    {prod.shortDescription}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-100 space-y-2.5">
                  <div className="flex justify-between items-baseline">
                    <span className="font-serif text-xl font-bold text-[#155D27]">
                      PKR {prod.price.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-stone-400">Available</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onOpenSingleProduct(prod)}
                      className="py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl transition-colors text-center cursor-pointer"
                    >
                      Product Page
                    </button>
                    <button
                      onClick={() => onAddToCart(prod, 1)}
                      className="py-2.5 bg-[#155D27] hover:bg-[#1C7A38] text-white text-xs font-semibold rounded-xl transition-colors text-center cursor-pointer shadow-xs"
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
