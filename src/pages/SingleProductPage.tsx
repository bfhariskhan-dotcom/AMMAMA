import React, { useState } from 'react';
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
} from 'lucide-react';
import { Product, PageTab, ReviewItem } from '../types';
import { PRODUCTS, REVIEWS, COMPANY_INFO } from '../data/companyData';

interface SingleProductPageProps {
  product: Product;
  setActiveTab: (tab: PageTab) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onShowToast: (msg: string) => void;
}

export const SingleProductPage: React.FC<SingleProductPageProps> = ({
  product,
  setActiveTab,
  onSelectProduct,
  onAddToCart,
  onShowToast,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [activeInfoTab, setActiveInfoTab] = useState<'formulation' | 'benefits' | 'usage' | 'quality' | 'reviews'>('formulation');

  // Filter reviews for this product
  const productReviews = REVIEWS.filter(
    (r) =>
      r.product.toLowerCase().includes(product.name.toLowerCase()) ||
      product.name.toLowerCase().includes(r.product.toLowerCase())
  );

  // Fallback to other reviews if specific reviews are fewer than 2
  const displayReviews = productReviews.length > 0 ? productReviews : REVIEWS.slice(0, 3);

  // Related products (exclude current)
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  const handleWhatsAppOrder = () => {
    const message = `Assalam-o-Alaikum AMMAMA Foods (SECP UCI: ${COMPANY_INFO.uci}),\nI would like to order:\n• Product: ${product.name} (${product.weight})\n• Quantity: ${quantity}\n• Total Amount: PKR ${(product.price * quantity).toLocaleString()}\n• Payment: Cash on Delivery (COD)\nPlease guide me on delivery.`;
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
    onShowToast(`Opening WhatsApp order for ${product.name}...`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-16 text-left">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-stone-500">
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
          Store
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
        <span className="text-stone-900 font-semibold truncate">{product.name}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Product Imagery & Trust Badges */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm overflow-hidden flex items-center justify-center aspect-square">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain hover:scale-103 transition-transform duration-500"
            />
            {product.badge && (
              <div className="absolute top-4 left-4 bg-[#155D27] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                {product.badge}
              </div>
            )}
            <div className="absolute bottom-4 right-4 bg-[#FAF9F5]/90 backdrop-blur-xs text-[#155D27] text-xs font-bold px-3 py-1 rounded-full border border-stone-200">
              Net Weight: {product.weight}
            </div>
          </div>

          {/* Quick Purity Markers */}
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-white rounded-xl border border-stone-200 text-stone-700 space-y-0.5">
              <strong className="block text-stone-900 font-serif">100% Organic</strong>
              <span className="text-[11px] text-stone-500">Zero Synthetic Fillers</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-stone-200 text-stone-700 space-y-0.5">
              <strong className="block text-stone-900 font-serif">PSQCA Aligned</strong>
              <span className="text-[11px] text-stone-500">Batch Lab Tested</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-stone-200 text-stone-700 space-y-0.5">
              <strong className="block text-stone-900 font-serif">SECP UCI</strong>
              <span className="text-[11px] text-stone-500">No. 0303557</span>
            </div>
          </div>
        </div>

        {/* Right Column: Commercial Module & Purchasing */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C28E3A]">
              AMMAMA Foods (Pvt.) Ltd. · Registered
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0D3818] tracking-tight">
              {product.name}
            </h1>
            <p className="text-sm text-stone-500 italic">{product.subtitle}</p>
          </div>

          {/* Price & Rating */}
          <div className="flex items-baseline gap-4 pt-1 pb-3 border-b border-stone-200">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#155D27]">
              PKR {product.price.toLocaleString()}
            </span>
            <span className="text-xs text-stone-500">
              Inclusive of all taxes · Cash on Delivery across Pakistan
            </span>
          </div>

          <p className="text-stone-700 text-sm leading-relaxed">
            {product.fullDescription}
          </p>

          {/* Key Formula Composition Teaser */}
          {product.composition && (
            <div className="p-4 bg-[#F5F2EB] rounded-2xl border border-[#E4DEC D] space-y-2 text-xs">
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
                  className="px-3.5 py-2 text-stone-600 hover:text-stone-900 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-sm font-mono font-bold text-stone-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-2 text-stone-600 hover:text-stone-900 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="text-xs text-stone-500 font-mono">
                Subtotal: <strong className="text-[#155D27] text-sm font-bold">PKR {(product.price * quantity).toLocaleString()}</strong>
              </div>
            </div>

            {/* Primary Action Buttons - Strictly NO phone numbers in button text */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => onAddToCart(product, quantity)}
                className="w-full py-3.5 px-5 bg-[#155D27] hover:bg-[#1C7A38] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Cart</span>
              </button>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-3.5 px-5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order via WhatsApp</span>
              </button>
            </div>

            {/* Nationwide Delivery Guarantees */}
            <div className="pt-3 border-t border-stone-200 grid grid-cols-2 gap-3 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#155D27] shrink-0" />
                <span>Nationwide Courier Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#155D27] shrink-0" />
                <span>7-Day Quality Replacement</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabbed In-Depth Information Section */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-sm space-y-8">
        <div className="flex flex-wrap border-b border-stone-200 gap-4 sm:gap-8 text-sm font-semibold">
          <button
            onClick={() => setActiveInfoTab('formulation')}
            className={`pb-3 transition-colors cursor-pointer ${
              activeInfoTab === 'formulation'
                ? 'border-b-2 border-[#155D27] text-[#155D27]'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            Detailed Formulation
          </button>
          <button
            onClick={() => setActiveInfoTab('benefits')}
            className={`pb-3 transition-colors cursor-pointer ${
              activeInfoTab === 'benefits'
                ? 'border-b-2 border-[#155D27] text-[#155D27]'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            Therapeutic Benefits
          </button>
          <button
            onClick={() => setActiveInfoTab('usage')}
            className={`pb-3 transition-colors cursor-pointer ${
              activeInfoTab === 'usage'
                ? 'border-b-2 border-[#155D27] text-[#155D27]'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            Suggested Usage & Dosing
          </button>
          <button
            onClick={() => setActiveInfoTab('quality')}
            className={`pb-3 transition-colors cursor-pointer ${
              activeInfoTab === 'quality'
                ? 'border-b-2 border-[#155D27] text-[#155D27]'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            PSQCA & Lab Testing
          </button>
          <button
            onClick={() => setActiveInfoTab('reviews')}
            className={`pb-3 transition-colors cursor-pointer ${
              activeInfoTab === 'reviews'
                ? 'border-b-2 border-[#155D27] text-[#155D27]'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            Buyer Reviews ({displayReviews.length})
          </button>
        </div>

        {/* Tab 1: Detailed Formulation */}
        {activeInfoTab === 'formulation' && (
          <div className="space-y-6 text-xs text-stone-700">
            {product.composition ? (
              <div className="space-y-4">
                <p className="text-sm text-stone-600 leading-relaxed">
                  Every 200g jar of <strong>{product.name}</strong> is compounded according to ancient botanical synergism. Eight standardized whole herbs are cold-milled and blended in exact ratios:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {product.composition.map((c, i) => (
                    <div key={i} className="p-3 bg-[#FAF9F5] rounded-xl border border-stone-200 space-y-1">
                      <div className="flex justify-between items-baseline font-bold text-stone-900 text-xs">
                        <span>{c.ingredient}</span>
                        <span className="font-mono text-[#155D27]">{c.amount}</span>
                      </div>
                      <span className="text-[10px] text-stone-400 block italic">({c.localName})</span>
                      <p className="text-[11px] text-stone-600 mt-1">{c.role}</p>
                    </div>
                  ))}
                </div>

                {product.enrichedWith && (
                  <div className="pt-3 border-t border-stone-200">
                    <span className="font-bold text-stone-900 block mb-2 text-xs">
                      Enriched with Essential Natural Minerals:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {product.enrichedWith.map((m) => (
                        <span key={m} className="px-3 py-1 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-full font-medium text-xs">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <h4 className="font-serif font-bold text-base text-stone-900">
                  Single-Origin Botanical Purity
                </h4>
                <p className="text-sm leading-relaxed">
                  Harvested sustainably without chemical processing, artificial heat denaturation, or micro-filtering. Retaining all raw enzymes, botanical bioactives, and trace antioxidants.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Therapeutic Benefits */}
        {activeInfoTab === 'benefits' && (
          <div className="space-y-4 text-xs text-stone-700">
            <h4 className="font-serif font-bold text-base text-stone-900">
              Evidence-Aligned Whole-Plant Benefits:
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              {product.benefits.map((b, idx) => (
                <li key={idx} className="flex items-start gap-2.5 p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span className="text-stone-800">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tab 3: Suggested Usage & Dosing */}
        {activeInfoTab === 'usage' && (
          <div className="space-y-4 text-xs text-stone-700">
            <div className="p-5 bg-emerald-50/70 rounded-2xl border border-emerald-200/80 space-y-2">
              <span className="font-serif font-bold text-base text-emerald-900 block">
                Daily Recommended Serving:
              </span>
              <p className="text-sm text-emerald-950 leading-relaxed">
                {product.directions}
              </p>
            </div>
            <div className="text-stone-500 text-[11px] space-y-1">
              <p>• Best taken consistently for 4–6 weeks for deep cellular vitality.</p>
              <p>• Store in a cool, dry place away from direct sunlight. Reseal cap tightly after each use.</p>
            </div>
          </div>
        )}

        {/* Tab 4: PSQCA & Lab Testing */}
        {activeInfoTab === 'quality' && (
          <div className="space-y-4 text-xs text-stone-700">
            <h4 className="font-serif font-bold text-base text-stone-900">
              Laboratory Assays & Legal Assurance
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                <span className="font-bold text-stone-900 block">SECP Corporate Registration</span>
                <p>AMMAMA Foods (Pvt.) Ltd. is registered with the Securities and Exchange Commission of Pakistan under UCI No. <strong>0303557</strong>.</p>
              </div>
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                <span className="font-bold text-stone-900 block">Heavy Metal Screening</span>
                <p>Triple cold-cleaning protocol. Tested for lead, cadmium, and arsenic in compliance with PSQCA food safety thresholds.</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Customer Reviews */}
        {activeInfoTab === 'reviews' && (
          <div className="space-y-4 text-xs text-stone-700">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5 text-[#C28E3A]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <strong className="text-stone-900 text-sm">4.8 / 5.0 Rating</strong>
              </div>
              <span className="text-stone-400">Verified Pakistani Buyers</span>
            </div>

            <div className="space-y-3">
              {displayReviews.map((rev) => (
                <div key={rev.id} className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <strong className="text-stone-900 text-xs">{rev.name} ({rev.city})</strong>
                    <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold">
                      Verified Purchase
                    </span>
                  </div>
                  <p className="text-stone-700 italic text-xs leading-relaxed">"{rev.comment}"</p>
                  <span className="text-[10px] text-stone-400 block">{rev.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Related Products Carousel / Grid */}
      <div className="space-y-6 pt-6 border-t border-stone-200">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-2xl font-bold text-stone-900">
            Complementary Organic Products
          </h3>
          <button
            onClick={() => {
              setActiveTab('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-semibold text-[#155D27] hover:underline cursor-pointer"
          >
            View Entire Catalog →
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
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-104"
                />
              </div>

              <div className="pt-3 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C28E3A]">
                  {rel.weight}
                </span>
                <h4 className="font-serif font-bold text-base text-stone-900 group-hover:text-[#155D27] transition-colors truncate">
                  {rel.name}
                </h4>
                <div className="flex justify-between items-baseline pt-1">
                  <span className="font-serif text-base font-bold text-[#155D27]">
                    PKR {rel.price.toLocaleString()}
                  </span>
                  <button
                    onClick={() => {
                      onSelectProduct(rel);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs font-semibold text-stone-700 hover:text-[#155D27] cursor-pointer"
                  >
                    View Details →
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
