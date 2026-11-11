import React, { useState, useEffect } from 'react';
import { X, Check, ShoppingBag, ShieldCheck, Heart, Sparkles, MessageCircle, Layers, Box, Truck } from 'lucide-react';
import { Product, ProductVariant } from '../types';
import { COMPANY_INFO } from '../data/companyData';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, variant?: ProductVariant) => void;
  onShowToast: (msg: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onShowToast,
}) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'composition' | 'directions'>('overview');

  useEffect(() => {
    if (product && product.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    } else {
      setSelectedVariant(undefined);
    }
    setQuantity(1);
  }, [product]);

  if (!product) return null;

  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentWeight = selectedVariant ? selectedVariant.weight : product.weight;
  const currentPackaging = selectedVariant ? selectedVariant.packagingType : (product.packagingType || 'Packaging');
  const currentDelivery = selectedVariant ? selectedVariant.delivery : (product.delivery || 'Free');

  const handleOrderWhatsApp = () => {
    const text = `Assalam-o-Alaikum Ammama Wellness Shelf (UCI: ${COMPANY_INFO.uci}),\nI want to order:\n• ${product.name} (${currentPackaging} - ${currentWeight})\n• Quantity: ${quantity}\n• Delivery: ${currentDelivery === 'Free' ? 'Free Nationwide Delivery' : 'Charges applied'}\nTotal: PKR ${(currentPrice * quantity).toLocaleString()}\nPlease confirm delivery.`;
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
    onShowToast('Opening WhatsApp with your order draft...');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative bg-[#FAF8F5] max-w-3xl w-full rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-stone-600 hover:text-stone-900 shadow-xs transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image & Packaging Highlights - Full Contain */}
            <div className="p-6 bg-[#F4EFE6] flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-stone-200">
              <div className="relative rounded-2xl overflow-hidden shadow-sm max-w-xs w-full bg-white aspect-square p-6 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
                {product.badge && (
                  <div className="absolute top-3 left-3 bg-[#1C432E] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full tracking-wider uppercase shadow-xs">
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Tagline & Net Weight Pill */}
              <div className="mt-4 flex items-center justify-between w-full max-w-xs text-xs text-stone-600 px-2">
                <span>{currentPackaging}: <strong className="text-stone-900 font-mono">{currentWeight}</strong></span>
                <span className={currentDelivery === 'Free' ? 'text-emerald-700 font-semibold' : 'text-stone-500'}>
                  {currentDelivery === 'Free' ? 'Free Delivery' : 'Charges applied'}
                </span>
              </div>
            </div>

            {/* Information Column */}
            <div className="p-6 md:p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#C28E3A] font-bold">
                  Ammama Wellness Shelf
                </span>
                <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                  {product.name}
                </h3>
                <p className="text-xs text-stone-500 italic mt-0.5">{product.subtitle}</p>

                <div className="flex items-baseline gap-3 my-3">
                  <span className="font-serif text-3xl font-bold text-[#1C432E]">
                    PKR {currentPrice.toLocaleString()}
                  </span>
                  <span className="text-xs text-stone-500">Tax inclusive · Cash on Delivery</span>
                </div>

                {/* Variant selector */}
                {product.variants && product.variants.length > 1 && (
                  <div className="mb-4 p-2.5 bg-white rounded-xl border border-stone-200 space-y-1.5 text-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                      Select Packaging & Size:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {product.variants.map((v) => {
                        const isSelected = selectedVariant?.id === v.id;
                        return (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => setSelectedVariant(v)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#1C432E] text-white shadow-xs'
                                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                            }`}
                          >
                            {v.weight} ({v.packagingType})
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Sub-tabs */}
                <div className="flex border-b border-stone-200 gap-4 mb-4 text-xs font-medium">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`pb-2 transition-colors cursor-pointer ${
                      activeTab === 'overview'
                        ? 'border-b-2 border-[#1C432E] text-[#1C432E] font-semibold'
                        : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    Overview
                  </button>
                  {product.composition && (
                    <button
                      onClick={() => setActiveTab('composition')}
                      className={`pb-2 transition-colors cursor-pointer ${
                        activeTab === 'composition'
                          ? 'border-b-2 border-[#1C432E] text-[#1C432E] font-semibold'
                          : 'text-stone-500 hover:text-stone-800'
                      }`}
                    >
                      Composition ({product.composition.length} Herbs)
                    </button>
                  )}
                  <button
                    onClick={() => setActiveTab('directions')}
                    className={`pb-2 transition-colors cursor-pointer ${
                      activeTab === 'directions'
                        ? 'border-b-2 border-[#1C432E] text-[#1C432E] font-semibold'
                        : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    Usage & Directions
                  </button>
                </div>

                {/* Tab content */}
                <div className="text-xs text-stone-700 space-y-3 min-h-[140px] max-h-52 overflow-y-auto pr-1">
                  {activeTab === 'overview' && (
                    <>
                      <p className="leading-relaxed">{product.fullDescription}</p>
                      <div className="space-y-1.5 pt-2">
                        <span className="font-semibold text-stone-900 text-xs block">
                          Key Benefits:
                        </span>
                        {product.benefits.slice(0, 4).map((b, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {activeTab === 'composition' && product.composition && (
                    <div className="space-y-2">
                      <p className="text-[11px] text-stone-500">
                        Exact pharmaceutical & botanical compounding:
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {product.composition.map((c, idx) => (
                          <div
                            key={idx}
                            className="p-2 bg-white rounded border border-stone-200 text-[11px]"
                          >
                            <div className="flex justify-between items-baseline font-semibold text-stone-900">
                              <span>{c.ingredient}</span>
                              <span className="font-mono text-[#1C432E]">{c.amount}</span>
                            </div>
                            <p className="text-[10px] text-stone-500 mt-0.5">{c.role}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'directions' && (
                    <div className="space-y-3">
                      <div className="p-3 bg-stone-100 rounded-xl leading-relaxed">
                        <span className="font-semibold text-stone-900 block mb-1">
                          Directions for Use:
                        </span>
                        <p>{product.directions}</p>
                      </div>

                      {product.enrichedWith && (
                        <div>
                          <span className="font-semibold text-stone-900 block mb-1.5">
                            Enriched with Essential Natural Minerals:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {product.enrichedWith.map((mineral, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-[11px] font-medium"
                              >
                                {mineral}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Purchase Actions */}
              <div className="mt-6 pt-4 border-t border-stone-200 space-y-2.5">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-stone-300 rounded-xl bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 text-stone-600 hover:text-stone-900 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-3 font-mono font-medium text-sm">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1.5 text-stone-600 hover:text-stone-900 cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      onAddToCart(product, quantity, selectedVariant);
                      onClose();
                    }}
                    className="flex-1 py-2.5 px-4 bg-[#1C432E] hover:bg-[#25573C] text-white rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart (PKR {(currentPrice * quantity).toLocaleString()})</span>
                  </button>
                </div>

                <button
                  onClick={handleOrderWhatsApp}
                  className="w-full py-2 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order directly on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
