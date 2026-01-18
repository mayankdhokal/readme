'use client';

import React from 'react';
import { ArrowRight } from '@phosphor-icons/react';

const CareersHero = () => {
  return (
    <div className="bg-white font-sans text-slate-900">
      <main className="max-w-8xl mx-auto px-4 sm:px-6 md:px-12 lg:px-[64px] py-8 sm:py-12 md:py-16 lg:py-[132px] lg:pb-[88px]">
        <div className="flex flex-col items-start max-w-4xl ">
          <h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal text-black leading-[1.1] sm:leading-[1.1] md:leading-[1.1] lg:leading-[54px] mb-3 sm:mb-4 md:mb-6 lg:mb-[12px]"
            style={{ fontFamily: '"EB Garamond", serif' }}
          >
            Come build with us
          </h1>
          
          <p 
            className="text-sm sm:text-base md:text-lg lg:text-[18px] leading-[18px] sm:leading-[20px] md:leading-[21px] lg:leading-[24px] tracking-[-0.03em] text-[#8F8E8E] mb-4 sm:mb-6 md:mb-8 lg:mb-[28px] max-w-full sm:max-w-[380px]"
            style={{ fontFamily: '"SF Pro Text", sans-serif' }}
          >
            We move fast, we ship constantly, and care deeply about quality in everything we ship.
          </p>
          
          <button
            className="
              group
              flex
              items-center
              justify-start
              overflow-hidden
              px-[18px]
              py-[5px]
              border
              border-[#EBEBEB]
              rounded-[12px]
              text-[14px] sm:text-[15px] md:text-[16px]
              font-medium
              text-[#000000]
              hover:bg-[#F4F2F0]
              hover:border-[#F4F2F0]
              transition-all
              duration-140
              ease-out
              tracking-[0.006em]
              leading-[20px] sm:leading-[22px] md:leading-[24px]
              active:scale-95
            "
            style={{ boxShadow: '0px 1px 2px 0px #0A0D1408' }}
          >
            <span className="whitespace-nowrap cursor-pointer">Open Roles</span>
            
            {/* The Icon Wrapper */}
            <div 
              className="
                flex
                max-w-0
                overflow-hidden
                opacity-0
                transition-all
                duration-140
                ease-out
                group-hover:ml-1
                group-hover:max-w-[20px]
                group-hover:opacity-100
              "
            >
              <ArrowRight size={13} weight="bold" className="size-[20px] shrink-0" />
            </div>
          </button>
        </div>
      </main>
    </div>
  );
};

export default CareersHero;

