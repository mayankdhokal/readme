'use client';
import React, { useState, useEffect, useRef } from 'react';

const autogradingItems = [
  { label: 'Consumer protection law', time: '1hr', color: 'bg-[#7DA6E8]', score: 45 },
  { label: 'Ancient History', time: '1hr', color: 'bg-[#A8C3A0]', score: 20 },
  { label: 'Zoology Introduction Pt-1', time: '1hr', color: 'bg-[#D1D1D1]', score: 39 },
];

export const AutogradingMockup: React.FC = () => {
  const [itemStates, setItemStates] = useState<Record<number, 'idle' | 'loading' | 'completed'>>({});
  const [scalingItems, setScalingItems] = useState<Record<number, boolean>>({});
  const [activeItems, setActiveItems] = useState<Record<number, boolean>>({});
  const [isHovered, setIsHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);
  const isHoveredRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const resetAnimation = () => {
    // Clear all existing timeouts
    timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
    timeoutRefs.current = [];
    
    // Reset all states
    setItemStates({});
    setScalingItems({});
    setActiveItems({});
    setCurrentIndex(0);
  };

  const processItem = (idx: number) => {
    if (!isHoveredRef.current) return;
    
    // Initial active state with ripple effect
    setActiveItems(prev => ({ ...prev, [idx]: true }));
    
    // Scale animation - more pronounced
    setScalingItems(prev => ({ ...prev, [idx]: true }));
    
    const timeout1 = setTimeout(() => {
      if (!isHoveredRef.current) return;
      setScalingItems(prev => ({ ...prev, [idx]: false }));
      setActiveItems(prev => ({ ...prev, [idx]: false }));
      setItemStates(prev => ({ ...prev, [idx]: 'loading' }));
    }, 200);
    timeoutRefs.current.push(timeout1);
    
    // Complete animation
    const timeout2 = setTimeout(() => {
      if (!isHoveredRef.current) return;
      setItemStates(prev => ({ ...prev, [idx]: 'completed' }));
      
      // Move to next item after a short delay
      if (idx < autogradingItems.length - 1 && isHoveredRef.current) {
        const timeout3 = setTimeout(() => {
          if (isHoveredRef.current) {
            setCurrentIndex(idx + 1);
          }
        }, 500);
        timeoutRefs.current.push(timeout3);
      }
    }, 2000);
    timeoutRefs.current.push(timeout2);
  };


  // Monitor parent in-view class for mobile
  useEffect(() => {
    if (window.innerWidth >= 1024) return; // Only on mobile
    
    const checkInView = () => {
      if (!containerRef.current) return false;
      const parent = containerRef.current.closest('.in-view');
      return parent !== null;
    };

    const interval = setInterval(() => {
      const inView = checkInView();
      if (inView && !isHovered) {
        setIsHovered(true);
      } else if (!inView && !isHovered) {
        setIsHovered(false);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isHovered]);

  useEffect(() => {
    isHoveredRef.current = isHovered;
    
    if (!isHovered) {
      resetAnimation();
      return;
    }

    // Start processing from current index
    if (currentIndex < autogradingItems.length) {
      const initialDelay = currentIndex === 0 ? 300 : 0;
      const timeout = setTimeout(() => {
        if (isHoveredRef.current) {
          processItem(currentIndex);
        }
      }, initialDelay);
      timeoutRefs.current.push(timeout);
    }

    // Only clear timeouts when hover is lost
    return () => {
      if (!isHovered) {
        timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
        timeoutRefs.current = [];
      }
    };
  }, [isHovered, currentIndex]);

  const handleMouseEnter = () => {
    // Only handle hover on desktop
    if (window.innerWidth >= 1024) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    // Only handle hover on desktop
    if (window.innerWidth >= 1024) {
      setIsHovered(false);
    }
  };

  const renderButtonContent = (idx: number) => {
    const state = itemStates[idx] || 'idle';

    if (state === 'loading') {
      return (
        <div className="flex items-center justify-center">
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="#D9D9D9"
              strokeWidth="4"
              opacity="0.25"
            />
            <path
              stroke="#0F965E"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="47.12"
              strokeDashoffset="35.34"
              d="M 12,2 A 10,10 0 0,1 22,12"
              opacity="0.75"
            />
          </svg>
        </div>
      );
    }

    if (state === 'completed') {
      const score = autogradingItems[idx].score;
      const isRed = idx === 1; 
      return (
        <div className="flex items-center justify-center gap-0.5">
          <span className={`text-[16px] leading-[20px] tracking-[0.0003em] font-medium ${isRed ? 'text-[#B03A3A]' : 'text-[#000000]'}`}>{score}</span>
          <span className="text-[16px] leading-[20px] tracking-[0.0003em] font-medium text-[#C0C0C0]">/50</span>
        </div>
      );
    }

    return (
      <span className="font-medium text-[14px] leading-[20px] tracking-[0.0002em]">Grade now</span>
    );
  };

  return (
    <div 
      ref={containerRef}
      className="w-full h-full flex items-center pl-[72px] md:pl-auto  px-6"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-full space-y-2 group-[.in-view]:-translate-x-40 lg:group-hover:-translate-x-40 transition-all duration-200 ease-out">
        {autogradingItems.map((item, idx) => (
          <div key={idx} className="bg-white w-[405px] max-w-[405px] h-[52px] px-[6px] py-[6px] rounded-[11px] flex items-center gap-[12px]">
            <div className={`w-[47px] h-[40px] rounded-[5px] ${item.color}`} />
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-[16px] leading-[20px] tracking-[0.0002em] font-medium text-[#000000] truncate">{item.label}</span>
              <span className="text-[14px] text-[#BCBCBC] leading-[20px] tracking-[0.0002em]">{item.time}</span>
            </div>
            <div 
              className={`relative bg-white text-black px-4 py-2 mr-1 rounded-[11px] font-medium text-[14px] leading-[20px] tracking-[0.0002em] whitespace-nowrap min-w-[120px] h-[40px] flex items-center justify-center transition-all duration-200 ease-out overflow-hidden ${
                itemStates[idx] === 'idle' || !itemStates[idx]
                  ? 'shadow-[0px_1px_2px_0px_#0A0D1424,0px_0px_0px_1px_#00000008] cursor-default'
                  : 'shadow-none'
              } ${
                scalingItems[idx] 
                  ? 'scale-[0.92] shadow-[0px_2px_6px_0px_#0A0D1426,0px_0px_0px_1px_#00000014]' 
                  : 'scale-100'
              }`}
            >
              {/* Human touch effect overlay */}
              {activeItems[idx] && (
                <div 
                  className="absolute inset-0 rounded-[11px]"
                  style={{
                    backgroundColor: '#B6B6B64A',
                    animation: 'ripple 0.4s ease-out',
                  }}
                />
              )}
              <span className="relative z-10">
                {renderButtonContent(idx)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

