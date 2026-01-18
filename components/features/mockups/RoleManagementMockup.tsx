'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Check, CaretDown, CaretUp } from '@phosphor-icons/react';

export const RoleManagementMockup: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdminHovered, setIsAdminHovered] = useState(false);
  const [isCoordinatorHovered, setIsCoordinatorHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Monitor parent in-view class for mobile
  useEffect(() => {
    const checkInView = () => {
      if (!containerRef.current) return false;
      const parent = containerRef.current.closest('.in-view');
      return parent !== null && window.innerWidth < 1024;
    };

    const interval = setInterval(() => {
      if (window.innerWidth < 1024) {
        const inView = checkInView();
        setIsHovered(inView);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full flex flex-col items-center relative px-4 pb-8"
      onMouseEnter={() => {
        if (window.innerWidth >= 1024) setIsHovered(true);
      }}
      onMouseLeave={() => {
        if (window.innerWidth >= 1024) setIsHovered(false);
      }}
    >
      <div
        className={`w-[280px] md:w-full p-5 z-50 bg-white rounded-[15px] transition-all duration-200 ease-out ${
          isHovered 
            ? 'translate-y-0 translate-x-[-2]' 
            : 'translate-y-12'
        } ${
          (isAdminHovered || isCoordinatorHovered)
            ? 'opacity-71' 
            : 'opacity-100'
        }`}
        style={{
          boxShadow: isHovered 
            ? '0px 2px 30px 0px #00000014' 
            : '0px 0px 15px 0px #00000008'
        }}
      >
        <div className="flex items-center gap-3 mb-6">
          <img src="/kaleen.svg" alt="Kaleen Ben" className="w-12 h-12 rounded-lg object-cover" />
          <div className="min-w-0 flex-1">
            <h4 className="text-[18px] font-medium leading-[22px] tracking-[0.0002em] text-black truncate">Kaleen Ben</h4>
            <p className="text-[14px] font-medium leading-[20px] tracking-[0.0004em] text-[#000000]">Educator</p>
          </div>
        </div>
        <div className="space-y-4">
          {['Can edit', 'Can assign', 'Can create content'].map((perm, i) => (
            <div key={i} className="flex items-center justify-between text-[16px] leading-[22px] tracking-[0.0002em] text-[#000000]">
              <span className="truncate pr-2">{perm}</span>
              <div className="w-5 h-5 rounded-full bg-[#5683D2] flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-white" weight="bold" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div 
            className={`w-full -translate-x-4 -translate-y-24 flex flex-col items-end gap-2 transition-all duration-200 ease-out mt-2 ${
              isHovered 
                ? 'opacity-100 translate-y-[-32] translate-x-18' 
                : 'opacity-0'
            }`}
          >
            <div 
              className="w-full max-w-[203px] bg-white px-[16px] py-[9.5px] rounded-[9px] flex items-center justify-between transition-all duration-200 ease-out relative"
              style={{
                zIndex: isHovered ? 1 : 'auto',
                boxShadow: isHovered 
                  ? '0px 2px 30px 0px #00000014' 
                  : '0px 0px 15px 0px #00000008'
              }}
              onMouseEnter={() => setIsAdminHovered(true)}
              onMouseLeave={() => setIsAdminHovered(false)}
            >
              <span className="text-[18px] font-medium text-black truncate">Admin</span>
              <div className="bg-[#F4F2F0] p-1.5 rounded-lg shrink-0">
                {isAdminHovered ? (
                  <CaretUp className="w-5 h-5 text-black" />
                ) : (
                  <CaretDown className="w-5 h-5 text-black" />
                )}
              </div>
            </div>
            <div 
              className="w-full max-w-[203px] bg-white px-[16px] py-[9.5px] rounded-[9px] flex items-center justify-between transition-all duration-200 ease-out relative"
              style={{
                zIndex: isHovered ? 2 : 'auto'
              }}
              onMouseEnter={() => setIsCoordinatorHovered(true)}
              onMouseLeave={() => setIsCoordinatorHovered(false)}
            >
              <span className="text-[18px] font-medium text-black truncate">Co-ordinator</span>
              <div className="bg-[#F4F2F0] p-1.5 rounded-lg shrink-0">
                {isCoordinatorHovered ? (
                  <CaretUp className="w-5 h-5 text-black" />
                ) : (
                  <CaretDown className="w-5 h-5 text-black" />
                )}
              </div>
            </div>
          </div>
    </div>
  );
};
