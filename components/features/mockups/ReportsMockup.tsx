'use client';
import React, { useEffect, useRef, useState } from 'react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: '1', val: 35, val2: 15 },
  { name: '2', val: 45, val2: 20 },
  { name: '3', val: 38, val2: 24 },
  { name: '4', val: 50, val2: 22 },
  { name: '5', val: 60, val2: 30 },
  { name: '6', val: 75, val2: 33 },
  { name: '7', val: 65, val2: 45 },
  { name: '8', val: 80, val2: 39 },
  { name: '9', val: 78, val2: 42 },
  { name: '10', val: 85, val2: 45 },
  { name: '11', val: 90, val2: 38 },
  { name: '12', val: 85, val2: 45 },
  { name: '13', val: 98, val2: 52 },
  { name: '14', val: 100, val2: 55 },
];

const CustomTooltip = ({ active, payload, xPercent, coordinate, dataPointXPercent }: any) => {
  if (active && payload && payload.length) {
   
    let calculatedXPercent = xPercent;
    
    if (calculatedXPercent === undefined && coordinate?.x !== undefined) {
     
      try {
       
        const tooltipWrapper = document.querySelector('.recharts-wrapper') || 
                               document.querySelector('svg.recharts-surface');
        if (tooltipWrapper) {
          const svg = tooltipWrapper instanceof SVGElement 
            ? tooltipWrapper 
            : tooltipWrapper.querySelector('svg');
          if (svg) {
            const svgWidth = svg.getBoundingClientRect().width || svg.clientWidth;
            if (svgWidth > 0) {
              calculatedXPercent = (coordinate.x / svgWidth) * 100;
            }
          }
        }
      } catch (e) {
       
        calculatedXPercent = 50;
      }
    }
    
    // For mobile: position arrow based on data point line relative to tooltip center
    // For desktop: position arrow based on tooltip position on screen
    let isOnLeft;
    if (dataPointXPercent !== undefined && calculatedXPercent !== undefined) {
      // Mobile: arrow points to data point line
      // If tooltip is to the left of data point line, arrow should be on right side of tooltip (pointing right)
      // If tooltip is to the right of data point line, arrow should be on left side of tooltip (pointing left)
      // So: if tooltip center < data point, arrow on right (not left), so isOnLeft = false
      //     if tooltip center > data point, arrow on left, so isOnLeft = true
      isOnLeft = calculatedXPercent > dataPointXPercent;
    } else {
      // Desktop: arrow position based on tooltip location on screen
      isOnLeft = calculatedXPercent !== undefined && calculatedXPercent < 50;
    }
    
    return (
      <div className="relative">
        <div
          className="bg-white z-10 px-[6px] -mt-18 py-[2px] sm:px-[8px] sm:py-[3px] md:px-[10px] md:py-[4px] rounded-lg min-w-[140px] sm:min-w-[150px] md:min-w-[160px]"
          style={{
            boxShadow:
              '0px 0px 1px 0px #0000004D, 0px 2px 30px 0px #00000014, 0px 0px 15px 0px #00000008'
          }}
        >
          <div className="flex flex-col gap-2.5 sm:gap-3">
            {/* Course Item */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <span className="size-3 sm:size-3.5 md:size-4 rounded-sm bg-[#F89862]"></span>
                <span className="text-black font-normal text-sm sm:text-[14px] leading-[20px]">Course</span>
              </div>
              <span className="text-black font-normal text-sm sm:text-[14px] leading-[20px]">
                {payload[0]?.value ?? 10}
              </span>
            </div>

            {/* Quiz Item */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <span className="size-3 sm:size-3.5 md:size-4 rounded-sm bg-[#5683D2]"></span>
                <span className="text-black font-normal text-sm sm:text-[14px] leading-[20px]">Quiz</span>
              </div>
              <span className="text-black font-normal text-sm sm:text-[14px] leading-[20px]">
                {payload[1]?.value ?? 10}
              </span>
            </div>
          </div>
        </div>
        {/* Triangular pointer - position based on tooltip location */}
        <div 
          className={`absolute -z-10 top-2 h-[14px] w-[14px] bg-white rotate-45 rounded-[2px] ${
            isOnLeft ? '-left-1.5' : '-right-1.5'
          }`}
          style={{
            boxShadow: '0px 0px 1px 0px #0000004D, 0px 2px 10px 0px #0000000F, 0px 0px 5px 0px #00000005'
          }}
        ></div>
      </div>
    );
  }
  return null;
};

export const ReportsMockup: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [dataPointPosition, setDataPointPosition] = useState(0);
 
  const [activeIndex, setActiveIndex] = useState(8);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    const handleFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'svg' || target.closest('svg')) {
        target.blur();
        if (target instanceof SVGElement) {
          target.setAttribute('tabindex', '-1');
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('focusin', handleFocus);
      const svg = container.querySelector('svg');
      if (svg) {
        svg.setAttribute('tabindex', '-1');
        svg.setAttribute('focusable', 'false');
      }
    }

    return () => {
      if (container) {
        container.removeEventListener('focusin', handleFocus);
      }
    };
  }, []);

 
  useEffect(() => {
    if (!isMobile || !containerRef.current) return;

    const calculatePosition = () => {
      requestAnimationFrame(() => {
        const container = containerRef.current;
        if (!container) return;

        const activeData = data[activeIndex];
        if (!activeData) return;

       
        const containerRect = container.getBoundingClientRect();
        const containerWidth = containerRect.width;
        const containerHeight = containerRect.height;
        
       
        const totalPoints = data.length;
        // Calculate actual data point position (for the vertical line) - matches desktop cursor position
        const actualDataPointX = ((activeIndex + 0.5) / totalPoints) * 100;
        setDataPointPosition(actualDataPointX);
        
        // Calculate tooltip position - offset from data point line to match desktop hover style
        const tooltipWidth = 160;
        const tooltipWidthPercent = (tooltipWidth / containerWidth) * 100;
        const halfTooltipWidth = tooltipWidthPercent / 2;
        
        // Gap between line and tooltip (15px converted to percent)
        const gapPercent = (15 / containerWidth) * 100;
        
        let tooltipX;
        
        // Determine side based on screen position relative to center
        if (actualDataPointX < 50) {
          // Left side of screen -> Place tooltip to the Right
          tooltipX = actualDataPointX + halfTooltipWidth + gapPercent;
        } else {
          // Right side of screen -> Place tooltip to the Left
          tooltipX = actualDataPointX - halfTooltipWidth - gapPercent;
        }
        
        // Clamp to container bounds to prevent overflow
        if (tooltipX - halfTooltipWidth < 0) {
          tooltipX = halfTooltipWidth;
        }
        
        if (tooltipX + halfTooltipWidth > 100) {
          tooltipX = 100 - halfTooltipWidth;
        }
        
       
        const maxVal = Math.max(...data.map(d => Math.max(d.val, d.val2)));
        const minVal = Math.min(...data.map(d => Math.min(d.val, d.val2)));
        // Use only the orange graph value (val) for tooltip positioning
        const normalizedVal = (activeData.val - minVal) / (maxVal - minVal);
        
       
       
        let yPercent = 7.5 + (1 - normalizedVal) * 85;
        
       
        const tooltipHeight = 80;
        const tooltipHeightPercent = (tooltipHeight / containerHeight) * 100;
        
       
        yPercent = yPercent - 12;
        
       
        if (yPercent < tooltipHeightPercent) {
         
          yPercent = tooltipHeightPercent;
        }
        
       
        if (yPercent + tooltipHeightPercent > 100) {
         
          yPercent = 100 - tooltipHeightPercent;
        }

        setTooltipPosition({ 
          x: tooltipX, 
          y: yPercent
        });
      });
    };

   
    const timeoutId = setTimeout(calculatePosition, 100);
    const resizeObserver = new ResizeObserver(calculatePosition);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener('resize', calculatePosition);

    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', calculatePosition);
    };
  }, [isMobile, activeIndex]);

 
  const handleChartInteraction = (clientX: number) => {
    if (!isMobile) return;
    
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const clickX = clientX - containerRect.left;
    const containerWidth = containerRect.width;
    
   
    const clickPercent = clickX / containerWidth;
    const totalPoints = data.length;
    const clickedIndex = Math.floor(clickPercent * totalPoints);
    
   
    const validIndex = Math.max(0, Math.min(clickedIndex, totalPoints - 1));
    setActiveIndex(validIndex);
  };

  const handleChartClick = (e: React.MouseEvent<HTMLDivElement>) => {
    handleChartInteraction(e.clientX);
  };

  const handleChartTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      handleChartInteraction(e.touches[0].clientX);
    }
  };

 
  const activeData = data[activeIndex];

 
  const mobileTooltipPayload = isMobile && activeData ? [
    { value: activeData.val, dataKey: 'val', name: 'val' },
    { value: activeData.val2, dataKey: 'val2', name: 'val2' }
  ] : [];

  return (
    <div 
      ref={containerRef}
      className="w-full h-[200px] sm:h-[250px] md:h-[300px] relative rounded-b-[16px] sm:rounded-b-[18px] md:rounded-b-[20px] overflow-hidden outline-none focus:outline-none"
      style={{ outline: 'none', border: 'none' }}
      tabIndex={-1}
      onClick={(e) => {
       
        handleChartClick(e);
        
        const svg = e.currentTarget.querySelector('svg');
        if (svg) {
          svg.blur();
          svg.setAttribute('tabindex', '-1');
          svg.setAttribute('focusable', 'false');
        }
        e.currentTarget.blur();
      }}
      onTouchStart={(e) => {
       
        handleChartTouch(e);
      }}
    >
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart 
        data={data} 
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        style={{ outline: 'none' }}
      >
        <defs>
          {/* ORANGE AREA GRADIENTS */}
          <linearGradient id="orangeFill" x1="0" y1="1" x2="1" y2="0">
            <stop offset="20.65%" stopColor="#F4F2F0" />
            <stop offset="92.02%" stopColor="#F88D50" />
          </linearGradient>

          <linearGradient id="orangeStroke" x1="1" y1="0" x2="0" y2="0">
            <stop offset="7.98%" stopColor="#F88D50" />
            <stop offset="100%" stopColor="#F5E5DD" />
          </linearGradient>

          {/* BLUE AREA GRADIENTS */}
          <linearGradient id="blueFill" x1="0" y1="1" x2="1" y2="0">
            <stop offset="22.86%" stopColor="#F4F2F0" />
            <stop offset="91.95%" stopColor="#638ED9" />
          </linearGradient>

          <linearGradient id="blueStroke" x1="1" y1="0" x2="0" y2="0">
            <stop offset="7.98%" stopColor="#608AD5" />
            <stop offset="100%" stopColor="#CDD8EB" />
          </linearGradient>
        </defs>

        {/* Tooltip for desktop (hover) */}
        {!isMobile && (
          <Tooltip 
            content={<CustomTooltip />} 
            cursor={{ 
              stroke: '#9CA3AF', 
              strokeWidth: 1.5, 
              strokeDasharray: '6 6' 
            }} 
          />
        )}

        {/* Course Area (Orange) */}
        <Area 
          type="linear"   /* Changed from monotone to linear */
          dataKey="val" 
          stroke="url(#orangeStroke)" 
          strokeWidth={2}
          fillOpacity={1} 
          fill="url(#orangeFill)" 
          activeDot={{ 
            r: 6, 
            stroke: '#F88D50', 
            strokeWidth: 0, 
            fill: '#F88D50' 
          }}
        />

        {/* Quiz Area (Blue) */}
        <Area 
          type="linear"   /* Changed from monotone to linear */
          dataKey="val2" 
          stroke="url(#blueStroke)" 
          strokeWidth={2}
          fillOpacity={1} 
          fill="url(#blueFill)" 
          activeDot={{ 
            r: 6, 
            stroke: '#638ED9', 
            strokeWidth: 0, 
            fill: '#638ED9' 
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
    {/* Mobile tooltip overlay */}
    {isMobile && activeData && (
      <>
        {/* Vertical line indicator - positioned at actual data point (matches desktop cursor) */}
        <div 
          className="absolute top-0 bottom-0 z-10 pointer-events-none"
          style={{
            left: `${dataPointPosition}%`,
            transform: 'translateX(-50%)',
            width: '1.5px'
          }}
        >
          <svg 
            className="w-full h-full" 
            style={{ overflow: 'visible' }}
            preserveAspectRatio="none"
          >
            <line 
              x1="50%" 
              y1="0%" 
              x2="50%" 
              y2="100%" 
              stroke="#9CA3AF" 
              strokeWidth="1.5" 
              strokeDasharray="6 6"
            />
          </svg>
        </div>
        {/* Tooltip - positioned to stay within bounds (matches desktop tooltip positioning) */}
        <div 
          className="absolute z-20 pointer-events-none"
          style={{
            left: `${tooltipPosition.x}%`,
            top: `${tooltipPosition.y}%`,
            transform: 'translateX(-50%)'
          }}
        >
          <CustomTooltip 
            active={true} 
            payload={mobileTooltipPayload} 
            xPercent={tooltipPosition.x}
            dataPointXPercent={dataPointPosition}
          />
        </div>
      </>
    )}
  </div>
  );
};