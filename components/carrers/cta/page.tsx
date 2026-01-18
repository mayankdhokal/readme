import React from 'react';

const CareersCTA = () => {
  return (
    <div className="w-full max-w-8xl mx-auto px-4 sm:px-6 md:px-12 lg:px-[112px] pb-8 sm:pb-12 md:pb-16 lg:pb-[72px]">
      <div className="flex flex-col items-start text-start">
        <p 
          className="text-base sm:text-[18px] leading-[22px] sm:leading-[24px] tracking-[-0.03em] text-[#8F8E8E] mb-4 sm:mb-5 md:mb-[20px] max-w-2xl"
          style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, system-ui, sans-serif" }}
        >
          Didn't see your dream role? No matter, reach out to<br className="hidden sm:block" />
          <span className="sm:hidden"> </span>our team with your resume.
        </p>
        
        <a
          href="mailto:team@edulume.com"
          className="
            px-3 sm:px-[12px]
            py-2 sm:py-[8px]
            rounded-[9px]
            bg-[#303030]
            text-white
            text-base sm:text-[18px]
            leading-[20px]
            tracking-[-0.03em]
            cursor-pointer
            hover:bg-[#000000]
            transition-colors
            duration-200
            ease-out
            active:scale-95
          "
        >
          Get in touch
        </a>
      </div>
    </div>
  );
};

export default CareersCTA;

