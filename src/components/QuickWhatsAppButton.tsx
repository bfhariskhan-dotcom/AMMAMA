import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

export const QuickWhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center group">
      {/* Tooltip on Desktop */}
      <div className="hidden sm:flex items-center mr-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div className="bg-stone-900/90 text-white text-[11px] font-medium py-1.5 px-3 rounded-full shadow-lg backdrop-blur-xs flex items-center gap-1.5 whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
          <span>Order &amp; Inquiry: {COMPANY_INFO.whatsappDisplay}</span>
        </div>
      </div>

      {/* Floating Small Circular WhatsApp Button */}
      <a
        href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(
          'Assalam-o-Alaikum Ammama Wellness Shelf! I would like to inquire about your pure organic products.'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Ammama Wellness Shelf"
        className="relative w-12 h-12 sm:w-13 sm:h-13 bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center cursor-pointer hover:scale-105"
      >
        {/* Subtle Green Ambient Pulse Ring */}
        <span className="absolute -inset-0.5 rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none" />

        {/* WhatsApp Icon */}
        <MessageCircle className="w-6 h-6 fill-current relative z-10 transition-transform duration-200 group-hover:rotate-6" />

        {/* Online Status Green Dot */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center shadow-xs">
          <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
        </span>
      </a>
    </div>
  );
};
