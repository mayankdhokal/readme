"use client"

import React, { useEffect, useRef, useState } from 'react';

interface FeatureCardProps {
  Shape: React.ComponentType;
  title: string;
  description: string;
  isFourthCard?: boolean;
  isThirdCard?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ Shape, title, description, isFourthCard, isThirdCard }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkIfCentered = () => {
      if (!cardRef.current) return false;
      
      const rect = cardRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight / 2;
      const cardCenter = rect.top + rect.height / 2;
      
      // Check if card center is within 100px of viewport center
      return Math.abs(cardCenter - viewportCenter) < 100;
    };

    const handleScroll = () => {
      // Only trigger on mobile (below lg breakpoint)
      if (window.innerWidth >= 1024) {
        setIsInView(false);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        return;
      }

      if (checkIfCentered()) {
        // Clear existing timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        // Set isInView after 100ms delay
        timeoutRef.current = setTimeout(() => {
          setIsInView(true);
        }, 100);
      } else {
        // Clear timeout and reset if not centered
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        setIsInView(false);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`flex flex-col group px-[16px] sm:px-0 cursor-pointer ${isFourthCard ? 'fourth-card' : ''} ${isThirdCard ? 'third-card' : ''} ${isInView ? 'in-view' : ''}`}
      style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, system-ui, sans-serif" }}
    >
      {/* Visual Container */}
      <div className={`aspect-3/2 w-full h-[240px] sm:h-[200px] md:h-[220px] lg:h-[239px] overflow-hidden mb-4 sm:mb-5 md:mb-6 lg:mb-[24px] transition-colors duration-200 ease-out ${isInView ? 'bg-[#527B72]' : 'bg-[#EFEEEB]'} hover:bg-[#527B72]`}>
        <div className="w-full h-full pointer-events-none">
           <Shape />
        </div>
      </div>
      
      {/* Text Content */}
      <div className="flex flex-col space-y-[4px] sm:space-y-[5px]">
        <h3 className="text-[17px] leading-[24px] tracking-[-0.003em] font-medium text-[#1C1B17] ">
          {title}
        </h3>
        <p className="text-[#494945] text-[16px] leading-[22px] tracking-[0.02em] font-normal">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;

