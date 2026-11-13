import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ShoppingBag,
  MessageCircle,
  ShieldCheck,
  Check,
  Star,
  Award,
  Truck,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Plus,
  Minus,
  Share2,
  Copy,
  Layers,
  Box,
} from 'lucide-react';
import { Product, PageTab, ReviewItem, ProductVariant } from '../types';
import { REVIEWS, COMPANY_INFO } from '../data/companyData';

interface SingleProductPageProps {
  product: Product;
  products: Product[];
  reviews?: ReviewItem[];
  setActiveTab: (tab: PageTab) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, variant?: ProductVariant) => void;
  onShowToast: (msg: string) => void;
}

export const SingleProductPage: React.FC<SingleProductPageProps> = ({
  product,
  products,
  reviews = REVIEWS,
  setActiveTab,
  onSelectProduct,
  onAddToCart,
  onShowToast,
}) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants && product.variants.length > 0 ? product.variants[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [activeInfoTab, setActiveInfoTab] = useState<'formulation' | 'benefits' | 'usage' | 'quality' | 'reviews'>(
    product.composition && product.composition.length > 0 ? 'formulation' : 'benefits'
  );

  // Sync state when navigating between products
  useEffect(() => {
    setSelectedVariant(product.variants && product.variants.length > 0 ? product.variants[0] : undefined);
    setQuantity(1);
    setActiveImageIdx(0);
    setActiveInfoTab(product.composition && product.composition.length > 0 ? 'formulation' : 'benefits');
  }, [product.id]);

  const galleryImages = product.images && product.images.length > 0 ? product.images : [product.image];
  const displayImage = galleryImages[activeImageIdx] || product.image;

  // Dynamic price & delivery based on variant
  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentWeight = selectedVariant ? selectedVariant.weight : product.weight;
  const currentPackaging = selectedVariant ? selectedVariant.packagingType : (product.packagingType || 'Packaging');
  const currentDelivery = selectedVariant ? selectedVariant.delivery : (product.delivery || 'Free');

  // Filter reviews for this product
  const activeReviews = reviews.length > 0 ? reviews : REVIEWS;
  const productReviews = activeReviews.filter(
    (r) =>
      r.product.toLowerCase().includes(product.name.toLowerCase()) ||
      product.name.toLowerCase().includes(r.product.toLowerCase())
  );
  const displayReviews = productReviews.length > 0 ? productReviews : activeReviews.slice(0, 3);

  // Related products
  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 3);

  // Copy Direct Product Link
  const handleCopyProductLink = () => {
    const url = `${window.location.origin}${window.location.pathname}#product/${product.id}`;
    navigator.clipboard.writeText(url);
    onShowToast(`Direct link for ${product.name} copied to clipboard!`);
  };

  const handleWhatsAppOrder = () => {
    const message = `Assalam-o-Alaikum Ammama Wellness Shelf (SECP UCI: ${COMPANY_INFO.uci}),\nI would like to order:\n• Product: ${product.name} (${currentPackaging} - ${currentWeight})\n• Quantity: ${quantity}\n• Delivery: ${currentDelivery === 'Free' ? 'Free Nationwide Delivery' : 'Charges applied'}\n• Total Amount: PKR ${(currentPrice * quantity).toLocaleString()}\n• Payment: Cash on Delivery (COD)\nPlease guide me on delivery to my address.`;
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
    onShowToast(`Opening WhatsApp order for ${product.name}...`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-8 sm:space-y-12 text-left">
      {/* Breadcrumb Navigation & Share Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
        <nav className="flex items-center gap-2 text-xs text-stone-500 flex-wrap">
          <button
            onClick={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-[#155D27] transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
          <button
            onClick={() => {
              setActiveTab('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-[#155D27] transition-colors cursor-pointer"
          >
            Store Catalog
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
          <span className="text-stone-900 font-semibold truncate">{product.name}</span>
        </nav>

        <button
          onClick={handleCopyProductLink}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-stone-100 border border-stone-300 rounded-lg text-xs font-semibold text-stone-700 transition-colors whitespace-nowrap cursor-pointer shrink-0 shadow-2xs self-start sm:self-auto"
          title="Copy direct link for sharing"
        >
          <Share2 className="w-3.5 h-3.5 text-[#155D27]" />
          <span>Share Link</span>
        </button>
      </div>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Portrait Product Imagery & Multi-Photo Thumbnail Strip */}
        <div className="lg:col-span-5 space-y-3">
          <div className="relative bg-white rounded-2xl p-4 sm:p-6 border border-stone-200/90 shadow-sm overflow-hidden flex items-center justify-center aspect-[3/3.6]">
            <img
              src={displayImage}
              alt={product.name}
              className="w-full h-full object-contain hover:scale-103 transition-transform duration-500"
            />
            {product.badge && (
              <div className="absolute top-3 left-3 bg-[#155D27] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                {product.badge}
              </div>
            )}
            <div className="absolute bottom-3 right-3 bg-[#FAF9F5]/95 backdrop-blur-xs text-[#155D27] text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-stone-200 flex items-center gap-1">
              <Box className="w-3 h-3" />
              <span>{currentPackaging}: {currentWeight}</span>
            </div>
          </div>

          {/* Thumbnail Strip (if 2 to 15 images) */}
          {galleryImages.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {galleryImages.map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-16 h-16 rounded-xl bg-white p-1.5 border shrink-0 overflow-hidden cursor-pointer transition-all ${
                    activeImageIdx === idx
                      ? 'border-[#155D27] ring-2 ring-[#155D27]/30'
                      : 'border-stone-200 opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}

          {/* Quick Purity Markers */}
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-white rounded-xl border border-stone-200 text-stone-700 space-y-0.5">
              <strong className="block text-stone-900 font-serif">100% Genuine</strong>
              <span className="text-[11px] text-stone-500">Zero Synthetic Fillers</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-stone-200 text-stone-700 space-y-0.5">
              <strong className="block text-stone-900 font-serif">PSQCA Aligned</strong>
              <span className="text-[11px] text-stone-500">Batch Tested Quality</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-stone-200 text-stone-700 space-y-0.5">
              <strong className="block text-stone-900 font-serif">SECP Registered</strong>
              <span className="text-[11px] text-stone-500">UCI No. 0303557</span>
            </div>
          </div>
        </div>

        {/* Right Column: Commercial Module & Purchasing */}
        <div className="lg:col-span-7 space-y-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C28E3A]">
                Ammama Wellness Shelf
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  currentDelivery === 'Free'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-stone-100 text-stone-700'
                }`}
              >
                {currentDelivery === 'Free' ? 'Free Nationwide Delivery' : 'Standard Delivery'}
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0D3818] tracking-tight">
              {product.name}
            </h1>
            <p className="text-sm text-stone-500 italic">{product.subtitle}</p>
          </div>

          {/* Price & Delivery Terms */}
          <div className="flex items-baseline gap-4 pt-1 pb-3 border-b border-stone-200">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#155D27]">
              PKR {currentPrice.toLocaleString()}
            </span>
            <span className="text-xs text-stone-500">
              {currentDelivery === 'Free' ? 'Free Nationwide Delivery Included' : 'Delivery charges apply'} · COD Available
            </span>
          </div>

          {/* Interactive Packaging & Weight Variant Selector */}
          {product.variants && product.variants.length > 1 && (
            <div className="p-4 bg-white rounded-2xl border border-stone-200 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#155D27]" />
                  <span>Choose Packaging & Size:</span>
                </span>
                <span className="text-stone-500 font-mono text-[11px]">
                  {selectedVariant?.packagingType} - {selectedVariant?.weight}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {product.variants.map((v) => {
                  const isSelected = selectedVariant?.id === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#155D27] bg-[#155D27]/5 ring-1 ring-[#155D27]'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-stone-900 block">{v.weight}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#155D27]" />}
                      </div>
                      <span className="text-[10px] text-stone-500 block">{v.packagingType}</span>
                      <span className="font-mono text-xs font-semibold text-[#155D27] block mt-1">
                        PKR {v.price.toLocaleString()}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <p className="text-stone-700 text-sm leading-relaxed">
            {product.fullDescription}
          </p>

          {/* Key Formula Composition Teaser for Terra Herbs */}
          {product.composition && (
            <div className="p-4 bg-[#F5F2EB] rounded-2xl border border-[#E4DECD] space-y-2 text-xs">
              <div className="flex items-center justify-between font-serif font-bold text-[#0D3818]">
                <span>Standardized 8-Herb Compounding:</span>
                <span className="text-[11px] font-mono text-[#155D27]">200g Whole Matrix</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1 text-[11px]">
                {product.composition.map((c, idx) => (
                  <div key={idx} className="bg-white/80 p-1.5 rounded border border-stone-200/70">
                    <span className="font-semibold block text-stone-900">{c.ingredient}</span>
                    <span className="text-stone-500 text-[10px]">{c.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Purchasing Stepper & Actions */}
          <div className="pt-2 space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold text-stone-700">Quantity:</span>
              <div className="flex items-center border border-stone-300 rounded-lg bg-white shadow-2xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-2 text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-sm font-mono font-bold text-stone-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-2 text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="text-xs text-stone-500 font-mono">
                Subtotal: <strong className="text-[#155D27] text-sm font-bold">PKR {(currentPrice * quantity).toLocaleString()}</strong>
              </div>
            </div>

            {/* Primary Single-Line Action Buttons */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <button
                onClick={() => onAddToCart(product, quantity, selectedVariant)}
                className="w-full py-2.5 px-3 bg-[#155D27] hover:bg-[#1C7A38] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-all shadow-sm inline-flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-2.5 px-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold rounded-lg transition-all shadow-sm inline-flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                <span>WhatsApp Order</span>
              </button>
            </div>

            {/* Delivery & Assurance Guarantees */}
            <div className="pt-3 border-t border-stone-200 grid grid-cols-2 gap-3 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#155D27] shrink-0" />
                <span>Nationwide Express Courier</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#155D27] shrink-0" />
                <span>7-Day Damage Replacement</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Detailed Information */}
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-2xs p-6 sm:p-10 space-y-8">
        <div className="flex items-center gap-4 border-b border-stone-200 overflow-x-auto pb-2">
          {product.composition && (
            <button
              onClick={() => setActiveInfoTab('formulation')}
              className={`pb-3 text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                activeInfoTab === 'formulation'
                  ? 'text-[#155D27] border-b-2 border-[#155D27] font-bold'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              Botanical Ingredients ({product.composition.length})
            </button>
          )}

          <button
            onClick={() => setActiveInfoTab('benefits')}
            className={`pb-3 text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
              activeInfoTab === 'benefits'
                ? 'text-[#155D27] border-b-2 border-[#155D27] font-bold'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            Health Benefits & Clinical Evidence
          </button>

          <button
            onClick={() => setActiveInfoTab('usage')}
            className={`pb-3 text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
              activeInfoTab === 'usage'
                ? 'text-[#155D27] border-b-2 border-[#155D27] font-bold'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            Usage & Directions
          </button>

          <button
            onClick={() => setActiveInfoTab('quality')}
            className={`pb-3 text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
              activeInfoTab === 'quality'
                ? 'text-[#155D27] border-b-2 border-[#155D27] font-bold'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            Quality & SECP Certification
          </button>

          <button
            onClick={() => setActiveInfoTab('reviews')}
            className={`pb-3 text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
              activeInfoTab === 'reviews'
                ? 'text-[#155D27] border-b-2 border-[#155D27] font-bold'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            Customer Reviews ({displayReviews.length})
          </button>
        </div>

        {/* Tab 1: Detailed Herb Breakdown */}
        {activeInfoTab === 'formulation' && product.composition && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.composition.map((herb, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-[#FAF9F5] rounded-2xl border border-stone-200 space-y-2 hover:border-[#155D27]/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-serif font-bold text-base text-stone-900">
                        {herb.ingredient}
                      </h4>
                      {herb.localName && (
                        <span className="text-xs text-[#C28E3A] font-medium font-sans">
                          Local Name: {herb.localName}
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-xs font-bold bg-[#155D27]/10 text-[#155D27] px-2.5 py-1 rounded-full">
                      {herb.amount}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {herb.role}
                  </p>
                </div>
              ))}
            </div>

            {product.enrichedWith && (
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <span className="font-serif font-bold text-[#0D3818]">
                  Enriched with Essential Human Body Minerals:
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.enrichedWith.map((min, idx) => (
                    <span
                      key={idx}
                      className="bg-white text-emerald-800 font-semibold px-2.5 py-1 rounded-md border border-emerald-200/80 shadow-2xs"
                    >
                      ✓ {min}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Benefits */}
        {activeInfoTab === 'benefits' && (
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#0D3818]">
              Targeted Therapeutic & Clinical Support
            </h3>
            <p className="text-xs text-stone-500">
              Documented holistic properties of this organic whole matrix formulation:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {product.benefits.map((b, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-[#FAF9F5] rounded-xl border border-stone-200 flex items-start gap-3 text-xs text-stone-700 leading-relaxed"
                >
                  <div className="w-5 h-5 rounded-full bg-[#155D27] text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                    ✓
                  </div>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Usage */}
        {activeInfoTab === 'usage' && (
          <div className="space-y-4 max-w-3xl">
            <h3 className="font-serif text-xl font-bold text-[#0D3818]">
              Recommended Usage & Professional Advice
            </h3>
            <div className="p-5 bg-[#FAF9F5] rounded-2xl border border-stone-200 space-y-4 text-xs text-stone-700 leading-relaxed whitespace-pre-line">
              {product.directions}
            </div>
          </div>
        )}

        {/* Tab 4: Quality & Compliance */}
        {activeInfoTab === 'quality' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-[#FAF9F5] rounded-2xl border border-stone-200 space-y-2">
                <ShieldCheck className="w-6 h-6 text-[#155D27]" />
                <h4 className="font-serif font-bold text-sm text-stone-900">
                  SECP Registration
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Produced under AMMAMA Foods (Pvt.) Ltd., registered with the Securities and Exchange Commission of Pakistan under Corporate Unique Identity (UCI) No. 0303557.
                </p>
              </div>

              <div className="p-4 bg-[#FAF9F5] rounded-2xl border border-stone-200 space-y-2">
                <Award className="w-6 h-6 text-[#155D27]" />
                <h4 className="font-serif font-bold text-sm text-stone-900">
                  Zero Preservatives
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  No artificial fillers, binding starch, synthetic chemicals, or chemical adulterants. Every gram is verified and 100% natural.
                </p>
              </div>

              <div className="p-4 bg-[#FAF9F5] rounded-2xl border border-stone-200 space-y-2">
                <Truck className="w-6 h-6 text-[#155D27]" />
                <h4 className="font-serif font-bold text-sm text-stone-900">
                  Secure Dispatch
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Sealed food-grade containers dispatched via verified couriers (TCS, Leopards) nationwide with complete transit tracking.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Customer Reviews */}
        {activeInfoTab === 'reviews' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Verified Customer Feedback
              </h3>
              <span className="text-xs text-stone-500 font-mono">
                Average Rating: 4.9 / 5.0
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {displayReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-4 bg-[#FAF9F5] rounded-2xl border border-stone-200 space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1 text-[#C28E3A]">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-stone-700 leading-relaxed">
                      "{rev.comment}"
                    </p>
                  </div>

                  <div className="pt-2 border-t border-stone-200 text-[11px] text-stone-500 flex items-center justify-between">
                    <span className="font-semibold text-stone-900">{rev.name}</span>
                    <span>{rev.city}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Related Products Carousel / Grid */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-2xl font-bold text-[#0D3818]">
            Related Natural Formulations & Oils
          </h3>
          <button
            onClick={() => {
              setActiveTab('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-semibold text-[#155D27] hover:underline whitespace-nowrap cursor-pointer"
          >
            All Products ({products.length}) →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {relatedProducts.map((rel) => (
            <div
              key={rel.id}
              className="bg-white rounded-2xl border border-stone-200 p-4 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="relative bg-[#F4EFE6] aspect-square rounded-xl overflow-hidden p-3 flex items-center justify-center">
                <img
                  src={rel.image}
                  alt={rel.name}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-104"
                />
              </div>

              <div className="pt-3 space-y-2">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#C28E3A]">
                  <span>{rel.packagingType || 'Pack'} · {rel.weight}</span>
                  <span className={rel.delivery === 'Free' ? 'text-emerald-700' : 'text-stone-500'}>
                    {rel.delivery === 'Free' ? 'Free Delivery' : 'Standard'}
                  </span>
                </div>
                <h4 className="font-serif font-bold text-base text-stone-900 group-hover:text-[#155D27] transition-colors truncate">
                  {rel.name}
                </h4>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-serif font-bold text-sm text-[#155D27]">
                    PKR {rel.price.toLocaleString()}
                  </span>
                  <button
                    onClick={() => {
                      onSelectProduct(rel);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-3 py-1 bg-[#155D27] hover:bg-[#1C7A38] text-white text-[11px] font-semibold rounded-md transition-colors cursor-pointer"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
