'use client';

import React, { useState } from 'react';

const CareersGallery = () => {
  const [isLeftHovered, setIsLeftHovered] = useState(false);
  const [isMiddleHovered, setIsMiddleHovered] = useState(false);
  const [isRightHovered, setIsRightHovered] = useState(false);

  return (
    <div className="w-full px-0 overflow-hidden">
      <div className="flex items-center justify-start gap-3 h-[436px] select-none">
        {/* 🟧 Left Section - Primary Hover Trigger */}
        <div 
          className={`relative h-full overflow-hidden transition-[width] duration-400 ease-in-out flex-none
            ${isLeftHovered ? 'w-[45%]' : isMiddleHovered ? 'w-[20%]' : isRightHovered ? 'w-[25%]' : 'w-[25%]'}
          `}
          onMouseEnter={() => setIsLeftHovered(true)}
          onMouseLeave={() => setIsLeftHovered(false)}
        >
          <div className="relative w-full h-full overflow-hidden">
            <img 
              src="/carrer/hero-1.svg" 
              alt="Hero 1" 
              className={`w-full h-full object-cover object-left grayscale hover:grayscale-0 transition-transform duration-400 ease-in-out
                ${isRightHovered ? 'scale-110' : 'scale-100'}
              `}
            />
          </div>
        </div>

        {/* 🟦 Middle Section - Responsive / Flexible */}
        <div 
          className={`relative h-full overflow-hidden transition-[width] duration-400 ease-in-out flex-none
            ${isMiddleHovered ? 'w-[60%]' : isLeftHovered ? 'w-[30%]' : isRightHovered ? 'w-[30%]' : 'w-[50%]'}
          `}
          onMouseEnter={() => setIsMiddleHovered(true)}
          onMouseLeave={() => setIsMiddleHovered(false)}
        >
          <div className="relative w-full h-full overflow-hidden">
            <img 
              src="/carrer/carrer-2.svg" 
              alt="Hero 2" 
              className="w-full h-full object-cover grayscale hover:grayscale-0"
            />
          </div>
        </div>

        {/* 🟩 Right Section - Extends to Left Only */}
        <div 
          className={`relative h-full overflow-hidden transition-[width] duration-400 ease-in-out flex-none
            ${isRightHovered ? 'w-[45%]' : isMiddleHovered ? 'w-[20%]' : isLeftHovered ? 'w-[25%]' : 'w-[25%]'}
          `}
          onMouseEnter={() => setIsRightHovered(true)}
          onMouseLeave={() => setIsRightHovered(false)}
        >
          <div className="relative w-full h-full overflow-hidden">
            <img 
              src="/carrer/carrer-3.svg" 
              alt="Hero 3" 
              className="w-full h-full object-cover object-right grayscale hover:grayscale-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareersGallery;