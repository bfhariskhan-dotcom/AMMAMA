import React from 'react';

interface AmmamaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const AmmamaLogo: React.FC<AmmamaLogoProps> = ({
  className = '',
  size = 'md',
}) => {
  // Height sizing tailored for crisp visibility without taking excessive header height
  const heightClass =
    size === 'sm'
      ? 'h-9'
      : size === 'lg'
      ? 'h-14 sm:h-16'
      : size === 'xl'
      ? 'h-18 sm:h-20'
      : 'h-11 sm:h-12';

  const logoSrc = '/assets/terra_herbs_logo.png';
  const fallbackSrc = 'https://i.postimg.cc/mD4GmrMW/Terra-Herbs-8-Leafy-Logo.png';

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      {/* Official Terra Herbs-8 Leafy Logo provided by user - strictly image only, no side text */}
      <img
        src={logoSrc}
        alt="Terra Herbs-8"
        onError={(e) => {
          const target = e.currentTarget;
          if (target.src !== fallbackSrc) {
            target.src = fallbackSrc;
          }
        }}
        className={`${heightClass} w-auto object-contain transition-transform duration-200 hover:scale-[1.02]`}
      />
    </div>
  );
};
