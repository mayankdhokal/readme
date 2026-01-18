"use client"

import React, { useEffect, useRef, useState } from 'react';

const SHAPE_GREY = "bg-[#f1f1ef]";

export const FilmFrameShape: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (window.innerWidth >= 1024) return; // Only on mobile
    
    const checkInView = () => {
      if (!containerRef.current) return false;
      const parent = containerRef.current.closest('.in-view');
      return parent !== null;
    };

    const interval = setInterval(() => {
      const inView = checkInView();
      setIsInView(inView);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center bg-transparent">
      <div className={`relative w-full h-full `}>
        {/* 
          Side Cutouts: 
          These create the gaps on the left and right of the 'pillars'.
        */}
        <div className="absolute top-[18%] bottom-[18%] left-0 w-[16%] bg-white rounded-r-[11px]"></div>
        <div className={`absolute top-[18%] bottom-[18%] right-0 transition-all duration-200 ease-out bg-white rounded-l-[11px] ${isInView ? 'w-[45%]' : 'w-[16%] group-hover:w-[45%]'}`}></div>
        
        {/* 
          Center Cutout:
          The rounded white rectangle in the heart of the shape.
        */}
        <div className={`absolute inset-y-[18%] left-[22%] transition-all duration-200 ease-out bg-white rounded-[11px] ${isInView ? 'right-[50%]' : 'right-[22%] group-hover:right-[50%]'}`}></div>
      </div>
    </div>
  );
};

export const LeftRoundedCutoutShape: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (window.innerWidth >= 1024) return; // Only on mobile
    
    const checkInView = () => {
      if (!containerRef.current) return false;
      const parent = containerRef.current.closest('.in-view');
      return parent !== null;
    };

    const interval = setInterval(() => {
      const inView = checkInView();
      setIsInView(inView);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center bg-transparent">
      <div className={`relative w-full h-full `}>
        {/* 
          Left Side Rounded Cutout:
          Matches the second image provided by the user.
        */}
        <div className={`absolute top-[18%] bottom-[18%] left-0 w-[15%] bg-white rounded-r-[11px] transition-all duration-200 ease-out ${isInView ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'}`}></div>
        
        {/* 
          Image that appears on hover:
          Replaces the shape and animates to -top-12 right-12
        */}
        <img 
          src="/react.svg" 
          alt="Automate core workflows"
          className={`absolute rounded-[11px] w-full h-[130px] md:h-[160px] object-contain transition-all duration-200 ease-out ${
            isInView 
              ? 'opacity-100 scale-110 sm:scale-125 bottom-[50px] sm:bottom-[60px] left-18 -translate-x-1/2 sm:-left-60 sm:translate-x-40 sm:-right-1000' 
              : 'opacity-0 bottom-[40px] -left-60 group-hover:opacity-100 group-hover:scale-125 group-hover:bottom-[60px] group-hover:-right-1000 group-hover:translate-x-40'
          }`}
        />

        
      </div>
    </div>
  );
};

export const TopRoundedCutoutShape: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (window.innerWidth >= 1024) return; // Only on mobile
    
    const checkInView = () => {
      if (!containerRef.current) return false;
      const parent = containerRef.current.closest('.in-view');
      return parent !== null;
    };

    const interval = setInterval(() => {
      const inView = checkInView();
      setIsInView(inView);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center bg-transparent overflow-hidden">
      <div className={`relative w-full h-full `}>
        {/* 
          Top Rounded Cutout:
          Matches the third image provided by the user (a "notch" style cutout at the top).
        */}
        <div className={`absolute left-[8%] w-[55%] h-[158%] transition-all duration-500 ease-out bg-white rounded-b-[11px] ${isInView ? 'top-0' : '-top-60 sm:-top-60 md:-top-80 group-hover:top-0'}`}></div>

        <div className="absolute top-[18%] bottom-[18%] right-0 w-0 third-card-animation transition-all duration-200 ease-out bg-white rounded-l-[11px]"></div>
      </div>
    </div>
  );
};

export const RightBlockTwoArmsShape: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (window.innerWidth >= 1024) return; // Only on mobile
    
    const checkInView = () => {
      if (!containerRef.current) return false;
      const parent = containerRef.current.closest('.in-view');
      return parent !== null;
    };

    const interval = setInterval(() => {
      const inView = checkInView();
      setIsInView(inView);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center bg-transparent">
      <div className={`relative w-full h-full `}>
        {/* 
          Top Left Cutout:
          Creates the gap above the top arm.
        */}
        <div className="absolute top-0 left-0 w-[55%] h-[12%] bg-white rounded-br-[11px]"></div>
        
        {/* 
          Bottom Left Cutout:
          Creates the gap below the bottom arm.
        */}
        <div className="absolute bottom-0 left-0 w-[55%] h-[12%] bg-white rounded-tr-[11px]"></div>
        
        {/* 
          Middle Notch Cutout:
          The rounded cutout between the two grey arms.
        */}
        <div className={`absolute top-[18%] bottom-[18%] left-0 transition-all duration-200 ease-out bg-white rounded-r-[11px] ${isInView ? 'w-[302px]' : 'w-[162px] group-hover:w-[302px]'}`}></div>
      </div>
    </div>
  );
};

