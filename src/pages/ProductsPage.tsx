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
  Share2,
  Box,
  Truck,
} from 'lucide-react';
import { Product, CategoryItem } from '../types';
import { COMPANY_INFO } from '../data/companyData';

interface ProductsPageProps {
  products: Product[];
  categories: CategoryItem[];
  onOpenProductModal: (product: Product) => void;
  onOpenSingleProduct?: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onShowToast: (msg: string) => void;
  initialCategory?: string;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  products,
  categories,
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

  const categoryTabs = [
    { id: 'all', label: `All (${products.length})` },
    ...categories.map((c) => ({ id: c.id, label: c.name })),
  ];

  const filteredProducts = products.filter((p) => {
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

  const handleCopyLink = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname}#product/${product.id}`;
    navigator.clipboard.writeText(url);
    onShowToast(`Direct link for ${product.name} copied to clipboard!`);
  };

  const handleConfirmInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryModalProduct) return;

    const message = `Assalam-o-Alaikum Ammama Wellness Shelf (UCI: ${COMPANY_INFO.uci}),\nOrder Inquiry for: ${inquiryModalProduct.name}\nQuantity: ${inquiryQty}\nCustomer: ${inquiryName}\nCity: ${inquiryCity}\nNote: ${inquiryNote || 'Standard order'}`;
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
    setInquiryModalProduct(null);
    onShowToast('Direct sell order initiated on WhatsApp!');
  };

  return (
    <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-5 sm:space-y-7">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-stone-200">
        <div className="max-w-2xl space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#155D27] bg-[#155D27]/10 px-2.5 py-0.5 rounded-full">
              Pure Organic Catalog
            </span>
            <span className="text-xs text-stone-400">· {products.length} Verified Formulations</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#142A1E]">
            Ammama Wellness Shelf
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            Pure organic foods, raw honey, cultured desi ghee &amp; cold-pressed olive oils delivered nationwide across Pakistan.
          </p>
        </div>

        {/* Search bar */}
        <div className="w-full md:w-72 relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-stone-300 rounded-xl text-xs focus:border-[#1C432E] focus:outline-none shadow-2xs"
          />
        </div>
      </div>

      {/* Interactive Category Segmented Tabs */}
      <div className="flex flex-wrap items-center gap-1.5">
        {categoryTabs.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-[#1C432E] text-white shadow-xs'
                : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product Grid - 2 columns on mobile, 3 on lg */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-10 text-center space-y-2">
          <p className="font-serif text-lg font-bold text-stone-800">No products found in this category</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="px-4 py-1.5 bg-[#155D27] text-white text-xs font-semibold rounded-lg whitespace-nowrap cursor-pointer"
          >
            View All Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`bg-white rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-2xs hover:shadow-md ${
                product.isFlagship
                  ? 'border-[#C28E3A]/60 ring-1 ring-[#C28E3A]/20'
                  : 'border-stone-200 hover:border-stone-300'
              }`}
            >
              {/* Portrait Image Box (Never Cropped) */}
              <div
                onClick={() => (onOpenSingleProduct ? onOpenSingleProduct(product) : onOpenProductModal(product))}
                className="relative bg-[#FAF9F5] aspect-[4/4.3] overflow-hidden flex items-center justify-center p-2.5 sm:p-4 cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-103"
                />

                {product.badge && (
                  <div className="absolute top-2 left-2 bg-[#1C432E] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs max-w-[75%] truncate">
                    {product.badge}
                  </div>
                )}

                <div className="absolute top-2 right-2 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={(e) => handleCopyLink(product, e)}
                    className="p-1.5 bg-white/90 hover:bg-white text-stone-700 hover:text-[#1C432E] rounded-full shadow-xs transition-colors cursor-pointer"
                    title="Copy Product Link"
                  >
                    <Share2 className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenProductModal(product);
                    }}
                    className="p-1.5 bg-white/90 hover:bg-white text-stone-700 hover:text-[#1C432E] rounded-full shadow-xs transition-colors cursor-pointer"
                    title="Quick View"
                  >
                    <Eye className="w-3 h-3" />
                  </button>
                </div>

                <div className="absolute bottom-2 left-2 text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/95 text-stone-700 border border-stone-200">
                  {product.weight}
                </div>
              </div>

              {/* Product Body */}
              <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-stone-500">
                    <span className="uppercase tracking-wider font-semibold text-[#C28E3A] truncate">
                      {product.packagingType || 'Pack'}
                    </span>
                    <span
                      className={`font-semibold text-[9px] px-1.5 py-0.5 rounded-full whitespace-nowrap ${
                        product.delivery === 'Free'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {product.delivery === 'Free' ? 'Free Del.' : 'COD'}
                    </span>
                  </div>

                  <h3
                    onClick={() => (onOpenSingleProduct ? onOpenSingleProduct(product) : onOpenProductModal(product))}
                    className="font-serif font-bold text-sm sm:text-base text-stone-900 group-hover:text-[#1C432E] transition-colors cursor-pointer line-clamp-1"
                  >
                    {product.name}
                  </h3>
                </div>

                {/* Price & Single-Line Purchase Actions */}
                <div className="pt-2 border-t border-stone-100 space-y-2">
                  <div className="flex items-baseline justify-between gap-1">
                    <span className="font-serif font-bold text-base sm:text-lg text-[#1C432E] whitespace-nowrap">
                      PKR {product.price.toLocaleString()}
                    </span>
                    {product.compareAtPrice && product.compareAtPrice > product.price && (
                      <span className="text-[10px] text-stone-400 line-through whitespace-nowrap">
                        PKR {product.compareAtPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => (onOpenSingleProduct ? onOpenSingleProduct(product) : onOpenProductModal(product))}
                      className="py-1.5 px-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-semibold rounded-lg transition-colors text-center whitespace-nowrap cursor-pointer"
                    >
                      Details
                    </button>

                    <button
                      onClick={() => onAddToCart(product, 1)}
                      className="py-1.5 px-2 bg-[#1C432E] hover:bg-[#25573C] text-white text-[11px] font-semibold rounded-lg transition-colors text-center whitespace-nowrap cursor-pointer shadow-xs inline-flex items-center justify-center gap-1"
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
      )}

      {/* Direct Sell / Customer Inquiry Floating Modal */}
      {inquiryModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-stone-200 shadow-2xl space-y-4">
            <h3 className="font-serif font-bold text-xl text-stone-900">
              Order Inquiry: {inquiryModalProduct.name}
            </h3>
            <p className="text-xs text-stone-500">
              Submit your details to connect directly with AMMAMA customer logistics via WhatsApp for immediate courier dispatch.
            </p>

            <form onSubmit={handleConfirmInquiry} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={inquiryName}
                  onChange={(e) => setInquiryName(e.target.value)}
                  placeholder="e.g. Tariq Mehmood"
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:border-[#1C432E] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Destination City</label>
                <input
                  type="text"
                  required
                  value={inquiryCity}
                  onChange={(e) => setInquiryCity(e.target.value)}
                  placeholder="e.g. Peshawar, Lahore, Islamabad"
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:border-[#1C432E] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={inquiryQty}
                  onChange={(e) => setInquiryQty(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:border-[#1C432E] focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setInquiryModalProduct(null)}
                  className="flex-1 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send via WhatsApp</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
