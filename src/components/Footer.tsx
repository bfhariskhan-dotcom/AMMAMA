import React from 'react';
import { ShieldCheck, ArrowUpRight, MapPin, Phone, Mail } from 'lucide-react';
import { PageTab } from '../types';
import { COMPANY_INFO } from '../data/companyData';
import { AmmamaLogo } from './AmmamaLogo';

interface FooterProps {
  setActiveTab: (tab: PageTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const handleNav = (tab: PageTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#122A1C] text-stone-300 pt-14 pb-10 border-t border-[#1C3B2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Identity & SECP Compliance */}
          <div className="md:col-span-4 space-y-4">
            <button
              onClick={() => handleNav('home')}
              className="focus:outline-none cursor-pointer text-left"
            >
              <AmmamaLogo size="lg" inverted={true} />
            </button>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Pure organic foods &amp; herbal formulas crafted with authentic botanical integrity. Formulated to support vital organs, natural vitality, and cellular longevity.
            </p>
          </div>

          {/* Catalog Links */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="font-serif text-xs font-bold text-white uppercase tracking-wider">
              Explore Store
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => handleNav('products')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Terra Herbs-8 (Flagship Formula)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('products')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Pure Berry Nectar Honey of Karak
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('products')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Cholistan Pure Desi Ghee
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('products')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Mudanya Extra Virgin Olive Oil (5L)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('products')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Mundial &amp; Pomace Olive Oils
                </button>
              </li>
            </ul>
          </div>

          {/* Governance & Admin Portal Option */}
          <div className="md:col-span-2 space-y-2.5">
            <h4 className="font-serif text-xs font-bold text-white uppercase tracking-wider">
              Governance &amp; Care
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => handleNav('customer-hub')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Customer Reviews &amp; Tracking
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Peshawar Store &amp; Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('events')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Botanical Research &amp; Studies
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('governance')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  SECP Credentials &amp; Policies
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => handleNav('admin')}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-[#1F412D] hover:bg-[#28573D] text-[#E6C687] hover:text-white rounded text-xs font-semibold transition-colors cursor-pointer"
                  title="Open Store Administration Dashboard"
                >
                  <span>Admin Portal</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Store Location & Direct Contact Info (NO excessive WhatsApp button) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif text-xs font-bold text-white uppercase tracking-wider">
              Ammama Wellness Shelf
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E6C687] shrink-0 mt-0.5" />
                <span className="leading-snug">{COMPANY_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#E6C687] shrink-0" />
                <span className="font-mono text-stone-200">{COMPANY_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E6C687] shrink-0" />
                <span>{COMPANY_INFO.email}</span>
              </div>
            </div>
            <div className="p-2.5 bg-[#183925] rounded-lg border border-[#214D32] text-[11px] text-stone-300">
              <span className="text-[#E6C687] font-semibold block mb-0.5">Nationwide Service</span>
              Cash on Delivery (COD) across Pakistan. Free delivery on orders over PKR 3,500 and all Olive Oil 5L packs.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#1F412D] flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400 gap-3">
          <p>© 2025–2026 {COMPANY_INFO.brandName} · AMMAMA FOODS (PVT.) LTD. All rights reserved.</p>
          <div className="flex items-center gap-4">
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
