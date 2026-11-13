import React, { useState, useRef, useEffect } from 'react';
import { ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import { PageTab, CategoryItem } from '../types';
import { AmmamaLogo } from './AmmamaLogo';

interface NavbarProps {
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
  cartCount: number;
  openCart: () => void;
  categories: CategoryItem[];
  onSelectProductCategory?: (category: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  openCart,
  categories,
  onSelectProductCategory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpandedGroup, setMobileExpandedGroup] = useState<string | null>(null);

  const navRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (tab: PageTab) => {
    setActiveTab(tab);
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (category: string) => {
    setActiveTab('products');
    if (onSelectProductCategory) {
      onSelectProductCategory(category);
    }
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const tickerItems = [
    'AMMAMA WELLNESS SHELF · SHOP 16, ROHILA MARKET, PHASE III HAYATABAD PESHAWAR',
    'TEL & WHATSAPP: 0314-8973162 · PURE & NATURAL HERBS WELLNESS',
    'FLAGSHIP TERRA HERBS-8: 8 POTENT BOTANICALS + 5 ESSENTIAL MINERALS (200G)',
    'PREMIUM OLIVE OILS: MUDANYA · MUNDIAL · POMACE (FREE NATIONWIDE DELIVERY)',
    'PURE CHOLISTAN DESI GHEE & WILD KARAK BERRY NECTAR HONEY',
    'NATIONWIDE CASH ON DELIVERY (COD) ACROSS PAKISTAN',
  ];

  return (
    <header ref={navRef} className="sticky top-0 z-40 bg-[#FAF8F5]/98 backdrop-blur-md border-b border-stone-200">
      {/* Live Mercury Top Marquee Ticker */}
      <div className="bg-[#122A1C] text-stone-200 text-[11px] overflow-hidden border-b border-[#1E432D] relative py-1.5 select-none">
        <div className="absolute inset-0 mercury-glow pointer-events-none z-10 opacity-40" />
        <div className="animate-mercury-marquee flex items-center gap-12 font-medium tracking-wide">
          {[...tickerItems, ...tickerItems].map((text, idx) => (
            <div key={idx} className="flex items-center gap-3 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E6C687] animate-pulse" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          {/* Brand Logo - Official packaging emblem */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center focus:outline-none cursor-pointer py-1 shrink-0"
            aria-label="Ammama Wellness Shelf Home"
          >
            <AmmamaLogo size="md" hideTextOnMobile={true} />
          </button>

          {/* Clean Desktop Navigation with Dropdowns */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium">
            <button
              onClick={() => handleNavClick('home')}
              className={`py-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'home'
                  ? 'text-[#1C432E] font-bold border-b-2 border-[#1C432E]'
                  : 'text-stone-700 hover:text-[#1C432E]'
              }`}
            >
              Home
            </button>

            {/* Products & Store Dropdown (Dynamic Categories) */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('products')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                onClick={() => handleCategoryClick('all')}
                className={`py-2 inline-flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'products'
                    ? 'text-[#1C432E] font-bold border-b-2 border-[#1C432E]'
                    : 'text-stone-700 hover:text-[#1C432E]'
                }`}
              >
                <span>Products &amp; Store</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    openDropdown === 'products' ? 'rotate-180 text-[#1C432E]' : 'text-stone-400'
                  }`}
                />
              </button>

              {openDropdown === 'products' && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-stone-200 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-400">
                    Organic Product Catalog
                  </div>
                  <button
                    onClick={() => handleCategoryClick('all')}
                    className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:bg-[#FAF8F5] hover:text-[#1C432E] flex items-center justify-between font-semibold cursor-pointer"
                  >
                    <span>All Products</span>
                    <span className="text-[10px] bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded">All</span>
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.id)}
                      className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:bg-[#FAF8F5] hover:text-[#1C432E] transition-colors cursor-pointer"
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Company Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('company')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                className={`py-2 inline-flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'contact' || activeTab === 'events' || activeTab === 'careers'
                    ? 'text-[#1C432E] font-bold border-b-2 border-[#1C432E]'
                    : 'text-stone-700 hover:text-[#1C432E]'
                }`}
              >
                <span>Company</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    openDropdown === 'company' ? 'rotate-180 text-[#1C432E]' : 'text-stone-400'
                  }`}
                />
              </button>

              {openDropdown === 'company' && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-stone-200 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-400">
                    Governance &amp; Leadership
                  </div>
                  <button
                    onClick={() => handleNavClick('contact')}
                    className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:bg-[#FAF8F5] hover:text-[#1C432E] cursor-pointer"
                  >
                    Leadership &amp; Peshawar Store
                  </button>
                  <button
                    onClick={() => handleNavClick('events')}
                    className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:bg-[#FAF8F5] hover:text-[#1C432E] cursor-pointer"
                  >
                    Botanical Research &amp; Case Studies
                  </button>
                  <button
                    onClick={() => handleNavClick('careers')}
                    className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:bg-[#FAF8F5] hover:text-[#1C432E] flex items-center justify-between cursor-pointer"
                  >
                    <span>Careers &amp; Jobs</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.5 rounded">
                      Hiring
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* Customer Care Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('care')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                className={`py-2 inline-flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'customer-hub' || activeTab === 'governance'
                    ? 'text-[#1C432E] font-bold border-b-2 border-[#1C432E]'
                    : 'text-stone-700 hover:text-[#1C432E]'
                }`}
              >
                <span>Customer Care</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    openDropdown === 'care' ? 'rotate-180 text-[#1C432E]' : 'text-stone-400'
                  }`}
                />
              </button>

              {openDropdown === 'care' && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-stone-200 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-400">
                    Customer Experience
                  </div>
                  <button
                    onClick={() => handleNavClick('customer-hub')}
                    className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:bg-[#FAF8F5] hover:text-[#1C432E] cursor-pointer"
                  >
                    Customer Reviews &amp; Feedback
                  </button>
                  <button
                    onClick={() => handleNavClick('customer-hub')}
                    className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:bg-[#FAF8F5] hover:text-[#1C432E] cursor-pointer"
                  >
                    Track Courier Order (TCS / Leopards)
                  </button>
                  <button
                    onClick={() => handleNavClick('governance')}
                    className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:bg-[#FAF8F5] hover:text-[#1C432E] cursor-pointer"
                  >
                    SECP Credentials &amp; Policies
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Action Zone: Cart, Order CTA & Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-full text-stone-700 hover:text-[#1C432E] hover:bg-stone-200/60 transition-colors flex items-center justify-center cursor-pointer"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#1C432E] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => handleCategoryClick('all')}
              className="hidden md:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#1C432E] rounded-md hover:bg-[#25573C] transition-colors duration-150 shadow-xs cursor-pointer whitespace-nowrap"
            >
              Order Online
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-700 hover:text-stone-900 rounded-md hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Responsive Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-[#FAF8F5] px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top-2 duration-200 max-h-[82vh] overflow-y-auto">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-semibold transition-colors ${
              activeTab === 'home' ? 'bg-[#1C432E] text-white' : 'text-stone-800 hover:bg-stone-100'
            }`}
          >
            Home
          </button>

          {/* Mobile Accordion: Products & Store */}
          <div className="border border-stone-200 rounded-lg overflow-hidden bg-white">
            <button
              onClick={() =>
                setMobileExpandedGroup(mobileExpandedGroup === 'products' ? null : 'products')
              }
              className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-stone-800"
            >
              <span>Products &amp; Store</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  mobileExpandedGroup === 'products' ? 'rotate-180 text-[#1C432E]' : 'text-stone-400'
                }`}
              />
            </button>
            {mobileExpandedGroup === 'products' && (
              <div className="bg-[#FAF8F5] px-3 py-2 space-y-1 text-xs border-t border-stone-100">
                <button
                  onClick={() => handleCategoryClick('all')}
                  className="w-full text-left py-1.5 font-semibold text-[#1C432E]"
                >
                  View All Products →
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    className="w-full text-left py-1.5 text-stone-700"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Accordion: Company */}
          <div className="border border-stone-200 rounded-lg overflow-hidden bg-white">
            <button
              onClick={() =>
                setMobileExpandedGroup(mobileExpandedGroup === 'company' ? null : 'company')
              }
              className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-stone-800"
            >
              <span>Company &amp; Governance</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  mobileExpandedGroup === 'company' ? 'rotate-180 text-[#1C432E]' : 'text-stone-400'
                }`}
              />
            </button>
            {mobileExpandedGroup === 'company' && (
              <div className="bg-[#FAF8F5] px-3 py-2 space-y-1 text-xs border-t border-stone-100">
                <button
                  onClick={() => handleNavClick('contact')}
                  className="w-full text-left py-1.5 text-stone-700"
                >
                  Leadership &amp; Peshawar Store
                </button>
                <button
                  onClick={() => handleNavClick('events')}
                  className="w-full text-left py-1.5 text-stone-700"
                >
                  Botanical Research &amp; Case Studies
                </button>
                <button
                  onClick={() => handleNavClick('careers')}
                  className="w-full text-left py-1.5 text-stone-700"
                >
                  Careers &amp; Job Openings
                </button>
              </div>
            )}
          </div>

          {/* Mobile Accordion: Customer Care */}
          <div className="border border-stone-200 rounded-lg overflow-hidden bg-white">
            <button
              onClick={() =>
                setMobileExpandedGroup(mobileExpandedGroup === 'care' ? null : 'care')
              }
              className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-stone-800"
            >
              <span>Customer Care &amp; Policies</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  mobileExpandedGroup === 'care' ? 'rotate-180 text-[#1C432E]' : 'text-stone-400'
                }`}
              />
            </button>
            {mobileExpandedGroup === 'care' && (
              <div className="bg-[#FAF8F5] px-3 py-2 space-y-1 text-xs border-t border-stone-100">
                <button
                  onClick={() => handleNavClick('customer-hub')}
                  className="w-full text-left py-1.5 text-stone-700"
                >
                  Customer Reviews &amp; Feedback
                </button>
                <button
                  onClick={() => handleNavClick('customer-hub')}
                  className="w-full text-left py-1.5 text-stone-700"
                >
                  Track Courier Order
                </button>
                <button
                  onClick={() => handleNavClick('governance')}
                  className="w-full text-left py-1.5 text-stone-700"
                >
                  SECP Credentials &amp; Policies
                </button>
              </div>
            )}
          </div>

          {/* Mobile Cart Button */}
          <div className="pt-2 border-t border-stone-200">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openCart();
              }}
              className="w-full flex items-center justify-between px-4 py-2.5 bg-[#1C432E] text-white text-sm font-semibold rounded-md shadow-xs cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-emerald-200" />
                <span>View Shopping Cart</span>
              </div>
              <span className="font-mono bg-white text-[#1C432E] px-2 py-0.5 rounded text-xs font-bold">
                {cartCount} items
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
