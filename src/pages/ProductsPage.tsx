import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  MessageCircle,
  Eye,
  Check,
  Search,
  Filter,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS, COMPANY_INFO } from '../data/companyData';

interface ProductsPageProps {
  onOpenProductModal: (product: Product) => void;
  onOpenSingleProduct?: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onShowToast: (msg: string) => void;
  initialCategory?: string;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  onOpenProductModal,
  onOpenSingleProduct,
  onAddToCart,
  onShowToast,
  initialCategory = 'all',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inquiryModalProduct, setInquiryModalProduct] = useState<Product | null>(null);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryCity, setInquiryCity] = useState('');
  const [inquiryQty, setInquiryQty] = useState(1);
  const [inquiryNote, setInquiryNote] = useState('');

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'formula', label: 'Herbal Formulas' },
    { id: 'olive-oil', label: 'Premium Olive Oils (5L)' },
    { id: 'honey', label: 'Raw Honey' },
    { id: 'ghee', label: 'Pure Desi Ghee' },
  ];

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.composition &&
        p.composition.some((c) =>
          c.ingredient.toLowerCase().includes(searchQuery.toLowerCase())
        ));
    return matchesCategory && matchesSearch;
  });

  const handleDirectWhatsAppOrder = (product: Product) => {
    const message = `Assalam-o-Alaikum AMMAMA Foods (UCI: ${COMPANY_INFO.uci}),\nI want to place an order for:\n• ${product.name} (${product.weight}) - Price: PKR ${product.price.toLocaleString()}\nPlease guide me on delivery and confirmation.`;
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
    onShowToast(`Opening WhatsApp order for ${product.name}...`);
  };

  const handleConfirmInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryModalProduct) return;

    const message = `Assalam-o-Alaikum AMMAMA Foods (UCI: ${COMPANY_INFO.uci}),\nOrder Inquiry for: ${inquiryModalProduct.name}\nQuantity: ${inquiryQty}\nCustomer: ${inquiryName}\nCity: ${inquiryCity}\nNote: ${inquiryNote || 'Standard order'}`;
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
    setInquiryModalProduct(null);
    onShowToast('Direct sell order initiated on WhatsApp!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C28E3A]">
            <ShieldCheck className="w-4 h-4 text-[#1C432E]" />
            <span>Unadulterated Whole-Plant Harvest</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#142A1E]">
            Pure Organic Products
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Formulated and preserved in Pakistan with verified botanical proportions, zero chemical additives, and complete laboratory transparency.
          </p>
        </div>

        {/* Search bar */}
        <div className="w-full md:w-72 relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search herbs, honey, ghee..."
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-stone-300 rounded-md text-xs focus:border-[#1C432E] focus:outline-none shadow-2xs"
          />
        </div>
      </div>

      {/* Interactive Category Segmented Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-[#1C432E] text-white shadow-xs'
                : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className={`bg-white rounded-xl border transition-all duration-200 flex flex-col justify-between overflow-hidden group shadow-2xs hover:shadow-md ${
              product.isFlagship
                ? 'border-[#C28E3A]/60 ring-1 ring-[#C28E3A]/20'
                : 'border-stone-200 hover:border-stone-300'
            }`}
          >
            {/* Image Box */}
            <div
              onClick={() => (onOpenSingleProduct ? onOpenSingleProduct(product) : onOpenProductModal(product))}
              className="relative bg-[#F4EFE6] aspect-4/3 overflow-hidden flex items-center justify-center p-4 cursor-pointer"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-103"
              />

              {product.badge && (
                <div className="absolute top-3 left-3 bg-[#1C432E] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">
                  {product.badge}
                </div>
              )}

              {/* Quick eye modal trigger */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenProductModal(product);
                }}
                className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white text-stone-700 hover:text-[#1C432E] rounded-full shadow-xs transition-colors cursor-pointer"
                title="View Full Botanical Details"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>

            {/* Product Body */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="uppercase tracking-wider font-semibold text-[#C28E3A]">
                    {product.weight}
                  </span>
                  <span className="font-mono text-xs text-emerald-800 font-medium">
                    100% Organic
                  </span>
                </div>

                <h3
                  onClick={() => (onOpenSingleProduct ? onOpenSingleProduct(product) : onOpenProductModal(product))}
                  className="font-serif text-xl font-bold text-stone-900 group-hover:text-[#1C432E] transition-colors cursor-pointer"
                >
                  {product.name}
                </h3>
                <p className="text-xs text-stone-500 italic">{product.subtitle}</p>

                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {product.shortDescription}
                </p>

                {/* Composition teaser for Terra Herbs-8 */}
                {product.composition && (
                  <div className="pt-2 border-t border-stone-100">
                    <span className="text-[10px] uppercase font-bold text-stone-400 block mb-1">
                      Formula Composition:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {product.composition.slice(0, 4).map((c, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-stone-100 text-stone-700 px-1.5 py-0.5 rounded"
                        >
                          {c.ingredient} ({c.amount})
                        </span>
                      ))}
                      <span className="text-[10px] text-stone-500 font-medium self-center">
                        +4 more
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Price & Actions */}
              <div className="pt-4 border-t border-stone-100 space-y-2">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[11px] text-stone-400 block">Retail Price</span>
                    <span className="font-serif text-xl font-bold text-[#1C432E]">
                      PKR {product.price.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-500">Cash on Delivery</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => onAddToCart(product, 1)}
                    className="py-2.5 px-3 bg-[#1C432E] hover:bg-[#25573C] text-white text-xs font-semibold uppercase tracking-wider rounded flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Add to Cart
                  </button>

                  <button
                    onClick={() => setInquiryModalProduct(product)}
                    className="py-2.5 px-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold rounded flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    Order / Sell
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="py-16 text-center space-y-3 bg-white rounded-xl border border-stone-200">
          <p className="text-stone-600 font-medium">No products found matching "{searchQuery}".</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="text-xs text-[#1C432E] font-semibold underline"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* WhatsApp Sell Order & Inquiry Modal */}
      {inquiryModalProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs"
            onClick={() => setInquiryModalProduct(null)}
          />
          <div className="min-h-full flex items-center justify-center p-4">
            <div className="relative bg-white max-w-md w-full rounded-xl shadow-2xl p-6 space-y-4 border border-stone-200">
              <div className="flex items-start justify-between border-b border-stone-200 pb-3">
                <div>
                  <span className="text-[10px] font-bold text-[#C28E3A] uppercase tracking-wider">
                    Direct Sell Order / Customer Inquiry
                  </span>
                  <h3 className="font-serif text-lg font-bold text-stone-900 mt-0.5">
                    {inquiryModalProduct.name}
                  </h3>
                  <p className="text-xs text-stone-500">
                    Unit Price: PKR {inquiryModalProduct.price.toLocaleString()} ({inquiryModalProduct.weight})
                  </p>
                </div>
                <button
                  onClick={() => setInquiryModalProduct(null)}
                  className="p-1 text-stone-400 hover:text-stone-700"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleConfirmInquiry} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#1C432E] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={inquiryCity}
                      onChange={(e) => setInquiryCity(e.target.value)}
                      placeholder="e.g. Lahore / Islamabad"
                      className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#1C432E] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Quantity (Jars)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={inquiryQty}
                      onChange={(e) => setInquiryQty(parseInt(e.target.value) || 1)}
                      className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#1C432E] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Order Note / Specific Question
                  </label>
                  <textarea
                    rows={2}
                    value={inquiryNote}
                    onChange={(e) => setInquiryNote(e.target.value)}
                    placeholder="e.g. Please confirm delivery time to Gulberg, Lahore"
                    className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#1C432E] focus:outline-none"
                  />
                </div>

                <div className="p-3 bg-stone-50 rounded border border-stone-200 flex justify-between items-center font-semibold">
                  <span>Estimated Total:</span>
                  <span className="font-mono text-[#1C432E] text-sm">
                    PKR {(inquiryModalProduct.price * inquiryQty).toLocaleString()}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold rounded flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  Send Order via WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
