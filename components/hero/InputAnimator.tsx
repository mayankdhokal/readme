import React, { useState, useEffect } from 'react';

interface InputAnimatorProps {
  step: number;
  r1InputText: string;
  r2InputText: string;
}

const InputAnimator: React.FC<InputAnimatorProps> = ({ step, r1InputText, r2InputText }) => {
  // Logic to determine what text to show in the input
  let currentText = "";
  let isTextVisible = false;

  if (step === 1) { // R1_INPUT
    currentText = r1InputText;
    isTextVisible = true;
  } else if (step === 5) { // R2_INPUT
    currentText = r2InputText;
    isTextVisible = true;
  }

  // State for typing effect
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (isTextVisible && currentText) {
      setDisplayedText("");
      setIsTyping(true);
      let currentIndex = 0;
      
      const typingInterval = setInterval(() => {
        if (currentIndex < currentText.length) {
          setDisplayedText(currentText.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          setIsTyping(false);
          clearInterval(typingInterval);
        }
      }, 60); // Adjust speed: lower = faster typing

      return () => clearInterval(typingInterval);
    } else {
      setDisplayedText("");
      setIsTyping(false);
    }
  }, [currentText, isTextVisible]);
    
  return (
    <div className="bg-white   rounded-[14px] shadow-[0px_4px_6.3px_0px_#00000014]  px-[8px] py-[12px] flex items-center  gap-2 sm:gap-3 border border-[#EBEBEB]  pointer-events-auto transition-all duration-300 w-full max-w-[535px] h-[44px]">
      <div className="flex items-center  justify-center gap-2 sm:gap-3 w-full">

      <img src="/gallery.svg" alt="" className="  pr-1 sm:pr-2 border-r border-[#EBEBEB]" />
        {/* Animated Input Content Area */}
        <div className="flex-1 overflow-hidden h-5 sm:h-5 relative">
          {!isTextVisible && !currentText && (
             <span className="text-[#888888] text-[14px] sm:text-sm md:text-[15px] font-medium leading-[20px] tracking-[-0.006em] absolute inset-0">Add your response...</span>
          )}
          <span 
            className={`text-black text-[14px]  sm:leading-[15px] font-medium lg:translate-y-[4px] leading-[20px] tracking-[-0.006em]  absolute inset-0 transition-all duration-140 ease-out sm:whitespace-nowrap
              ${isTextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 '}`}
          >
            {displayedText}
            {isTyping && (
              <span className="inline-block w-[2px] h-[14px] sm:h-[13px] bg-black ml-[2px] animate-pulse align-middle" />
            )}
          </span>
        </div>

        {/* Send Icon Button */}
        <button className={`w-7 h-7 sm:w-8 sm:h-8  rounded-[6px] sm:rounded-[8px] flex items-center justify-center shrink-0 transition-colors
          ${isTextVisible ? 'bg-[#254F46] text-white hover:bg-emerald-900' : 'bg-[#F3EFE9] text-[#A39E96]'}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="sm:w-5 sm:h-5">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default InputAnimator;
