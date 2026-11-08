import React, { useEffect, useState } from 'react';

interface CustomCursorProps {
  enabled: boolean;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ enabled }) => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isPointerDevice, setIsPointerDevice] = useState(true);

  useEffect(() => {
    // Check if device supports hover/fine pointer
    if (typeof window !== 'undefined') {
      const match = window.matchMedia('(pointer: fine)');
      setIsPointerDevice(match.matches);
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      // Check if target or parent is interactive
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('button, a, input, select, textarea, [role="button"], .clickable');
        setIsHovering(!!interactive);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  if (!enabled || !isPointerDevice) return null;

  return (
    <>
      {/* Central pinpoint dot */}
      <div
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
        }}
      >
        <div
          className={`rounded-full transition-all duration-150 ${
            isClicked
              ? 'w-2 h-2 bg-[#1B3E2B]'
              : isHovering
              ? 'w-2.5 h-2.5 bg-[#C28E3A]'
              : 'w-2 h-2 bg-[#2D5A40]'
          }`}
        />
      </div>

      {/* Trailing botanical halo */}
      <div
        className="fixed pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
        }}
      >
        <div
          className={`rounded-full border transition-all duration-200 ${
            isHovering
              ? 'w-10 h-10 border-[#2D5A40] bg-[#2D5A40]/10 scale-110'
              : isClicked
              ? 'w-7 h-7 border-[#1B3E2B] scale-90'
              : 'w-8 h-8 border-[#2D5A40]/40'
          }`}
        />
      </div>
    </>
  );
};
