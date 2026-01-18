'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDeny = () => {
    localStorage.setItem('cookieConsent', 'denied');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-0 left-0 right-0 md:bottom-4 md:right-4 md:left-auto z-50 w-full md:w-[340px] lg:w-[500px] bg-white rounded-t-[12px] md:rounded-[12px] p-4 sm:p-6 lg:p-[24px] border-t border-l border-r border-b border-[#D2CCCB6B] md:border overflow-x-hidden"
          style={{
            boxShadow: '0px 0px 15px 0px #00000008, 0px 2px 30px 0px #00000014'
          }}
        >
          <div className="flex flex-col gap-3 sm:gap-4">
            <p className="text-[#8F8E8E] text-[12px] sm:text-[14px] leading-[18px] sm:leading-[20px] tracking-[0.03em]">
              We use cookies to enhance your experience, provide personalised content and analyse traffic.{' '}
              <Link href="/privacy-policy" className="text-black font-medium underline underline-offset-2 hover:opacity-70 transition-opacity">
                Privacy Policy
              </Link>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-fit">
              <button
                onClick={handleAccept}
                className="w-full sm:flex-1 bg-[#254F46] cursor-pointer text-white px-[18px] py-[6px] rounded-full text-[14px] sm:text-[16px] font-medium leading-[20px] sm:leading-[24px] tracking-[0.006em] whitespace-nowrap transition-colors duration-200 ease-out hover:bg-[#15352E]"
              >
                Accept All
              </button>
              <button
                onClick={handleDeny}
                className="w-full sm:flex-1 bg-white border border-[#EBEBEB] cursor-pointer text-black px-[18px] py-[6px] rounded-full text-[14px] sm:text-[16px] font-medium leading-[20px] sm:leading-[24px] tracking-[0.006em] whitespace-nowrap transition-colors duration-200 ease-out hover:text-[#57534D] hover:bg-[#F7F7F7] hover:border-[#F7F7F7]"
                style={{ boxShadow: '0px 1px 2px 0px #0A0D1408' }}
              >
                Deny All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
