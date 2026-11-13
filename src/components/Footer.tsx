import React from 'react';
import { ArrowUpRight, MapPin, Phone, Mail } from 'lucide-react';
import { PageTab, Product } from '../types';
import { COMPANY_INFO } from '../data/companyData';
import { AmmamaLogo } from './AmmamaLogo';

interface FooterProps {
  products: Product[];
  setActiveTab: (tab: PageTab) => void;
  onOpenSingleProduct: (product: Product) => void;
}

export const Footer: React.FC<FooterProps> = ({ products, setActiveTab, onOpenSingleProduct }) => {
  const handleNav = (tab: PageTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#122A1C] text-stone-300 pt-10 pb-8 border-t border-[#1C3B2A] text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start text-left">
          {/* Brand Identity */}
          <div className="md:col-span-4 space-y-3 text-left">
            <button
              onClick={() => handleNav('home')}
              className="focus:outline-none cursor-pointer text-left block"
            >
              <AmmamaLogo size="lg" inverted={true} showSubtitle={false} twoLineTitle={true} />
            </button>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm text-left">
              Pure organic foods &amp; herbal formulas crafted with authentic botanical integrity. Formulated to support vital organs, natural vitality, and cellular longevity.
            </p>
          </div>

          {/* Dynamic Catalog Links */}
          <div className="md:col-span-3 space-y-2.5 text-left">
            <h4 className="font-serif text-xs font-bold text-white uppercase tracking-wider text-left">
              Explore Store
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-400 text-left">
              {products.slice(0, 6).map((prod) => (
                <li key={prod.id} className="text-left">
                  <button
                    onClick={() => onOpenSingleProduct(prod)}
                    className="hover:text-white transition-colors cursor-pointer text-left block truncate max-w-full"
                  >
                    {prod.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Governance & Care */}
          <div className="md:col-span-2 space-y-2.5 text-left">
            <h4 className="font-serif text-xs font-bold text-white uppercase tracking-wider text-left">
              Governance &amp; Care
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-400 text-left">
              <li className="text-left">
                <button
                  onClick={() => handleNav('customer-hub')}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Customer Reviews &amp; Tracking
                </button>
              </li>
              <li className="text-left">
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Peshawar Store &amp; Contact
                </button>
              </li>
              <li className="text-left">
                <button
                  onClick={() => handleNav('events')}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Botanical Research &amp; Studies
                </button>
              </li>
              <li className="text-left">
                <button
                  onClick={() => handleNav('governance')}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  SECP Credentials &amp; Policies
                </button>
              </li>
              <li className="pt-2 text-left">
                <button
                  onClick={() => handleNav('admin')}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-[#1F412D] hover:bg-[#28573D] text-[#E6C687] hover:text-white rounded text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
                  title="Open Store Administration Dashboard"
                >
                  <span>Admin Portal</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Store Location & Direct Contact Info */}
          <div className="md:col-span-3 space-y-2.5 text-left">
            <h4 className="font-serif text-xs font-bold text-white uppercase tracking-wider text-left">
              {COMPANY_INFO.brandName}
            </h4>
            <div className="space-y-2 text-xs text-stone-400 text-left">
              <div className="flex items-start gap-2 text-left">
                <MapPin className="w-4 h-4 text-[#E6C687] shrink-0 mt-0.5" />
                <span className="leading-snug text-left">{COMPANY_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2 text-left">
                <Phone className="w-4 h-4 text-[#E6C687] shrink-0" />
                <span className="font-mono text-stone-200">{COMPANY_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-left">
                <Mail className="w-4 h-4 text-[#E6C687] shrink-0" />
                <span>{COMPANY_INFO.email}</span>
              </div>
            </div>
            <div className="p-2.5 bg-[#183925] rounded-lg border border-[#214D32] text-[11px] text-stone-300 text-left">
              <span className="text-[#E6C687] font-semibold block mb-0.5">Nationwide Service</span>
              Cash on Delivery (COD) across Pakistan. Free delivery on orders over PKR 5,000 and select items.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-5 border-t border-[#1F412D] flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] text-stone-400 gap-3 text-left">
          <p className="text-left">© 2025–2026 {COMPANY_INFO.brandName} · AMMAMA FOODS (PVT.) LTD. All rights reserved.</p>
          <div className="flex items-center gap-4 text-left">
            <button
              onClick={() => handleNav('governance')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={() => handleNav('governance')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms of Purchase
            </button>
            <span>·</span>
            <button
              onClick={() => handleNav('governance')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Damage Claims
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
