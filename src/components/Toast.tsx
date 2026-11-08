import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-[#1C432E] text-white px-5 py-3 rounded-lg shadow-xl border border-[#2B5A40] text-xs font-medium animate-in fade-in slide-in-from-bottom-4 duration-200 max-w-md w-[90%]">
      <CheckCircle2 className="w-4 h-4 text-[#E6C687] shrink-0" />
      <span className="flex-1">{message}</span>
      <button
        onClick={onClose}
        className="text-stone-300 hover:text-white p-1 -mr-1"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
