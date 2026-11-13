import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck,
  Check,
  ArrowRight,
  Leaf,
  Award,
  Compass,
  CheckCircle2,
  Star,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
} from 'lucide-react';
import { PageTab, Product, ReviewItem } from '../types';
import {
  BRAND_ASSETS,
  REVIEWS,
} from '../data/companyData';

interface HomePageProps {
  products: Product[];
  reviews?: ReviewItem[];
  setActiveTab: (tab: PageTab) => void;
  onOpenSingleProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onShowToast: (msg: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  reviews = REVIEWS,
  setActiveTab,
  onOpenSingleProduct,
  onAddToCart,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [trustSlide, setTrustSlide] = useState(0);
  const [selectedHerb, setSelectedHerb] = useState<number>(0);
  const [testimonialSlide, setTestimonialSlide] = useState(0);

  const collectionCarouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth',
      });
    }
  };

  const activeReviews = reviews.length > 0 ? reviews : REVIEWS;

  const terraHerbs = products.find((p) => p.id === 'terra-herbs-8') || products[0];
  const karakHoney = products.find((p) => p.id === 'pure-beiry-nectar-honey') || products[1] || products[0];
  const cholistanGhee = products.find((p) => p.id === 'cholestan-pure-desi-ghee') || products[2] || products[0];
  const mudanyaOil = products.find((p) => p.id === 'mudanya-sizma-olive-oil') || products[3] || products[0];
  const mundialOil = products.find((p) => p.id === 'mundial-olive-oil') || products[4] || products[0];
  const pomaceOil = products.find((p) => p.id === 'pomace-olive-oil') || products[5] || products[0];

  // Hero Banners Slider - Strictly portrait presentation, ZERO pricing, real product photos only
  const slides = [
    {
      id: 1,
      eyebrow: 'Flagship Herbal Formula · 200 Grams',
      title: 'Terra Herbs-8: Nature’s Protective Formula',
      subtitle:
        'Crafted with 8 vital organic herbs and 5 essential minerals to support Heart, Lungs, Pancreas, Kidney & Stomach health with zero side effects.',
      image: terraHerbs?.image || BRAND_ASSETS.terraHerbsJar,
      ctaText: 'Explore Terra Herbs-8',
      ctaAction: () => terraHerbs && onOpenSingleProduct(terraHerbs),
      secondaryText: 'View Store',
      secondaryAction: () => {
        setActiveTab('products');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },
    {
      id: 2,
      eyebrow: 'Wild Harvest · Karak Mountains',
      title: 'Pure Berry Nectar Honey of Karak',
      subtitle:
        '100% raw, unheated single-origin Sidr berry nectar harvested from wild Beri trees across Karak. Rich in natural enzymes and soothing antioxidants.',
      image: karakHoney?.image || BRAND_ASSETS.karakHoney,
      ctaText: 'Discover Honey',
      ctaAction: () => karakHoney && onOpenSingleProduct(karakHoney),
      secondaryText: 'View Store',
      secondaryAction: () => {
        setActiveTab('products');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },
    {
      id: 3,
      eyebrow: 'Mediterranean Selection · Free Delivery',
      title: 'Mudanya, Mundial & Pomace Olive Oils',
      subtitle:
        'First cold-pressed Turkish Extra Virgin and authentic Spanish culinary olive oils in UV-protected 5 Liter canisters and glass bottles.',
      image: mudanyaOil?.image || BRAND_ASSETS.mudanyaOliveOil,
      ctaText: 'Explore Olive Oils',
      ctaAction: () => mudanyaOil && onOpenSingleProduct(mudanyaOil),
      secondaryText: 'View Store',
      secondaryAction: () => {
        setActiveTab('products');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },
    {
      id: 4,
      eyebrow: 'Cultured Bilona Tradition',
      title: 'Cholestan Pure Desi Ghee',
      subtitle:
        'Aromatic traditional Desi Ghee slow-clarified from cultured butter of grass-fed indigenous cows in Cholistan. Signature golden granules (daana).',
      image: cholistanGhee?.image || BRAND_ASSETS.cholistanGhee,
      ctaText: 'Discover Desi Ghee',
      ctaAction: () => cholistanGhee && onOpenSingleProduct(cholistanGhee),
      secondaryText: 'View Store',
      secondaryAction: () => {
        setActiveTab('products');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },
    {
      id: 5,
      eyebrow: 'High Smoke Point · Everyday Kitchen',
      title: 'Mundial & Pomace Spanish Olive Oils',
      subtitle:
        'Heart-friendly monounsaturated oils engineered for Pakistani frying, curries & daily family cooking with Free Nationwide Delivery.',
      image: pomaceOil?.image || BRAND_ASSETS.pomaceOliveOil,
      ctaText: 'Explore Cooking Oils',
      ctaAction: () => (pomaceOil || mundialOil) && onOpenSingleProduct(pomaceOil || mundialOil),
      secondaryText: 'View Store',
      secondaryAction: () => {
        setActiveTab('products');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },
  ];

  // Auto-advance hero banner every 5.5s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Auto-advance 2-slide mobile trust strip every 4s (no scrollbar)
  useEffect(() => {
    const timer = setInterval(() => {
      setTrustSlide((prev) => (prev === 0 ? 1 : 0));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Testimonials auto-advance every 5s
  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialSlide((prev) => (prev + 1) % activeReviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeReviews.length]);

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
      desc: 'Traditionally known as black seed cure due to its immune boosting properties. Supportive in sustaining healthy blood sugar levels, and aids in respiratory health.',
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
    <div className="space-y-6 sm:space-y-8 pb-10 text-left">
      {/* 1. COMPACT BOTANICAL HERO BANNER SLIDER (PORTRAIT PRODUCT FRAME, DEEP EMERALD CANVAS, NO PRICING) */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B2D14] via-[#134622] to-[#1A582C] text-white border-b border-[#C28E3A]/30">
        {/* Subtle Gold Botanical Radial Accent */}
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none opacity-20"
          style={{ background: 'radial-gradient(circle, #E6C687 0%, transparent 70%)' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            {/* Slide Text Content */}
            <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
              <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#E6C687]">
                {slides[currentSlide].eyebrow}
              </span>

              <h1 className="font-serif text-2xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-white leading-[1.12]">
                {slides[currentSlide].title}
              </h1>

              <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed max-w-xl">
                {slides[currentSlide].subtitle}
              </p>

              {/* Single-Line Compact Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <button
                  onClick={slides[currentSlide].ctaAction}
                  className="px-4 py-2.5 bg-[#E6C687] hover:bg-[#d8b46e] text-[#0B2D14] text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-sm inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                >
                  <span>{slides[currentSlide].ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={slides[currentSlide].secondaryAction}
                  className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/25 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>{slides[currentSlide].secondaryText}</span>
                </button>
              </div>

              {/* Slider Navigation */}
              <div className="flex items-center gap-3 pt-2 text-xs">
                <div className="flex items-center gap-1.5">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        currentSlide === idx ? 'w-7 bg-[#E6C687]' : 'w-2 bg-white/30 hover:bg-white/50'
                      }`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-1 pl-3 border-l border-white/20">
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
                    className="p-1 rounded-full hover:bg-white/15 text-white transition-colors cursor-pointer"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                    className="p-1 rounded-full hover:bg-white/15 text-white transition-colors cursor-pointer"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Slide Portrait Presentation (Tall Portrait Frame, Never Cropped, Zero Awkward White Margins) */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div
                onClick={slides[currentSlide].ctaAction}
                className="relative w-[220px] sm:w-[260px] lg:w-[275px] aspect-[3/4] bg-[#FAF8F4] rounded-2xl p-2 shadow-2xl border border-[#E6C687]/40 group cursor-pointer flex items-center justify-center overflow-hidden"
              >
                <img
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  className="w-full h-full object-contain rounded-xl transition-transform duration-500 group-hover:scale-103"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORPORATE TRUST STRIP — 2-SLIDE ANIMATED SLIDER ON MOBILE (ZERO SCROLLBAR) + 4-COL GRID ON DESKTOP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile 2-Slide Smooth Carousel (No Scrollbar) */}
        <div className="sm:hidden bg-white rounded-2xl border border-stone-200/90 shadow-2xs p-3 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${trustSlide * 100}%)` }}
          >
            {/* Slide 1 */}
            <div className="w-full shrink-0 grid grid-cols-2 gap-2.5 text-xs">
              <div className="flex items-center gap-2 bg-[#FAF9F5] p-2 rounded-xl border border-stone-100">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#155D27] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <strong className="block text-stone-900 font-serif text-xs truncate">SECP Registered</strong>
                  <span className="text-stone-500 text-[10px] block truncate">UCI: 0303557</span>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-[#FAF9F5] p-2 rounded-xl border border-stone-100">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#155D27] flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <strong className="block text-stone-900 font-serif text-xs truncate">PSQCA Aligned</strong>
                  <span className="text-stone-500 text-[10px] block truncate">100% Pure Organic</span>
                </div>
              </div>
            </div>

            {/* Slide 2 */}
            <div className="w-full shrink-0 grid grid-cols-2 gap-2.5 text-xs">
              <div className="flex items-center gap-2 bg-[#FAF9F5] p-2 rounded-xl border border-stone-100">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#155D27] flex items-center justify-center shrink-0">
                  <Star className="w-4 h-4 text-[#C28E3A] fill-current" />
                </div>
                <div className="min-w-0">
                  <strong className="block text-stone-900 font-serif text-xs truncate">4.8 / 5.0 Rating</strong>
                  <span className="text-stone-500 text-[10px] block truncate">340+ Verified Buyers</span>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-[#FAF9F5] p-2 rounded-xl border border-stone-100">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#155D27] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                </div>
                <div className="min-w-0">
                  <strong className="block text-stone-900 font-serif text-xs truncate">Nationwide COD</strong>
                  <span className="text-stone-500 text-[10px] block truncate">Direct Courier</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2-Slide Indicators */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <button
              onClick={() => setTrustSlide(0)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                trustSlide === 0 ? 'w-5 bg-[#155D27]' : 'w-1.5 bg-stone-300'
              }`}
              aria-label="Trust Slide 1"
            />
            <button
              onClick={() => setTrustSlide(1)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                trustSlide === 1 ? 'w-5 bg-[#155D27]' : 'w-1.5 bg-stone-300'
              }`}
              aria-label="Trust Slide 2"
            />
          </div>
        </div>

        {/* Desktop 4-Column Bar */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white p-4 rounded-2xl border border-stone-200/90 shadow-2xs text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-50 text-[#155D27] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <strong className="block text-stone-900 font-serif text-sm">SECP Registered</strong>
              <span className="text-stone-500 text-[11px]">UCI: 0303557 (Sec 16)</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-50 text-[#155D27] flex items-center justify-center shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <strong className="block text-stone-900 font-serif text-sm">PSQCA Aligned</strong>
              <span className="text-stone-500 text-[11px]">Zero Synthetic Fillers</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-50 text-[#155D27] flex items-center justify-center shrink-0">
              <Star className="w-4 h-4 text-[#C28E3A] fill-current" />
            </div>
            <div>
              <strong className="block text-stone-900 font-serif text-sm">4.8 / 5.0 Rating</strong>
              <span className="text-stone-500 text-[11px]">340+ Verified Buyers</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-50 text-[#155D27] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            </div>
            <div>
              <strong className="block text-stone-900 font-serif text-sm">Nationwide COD</strong>
              <span className="text-stone-500 text-[11px]">Direct Courier Delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR AUTHENTIC ORGANIC COLLECTION (DYNAMIC LIVE PRODUCTS CAROUSEL) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-end justify-between gap-3 border-b border-stone-200 pb-2.5">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C28E3A] block">
              Pure Organic &amp; Botanical Catalog
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0D3818] mt-0.5">
              Ammama Signature Shelf
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                setActiveTab('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-semibold text-[#155D27] hover:underline inline-flex items-center gap-1 whitespace-nowrap cursor-pointer"
            >
              <span>All ({products.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="hidden sm:flex items-center gap-1">
              <button
                onClick={() => scrollCarousel(collectionCarouselRef, 'left')}
                className="p-2 rounded-full bg-white border border-stone-300 hover:bg-stone-100 text-stone-700 transition-colors cursor-pointer hover:border-[#155D27]"
                aria-label="Previous products"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollCarousel(collectionCarouselRef, 'right')}
                className="p-2 rounded-full bg-white border border-stone-300 hover:bg-stone-100 text-stone-700 transition-colors cursor-pointer hover:border-[#155D27]"
                aria-label="Next products"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Carousel Track */}
        <div
          ref={collectionCarouselRef}
          className="flex gap-3.5 sm:gap-5 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory scrollbar-none"
        >
          {products.map((prod) => (
            <div
              key={prod.id}
              className="w-[210px] sm:w-[270px] shrink-0 snap-start bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div
                onClick={() => onOpenSingleProduct(prod)}
                className="relative bg-[#FAF9F5] aspect-[4/4.3] overflow-hidden flex items-center justify-center p-2.5 sm:p-3 cursor-pointer"
              >
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-103"
                />
                {prod.badge && (
                  <div className="absolute top-2 left-2 bg-[#155D27] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs">
                    {prod.badge}
                  </div>
                )}
              </div>

              <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2">
                <div onClick={() => onOpenSingleProduct(prod)} className="cursor-pointer space-y-0.5">
                  <div className="flex justify-between items-baseline text-[10px] text-stone-500">
                    <span className="uppercase tracking-wider font-semibold text-[#C28E3A] truncate">
                      {prod.weight}
                    </span>
                    <span
                      className={`font-semibold text-[10px] whitespace-nowrap ${
                        prod.delivery === 'Free' ? 'text-emerald-700' : 'text-stone-500'
                      }`}
                    >
                      {prod.delivery === 'Free' ? 'Free Delivery' : 'COD'}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-sm sm:text-base text-stone-900 group-hover:text-[#155D27] transition-colors truncate">
                    {prod.name}
                  </h3>
                </div>

                <div className="pt-2 border-t border-stone-100 space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="font-serif text-base sm:text-lg font-bold text-[#155D27]">
                      PKR {prod.price.toLocaleString()}
                    </span>
                  </div>

                  {/* Crisp Single-Line Compact Buttons */}
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => onOpenSingleProduct(prod)}
                      className="py-1.5 px-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-semibold rounded-lg transition-colors text-center whitespace-nowrap cursor-pointer"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => onAddToCart(prod, 1)}
                      className="py-1.5 px-2 bg-[#155D27] hover:bg-[#1C7A38] text-white text-[11px] font-semibold rounded-lg transition-colors text-center whitespace-nowrap cursor-pointer shadow-xs inline-flex items-center justify-center gap-1"
                    >
                      <ShoppingBag className="w-3 h-3 shrink-0" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FEATURED FLAGSHIP SPOTLIGHT (TERRA HERBS-8) */}
      {terraHerbs && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-stone-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-3.5">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#C28E3A]">
                Flagship Innovation · 200 Grams
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0D3818] tracking-tight">
                {terraHerbs.name}
              </h2>
              <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                AMMAMA Foods Private Ltd offers a unique blend of 8 vital organic herbs for comprehensive daily wellness. Proven traditional efficacy with zero side effects, safe for all age groups to maintain Heart, Lungs, Pancreas, Kidney, and Stomach health.
              </p>

              {/* Key Health Indications */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-stone-700 pt-1">
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
                  <span>Boost immunity &amp; enhance natural stamina</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <button
                  onClick={() => onOpenSingleProduct(terraHerbs)}
                  className="px-4 py-2 bg-[#155D27] hover:bg-[#1C7A38] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-all shadow-xs inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                >
                  <span>View Product</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onAddToCart(terraHerbs, 1)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                >
                  Add to Cart
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div
                onClick={() => onOpenSingleProduct(terraHerbs)}
                className="relative w-full max-w-[260px] aspect-[3/4] bg-[#FAF9F5] rounded-2xl p-3 border border-stone-200/80 flex items-center justify-center cursor-pointer group"
              >
                <img
                  src={terraHerbs.image}
                  alt={terraHerbs.name}
                  className="w-full h-full object-contain group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute bottom-2.5 right-2.5 bg-white/95 text-[#155D27] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-stone-200 shadow-2xs">
                  Net Wt: 200g
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. THE 8 INGREDIENTS INTERACTIVE SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#155D27] text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 overflow-hidden shadow-lg space-y-5 sm:space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-emerald-800/80 pb-4">
            <div className="max-w-2xl space-y-1">
              <span className="text-[11px] uppercase tracking-widest text-[#E6C687] font-bold">
                100% Whole-Plant Formula
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                The 8 Botanical Ingredients of Terra Herbs-8
              </h2>
            </div>

            <div className="text-left md:text-right">
              <span className="font-serif text-sm font-bold text-[#E6C687]">Net Wt: 200 Grams + 5 Minerals</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            {/* Flatlay Photography Box */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-emerald-700/60 aspect-4/3 shadow-md group">
              <img
                src={BRAND_ASSETS.ingredientsFlatlay}
                alt="8 Natural Herbs in ceramic bowls"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-xs text-white flex justify-between items-center">
                <span className="font-serif italic font-medium">Artisanal Whole Harvest</span>
                <span className="font-mono text-[11px] text-[#E6C687]">8 Herbs · 5 Minerals</span>
              </div>
            </div>

            {/* Interactive Ingredients List */}
            <div className="lg:col-span-7 space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {herbDetails.map((herb, idx) => {
                  const isSelected = selectedHerb === idx;
                  return (
                    <button
                      key={herb.name}
                      onClick={() => setSelectedHerb(idx)}
                      className={`p-2.5 rounded-xl text-left transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-white text-[#155D27] border-white shadow-md font-bold'
                          : 'bg-[#1C7A38]/40 text-stone-100 border-[#248A46] hover:bg-[#1C7A38]/70'
                      }`}
                    >
                      <span className="block text-[9px] uppercase tracking-wider opacity-75">
                        {herb.urdu}
                      </span>
                      <span className="font-serif text-xs sm:text-sm block mt-0.5 truncate">
                        {herb.name}
                      </span>
                      <span className="font-mono text-[11px] font-semibold mt-0.5 block">
                        {herb.amount}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="bg-[#0D3818] p-4 rounded-2xl border border-emerald-800/80 space-y-2">
                <div className="flex items-baseline justify-between border-b border-emerald-900 pb-1.5">
                  <h4 className="font-serif text-base sm:text-lg font-bold text-white">
                    {herbDetails[selectedHerb].name} ({herbDetails[selectedHerb].amount})
                  </h4>
                  <span className="text-[11px] text-emerald-300 italic">
                    {herbDetails[selectedHerb].urdu}
                  </span>
                </div>

                <p className="text-xs text-emerald-100 leading-relaxed">
                  {herbDetails[selectedHerb].desc}
                </p>

                <div className="pt-1 flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] font-semibold text-[#E6C687] mr-1">Minerals:</span>
                  {minerals.map((m) => (
                    <span
                      key={m}
                      className="px-2 py-0.5 bg-[#1C7A38]/60 text-stone-100 text-[10px] rounded-full border border-[#248A46] font-medium"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SLIDING TESTIMONIALS CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF9F5] rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-end justify-between gap-4 border-b border-stone-200 pb-3">
            <div>
              <div className="flex items-center gap-1 text-[#C28E3A] mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
                <span className="text-[11px] font-bold font-mono text-stone-800 ml-1">
                  4.8 / 5.0 (340+ Reviews)
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0D3818]">
                Customer Experiences
              </h2>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() =>
                  setTestimonialSlide((prev) => (prev === 0 ? activeReviews.length - 1 : prev - 1))
                }
                className="p-2 rounded-full bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 transition-colors cursor-pointer"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTestimonialSlide((prev) => (prev + 1) % activeReviews.length)}
                className="p-2 rounded-full bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 transition-colors cursor-pointer"
                aria-label="Next review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="relative bg-white p-4 sm:p-6 rounded-2xl border border-stone-200/90 shadow-2xs">
            <div className="max-w-3xl space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-0.5 text-[#C28E3A]">
                  {[...Array(activeReviews[testimonialSlide]?.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold border border-emerald-100">
                  Verified Buyer
                </span>
              </div>

              <blockquote className="font-serif text-base sm:text-xl text-stone-800 italic leading-relaxed">
                "{activeReviews[testimonialSlide]?.comment}"
              </blockquote>

              <div className="pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <div>
                  <strong className="text-stone-900 font-serif text-sm font-bold">
                    {activeReviews[testimonialSlide]?.name}
                  </strong>
                  <span className="ml-2 text-[11px]">{activeReviews[testimonialSlide]?.city}, Pakistan</span>
                </div>
                <span className="text-[#155D27] font-semibold text-[11px] font-mono truncate max-w-[150px]">
                  {activeReviews[testimonialSlide]?.product}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. POTOHAR FARM SOURCING & CORPORATE CHARTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-2xs flex flex-col justify-between space-y-4">
          <div className="space-y-2.5">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C28E3A]">
              Potohar &amp; Punjab Terroir
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0D3818]">
              Direct Sourcing from Pakistani Soil
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              We partner directly with smallholder farmers across Potohar, Karak, and Cholistan, enforcing zero synthetic pesticides, cold-milling below 38°C, and fair community procurement.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
              <div className="bg-[#FAF9F5] p-3 rounded-xl border border-stone-200 space-y-1">
                <Compass className="w-4 h-4 text-[#C28E3A]" />
                <h4 className="font-serif font-bold text-sm text-stone-900">Our Vision</h4>
                <p className="text-[11px] text-stone-600 leading-snug">
                  Pakistan’s most trusted household organic food &amp; wellness shelf.
                </p>
              </div>
              <div className="bg-[#FAF9F5] p-3 rounded-xl border border-stone-200 space-y-1">
                <Leaf className="w-4 h-4 text-[#C28E3A]" />
                <h4 className="font-serif font-bold text-sm text-stone-900">Our Mission</h4>
                <p className="text-[11px] text-stone-600 leading-snug">
                  Preserve pure organic herbs &amp; oils with complete integrity.
                </p>
              </div>
              <div className="bg-[#FAF9F5] p-3 rounded-xl border border-stone-200 space-y-1">
                <Award className="w-4 h-4 text-[#C28E3A]" />
                <h4 className="font-serif font-bold text-sm text-stone-900">SECP Reg.</h4>
                <p className="text-[11px] text-stone-600 leading-snug">
                  Corporate UCI 0303557 · Sec 16 Companies Act-2017.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setActiveTab('governance');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-3.5 py-2 bg-white border border-stone-300 rounded-lg text-xs font-semibold text-[#155D27] hover:bg-stone-50 transition-colors whitespace-nowrap cursor-pointer"
            >
              Verify SECP Credentials
            </button>
            <button
              onClick={() => {
                setActiveTab('events');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 rounded-lg text-xs font-semibold text-stone-800 transition-colors whitespace-nowrap cursor-pointer"
            >
              Research &amp; Studies
            </button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden h-full min-h-[220px] shadow-md border border-stone-200">
            <img
              src={BRAND_ASSETS.farmHarvest}
              alt="Organic herbal farm"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 right-3 text-white text-xs flex justify-between items-center">
              <span className="font-serif font-medium">Model Farm · Potohar Valley</span>
              <span className="font-mono text-[10px] text-[#E6C687]">Regenerative Agriculture</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
