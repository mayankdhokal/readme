'use client';
import { ArrowRight } from '@phosphor-icons/react';
import React, { useEffect, useRef, useState } from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  isHighlighted?: boolean;
  children?: React.ReactNode;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  children 
}) => {
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
        // Set isInView after 500ms delay
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
      className={`relative flex flex-col h-full min-h-[458px]  lg:min-h-[494px] rounded-[16px] sm:rounded-[18px] md:rounded-[20px] bg-[#F4F2F0] group ${isInView ? 'in-view' : ''}`}
    >
      <div className="z-10 p-[24px]">
        <h3 className="text-[21px]  font-medium leading-[22px] text-[#000000] mb-2">{title}</h3>
        <p className="text-[#696765] font-medium text-[15px] leading-[22px] tracking-[-0.01em] mb-3 sm:mb-[15px]">{description}</p>
        <a 
          href="#" 
          className="hidden sm:inline-flex items-center text-[14px] sm:text-[15px] md:text-[16px] tracking-[0.006em] leading-[20px] sm:leading-[21px] md:leading-[22px] font-medium text-[#696765] group"
        >
          Learn more 
          <span className="ml-1.5 transition-transform group-hover:translate-x-1 group-hover:scale-110">
            <ArrowRight weight="bold" className="w-4 h-6" />
          </span>
        </a>
      </div>
      
      <div className="flex-1 flex items-end justify-center overflow-hidden">
        {children}
      </div>
    </div>
  );
};

