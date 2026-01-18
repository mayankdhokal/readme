'use client';

import React, { useState, useEffect, useRef } from 'react';
import { CaretLeft, PaperPlaneRight, User, Sparkle } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

const TYPING_PHRASES = [
  "Can you help me with",
];

export const ChatMockup = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isCentered, setIsCentered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const [text, setText] = useState(TYPING_PHRASES[0]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    const checkIfCentered = () => {
      if (!containerRef.current) return false;
      
      // Try to find the parent section card with group class
      const parentSection = containerRef.current.closest('.group');
      const elementToCheck = parentSection || containerRef.current;
      
      const rect = elementToCheck.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight / 2;
      const cardCenter = rect.top + rect.height / 2;
      
      // Check if card center is within 100px of viewport center
      return Math.abs(cardCenter - viewportCenter) < 100;
    };

    const handleScroll = () => {
      checkMobile();
      
      // Only trigger on mobile (below lg breakpoint)
      if (window.innerWidth >= 1024) {
        setIsCentered(false);
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
        // Set isCentered after delay
        timeoutRef.current = setTimeout(() => {
          setIsCentered(true);
        }, 100);
      } else {
        // Clear timeout and reset if not centered
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        setIsCentered(false);
      }
    };

    // Initial check
    checkMobile();
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

  useEffect(() => {
    // Only run typing animation when centered and on mobile, or when hovered
    const shouldAnimate = (isCentered && isMobile) || isHovered;
    
    if (!shouldAnimate) {
      setText(TYPING_PHRASES[0]);
      setIsDeleting(false);
      return;
    }

    const handleTyping = () => {
      const i = loopNum % TYPING_PHRASES.length;
      const fullText = TYPING_PHRASES[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

      
      setTypingSpeed(isDeleting ? 50 : 100);

      
      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500); 
      } 
      
      else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, isHovered, isCentered, isMobile]);

  return (
    <>
      
      <div 
        ref={containerRef} 
        className="flex items-center justify-center min-h-[300px] sm:min-h-[350px] md:min-h-[400px] bg-[#F2F2F0] pt-12 sm:pt-16 md:pt-[81px] pb-6 sm:pb-8 md:pb-[30px] px-4 sm:px-6 md:px-8 lg:px-12 font-sans"
        onMouseEnter={() => {
          // Check if we're within a group context
          const parentGroup = containerRef.current?.closest('.group');
          if (parentGroup) {
            setIsHovered(true);
          }
        }}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-full max-w-full">
        
        {/* Background card */}
        <div className="absolute -top-3 sm:-top-[14px] md:-top-4 left-1/2 -translate-x-1/2 w-[90%] sm:w-[85%] md:min-w-[380px] lg:min-w-[420px] max-w-[420px] h-[12px] sm:h-[14px] md:h-[16px] bg-[#C5C5C533] rounded-t-[12px] sm:rounded-t-[13px] md:rounded-t-[14px]"></div>
        
        <div 
          ref={cardRef}
          className={`bg-white rounded-[15px]  sm:rounded-[17px] md:rounded-[19px] w-full sm:min-w-[320px] md:min-w-[380px] lg:min-w-[442px] max-w-[442px] mx-auto p-3 sm:p-[12px] md:p-[14px] relative z-10 transition-all duration-200 ease-out lg:group-hover:-translate-y-5`}
          style={{ 
            boxShadow: '0px -1px 8.4px 0px #00000012, 0px 1px 2px 0px #00000008',
            transform: isCentered && isMobile ? 'translateY(-20px)' : undefined
          }}
        >
          
          
          <div className="flex items-center text-[#000000] mb-6 sm:mb-7 md:mb-8 space-x-2">
            <button className="text-[#C5C5C5] hover:text-black transition-colors">
              <CaretLeft size={18} weight="bold" className="sm:w-[19px] sm:h-[19px] md:w-[20px] md:h-[20px]" />
            </button>
            <span className="font-medium leading-[20px] sm:leading-[21px] md:leading-[22px] tracking-[0.0004em] text-[16px] sm:text-[17px] md:text-[18px]">Support</span>
          </div>
          
          
          <div className="space-y-3 sm:space-y-[14px] md:space-y-4">
            
            
            <div className="flex items-center space-x-2 sm:space-x-[10px] md:space-x-3">
              <img src="/user.svg" alt="" className="w-5 h-5 sm:w-[22px] sm:h-[22px] md:w-6 md:h-6" />
              <div className="bg-[#F4F2F0] rounded-[10px] sm:rounded-[11px] md:rounded-[12px] rounded-bl-[4px] sm:rounded-bl-[4.5px] md:rounded-bl-[5px] px-3 sm:px-[12px] md:px-[14px] py-2 sm:py-[9px] md:py-[10px] text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] leading-[20px] sm:leading-[21px] md:leading-[22px] tracking-[0.0004em]">
                Good day Ben, how can I help?
              </div>
            </div>
            
            <div className="flex justify-center pl-12 sm:pl-16 md:pl-20 lg:pl-24 -mt-1 sm:-mt-1.5 md:-mt-2">
               <span className="text-[12px] sm:text-[12.5px] md:text-[13.34px] text-[#C5C5C5] leading-[18px] sm:leading-[19px] md:leading-[20px] -tracking-[0.0003em] font-medium">5:03 PM</span>
            </div>
            
            
             <div className="flex justify-end">
              <div className="bg-[#F7F7F7] rounded-[10px] sm:rounded-[11px] md:rounded-[12px] rounded-br-[4px] sm:rounded-br-[4.5px] md:rounded-br-[5px] p-3 sm:p-[12px] md:p-[14px] w-fit">
                <div className="flex space-x-1 sm:space-x-[5px] md:space-x-1.5 items-center h-1.5 sm:h-[7px] md:h-2">
                  {[0, 1, 2].map((dot) => (
                    <motion.div
                      key={dot}
                      className="size-[9px] sm:size-[10px] md:size-[11px] bg-[#C5C5C5] rounded-full"
                      animate={{
                        y: ["0%", "-50%", "0%"],
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: dot * 0.2
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="mt-3 sm:mt-3.5 md:mt-4">
          <div 
            className="bg-white max-w-[442px] mx-auto  rounded-[15px] sm:rounded-[16px] md:rounded-[18px] border-2 border-[#EBEBEB] p-3 sm:p-[12px] md:p-[14px] flex items-center justify-between w-full"
          >
            <div className="flex items-center text-[#000000] text-[13px] sm:text-[14px] md:text-[15px] overflow-hidden whitespace-nowrap w-full mr-2 sm:mr-2.5 md:mr-3">
              <img src="/sparkle.svg" alt="" className="w-4 h-4 sm:w-[18px] sm:h-[18px] md:w-5 md:h-5" />
              <div className="flex items-center ml-2 sm:ml-2.5 md:ml-[12px]">
                <span className="font-medium text-black">
                    {text}
                </span>
                <span className="w-[1.5px] sm:w-[1.75px] md:w-[2px] h-3 sm:h-3.5 md:h-4 bg-black ml-0.5 blink-cursor"></span>
              </div>
            </div>
            <button className="text-[#8F8E8E] transition-colors shrink-0">
              <PaperPlaneRight size={18} weight="fill" className="sm:w-[19px] sm:h-[19px] md:w-[20px] md:h-[20px]" />
            </button>
          </div>
        </div>

        </div>
      </div>
    </>
  );
};