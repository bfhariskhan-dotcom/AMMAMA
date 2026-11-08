import React from 'react';
import { ShieldCheck, MessageCircle, ArrowUpRight } from 'lucide-react';
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
          {/* Brand Logo - Image only, NO side text per instructions */}
          <div className="md:col-span-4 space-y-4">
            <button
              onClick={() => handleNav('home')}
              className="focus:outline-none cursor-pointer"
            >
              <AmmamaLogo size="lg" />
            </button>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Pure organic foods & herbal formulas crafted with botanical integrity. Registered with SECP under Corporate Unique Identity No. <strong>0303557</strong>.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#E6C687]">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Section 16, Companies Act-2017</span>
            </div>
          </div>

          {/* Quick Links */}
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
                  Terra Herbs-8 Formula
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('products')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Wild Potohar Sidr Honey
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('products')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Organic Moringa Powder
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('products')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  A2 Vedic Bilona Ghee
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="font-serif text-xs font-bold text-white uppercase tracking-wider">
              Governance & Care
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => handleNav('customer-hub')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Customer Reviews & Track Order
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact & Leadership
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('governance')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  SECP Credentials & Policies
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('admin')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Admin Management</span>
                  <ArrowUpRight className="w-3 h-3 text-stone-500" />
                </button>
              </li>
            </ul>
          </div>

          {/* Direct WhatsApp - strictly NO phone number in button text */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-serif text-xs font-bold text-white uppercase tracking-wider">
              Direct Support
            </h4>
            <p className="text-[11px] text-stone-400">
              Nationwide Cash on Delivery (COD) across Pakistan.
            </p>
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(
                'Assalam-o-Alaikum AMMAMA Foods! I have an order inquiry.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold rounded-md transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#1F412D] flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400 gap-3">
          <p>© 2025–2026 AMMAMA FOODS (PVT.) LTD. All rights reserved.</p>
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
