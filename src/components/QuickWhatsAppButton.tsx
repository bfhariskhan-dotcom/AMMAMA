import React from 'react';
import { MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

export const QuickWhatsAppButton: React.FC = () => {
  return (
    <a
      href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(
        'Assalam-o-Alaikum AMMAMA Foods! I have an inquiry regarding your organic products & herbal formulations.'
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 group flex items-center gap-2.5 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl hover:bg-[#20ba59] transition-all duration-200 cursor-pointer"
      aria-label="Contact AMMAMA Foods via WhatsApp"
    >
      <MessageCircle className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
      <span className="hidden sm:inline text-xs font-semibold tracking-wide">
        Order via WhatsApp
      </span>
    </a>
  );
};
